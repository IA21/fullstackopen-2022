const Blog = require('../models/blog')
const blog_router = require('express').Router()

blog_router.get('/', (req, res, next) => {
    Blog
        .find({})
        .then(blogs => res.json(blogs))
        .catch(err => next(err))
})

blog_router.post('/', (req, res, next) => {
    const new_blog = new Blog(req.body)
    new_blog
        .save()
        .then(saved_blog => res.status(201).json(saved_blog))
        .catch(err => next(err))
})

module.exports = blog_router
