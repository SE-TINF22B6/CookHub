import {driver, frontendUrl, logInWithTestUser, logOut} from "../setupTests";
import {By, until} from "selenium-webdriver";

describe('test with logged in user', () => {
    beforeAll(async () => {
        await driver.get(frontendUrl);
        await logInWithTestUser();
        await driver.get(`${frontendUrl}/myrecipes`);
    });

    it('should show users recipes when logged in', async () => {
        // ARRANGE
        const likedRecipesHeading = await driver.findElement(By.css('.recipe-column:nth-of-type(1) .heading'));
        const ownRecipesHeading = await driver.findElement(By.css('.recipe-column:nth-of-type(2) .heading'));
        const likedRecipesCards = await driver.findElements(By.css('.recipe-column:nth-child(1) .recipe-card-container'));
        const ownRecipesCards = await driver.findElements(By.css('.recipe-column:nth-child(2) .recipe-card-container'));

        // ASSERT
        expect(await likedRecipesHeading.getText()).toContain("'s Liked Recipes");
        expect(await ownRecipesHeading.getText()).toContain("'s Own Recipes");

        // Check for at least one card in each section to ensure recipes are displayed
        expect(likedRecipesCards.length).toBeGreaterThan(0);
        expect(ownRecipesCards.length).toBeGreaterThan(0);
    });

    afterAll(logOut);
});

describe('test without logged in user', () => {
    beforeAll(async () => await driver.get(`${frontendUrl}/myrecipes`));

    it('should show error message when not logged in', async () => {
        // ARRANGE
        const messages = await driver.findElements(By.css('div'));

        // ASSERT
        expect(await messages[0].getText()).toEqual(
            'You are not logged in!\n' +
            'Please login or sign up!\n' +
            'To Login\n' +
            'Sign Up');
    });
});
