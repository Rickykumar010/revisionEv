
require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            jwt.verify(token, 'secret', (err, decoded) => {
                if (decoded) {
                    console.log(decoded);
                    next()
                } else {
                    res.json({ message: "Invalid token" });
                    
                }
            });
        } else {
            return res.status(401).json({ message: "No token found, please login first" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};
module.exports = { auth };
