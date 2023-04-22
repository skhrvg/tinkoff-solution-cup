import type { Component } from 'vue'

export interface NewExpense {
  category?: ExpenseCategory
  categoryId: number
  amount: number
  date: string
  description: string
}

export interface Expense extends NewExpense {
  id: number
}

export interface ExpenseCategory {
  id: number
  name: string
  icon: Component
  color: string
  limit: number
}
