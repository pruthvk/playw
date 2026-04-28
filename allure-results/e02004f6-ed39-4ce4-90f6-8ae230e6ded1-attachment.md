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
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", waiting until "load"

```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('valid login',async({page})=>{
  4  | 
> 5  |     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  6  |     
  7  |     await page.getByPlaceholder('Username', { exact: true })
  8  | 
  9  | 
  10 |     await page.locator('[name="username"]')
  11 | 
  12 | 
  13 | })
```