const puppeteer = require('puppeteer');
const argv = require('yargs').argv
const Helper =  require('./helper.js');
const helper = new Helper();

async function mainFunc() {
    //starting browser session
    var browser = await puppeteer.launch({headless:false});

    //preparing variables from the npm script to further use
    const mainUrl = argv.url;
    const customTimeout = Number(argv.t);
    const numberOfCycles = Number(argv.cycle);

    //templates for each report type
    const consoleReportName = 'consoleLogsReport.json';
    const errorsReportName = 'errorLogsReport.json';
    const requestsReportName = 'requestUrlsReport.json';
    const failedRequestsReportName = 'failedRequestUrlsReport.json';
    const responsesReportName = 'responsesReport.json';

    //variables for the resulting data of all cycles
    let logsResultArr = [];
    let errorsResultArr = [];
    let reqUrlsResultArr = [];
    let failedReqResultArr = [];
    let responsesResultArr = [];

    //TODO: run cycles at same tab (for now the separate tabs at same browser are used)
    for(let i=0; i<numberOfCycles; i++) {
        var page = await browser.newPage();

        //storing results of each function
        const logsArr = await helper.getConsoleLogs(mainUrl, customTimeout, page);
        const errorsArr = await helper.getPageErrors(mainUrl, customTimeout, page);
        const reqUrlsArr = await helper.getRequestUrls(mainUrl, customTimeout, page);
        const failedReqArr = await helper.getFailedRequests(mainUrl, customTimeout, page);
        const responsesArr = await helper.getResponses(mainUrl, customTimeout, page);

        //pushing the results of each cycle into the resulting arrays
        logsResultArr.push(logsArr);
        errorsResultArr.push(errorsArr);
        reqUrlsResultArr.push(reqUrlsArr);
        failedReqResultArr.push(failedReqArr);
        responsesResultArr.push(responsesArr);

        //generating reports of each cycle
        await helper.generateReport(`Cycle${i+1}: ${consoleReportName}`, logsArr);
        await helper.generateReport(`Cycle${i+1}: ${errorsReportName}`, errorsArr);
        await helper.generateReport(`Cycle${i+1}: ${requestsReportName}`, reqUrlsArr);
        await helper.generateReport(`Cycle${i+1}: ${failedRequestsReportName}`, failedReqArr);
        await helper.generateReport(`Cycle${i+1}: ${responsesReportName}`, responsesArr);
    }
    //finishing browser session
    await browser.close();

    //generating summary reports of all cycles
    await helper.generateReport(`Summary: ${consoleReportName}`, logsResultArr);
    await helper.generateReport(`Summary: ${errorsReportName}`, errorsResultArr);
    await helper.generateReport(`Summary: ${requestsReportName}`, reqUrlsResultArr);
    await helper.generateReport(`Summary: ${failedRequestsReportName}`, failedReqResultArr);
    await helper.generateReport(`Summary: ${responsesReportName}`, responsesResultArr);
}

mainFunc();