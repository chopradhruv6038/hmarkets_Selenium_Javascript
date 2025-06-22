const { By, until } = require("selenium-webdriver");

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.openAnAccountBtn = By.xpath(
      "(//div[contains(text(),'Open an account')])[2]"
    );
    this.tryADemoBtn = By.xpath("//div[contains(text(),'Try a demo')]");
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
}

module.exports = HomePage;
