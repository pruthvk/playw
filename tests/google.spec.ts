import {test,expect } from '@playwright/test'

test('Veirfy the application Title',async ({page})=>{
    await page.goto ('https://google.com')

    const url = await page.url()

    console.log('Page url is ', url)

    const title = await page.title()

    console.log('Title is '+ title)

    await expect (page).toHaveTitle('Google')
});
