const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, likeBlog, deleteBlog, makeOtherUserBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
            name: 'Testi Käyttäjä',
            username: 'testkayttaja',
            password: 'salainen'
            }
        })
        await request.post('http://localhost:3001/api/users', {
            data: {
            name: 'Toinen Käyttäjä',
            username: 'toinenkayttaja',
            password: 'salainen'
            }
        })
        await page.goto('/')
    })

    test('front page can be opened and login form is shown', async ({ page }) => {
        const locator = await page.getByText('Blog app').first()
        await expect(locator).toBeVisible()
        await expect(page.getByText('login')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'testkayttaja', 'salainen')
            await expect(page.getByText('you have logged in')).toBeVisible()
            await expect(page.getByText('Testi Käyttäjä logged in')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
                await loginWith(page, 'testkayttaja', 'virhe')
                await expect(page.getByText('Wrong credentials')).toBeVisible()
                await expect(page.getByText('logged in')).not.toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'testkayttaja', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, 'testiauthor', 'testititle', 'testiurl')
            await expect(page.getByText('testititle by testiauthor')).toBeVisible()
        })
        describe('after creating a blog', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, 'testiauthor', 'testititle', 'testiurl')
            })
          
            test('the blog can be liked', async ({ page }) => {
                await likeBlog(page, 'testiauthor', 'testititle')
                await expect(page.getByText('1')).toBeVisible()
            })

            test('the blog can be deleted', async ({ page }) => {
                await deleteBlog(page, 'testiauthor', 'testititle')
                await expect(page.getByText('testititle by testiauthor')).not.toBeVisible()
            })
        })
    })

    test('a user cannot see delete button for blogs not added by the user', async ({ page }) => {
        await makeOtherUserBlog(page, 'toinenkayttaja', 'salainen')
        await loginWith(page, 'testkayttaja', 'salainen')
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('delete')).not.toBeVisible()
    })

})