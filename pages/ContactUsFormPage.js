const { By, until } = require("selenium-webdriver");

class ContactUsFormPage {
  constructor(driver) {
    this.driver = driver;
    this.contactUsHeader = By.xpath("//h1[normalize-space()='Contact us']");
    this.contactUsFormSubHeader = By.xpath(
      "//p[normalize-space()='For enquiries, assistance, or to explore our services, reach out to our dedicated team.']"
    );
    this.firstName = By.css("input[name='first_name']");
    this.lastName = By.css("input[name='last_name']");
    this.email = By.css("input[name='email']");
    this.country = By.css("select[name='country']");
    this.phoneNumber = By.css("input[inputmode='tel']");
    this.subjectDropdown = By.xpath("//select[@name='subject']");
    this.message = By.xpath("//textarea[@name='lead_message']");
    this.captchaCheckbox = By.xpath("//span[@id='recaptcha-anchor']");
    this.sendEnquiryBtn = By.xpath("//button[@type='submit']");
    this.successMsg = By.xpath(
      "//p[contains(text(), 'Your submission was successful.')]"
    );
    this.iFrameCaptcha = By.css("iframe[title='reCAPTCHA']");
    // Validation selectors
    this.firstNameRequiredValidation = By.xpath(
      "//span[normalize-space()='First name is required']"
    );
    this.lastNameRequiredValidation = By.xpath(
      "//span[normalize-space()='Last name is required']"
    );
    this.emailRequiredValidation = By.xpath(
      "//span[normalize-space()='Email is required']"
    );
    this.countryRequiredValidation = By.xpath(
      "//span[normalize-space()='Country is required']"
    );
    this.invalidPhoneNumberValidation = By.xpath(
      "//span[normalize-space()='Invalid phone number']"
    );
    this.subjectRequiredValidation = By.xpath(
      "//span[normalize-space()='Subject is required']"
    );
  }

  // ==== Success methods ====

