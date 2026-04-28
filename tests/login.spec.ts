import {test,expect} from '@playwright/test'

test('valid login',async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    
    await page.getByPlaceholder('Username', { exact: true }).fill('Admin')

    await page.locator('input[name="password"]').fill('admin123')

    await page.locator('//button[@type="submit"]').click()

    await page.waitForTimeout(3000)

    await expect(page).toHaveURL(/dashboard/)

    await page.getByAltText('profile picture').first().click()

    await page.getByText('Logout').click()

    // await page.waitForTimeout(10000)

    await expect(page).toHaveURL(/login/)
    
    // await page.locator('[name="username"]').type('Admin')
});