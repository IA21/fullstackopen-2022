const Blog = require('../models/blog')
const blog_router = require('express').Router()

blog_router.get('/', async (req, res, next) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blog_router.post('/', async (req, res, next) => {
    const saved_blog = await new Blog(req.body).save()
    res.status(201).json(saved_blog)
})

module.exports = blog_router
