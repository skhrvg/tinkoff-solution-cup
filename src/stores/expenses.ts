import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'
import type { Expense, NewExpense } from '@/types/expenses'
import categories from '@/utils/expenceCategories'

export const useExpensesStore = defineStore('expenses', () => {
  const expenses: Ref<Expense[]> = useLocalStorage<Expense[]>('expenses', [
    {
      id: 1,
      categoryId: 1,
      amount: 1000,
      date: '2021-01-01',
      description: 'Покупка продуктов в магазине',
    },
    {
      id: 2,
      categoryId: 1,
      amount: 2000,
      date: '2021-01-02',
      description: 'Покупка продуктов в магазине',
    },
    {
      id: 3,
      categoryId: 2,
      amount: 500,
      date: '2021-01-03',
      description: 'Поездка на такси',
    },
  ] as Expense[])

  const getExpenses = () => {
    return expenses.value.map(expense => ({
      ...expense,
      category: categories.find(category => category.id === expense.categoryId),
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

  return { expenses, createExpense, getExpenses, deleteExpense }
})
