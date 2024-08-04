import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newBlogAuthor, setNewBlogAuthor] = useState('Author here...')
  const [newBlogTitle, setNewBlogTitle] = useState('Title here...')
  const [newBlogUrl, setNewBlogUrl] = useState('Url here...')

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

  const handleBlogAuthorChange = (event) => {setNewBlogAuthor(event.target.value)}

  const handleBlogTitleChange = (event) => {setNewBlogTitle(event.target.value)}

  const handleBlogUrlChange = (event) => {setNewBlogUrl(event.target.value)}

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      author: newBlogAuthor,
      title: newBlogTitle,
      url: newBlogUrl,
      likes: 0
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlogAuthor('Author here...')
      setNewBlogTitle('Title here...')
      setNewBlogUrl('Url here...')
    } catch (error) {
      setErrorMessage('Error adding a blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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
    }

  const addBlogForm = () => (
    <form onSubmit={handleAddBlog}>
        <input value={newBlogAuthor}
        onChange={handleBlogAuthorChange}/>
        <input value={newBlogTitle}
        onChange={handleBlogTitleChange}/>
        <input value={newBlogUrl}
        onChange={handleBlogUrlChange}/>
        <button type="submit">save</button>
    </form> 
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
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

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )

  return (
    <div>
      <h2>login</h2>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in</p>
         {logoutForm()}
         <h2>add a new blog</h2>
         {addBlogForm()}
         {blogForm()}
      </div>
      }
    </div>
  )
}

export default App