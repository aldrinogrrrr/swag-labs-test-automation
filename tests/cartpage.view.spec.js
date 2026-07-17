const { test } = require('@playwright/test');
require('dotenv').config();
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const CartPage = require('../pages/cartPage');
const { orderData } = require('../test-data/order-test-data');


test.describe ('Validate Cart Page', () => {

    let loginPage;
    let homePage;
    let cartPage;

    test.beforeEach(async ({page}) => {

        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        cartPage = new CartPage(page);
        await loginPage.navigateToLoginPage(process.env.baseURL);
        await loginPage.login(process.env.user, process.env.password);
        await homePage.validateHomePage();
    });

    test('TC005 [Cart Page] Validate Cart Page', async () => {
        await cartPage.navigateToCartPage();
        await cartPage.validateCartPage();
    });

    test('TC007 [Cart Page] Validate Order Added To Cart', async () => {
        await homePage.addToCartFromHomePage(orderData.firstOrder);
        await cartPage.navigateToCartPage();
        await cartPage.validateOrderAddedToCart(orderData.firstOrder);
    });
});