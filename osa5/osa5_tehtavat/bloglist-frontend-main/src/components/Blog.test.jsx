import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog content is rendered and no unwanted content is', () => {
  const blog = {
    title: 'test_title',
    author: 'test_author',
    url: 'test_url',
    likes: '1',
  }

  render(<Blog blog={blog} />)

  //prints component to console
  screen.debug()

  const element = screen.getByText('test_title by test_author')
  const urlElement = screen.queryByText('test_url')
  const likeElement = screen.queryByText('1')

  //screen.debug(element)

  expect(element).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likeElement).toBeNull()

})

test('more content can be viewed by pressing view-button', async () => {
  const blog = {
    title: 'test_title',
    author: 'test_author',
    url: 'test_url',
    likes: '1',
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} view={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('test_title by test_author')
  const urlElement = screen.getByText('Url: test_url')
  const likeElement = screen.getByText('1 likes')

  //screen.debug(element)

  expect(element).toBeDefined()
  expect(urlElement).toBeDefined()
  expect(likeElement).toBeDefined()

})