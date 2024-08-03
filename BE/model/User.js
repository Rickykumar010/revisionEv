const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    favorites: [{ type: String }],
    searchHistory: [{ type: String }] 
});
module.exports = mongoose.model('User', userSchema);
