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

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const loginSubmit = async (event) => {
        event.preventDefault()

        try {
            let user = await loginService({ username, password })

            setUser(user)
            setUsername('')
            setPassword('')
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
                        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} loginSubmit={loginSubmit} />
                    </div>
                    :
                    <div>
                        <h2>blogs</h2>
                        <pre>{user.name} logged in</pre>
                        {
                            blogs.map(blog =>
                                <Blog key={blog.id} blog={blog} />
                            )
                        }
                    </div>
            }
        </div>
    )
}

export default App
