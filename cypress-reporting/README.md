# cypress-reporting

'TODO' online app tests with use of Page Object Model + cypress + reports -> HTML and JUnit.xml

# Run

1. Install dependencies  
   `npm install` or `yarn install`
2. Run cypress tests to get JUnit xmls and MochaAwesome HTML report  
   `npm run cy:run` or `yarn run cy:run`  
   or `yarn cypress run --reporter cypress-multi-reporters --reporter-options configFile=reporters/config.json`

JUnit xml are available in `results` folder.  
HTML report is available in `report` folder.

Find more scripts in `package.json`.





