const { test } = require('@playwright/test');
require('dotenv').config();
const LoginPage = require('../pages/loginPage');
const HomePage = require('../pages/homePage');
const InventoryPage = require('../pages/inventoryPage');
const { orderData } = require('../test-data/order-test-data');


test.describe('Validate Inventory Page @regression', () => {

    let loginPage;
    let homePage;
    let inventoryPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigateToLoginPage(process.env.baseURL);
        await loginPage.login(process.env.user, process.env.password);
    });

    test('TC009 [Inventory Page] View Product In Inventory Page', async () => {
        await inventoryPage.navigateToInventoryPage(orderData.firstOrder);
        await inventoryPage.validateProductInventory(orderData.firstOrder);
    });




});