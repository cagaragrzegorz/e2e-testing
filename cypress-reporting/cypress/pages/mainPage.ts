class MainPage {
  urlExtension = '/'

  //elements
  get title() {
    return cy.get('header h1')
  }

  get tasks() {
    return cy.get('li[data-cy="todo"]')
  }

  get completedTasks() {
    return cy.get('li[data-cy="todo"].checked')
  }

  get tasksInput() {
    return cy.get('input[data-cy="add-todo"]')
  }

  get activeTaskCount() {
    return cy.get('#items-left')
  }

  taskByName(text: string) {
    return cy.contains('li[data-cy="todo"]', text)
  }

  taskByIndex(index: number) {
    return cy.get('li[data-cy="todo"]').eq(index)
  }

  get activeTaskButton() {
    return cy.get('button#active')
  }

  get completedTaskButton() {
    return cy.get('button#completed')
  }

  get allTaskButton() {
    return cy.get('button#all')
  }

  get clearCompletedButton() {
    return cy.get('button#clear-completed')
  }

  // actions

  createTask(text: string) {
    this.tasksInput.type(text + '{enter}')
  }

  completeTask(text: string) {
    this.taskByName(text).find('input.cb-input').check()
  }
}
export default new MainPage()
