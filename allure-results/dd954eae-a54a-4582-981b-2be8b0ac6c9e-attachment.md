# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> valid login
- Location: tests\login.spec.ts:3:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('valid login',async({page})=>{
  4  | 
  5  |     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  6  |     
  7  |     await page.getByPlaceholder('Username', { exact: true }).type('Admin')
  8  | 
  9  |     await page.locator('input[name="password"]').type('admin123')
  10 | 
  11 |     await page.locator('//button[@type="submit"]').click()
  12 | 
> 13 |     await page.waitForTimeout(10000)
     |                ^ Error: page.waitForTimeout: Test timeout of 30000ms exceeded.
  14 | 
  15 |     await expect(page).toHaveURL(/dashboard/)
  16 | 
  17 |     await page.getByAltText('profile picture').first().click()
  18 | 
  19 |     await page.getByText('Logout').click()
  20 | 
  21 |     // await page.waitForTimeout(10000)
  22 | 
  23 |     await expect(page).toHaveURL(/login/)
  24 |     
  25 |     // await page.locator('[name="username"]').type('Admin')
  26 | });
```