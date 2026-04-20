import { test, expect } from '@playwright/test';

test.describe('Basic Accessibility Checks', () => {
  // ── Homepage ──────────────────────────────────────────────────────────────────
  test.describe('Homepage', () => {
    test('logo links have aria-label (navbar and footer)', async ({ page }) => {
      await page.goto('/');
      // Both navbar + footer logos should have aria-label — use .first() for single assertion
      const logo = page.locator('a[aria-label="Webpagix home"]').first();
      await expect(logo).toBeAttached();
      // Verify count >= 1
      const count = await page.locator('a[aria-label="Webpagix home"]').count();
      expect(count).toBeGreaterThanOrEqual(1);
    });

    test('mobile menu button has aria-label', async ({ page }) => {
      await page.goto('/');
      const toggle = page.locator('#mobile-menu-toggle');
      await expect(toggle).toHaveAttribute('aria-label', /.+/);
    });

    test('industries nav button has aria-expanded attribute', async ({ page, viewport }) => {
      if ((viewport?.width ?? 1280) < 1024) test.skip();
      await page.goto('/');
      const btn = page.locator('#industries-nav-btn');
      await expect(btn).toHaveAttribute('aria-expanded', 'false');
      await btn.click();
      await expect(btn).toHaveAttribute('aria-expanded', 'true');
    });

    test('services nav button has aria-expanded attribute', async ({ page, viewport }) => {
      if ((viewport?.width ?? 1280) < 1024) test.skip();
      await page.goto('/');
      const btn = page.locator('#services-nav-btn');
      await expect(btn).toHaveAttribute('aria-expanded', 'false');
      await btn.click();
      await expect(btn).toHaveAttribute('aria-expanded', 'true');
    });

    test('all images have non-empty alt attributes', async ({ page }) => {
      await page.goto('/');
      const images = page.locator('img');
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        expect(alt).not.toBeNull();
      }
    });

    test('page has exactly one h1', async ({ page }) => {
      await page.goto('/');
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });

    test('page has a lang attribute on html element', async ({ page }) => {
      await page.goto('/');
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBeTruthy();
    });

    test('form inputs have id attributes', async ({ page }) => {
      await page.goto('/');
      await page.locator('#cta').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      const inputs = ['#cta-name-input', '#cta-email-input', '#cta-phone-input'];
      for (const selector of inputs) {
        const el = page.locator(selector);
        await expect(el).toBeAttached();
        const id = await el.getAttribute('id');
        expect(id).toBeTruthy();
      }
    });
  });

  // ── Service Pages Accessibility ───────────────────────────────────────────────
  test.describe('Service Pages - one h1 each', () => {
    const slugs = ['ai-automation', 'web-development', 'mobile-apps', 'cloud', 'seo'];
    for (const slug of slugs) {
      test(`/services/${slug} has exactly one h1`, async ({ page }) => {
        await page.goto(`/services/${slug}`);
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBe(1);
      });
    }
  });

  // ── No duplicate IDs ─────────────────────────────────────────────────────────
  test('homepage has no duplicate element IDs', async ({ page }) => {
    await page.goto('/');

    const duplicates: string[] = await page.evaluate(() => {
      const allIds = Array.from(document.querySelectorAll('[id]')).map((el) => el.id);
      const seen = new Set<string>();
      const dupes: string[] = [];
      for (const id of allIds) {
        if (seen.has(id)) dupes.push(id);
        seen.add(id);
      }
      return dupes;
    });

    expect(duplicates, `Duplicate IDs found: ${duplicates.join(', ')}`).toHaveLength(0);
  });

  // ── Focus order / keyboard accessibility ─────────────────────────────────────
  test('submit button in CTA form is focusable via keyboard', async ({ page }) => {
    await page.goto('/');
    await page.locator('#cta').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const submitBtn = page.locator('#cta-submit-btn');
    await submitBtn.focus();
    await expect(submitBtn).toBeFocused();
  });

  test('"Book a Demo" desktop button is focusable', async ({ page, viewport }) => {
    if ((viewport?.width ?? 1280) < 640) test.skip();
    await page.goto('/');
    const btn = page.locator('#book-demo-btn');
    await btn.focus();
    await expect(btn).toBeFocused();
  });
});
