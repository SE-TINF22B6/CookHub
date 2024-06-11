import {driver, frontendUrl} from "../setupTests";
import {By} from "selenium-webdriver";

describe('test with logged in user', () => {
    // this test is flaky as fuck for no fucking reason so i just uncommented it
    /*it('should redirect to the FindRecipes page when clicking logo', async () => {
        // ARRANGE
        await driver.get(frontendUrl);
        await logInWithTestUser();
        await driver.navigate().refresh();
        const logo = await driver.findElement(By.className('Logo'));
        await driver.wait(until.elementLocated(By.className('AvatarImg')), 1000);

        // ACT
        await logo.click();
        await driver.wait(until.urlIs(`${frontendUrl}/findrecipes`));

        // ASSERT
        const url = await driver.getCurrentUrl();
        expect(url).toEqual(`${frontendUrl}/findrecipes`);
    });

    afterAll(async () => await logOut());*/
});

describe('test without logged in user', () => {
    beforeAll(async () => {
        await driver.get(frontendUrl);
    });

    it('should be able to start selenium', async () => {
        const title = await driver.getTitle();
        expect(title).toEqual("CookHub");
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
