import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogURL, setBlogURL] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        let logged_in_user = window.localStorage.getItem('logged_in_user')

        if (logged_in_user) {
            let user = JSON.parse(logged_in_user);
            blogService.setToken(user.token)
            setUser(user)
        }
    }, [])

    const loginSubmit = async (event) => {
        event.preventDefault()

        try {
            let user = await loginService({ username, password })

            window.localStorage.setItem('logged_in_user', JSON.stringify(user))
            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.error(error)
            alert(error.response.data.error)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('logged_in_user')
        blogService.setToken(null)
        window.location.reload()
    }

    const createBlog = async (event) => {
        event.preventDefault()

        try {
            let new_blog = await blogService.create({
                title: blogTitle,
                author: blogAuthor,
                url: blogURL
            })

            setBlogTitle('')
            setBlogAuthor('')
            setBlogURL('')

            setBlogs(blogs.concat(new_blog))
        } catch (error) {
            console.error(error)
            alert(error.response.data.error)
        }
    }

    return (
        <div>
            {
                (user === null)
                    ?
                    <div>
                        <h2>log in to application</h2>
                        <Login
                            username={username}
                            password={password}
                            setUsername={setUsername}
                            setPassword={setPassword}
                            loginSubmit={loginSubmit} />
                    </div>
                    :
                    <div>
                        <h2>blogs</h2>
                        <pre>{user.name} logged in <button onClick={logout}>logout</button></pre>

                        <h2>create new</h2>
                        <form onSubmit={createBlog}>
                            <div><label>title <input type='text' value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)} required /></label></div>
                            <div><label>author <input type='text' value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)} required /></label></div>
                            <div><label>url <input type='text' value={blogURL} onChange={({ target }) => setBlogURL(target.value)} required /></label></div>
                            <br />
                            <button>create</button>
                        </form>

                        <br />
                        <br />

                        {
                            blogs.map(blog => <Blog key={blog.id} blog={blog} />)
                        }
                    </div>
            }
        </div>
    )
}

export default App
