import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'
import type { Expense, ExpenseCategory, NewExpense } from '@/types/expenses'
import expenseCategories from '@/demoData/expenseCategories'
import demoData from '@/demoData/expenses.json'

export const useExpensesStore = defineStore('expenses', () => {
  const expenses: Ref<Expense[]> = useLocalStorage<Expense[]>('expenses', demoData as Expense[])

  const getExpenses = () => {
    return expenses.value.map(expense => ({
      ...expense,
      category: expenseCategories.find(category => category.id === expense.categoryId),
    })).sort((a, b) => {
      if (a.date > b.date)
        return -1
      if (a.date < b.date)
        return 1
      if (a.id > b.id)
        return -1
      if (a.id < b.id)
        return 1
      return 0
    })
  }

  const createExpense = (expense: NewExpense) => {
    expenses.value.push({
      ...expense,
      id: Date.now(),
    })
  }

  const deleteExpense = (id: number) => {
    const index = expenses.value.findIndex(expense => expense.id === id)
    expenses.value.splice(index, 1)
  }

  const getMostExpensiveCategoryThisMonth = (): { amount: number; category: ExpenseCategory | null } => {
    const expenses = getExpenses()
    const thisMonth = new Date().getMonth()
    const thisYear = new Date().getFullYear()
    const expensesThisMonth = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getMonth() === thisMonth && expenseDate.getFullYear() === thisYear
    })
    const categories: { category: ExpenseCategory; amount: number }[] = []
    for (const expense of expensesThisMonth) {
      const category = categories.find(category => category.category.id === expense.categoryId)
      if (!expense.category)
        continue
      if (category) {
        category.amount += expense.amount
      }
      else {
        categories.push({
          category: expense.category,
          amount: expense.amount,
        })
      }
    }
    if (categories.length === 0)
      return { amount: 0, category: null }
    const mostExpensiveCategory = categories.reduce((prev, current) => (prev.amount > current.amount) ? prev : current)
    return { amount: mostExpensiveCategory.amount, category: mostExpensiveCategory.category }
  }

  const getExpensesByCategory = (categoryId: number) => {
    return getExpenses().filter(expense => expense.categoryId === categoryId)
  }

  const getAmountByCategory = (categoryId: number) => {
    return getExpensesByCategory(categoryId).reduce((prev, current) => prev + current.amount, 0)
  }

  const getThisWeekExpenses = () => {
    const expenses = getExpenses()
    const today = new Date()
    const thisWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
    return expenses.filter(expense => new Date(expense.date) >= thisWeek)
  }

  return {
    createExpense,
    getExpenses,
    deleteExpense,
    getMostExpensiveCategoryThisMonth,
    getExpensesByCategory,
    getThisWeekExpenses,
    getAmountByCategory,
  }
})
