import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {Browser, Builder} from "selenium-webdriver";
import Chrome from 'selenium-webdriver/chrome';

jest.setTimeout(60_000);

test('renders learn react link', () => {
    render(<App />);
    const element = screen.getByText(/Start Journey/i);
    expect(element).toBeInTheDocument();
});

it('should be able to start selenium', async () => {
    const options = new Chrome.Options();
    options.addArguments('headless', 'ignore-certificate-errors');
    let driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();
    await driver.get('https://localhost:3000/');
    let title = await driver.getTitle();
    expect(title).toEqual("React App");
    await driver.close();
});