const puppy = require("puppeteer");

const data=require("./secret")

async function main() {
  try {
    let browser = await puppy.launch({
      headless: false,
      defaultViewport: false,
      timeout: 0,
      args: ["--start-maximized"],
      slowMo: 10,
    });
    let tabs = await browser.pages();
    let tab = tabs[0];

    //Going To LinkedIn
    await tab.goto("https://www.linkedin.com/home");
    await tab.click(".nav__button-secondary");
    await new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    
    //Entering the username and password and clicking on signup button
    await tab.type("#username", data.userid);
    await tab.type("#password", data.password);
    await tab.click(".btn__primary--large.from__button--floating");

    //Going to MyNetwork
    await tab.waitForNavigation({ waitUntil: "networkidle2" });
    let navItems = await tab.$$(".global-nav__primary-item");
    await tab.evaluate((ele) => {
      ele.children[0].click();
    }, navItems[1]);

    await new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    
    await tab.waitForSelector(".msg-overlay-bubble-header__details.flex-row.align-items-center",{ visible: true });
    await tab.click(".msg-overlay-bubble-header__details.flex-row.align-items-center");
    await tab.waitForSelector(".ember-view.mn-invitations-preview__manage-all.artdeco-button.artdeco-button--tertiary.artdeco-button--muted.artdeco-button--2");
    await tab.click(".ember-view.mn-invitations-preview__manage-all.artdeco-button.artdeco-button--tertiary.artdeco-button--muted.artdeco-button--2");

    await new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    // Accepting the conecction requests 
    let Btns = await tab.$$(".invitation-card__action-btn.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view");
    console.log(Btns.length)
    for (let i = 0; i < Btns.length; i++) {
      await tab.evaluate(async function (ele) {
        await ele.click();
      }, Btns[i]);
    }
  } catch (err) {
    console.log("Error Occured :", err);
  }
}

main();
