const { By, until } = require("selenium-webdriver");

class TryADemoRegistrationFormPage {
  constructor(driver) {
    this.driver = driver;
    // Locators
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
  }

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
}

module.exports = TryADemoRegistrationFormPage;
