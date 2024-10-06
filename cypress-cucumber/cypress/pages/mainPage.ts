class MainPage {
  urlExtension = '/'

  //elements
  get title() {
    return cy.get('header h1')
  }

  get tasks() {
    return cy.get('li[data-cy="todo"]')
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
}
export default new MainPage()
