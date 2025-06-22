const { Builder } = require("selenium-webdriver");
const { expect } = require("chai");
const HomePage = require("../pages/HomePage");
const TryADemoRegistrationFormPage = require("../pages/TryADemoRegistrationFormPage");
const testData = require("./testData.json");
const BASE_URL = testData.baseUrl;

describe("Demo Account_negative_validations", function () {
  let driver, homePage, tryADemoRegistrationFormPage;
  this.timeout(60000);

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    homePage = new HomePage(driver);
    tryADemoRegistrationFormPage = new TryADemoRegistrationFormPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it("should show all required field validation errors on empty demo account submit", async function () {
    await homePage.loadUrl(BASE_URL);
    await homePage.clickTryADemoBtn();
    await tryADemoRegistrationFormPage.clickOpenADemoAccountBtnForValidations();

    await tryADemoRegistrationFormPage.assertLeverageRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.DemoAccCreationFormDataValidations.LeverageValidation
    );
    await tryADemoRegistrationFormPage.assertAccSizeRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.DemoAccCreationFormDataValidations.AccSizeValidation
    );
    await tryADemoRegistrationFormPage.assertFirstNameDemoRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.DemoAccCreationFormDataValidations.FirstNameValidation
    );
    await tryADemoRegistrationFormPage.assertLastNameDemoRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.DemoAccCreationFormDataValidations.LastNameValidation
    );
    await tryADemoRegistrationFormPage.assertEmailDemoRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.DemoAccCreationFormDataValidations.EmailValidation
    );
    await tryADemoRegistrationFormPage.assertCountryRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.DemoAccCreationFormDataValidations.CountryValidation
    );
    await tryADemoRegistrationFormPage.assertInvalidPhoneNumRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.DemoAccCreationFormDataValidations.PhoneNumberValidation
    );
  });
});
