const Blog = require('../models/blog')
const blog_router = require('express').Router()

blog_router.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

blog_router.post('/', async (req, res) => {
    if (req.body.title === undefined ||
        req.body.url === undefined) {
        res.status(400).end()
    } else {
        const new_blog = {
            likes: 0,
            ...req.body,
        }

        const saved_blog = await new Blog(new_blog).save()
        res.status(201).json(saved_blog)
    }
})

blog_router.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = blog_router
