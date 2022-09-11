const Blog = require('../models/blog')
const blog_router = require('express').Router()

blog_router.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blog_router.post('/', async (req, res, next) => {
    if (req.body.title === undefined ||
        req.body.url === undefined) {
        res.status(400).end()

    }

    const new_blog = {
        likes: 0,
        ...req.body,
    }

    const saved_blog = await new Blog(new_blog).save()
    res.status(201).json(saved_blog)
})

module.exports = blog_router
