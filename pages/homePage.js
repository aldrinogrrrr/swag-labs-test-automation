const { expect } = require('@playwright/test');
const { headerLocators, bodyLocators, footerLocators } = require('../locators/homePageLocators');

class homePage {
    constructor(page) {
        this.page = page;
    }

    async validateHomePage() {
        await expect(this.page).toHaveURL(/.*inventory/);
        const swagLogo = this.page.locator(headerLocators.swagLabsLogo);
        await swagLogo.waitFor({ state: 'visible' });
        const swagAllRights = this.page.locator(footerLocators.swagAllRights);
        await swagAllRights.waitFor({ state: 'visible' });
    }

    async logout() {
        const hamburgerMenu = this.page.locator(headerLocators.hamburgerMenuBtn);
        await hamburgerMenu.waitFor({ state: 'visible' });
        await hamburgerMenu.click();
        const logout = this.page.locator(headerLocators.logoutLink);
        await logout.waitFor({ state: 'visible' });
        await logout.click();
    }

    async addToCartFromHomePage(productName) {
        // Find the product card containing the name
        const productCard = this.page.locator(bodyLocators.inventoryList, {
            has: this.page.locator(bodyLocators.inventoryName, { hasText: productName })
        });
        
        // Find the "Add to cart" button inside that card
        const addToCartBtn = productCard.locator('button:has-text("Add to cart")');
        await addToCartBtn.waitFor({ state: 'visible' });
        await addToCartBtn.click();
        
        const removeBtn = productCard.locator('button:has-text("Remove")');
        await removeBtn.waitFor({ state: 'visible' });
    }

    async removeOrder(productName) { 
        const productCard = this.page.locator(bodyLocators.inventoryList, {
            has: this.page.locator(bodyLocators.inventoryName, { hasText: productName })
        });

        const removeBtn = productCard.locator('button:has-text("Remove")');
        await removeBtn.waitFor({ state: 'visible' });
        await removeBtn.click();

        const addToCartBtn = productCard.locator('button:has-text("Add to cart")');
        await addToCartBtn.waitFor({ state: 'visible' });
    }


}
module.exports = homePage;