const dummy = (blogs) => {
    return 1
}

const total_likes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favorite_blog = (blogs) => {
    const fav_blog = blogs.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr, 0)

    return fav_blog === 0
        ?
        {}
        :
        {
            title: fav_blog.title,
            author: fav_blog.author,
            likes: fav_blog.likes,
        }
}

const most_blogs = (blogs) => {
    let blog_count = {};

    blogs
        .map(blog => blog.author)
        .forEach(author => {
            blog_count[author] = blog_count[author]
                ? { author: author, blogs: blog_count[author].blogs + 1 }
                : { author: author, blogs: 1 }
        })

    return Object.values(blog_count).reduce((prev, curr) => (prev.blogs > curr.blogs) ? prev : curr, {})
}

const most_likes = (blogs) => {
    let likes_count = {};

    blogs.forEach(blog => {
        likes_count[blog.author] = likes_count[blog.author]
            ? { author: blog.author, likes: blog.likes + likes_count[blog.author].likes }
            : { author: blog.author, likes: blog.likes }
    })

    return Object.values(likes_count).reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr, {})
}

module.exports = { dummy, total_likes, favorite_blog, most_blogs, most_likes }
