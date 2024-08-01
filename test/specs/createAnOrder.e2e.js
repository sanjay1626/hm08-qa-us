const page = require('../../page');
const helper = require('../../helper');

describe('Create an order', function () {
    this.timeout(120000); // Set timeout to 2 minutes

    it('should set the addresses', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');
    });

    it('should select the Supportive plan', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const supportiveButton = await $(page.supportiveButton);
        const classList = await supportiveButton.getAttribute('class');
        console.log(`Supportive button class list: ${classList}`);
        // Ensure to check the correct class indicating selection
        await expect(classList).toContain('tcard-title'); // Replace 'selected-class' with the actual class
    });

    it('should fill in the phone number', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();
    });

    it('should add a credit card', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();
        await page.clickPaymentButton();
        const cardNumber = helper.getCardNumber();
        const cvvNumber = helper.getCVVNumber();
        await page.fillCardDetails(cardNumber, cvvNumber, true);
        const paymentModal = await $(page.paymentModal);
        await expect(paymentModal).toHaveElementClassContaining('active');
    });

    it('should write a message for the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();
        await page.clickPaymentButton();
        const cardNumber = helper.getCardNumber();
        const cvvNumber = helper.getCVVNumber();
        await page.fillCardDetails(cardNumber, cvvNumber, true);
        const message = 'Test';
        await page.writeMessage(message);
        const messageInput = await $(page.messageInput);
        await expect(messageInput).toHaveValue(message);
    });

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();
        await page.clickPaymentButton();
        const cardNumber = helper.getCardNumber();
        const cvvNumber = helper.getCVVNumber();
        await page.fillCardDetails(cardNumber, cvvNumber, true);
        await page.writeMessage('Test');
        await page.clickBlanketSwitch();
        const blanketsSwitch = await $(page.blanketsSwitch);
        const classList = await blanketsSwitch.getAttribute('class');
        await expect(classList).toContain('r-sw');
    });

    it('should order 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();
        await page.clickPaymentButton();
        const cardNumber = helper.getCardNumber();
        const cvvNumber = helper.getCVVNumber();
        await page.fillCardDetails(cardNumber, cvvNumber, true);
        await page.writeMessage('Test');
        await page.clickBlanketSwitch();
        await page.addTwoIceCreams();
        const iceCreamCounter = await $(page.iceCreamCounter);
        await iceCreamCounter.waitForDisplayed();
        const iceCreamCountText = await iceCreamCounter.getText();
        await expect(iceCreamCountText).toBe('2');
    });

    it('should wait for the order modal to appear', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();
        await page.clickPaymentButton();
        const cardNumber = helper.getCardNumber();
        const cvvNumber = helper.getCVVNumber();
        await page.fillCardDetails(cardNumber, cvvNumber, true);
        await page.writeMessage('Test');
        await page.clickBlanketSwitch();
        await page.addTwoIceCreams();
        await page.clickOrderButton();
        const orderModal = await $(page.orderModal);
        await orderModal.scrollIntoView();
        await orderModal.waitForDisplayed({ timeout: 60000 });
        await expect(orderModal).toBeDisplayed();
    });

    it('should verify the driver info in the order modal', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.clickSupportiveButton();
        const phoneNumber = helper.getPhoneNumber('+1');
        await page.submitPhoneNumber(phoneNumber);
        const phoneNumberElement = await helper.getElementByText(phoneNumber);
        await expect(phoneNumberElement).toBeExisting();
        await page.clickPaymentButton();
        const cardNumber = helper.getCardNumber();
        const cvvNumber = helper.getCVVNumber();
        await page.fillCardDetails(cardNumber, cvvNumber, true);
        await page.writeMessage('Test');
        await page.clickBlanketSwitch();
        await page.addTwoIceCreams();
        await page.clickOrderButton();
        const orderModal = await $(page.orderModal);
        await orderModal.scrollIntoView();
        await orderModal.waitForDisplayed({ timeout: 60000 });
        const driverInfo = await orderModal.$('//div[contains(text(), "The driver will arrive in")]');
        await driverInfo.waitForDisplayed({ timeout: 60000 });
        await expect(driverInfo).toBeDisplayed();
    });
});
