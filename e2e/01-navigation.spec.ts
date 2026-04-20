import { test, expect } from '@playwright/test';

test.describe('Navigation & Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ── Page title ──────────────────────────────────────────────────────────────
  test('homepage has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Webpagix/i);
  });

  // ── Logo ────────────────────────────────────────────────────────────────────
  test('logo is visible and navigates to home', async ({ page }) => {
    // First verify logo is visible on homepage
    const logo = page.locator('header a[aria-label="Webpagix home"]');
    await expect(logo).toBeVisible();
    // Navigate away then come back via navbar logo
    await page.goto('/about');
    // Use the header-scoped logo to ensure we click the navbar, not the footer
    await page.locator('header a[aria-label="Webpagix home"]').click();
    await page.waitForURL('/', { timeout: 10000 });
    await expect(page).toHaveURL('/');
  });

  // ── Desktop nav – industries dropdown ───────────────────────────────────────
  test('industries dropdown opens and shows all links (desktop)', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) < 1024) {
      test.skip();
    }

    const btn = page.locator('#industries-nav-btn');
    await expect(btn).toBeVisible();
    await btn.click();

    const dropdown = page.locator('#industries-dropdown');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    const expectedLabels = ['Healthcare', 'Real Estate', 'E-Commerce', 'Education', 'Finance & FinTech', 'Hospitality'];
    for (const label of expectedLabels) {
      await expect(dropdown.getByText(label, { exact: true })).toBeVisible();
    }

    // Close by clicking elsewhere on the page
    await page.locator('body').click({ position: { x: 0, y: 500 } });
    await page.waitForTimeout(300);
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  // ── Desktop nav – services dropdown ─────────────────────────────────────────
  test('services dropdown opens and shows all links (desktop)', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) < 1024) {
      test.skip();
    }

    const btn = page.locator('#services-nav-btn');
    await btn.click();

    const dropdown = page.locator('#services-dropdown');
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    const expectedLabels = ['AI Automation', 'Web Development', 'Mobile Apps', 'Cloud Solutions', 'SEO & Growth'];
    for (const label of expectedLabels) {
      await expect(dropdown.getByText(label, { exact: true })).toBeVisible();
    }
  });

  // ── Desktop nav – individual links ──────────────────────────────────────────
  test('Works nav link navigates to /works', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) < 1024) test.skip();
    await page.getByRole('link', { name: 'Works' }).first().click();
    await page.waitForURL('**/works', { timeout: 10000 });
    await expect(page).toHaveURL('/works');
  });

  test('About Us nav link navigates to /about', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) < 1024) test.skip();
    await page.getByRole('link', { name: 'About Us' }).first().click();
    await page.waitForURL('**/about', { timeout: 10000 });
    await expect(page).toHaveURL('/about');
  });

  test('Blog nav link navigates to /blog', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) < 1024) test.skip();
    await page.getByRole('link', { name: 'Blog' }).first().click();
    await page.waitForURL('**/blog', { timeout: 10000 });
    await expect(page).toHaveURL('/blog');
  });

  test('Contact Us nav link navigates to /contact', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) < 1024) test.skip();
    await page.getByRole('link', { name: 'Contact Us' }).first().click();
    await page.waitForURL('**/contact', { timeout: 10000 });
    await expect(page).toHaveURL('/contact');
  });

  // ── Book a Demo button (desktop) ─────────────────────────────────────────────
  test('"Book a Demo" button links to /contact (desktop)', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) < 1024) test.skip();
    const btn = page.locator('#book-demo-btn');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveAttribute('href', '/contact');
  });

  // ── Mobile menu ──────────────────────────────────────────────────────────────
  test('mobile menu toggle opens and closes', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) >= 1024) test.skip();

    const toggle = page.locator('#mobile-menu-toggle');
    await expect(toggle).toBeVisible();

    // Open
    await toggle.click();
    await expect(page.locator('#mobile-menu')).toBeVisible();

    // Close
    await toggle.click();
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
  });

  test('mobile nav has Book a Demo link', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) >= 1024) test.skip();

    await page.locator('#mobile-menu-toggle').click();
    const mobileBtn = page.locator('#mobile-book-demo-btn');
    await expect(mobileBtn).toBeVisible();
    await expect(mobileBtn).toHaveAttribute('href', '/contact');
  });
});
