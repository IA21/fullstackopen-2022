require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express()


app.use(cors())
app.use(express.json())


const blog_schema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blog_schema)

mongoose.connect(process.env.MONGO_URL).then(() => console.log('mongoose connected'))


app.get('/api/blogs', (req, res, next) => {
    Blog
        .find({})
        .then(blogs => res.json(blogs))
        .catch(err => next(err))
})

app.post('/api/blogs', (req, res, next) => {
    const new_blog = new Blog(req.body)
    new_blog
        .save()
        .then(saved_blog => res.status(201).json(saved_blog))
        .catch(err => next(err))
})


app.listen(process.env.PORT, () => {
    console.log('server listening on port', process.env.PORT)
})
