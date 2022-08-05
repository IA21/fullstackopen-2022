const mongoose = require('mongoose');

const blog_schema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = mongoose.model('Blog', blog_schema)
