
AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~
$ pwd
/c/Users/test


AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~
$ cd Downloads/
Display all 48 possibilities? (y or n)

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~
$ cd Downloads/l
LTTS Corporate Brochure_Q3FY26.pdf
LTTS_Corporate_ Presentation_Q2_FY26_0.pptx
LTTS_FACTSHEET_Q3FY26.pdf
LTTS_Pruthvi_Kalapuram_Profile.docx
Lesson_01.pdf
learn/

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~
$ cd Downloads/le
Lesson_01.pdf  learn/

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~
$ cd Downloads/le
Lesson_01.pdf  learn/

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~
$ cd Downloads/learn/

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn
$ git clone https://github.com/microsoft/playwright-examples.git
Cloning into 'playwright-examples'...
remote: Enumerating objects: 104, done.
remote: Counting objects: 100% (42/42), done.
remote: Compressing objects: 100% (28/28), done.
remote: Total 104 (delta 27), reused 14 (delta 14), pack-reused 62 (from 2)
Receiving objects: 100% (104/104), 28.29 KiB | 391.00 KiB/s, done.
Resolving deltas: 100% (36/36), done.

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn
$ ls -al
total 20
drwxr-xr-x 1 AICafe12 BLR 197121 0 Feb  2 16:42 ./
drwxr-xr-x 1 AICafe12 BLR 197121 0 Feb  2 16:41 ../
drwxr-xr-x 1 AICafe12 BLR 197121 0 Feb  2 16:42 playwright-examples/

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn
$ cd playwright-examples/

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn/playwright-examples (main)
$ npm install

added 4 packages, and audited 5 packages in 15s

2 high severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn/playwright-examples (main)
$ npm audit
# npm audit report

playwright  <1.55.1
Severity: high
Playwright downloads and installs browsers without verifying the authenticity of the SSL certificate - https://github.com/advisories/GHSA-7mvr-c777-76hp
fix available via `npm audit fix`
node_modules/playwright
  @playwright/test  0.9.7 - 0.1112.0-alpha2 || 1.38.0-alpha-1692262648000 - 1.55.1-beta-1758616458000
  Depends on vulnerable versions of playwright
  node_modules/@playwright/test

2 high severity vulnerabilities

To address all issues, run:
  npm audit fix

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn/playwright-examples (main)
$ npm audit fix

changed 3 packages, and audited 5 packages in 10s

found 0 vulnerabilities

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn/playwright-examples (main)
$ npm audit
found 0 vulnerabilities

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn/playwright-examples (main)
$

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn/playwright-examples (main)
$


AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn/playwright-examples (main)
$

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn/playwright-examples (main)
$ npm init playwright@latest --yes "--" . '--quiet' '--browser=chromium' '--browser=firefox' '--browser=webkit' '--gha'

> playwright-examples@0.0.1 npx
> create-playwright . --quiet --browser=chromium --browser=firefox --browser=webkit --gha

Getting started with writing end-to-end tests with Playwright:
Initializing project in '.'
Installing Playwright Test (npm install --save-dev @playwright/test)…

up to date, audited 5 packages in 2s

found 0 vulnerabilities
Installing Types (npm install --save-dev @types/node)…

added 2 packages, and audited 7 packages in 6s

found 0 vulnerabilities
√ C:\Users\test\Downloads\learn\playwright-examples\playwright.config.ts already exists. Override it? (y/N) · true

Writing playwright.config.ts.
√ C:\Users\test\Downloads\learn\playwright-examples\.github\workflows\playwright.yml already exists. Override it? (y/N) · true

Writing .github\workflows\playwright.yml.
Writing e2e\example.spec.ts.
Writing package.json.
Downloading browsers (npx playwright install chromium firefox webkit)…
Downloading Chrome for Testing 145.0.7632.6 (playwright chromium v1208) from https://cdn.playwright.dev/builds/cft/145.0.7632.6/win64/chrome-win64.zip
172.8 MiB [====================] 100% 0.0s
Chrome for Testing 145.0.7632.6 (playwright chromium v1208) downloaded to C:\Users\test\AppData\Local\ms-playwright\chromium-1208
Downloading FFmpeg (playwright ffmpeg v1011) from https://cdn.playwright.dev/dbazure/download/playwright/builds/ffmpeg/1011/ffmpeg-win64.zip
1.3 MiB [====================] 100% 0.0s
FFmpeg (playwright ffmpeg v1011) downloaded to C:\Users\test\AppData\Local\ms-playwright\ffmpeg-1011
Downloading Chrome Headless Shell 145.0.7632.6 (playwright chromium-headless-shell v1208) from https://cdn.playwright.dev/builds/cft/145.0.7632.6/win64/chrome-headless-shell-win64.zip
108.8 MiB [====================] 100% 0.0s
Chrome Headless Shell 145.0.7632.6 (playwright chromium-headless-shell v1208) downloaded to C:\Users\test\AppData\Local\ms-playwright\chromium_headless_shell-1208
Downloading Firefox 146.0.1 (playwright firefox v1509) from https://cdn.playwright.dev/dbazure/download/playwright/builds/firefox/1509/firefox-win64.zip
110.2 MiB [====================] 100% 0.0s
Firefox 146.0.1 (playwright firefox v1509) downloaded to C:\Users\test\AppData\Local\ms-playwright\firefox-1509
Downloading WebKit 26.0 (playwright webkit v2248) from https://cdn.playwright.dev/dbazure/download/playwright/builds/webkit/2248/webkit-win64.zip
58.7 MiB [====================] 100% 0.0s
WebKit 26.0 (playwright webkit v2248) downloaded to C:\Users\test\AppData\Local\ms-playwright\webkit-2248
Downloading Winldd (playwright winldd v1007) from https://cdn.playwright.dev/dbazure/download/playwright/builds/winldd/1007/winldd-win64.zip
0.1 MiB [====================] 100% 0.0s
Winldd (playwright winldd v1007) downloaded to C:\Users\test\AppData\Local\ms-playwright\winldd-1007
✔ Success! Created a Playwright Test project at C:\Users\test\Downloads\learn\playwright-examples

Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - .\e2e\example.spec.ts - Example end-to-end test
  - .\playwright.config.ts - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭

AICafe12 BLR@DESKTOP-I7HOCQ8 MINGW64 ~/Downloads/learn/playwright-examples (main)
$
