const mongoose = require('mongoose');

const blog_schema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blog_schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})


module.exports = mongoose.model('Blog', blog_schema)
