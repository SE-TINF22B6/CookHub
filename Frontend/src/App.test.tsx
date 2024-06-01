import {driver, frontendUrl} from "./setupTests";

it('should be able to start selenium', async () => {
    await driver.get(frontendUrl);
    let title = await driver.getTitle();
    expect(title).toEqual("React App");
});