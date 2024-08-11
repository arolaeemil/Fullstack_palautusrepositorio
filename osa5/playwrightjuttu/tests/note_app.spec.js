const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createNote } = require('./helper')

describe('Note app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
            name: 'Testi Käyttäjä',
            username: 'testkayttaja',
            password: 'salainen'
            }
        })
        //await page.goto('http://localhost:5173')
        //lisäys conffiin mahdollistaa tämän
        await page.goto('/')
    })

    test('front page can be opened', async ({ page }) => {
      //await page.goto('http://localhost:5173')
  
      const locator = await page.getByText('Notes').first()
      await expect(locator).toBeVisible()
      await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    })

    test('login form can be opened', async ({ page }) => {
        //await page.goto('http://localhost:5173')
    
        await page.getByRole('button', { name: 'login' }).click()

/*      const textboxes = await page.getByRole('textbox').all()
        await textboxes[0].fill('testname')
        await textboxes[1].fill('salainen') */

/*      await page.getByRole('textbox').first().fill('testname')
        await page.getByRole('textbox').last().fill('salainen') */

        await page.getByTestId('username').fill('testkayttaja')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
      
        await expect(page.getByText('logged in')).toBeVisible()
      })
    

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            //await page.goto('http://localhost:5173')
/*             await page.getByRole('button', { name: 'login' }).click()
            await page.getByTestId('username').fill('testkayttaja')
            await page.getByTestId('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click() */
            await loginWith(page, 'testkayttaja', 'salainen')
        })

        test('a new note can be created', async ({ page }) => {
/*             await page.getByRole('button', { name: 'new note' }).click()
            await page.getByRole('textbox').fill('a note created by playwright')
            await page.getByRole('button', { name: 'save' }).click() */
            await createNote(page, 'a note created by playwright', true)
            await expect(page.getByText('a note created by playwright')).toBeVisible()
        })

        test('importance can be changed', async ({ page }) => {
            await page.getByRole('button', { name: 'new note' }).click()
            await page.getByRole('textbox').fill('a note created by playwright')
            await page.getByRole('button', { name: 'save' }).click()
            await page.getByRole('button', { name: 'make not important' }).first().click()
            await expect(page.getByText('make important')).toBeVisible()
        })
        
        describe('and several notes exists', () => {
            beforeEach(async ({ page }) => {
                await createNote(page, 'first note', true)
                await createNote(page, 'second note', true)
                await createNote(page, 'third note', true)
            })
        
            test('one of those can be made nonimportant', async ({ page }) => {
                await page.pause()
                const otherNoteText = await page.getByText('second note')
                const otherdNoteElement = await otherNoteText.locator('..')
              
                await otherdNoteElement.getByRole('button', { name: 'make not important' }).click()
                await expect(otherdNoteElement.getByText('make important')).toBeVisible()
              })
          })
    
    })

    //test.only('login fails with wrong password', async ({ page }) => {
    test('login fails with wrong password', async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('testkayttaja')
        await page.getByTestId('password').fill('wrong')
        await page.getByRole('button', { name: 'login' }).click()
    
        //await expect(page.getByText('wrong credentials')).toBeVisible()
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

        await expect(page.getByText('logged in')).not.toBeVisible()
        })
    })
