const User = require('../models/user')
const user_router = require('express').Router()
const bcrypt = require('bcrypt')

user_router.get('/', async (req, res) => {
    const users = await User
        .find({})
        .populate('blogs', { url: 1, title: 1, author: 1 })
    res.json(users)
})

user_router.post('/', async (req, res) => {
    const { username, password, name } = req.body

    // username, password and name must be given
    if (username === undefined ||
        password === undefined ||
        name === undefined) {
        return res.status(400).json({
            error: 'username, password and name must be given',
        })
    }

    // username and password must be at least 3 characters long
    if (username.length < 3 ||
        password.length < 3) {
        return res.status(400).json({
            error: 'username and password must be at least 3 characters long',
        })
    }

    // username must be unique
    const existing_user = await User.findOne({ username })

    if (existing_user) {
        return res.status(400).json({
            error: 'username must be unique',
        })
    }

    // create user
    const password_hash = await bcrypt.hash(password, 10)
    const new_user = await new User({
        username,
        password_hash,
        name,
    }).save()

    res.status(201).json(new_user)
})

module.exports = user_router
