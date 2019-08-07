const fs = require('fs');

module.exports = class Helper {
    async getRequestUrls(navUrl, custTime, pageObj) {
        let requestUrls = [];

        await pageObj.setRequestInterception(true);
        pageObj.on('request', request => {
            request.continue();
            return requestUrls.push(request.url());
        });

        await pageObj.goto(navUrl);
        await pageObj.waitFor(custTime);

        await fs.writeFile('requestUrlsReport.json', JSON.stringify(requestUrls), (err) => {
            if (err) throw err;
        });
    };

    async getFailedRequests(navUrl, custTime, pageObj) {
        let failedRequestUrls = [];

        await pageObj.setRequestInterception(true);

        pageObj.on('requestfailed', request => {
            return failedRequestUrls.push(request.url());
        });

        await pageObj.goto(navUrl);
        await pageObj.waitFor(custTime);

        await fs.writeFile('failedRequestUrlsReport.json', JSON.stringify(failedRequestUrls), (err) => {
            if (err) throw err;
        });
    };

    async getResponses(navUrl, custTime, pageObj) {
        let responseInfo = [];

        await pageObj.setRequestInterception(true);

        pageObj.on('response', response => {
            const request = response.request();
            const url = request.url();
            const status = response.status();
            return responseInfo.push(`response url: ${url}, status: ${status}`)
        });

        await pageObj.goto(navUrl);
        await pageObj.waitFor(custTime);

        await fs.writeFile('responsesReport.json', JSON.stringify(responseInfo), (err) => {
            if (err) throw err;
        });
    };

    async getConsoleLogs(navUrl, custTime, pageObj) {
        let consoleLogs = [];

        pageObj.on('console', msg => {
            return consoleLogs.push(msg.text());
        });

        await pageObj.goto(navUrl);
        await pageObj.waitFor(custTime);
        await fs.writeFile('consoleLogsReport.json', JSON.stringify(consoleLogs), (err) => {
            if (err) throw err;
        });
    };
};