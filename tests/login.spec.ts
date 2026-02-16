import {test,expect} from '@playwright/test'

test('valid login',async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
    await page.getByPlaceholder('Username', { exact: true })


    await page.locator('[name="username"]')


})