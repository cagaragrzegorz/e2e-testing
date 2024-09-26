import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://todo-app-for-cyclope.netlify.app/',
    setupNodeEvents(on, config) {
      //reporter
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },
  },
})
