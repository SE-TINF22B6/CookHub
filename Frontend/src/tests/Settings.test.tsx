import {driver, frontendUrl, logInWithTestUser, logOut} from "../setupTests";
import {By, Key, until} from "selenium-webdriver";

const createTestUser =  async () => driver.executeScript(
    `await fetch('https://localhost:44328/Login/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'name': 'TestUser', 'email': 'testuser@example.com', 'password': 'password.123'}),
        credentials: 'include'
    });`);

const uploadImage = async () => await driver.executeScript('document.querySelector(".ImageInput").firstElementChild.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAFCAIAAAAVLyF7AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVBhXhcpBCgAwDALB/v/T1qKIBEL3EEbISQCs3R68DdZm/oyEYZb5btRIn281rAngAmE2d4kg2D28AAAAAElFTkSuQmCC"');

async function getPasswordChangeElements() {
    await driver.wait(until.elementLocated(By.id('oldPassword')));
    return [
        await driver.findElement(By.id('oldPassword')),
        await driver.findElement(By.id('newPassword')),
        await driver.findElement(By.id('repeatNewPassword')),
        await driver.findElement(By.id('changePasswordButton')),
        await driver.findElement(By.id('passwordValidationMessage')),
        await driver.findElement(By.id('passwordAfterChangeMessage'))
    ];
}

describe('test with dummy user', () => {
    beforeAll(async () => {
        await driver.get(frontendUrl);
        await createTestUser();
        await driver.get(`${frontendUrl}/settings`);
    });

    test('user can change user name', async () => {
        // ARRANGE
        await driver.wait(until.elementLocated(By.id('usernameInfo')));
        const usernameInfo = await driver.findElement(By.id('usernameInfo'));
        const usernameTextField = await driver.findElement(By.id('filled-basic'));
        const submitButton = await driver.findElement(By.id('changeUsernameButton'));
        expect(await usernameInfo.getText()).toEqual('Username: TestUser');

        // ACT
        await usernameTextField.sendKeys('New_Name');
        await driver.actions().click(submitButton).perform();
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
        const [oldPasswordInput, newPasswordInput,
            repeatNewPasswordInput, changePasswordButton, _, message] = await getPasswordChangeElements();

        // ACT
        await oldPasswordInput.sendKeys('password.123');
        await newPasswordInput.sendKeys('password.1234');
        await repeatNewPasswordInput.sendKeys('password.1234');
        await driver.actions().click(changePasswordButton).perform();
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
        await driver.wait(until.alertIsPresent());
        const alert = await driver.switchTo().alert();
        expect(await alert.getText()).toEqual('Successfully changed PP');
        await alert.accept();
        const newProfilePicture = await driver.findElement(By.id('user-image')).getAttribute('src');
        expect(newProfilePicture).not.toEqual(oldProfilePicture);
    });

    test('user can delete account', async () => {
        // ARRANGE
        await driver.wait(until.elementLocated(By.id('deleteAccountButton')));
        const deleteAccountButton = await driver.findElement(By.id('deleteAccountButton'));
        await driver.wait(until.elementIsVisible(deleteAccountButton));

        // ACT
        await driver.actions().click(deleteAccountButton).perform();

        await driver.wait(until.elementLocated(By.id('name')));
        const passwordInput = await driver.findElement(By.id('name'));
        const confirmButton = await driver.findElement(By.id('confirmAccountDeletion'));

        await passwordInput.sendKeys('password.1234');
        await confirmButton.click();

        // ASSERT
        await driver.wait(until.stalenessOf(confirmButton));
        const messages = await driver.findElements(By.css('h1'));
        expect(await messages[0].getText()).toEqual('You are not logged in!');
    });
});

