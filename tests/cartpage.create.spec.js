const { test } = require('@playwright/test');
require('dotenv').config();
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const CartPage = require('../pages/cartPage');
const CheckoutPage = require('../pages/checkoutPage');
const { orderData, customerInfo } = require('../test-data/order-test-data');


test.describe('Validate Item Modifications on Cart', () => {

        let loginPage;
        let homePage;
        let cartPage;
        let checkoutPage;

        test.beforeEach(async ({page}) => {
            loginPage = new LoginPage(page);
            homePage = new HomePage(page);
            cartPage = new CartPage(page);
            checkoutPage = new CheckoutPage(page);
            await loginPage.navigateToLoginPage(process.env.baseURL);
            await loginPage.login(process.env.user, process.env.password);
            await homePage.addToCartFromHomePage(orderData.firstOrder);
            await cartPage.navigateToCartPage();
        });

        test('TC010 [Cart Page] Validate Checkout Item on Cart', async () => {
            await cartPage.validateOrderAddedToCart(orderData.firstOrder);
            await checkoutPage.navigateToCheckoutPage();
            await checkoutPage.fillOutForm(customerInfo.firstName, customerInfo.lastName, customerInfo.zipCode);
            await checkoutPage.finishCheckOut(orderData.firstOrder);
            await checkoutPage.validateCheckoutCompletePage();
        });



});
