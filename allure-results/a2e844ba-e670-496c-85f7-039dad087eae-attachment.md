# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: verifyErrorMessage.spec.ts >> verify error message
- Location: tests\verifyErrorMessage.spec.ts:3:5

# Error details

```
Error: locator.textContent: Test ended.
Call log:
  - waiting for locator('//p[contains(@class,"oxd-alert-content-text")]')

```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('verify error message',async({page})=>{
  4  |     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  5  | 
  6  |     await page.getByPlaceholder('Username', { exact: true }).fill('Admin')
  7  |     await page.locator('input[name="password"]').fill('admin1234')
  8  | 
  9  |     await page.locator('//button[@type="submit"]').click()
  10 | 
> 11 |     const errorMessage = page.locator('//p[contains(@class,"oxd-alert-content-text")]').textContent() 
     |                                                                                         ^ Error: locator.textContent: Test ended.
  12 | 
  13 |     console.error(errorMessage)
  14 | 
  15 | });
```