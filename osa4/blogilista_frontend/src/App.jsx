import Blog from './components/Blog'
import { useState, useEffect } from 'react'
import axios from 'axios'
import blogService from './services/blogs'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Blog app, 2024</em>
    </div>
  )
}

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  // const [newBlog, setNewBlog] = useState(
  //   'Blog here...'
  // )
  const [newBlogAuthor, setNewBlogAuthor] = useState(
    'Author here...'
  )
  const [newBlogTitle, setNewBlogTitle] = useState(
    'Title here...'
  )
  const [newBlogUrl, setNewBlogUrl] = useState(
    'Url here...'
  )
  const [newBlogLikes, setNewBlogLikes] = useState(
    'Likes amount here...'
  )

  const [showAll, setShowAll] = useState(true)
  // const [errorMessage, setErrorMessage] = useState('some error happened...')
   const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  console.log('render', blogs.length, 'blogs')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      author: newBlogAuthor,
      title: newBlogTitle,
      url: newBlogUrl,
      likes: newBlogLikes
    }
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/blogs/${id}`
    const blog = blogs.find(n => n.id === id)
    const changedBlog = { ...blog, important: !blog.important }

    blogService
    .update(id, changedBlog)
    .then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    })
    .catch(error => {
      setErrorMessage(
        `Blog '${blog.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.filter(n => n.id !== id))
    })
  }


  // const handleBlogChange = (event) => {
  //   setNewBlog(event.target.value)
  // }

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const handleBlogLikesChange = (event) => {
    setNewBlogLikes(event.target.value)
  }

  const blogsToShow = showAll
  ? blogs
  : blogs.filter(blog => blog.important === true)

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      <div>
        {/* <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button> */}
      </div>
      <ul>
        {blogsToShow.map(blog =>
          <Blog key={blog.id} blog={blog} toggleImportance={() => toggleImportanceOf(blog.id)}/>
        )}
      </ul>   
      <form onSubmit={addBlog}>
        {/* <input value={newBlog}
        onChange={handleBlogChange}/> */}

        <input value={newBlogAuthor}
        onChange={handleBlogAuthorChange}/>

        <input value={newBlogTitle}
        onChange={handleBlogTitleChange}/>

        <input value={newBlogUrl}
        onChange={handleBlogUrlChange}/>

        <input value={newBlogLikes}
        onChange={handleBlogLikesChange}/>

        <button type="submit">save</button>
      </form>  
      <Footer />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App 
