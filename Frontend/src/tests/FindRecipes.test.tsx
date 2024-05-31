import {By, until} from "selenium-webdriver";
import {driver} from "../setupTests";

it('should be able to browse recipes', async () => {
    await driver.get('https://localhost:3000/findrecipes');
    driver.wait(until.elementLocated(By.id('recipe1')));
    let recipe = await driver.findElement(By.id('recipe1'));
    let recipeName = await recipe.getText();
    expect(recipeName).toEqual('Pizza Margherita');
})