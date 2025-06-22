const { Builder } = require("selenium-webdriver");
const HomePage = require("../pages/HomePage");
const ContactUsFormPage = require("../pages/ContactUsFormPage");
const testData = require("./testData.json");
const BASE_URL = testData.baseUrl;

describe("Contact Us Form_negative_validations", function () {
  let driver, homePage, contactUsFormPage;
  this.timeout(60000);

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    homePage = new HomePage(driver);
    contactUsFormPage = new ContactUsFormPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it("should show all validation errors when submitting empty Contact Us form", async function () {
    await homePage.loadUrl(BASE_URL);
    await homePage.clickContactUsBtn();
    await driver.sleep(2000);
    await contactUsFormPage.clickSendEnquiryContactUsBtnForValidations();

    // Now assert all validation messages
    await contactUsFormPage.assertFirstNameContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.ContactUsFormDataValidations.FirstNameValidation
    );
    await contactUsFormPage.assertLastNameContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.ContactUsFormDataValidations.LastNameValidation
    );
    await contactUsFormPage.assertEmailContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.ContactUsFormDataValidations.EmailValidation
    );
    await contactUsFormPage.assertCountryRequiredContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.ContactUsFormDataValidations.CountryValidation
    );
    await contactUsFormPage.assertInvalidPhoneRequiredContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.ContactUsFormDataValidations.PhoneNumberValidation
    );
    await contactUsFormPage.assertSubjectRequiredContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
      testData.ContactUsFormDataValidations.SubjectValidation
    );
  });
});
