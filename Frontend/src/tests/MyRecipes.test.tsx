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
        const cardBacks = await driver.findElements(By.className('back'));
        const heading = await driver.findElement(By.css('h1'));
        const cardTitles = await driver.findElements(By.css('.title p'));
        await driver.wait(until.elementIsVisible(cardTitles[0]));

        // ASSERT
        expect(await heading.getText()).toEqual("Carlos's Recipes");
        expect(await cardBacks[0].getText()).toEqual('Hover Me');
        expect(cardBacks).toHaveLength(2);

        const cardTitleTexts = await Promise.all(cardTitles.map(async card => await card.getText()));
        expect(cardTitleTexts).toContain('Pizza Margherita');
        expect(cardTitleTexts).toContain('Spaghetti Carbonara');
    });

    afterAll(logOut);
});

describe('test without logged in user', () => {
    beforeAll(async () => await driver.get(`${frontendUrl}/myrecipes`));

    it('should show error message when not logged in', async () => {
        // ARRANGE
        const messages = await driver.findElements(By.css('h1'));

        // ASSERT
        expect(await messages[0].getText()).toEqual('You are not logged in!');
        expect(await messages[1].getText()).toEqual('Please login or sign up!');
    });
});
