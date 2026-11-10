import { test as baseTest, expect } from '@playwright/test';

export const test = baseTest.extend({
    page: async ({ page, isMobile }, use) => {
        if (isMobile) {
            // Handler Iklan Mobile (tombol 'TUTUP' di aside/bottom banner kumparan mobile)
            await page.addLocatorHandler(
                page.locator('aside[id="animated-mobile-mega-billboard"]').getByText('TUTUP', { exact: true }),
                async (overlay) => {
                    await overlay.tap({ noWaitAfter: true });
                }
            );
        } else {
            // Handler Iklan Desktop (icon 'close' overlay/pop-up ads)
            await page.addLocatorHandler(
                page.getByAltText(/close/i),
                async (overlay) => {
                    await overlay.click({ noWaitAfter: true });
                }
            );
        }

        await use(page);
    },
});

export { expect };