  async validateContactUsMainHeaderIsDisplayed() {
    const el = await this.driver.wait(
      until.elementLocated(this.contactUsHeader),
      10000
    );
    return el.isDisplayed();
  }
  async getContactUsHeaderText() {
    const el = await this.driver.wait(
      until.elementLocated(this.contactUsHeader),
      10000
    );
    return el.getText();
  }
  async assertContactUsHeaderTextIsCorrect(expectedText) {
    const actual = await this.getContactUsHeaderText();
    if (actual !== expectedText)
      throw new Error(
        `Contact Us header mismatch: ${actual} !== ${expectedText}`
      );
    return this;
  }
  async scrollToContactUsForm() {
    const el = await this.driver.wait(
      until.elementLocated(this.contactUsFormSubHeader),
      10000
    );
    await this.driver.executeScript("arguments[0].scrollIntoView();", el);
    return this;
  }
  async enterFirstNameContactUsForm(firstName) {
    const el = await this.driver.wait(
      until.elementLocated(this.firstName),
      10000
    );
    await el.clear();
    await el.sendKeys(firstName);
    return this;
  }
  async enterLastNameContactUsForm(lastName) {
    const el = await this.driver.wait(
      until.elementLocated(this.lastName),
      10000
    );
    await el.clear();
    await el.sendKeys(lastName);
    return this;
  }
  async enterEmailContactUsForm(email) {
    const el = await this.driver.wait(until.elementLocated(this.email), 10000);
    await el.clear();
    await el.sendKeys(email);
    return this;
  }
  async selectCountryContactUsForm(countryValue) {
    const selectEl = await this.driver.wait(
      until.elementLocated(this.country),
      10000
    );
    await selectEl.click();
    const options = await selectEl.findElements(By.tagName("option"));
    for (const option of options) {
      const value = await option.getAttribute("value");
      if (value === countryValue) {
        await option.click();
        await this.driver.sleep(300);
        return this;
      }
    }
    throw new Error(`Country value "${countryValue}" not found in dropdown`);
  }
  static generateRandomEmail() {
    const chars = "ABCD1234*&";
    let random = "";
    for (let i = 0; i <= 4; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${random}@gmail.com`;
  }
  async enterPhoneNumContactUsForm(phoneNum) {
    const el = await this.driver.wait(
      until.elementLocated(this.phoneNumber),
      10000
    );
    await el.clear();
    await el.sendKeys(phoneNum);
    return this;
  }
  async selectSubjectContactUsForm(subjectValue) {
    const selectEl = await this.driver.wait(
      until.elementLocated(this.subjectDropdown),
      10000
    );
    await selectEl.click();
    const options = await selectEl.findElements(By.tagName("option"));
    for (const option of options) {
      const value = await option.getAttribute("value");
      if (value === subjectValue) {
        await option.click();
        await this.driver.sleep(300);
        return this;
      }
    }
    throw new Error(`Subject value "${subjectValue}" not found in dropdown`);
  }
  async enterMessageToSendContactUsForm(message) {
    const el = await this.driver.wait(
      until.elementLocated(this.message),
      10000
    );
    await el.clear();
    await el.sendKeys(message);
    return this;
  }
  async switchToCaptchaFrame() {
    await this.driver.wait(
      until.ableToSwitchToFrame(this.iFrameCaptcha),
      10000
    );
  }
  async clickCaptchaCheckBoxContactUsForm() {
    const el = await this.driver.wait(
      until.elementLocated(this.captchaCheckbox),
      10000
    );
    await el.click();
    await this.driver.sleep(5000);
    return this;
  }
  async switchToDefaultContent() {
    await this.driver.switchTo().defaultContent();
  }
  async clickSendEnquiryBtnContactUsForm() {
    const btn = await this.driver.wait(
      until.elementLocated(this.sendEnquiryBtn),
      10000
    );
    await btn.click();
    return this;
  }
  async clickSendEnquiryContactUsBtnForValidations() {
    const btn = await this.driver.wait(
      until.elementLocated(this.sendEnquiryBtn),
      10000
    );
    await btn.click();
    return this;
  }
  async validateSuccessfulMessageIsDisplayed() {
    const el = await this.driver.wait(
      until.elementLocated(this.successMsg),
      10000
    );
    return el.isDisplayed();
  }
  async getContactUsFormSuccessfulSubmissionText() {
    const el = await this.driver.wait(
      until.elementLocated(this.successMsg),
      10000
    );
    return el.getText();
  }
  async assertContactUsSuccessfulSubmissionTextIsCorrect(expectedText) {
    const actual = await this.getContactUsFormSuccessfulSubmissionText();
    if (actual !== expectedText)
      throw new Error(
        `Contact Us form submission text mismatch: ${actual} !== ${expectedText}`
      );
    return this;
  }

  // ===== Validation Methods =====
  async getFirstNameRequiredContactUsPageValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.firstNameRequiredValidation),
      10000
    );
    return el.getText();
  }
  async assertFirstNameContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
    expectedError
  ) {
    const actual = await this.getFirstNameRequiredContactUsPageValidationText();
    if (actual !== expectedError)
      throw new Error(`First Name validation: ${actual} !== ${expectedError}`);
    return this;
  }
  async getLastNameRequiredContactUsPageValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.lastNameRequiredValidation),
      10000
    );
    return el.getText();
  }
  async assertLastNameContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
    expectedError
  ) {
    const actual = await this.getLastNameRequiredContactUsPageValidationText();
    if (actual !== expectedError)
      throw new Error(`Last Name validation: ${actual} !== ${expectedError}`);
    return this;
  }
  async getEmailRequiredContactUsPageValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.emailRequiredValidation),
      10000
    );
    return el.getText();
  }
  async assertEmailContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
    expectedError
  ) {
    const actual = await this.getEmailRequiredContactUsPageValidationText();
    if (actual !== expectedError)
      throw new Error(`Email validation: ${actual} !== ${expectedError}`);
    return this;
  }
  async getCountryRequiredContactUsPageValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.countryRequiredValidation),
      10000
    );
    return el.getText();
  }
  async assertCountryRequiredContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
    expectedError
  ) {
    const actual = await this.getCountryRequiredContactUsPageValidationText();
    if (actual !== expectedError)
      throw new Error(`Country validation: ${actual} !== ${expectedError}`);
    return this;
  }
  async getInvalidPhoneNumRequiredContactUsPageValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.invalidPhoneNumberValidation),
      10000
    );
    return el.getText();
  }
  async assertInvalidPhoneRequiredContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
    expectedError
  ) {
    const actual =
      await this.getInvalidPhoneNumRequiredContactUsPageValidationText();
    if (actual !== expectedError)
      throw new Error(`Phone validation: ${actual} !== ${expectedError}`);
    return this;
  }
  async getSubjectRequiredContactUsPageValidationText() {
    const el = await this.driver.wait(
      until.elementLocated(this.subjectRequiredValidation),
      10000
    );
    return el.getText();
  }
  async assertSubjectRequiredContactUsPageRequiredValidationTextIsDisplayedAndIsCorrect(
    expectedError
  ) {
    const actual = await this.getSubjectRequiredContactUsPageValidationText();
    if (actual !== expectedError)
      throw new Error(`Subject validation: ${actual} !== ${expectedError}`);
    return this;
  }
}

module.exports = ContactUsFormPage;
