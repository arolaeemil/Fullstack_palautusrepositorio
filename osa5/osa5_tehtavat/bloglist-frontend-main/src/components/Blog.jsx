import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogLikes, deleteBlog }) => {

  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLike = () => {
    //const userdata = blog.user
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    //updatedBlog.user = userdata
    //console.log(updatedBlog)
    updateBlogLikes(updatedBlog)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  return (
    <div>
      {blog.title} by {blog.author}
      <button onClick={toggleInfo}>
        {showInfo ? 'hide' : 'view'}
      </button>
      {showInfo && (
        <>
          {/* <p>Author: {blog.author}</p> */}
          <p>Url: {blog.url}</p>
          <p>Added by: {blog.user ? blog.user.username : 'adder unknown'}</p>
          <p>{blog.likes} likes</p>
          <button onClick={handleLike}>like</button>
          <button onClick={handleDelete}>delete</button>
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog