import { test, expect, defineConfig, PlaywrightTestOptions } from '@playwright/test'
import PlaywrightConfig from '../../playwright.config'

test.describe('app has basic functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load application', { tag: '@basic' }, async ({ page }) => {
    expect(page.url()).toContain('https://todo-app-for-cyclope.netlify.app/')
    await expect(page.locator('header h1')).toHaveText('TODO')
  })

  test('should add task', { tag: '@basic' }, async ({ page }) => {
    await expect(page.getByTestId('todo')).toHaveCount(0)
    await page.getByTestId('add-todo').fill('First task')
    await page.getByTestId('add-todo').press('Enter')
    await expect(page.getByTestId('todo')).toHaveCount(1)
    await expect(page.locator('#items-left')).toHaveText('1')
  })

  test('should add multiple tasks', { tag: '@basic' }, async ({ page }) => {
    await expect(page.getByTestId('todo')).toHaveCount(0)
    const toDoInput = page.getByTestId('add-todo')
    await toDoInput.fill('First task')
    await toDoInput.press('Enter')
    await toDoInput.fill('Second task')
    await toDoInput.press('Enter')
    await toDoInput.fill('Third task')
    await toDoInput.press('Enter')
    await expect(page.getByTestId('todo')).toHaveCount(3)
    await expect(page.locator('#items-left')).toHaveText('3')
  })

  test('should complete tasks', { tag: '@basic' }, async ({ page }) => {
    await expect(page.getByTestId('todo')).toHaveCount(0)
    const toDoInput = page.getByTestId('add-todo')
    await toDoInput.fill('First task')
    await toDoInput.press('Enter')
    await toDoInput.fill('Second task')
    await toDoInput.press('Enter')
    await page.getByTestId('todo').filter({ hasText: 'First task' }).locator('input.cb-input').check()
    await expect(page.getByTestId('todo')).toHaveCount(2)
    await expect(page.locator('li[data-cy="todo"].checked')).toHaveCount(1)
    await expect(page.locator('#items-left')).toHaveText('1')
  })

  test('should display active tasks only', { tag: '@basic' }, async ({ page }) => {
    const toDoInput = page.getByTestId('add-todo')
    await toDoInput.fill('First task')
    await toDoInput.press('Enter')
    await toDoInput.fill('Second task')
    await toDoInput.press('Enter')
    await page.getByTestId('todo').filter({ hasText: 'First task' }).locator('input.cb-input').check()
    await page.getByRole('button', { name: 'Active' }).click()
    await expect(await page.getByTestId('todo').filter({ hasText: 'First task' })).toHaveCSS('opacity', '0')
    await expect(await page.getByTestId('todo').filter({ hasText: 'Second task' })).toHaveCSS('opacity', '1')
  })

  test('should display completed tasks only', { tag: '@basic' }, async ({ page }) => {
    const toDoInput = page.getByTestId('add-todo')
    await toDoInput.fill('First task')
    await toDoInput.press('Enter')
    await toDoInput.fill('Second task')
    await toDoInput.press('Enter')
    await page.getByTestId('todo').filter({ hasText: 'First task' }).locator('input.cb-input').check()
    await page.getByRole('button', { name: /^Completed/ }).click()
    await expect(await page.getByTestId('todo').filter({ hasText: 'First task' })).toHaveCSS('opacity', '1')
    await expect(await page.getByTestId('todo').filter({ hasText: 'Second task' })).toHaveCSS('opacity', '0')
  })

  test('should display all tasks only', { tag: '@basic' }, async ({ page }) => {
    const toDoInput = page.getByTestId('add-todo')
    await toDoInput.fill('First task')
    await toDoInput.press('Enter')
    await toDoInput.fill('Second task')
    await toDoInput.press('Enter')
    await page.getByTestId('todo').filter({ hasText: 'First task' }).locator('input.cb-input').check()
    await page.getByRole('button', { name: /^Completed/ }).click()
    await expect(await page.getByTestId('todo').filter({ hasText: 'First task' })).toHaveCSS('opacity', '1')
    await expect(await page.getByTestId('todo').filter({ hasText: 'Second task' })).toHaveCSS('opacity', '0')
    await page.getByRole('button', { name: 'All' }).click()
    await expect(await page.getByTestId('todo').filter({ hasText: 'First task' })).toHaveCSS('opacity', '1')
    await expect(await page.getByTestId('todo').filter({ hasText: 'Second task' })).toHaveCSS('opacity', '1')
  })

  test('should clear completed tasks', { tag: '@basic' }, async ({ page }) => {
    const toDoInput = page.getByTestId('add-todo')
    await toDoInput.fill('First task')
    await toDoInput.press('Enter')
    await toDoInput.fill('Second task')
    await toDoInput.press('Enter')
    await page.getByTestId('todo').filter({ hasText: 'First task' }).locator('input.cb-input').check()
    await page.getByRole('button', { name: 'Clear Completed' }).click()
    await expect(page.getByTestId('todo')).toHaveCount(1)
  })
})
