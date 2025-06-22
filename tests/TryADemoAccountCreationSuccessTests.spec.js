const { Builder, By, until } = require("selenium-webdriver");
const { expect } = require("chai");
const HomePage = require("../pages/HomePage");
const TryADemoRegistrationFormPage = require("../pages/TryADemoRegistrationFormPage");
const testData = require("./testData.json");
const BASE_URL = testData.baseUrl;

describe("Demo Account_success_submission", function () {
  let driver, homePage, tryADemoRegistrationFormPage;
  this.timeout(70000);

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    homePage = new HomePage(driver);
    tryADemoRegistrationFormPage = new TryADemoRegistrationFormPage(driver);
  });

  after(async function () {
    await driver.quit();
  });

  it("should successfully register a demo account", async function () {
    await homePage.loadUrl(BASE_URL);
    await homePage.clickTryADemoBtn();

    expect(
      await tryADemoRegistrationFormPage.validateTryAFreeDemoHeaderIsDisplayed()
    ).to.be.true;

    await tryADemoRegistrationFormPage.selectLeverageDemoAcc(
      testData.DemoCreationFormData.SelectLeverage
    );
    await driver.sleep(2000);
    await tryADemoRegistrationFormPage.selectDemoAccSize(
      testData.DemoCreationFormData.DemoAccSize
    );

    await driver.sleep(2000);
    await tryADemoRegistrationFormPage.enterFirstNameDemoAcc(
      testData.DemoCreationFormData.FirstName
    );
    await driver.sleep(2000);
    await tryADemoRegistrationFormPage.enterLastNameDemoAcc(
      testData.DemoCreationFormData.LastName
    );
    await driver.sleep(2000);
    await tryADemoRegistrationFormPage.enterEmailDemoAcc(
      TryADemoRegistrationFormPage.generateRandomEmail()
    );
    await driver.sleep(2000);
    await tryADemoRegistrationFormPage.selectCountryDemoAcc(
      testData.DemoCreationFormData.CountryValue
    );
    await driver.sleep(2000);
    await tryADemoRegistrationFormPage.enterPhoneNumDemoAcc(
      testData.DemoCreationFormData.PhoneNum
    );
    await driver.sleep(2000);
    await tryADemoRegistrationFormPage.clickMarketingNewsCheckBoxDemoAcc();
    await driver.sleep(2000);
    await tryADemoRegistrationFormPage.clickOpenADemoAccountBtn();

    await driver.sleep(5000);

    expect(
      await tryADemoRegistrationFormPage.validateSuccessfulSubmissionMessageIsDisplayed()
    ).to.be.true;

    const successMsg =
      await tryADemoRegistrationFormPage.getSuccessfulSubmissionMessageText();
    expect(successMsg).to.include(
      testData.DemoCreationFormData.SuccessMessageDemoAcc
    );
    await driver.sleep(2000);
  });
});
