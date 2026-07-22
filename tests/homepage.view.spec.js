const { test } = require('@playwright/test');
require('dotenv').config();
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');

test.describe('Validate Home Page @regression', () => {

    let loginPage;
    let homePage;

    test.beforeEach(async ({page}) => {

        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.navigateToLoginPage(process.env.baseURL);
        await loginPage.login(process.env.user, process.env.password);
    });

    test('TC004 [Home Page] Validate Home Page View', async () => {
        await homePage.validateHomePage();
    });
});