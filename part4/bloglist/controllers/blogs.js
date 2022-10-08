const jwt = require('jsonwebtoken');
const Blog = require('../models/blog')
const User = require('../models/user')
const blog_router = require('express').Router()

blog_router.get('/', async (req, res) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blog_router.post('/', async (req, res) => {
    if (req.body.title === undefined ||
        req.body.url === undefined) {
        return res.status(400).end()
    }

    const token_decoded = jwt.verify(req.token, process.env.JWT_SECRET_KEY)

    if (!token_decoded.id) {
        return res.status(401).json({
            error: 'token invalid',
        })
    }

    const user = await User.findById(token_decoded.id)

    const new_blog = {
        likes: 0,
        user: user._id,
        ...req.body,
    }

    const saved_blog = await new Blog(new_blog).save()
    user.blogs = user.blogs.concat(saved_blog)
    await user.save()

    res.status(201).json(saved_blog)
})

blog_router.delete('/:id', async (req, res) => {
    const token_decoded = jwt.verify(req.token, process.env.JWT_SECRET_KEY)

    if (!token_decoded.id) {
        return res.status(401).json({
            error: 'token invalid',
        })
    }

    const blog = await Blog.findById(req.params.id)

    if (blog.user.toString() !== token_decoded.id) {
        return res.status(401).json({
            error: 'you are not authorized to delete this note',
        })
    }

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

blog_router.put('/:id', async (req, res) => {
    const updated_blog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
            likes: req.body.likes
        },
        { new: true }
    )

    res.json(updated_blog)
})

module.exports = blog_router
