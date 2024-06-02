import {By, until} from "selenium-webdriver";
import {driver, frontendUrl} from "../setupTests";

it('should display the top 5 recipes', async () => {
    // ARRANGE
    await driver.get(`${frontendUrl}/findrecipes`);

    // ACT
    driver.wait(until.elementLocated(By.id('recipe1')));

    // ASSERT
    const recipeNames = await driver.findElements(By.className('recipeName'));
    expect(await recipeNames[0].getText()).toEqual('Pizza Margherita');
    expect(await recipeNames[1].getText()).toEqual('Spaghetti Carbonara');
    expect(await recipeNames[2].getText()).toEqual('Chicken Tikka Masala');
    expect(await recipeNames[3].getText()).toEqual('Mango Sticky Rice');
    expect(await recipeNames[4].getText()).toEqual('Greek Salad');
});

test('user should be able to search for recipes', async () => {
    // ARRANGE
    await driver.get(`${frontendUrl}/findrecipes`);
    const searchField = await driver.findElement(By.className('search__field'));

    // ACT
    await searchField.sendKeys('ma');

    // ASSERT
    const results = await driver.findElements(By.className('results'));
    expect(results).toHaveLength(3);

    const resultTitles = await driver.findElements(By.className('preview__title'));
    expect(await resultTitles[0].getText()).toEqual('Mango Sticky Rice');
    expect(await resultTitles[1].getText()).toEqual('Pizza Margherita');
    expect(await resultTitles[2].getText()).toEqual('Chicken Tikka Masala');
});