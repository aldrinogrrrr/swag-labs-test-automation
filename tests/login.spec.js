const { test } = require('@playwright/test');
require('dotenv').config();
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const { loginPageLocators } = require('../locators/loginPageLocators');
const { loginUiLabels } = require('../ui-labels/login-ui-labels');

test.describe('Validate Login @smoke', () => {

    let loginPage;
    let homePage;

    test.beforeEach(async ({page}) => {

        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.navigateToLoginPage(process.env.baseURL);
    });

    test ('TC001 [Login] Log in with correct credentials', async () => {
        await loginPage.login(process.env.user, process.env.password);
        await homePage.validateHomePage();
    });

    test ('TC002 [Login] Log in with incorrect credentials', async () => {
        await loginPage.login(process.env.wronguser, process.env.password);
        await loginPage.validateloginMessage(loginUiLabels.loginError);
    });

    test ('TC003 [Login] User Logs Out', async () => {
        await loginPage.login(process.env.user, process.env.password);
        await homePage.validateHomePage(); 
        await homePage.logout();
        await loginPage.validateLogInPage();
    });

});