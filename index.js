const puppeteer = require('puppeteer');
const Helper =  require('./helper.js');
const helper = new Helper();

async function mainFunc() {
    var browser = await puppeteer.launch();
    var page = await browser.newPage();
    const mainUrl = process.env.URL;
    const customTimeout = Number(process.env.TIMEOUT);

    await helper.getConsoleLogs(mainUrl, customTimeout, page);
    await helper.getRequestUrls(mainUrl, customTimeout, page);
    await helper.getFailedRequests(mainUrl, customTimeout, page);
    await helper.getResponses(mainUrl, customTimeout, page);
    await browser.close();
}

mainFunc();