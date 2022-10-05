const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    username: String,
    password_hash: String,
    name: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        }
    ]
})

user_schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password_hash
    }
})

module.exports = mongoose.model('User', user_schema)
