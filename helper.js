module.exports = {
    getPhoneNumber: function(countryCode) {
        const number = Math.floor(1000000000 + Math.random() * 9000000000)
        return `${countryCode}${number}`
    },
    getElementByText: async function(obj) {
        return await $(`div=${obj.toString()}`);
    },
    getCardNumber: function() {
        const number = Math.floor(100000000000 + Math.random() * 900000000000)
        return  `${number}`;
    },
    getCVVNumber: function() {
        const number = Math.floor(10 + Math.random() * 90)
        return  `${number}`;
    }
};