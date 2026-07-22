const { expect } = require('@playwright/test');
const { inventoryLocators } = require('../locators/inventoryPageLocators');
const { bodyLocators } = require('../locators/homePageLocators');

class InventoryPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToInventoryPage(productName) {
        const productCard = this.page.locator(bodyLocators.inventoryList, {
            has: this.page.locator(bodyLocators.inventoryName, { hasText: productName })
        });

        const inventoryLink = productCard.locator(bodyLocators.inventoryName);
        await inventoryLink.waitFor({ state: 'visible' });
        await inventoryLink.click();
    }

    async validateProductInventory(productName) {
        const prodName = this.page.locator(inventoryLocators.inventoryName);
        await prodName.waitFor({ state: 'visible' });
        await expect(prodName).toContainText(productName);
    }



}
module.exports = InventoryPage;