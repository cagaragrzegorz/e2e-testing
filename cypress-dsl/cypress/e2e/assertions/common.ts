import mainPage from '../../pages/mainPage'

export const checkIfUserLandsOnProperUrl = (url: string) => () => {
  cy.url().should('contain', url)
}

export const checkIfTitleIsDisplayed = () => {
  mainPage.title.should('have.text', 'TODO')
}

export const checkHowManyTaskAreInToDo = (count: number) => () => {
  if (count === 0) {
    mainPage.tasks.should('not.exist')
  } else {
    mainPage.tasks.should('have.length', count)
  }
}

export const checkIfTaskCounterEqualsTo = (count: number) => () => {
  mainPage.activeTaskCount.should('have.text', count.toString())
}

export const checkIfCompletedTasksEqualsTo = (count: number) => () => {
  mainPage.activeTaskCount.should('have.text', count.toString())
}

export const checkIfTaskIsVisible = (text: string) => () => {
  mainPage.taskByName(text).should('have.css', 'opacity', '1')
}

export const checkIfTaskIsNotVisible = (text: string) => () => {
  mainPage.taskByName(text).should('have.css', 'opacity', '0')
}

export const checkIfTaskHasIndex = (text: string, index: number) => () => {
  mainPage.taskByIndex(index).should('have.text', text)
}
