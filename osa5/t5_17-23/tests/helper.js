const loginWith = async (page, username, password)  => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

const createBlog = async (page, author, title, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()

    await page.getByTestId('author').fill(author)
    await page.getByTestId('title').fill(title)
    await page.getByTestId('url').fill(url)

    await page.getByRole('button', { name: 'save' }).click()
    await page.getByText(`${title} by ${author}`).waitFor()
}

const likeBlog = async (page, author, title) => {
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    await page.getByText('1 likes').waitFor()
}

const deleteBlog = async (page, author, title) => {
    await page.getByRole('button', { name: 'view' }).click()
    page.on('dialog', dialog => dialog.accept())
    await page.getByRole('button', { name: 'delete' }).click()
    await page.getByText('removed blog').waitFor()
}

const makeOtherUserBlog = async (page, username, password) => {
    await loginWith(page, username, password)
    await createBlog(page, 'otheruserauthour', 'otherusertitle', 'otheruserurl' )
    await page.getByRole('button', { name: 'logout' }).click()
}
  
export { loginWith, createBlog, likeBlog, deleteBlog, makeOtherUserBlog }