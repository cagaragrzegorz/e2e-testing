describe('app has basic functionality', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('should load application', () => {

        cy.url().should('contain', Cypress.config('baseUrl'))
        cy.get('header h1').should('have.text', 'TODO')
    })

    it('should add task', () => {
        cy.get('li[data-cy="todo"]').should('not.exist')
        cy.get('input[data-cy="add-todo"]').type('First task{enter}')
        cy.get('li[data-cy="todo"]').should('have.length', 1)
        cy.get('#items-left').should('have.text', '1')
    })

    it('should add multiple tasks', () => {
        cy.get('li[data-cy="todo"]').should('not.exist')
        cy.get('input[data-cy="add-todo"]').type('First task{enter}')
        cy.get('input[data-cy="add-todo"]').type('Second task{enter}')
        cy.get('input[data-cy="add-todo"]').type('Third task{enter}')
        cy.get('li[data-cy="todo"]').should('have.length', 3)
        cy.get('#items-left').should('have.text', '3')
    })

    it('should complete tasks', () => {
        cy.get('input[data-cy="add-todo"]').type('First task{enter}')
        cy.get('input[data-cy="add-todo"]').type('Second task{enter}')
        cy.contains('li[data-cy="todo"]', 'First task').find('input.cb-input').check()
        cy.get('li[data-cy="todo"]').should('have.length', 2)
        cy.get('li[data-cy="todo"].checked').should('have.length', 1)
        cy.get('#items-left').should('have.text', '1')
    })

    it('should display active tasks only', () => {
        cy.get('input[data-cy="add-todo"]').type('First task{enter}')
        cy.get('input[data-cy="add-todo"]').type('Second task{enter}')
        cy.contains('li[data-cy="todo"]', 'First task').find('input.cb-input').check()
        cy.get('button#active').click()
        cy.contains('li[data-cy="todo"]', 'First task').should('have.css', 'opacity', '0')
        cy.contains('li[data-cy="todo"]', 'Second task').should('have.css', 'opacity', '1')
    })

    it('should display completed tasks only', () => {
        cy.get('input[data-cy="add-todo"]').type('First task{enter}')
        cy.get('input[data-cy="add-todo"]').type('Second task{enter}')
        cy.contains('li[data-cy="todo"]', 'First task').find('input.cb-input').check()
        cy.get('button#completed').click()
        cy.contains('li[data-cy="todo"]', 'First task').should('have.css', 'opacity', '1')
        cy.contains('li[data-cy="todo"]', 'Second task').should('css', 'opacity', '0')
    })

    it('should display all tasks only', () => {
        cy.get('input[data-cy="add-todo"]').type('First task{enter}')
        cy.get('input[data-cy="add-todo"]').type('Second task{enter}')
        cy.contains('li[data-cy="todo"]', 'First task').find('input.cb-input').check()
        cy.get('button#completed').click()
        cy.contains('li[data-cy="todo"]', 'First task').should('have.css', 'opacity', '1')
        cy.contains('li[data-cy="todo"]', 'Second task').should('css', 'opacity', '0')
        cy.get('button#all').click()
        cy.contains('li[data-cy="todo"]', 'First task').should('have.css', 'opacity', '1')
        cy.contains('li[data-cy="todo"]', 'Second task').should('css', 'opacity', '1')
    })

    it('should clear completed tasks', () => {
        cy.get('input[data-cy="add-todo"]').type('First task{enter}')
        cy.get('input[data-cy="add-todo"]').type('Second task{enter}')
        cy.contains('li[data-cy="todo"]', 'First task').find('input.cb-input').check()
        cy.get('button#clear-completed').click()
        cy.get('li[data-cy="todo"]').should('have.length', 1)
    })

    it('should allow drag and drop of tasks', () => {
        cy.get('input[data-cy="add-todo"]').type('First task{enter}')
        cy.get('input[data-cy="add-todo"]').type('Second task{enter}')
        cy.contains('li[data-cy="todo"]', 'First task').drag('li[data-cy="todo"]:nth-child(2)', {
            force: true,
            log: false,
        })
        cy.get('li[data-cy="todo"]').eq(0).should('have.text', 'Second task')
        cy.get('li[data-cy="todo"]').eq(1).should('have.text', 'First task')

    })

})
