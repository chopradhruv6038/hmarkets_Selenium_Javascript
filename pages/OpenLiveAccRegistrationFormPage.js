const { By, until, Key } = require("selenium-webdriver");
const { expect } = require("chai");

class OpenLiveAccRegistrationFormPage {
  constructor(driver) {
    this.driver = driver;

    // Locators (same as Java)
    this.openAnAccountHeaderLiveAccPage = By.xpath(
      "//h1[contains(text(),'Open an account with a')]"
    );
    this.firstNameFieldLiveAccPage = By.xpath("//input[@name='first_name']");
    this.lastNameFieldLiveAccPage = By.xpath("//input[@name='last_name']");
    this.emailFieldLiveAccPage = By.xpath("//input[@name='email']");
    this.countryFieldLiveAccPage = By.xpath("//select[@name='country']");
    this.phoneNumberFieldLiveAccPage = By.xpath("//input[@inputmode='tel']");
    this.passwordFieldLiveAccPage = By.xpath(
      "//input[@placeholder='Enter your password']"
    );
    this.marketingAckCheckboxLiveAccPage = By.xpath(
      "(//input[@type='checkbox'])[1]"
    );
    this.startYourApplicationBtnLiveAccPage = By.css("button[type='submit']");

    // Validation locators
    this.startYourApplicationBtn = By.xpath(
      "//div[normalize-space()='Start your application']"
    );
    this.firstNameRequiredValidation = By.xpath(
      "//span[normalize-space()='First name is required']"
    );
    this.lastNameRequiredValidation = By.xpath(
      "//span[normalize-space()='Last name is required']"
    );
    this.emailIsRequiredValidation = By.xpath(
      "//span[normalize-space()='Email is required']"
    );
    this.countryIsRequiredValidation = By.xpath(
      "//span[normalize-space()='Country is required']"
    );
    this.invalidPhoneNumberValidation = By.xpath(
      "//span[normalize-space()='Invalid phone number']"
    );
    this.passwordCharacters8To20CharLongRequiredValidation = By.xpath(
      "//p[normalize-space()='Between 8 and 20 characters long']"
    );
  }

  // --- Success Flow Methods ---

  async validateOpenAnAccountHeaderIsDisplayed() {
    const header = await this.driver.wait(
      until.elementLocated(this.openAnAccountHeaderLiveAccPage),
      10000
    );
    return await header.isDisplayed();
  }

  async enterFirstNameLiveAcc(firstName) {
    const el = await this.driver.wait(
      until.elementLocated(this.firstNameFieldLiveAccPage),
      10000
    );
    await el.clear();
    await el.sendKeys(firstName);
    return this;
  }

  async enterLastNameLiveAcc(lastName) {
    const el = await this.driver.wait(
      until.elementLocated(this.lastNameFieldLiveAccPage),
      10000
    );
    await el.clear();
    await el.sendKeys(lastName);
    return this;
  }

  async enterEmailLiveAcc(email) {
    const el = await this.driver.wait(
      until.elementLocated(this.emailFieldLiveAccPage),
      10000
    );
    await el.clear();
    await el.sendKeys(email);
    return this;
  }

  async selectCountryLiveAcc(countryValue) {
    const el = await this.driver.wait(
      until.elementLocated(this.countryFieldLiveAccPage),
      10000
    );
    await el.click();
    await el.sendKeys(countryValue, Key.RETURN); // Sends value then presses enter
    return this;
  }

  async enterPhoneNumberLivAcc(phoneNumber) {
    const el = await this.driver.wait(
      until.elementLocated(this.phoneNumberFieldLiveAccPage),
      10000
    );
    await el.clear();
    await el.sendKeys(phoneNumber);
    return this;
  }

  async enterPasswordLivAcc(password) {
    const el = await this.driver.wait(
      until.elementLocated(this.passwordFieldLiveAccPage),
      10000
    );
    await el.clear();
    await el.sendKeys(password);
    return this;
  }

