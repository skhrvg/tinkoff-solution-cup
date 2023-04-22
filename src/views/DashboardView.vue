<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { useExpensesStore } from '@/stores/expenses'
import ExpenseHistoryCard from '@/components/ExpenseHistoryCard.vue'
import CategoryLimitCard from '@/components/CategoryLimitCard.vue'

const { getExpenses } = useExpensesStore()

const expenses = getExpenses()
</script>

<template>
  <div class="space-y-6">
    <section class="bg-gray-100 p-4 rounded-lg gap-4 flex flex-col">
      <h1 class="text-2xl font-bold">
        Привет, username!
      </h1>
      <div class="bg-gray-300 rounded-lg h-32" />
      <RouterLink
        to="/new"
        class="bg-black rounded-full px-6 py-4 text-white w-full font-medium text-center"
      >
        Добавить расход
      </RouterLink>
    </section>
    <section class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold flex items-center justify-between">
        Лимиты и Цели
        <ChevronRightIcon class="w-8 h-8" />
      </h1>
      <div class="flex gap-4 overflow-y-hidden overflow-x-auto -mx-6 px-6">
        <CategoryLimitCard />
        <CategoryLimitCard />
        <CategoryLimitCard />
      </div>
    </section>
    <section class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold flex items-center justify-between">
        Последние расходы
        <ChevronRightIcon class="w-8 h-8" />
      </h1>
      <div class="gap-4 grid grid-cols-1">
        <ExpenseHistoryCard
          v-for="expense in expenses"
          :key="expense.id"
          :expense="expense"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>
