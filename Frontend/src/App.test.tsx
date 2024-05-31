import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {driver} from "./setupTests";

test('renders learn react link', () => {
    render(<App />);
    const element = screen.getByText(/Start Journey/i);
    expect(element).toBeInTheDocument();
});

it('should be able to start selenium', async () => {
    await driver.get('https://localhost:3000/');
    let title = await driver.getTitle();
    expect(title).toEqual("React App");
});