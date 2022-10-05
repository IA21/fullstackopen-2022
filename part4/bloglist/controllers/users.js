const User = require('../models/user')
const user_router = require('express').Router()
const bcrypt = require('bcrypt')

user_router.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

user_router.post('/', async (req, res) => {
    if (req.body.username === undefined ||
        req.body.password === undefined ||
        req.body.name === undefined) {
        return res.status(400).json({
            error: 'missing inputs',
        })
    }

    const { username, password, name } = req.body
    const existing_user = await User.findOne({ username })

    if (existing_user) {
        return res.status(400).json({
            error: 'username must be unique',
        })
    }

    const password_hash = await bcrypt.hash(password, 10)
    const new_user = await new User({
        username,
        password_hash,
        name,
    }).save()

    res.status(201).json(new_user)
})

module.exports = user_router
