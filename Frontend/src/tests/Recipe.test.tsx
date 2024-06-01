import {driver, frontendUrl} from "../setupTests";
import {By} from "selenium-webdriver";
import {Select} from "selenium-webdriver/lib/select";

const logInWithTestUser = async () => await driver.executeScript(`
        await fetch('https://localhost:44328/Login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'email': 'admin@cookhub.com', 'password': 'password'}),
            credentials: 'include'
        });`)

const logOut = async () => await driver.executeScript(`
    await fetch('https://localhost:44328/Login/log-out', {
        method: 'GET',
        credentials: 'include',
    });`);

describe('test with logged in user', () => {
    beforeAll(async () => {
        await driver.get(frontendUrl);
        await logInWithTestUser();
        await driver.get(`${frontendUrl}/myrecipes/1`);
    });

    it('should show like button when user is logged in', async () => {
        // ARRANGE
        const likeButton = await driver.findElement(By.id('likeButton'));

        // ASSERT
        expect(await likeButton.isDisplayed()).toEqual(true);
    });

    it('should show adventurize button when user is logged in', async () => {
        // ARRANGE
        const adventureButton = await driver.findElement(By.className('adventureButton'));

        // ASSERT
        expect(await adventureButton.isDisplayed()).toEqual(true);
    });

    afterAll(logOut);
});

describe('test without logged in user', () => {
    beforeAll(async () => await driver.get(`${frontendUrl}/myrecipes/1`));

    it('should not show like button when user is logged in', async () => {
        // ARRANGE
        const likeButton = await driver.findElement(By.id('likeButton'));

        // ASSERT
        expect(await likeButton.isDisplayed()).toEqual(false);
    });

    it('should not show adventurize button when user is logged in', async () => {
        // ARRANGE
        const adventureButton = await driver.findElement(By.className('adventureButton'));

        // ASSERT
        expect(await adventureButton.isDisplayed()).toEqual(false);
    });

    it('should recalculate quantities when nr of portions changes', async () => {
        // ARRANGE
        const nrOfPortionsSelect = new Select(await driver.findElement(By.className('MuiNativeSelect-select')));
        const ingredientsList = await driver.findElement(By.id('ingredientsList'));
        expect(await ingredientsList.getText()).toEqual(
            '1 Pizza dough\n' +
            '1 cup Tomato sauce\n' +
            '200 gram Cheese\n' +
            'Basil\n' +
            'Salt\n' +
            'Pepper');

        // ACT
        await nrOfPortionsSelect.selectByValue('3');

        // ASSERT
        expect(await ingredientsList.getText()).toEqual(
            '3 Pizza dough\n' +
            '3 cup Tomato sauce\n' +
            '600 gram Cheese\n' +
            'Basil\n' +
            'Salt\n' +
            'Pepper');
    });

    it('should change title and instruction text after selecting adventurized version', async () => {
        // ARRANGE
        const recipeTitle = await driver.findElement(By.css('h1'));
        const instructionText = await driver.findElement(By.id('InstructionText'));
        const adventurizedVersion = await driver.findElement(By.className('adventureTableRow'));
        expect(await recipeTitle.getText()).toEqual('🗇 Pizza Margherita');
        expect(await instructionText.getText()).toContain('1. Preheat the Oven:\n');

        // ACT
        await driver.actions().click(adventurizedVersion).perform();

        // ASSERT
        expect(await recipeTitle.getText()).toEqual(`🗇 The Hero's Journey: Pizza Margherita`);
        expect(await instructionText.getText()).toContain('Chapter 1: The Call to Adventure\n');
    });
});