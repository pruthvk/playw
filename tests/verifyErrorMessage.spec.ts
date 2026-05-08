import {test,expect} from '@playwright/test'

test('verify error message',async({page})=>{
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByPlaceholder('Username', { exact: true }).fill('Admin')
    await page.locator('input[name="password"]').fill('admin1234')

    await page.locator('//button[@type="submit"]').click()

    const errorMessage = await page.locator('//p[contains(@class,"alert")]').textContent()

    console.log('Error message is : ' + errorMessage)
    
    console.error(errorMessage)
    
    // expect(errorMessage).toContain('Invalid credentials')

    expect(errorMessage?.includes('Invalid credential')).toBeTruthy()

    expect(errorMessage==='Invalid credential').toBeTruthy()

});