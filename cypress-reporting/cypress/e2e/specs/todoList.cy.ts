import mainPage from '../../pages/mainPage'

describe('app has basic functionality', () => {
  const secondTaskSelector: string = 'li[data-cy="todo"]:nth-child(2)'

  beforeEach(() => {
    cy.visit(mainPage.urlExtension)
    cy.clearLocalStorage()
  })

  it('should load application', () => {
    cy.url().should('contain', Cypress.config('baseUrl'))
    mainPage.title.should('have.text', 'TODO')
  })

  it('should add task', () => {
    mainPage.tasks.should('not.exist')
    mainPage.createTask('First task')
    mainPage.tasks.should('have.length', 1)
    mainPage.activeTaskCount.should('have.text', '1')
  })

  it('should add multiple tasks', () => {
    mainPage.tasks.should('not.exist')
    mainPage.createTask('First task')
    mainPage.createTask('Second task')
    mainPage.createTask('Third task')
    mainPage.tasks.should('have.length', 3)
    mainPage.activeTaskCount.should('have.text', '3')
  })

  it('should complete tasks', () => {
    mainPage.createTask('First task')
    mainPage.createTask('Second task')
    mainPage.completeTask('First task')
    mainPage.tasks.should('have.length', 2)
    mainPage.completedTasks.should('have.length', 1)
    mainPage.activeTaskCount.should('have.text', '1')
  })

  it('should display active tasks only', () => {
    mainPage.createTask('First task')
    mainPage.createTask('Second task')
    mainPage.completeTask('First task')
    mainPage.activeTaskButton.click()
    mainPage.taskByName('First task').should('have.css', 'opacity', '0')
    mainPage.taskByName('Second task').should('have.css', 'opacity', '1')
  })

  it('should display completed tasks only', () => {
    mainPage.createTask('First task')
    mainPage.createTask('Second task')
    mainPage.completeTask('First task')
    mainPage.completedTaskButton.click()
    mainPage.taskByName('First task').should('have.css', 'opacity', '1')
    mainPage.taskByName('Second task').should('have.css', 'opacity', '0')
  })

  it('should display all tasks only', () => {
    mainPage.createTask('First task')
    mainPage.createTask('Second task')
    mainPage.completeTask('First task')
    mainPage.completedTaskButton.click()
    mainPage.taskByName('First task').should('have.css', 'opacity', '1')
    mainPage.taskByName('Second task').should('have.css', 'opacity', '0')
    mainPage.allTaskButton.click()
    mainPage.taskByName('First task').should('have.css', 'opacity', '1')
    mainPage.taskByName('Second task').should('have.css', 'opacity', '1')
  })

  it('should clear completed tasks', () => {
    mainPage.createTask('First task')
    mainPage.createTask('Second task')
    mainPage.completeTask('First task')
    mainPage.clearCompletedButton.click()
    mainPage.tasks.should('have.length', 1)
  })

  it('should allow drag and drop of tasks', () => {
    mainPage.createTask('First task')
    mainPage.createTask('Second task')
    mainPage.taskByName('First task').drag(secondTaskSelector, {
      force: true,
      log: false,
    })
    mainPage.taskByIndex(0).should('have.text', 'Second task')
    mainPage.taskByIndex(1).should('have.text', 'First task')
  })
})
