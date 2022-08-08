const { dummy, total_likes, favorite_blog, most_blogs } = require('../utils/list_helper')

const no_blog = [

]

const one_blog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const all_blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const result = dummy(no_blog)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = total_likes(no_blog)
        expect(result).toBe(0)
    })
    test('when list has only one blog, equals likes of that', () => {
        const result = total_likes(one_blog)
        expect(result).toBe(5)
    })
    test('of a bigger list is calculated right', () => {
        const result = total_likes(all_blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('of empty list is empty object', () => {
        const result = favorite_blog(no_blog)
        expect(result).toEqual({})
    })
    test('when list has only one blog, equals that blog', () => {
        const result = favorite_blog(one_blog)
        expect(result).toEqual({
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        })
    })
    test('of a bigger list is calculated right', () => {
        const result = favorite_blog(all_blogs)
        expect(result).toEqual({
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        })
    })
})

describe('most blogs', () => {
    test('of empty list is empty object', () => {
        const result = most_blogs(no_blog)
        expect(result).toEqual({})
    })
    test('when list has only one blog, equals that blog', () => {
        const result = most_blogs(one_blog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        })
    })
    test('of a bigger list is calculated right', () => {
        const result = most_blogs(all_blogs)
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3,
        })
    })
})