describe('test with logged in user', () => {
    beforeAll(async () => {
        await driver.get(frontendUrl);
        await logInWithTestUser();
        await driver.get(`${frontendUrl}/settings`);
    });

    test('user cannot change username to invalid username', async () => {
        // ARRANGE
        await driver.wait(until.elementLocated(By.id('usernameInfo')));
        const usernameInfo = await driver.findElement(By.id('usernameInfo'));
        const usernameTextField = await driver.findElement(By.id('filled-basic'));
        const submitButton = await driver.findElement(By.id('changeUsernameButton'));
        const message = await driver.findElement(By.id('newNameMessage'));
        const oldUsernameText = await usernameInfo.getText();

        // ACT
        await usernameTextField.sendKeys(Key.chord(Key.CONTROL,"a", Key.DELETE)); // clear text field
        await usernameTextField.sendKeys('hey');
        await driver.actions().click(submitButton).perform();
        await driver.wait(until.alertIsPresent());
        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        await alert.accept();

        // ASSERT
        expect(alertText).toEqual('Error. Server responded with status: Invalid username.');
        expect(await message.getText()).toEqual('Username must be 4-16 characters long and can only contain letters, numbers, and underscores.');
        expect(await usernameInfo.getText()).toEqual(oldUsernameText);
    });

    test('user cannot change password to invalid password', async () => {
        // ARRANGE
        const [oldPasswordInput, newPasswordInput,
            repeatNewPasswordInput, changePasswordButton, message1, message2] = await getPasswordChangeElements();

        // ACT
        await oldPasswordInput.sendKeys('password');
        await newPasswordInput.sendKeys('password.');
        await repeatNewPasswordInput.sendKeys('password.');

        // ASSERT
        expect(await message1.getText()).toEqual('Password must be 8-32 characters long, contain at least one letter, one number, and one special character.');
        await driver.actions().click(changePasswordButton).perform();
        expect(await message2.getText()).toEqual('New password is invalid.');
    });

    test('user cannot change password when repeat-new-password is wrong', async () => {
        // ARRANGE
        const [oldPasswordInput, newPasswordInput,
            repeatNewPasswordInput, changePasswordButton, message] = await getPasswordChangeElements();

        // ACT
        await oldPasswordInput.sendKeys('password');
        await newPasswordInput.sendKeys('password.123');
        await repeatNewPasswordInput.sendKeys('password.12');

        // ASSERT
        expect(await message.getText()).toEqual("Passwords don't match!");
        await driver.actions().click(changePasswordButton).perform();
        await driver.wait(until.alertIsPresent());
        const alert = await driver.switchTo().alert();
        expect(await alert.getText()).toEqual("Passwords don't match!");
        await alert.accept();
    });

    test('user cannot change profile picture without selecting image', async () => {
        // ARRANGE
        await driver.wait(until.elementLocated(By.className('ImageInput')));
        const profilePicture = await driver.findElement(By.id('user-image'));
        const submitButton = await driver.findElement(By.id('changeProfilePictureButton'));
        const oldProfilePicture = await profilePicture.getAttribute('src');

        // ACT
        await driver.actions().click(submitButton).perform();

        // ASSERT
        await driver.wait(until.alertIsPresent());
        const alert = await driver.switchTo().alert();
        expect(await alert.getText()).toEqual('Please upload a picture first');
        await alert.accept();
        const currentProfilePicture = await profilePicture.getAttribute('src');
        expect(currentProfilePicture).toEqual(oldProfilePicture);
    });

    test('user cannot delete account when entering wrong password', async () => {
        // ARRANGE
        await driver.wait(until.elementLocated(By.id('deleteAccountButton')));
        const deleteAccountButton = await driver.findElement(By.id('deleteAccountButton'));
        await driver.wait(until.elementIsVisible(deleteAccountButton));

        // ACT
        await driver.actions().click(deleteAccountButton).perform();

        const passwordInput = await driver.findElement(By.id('name'));
        const confirmButton = await driver.findElement(By.id('confirmAccountDeletion'));
        const passwordDeleteMessage = await driver.findElement(By.id('passwordDeleteMessage'));

        await passwordInput.sendKeys('LET ME IN');
        await confirmButton.click();

        // ASSERT
        await driver.wait(until.elementTextMatches(passwordDeleteMessage, /.+/));
        expect(await passwordDeleteMessage.getText()).toEqual('Invalid password.');
    });

    afterAll(async ()=> await logOut());
});

describe('test without logged in user', () => {
    beforeAll(async () => await driver.get(`${frontendUrl}/settings`));

    it('should show error message when not logged in', async () => {
        // ARRANGE
        const messages = await driver.findElements(By.css('h1'));

        // ASSERT
        expect(await messages[0].getText()).toEqual('You are not logged in!');
        expect(await messages[1].getText()).toEqual('Please login or sign up!');
    });
});
