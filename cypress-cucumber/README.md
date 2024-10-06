# cypress-pom

'TODO' online app tests with use of Page Object Model + cypress + Cucumber.  
Cucumber allows for BDD (for me this is more BDT - Behavioral Driven Testing rather than BDD) implementation utilizing Gherkin syntax for test cases creation.

Structure:

```bash
.
└── cypress/
    ├── e2e/
    │   └── specs/
    │       ├── todoList.feature  // tests
    │       └── todoList.ts       // test steps
    ├── pages                     // page objects
    └── support
```

# Run

1. Install dependencies  
   `npm install` or `yarn install`
2. Run cypress tests  
   `npm run cy:run` or `yarn run cy:run`

Find more scripts in `package.json`
