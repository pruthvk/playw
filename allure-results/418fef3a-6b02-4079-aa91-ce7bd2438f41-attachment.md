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
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByPlaceholder('Username', { exact: true })

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e6]:
    - img "company-branding" [ref=e8]
    - generic [ref=e9]:
      - heading "Login" [level=5] [ref=e10]
      - generic [ref=e11]:
        - generic [ref=e13]:
          - paragraph [ref=e14]: "Username : Admin"
          - paragraph [ref=e15]: "Password : admin123"
        - generic [ref=e16]:
          - generic [ref=e18]:
            - generic [ref=e19]:
              - generic [ref=e20]: 
              - generic [ref=e21]: Username
            - textbox "username" [active] [ref=e23]
          - generic [ref=e25]:
            - generic [ref=e26]:
              - generic [ref=e27]: 
              - generic [ref=e28]: Password
            - textbox "password" [ref=e30]
          - button "Login" [ref=e32] [cursor=pointer]
          - paragraph [ref=e34] [cursor=pointer]: Forgot Your Password?
      - generic [ref=e35]:
        - generic [ref=e36]:
          - link [ref=e37] [cursor=pointer]:
            - /url: https://www.linkedin.com/company/orangehrm/mycompany/
          - link [ref=e40] [cursor=pointer]:
            - /url: https://www.facebook.com/OrangeHRM/
          - link [ref=e43] [cursor=pointer]:
            - /url: https://twitter.com/orangehrm?lang=en
          - link [ref=e46] [cursor=pointer]:
            - /url: https://www.youtube.com/c/OrangeHRMInc
        - generic [ref=e49]:
          - paragraph [ref=e50]: OrangeHRM OS 5.8
          - paragraph [ref=e51]:
            - text: © 2005 - 2026
            - link "OrangeHRM, Inc" [ref=e52] [cursor=pointer]:
              - /url: http://www.orangehrm.com
            - text: . All rights reserved.
  - img "orangehrm-logo" [ref=e54]
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('valid login',async({page})=>{
  4  | 
  5  |     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  6  | 
  7  |     console.log(await page.viewportSize().width)
  8  |     console.log(await page.viewportSize().height)
  9  |     
> 10 |     await page.getByPlaceholder('Username', { exact: true }).fill('Admin',{delay:100})
     |                                                              ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  11 | 
  12 |     await page.locator('input[name="password"]').fill('admin123',{delay:100})
  13 | 
  14 |     await page.locator('//button[@type="submit"]').click()
  15 | 
  16 |     await page.waitForTimeout(3000)
  17 | 
  18 |     await expect(page).toHaveURL(/dashboard/)
  19 | 
  20 |     await page.getByAltText('profile picture').first().click()
  21 | 
  22 |     await page.getByText('Logout').click()
  23 | 
  24 |     // await page.waitForTimeout(10000)
  25 | 
  26 |     await expect(page).toHaveURL(/login/)
  27 |     
  28 |     // await page.locator('[name="username"]').type('Admin')
  29 | });
```