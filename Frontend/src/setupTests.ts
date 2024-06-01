// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {Browser, Builder, WebDriver} from "selenium-webdriver";
import Chrome from "selenium-webdriver/chrome";

export let driver : WebDriver;
export const frontendUrl = "https://localhost:3000";

export const logInWithTestUser = async () => await driver.executeScript(`
    await fetch('https://localhost:44328/Login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'email': 'admin@cookhub.com', 'password': 'password'}),
        credentials: 'include'
    });`);

export const logOut = async () => await driver.executeScript(`
    await fetch('https://localhost:44328/Login/log-out', {
        method: 'GET',
        credentials: 'include',
    });`);

jest.setTimeout(60_000);

beforeAll(async () => {
    const options = new Chrome.Options();
    options.addArguments('headless', 'ignore-certificate-errors');
    driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    await driver.manage().setTimeouts({ implicit: 2000 });
});

afterAll(async () => {
    await driver.close();
});