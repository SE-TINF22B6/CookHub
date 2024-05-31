import {driver} from "./setupTests";

it('should be able to start selenium', async () => {
    await driver.get('https://localhost:3000/');
    let title = await driver.getTitle();
    expect(title).toEqual("React App");
});