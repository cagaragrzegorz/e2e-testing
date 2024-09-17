import ToDoDsl from '../../dsl/toDoDsl'
import toDoDsl from '../../dsl/toDoDsl'
import {
  checkHowManyTaskAreInToDo,
  checkIfCompletedTasksEqualsTo,
  checkIfTaskCounterEqualsTo,
  checkIfTaskHasIndex,
  checkIfTaskIsNotVisible,
  checkIfTaskIsVisible,
  checkIfTitleIsDisplayed,
  checkIfUserLandsOnProperUrl,
} from '../assertions/common'

describe('app has basic functionality', () => {
  let dsl: typeof ToDoDsl

  beforeEach(() => {
    dsl = toDoDsl.openToDoApp()
  })

  it('should load application', () => {
    dsl.verify([
      checkIfUserLandsOnProperUrl(Cypress.config('baseUrl')),
      checkIfTitleIsDisplayed,
    ])
  })

  it('should add task', () => {
    dsl
      .verify(checkHowManyTaskAreInToDo(0))
      .createTask('First task')
      .verify([
        checkHowManyTaskAreInToDo(1),
        checkIfTaskCounterEqualsTo(1),
      ])
  })

  it('should add multiple tasks', () => {
    dsl
      .verify(checkHowManyTaskAreInToDo(0))
      .createTasks(['First task', 'Second task', 'Third task'])
      .verify([
        checkHowManyTaskAreInToDo(3),
        checkIfTaskCounterEqualsTo(3),
      ])
  })

  it('should complete tasks', () => {
    dsl
      .createTasks(['First task', 'Second task'])
      .completeTask('First task')
      .verify([
        checkHowManyTaskAreInToDo(2),
        checkIfCompletedTasksEqualsTo(1),
        checkIfTaskCounterEqualsTo(1),
      ])
  })

  it('should display active tasks only', () => {
    dsl
      .createTasks(['First task', 'Second task'])
      .completeTask('First task')
      .filterActiveTasks()
      .verify([
        checkIfTaskIsVisible('Second task'),
        checkIfTaskIsNotVisible('First task'),
      ])
  })

  it('should display completed tasks only', () => {
    dsl
      .createTasks(['First task', 'Second task'])
      .completeTask('First task')
      .filterCompletedTasks()
      .verify([
        checkIfTaskIsNotVisible('Second task'),
        checkIfTaskIsVisible('First task'),
      ])
  })

  it('should display all tasks only', () => {
    dsl
      .createTasks(['First task', 'Second task'])
      .completeTask('First task')
      .filterCompletedTasks()
      .verify([
        checkIfTaskIsNotVisible('Second task'),
        checkIfTaskIsVisible('First task'),
      ])
      .filterAllTasks()
      .verify([
        checkIfTaskIsVisible('Second task'),
        checkIfTaskIsVisible('First task'),
      ])
  })

  it('should clear completed tasks', () => {
    dsl
      .createTasks(['First task', 'Second task'])
      .completeTask('First task')
      .clearCompletedTasks()
      .verify([checkHowManyTaskAreInToDo(1)])
  })

  it('should allow drag and drop of tasks', () => {
    dsl
      .createTasks(['First task', 'Second task'])
      .completeTask('First task')
      .dragFirstTaskDown()
      .verify([
        checkIfTaskHasIndex('Second task', 0),
        checkIfTaskHasIndex('First task', 1),
      ])
  })
})
