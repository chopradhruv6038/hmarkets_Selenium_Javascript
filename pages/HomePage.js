const { By, until } = require("selenium-webdriver");
const ContactUsFormPage = require("./ContactUsFormPage");

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.openAnAccountBtn = By.xpath(
      "(//div[contains(text(),'Open an account')])[2]"
    );
    this.tryADemoBtn = By.xpath("//div[contains(text(),'Try a demo')]");
    this.contactUsLink = By.xpath("(//a[normalize-space()='Contact Us'])[1]");
  }

  async loadUrl(url) {
    await this.driver.get(url);
    return this;
  }

  async clickOpenAnAccBtnCntrHomePage() {
    const btn = await this.driver.wait(
      until.elementLocated(this.openAnAccountBtn),
      10000
    );
    await btn.click();
    return this;
  }

  async clickTryADemoBtn() {
    const btn = await this.driver.wait(
      until.elementLocated(this.tryADemoBtn),
      10000
    );
    await btn.click();
    return this;
  }

  async clickContactUsBtn() {
    const btn = await this.driver.wait(
      until.elementLocated(this.contactUsLink),
      10000
    );
    await btn.click();
    return new ContactUsFormPage(this.driver); // for page chaining if needed
  }

  async validateContactUsBtnIsDisplayed() {
    const el = await this.driver.wait(
      until.elementLocated(this.contactUsLink),
      10000
    );
    return el.isDisplayed();
  }
}

module.exports = HomePage;
