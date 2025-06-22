const { Builder } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Live Account Creation Success Page", function () {
  let driver;
  this.timeout(30000);

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize(); // Maximize the window!
  });

  after(async function () {
    await driver.quit();
  });

  it("should access hmarkets.com", async function () {
    await driver.get("https://hmarkets.com/");
    const url = await driver.getCurrentUrl();
    expect(url).to.include("hmarkets.com");
  });
});