  async clickMarketingCheckBoxLivAcc() {
    const el = await this.driver.wait(
      until.elementLocated(this.marketingAckCheckboxLiveAccPage),
      10000
    );
    const checked = await el.isSelected();
    if (!checked) await el.click();
    return this;
  }

  static generateRandomEmail() {
    const pattern = "ABCD1234*&";
    let random = "";
    for (let i = 0; i <= 4; i++) {
      random += pattern[Math.floor(Math.random() * pattern.length)];
    }
    return `${random}${Date.now()}@gmail.com`;
  }

  async clickStartYourApplicationBtn() {
    const el = await this.driver.wait(
      until.elementLocated(this.startYourApplicationBtnLiveAccPage),
      10000
    );
    await el.click();
    // You can return a new page object if you want, or just `this`
    return this;
  }

  // --- Validation/Error Methods ---

  async getFirstNameRequiredValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.firstNameRequiredValidation),
      10000
    );
    return await el.getText();
  }

  async assertFirstNameValidationTextIsDisplayedAndIsCorrect(expectedError) {
    const el = await this.driver.wait(
      until.elementLocated(this.firstNameRequiredValidation),
      10000
    );
    expect(await el.isDisplayed()).to.be.true;
    expect(await el.getText()).to.equal(expectedError);
    console.log("First Name Validation:", await el.getText());
    return this;
  }

  async getLastNameRequiredValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.lastNameRequiredValidation),
      10000
    );
    return await el.getText();
  }

  async assertLastNameValidationTextIsDisplayedAndIsCorrect(expectedError) {
    const el = await this.driver.wait(
      until.elementLocated(this.lastNameRequiredValidation),
      10000
    );
    expect(await el.isDisplayed()).to.be.true;
    expect(await el.getText()).to.equal(expectedError);
    return this;
  }

  async getEmailRequiredValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.emailIsRequiredValidation),
      10000
    );
    return await el.getText();
  }

  async assertEmailValidationTextIsDisplayedAndIsCorrect(expectedError) {
    const el = await this.driver.wait(
      until.elementLocated(this.emailIsRequiredValidation),
      10000
    );
    expect(await el.isDisplayed()).to.be.true;
    expect(await el.getText()).to.equal(expectedError);
    return this;
  }

  async getCountryRequiredValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.countryIsRequiredValidation),
      10000
    );
    return await el.getText();
  }

  async assertCountryValidationTextIsDisplayedAndIsCorrect(expectedError) {
    const el = await this.driver.wait(
      until.elementLocated(this.countryIsRequiredValidation),
      10000
    );
    expect(await el.isDisplayed()).to.be.true;
    expect(await el.getText()).to.equal(expectedError);
    return this;
  }

  async getInvalidPhoneNumRequiredValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.invalidPhoneNumberValidation),
      10000
    );
    return await el.getText();
  }

  async assertInvalidPhoneNumValidationTextIsDisplayedAndIsCorrect(
    expectedError
  ) {
    const el = await this.driver.wait(
      until.elementLocated(this.invalidPhoneNumberValidation),
      10000
    );
    expect(await el.isDisplayed()).to.be.true;
    expect(await el.getText()).to.equal(expectedError);
    return this;
  }

  async getPasswordCharacterRequiredValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(
        this.passwordCharacters8To20CharLongRequiredValidation
      ),
      10000
    );
    return await el.getText();
  }

  async assertPasswordCharacterValidationTextIsDisplayedAndIsCorrect(
    expectedError
  ) {
    const el = await this.driver.wait(
      until.elementLocated(
        this.passwordCharacters8To20CharLongRequiredValidation
      ),
      10000
    );
    expect(await el.isDisplayed()).to.be.true;
    expect(await el.getText()).to.equal(expectedError);
    return this;
  }

  async clickStartYourApplicationBtnForValidations() {
    const el = await this.driver.wait(
      until.elementLocated(this.startYourApplicationBtn),
      10000
    );
    await el.click();
    return this;
  }
}

module.exports = OpenLiveAccRegistrationFormPage;
