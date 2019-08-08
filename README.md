# Test API example with using puppeteer + js

Next scripts are available:
* "test:run": to run the script with preconfigured parameters
* "test:custom:run": to run the script with custom URL, TIMEOUT and CYCLE (to define the number of repetitions) parameters

#### Instructions:
1. Install packages:
```npm ci``` or ```npm install```
2. Run scripts:
```npm run test:run``` for using pre-configured parameters or for using customization:
```NEW_URL=custom_url NEW_TIMEOUT=custom_timeout REPEAT=number_of_cycles npm run test:custom:run```, where:
 custom_url - a value of the new url, on which the script will be executed
 custom_timeout - a value of time to wait after opening the page
 number_of_cycles - number of required repetitions