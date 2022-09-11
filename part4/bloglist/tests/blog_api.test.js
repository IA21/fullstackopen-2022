const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const TIMEOUT = 100 * 1000;
const api = supertest(app)




test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2)
}, TIMEOUT)


test('the unique identifier property of the blog posts is named id', async () => {
    const blog = (await api.get('/api/blogs')).body[0]
    console.log(blog)
    expect(blog.id).toBeDefined()
})




afterAll(() => {
    mongoose.connection.close()
})