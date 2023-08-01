const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const TIMEOUT = 30 * 1000;

beforeEach(async () => {
    await User.deleteMany({})
    await new User({
        username: 'root',
        password_hash: await bcrypt.hash('sudo', 10),
        name: 'sysadmin'
    }).save()
}, TIMEOUT)

test('username and password must be given', async () => {
    const res = await api
        .post('/api/users')
        .send({
            username: 'hi'
        })
        .expect(400)

    expect(res.body.error).toContain('username, password and name must be given')
})

test('username and password must be at least 3 characters long', async () => {
    const res = await api
        .post('/api/users')
        .send({
            username: 'hi',
            password: 'pass',
            name: 'test user'
        })
        .expect(400)

    expect(res.body.error).toContain('username and password must be at least 3 characters long')
})

test('username must be unique', async () => {
    const res = await api
        .post('/api/users')
        .send({
            username: 'root',
            password: 'sudo',
            name: 'sysadmin'
        })
        .expect(400)

    expect(res.body.error).toContain('username must be unique')
})

