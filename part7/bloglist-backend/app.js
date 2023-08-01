const { info, error } = require('./utils/logger')
const config = require('./utils/config')
const express = require('express');
const app = express()
require('express-async-errors')
const login_router = require('./controllers/login');
const blog_router = require('./controllers/blogs');
const user_router = require('./controllers/users');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(config.MONGO_URL).then(() => info('mongoose connected'))

app.use(cors())
app.use(express.json())
app.use(middleware.extract_auth_token)
app.use('/api/login', login_router)
app.use('/api/blogs', blog_router)
app.use('/api/users', user_router)
app.use(middleware.error_handler)

module.exports = app
