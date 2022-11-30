import { useState, forwardRef, useImperativeHandle } from 'react'

const BlogForm = forwardRef(({
    createBlog,
    blogTitle,
    setBlogTitle,
    blogAuthor,
    setBlogAuthor,
    blogURL,
    setBlogURL,
}, refs) => {
    const [visible, setVisible] = useState(false)

    const setBlogFormVisility = (value) => {
        setVisible(value)
    }

    useImperativeHandle(refs, () => {
        return {
            setBlogFormVisility,
        }
    })

    return (
        <>
            <div style={{ display: visible ? 'none' : '' }}>
                <button onClick={() => setBlogFormVisility(true)}>new blog</button>
            </div>
            <div style={{ display: visible ? '' : 'none' }}>
                <h2>create new</h2>
                <form onSubmit={createBlog}>
                    <div><label>title <input type='text' value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} required /></label></div>
                    <div><label>author <input type='text' value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)} required /></label></div>
                    <div><label>url <input type='text' value={blogURL} onChange={({ target }) => setBlogURL(target.value)} required /></label></div>
                    <br />
                    <button>create</button>
                </form>
                <button onClick={() => setBlogFormVisility(false)}>cancel</button>
            </div>
        </>
    )
})

export default BlogForm
