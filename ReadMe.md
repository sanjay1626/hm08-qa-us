# Urban Routes End-to-End Testing

## Description

This project focuses on end-to-end testing for the "Urban Routes" web application, automating the taxi ordering process. The tests encompass a range of functionalities, including address input, plan selection, phone and credit card information entry, ensuring a smooth user experience.

## Technologies and Techniques Used

- **JavaScript**: Used to write test scripts.
- **WebdriverIO**: A modern automation test framework for Node.js, utilized for end-to-end testing. WebdriverIO makes direct calls to the browser using the browser's native web APIs, eliminating the need for Selenium WebDriver.
- **Node.js**: The runtime environment for executing JavaScript code outside of a browser, used to run the test scripts.

## Setup Instructions

1. **Clone the Repository**: Clone the `hm08-qa-us` repository from GitHub to your local environment using the command:
    ```sh
    git clone git@github.com:<your-username>/hm08-qa-us.git
    ```
    Replace `<your-username>` with your actual GitHub username.

2. **Install Dependencies**: Navigate to the cloned project directory and execute `npm install` to install the required dependencies.

3. **Open in an IDE**: Open the project folder in Visual Studio Code (or your preferred IDE) to access and run the tests.

4. **Server URL Configuration**: Make sure the `wdio.conf.js` file contains the correct server URL. This URL is essential for the tests to communicate with the Urban Routes server.

## Running Tests

1. **Ensure Server Availability**: Confirm that the Urban Routes server is operational. Utilize the server address provided in your project setup.

2. **Launch Tests**: Execute the end-to-end tests by running the following command in your terminal:
    ```sh
    npm run wdio
    ```

3. **Examine Test Outcomes**: After the test execution, review the terminal output to identify any test failures or errors.

## Project Structure

- `test/specs/`: This directory houses the `createAnOrder.e2e.js` file, which contains the end-to-end test definitions for the order creation process.
- `page.js`: This file exports an object that includes selectors and functions for web application interactions.
- `helper.js`: Contains utility functions for generating random phone numbers, credit card information, etc.

## Troubleshooting

- If you encounter test failures, ensure that your test environment is correctly set up and that the Urban Routes server is accessible.


