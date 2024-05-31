import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Browser, Builder} from "selenium-webdriver";
import Chrome from 'selenium-webdriver/chrome';

test('renders learn react link', () => {
    render(<App />);
    const element = screen.getByText(/Start Journey/i);
    expect(element).toBeInTheDocument();
});

it('should be able to start selenium', async () => {
    const options = new Chrome.Options();
    options.addArguments('headless');
    let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    let title = await driver.getTitle();
    expect(title).toEqual("Web form");
    await driver.close();
});