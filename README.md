# Test API example with using puppeteer + js

#### Next script options are available:
* script with preconfigured parameters: ```npm run test:run```
* script for the cutomization: ```npm run test:run -- --url=new_url_value --t=new_timeout --cycle=number_of_repetitions``` where:
   ```new_url_value``` - a value of the new url, on which the script will be executed;
   ```new_timeout``` - a value of time to wait after opening the page;
   ```number_of_repetitions``` - number of required repetitions

#### Instructions:
1. In the terminal navigate to the project directory
2. In the terminal execute following scripts to install the required packages:
```npm ci``` or ```npm install```
3. For the test execution run script at the project directory:
* ```npm run test:run``` for using pre-configured parameters or 
* ```npm run test:run -- --url=new_url_value --t=new_timeout --cycle=number_of_repetitions``` for using with custom parameters, where:
 ```new_url_value``` - a value of the new url, on which the script will be executed;
 ```new_timeout``` - a value of time to wait after opening the page;
 ```number_of_repetitions``` - number of required repetitions

#### The application was written and tested at MacOS / Chrome browser, but should work at other OS too
#### For the scripts execution there should be installed ```node.js``` and ```npm``` packages at the local environment
