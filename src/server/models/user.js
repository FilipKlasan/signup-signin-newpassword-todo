const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    todoList: [String]
});


module.exports = mongoose.model('User', userSchema, 'users1');