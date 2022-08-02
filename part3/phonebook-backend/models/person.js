const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('mongoose connected'))
    .catch(err => console.error(`mongoose connection error:`, err))

const person_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    number: String,
})

person_schema.set('toJSON', {
    transform: (doc, ret_obj) => {
        ret_obj.id = ret_obj._id.toString()
        delete ret_obj._id
        delete ret_obj.__v
    }
})

module.exports = mongoose.model('person', person_schema)
