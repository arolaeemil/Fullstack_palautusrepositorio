import { render, screen } from '@testing-library/react'
import BlogForm from './Blogform'
import userEvent from '@testing-library/user-event'

test('Blogform calls given function with proper values when blog is created', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  //const input = screen.getByRole('textbox')
  const titleInput = screen.getByPlaceholderText('blog title here')
  const authorInput = screen.getByPlaceholderText('blog author here')
  const urlInput = screen.getByPlaceholderText('blog url here')
  const sendButton = screen.getByText('save')

  await user.clear(titleInput)
  await user.clear(authorInput)
  await user.clear(urlInput)

  await user.type(titleInput, 'test_title')
  await user.type(authorInput, 'test_author')
  await user.type(urlInput, 'test_url')
  await user.click(sendButton)

  //console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0].author).toBe('test_author')
  expect(createBlog.mock.calls[0][0].title).toBe('test_title')
  expect(createBlog.mock.calls[0][0].url).toBe('test_url')
})