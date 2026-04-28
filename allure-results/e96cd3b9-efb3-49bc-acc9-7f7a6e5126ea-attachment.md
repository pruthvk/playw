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

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - complementary [ref=e4]:
      - navigation "Sidepanel" [ref=e5]:
        - generic [ref=e6]:
          - link "client brand banner" [ref=e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=e9]
          - text: 
        - generic [ref=e10]:
          - generic [ref=e11]:
            - generic [ref=e12]:
              - textbox "Search" [ref=e15]
              - button "" [ref=e16] [cursor=pointer]:
                - generic [ref=e17]: 
            - separator [ref=e18]
          - list [ref=e19]:
            - listitem [ref=e20]:
              - link "Admin" [ref=e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
                - generic [ref=e24]: Admin
            - listitem [ref=e25]:
              - link "PIM" [ref=e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
                - generic [ref=e40]: PIM
            - listitem [ref=e41]:
              - link "Leave" [ref=e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
                - generic [ref=e45]: Leave
            - listitem [ref=e46]:
              - link "Time" [ref=e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
                - generic [ref=e53]: Time
            - listitem [ref=e54]:
              - link "Recruitment" [ref=e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
                - generic [ref=e61]: Recruitment
            - listitem [ref=e62]:
              - link "My Info" [ref=e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
                - generic [ref=e69]: My Info
            - listitem [ref=e70]:
              - link "Performance" [ref=e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
                - generic [ref=e79]: Performance
            - listitem [ref=e80]:
              - link "Dashboard" [ref=e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
                - generic [ref=e84]: Dashboard
            - listitem [ref=e85]:
              - link "Directory" [ref=e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
                - generic [ref=e89]: Directory
            - listitem [ref=e90]:
              - link "Maintenance" [ref=e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
                - generic [ref=e95]: Maintenance
            - listitem [ref=e96]:
              - link "Claim" [ref=e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
                - img [ref=e100]
                - generic [ref=e104]: Claim
            - listitem [ref=e105]:
              - link "Buzz" [ref=e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
                - generic [ref=e109]: Buzz
    - banner [ref=e110]:
      - generic [ref=e111]:
        - generic [ref=e112]:
          - text: 
          - heading "Dashboard" [level=6] [ref=e114]
        - link "Upgrade" [ref=e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=e117] [cursor=pointer]: Upgrade
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125] [cursor=pointer]:
              - img "profile picture" [ref=e126]
              - paragraph [ref=e127]: John Joseph
              - generic [ref=e128]: 
      - navigation "Topbar Menu" [ref=e130]:
        - list [ref=e131]:
          - button "" [ref=e133] [cursor=pointer]:
            - generic [ref=e134]: 
  - generic [ref=e135]:
    - generic [ref=e137]:
      - generic [ref=e139]:
        - generic [ref=e141]:
          - generic [ref=e142]: 
          - paragraph [ref=e143]: Time at Work
        - separator [ref=e144]
        - generic [ref=e146]:
          - generic [ref=e147]:
            - img "profile picture" [ref=e149]
            - generic [ref=e150]:
              - paragraph [ref=e151]: Punched In
              - paragraph [ref=e152]: "Punched In: Today at 02:20 PM (GMT 5.5)"
          - generic [ref=e153]:
            - generic [ref=e154]: 1h 13m Today
            - button "" [ref=e155] [cursor=pointer]:
              - generic [ref=e156]: 
          - separator [ref=e157]
          - generic [ref=e158]:
            - generic [ref=e159]:
              - paragraph [ref=e160]: This Week
              - paragraph [ref=e161]: Apr 27 - May 03
            - generic [ref=e162]:
              - generic [ref=e163]: 
              - paragraph [ref=e164]: 0h 15m
      - generic [ref=e168]:
        - generic [ref=e170]:
          - generic [ref=e171]: 
          - paragraph [ref=e172]: My Actions
        - separator [ref=e173]
        - generic [ref=e175]:
          - generic [ref=e176]:
            - button [ref=e177] [cursor=pointer]
            - paragraph [ref=e183] [cursor=pointer]: (1) Pending Self Review
          - generic [ref=e184]:
            - button [ref=e185] [cursor=pointer]
            - paragraph [ref=e194] [cursor=pointer]: (1) Candidate to Interview
      - generic [ref=e196]:
        - generic [ref=e198]:
          - generic [ref=e199]: 
          - paragraph [ref=e200]: Quick Launch
        - separator [ref=e201]
        - generic [ref=e203]:
          - generic [ref=e204]:
            - button "Assign Leave" [ref=e205] [cursor=pointer]
            - generic "Assign Leave" [ref=e208]:
              - paragraph [ref=e209]: Assign Leave
          - generic [ref=e210]:
            - button "Leave List" [ref=e211] [cursor=pointer]
            - generic "Leave List" [ref=e218]:
              - paragraph [ref=e219]: Leave List
          - generic [ref=e220]:
            - button "Timesheets" [ref=e221] [cursor=pointer]
            - generic "Timesheets" [ref=e227]:
              - paragraph [ref=e228]: Timesheets
          - generic [ref=e229]:
            - button "Apply Leave" [ref=e230] [cursor=pointer]
            - generic "Apply Leave" [ref=e233]:
              - paragraph [ref=e234]: Apply Leave
          - generic [ref=e235]:
            - button "My Leave" [ref=e236] [cursor=pointer]
            - generic "My Leave" [ref=e241]:
              - paragraph [ref=e242]: My Leave
          - generic [ref=e243]:
            - button "My Timesheet" [ref=e244] [cursor=pointer]
            - generic "My Timesheet" [ref=e247]:
              - paragraph [ref=e248]: My Timesheet
      - generic [ref=e250]:
        - generic [ref=e252]:
          - generic [ref=e253]: 
          - paragraph [ref=e254]: Buzz Latest Posts
        - separator [ref=e255]
        - generic [ref=e257]:
          - generic [ref=e258]:
            - generic [ref=e259] [cursor=pointer]:
              - img "profile picture" [ref=e261]
              - generic [ref=e262]:
                - paragraph [ref=e263]: John 4957589 Joseph
                - paragraph [ref=e264]: 2026-28-04 02:58 PM
            - separator [ref=e265]
            - paragraph [ref=e266]: YES!
          - generic [ref=e267]:
            - generic [ref=e268] [cursor=pointer]:
              - img "profile picture" [ref=e270]
              - generic [ref=e271]:
                - paragraph [ref=e272]: John 4957589 Joseph
                - paragraph [ref=e273]: 2026-28-04 02:57 PM
            - separator [ref=e274]
            - paragraph [ref=e275]: OK123
          - generic [ref=e276]:
            - generic [ref=e277] [cursor=pointer]:
              - img "profile picture" [ref=e279]
              - generic [ref=e280]:
                - paragraph [ref=e281]: John 4957589 Joseph
                - paragraph [ref=e282]: 2026-28-04 02:57 PM
            - separator [ref=e283]
            - paragraph [ref=e284]: OK
          - generic [ref=e285]:
            - generic [ref=e286] [cursor=pointer]:
              - img "profile picture" [ref=e288]
              - generic [ref=e289]:
                - paragraph [ref=e290]: John 4957589 Joseph
                - paragraph [ref=e291]: 2026-28-04 02:50 PM
            - separator [ref=e292]
            - img
          - generic [ref=e293]:
            - generic [ref=e294] [cursor=pointer]:
              - img "profile picture" [ref=e296]
              - generic [ref=e297]:
                - paragraph [ref=e298]: John 4957589 Joseph
                - paragraph [ref=e299]: 2026-28-04 02:48 PM
            - separator [ref=e300]
            - img
      - generic [ref=e302]:
        - generic [ref=e303]:
          - paragraph [ref=e308]: Employees on Leave Today
          - generic [ref=e309] [cursor=pointer]: 
        - separator [ref=e310]
        - generic [ref=e312]:
          - img "No Content" [ref=e313]
          - paragraph [ref=e314]: No Employees are on Leave Today
      - generic [ref=e316]:
        - generic [ref=e318]:
          - generic [ref=e319]: 
          - paragraph [ref=e320]: Employee Distribution by Sub Unit
        - separator [ref=e321]
        - list [ref=e326]:
          - listitem [ref=e327] [cursor=pointer]:
            - generic "Human Resource Department" [ref=e329]
          - listitem [ref=e330] [cursor=pointer]:
            - generic "Operational Department" [ref=e332]
          - listitem [ref=e333] [cursor=pointer]:
            - generic "Unassigned" [ref=e335]
      - generic [ref=e337]:
        - generic [ref=e339]:
          - generic [ref=e340]: 
          - paragraph [ref=e341]: Employee Distribution by Location
        - separator [ref=e342]
        - list [ref=e347]:
          - listitem [ref=e348] [cursor=pointer]:
            - generic "Texas R&D" [ref=e350]
          - listitem [ref=e351] [cursor=pointer]:
            - generic "New York Sales Office" [ref=e353]
          - listitem [ref=e354] [cursor=pointer]:
            - generic "01_Auto Test Location_1777366738384" [ref=e356]
          - listitem [ref=e357] [cursor=pointer]:
            - generic "Unassigned" [ref=e359]
    - generic [ref=e360]:
      - paragraph [ref=e361]: OrangeHRM OS 5.8
      - paragraph [ref=e362]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e363] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
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
  21 |     await page.waitForTimeout(10000)
  22 |     
  23 |     // await page.locator('[name="username"]').type('Admin')
  24 | });
```