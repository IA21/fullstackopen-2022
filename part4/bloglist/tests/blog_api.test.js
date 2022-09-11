const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const TIMEOUT = 100 * 1000;
const api = supertest(app)



test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2)
}, TIMEOUT)



afterAll(() => {
    mongoose.connection.close()
})