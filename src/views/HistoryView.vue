<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDownIcon, ChevronLeftIcon, RectangleGroupIcon } from '@heroicons/vue/20/solid'
import { useExpensesStore } from '@/stores/expenses'
import ExpenseHistoryCard from '@/components/ExpenseHistoryCard.vue'
import expenseCategories from '@/utils/expenseCategories'
import type { ExpenseCategory } from '@/types/expenses'

const { getExpenses } = useExpensesStore()

const expenses = getExpenses()

const dateFrom = ref<string>(`${new Date().toISOString().slice(0, 7)}-01`)
const dateTo = ref(new Date().toISOString().split('T')[0])

const categories: ExpenseCategory[] = [
  {
    id: -1,
    name: 'Не выбрано',
    icon: RectangleGroupIcon,
    color: '#000000',
    limit: 0,
  },
  ...expenseCategories,
]
const selectedCategory = ref(categories[0])
const categorySelectorRef = ref<HTMLSelectElement>()

const filteredExpenses = computed(() => {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate >= new Date(dateFrom.value)
      && expenseDate <= new Date(dateTo.value)
      && (selectedCategory.value.id === -1 || expense.categoryId === selectedCategory.value.id)
  })
})
</script>

<template>
  <div class="space-y-6">
    <section class="flex flex-row items-center justify-between gap-4">
      <div>
        <RouterLink
          to="/"
          class="bg-gray-300 rounded-full pl-4 pr-6 py-3 gap-2 flex flex-row items-center w-min whitespace-nowrap font-medium"
        >
          <ChevronLeftIcon class="w-6 h-6" />
          <span>Назад</span>
        </RouterLink>
      </div>
      <div>
        <h1 class="text-xl font-bold">
          История
        </h1>
      </div>
    </section>
    <section class="grid grid-cols-2 gap-4 items-center">
      <div class="flex flex-col">
        <label class="text-lg font-medium">
          С
        </label>
        <input
          v-model="dateFrom"
          type="date"
          class="rounded-lg bg-gray-300 p-4 w-full"
        >
      </div>
      <div class="flex flex-col">
        <label class="text-lg font-medium">
          По
        </label>
        <input
          v-model="dateTo"
          type="date"
          class="rounded-lg bg-gray-300 p-4 w-full"
        >
      </div>
    </section>
    <section class="flex flex-col gap-4 relative">
      <label class="text-lg font-medium">
        Категория
      </label>
      <div
        class="rounded-lg bg-gray-300 flex flex-row p-4 items-center gap-4"
        :style="{ backgroundColor: selectedCategory.color }"
      >
        <div class="rounded-full h-12 w-12 bg-white/90 p-2">
          <!--suppress TypeScriptValidateTypes -->
          <component
            :is="selectedCategory.icon"
            class="w-full h-full"
            :style="{ color: selectedCategory.color }"
          />
        </div>
        <div class="flex flex-col grow truncate text-white">
          <p class="font-medium">
            {{ selectedCategory.name }}
          </p>
        </div>
        <ChevronDownIcon class="w-8 h-8 text-white" />
      </div>
      <select
        ref="categorySelectorRef"
        v-model="selectedCategory"
        class="opacity-0 absolute top-0 left-0 w-full h-full"
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category"
        >
          {{ category.name }}
        </option>
      </select>
    </section>
    <section class="gap-4 grid grid-cols-1">
      <ExpenseHistoryCard
        v-for="expense in filteredExpenses"
        :key="expense.id"
        :expense="expense"
      />
    </section>
  </div>
</template>
