import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/Blogform'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin =  async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('you have logged in with great success')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken(null)
    setSuccessMessage('you have logged out with great success')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`a new blog "${blogObject.title}" by "${blogObject.author}" added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setErrorMessage('Error adding a blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const blogForm = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    //console.log(sortedBlogs)
    return(
      <div>
        <h2>blogs</h2>
        {/* {blogs.map(blog => ( */}
        {sortedBlogs.map(blog => (
          <Blog key={blog.id} blog={blog} currentUser = {user} updateBlogLikes={updateBlogLikes} deleteBlog={deleteBlog}/>
        ))}
      </div>
    )
  }

  const addBlogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const updateBlogLikes = async (updatedBlog) => {
    try {
      //console.log(updatedBlog)
      const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
      returnedBlog.user = updatedBlog.user
      setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
      //is this the desired fix? most likely no...
      //blogService.getAll().then(blogs => setBlogs( blogs ))
    } catch (error) {
      console.log(error)
      setErrorMessage('error during like update')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const testButton = () => {
    //setBlogs(blogs)
    console.log(blogs)
    //blogService.getAll().then(blogs => setBlogs( blogs ))
  }

  const deleteBlog = async (removedBlog) => {
    try {
      if (window.confirm(`really remove blog "${removedBlog.title}" by ${removedBlog.author}?`)) {
        await blogService.remove(removedBlog.id)
        setBlogs(blogs.filter(blog => blog.id !== removedBlog.id))
        setSuccessMessage('successfully removed blog')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)}}
    catch (error) {
      console.log(error)
      setErrorMessage('failed to delete blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Blog app</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success"/>
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        {logoutForm()}
        <h2>add a new blog</h2>
        {addBlogForm()}
        {blogForm()}
        {/* <button onClick={testButton}>testbutton</button> */}
      </div>
      }
    </div>
  )
}

export default App