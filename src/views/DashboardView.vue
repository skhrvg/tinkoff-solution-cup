<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { useExpensesStore } from '@/stores/expenses'
import ExpenseHistoryCard from '@/components/ExpenseHistoryCard.vue'
import WeekBarChart from '@/components/WeekBarChart.vue'

const { getThisWeekExpenses } = useExpensesStore()

const expenses = getThisWeekExpenses()
</script>

<template>
  <div class="space-y-6">
    <section class="bg-gray-100 p-4 rounded-lg gap-4 flex flex-col">
      <h1 class="text-2xl font-bold">
        {{ new Date().toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' }) }}
      </h1>
      <WeekBarChart />
      <RouterLink
        to="/new"
        class="bg-black rounded-full px-6 py-4 text-white w-full font-medium text-center"
      >
        Добавить расход
      </RouterLink>
    </section>
    <section class="flex flex-col gap-4">
      <RouterLink
        to="/history"
        class="text-2xl font-bold flex items-center justify-between"
      >
        Расходы
        <ChevronRightIcon class="w-8 h-8" />
      </RouterLink>
      <div class="gap-4 grid grid-cols-1">
        <ExpenseHistoryCard
          v-for="expense in expenses"
          :key="expense.id"
          :expense="expense"
        />
        <p
          v-if="expenses.length === 0"
          class="text-gray-500 text-center"
        >
          Нет расходов за эту неделю
        </p>
      </div>
    </section>
  </div>
</template>
