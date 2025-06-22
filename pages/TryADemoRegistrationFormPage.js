const { By, until } = require("selenium-webdriver");

class TryADemoRegistrationFormPage {
  constructor(driver) {
    this.driver = driver;
    // Success selectors
    this.mt4OptionDemoAccPage = By.xpath("//button[normalize-space()='MT4']");
    this.tryAFreeDemoHeader = By.xpath(
      "//h1[1][contains(text(), 'Try a free demo with a virtual')]"
    );
    this.leverageDropdown = By.css('select[name="leverage"]');
    this.accSizeDropdown = By.css('select[name="deposit"]');
    this.firstNameField = By.css('input[name="firstName"]');
    this.lastNameField = By.css('input[name="lastName"]');
    this.emailField = By.css('input[name="email"]');
    this.countryDropdown = By.css('select[name="country"]');
    this.phoneNumberField = By.css('input[inputmode="tel"]');
    this.marketingCheckbox = By.xpath("(//input[@type='checkbox'])[1]");
    this.openADemoAccBtn = By.css('button[type="submit"]');
    this.successMsg = By.xpath(
      '//p[normalize-space()="Your submission was successful."]'
    );

    // Validation selectors
    this.leverageRequiredValidation = By.xpath(
      "//span[normalize-space()='Leverage is required']"
    );
    this.accountSizeRequiredValidation = By.xpath(
      "//span[normalize-space()='Account size is required']"
    );
    this.firstNameDemoRequiredValidation = By.xpath(
      "//span[normalize-space()='First name is required']"
    );
    this.lastNameDemoRequiredValidation = By.xpath(
      "//span[normalize-space()='Last name is required']"
    );
    this.emailDemoRequiredValidation = By.xpath(
      "//span[normalize-space()='Email is required']"
    );
    this.countryDemoRequiredValidation = By.xpath(
      "//span[normalize-space()='Country is required']"
    );
    this.invalidPhoneNumberDemoRequiredValidation = By.xpath(
      "//span[normalize-space()='Invalid phone number']"
    );
  }

  // ----------- SUCCESS TEST METHODS -----------

  async validateMt4OptionIsDisplayed() {
    return (
      await this.driver.wait(
        until.elementLocated(this.mt4OptionDemoAccPage),
        10000
      )
    ).isDisplayed();
  }

  async validateTryAFreeDemoHeaderIsDisplayed() {
    return (
      await this.driver.wait(
        until.elementLocated(this.tryAFreeDemoHeader),
        10000
      )
    ).isDisplayed();
  }

  async selectLeverageDemoAcc(leverageValue) {
    const select = await this.driver.wait(
      until.elementLocated(this.leverageDropdown),
      10000
    );
    await select.click();
    const options = await select.findElements(By.tagName("option"));
    for (const option of options) {
      const value = await option.getAttribute("value");
      if (value === leverageValue) {
        await option.click();
        await this.driver.sleep(300);
        return this;
      }
    }
    throw new Error(`Leverage value "${leverageValue}" not found in dropdown`);
  }

  async selectDemoAccSize(demoAccValue) {
    const select = await this.driver.wait(
      until.elementLocated(this.accSizeDropdown),
      10000
    );
    await select.click();
    const options = await select.findElements(By.tagName("option"));
    for (const option of options) {
      const value = await option.getAttribute("value");
      if (value === demoAccValue) {
        await option.click();
        await this.driver.sleep(300);
        return this;
      }
    }
    throw new Error(
      `Demo Account Size value "${demoAccValue}" not found in dropdown`
    );
  }

  async enterFirstNameDemoAcc(firstName) {
    const el = await this.driver.wait(
      until.elementLocated(this.firstNameField),
      10000
    );
    await el.clear();
    await el.sendKeys(firstName);
    return this;
  }

  async enterLastNameDemoAcc(lastName) {
    const el = await this.driver.wait(
      until.elementLocated(this.lastNameField),
      10000
    );
    await el.clear();
    await el.sendKeys(lastName);
    return this;
  }

  async enterEmailDemoAcc(email) {
    const el = await this.driver.wait(
      until.elementLocated(this.emailField),
      10000
    );
    await el.clear();
    await el.sendKeys(email);
    return this;
  }

