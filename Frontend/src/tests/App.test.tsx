import {driver, frontendUrl, logInWithTestUser, logOut} from "../setupTests";
import {By} from "selenium-webdriver";

describe('test with logged in user', () => {
    beforeAll(async () => {
        await driver.get(frontendUrl);
        await logInWithTestUser();
        await driver.navigate().refresh();
    });

    it('should redirect to the FindRecipes page when clicking logo', async () => {
        // ARRANGE
        const logo = await driver.findElement(By.className('Logo'));

        // ACT
        await logo.click();

        // ASSERT
        const url = await driver.getCurrentUrl();
        expect(url).toEqual(`${frontendUrl}/findrecipes`);
    });

    afterAll(async () => await logOut());
});

describe('test without logged in user', () => {
    beforeAll(async () => {
        await driver.get(frontendUrl);
    });

    it('should be able to start selenium', async () => {
        const title = await driver.getTitle();
        expect(title).toEqual("React App");
    });

    it('should redirect to the home page when clicking logo', async () => {
        // ARRANGE
        const logo = await driver.findElement(By.className('Logo'));

        // ACT
        await logo.click();

        // ASSERT
        const url = await driver.getCurrentUrl();
        expect(url).toEqual(`${frontendUrl}/`);
    });
});
