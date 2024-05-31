import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Browser, Builder} from "selenium-webdriver";

test('renders learn react link', () => {
    render(<App />);
    const element = screen.getByText(/Start Journey/i);
    expect(element).toBeInTheDocument();
});

it('should be able to start selenium', async () => {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
    let title = await driver.getTitle();
    expect(title).toEqual("Web form");
    await driver.close();
});