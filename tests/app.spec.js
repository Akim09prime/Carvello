const { test, expect } = require('@playwright/test');

test('Carvello v11 core CAD workflow', async ({ page }) => {
  const runtimeErrors = [];
  page.on('pageerror', e => runtimeErrors.push(String(e)));
  await page.goto('/');
  await expect(page).toHaveTitle(/Carvello AI v11/);

  await expect(page.locator('.projectCard')).toHaveCount(1);
  await expect(page.locator('#tree .treeRow').first()).toBeVisible();

  const overflow = await page.locator('#tools').evaluate(el => el.scrollWidth > el.clientWidth + 2);
  expect(overflow).toBeFalsy();

  await page.locator('[data-scope="cabinet"]').click();
  await expect(page.locator('[data-scope="cabinet"]')).toHaveClass(/active/);
  await page.locator('[data-tool="move"]').click();
  await expect(page.locator('[data-tool="move"]')).toHaveClass(/active/);
  await page.locator('[data-tool="rotate"]').click();
  await expect(page.locator('[data-tool="rotate"]')).toHaveClass(/active/);

  for (const mode of ['pbr','shaded','edge','xray','wire','presentation']) {
    await page.locator('#renderMode').selectOption(mode);
    await expect(page.locator('#renderMode')).toHaveValue(mode);
  }

  const before = await page.locator('#tree [data-cab]').count();
  await page.locator('#addCabBtn').click();
  await expect(page.locator('#cabModal')).toHaveClass(/show/);
  await page.locator('#confirmCab').click();
  const after = await page.locator('#tree [data-cab]').count();
  expect(after).toBeGreaterThan(before);

  await page.screenshot({ path: 'test-results/current-ui.png', fullPage: true });
  expect(runtimeErrors, runtimeErrors.join('\n')).toEqual([]);
});

test('new project replaces active project instead of accumulating projects', async ({ page }) => {
  await page.goto('/');
  await page.locator('#addCabBtn').click();
  await page.locator('#confirmCab').click();
  await page.locator('#newBtn').click();
  await page.locator('#newProjectName').fill('Audit clean project');
  await page.locator('#confirmNew').click();
  await expect(page.locator('.projectCard')).toHaveCount(1);
  await expect(page.locator('#projectCardName')).toHaveText('Audit clean project');
  await expect(page.locator('#projectMeta')).toContainText('1 corp');
});
