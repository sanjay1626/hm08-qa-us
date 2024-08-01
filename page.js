module.exports = {

    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberInput: '.card-number-input #number',
    cardCode: '.card-code-input #code',
    messageInput: '#comment',

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentButton: '.pp-button',
    supportiveButton: 'div=Supportive',
    addCardButton: '.pp-row.disabled',
    linkButton: '//button[contains(text(), "Link")]',
    closeCardModalButton: '.payment-picker .close-button',
    iceCreamPlusButton: '.counter-plus',
    orderButton: '.smart-button',

    // Checkboxes
    blanketsSwitch: '.r-sw',

    // Counters
    iceCreamCounter: '.counter-value',

    // Modals
    phoneNumberModal: '.modal',
    paymentModal: '.payment-picker .modal .section',
    orderModal: '.order-body',
   
    // Functions
    fillAddresses: async function (from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function (phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function (phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        const requests = await browser.getRequests();
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    clickSupportiveButton: async function () {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.click()
    },
    clickPaymentButton: async function () {
        const paymentButton = await $(this.paymentButton);
        await paymentButton.click();
    },
    fillCardDetails: async function (cardNumber, cvvNumber, linkAndClose = false) {
        const addCardButton = await $(this.addCardButton);
        await addCardButton.click();
        await $(this.cardNumberInput).setValue(cardNumber);
        await $(this.cardCode).setValue(cvvNumber);
        await browser.keys("\ue004");
        if (linkAndClose) {
            await ($(this.linkButton)).click();
            await $(this.closeCardModalButton).click(); 
        }
    },
    writeMessage: async function (message = 'Sample Message') {
        const messageInputBox = $(this.messageInput);
        await messageInputBox.setValue(message);
    },
    clickBlanketSwitch: async function () {
        const blanketsSwitch = await $(this.blanketsSwitch);
        await blanketsSwitch.waitForDisplayed();
        await blanketsSwitch.scrollIntoView();
        await blanketsSwitch.click();
    },
    addTwoIceCreams: async function () {
        const iceCreamPlusButton = await $(this.iceCreamPlusButton);
        await iceCreamPlusButton.waitForDisplayed();
        await iceCreamPlusButton.scrollIntoView();
        await iceCreamPlusButton.click();
        await iceCreamPlusButton.click();
    },
    clickOrderButton: async function () {
        const orderButton = await $(this.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();
    }

};