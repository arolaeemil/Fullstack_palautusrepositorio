import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogAuthor, setNewBlogAuthor] = useState('Author here...')
  const [newBlogTitle, setNewBlogTitle] = useState('Title here...')
  const [newBlogUrl, setNewBlogUrl] = useState('Url here...')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: newBlogAuthor,
      title: newBlogTitle,
      url: newBlogUrl,
      likes: 0
    })

    setNewBlogAuthor('Author here...')
    setNewBlogTitle('Title here...')
    setNewBlogUrl('Url here...')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <input
          value={newBlogAuthor}
          onChange={event => setNewBlogAuthor(event.target.value)}
          placeholder='blog author here'
        />
        <input
          value={newBlogTitle}
          onChange={event => setNewBlogTitle(event.target.value)}
          placeholder='blog title here'
        />
        <input
          value={newBlogUrl}
          onChange={event => setNewBlogUrl(event.target.value)}
          placeholder='blog url here'
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm