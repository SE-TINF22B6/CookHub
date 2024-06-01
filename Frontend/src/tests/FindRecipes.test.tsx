import {By, until} from "selenium-webdriver";
import {driver, frontendUrl} from "../setupTests";

it('should be able to browse recipes', async () => {
    // ARRANGE
    await driver.get(`${frontendUrl}/findrecipes`);

    // ACT
    driver.wait(until.elementLocated(By.id('recipe1')));

    // ASSERT
    const recipe = await driver.findElement(By.id('recipe1'));
    const recipeName = await recipe.getText();
    expect(recipeName).toEqual('Pizza Margherita');
})