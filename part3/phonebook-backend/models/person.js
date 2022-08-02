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
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: (val) => {
                // if any non number char besides '-' is found, its invalid 
                if (isNaN(val.replaceAll('-', '')))
                    return false

                // check if '-' exists and if first digits are 2||3
                let num_parts = val.split('-')

                if (num_parts.length === 1) {
                    // no -
                    return true
                } else if (num_parts.length === 2) {
                    // 1 -
                    return (num_parts[0].length === 2 || num_parts[0].length === 3)
                } else {
                    // multiple -
                    return false
                }
            },
            // message: (props) => {
            //     return 'invalid value'
            // }
        },
    },
})

person_schema.set('toJSON', {
    transform: (doc, ret_obj) => {
        ret_obj.id = ret_obj._id.toString()
        delete ret_obj._id
        delete ret_obj.__v
    }
})

module.exports = mongoose.model('person', person_schema)
