<script setup lang="ts">
import { useExpensesStore } from '@/stores/expenses'

const { getThisWeekExpenses } = useExpensesStore()

const expenses = getThisWeekExpenses()

const amountsByWeekDay = [0, 0, 0, 0, 0, 0, 0]
expenses.forEach((expense) => {
  const date = new Date(expense.date)
  const weekDay = date.getDay()
  amountsByWeekDay[weekDay] += expense.amount
})
const maxAmount = Math.max(...amountsByWeekDay)
const amountsByWeekDayPercent = amountsByWeekDay.map(amount => amount / maxAmount * 100)

const weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
</script>

<template>
  <div class="chart gap-x-2 gap-y-1 text-sm">
    <div
      v-for="(amount, index) in amountsByWeekDayPercent"
      :key="index"
      class="h-32 flex flex-col-reverse"
    >
      <div
        :style="{ height: amount ? `${amount}%` : '2px' }"
        class="bg-black rounded-md"
      />
    </div>
    <p
      v-for="(weekDayName, index) in weekDayNames"
      :key="index"
      class="text-center"
    >
      {{ weekDayName }}
    </p>
  </div>
</template>

<style scoped>
.chart {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr min-content;
  grid-template-areas:
    ". . . . . . ."
    ". . . . . . .";
}
</style>
