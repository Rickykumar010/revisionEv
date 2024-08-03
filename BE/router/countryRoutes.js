const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../model/User');


router.get('/country/:currencyCode', async (req, res) => {
    const currencyCode = req.params.currencyCode;
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
        const countries = response.data;
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: 'error in country deltails......', error });
    }
});
router.post('/user/:username/favorate', async (req, res) => {
    const username = req.params.username;
    const { countryCode } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) {
            user = new User({ username, favorites: [], searchHistory: [] });
        }
        if (!user.favorites.includes(countryCode)) {
            user.favorites.push(countryCode);
        }
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating favorites', error });
    }
});
router.get('/user/:username/favorate', async (req, res) => {
    const username = req.params.username;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorites', error });
    }
});


module.exports = router;
