import { useState } from "react"

const Blog = ({ blog }) => {
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

    console.log(blog)

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
                <div>likes {blog.likes} <button>like</button></div>
                <div>{blog.user.name}</div>
            </div>
        )
    }
}

export default Blog