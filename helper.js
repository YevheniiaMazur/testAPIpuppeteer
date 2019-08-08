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

        return requestUrls;
    };

    async getFailedRequests(navUrl, custTime, pageObj) {
        let failedRequestUrls = [];

        await pageObj.setRequestInterception(true);

        pageObj.on('requestfailed', request => {
            return failedRequestUrls.push(request.url());
        });
        await pageObj.goto(navUrl);
        await pageObj.waitFor(custTime);

        return failedRequestUrls;
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

        return responseInfo;
    };

    async getConsoleLogs(navUrl, custTime, pageObj) {
        let consoleLogs = [];

        pageObj.on('console', msg => {
            return consoleLogs.push(msg.text());
        });
        await pageObj.goto(navUrl);
        await pageObj.waitFor(custTime);
        return consoleLogs;
    };

    async getPageErrors(navUrl, custTime, pageObj) {
        let errorLogs = [];

        pageObj.on('pageerror', err => {
            return errorLogs.push(err);
        });
        await pageObj.goto(navUrl);
        await pageObj.waitFor(custTime);
        return errorLogs;
    };

    async generateReport(reportName, dataToWrite) {
        await fs.writeFile(reportName, JSON.stringify(dataToWrite), (err) => {
            if (err) throw err;
        });
    }
};