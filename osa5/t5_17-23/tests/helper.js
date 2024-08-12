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
    await page.getByRole('button', { name: 'cancel' }).click()

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

const makeBlogsWithLikes = async (page) => {
    await createBlog(page, '1_author', '1_title', '1_url')
    await createBlog(page, '2_author', '2_title', '2_url') 
    await createBlog(page, '3_author', '3_title', '3_url') 
}

const openBlogInfos = async (page) => {
    const viewButtons = await page.locator('button', { hasText: 'view' })
    const count = await viewButtons.count()
    for (let i = 0; i < count; i++) {
        await viewButtons.nth(0).click()
    }
}

const giveLikes = async (page) => {
    const likeButtons = await page.locator('button', { hasText: 'like' })
    const count = 9
    //likes are added so that the end result wont have duplicates. The adding is hard since the elements swap places during
    await likeButtons.nth(0).click()
    await likeButtons.nth(1).click()
    await likeButtons.nth(2).click()
    for (let i = 0; i < count; i++) {
        await likeButtons.nth(1).click()
    }
}

const areLikesInOrder = async (page) => {
    await page.waitForSelector('text=likes')
    const likeElements = await page.locator('text=/\\d+ likes/')
    const count = await likeElements.count()
    const numberList = []
    for (let i = 0; i < count; i++) {
        const text = await likeElements.nth(i).textContent()
        const match = text.match(/(\d+) likes/)
        if (match) {
            numberList.push(parseInt(match[1]))
        }
    }
    const sortedNumberList = [...numberList].sort((a, b) => b - a)
    const isSorted = JSON.stringify(numberList) === JSON.stringify(sortedNumberList)

    return isSorted
}
  
export { loginWith, createBlog, likeBlog, deleteBlog, makeOtherUserBlog, makeBlogsWithLikes, openBlogInfos, areLikesInOrder, giveLikes }