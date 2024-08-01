const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', () => {
  
    it('should complete the process of ordering a taxi', async () => {
        await browser.url(`/`);
        
        // Setting the addresses
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        
        // Select Supportive plan
        await page.clickSupportiveButton();
        
        // Generate and fill in the phone number
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
        
        // Adding a credit card
        await page.clickPaymentButton();
        const cardNumber = helper.getCardNumber();
        const cvvNumber = helper.getCVVNumber();
        await page.fillCardDetails(cardNumber, cvvNumber, true);
        
        // Write a message for the driver
        const message = 'Test message to driver';
        await page.writeMessage(message);
        await expect($(page.messageInput)).toHaveValue(message);
        
         // Order a blanket and handkerchiefs
         await page.clickBlanketSwitch();
         await browser.pause(500); 
         
        // Verify the blanket switch state by checking for the active class
        const blanketsSwitch = await $(page.blanketsSwitch);
        const classList = await blanketsSwitch.getAttribute('class');
        console.log(`Blanket switch class list: ${classList}`);
        await expect(classList).toContain('r-sw'); 
        
        // Order 2 ice creams
        await page.addTwoIceCreams();
        const iceCreamCounter = await $(page.iceCreamCounter);
        await iceCreamCounter.waitForDisplayed();
        const iceCreamCountText = await iceCreamCounter.getText();
        console.log(`Ice cream counter value: ${iceCreamCountText}`);
        await expect(iceCreamCountText).toBe('2');
        
        // Order the taxi
        await page.clickOrderButton();
        const orderModal = await $(page.orderModal);
        await orderModal.scrollIntoView();

        // Car search modal appears
        await orderModal.waitForDisplayed({ timeout: 60000 });

        // Waiting for the driver info to appear
        const driverInfo = await orderModal.$('//div[contains(text(), "The driver will arrive in")]'); 
        await driverInfo.waitForDisplayed({ timeout: 80000 });
        await expect(driverInfo).toBeDisplayed();
    });
});
