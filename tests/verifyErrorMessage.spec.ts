import {test,expect} from '@playwright/test'

test('verify error message',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByPlaceholder('Username', { exact: true }).fill('Admin')
    await page.locator('input[name="password"]').fill('admin1234')

    await page.locator('//button[@type="submit"]').click()

    const errorMessage = page.locator('//p[contains(@text(),"Invalid credentials")]')

    console.log('Error message is : ' + await errorMessage.textContent())
    console.error(errorMessage)

});