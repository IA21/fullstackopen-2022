import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Login from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

const App = () => {
    const [notificationMessage, setNotificationMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogs, setBlogs] = useState([])

    const blogFormRef = useRef()

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

    const showSuccessNotification = (message) => {
        setNotificationType('success')
        setNotificationMessage(message)
        setTimeout(() => setNotificationMessage(''), 5000);
    }

    const showErrorNotification = (message) => {
        setNotificationType('error')
        setNotificationMessage(message)
        setTimeout(() => setNotificationMessage(''), 5000);
    }

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
            showErrorNotification(`wrong username or password`)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('logged_in_user')
        blogService.setToken(null)
        window.location.reload()
    }

    const createBlogMain = async (blog_data) => {
        try {
            let new_blog = await blogService.create(blog_data)

            setBlogs(blogs.concat(new_blog))
            showSuccessNotification(`a new blog ${new_blog.title} by ${new_blog.author} added`)
            blogFormRef.current.setBlogFormVisility(false)
        } catch (error) {
            console.error(error)
            showErrorNotification(error.response.data.error)
        }
    }

    const likeBlogMain = async (blog_data) => {
        try {
            await blogService.like_blog(blog_data)
            setBlogs(blogs.map(blog => blog.id !== blog_data.id ? blog : { ...blog_data, likes: blog_data.likes + 1 }))
            showSuccessNotification(`liked blog ${blog_data.title}`)
        } catch (error) {
            console.error(error)
            showErrorNotification(error.response.data.error)
        }
    }

    return (
        <div>
            <Notification message={notificationMessage} type={notificationType} />
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

                        <BlogForm ref={blogFormRef} createBlogMain={createBlogMain} />

                        <br />

                        {
                            blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlogMain={likeBlogMain} />)
                        }
                    </div>
            }
        </div>
    )
}

export default App
