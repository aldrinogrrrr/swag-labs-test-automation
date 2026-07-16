const { expect } = require('@playwright/test');
const { loginPageLocators } = require('../locators/loginPageLocators');

class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async navigateToLoginPage(URL) {
        await this.page.goto(URL);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validateLogInPage() {
        const username = this.page.locator(loginPageLocators.usernameTxtBox);
        await username.waitFor({ state: 'visible' });
        const password = this.page.locator(loginPageLocators.passwordTxtBox);
        await password.waitFor({ state: 'visible' });
    }

    async login(username, password) {
        await this.page.fill(loginPageLocators.usernameTxtBox, username);
        await this.page.fill(loginPageLocators.passwordTxtBox, password);
        await this.page.locator(loginPageLocators.loginBtn).click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validateloginMessage(message) {
        const msg = this.page.locator(loginPageLocators.message);
        await msg.waitFor({ state: 'visible' });
        await expect(msg).toContainText(message);
    }

}
module.exports = LoginPage;


