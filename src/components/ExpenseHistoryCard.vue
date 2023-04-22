<script setup lang="ts">
import { computed } from 'vue'
import type { Expense } from '@/types/expenses'

const props = defineProps<{
  expense: Expense
}>()

const date = computed(() => {
  const date = new Date(props.expense.date)
  // DD MM YYYY
  return date.toLocaleDateString()
})
</script>

<template>
  <div class="flex flex-row gap-x-4 items-center overflow-hidden">
    <div class="rounded-full h-12 w-12 shrink-0 p-3" :style="{ backgroundColor: expense.category?.color }">
      <!--suppress TypeScriptValidateTypes -->
      <component :is="expense.category?.icon" class="w-full h-full text-white" />
    </div>
    <div class="flex flex-col grow truncate">
      <p class="font-medium">
        {{ expense.category?.name }}
      </p>
      <p class="text-gray-500 truncate">
        {{ expense.description || '-' }}
      </p>
    </div>
    <div class="flex flex-col items-end shrink-0">
      <p class="text-red-500">
        -{{ expense.amount }} руб.
      </p>
      <p class="text-gray-500">
        {{ date }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
