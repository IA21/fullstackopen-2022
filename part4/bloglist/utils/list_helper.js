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

module.exports = { dummy, total_likes, favorite_blog }
