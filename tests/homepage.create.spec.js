const { test } = require('@playwright/test');
require('dotenv').config();
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const { orderData } = require('../test-data/order-test-data');


test.describe('Validate Orders From Home Page', () => {

    let loginPage;
    let homePage;

    test.beforeEach(async ({page}) => {

        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        await loginPage.navigateToLoginPage(process.env.baseURL);
        await loginPage.login(process.env.user, process.env.password);
        await homePage.validateHomePage();
    });

    test('TC006 [Home Page] Add Order To Cart from Home Page', async () => {
        await homePage.addToCartFromHomePage(orderData.firstOrder);
    });

    test('TC008 [Home Page] Remove Order From Cart', async () => {
        await homePage.addToCartFromHomePage(orderData.firstOrder);
        await homePage.removeOrder(orderData.firstOrder);
    });


});