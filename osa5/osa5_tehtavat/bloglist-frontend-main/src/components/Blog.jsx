import { useState } from 'react'

const Blog = ({ blog, updateBlogLikes }) => {

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

  return (
    <div>
      <div>
        Title: {blog.title}
        <button onClick={toggleInfo}>
          {showInfo ? 'hide' : 'view'}
        </button>
      </div>
      {showInfo && (
        <div>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <p>Added by: {blog.user ? blog.user.username : 'adder unknown'}</p>
          <p>Likes: {blog.likes} likes</p>
          <button onClick={handleLike}>like</button>
        </div>
      )}
    </div>
  )
}

export default Blog