import { test, expect } from '@playwright/test';

const INDUSTRY_PAGES = [
  { slug: 'healthcare',   label: 'Healthcare' },
  { slug: 'real-estate',  label: 'Real Estate' },
  { slug: 'ecommerce',    label: 'E-Commerce' },
  { slug: 'education',    label: 'Education' },
  { slug: 'finance',      label: 'Finance' },
  { slug: 'hospitality',  label: 'Hospitality' },
];

test.describe('Industry Pages', () => {
  for (const { slug, label } of INDUSTRY_PAGES) {
    test(`/industries/${slug} loads with valid status`, async ({ page }) => {
      const response = await page.goto(`/industries/${slug}`);
      const status = response?.status() ?? 0;
      expect(status).toBeLessThan(400);
    });

    test(`/industries/${slug} has a title containing the industry name`, async ({ page }) => {
      await page.goto(`/industries/${slug}`);
      await expect(page).toHaveTitle(new RegExp(label.split(' ')[0], 'i'));
    });

    test(`/industries/${slug} has a visible h1`, async ({ page }) => {
      await page.goto(`/industries/${slug}`);
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    });

    test(`/industries/${slug} has navbar`, async ({ page }) => {
      await page.goto(`/industries/${slug}`);
      await expect(page.locator('header')).toBeVisible();
    });

    test(`/industries/${slug} has footer`, async ({ page }) => {
      await page.goto(`/industries/${slug}`);
      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
    });
  }

  test('unknown industry slug shows 404 or not-found message', async ({ page }) => {
    const response = await page.goto('/industries/this-does-not-exist-xyz');
    const status = response?.status();
    const bodyText = await page.locator('body').innerText();
    const is404 = status === 404 || /not found|404/i.test(bodyText);
    expect(is404).toBeTruthy();
  });

  test('industry links in navbar dropdown navigate to correct page (desktop)', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) < 1024) test.skip();

    await page.goto('/');
    await page.locator('#industries-nav-btn').click();

    const healthcareLink = page.locator('#industries-dropdown a[href="/industries/healthcare"]');
    await expect(healthcareLink).toBeVisible();
    await healthcareLink.click();

    await page.waitForURL('**/industries/healthcare', { timeout: 10000 });
    await expect(page).toHaveURL('/industries/healthcare');
  });
});
