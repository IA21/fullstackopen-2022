const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const login_router = require('express').Router()
const User = require('../models/user')

login_router.post('/', async (req, res) => {
    const { username, password } = req.body
    const existing_user = await User.findOne({ username })
    const password_correct = (existing_user === null) ? false : await bcrypt.compare(password, existing_user.password_hash)

    if (!(existing_user && password_correct)) {
        return res.status(401).json({
            error: 'invalid credentials',
        })
    }

    const token = jwt.sign({
        id: existing_user._id,
        username: existing_user.username,
    }, process.env.JWT_SECRET_KEY)

    res.status(200).send({
        token,
        username: existing_user.username,
        name: existing_user.name,
    })
})

module.exports = login_router
