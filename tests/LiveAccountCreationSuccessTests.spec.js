const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const HomePage = require("../pages/HomePage");
const OpenLiveAccRegistrationFormPage = require("../pages/OpenLiveAccRegistrationFormPage");
const testData = require("./testData.json");
const BASE_URL = testData.baseUrl;

describe("Live Account_success_submission", function () {
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

  it("should navigate from home and successfully register a live account", async function () {
    await homePage.loadUrl(BASE_URL);

    await homePage.clickOpenAnAccBtnCntrHomePage();

    expect(
      await openLiveAccRegistrationFormPage.validateOpenAnAccountHeaderIsDisplayed()
    ).to.be.true;

    await openLiveAccRegistrationFormPage.enterFirstNameLiveAcc(
      testData.LiveAccCreationFormData.FirstName
    );
    await openLiveAccRegistrationFormPage.enterLastNameLiveAcc(
      testData.LiveAccCreationFormData.LastName
    );
    await openLiveAccRegistrationFormPage.enterEmailLiveAcc(
      OpenLiveAccRegistrationFormPage.generateRandomEmail()
    );
    await openLiveAccRegistrationFormPage.selectCountryLiveAcc(
      testData.LiveAccCreationFormData.CountryValue
    );
    await openLiveAccRegistrationFormPage.enterPhoneNumberLivAcc(
      testData.LiveAccCreationFormData.PhoneNumber
    );
    await openLiveAccRegistrationFormPage.enterPasswordLivAcc(
      testData.LiveAccCreationFormData.Password
    );
    await openLiveAccRegistrationFormPage.clickMarketingCheckBoxLivAcc();
    await driver.sleep(2000);
    await openLiveAccRegistrationFormPage.clickStartYourApplicationBtn();

    await driver.sleep(8000);

    // Validate "Personal details" section is displayed

    const personalDetailsSectionSelector = By.xpath(
      "//span[normalize-space()='Personal details']"
    );
    const section = await driver.wait(
      until.elementLocated(personalDetailsSectionSelector),
      15000
    );
    const sectionText = await section.getText();
    expect(sectionText).to.include(
      testData.LiveAccCreationExpectedTexts.PersonalDetailsSectionText
    );

    await driver.sleep(2000);
  });
});
