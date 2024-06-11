import {driver, frontendUrl} from "../setupTests";
import {By, until, WebElement} from "selenium-webdriver";
import {backendUrl} from "../App";

async function setup() : Promise<WebElement[]> {
    await driver.get(`${frontendUrl}/signup`);
    return [await driver.findElement(By.id('username')),
            await driver.findElement(By.id('email')),
            await driver.findElement(By.id('password_1')),
            await driver.findElement(By.id('password_2'))];
}

describe('success case', () => {
    test('user should be able to sign up', async () => {
        // ARRANGE
        const [usernameInput, emailInput, passwordInput, repeatPasswordInput] = await setup();
        const submitButton = await driver.findElement(By.id('submitButton'));

        // ACT
        await usernameInput.sendKeys('TestUser');
        await emailInput.sendKeys('test@example.com');
        await passwordInput.sendKeys('password.123');
        await repeatPasswordInput.sendKeys('password.123');
        await driver.actions().click(submitButton).perform();

        // ASSERT
        await driver.wait(until.urlIs(`${frontendUrl}/profile`));
        await driver.wait(until.elementLocated(By.className('UsernameHolder')));
        const usernameHolder = await driver.findElement(By.className('UsernameHolder'));
        const username = await usernameHolder.getText();
        expect(username).toEqual('TestUser');
    });

    afterEach(async () => await driver.executeScript(`
        await fetch('https://${backendUrl}/User/delete-account', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify('password.123'),
            credentials: 'include'
        });`));
});

describe('fail cases', () => {
    it('should show message that username is invalid', async () => {
        // ARRANGE
        const [usernameInput] = await setup();

        // ACT
        await usernameInput.sendKeys('usr');

        // ASSERT
        const messageContainer = await driver.findElement(By.id('messageContainer'));
        const message = await messageContainer.getText();
        expect(message).toEqual('Username must be 4-16 characters long and can only contain letters, numbers, and underscores.');
    });

    it('should show message that email is invalid', async () => {
        // ARRANGE
        const [usernameInput, emailInput] = await setup();

        // ACT
        await usernameInput.sendKeys('TestUser');
        await emailInput.sendKeys('email');

        // ASSERT
        const messageContainer = await driver.findElement(By.id('messageContainer'));
        const message = await messageContainer.getText();
        expect(message).toEqual('Please enter a valid email address.');
    });

    it('should show message that password is invalid', async () => {
        // ARRANGE
        const [usernameInput, emailInput, passwordInput, repeatPasswordInput] = await setup();

        // ACT
        await usernameInput.sendKeys('TestUser');
        await emailInput.sendKeys('test@example.com');
        await passwordInput.sendKeys('password.');
        await repeatPasswordInput.sendKeys('password.');

        // ASSERT
        const messageContainer = await driver.findElement(By.id('messageContainer'));
        const message = await messageContainer.getText();
        expect(message).toEqual('Password must be 8-32 characters long, contain at least one letter, one number, and one special character.');
    });

    it('should show message that passwords do not match', async () => {
        // ARRANGE
        const [usernameInput, emailInput, passwordInput, repeatPasswordInput] = await setup();

        // ACT
        await usernameInput.sendKeys('TestUser');
        await emailInput.sendKeys('test@example.com');
        await passwordInput.sendKeys('password.123');
        await repeatPasswordInput.sendKeys('password.1234');

        // ASSERT
        const messageContainer = await driver.findElement(By.id('messageContainer'));
        const message = await messageContainer.getText();
        expect(message).toEqual("Passwords don't match!");
    });
});