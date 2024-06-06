import {driver, frontendUrl, logInWithTestUser, logOut} from "../setupTests";
import {By, until} from "selenium-webdriver";

const changeUsername =  async (newName: string) => driver.executeScript(
    `await fetch('https://localhost:44328/User/change-username', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify('${newName}'),
        credentials: 'include'
    });`);

const uploadImage = async () => await driver.executeScript('document.querySelector(".ImageInput").firstElementChild.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAFCAIAAAAVLyF7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVBhXhcpBCgAwDALB/v/T1qKIBEL3EEbISQCs3R68DdZm/oyEYZb5btRIn281rAngAmE2d4kg2D28AAAAAElFTkSuQmCC"');

describe('test with logged in user', () => {
    beforeAll(async () => {
        await driver.get(frontendUrl);
        await logInWithTestUser();
        await driver.get(`${frontendUrl}/settings`);
    });

    test('user can change user name', async () => {
        // ARRANGE
        const usernameInfo = await driver.findElement(By.id('usernameInfo'));
        const usernameTextField = await driver.findElement(By.id('filled-basic'));
        const submitButton = await driver.findElement(By.id('changeUsernameButton'));
        expect(await usernameInfo.getText()).toEqual('Username: Carlos');

        // ACT
        await usernameTextField.sendKeys('New_Name');
        await submitButton.click();
        await driver.wait(until.alertIsPresent());
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        await alert.accept();

        // ASSERT
        expect(alertText).toEqual('Username changed successfully to New_Name');
        expect(await usernameInfo.getText()).toEqual('Username: New_Name');
    });

    test('user can change password', async () => {
        // ARRANGE
        const oldPasswordInput = await driver.findElement(By.id('oldPassword'));
        const newPasswordInput = await driver.findElement(By.id('newPassword'));
        const repeatNewPasswordInput = await driver.findElement(By.id('repeatNewPassword'));
        const changePasswordButton = await driver.findElement(By.id('changePasswordButton'));
        const message = await driver.findElement(By.id('passwordAfterChangeMessage'));

        // ACT
        await oldPasswordInput.sendKeys('password');
        await newPasswordInput.sendKeys('password.123');
        await repeatNewPasswordInput.sendKeys('password.123');
        await changePasswordButton.click();
        await driver.wait(until.elementIsVisible(message));

        // ASSERT
        expect(await message.getText()).toEqual('Password Changed');
    });

    test('user can change profile picture', async () => {
        // ARRANGE
        await driver.wait(until.elementLocated(By.className('ImageInput')));
        const profilePicture = await driver.findElement(By.id('user-image'));
        const submitButton = await driver.findElement(By.id('changeProfilePictureButton'));
        const oldProfilePicture = await profilePicture.getAttribute('src');

        // ACT
        await uploadImage();
        await driver.actions().click(submitButton).perform();

        // ASSERT
        const newProfilePicture = await profilePicture.getAttribute('src');
        expect(newProfilePicture).not.toEqual(oldProfilePicture);
        await driver.wait(until.alertIsPresent());
        const alert = await driver.switchTo().alert();
        expect(await alert.getText()).toEqual('Successfully changed PP');
    });

    test('user can delete account', async () => {
        // ARRANGE
        await driver.wait(until.elementLocated(By.id('deleteAccountButton')));
        const deleteAccountButton = await driver.findElement(By.id('deleteAccountButton'));

        // ACT
        await driver.actions().click(deleteAccountButton).perform();

        const passwordInput = await driver.findElement(By.id('name'));
        const confirmButton = await driver.findElement(By.id('confirmAccountDeletion'));

        await passwordInput.sendKeys('password');
        await confirmButton.click();

        // ASSERT
        await driver.wait(until.stalenessOf(confirmButton));
        const messages = await driver.findElements(By.css('h1'));
        expect(await messages[0].getText()).toEqual('You are not logged in!');
    });

    afterAll(async () => {
        await changeUsername('Carlos');
        await logOut();
    });
});
