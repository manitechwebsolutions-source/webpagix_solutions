import { test, expect } from '@playwright/test';

const SERVICE_PAGES = [
  { slug: 'ai-automation',   title: /ai automation/i,   heading: /ai automation/i },
  { slug: 'web-development', title: /web development/i,  heading: /web development/i },
  { slug: 'mobile-apps',     title: /mobile apps/i,      heading: /mobile/i },
  { slug: 'cloud',           title: /cloud/i,            heading: /cloud/i },
  { slug: 'seo',             title: /seo/i,              heading: /seo|growth/i },
];

test.describe('Service Pages', () => {
  for (const { slug, title, heading } of SERVICE_PAGES) {
    test(`/services/${slug} loads correctly`, async ({ page }) => {
      await page.goto(`/services/${slug}`);
      await expect(page).toHaveTitle(title);
    });

    test(`/services/${slug} has a visible h1 heading`, async ({ page }) => {
      await page.goto(`/services/${slug}`);
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      await expect(h1).toHaveText(heading);
    });

    test(`/services/${slug} has a visible navbar`, async ({ page }) => {
      await page.goto(`/services/${slug}`);
      await expect(page.locator('header')).toBeVisible();
    });

    test(`/services/${slug} has a visible footer`, async ({ page }) => {
      await page.goto(`/services/${slug}`);
      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
    });

    test(`/services/${slug} has a CTA or contact link`, async ({ page }) => {
      await page.goto(`/services/${slug}`);
      // At least one link pointing to contact or cta section
      const ctaLink = page.locator('a[href="/contact"], a[href="#cta"]').first();
      await expect(ctaLink).toBeAttached();
    });
  }

  test('unknown service slug shows 404 or redirects', async ({ page }) => {
    const response = await page.goto('/services/this-does-not-exist');
    // Should either return 404 status or render a not-found message
    const status = response?.status();
    const bodyText = await page.locator('body').innerText();
    const is404 = status === 404 || /not found|404/i.test(bodyText);
    expect(is404).toBeTruthy();
  });
});
