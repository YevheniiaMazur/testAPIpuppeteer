const fs = require('fs');

async function grabDevToolData(navUrl, custTime, pageObj) {
    const requestUrls = [];
    const failedRequestUrls = [];
    const responseInfo = [];
    const consoleLogs = [];
    const errorLogs = [];

    await pageObj.setRequestInterception(true);

    pageObj.on('request', request => {
        request.continue();
        requestUrls.push(request.url());
    });

    pageObj.on('requestfailed', request => {
        return failedRequestUrls.push(request.url());
    });

    pageObj.on('response', response => {
        const request = response.request();
        const url = request.url();
        const status = response.status();
        responseInfo.push(`response url: ${ url }, status: ${ status }`)
    });

    pageObj.on('console', msg => {
        consoleLogs.push(msg.text());
    });

    pageObj.on('pageerror', err => {
        errorLogs.push(err);
    });

    await pageObj.goto(navUrl);
    await pageObj.waitFor(custTime);

    pageObj.removeAllListeners('request');
    pageObj.removeAllListeners('requestfailed');
    pageObj.removeAllListeners('response');
    pageObj.removeAllListeners('console');
    pageObj.removeAllListeners('pageerror');

    return {conLog: consoleLogs, errs: errorLogs, reqUrl: requestUrls, failReqUrl: failedRequestUrls, resp: responseInfo};
};

async function generateReport(reportName, dataToWrite) {
    await fs.writeFile(reportName, JSON.stringify(dataToWrite), (err) => {
        if (err) throw err;
    });
};

module.exports.generateReport = generateReport;
module.exports.grabDevToolData = grabDevToolData;