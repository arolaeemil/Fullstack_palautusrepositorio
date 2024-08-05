import { useState } from 'react'

const Blog = ({ blog, updateBlogLikes }) => {

  const [showInfo, setShowInfo] = useState(false)

  const toggleInfo = () => {
    setShowInfo(!showInfo)
  }

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
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
          <p>Likes: {blog.likes} likes</p>
          <button onClick={handleLike}>like</button>
        </div>
      )}
    </div>
  )
}

export default Blog