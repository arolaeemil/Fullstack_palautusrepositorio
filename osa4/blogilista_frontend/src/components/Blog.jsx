const Blog = ({ blog }) => {
  return (
    <li className='blog'>
      <span className='blogpart'> Author: </span>: {blog.author}
      <span className='blogpart'> Title: </span> {blog.title}
      <span className='blogpart'> Url: </span> {blog.url}
      <span className='blogpart'> Likes: </span> {blog.likes}
    </li>
  )
}

export default Blog