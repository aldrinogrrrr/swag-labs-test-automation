const { expect } = require('@playwright/test');
const { checkoutLocators } = require('../locators/checkoutPageLocators');
const { cartLocators } = require('../locators/cartPageLocators');
const { checkoutCompleteLabels } = require('../ui-labels/checkout-ui-labels');

class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToCheckoutPage() {
        const checkOutBtn = this.page.locator(cartLocators.checkoutBtn);
        await checkOutBtn.waitFor({ state: 'visible' });
        await checkOutBtn.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.page).toHaveURL(/.*checkout-step-one/);
    }

    async fillOutForm(firstName, lastName, zipCode) {
        await this.page.fill(checkoutLocators.fnameTxtbox, firstName);
        await this.page.fill(checkoutLocators.lnameTxtbox, lastName);
        await this.page.fill(checkoutLocators.zipTxtbox, zipCode);
        
        const contBtn = this.page.locator(checkoutLocators.continueBtn);
        await contBtn.waitFor({ state: 'visible' });
        await contBtn.click();
        await this.page.waitForLoadState('domcontentloaded');

        await expect(this.page).toHaveURL(/.*checkout-step-two/);
    }

    async finishCheckOut(productName) {
        const inventoryName = this.page.locator(checkoutLocators.inventoryName);
        await inventoryName.waitFor({ state: 'visible' });
        await expect(inventoryName).toContainText(productName);

        const completeBtn = this.page.locator(checkoutLocators.finishBtn);
        await completeBtn.waitFor({ state: 'visible' });
        await completeBtn.click();
    }

    async validateCheckoutCompletePage() {
        await expect(this.page).toHaveURL(/.*checkout-complete/);
        const thanksMsg = this.page.locator(checkoutLocators.thankYouMsg);
        await thanksMsg.waitFor({ state: 'visible' });
        await expect(thanksMsg).toContainText(checkoutCompleteLabels.thankYouMsg);

        const backBtn = this.page.locator(checkoutLocators.backHomeBtn);
        await backBtn.waitFor({ state: 'visible' });
        
        const downloadBtn = this.page.locator(checkoutLocators.generatePDF);
        await downloadBtn.waitFor({ state: 'visible' });
    }
}
module.exports = CheckoutPage;