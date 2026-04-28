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
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText('Logout')
    - locator resolved to <a role="menuitem" class="oxd-userdropdown-link" href="/web/index.php/auth/logout">Logout</a>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action
    - click action done
    - waiting for scheduled navigations to finish

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
  13 |     await page.waitForTimeout(10000)
  14 | 
  15 |     await expect(page).toHaveURL(/dashboard/)
  16 | 
  17 |     await page.getByAltText('profile picture').first().click()
  18 | 
> 19 |     await page.getByText('Logout').click()
     |                                    ^ Error: locator.click: Test timeout of 30000ms exceeded.
  20 | 
  21 |     await page.waitForTimeout(5000)
  22 |     
  23 |     // await page.locator('[name="username"]').type('Admin')
  24 | });
```