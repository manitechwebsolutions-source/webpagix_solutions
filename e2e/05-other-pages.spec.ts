import { test, expect } from '@playwright/test';

test.describe('Static Pages', () => {
  // ── About ────────────────────────────────────────────────────────────────────
  test.describe('/about', () => {
    test('loads and has title', async ({ page }) => {
      await page.goto('/about');
      await expect(page).toHaveTitle(/about|webpagix/i);
    });

    test('has a visible h1', async ({ page }) => {
      await page.goto('/about');
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('has navbar and footer', async ({ page }) => {
      await page.goto('/about');
      await expect(page.locator('header')).toBeVisible();
      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
    });
  });

  // ── Contact ──────────────────────────────────────────────────────────────────
  test.describe('/contact', () => {
    test('loads and has title', async ({ page }) => {
      await page.goto('/contact');
      await expect(page).toHaveTitle(/contact|webpagix/i);
    });

    test('has a visible h1', async ({ page }) => {
      await page.goto('/contact');
      await expect(page.locator('h1').first()).toBeVisible();
    });

    test('has a contact form or email/phone visible', async ({ page }) => {
      await page.goto('/contact');
      // Either a form element or text containing contact details
      const form = page.locator('form');
      const email = page.getByText(/@/);
      const hasFormOrEmail = (await form.count()) > 0 || (await email.count()) > 0;
      expect(hasFormOrEmail).toBeTruthy();
    });

    test('has navbar', async ({ page }) => {
      await page.goto('/contact');
      await expect(page.locator('header')).toBeVisible();
    });
  });

  // ── Blog ─────────────────────────────────────────────────────────────────────
  test.describe('/blog', () => {
    test('loads and has title', async ({ page }) => {
      await page.goto('/blog');
      await expect(page).toHaveTitle(/blog|webpagix/i);
    });

    test('has a visible heading', async ({ page }) => {
      await page.goto('/blog');
      await expect(page.locator('h1, h2').first()).toBeVisible();
    });

    test('has navbar', async ({ page }) => {
      await page.goto('/blog');
      await expect(page.locator('header')).toBeVisible();
    });
  });

  // ── Works ────────────────────────────────────────────────────────────────────
  test.describe('/works', () => {
    test('loads and has title', async ({ page }) => {
      await page.goto('/works');
      await expect(page).toHaveTitle(/works|portfolio|webpagix/i);
    });

    test('has a visible heading', async ({ page }) => {
      await page.goto('/works');
      await expect(page.locator('h1, h2').first()).toBeVisible();
    });

    test('has navbar and footer', async ({ page }) => {
      await page.goto('/works');
      await expect(page.locator('header')).toBeVisible();
      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
    });
  });

  // ── 404 ──────────────────────────────────────────────────────────────────────
  test.describe('404 Not Found', () => {
    test('unknown route renders a not-found message', async ({ page }) => {
      const response = await page.goto('/this-page-definitely-does-not-exist-xyz');
      const status = response?.status();
      const bodyText = await page.locator('body').innerText();
      const is404Page = status === 404 || /not found|404|page not found/i.test(bodyText);
      expect(is404Page).toBeTruthy();
    });

    test('404 page has a link back to home', async ({ page }) => {
      await page.goto('/totally-unknown-route-abc123');
      const homeLink = page.locator('a[href="/"]');
      // Should have at least one link to home (navbar logo or explicit button)
      await expect(homeLink.first()).toBeAttached();
    });
  });
});
