import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog content is rendered', () => {
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