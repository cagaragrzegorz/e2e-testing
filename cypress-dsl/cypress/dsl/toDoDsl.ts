import mainPage from '../pages/mainPage'

type assertionLambda = () => void
class ToDoDsl {
  verify(assertions: assertionLambda | assertionLambda[]) {
    if (assertions instanceof Array) {
      assertions.forEach((assertion) => assertion())
    } else {
      assertions()
    }
    return this
  }

  openToDoApp() {
    cy.visit(mainPage.urlExtension)
    return this
  }
  createTask(text: string) {
    mainPage.tasksInput.type(text + '{enter}')
    return this
  }
  createTasks(tasks: string[]) {
    tasks.forEach((text) => this.createTask(text))
    return this
  }

  completeTask(text: string) {
    mainPage.taskByName(text).find('input.cb-input').check()
    return this
  }

  filterActiveTasks() {
    mainPage.activeTaskButton.click()
    return this
  }

  filterCompletedTasks() {
    mainPage.completedTaskButton.click()
    return this
  }

  filterAllTasks() {
    mainPage.allTaskButton.click()
    return this
  }

  clearCompletedTasks() {
    mainPage.clearCompletedButton.click()
    return this
  }

  dragFirstTaskDown() {
    const secondTaskSelector: string = 'li[data-cy="todo"]:nth-child(2)'
    mainPage.taskByName('First task').drag(secondTaskSelector, {
      force: true,
      log: false,
    })
    return this
  }
}

export default new ToDoDsl()
