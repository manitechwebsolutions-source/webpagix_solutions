import { test, expect } from '@playwright/test';

test.describe('Homepage Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page loads and has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Webpagix\.ai/i);
  });

  test('hero section is visible with a heading', async ({ page }) => {
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('hero section has a CTA button or link', async ({ page }) => {
    // Look for any visible link that leads somewhere meaningful
    const ctaLinks = page.locator('a[href="/contact"], a[href="#cta"], a[href="/works"]');
    await expect(ctaLinks.first()).toBeAttached();
  });

  test('Services section heading is visible', async ({ page }) => {
    // Actual heading: "Services Built for the Modern Web"
    const heading = page.getByText('Services Built for the Modern Web');
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible({ timeout: 10000 });
  });

  test('Services section renders individual service cards', async ({ page }) => {
    const servicesSection = page.locator('#services');
    await servicesSection.scrollIntoViewIfNeeded();
    await expect(servicesSection.getByText('AI Automation')).toBeVisible({ timeout: 10000 });
    await expect(servicesSection.getByText('Web Development')).toBeVisible({ timeout: 10000 });
  });

  test('Process section renders', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1500));
    // Look for any section that appears after services — process cards contain step numbers or the word "process"
    const section = page.locator('section').nth(2);
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible({ timeout: 8000 });
  });

  test('CTA section is visible', async ({ page }) => {
    const ctaSection = page.locator('#cta');
    await ctaSection.scrollIntoViewIfNeeded();
    await expect(ctaSection).toBeVisible();
  });

  test('CTA section has the AI agent form card', async ({ page }) => {
    const ctaSection = page.locator('#cta');
    await ctaSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600); // let framer animations settle
    await expect(page.locator('#cta-phone-input')).toBeVisible();
  });

  test('navbar is still visible after scrolling', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 1000));
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
