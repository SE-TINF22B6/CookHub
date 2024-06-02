import {driver, frontendUrl, logInWithTestUser, logOut} from "../setupTests";
import {By, until} from "selenium-webdriver";

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