import { test as baseTest, expect as baseExpect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import type { TestInfo } from '@playwright/test';

const test = baseTest;
const expect = baseExpect;

test.afterEach(async ({ page }, testInfo: TestInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    try {
      const screenshotPath = testInfo.outputPath('screenshot.png');
      await page.screenshot({ path: screenshotPath, fullPage: true });
      await testInfo.attach('screenshot', { path: screenshotPath, contentType: 'image/png' });

      const outDir = testInfo.outputPath();
      if (fs.existsSync(outDir)) {
        const files = fs.readdirSync(outDir);
        const videoFile = files.find((f) => f.endsWith('.webm') || f.endsWith('.mp4'));
        if (videoFile) {
          const videoPath = path.join(outDir, videoFile);
          await testInfo.attach('video', { path: videoPath, contentType: 'video/webm' });
        }
      }
    } catch (err) {
      // don't fail the test because attachment step failed
      // eslint-disable-next-line no-console
      console.error('Error attaching artifacts:', err);
    }
  }
});

export { test, expect };
