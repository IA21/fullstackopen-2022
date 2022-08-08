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
    let blog_counts = {};

    blogs
        .map(blog => blog.author)
        .forEach(author => {
            blog_counts[author] = blog_counts[author]
                ? { author: author, blogs: blog_counts[author].blogs + 1 }
                : { author: author, blogs: 1 }
        })

    return Object.values(blog_counts).reduce((prev, curr) => (prev.blogs > curr.blogs) ? prev : curr, {})
}

module.exports = { dummy, total_likes, favorite_blog, most_blogs }
