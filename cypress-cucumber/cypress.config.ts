import { defineConfig } from 'cypress'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { preprocessor } from '@badeball/cypress-cucumber-preprocessor/browserify'
async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config)

  on(
    'file:preprocessor',
    preprocessor(config, {
      typescript: require.resolve('typescript'),
    })
  )
  return config
}

export default defineConfig({
  e2e: {
    baseUrl: 'https://todo-app-for-cyclope.netlify.app/',
    specPattern: '**/*.feature',
    setupNodeEvents,
  },
})
