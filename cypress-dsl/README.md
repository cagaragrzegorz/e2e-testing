# cypress-dsl

'TODO' online app tests with use of Page Object Model and Domain Specific Language approach + cypress The idea is to
prepare functions representing actions that end user can take in the UI. That creates set of behaviors for particular
website that can be chained and read easily.

Structure:

```bash
.
└── cypress/
    ├── dsl             // behavioral part
    ├── e2e/
    │   ├── assertions  // assertion/verification part
    │   └── specs       // tests
    ├── pages           // structural part
    └── support
```

# Run

1. Install dependencies  
   `npm install` or `yarn install`
2. Run cypress tests  
   `npm run cy:run` or `yarn run cy:run`

Find more scripts in `package.json`