const { Builder } = require("selenium-webdriver");
const { expect } = require("chai");
const HomePage = require("../pages/HomePage");
const OpenLiveAccRegistrationFormPage = require("../pages/OpenLiveAccRegistrationFormPage");
const testData = require("./testData.json");
const BASE_URL = testData.baseUrl;

describe("Live Account_negative_validations", function () {
  let driver, homePage, openLiveAccRegistrationFormPage;
  this.timeout(60000);

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    homePage = new HomePage(driver);
    openLiveAccRegistrationFormPage = new OpenLiveAccRegistrationFormPage(
      driver
    );
  });

  after(async function () {
    await driver.quit();
  });

  it("should show all required field validation errors on empty submit", async function () {
    await homePage.loadUrl(BASE_URL);
    await homePage.clickOpenAnAccBtnCntrHomePage();
    await openLiveAccRegistrationFormPage.clickStartYourApplicationBtnForValidations();

    // Now assert all the error messages
    await openLiveAccRegistrationFormPage.assertFirstNameValidationTextIsDisplayedAndIsCorrect(
      testData.LiveAccCreationFormDataValidations.FirstNameValidation
    );
    await openLiveAccRegistrationFormPage.assertLastNameValidationTextIsDisplayedAndIsCorrect(
      testData.LiveAccCreationFormDataValidations.LastNameValidation
    );
    await openLiveAccRegistrationFormPage.assertEmailValidationTextIsDisplayedAndIsCorrect(
      testData.LiveAccCreationFormDataValidations.EmailValidation
    );
    await openLiveAccRegistrationFormPage.assertCountryValidationTextIsDisplayedAndIsCorrect(
      testData.LiveAccCreationFormDataValidations.CountryValidation
    );
    await openLiveAccRegistrationFormPage.assertInvalidPhoneNumValidationTextIsDisplayedAndIsCorrect(
      testData.LiveAccCreationFormDataValidations.PhoneNumberValidation
    );
    await openLiveAccRegistrationFormPage.assertPasswordCharacterValidationTextIsDisplayedAndIsCorrect(
      testData.LiveAccCreationFormDataValidations.PasswordValidation
    );
  });
});
