const puppeteer = require('puppeteer');
const argv = require('yargs').argv;
const helper =  require('./helper.js');

(async function mainFunc() {
    //starting browser session
    const browser = await puppeteer.launch({ headless:false });
    const page = await browser.newPage();

    //preparing variables from the npm custom script to further use
    const mainUrl = argv.url || 'https://www.calcalistech.com/ctech/articles/0,7340,L-3746524,00.html';
    const customTimeout = Number(argv.t) || 30 * 1000;
    const numberOfCycles = Number(argv.cycle) || 1;

    //templates for each report type
    const consoleReportName = 'consoleLogsReport.json';
    const errorsReportName = 'errorLogsReport.json';
    const requestsReportName = 'requestUrlsReport.json';
    const failedRequestsReportName = 'failedRequestUrlsReport.json';
    const responsesReportName = 'responsesReport.json';

    //variables for the resulting data of all cycles
    const logsResultArr = [];
    const errorsResultArr = [];
    const reqUrlsResultArr = [];
    const failedReqResultArr = [];
    const responsesResultArr = [];

    for(let i = 0; i < numberOfCycles; i++) {
        const allGrabbedData = await helper.grabDevToolData(mainUrl, customTimeout, page);
        //storing results of each data type
        const logsArr = allGrabbedData.conLog;
        const errorsArr = allGrabbedData.errs;
        const reqUrlsArr = allGrabbedData.reqUrl;
        const failedReqArr = allGrabbedData.failReqUrl;
        const responsesArr = allGrabbedData.resp;

        //pushing the results of each cycle into the resulting arrays
        logsResultArr.push(logsArr);
        errorsResultArr.push(errorsArr);
        reqUrlsResultArr.push(reqUrlsArr);
        failedReqResultArr.push(failedReqArr);
        responsesResultArr.push(responsesArr);

        //generating reports of each cycle
        await helper.generateReport(`Cycle${ i + 1 }: ${ consoleReportName }`, logsArr);
        await helper.generateReport(`Cycle${ i + 1 }: ${ errorsReportName }`, errorsArr);
        await helper.generateReport(`Cycle${ i + 1 }: ${ requestsReportName }`, reqUrlsArr);
        await helper.generateReport(`Cycle${ i + 1 }: ${ failedRequestsReportName }`, failedReqArr);
        await helper.generateReport(`Cycle${ i + 1 }: ${ responsesReportName }`, responsesArr);
    }
    //finishing browser session
    await browser.close();

    //generating summary reports of all cycles
    await helper.generateReport(`Summary: ${ consoleReportName }`, logsResultArr);
    await helper.generateReport(`Summary: ${ errorsReportName }`, errorsResultArr);
    await helper.generateReport(`Summary: ${ requestsReportName }`, reqUrlsResultArr);
    await helper.generateReport(`Summary: ${ failedRequestsReportName }`, failedReqResultArr);
    await helper.generateReport(`Summary: ${ responsesReportName }`, responsesResultArr);
})();