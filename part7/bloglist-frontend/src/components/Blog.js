import { useState } from "react"

const Blog = ({
    blog,
    likeBlogMain,
    deleteBlogMain,
    user
}) => {
    const [expanded, setExpanded] = useState(false)
    const BlogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }

    const likeBlog = async (blog) => {
        likeBlogMain(blog)
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
            deleteBlogMain(blog)
    }

    console.log()

    if (!expanded) {
        return (
            <div style={BlogStyle}>
                <div>{blog.title} {blog.author} <button onClick={toggleExpanded}>view</button></div>
            </div>
        )
    } else {
        return (
            <div style={BlogStyle}>
                <div>{blog.title} {blog.author} <button onClick={toggleExpanded}>hide</button></div>
                <div>{blog.url}</div>
                <div>likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
                <div>{blog.user.name}</div>
                {
                    (user.name === blog.user.name)
                        ? <button onClick={() => deleteBlog(blog)} style={{ backgroundColor: '#4169e1', border: 'none', borderRadius: '3px' }}>remove</button>
                        : <></>
                }
            </div>
        )
    }
}

export default Blog