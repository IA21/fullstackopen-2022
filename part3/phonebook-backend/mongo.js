const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('incorrect number of parameters. either provide just 1 (pass) or 3 (pass + name + number)')
    process.exit()
}

const mongo_password = process.argv[2]
const mongo_db = 'phonebook'
const mongo_url = `mongodb://fso_2022:${mongo_password}@ac-atdiypq-shard-00-00.yeekrsi.mongodb.net:27017,ac-atdiypq-shard-00-01.yeekrsi.mongodb.net:27017,ac-atdiypq-shard-00-02.yeekrsi.mongodb.net:27017/${mongo_db}?ssl=true&replicaSet=atlas-e3rqhs-shard-0&authSource=admin&retryWrites=true&w=majority`

const person_schema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('person', person_schema)

if (process.argv.length === 3) {
    mongoose.connect(mongo_url).then(() => {
        Person
            .find({})
            .then(people => {
                console.log('phonebook:')
                people.forEach(person => {
                    console.log(`${person.name} ${person.number}`)
                })
                mongoose.disconnect()
            })
    })
} else if (process.argv.length === 5) {
    const input_name = process.argv[3]
    const input_number = process.argv[4]

    let new_person = new Person({
        name: input_name,
        number: input_number,
    })

    mongoose
        .connect(mongo_url)
        .then(() => {
            new_person
                .save()
                .then(saved_person => {
                    console.log(`added ${saved_person.name} number ${saved_person.number} to phonebook`)
                    mongoose.disconnect()
                })
        })
}

