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

    useEffect(() => {
        let logged_in_user = window.localStorage.getItem('logged_in_user')

        if (logged_in_user) {
            setUser(JSON.parse(logged_in_user))
        }
    }, [])

    const loginSubmit = async (event) => {
        event.preventDefault()

        try {
            let user = await loginService({ username, password })

            window.localStorage.setItem('logged_in_user', JSON.stringify(user))

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
        setUser(null)
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
                        <pre>{user.name} logged in <button onClick={logout}>logout</button></pre>
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