  async selectCountryDemoAcc(countryValue) {
    const select = await this.driver.wait(
      until.elementLocated(this.countryDropdown),
      10000
    );
    await select.click();
    const options = await select.findElements(By.tagName("option"));
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

  async enterPhoneNumDemoAcc(phoneNum) {
    const el = await this.driver.wait(
      until.elementLocated(this.phoneNumberField),
      10000
    );
    await el.clear();
    await el.sendKeys(phoneNum);
    return this;
  }

  async clickMarketingNewsCheckBoxDemoAcc() {
    const el = await this.driver.wait(
      until.elementLocated(this.marketingCheckbox),
      10000
    );
    if (!(await el.isSelected())) await el.click();
    return this;
  }

  static generateRandomEmail() {
    const chars = "ABCD1234*&";
    let random = "";
    for (let i = 0; i < 5; i++) {
      random += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${random}@gmail.com`;
  }

  async clickOpenADemoAccountBtn() {
    const btn = await this.driver.wait(
      until.elementLocated(this.openADemoAccBtn),
      10000
    );
    await btn.click();
    return this;
  }

  async validateSuccessfulSubmissionMessageIsDisplayed() {
    return (
      await this.driver.wait(until.elementLocated(this.successMsg), 15000)
    ).isDisplayed();
  }

  async getSuccessfulSubmissionMessageText() {
    const el = await this.driver.wait(
      until.elementLocated(this.successMsg),
      15000
    );
    return el.getText();
  }

  // ----------- VALIDATION/NEGATIVE TEST METHODS -----------

  async clickOpenADemoAccountBtnForValidations() {
    // Click submit with empty form to trigger validations
    const btn = await this.driver.wait(
      until.elementLocated(this.openADemoAccBtn),
      10000
    );
    await btn.click();
    return this;
  }

  async assertLeverageRequiredValidationTextIsDisplayedAndIsCorrect(expected) {
    const el = await this.driver.wait(
      until.elementLocated(this.leverageRequiredValidation),
      10000
    );
    const txt = await el.getText();
    if (txt !== expected)
      throw new Error(`Leverage validation failed: "${txt}" !== "${expected}"`);
  }

  async assertAccSizeRequiredValidationTextIsDisplayedAndIsCorrect(expected) {
    const el = await this.driver.wait(
      until.elementLocated(this.accountSizeRequiredValidation),
      10000
    );
    const txt = await el.getText();
    if (txt !== expected)
      throw new Error(`Acc Size validation failed: "${txt}" !== "${expected}"`);
  }

  async assertFirstNameDemoRequiredValidationTextIsDisplayedAndIsCorrect(
    expected
  ) {
    const el = await this.driver.wait(
      until.elementLocated(this.firstNameDemoRequiredValidation),
      10000
    );
    const txt = await el.getText();
    if (txt !== expected)
      throw new Error(
        `First Name validation failed: "${txt}" !== "${expected}"`
      );
  }

  async assertLastNameDemoRequiredValidationTextIsDisplayedAndIsCorrect(
    expected
  ) {
    const el = await this.driver.wait(
      until.elementLocated(this.lastNameDemoRequiredValidation),
      10000
    );
    const txt = await el.getText();
    if (txt !== expected)
      throw new Error(
        `Last Name validation failed: "${txt}" !== "${expected}"`
      );
  }

  async assertEmailDemoRequiredValidationTextIsDisplayedAndIsCorrect(expected) {
    const el = await this.driver.wait(
      until.elementLocated(this.emailDemoRequiredValidation),
      10000
    );
    const txt = await el.getText();
    if (txt !== expected)
      throw new Error(`Email validation failed: "${txt}" !== "${expected}"`);
  }

  async assertCountryRequiredValidationTextIsDisplayedAndIsCorrect(expected) {
    const el = await this.driver.wait(
      until.elementLocated(this.countryDemoRequiredValidation),
      10000
    );
    const txt = await el.getText();
    if (txt !== expected)
      throw new Error(`Country validation failed: "${txt}" !== "${expected}"`);
  }

  async assertInvalidPhoneNumRequiredValidationTextIsDisplayedAndIsCorrect(
    expected
  ) {
    const el = await this.driver.wait(
      until.elementLocated(this.invalidPhoneNumberDemoRequiredValidation),
      10000
    );
    const txt = await el.getText();
    if (txt !== expected)
      throw new Error(`Phone validation failed: "${txt}" !== "${expected}"`);
  }
}

module.exports = TryADemoRegistrationFormPage;
