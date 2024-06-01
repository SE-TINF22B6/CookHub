import {driver, frontendUrl} from "../setupTests";
import {By, until, WebElement} from "selenium-webdriver";

async function setup(): Promise<WebElement[]> {
    await driver.get(`${frontendUrl}/login`);
    return [await driver.findElement(By.id('exampleInputEmail1')),
        await driver.findElement(By.id('exampleInputPassword1')),
        await driver.findElement(By.className('SubmitButton'))];
}

test('user should be able to log in', async () => {
    // ARRANGE
    const [emailInput, passwordInput, submitButton] = await setup();

    // ACT
    await emailInput.sendKeys('admin@cookhub.com');
    await passwordInput.sendKeys('password');
    await submitButton.click();

    // ASSERT
    await driver.wait(until.urlIs(`${frontendUrl}/profile`));
    await driver.wait(until.elementLocated(By.className('UsernameHolder')));
    const usernameHolder = await driver.findElement(By.className('UsernameHolder'));
    const username = await usernameHolder.getText();
    expect(username).toEqual('Carlos');
});

it('should show an error message when login data is wrong', async () => {
    // ARRANGE
    const [emailInput, passwordInput, submitButton] = await setup();

    // ACT
    await emailInput.sendKeys('admin@cookhub.com');
    await passwordInput.sendKeys('wrong.password');
    await submitButton.click();

    // ASSERT
    const messageContainer = await driver.findElement(By.id('messageContainer'));
    await driver.wait(until.elementTextContains(messageContainer, 'Login'));
    const message = await messageContainer.getText();
    expect(message).toEqual('Login failed!');
});