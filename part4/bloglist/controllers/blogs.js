const Blog = require('../models/blog')
const blog_router = require('express').Router()

blog_router.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blog_router.post('/', (req, res, next) => {
    const new_blog = new Blog(req.body)
    new_blog
        .save()
        .then(saved_blog => res.status(201).json(saved_blog))
        .catch(err => next(err))
})

module.exports = blog_router
