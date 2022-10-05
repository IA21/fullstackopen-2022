const { info, error } = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware');
const blog_router = require('./controllers/blogs');
const user_router = require('./controllers/users');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express()

mongoose.connect(config.MONGO_URL).then(() => info('mongoose connected'))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blog_router)
app.use('/api/users', user_router)
app.use(middleware.error_handler)

module.exports = app
