const mongoose = require('mongoose');
const Blog = require('../models/blog')
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app)
const TIMEOUT = 100 * 1000;

const initial_blogs = [
    {
        title: "test blog 1",
        author: "test author 1",
        url: "test url 1",
    },
    {
        title: "test blog 2",
        author: "test author 2",
        url: "test url 2",
    },
    {
        title: "test blog 3",
        author: "test author 3",
        url: "test url 3",
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of initial_blogs) {
        await new Blog(blog).save()
    }
}, TIMEOUT)


/* TESTS */


test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(3)
}, TIMEOUT)


test('the unique identifier property of the blog posts is named id', async () => {
    const blog = (await api.get('/api/blogs')).body[0]
    console.log(blog)
    expect(blog.id).toBeDefined()
}, TIMEOUT)


test('a valid blog can be added', async () => {
    const new_blog = {
        title: 'new test blog',
        author: 'new test author',
        url: 'new test url',
    }

    await api
        .post('/api/blogs')
        .send(new_blog)
        .expect(201)

    const all_blogs = (await api.get('/api/blogs')).body
    expect(all_blogs).toHaveLength(initial_blogs.length + 1)

    const all_titles = all_blogs.map(blog => blog.title)
    expect(all_titles).toContain('new test blog')
})


/* TESTS */


afterAll(() => {
    mongoose.connection.close()
})