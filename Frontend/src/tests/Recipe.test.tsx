import {driver, frontendUrl, logInWithTestUser, logOut} from "../setupTests";
import {By} from "selenium-webdriver";
import {Select} from "selenium-webdriver/lib/select";

const unlikeRecipe = async (recipeId: number) => driver.executeScript(
    `await fetch('https://localhost:44328/User/unlike-recipe/1/${recipeId}', {
            method: 'DELETE',
            credentials: 'include'
    });`);

const likeRecipe = async (recipeId: number) => driver.executeScript(
    `await fetch('https://localhost:44328/User/like-recipe/1/${recipeId}', {
            method: 'POST',
            credentials: 'include'
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

    test('user should be able to unlike a recipe', async () => {
        // ARRANGE
        let likeCount = await driver.findElement(By.id('likeCount'));
        let likeButton = await driver.findElement(By.id('likeButton'));
        expect(await likeCount.getText()).toEqual('Likes: 1');
        expect(await likeButton.getAttribute('aria-pressed')).toEqual('true');

        try {
            // ACT
            await likeButton.click();
            await driver.wait(until.elementTextIs(likeCount, 'Likes: 0'));

            // ASSERT
            expect(await likeCount.getText()).toEqual('Likes: 0');
            expect(await likeButton.getAttribute('aria-pressed')).toEqual('false');
            await driver.navigate().refresh();
            likeCount = await driver.findElement(By.id('likeCount'));
            likeButton = await driver.findElement(By.id('likeButton'));
            expect(await likeCount.getText()).toEqual('Likes: 0');
            expect(await likeButton.getAttribute('aria-pressed')).toEqual('false');
        } finally {
            await likeRecipe(1);
        }
    });

    test('user should be able to like a recipe', async () => {
        // ARRANGE
        await driver.get(`${frontendUrl}/myrecipes/3`);
        let likeCount = await driver.findElement(By.id('likeCount'));
        let likeButton = await driver.findElement(By.id('likeButton'));
        expect(await likeCount.getText()).toEqual('Likes: 0');
        expect(await likeButton.getAttribute('aria-pressed')).toEqual('false');

        try {
            // ACT
            await likeButton.click();
            await driver.wait(until.elementTextIs(likeCount, 'Likes: 1'));

            // ASSERT
            expect(await likeCount.getText()).toEqual('Likes: 1');
            expect(await likeButton.getAttribute('aria-pressed')).toEqual('true');
            await driver.navigate().refresh();
            likeCount = await driver.findElement(By.id('likeCount'));
            likeButton = await driver.findElement(By.id('likeButton'));
            expect(await likeCount.getText()).toEqual('Likes: 1');
            expect(await likeButton.getAttribute('aria-pressed')).toEqual('true');
        } finally {
            await unlikeRecipe(3);
        }
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