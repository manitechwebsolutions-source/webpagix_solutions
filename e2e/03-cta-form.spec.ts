import { test, expect } from '@playwright/test';

// Helper: scroll CTA into view and wait for detection
async function openCTA(page: import('@playwright/test').Page) {
  await page.locator('#cta').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600); // framer motion settle
  // Wait for IP detection spinner to disappear
  await page.waitForSelector('#cta-country-code:not([disabled])', { timeout: 12000 });
}

test.describe('CTA / AI Agent Call Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await openCTA(page);
  });

  test('form title is visible', async ({ page }) => {
    await expect(page.getByText('Get a Call from Our AI Agent')).toBeVisible();
  });

  test('role select field is present with disabled placeholder', async ({ page }) => {
    const roleSelect = page.locator('#cta-role-select');
    await expect(roleSelect).toBeVisible();
    await expect(roleSelect).toHaveValue('');
  });

  test('name input accepts text', async ({ page }) => {
    const nameInput = page.locator('#cta-name-input');
    await expect(nameInput).toBeVisible();
    await nameInput.fill('John Doe');
    await expect(nameInput).toHaveValue('John Doe');
  });

  test('email input accepts text', async ({ page }) => {
    const emailInput = page.locator('#cta-email-input');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('john@example.com');
    await expect(emailInput).toHaveValue('john@example.com');
  });

  test('phone input is visible and accepts digits', async ({ page }) => {
    const phoneInput = page.locator('#cta-phone-input');
    await expect(phoneInput).toBeVisible();
    await phoneInput.fill('9876543210');
    await expect(phoneInput).toHaveValue('9876543210');
  });

  test('country code selector is present', async ({ page }) => {
    const countrySelect = page.locator('#cta-country-code');
    await expect(countrySelect).toBeVisible();
    const value = await countrySelect.inputValue();
    expect(value).toMatch(/^\+\d+$/);
  });

  test('country code selector has multiple options', async ({ page }) => {
    const countrySelect = page.locator('#cta-country-code');
    const optionCount = await countrySelect.locator('option').count();
    expect(optionCount).toBeGreaterThan(10);
  });

  test('can change country code', async ({ page }) => {
    const countrySelect = page.locator('#cta-country-code');
    await countrySelect.selectOption('+1');
    await expect(countrySelect).toHaveValue('+1');
  });

  test('role select can be changed', async ({ page }) => {
    const roleSelect = page.locator('#cta-role-select');
    await roleSelect.selectOption('CEO / Founder');
    await expect(roleSelect).toHaveValue('CEO / Founder');
  });

  test('submit button is present and enabled initially', async ({ page }) => {
    const submitBtn = page.locator('#cta-submit-btn');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
    await expect(submitBtn).toContainText(/call me now/i);
  });

  test('submitting without phone shows error', async ({ page }) => {
    await page.locator('#cta-phone-input').clear();
    // Bypass native HTML5 'required' validation by dispatching submit directly on the form
    await page.evaluate(() => {
      const form = document.querySelector<HTMLFormElement>('#cta-phone-input')?.closest('form');
      if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
      }
    });

    // The error message from CTASection.tsx: 'Phone number is required to call you.'
    await expect(
      page.getByText(/phone number is required/i)
    ).toBeVisible({ timeout: 8000 });
  });

  test('error state shows error border on phone field', async ({ page }) => {
    await page.locator('#cta-phone-input').clear();
    // Bypass native HTML5 'required' validation
    await page.evaluate(() => {
      const form = document.querySelector<HTMLFormElement>('#cta-phone-input')?.closest('form');
      if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
      }
    });

    await expect(page.getByText(/phone number is required/i)).toBeVisible({ timeout: 8000 });

    // The phone input wrapper should reflect error state
    const hasErrorBorder = await page.evaluate(() => {
      const wrapper = document.querySelector('#cta-phone-input')?.closest('.flex.rounded-lg');
      return wrapper ? wrapper.className.includes('border-red') : false;
    });
    expect(hasErrorBorder).toBe(true);
  });

  test('form posts to /api/request-call (network mock) — success path', async ({ page }) => {
    await page.route('/api/request-call', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('#cta-role-select').selectOption('CEO / Founder');
    await page.locator('#cta-name-input').fill('Test User');
    await page.locator('#cta-email-input').fill('test@example.com');
    await page.locator('#cta-phone-input').fill('9876543210');
    await page.locator('#cta-submit-btn').click();

    await expect(page.getByText(/calling you now/i)).toBeVisible({ timeout: 12000 });
  });

  test('success state shows reset link', async ({ page }) => {
    await page.route('/api/request-call', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('#cta-phone-input').fill('9876543210');
    await page.locator('#cta-submit-btn').click();

    await expect(page.getByText(/calling you now/i)).toBeVisible({ timeout: 12000 });
    await expect(page.getByText('Submit another request')).toBeVisible();
  });

  test('"Submit another request" resets the form', async ({ page }) => {
    await page.route('/api/request-call', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('#cta-phone-input').fill('9876543210');
    await page.locator('#cta-submit-btn').click();

    const resetLink = page.getByText('Submit another request');
    await expect(resetLink).toBeVisible({ timeout: 12000 });
    await resetLink.click();

    await expect(page.locator('#cta-submit-btn')).toBeVisible();
    await expect(page.locator('#cta-phone-input')).toHaveValue('');
  });

  test('API error shows error message in form', async ({ page }) => {
    await page.route('/api/request-call', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ success: false, error: 'Server error' }),
      });
    });

    await page.locator('#cta-phone-input').fill('9876543210');
    await page.locator('#cta-submit-btn').click();

    await expect(page.getByText(/server error/i)).toBeVisible({ timeout: 12000 });
  });
});
