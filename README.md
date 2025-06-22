HMarkets.com Selenium Automation Suite (Selemium-JavaScript)

This project is a robust UI test automation framework for validating the core functionalities of HMarkets.com. It focuses on form submission scenarios, ensuring both successful and negative test flows across key user-facing forms.

GitHub Repo:

https://github.com/chopradhruv6038/hmarkets_Selenium_Javascript

📌 Overview

This suite automates end-to-end testing for:

✅ Live Account Opening Form

✅ Demo Account Opening Form

✅ Contact Us Form

Both successful form submissions and field-level validation errors are thoroughly tested to ensure optimal user experience and system reliability.

💡 Key Features

🔄 Comprehensive Form Testing — Validates both positive and negative test flows.

🧱 Modular Architecture — Built using Object-Oriented Design and Page Object Model.

📦 Data-Driven Testing — Uses external JSON files to define expected validation messages and test inputs.

⚙️ Environment Configurable — Easily change base URLs and config via JSON.

🚀 Scalable & Maintainable — Designed for long-term use and easy expansion.

🧪 Mocha + Chai — Modern, BDD-style JavaScript testing.

🛠️ Tech Stack

Component Description
Language JavaScript (Node.js)
Framework Selenium WebDriver + Mocha + Chai
Test Runner Mocha
Assertion Chai
Data Format JSON
IDE Visual Studio Code (VS Code)
Browser Chrome (latest)
Version Control Git + GitHub

🚀 Getting Started
🔧 Prerequisites

Ensure the following tools are installed on your machine:

Node.js (18+ recommended)

npm (comes with Node.js)

Chrome browser (latest version)

Visual Studio Code (recommended)

Git

📥 Clone the Repository

git clone https://github.com/chopradhruv6038/hmarkets_Selenium_Javascript.git
cd hmarkets_Selenium_Javascript

📦 Install Dependencies

{
"baseUrl": "https://hmarkets.com",
...
}

From VS Code

Open the project folder in VS Code.

Open the integrated terminal.

Run tests using:
npx mocha tests/\*.spec.js

Or run an individual test file:
npx mocha tests/UserContactUsFormSuccessSubmissionTests.spec.js

From Command Line
npx mocha tests/

✅ Test Coverage Summary

Feature             Positive Test Negative Validation
Live Account Form    ✅               ✅
Demo Account Form    ✅               ✅
Contact Us Form      ✅               ✅

📚 Best Practices Followed

✅ Page Object Model (POM) for maintainable, reusable code.

✅ Clean code and reusable component design.

✅ No hardcoded values—test data and selectors are externalized.

✅ Explicit waits for all critical actions—no arbitrary sleep unless manual action is required (see CAPTCHA note below).

✅ Test suite can be easily extended for more flows.

⚠️ CAPTCHA Handling with Selenium

Note:
Google reCAPTCHA cannot be bypassed or solved by Selenium (or any automation tool) because it is specifically designed to detect and block automated bots via advanced fingerprinting and behavioral analysis.

Test Limitation:
When running Contact Us form success submission tests, the reCAPTCHA step is encountered after filling the message field.
Selenium cannot solve this CAPTCHA automatically. If your test environment has CAPTCHA enabled, you will need to solve it manually during test execution.

Workaround:

For fully automated runs, disable or mock reCAPTCHA in your test/staging environment.

The relevant code is commented in the test suite with instructions and a wait, to allow for manual completion if CAPTCHA is present.

👤 Author

Dhruv Chopra
Senior QA Engineer | Dubai
https://www.linkedin.com/in/dhruv-chopra-dxb/
