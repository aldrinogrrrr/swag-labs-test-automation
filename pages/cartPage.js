const { expect } = require('@playwright/test');
const { cartLocators } = require('../locators/cartPageLocators');
const { headerLocators } = require('../locators/homePageLocators');

class CartPage {
    constructor(page) {
        this.page = page;
    }

    async validateCartPage() {
        await expect(this.page).toHaveURL(/.*cart/);
        const cartTitle = this.page.locator(cartLocators.cartTitle);
        await cartTitle.waitFor({ state: 'visible' });
        const continueShoppingBtn = this.page.locator(cartLocators.continueShoppingBtn);
        await continueShoppingBtn.waitFor({ state: 'visible' });
    }

    async navigateToCartPage() {
        const shoppingCartBtn = this.page.locator(headerLocators.shoppingCartBtn);
        await shoppingCartBtn.waitFor({ state: 'visible' });
        await shoppingCartBtn.click();
    }

    async validateOrderAddedToCart(productName) {
        await expect(this.page).toHaveURL(/.*cart/);
        const cartCard = this.page.locator(cartLocators.cartItem, {
            has: this.page.locator(cartLocators.cartName, {hasText: productName })
        });
        await cartCard.waitFor({ state: 'visible' });
    }




}
module.exports = CartPage;