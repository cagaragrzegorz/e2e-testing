import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import mainPage from '../../pages/mainPage'

When('User opens ToDo application', () => {
  cy.visit(mainPage.urlExtension)
})

Then('Application should load on with proper url', () => {
  cy.url().should('contain', Cypress.config('baseUrl'))
})

Then('Title is visible', () => {
  mainPage.title.should('have.text', 'TODO')
})

When(`User adds task {string}`, (task: string) => {
  mainPage.tasksInput.type(task + '{enter}')
})

When(`User completes {string}`, (task: string) => {
  mainPage.taskByName(task).find('input.cb-input').check()
})

Then('There are no tasks', () => {
  mainPage.tasks.should('not.exist')
})

Then(`There are {int} tasks in todo`, (count) => {
  mainPage.tasks.should('have.length', count)
})

Then(`Counter shows {int} active tasks`, (count) => {
  mainPage.activeTaskCount.should('have.text', count.toString())
})

Then(`There are {int} completed tasks in to do`, (count) => {
  mainPage.activeTaskCount.should('have.text', count.toString())
})
