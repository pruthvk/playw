import { test, expect } from '@playwright/test';

// Use destructuring { page } to access the page fixture
test('my first test', async ({ page }) => {
    // Your test logic here
    expect(12).toBe(12);
});

test.skip('my 2nd test', async ({ page }) => {
    // This test will fail as expected (100 != 101)
    expect(100).toBe(110);
});

test('my 3rd test', async ({ page }) => {
    expect(12).toBe(12);
});

test('My 4th test',async function ({page}) {
    expect('Pruthvi K').toContain('Pruthvi')
    expect(true).toBeTruthy()
})

// test('My 5th test',async function ({page}) {
//     expect(true).toBeFalsy()
// })

// test('My 6th test',async function ({page}) {
//     expect('pruthvi kalapuram'.includes('pruthvi')).toBeTruthy()
// })
