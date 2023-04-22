<script setup lang="ts">
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/vue/20/solid'
import { computed, ref } from 'vue'
import { useExpensesStore } from '@/stores/expenses'
import type { ExpenseCategory } from '@/types/expenses'
import expenseCategories from '@/utils/expenceCategories'
import router from '@/router'

const selectedCategory = ref<ExpenseCategory>(expenseCategories[0])
const description = ref('')
const amount = ref(0)
const date = ref(new Date().toISOString().split('T')[0])

const { createExpense } = useExpensesStore()

async function createNewExpense() {
  createExpense({
    categoryId: selectedCategory.value.id,
    description: description.value,
    amount: amount.value,
    date: date.value,
  })
  await router.push('/')
}

const createButtonDisabled = computed(() => {
  return !amount.value || !date.value
})

const categorySelectorRef = ref<HTMLSelectElement>()
</script>

<template>
  <div class="gap-y-6 grow flex flex-col">
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
          Добавить расход
        </h1>
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
          <p class="opacity-90 truncate">
            limit
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
          v-for="category in expenseCategories"
          :key="category.id"
          :value="category"
        >
          {{ category.name }}
        </option>
      </select>
    </section>
    <section class="flex flex-col gap-4">
      <label class="text-lg font-medium">
        Описание
      </label>
      <textarea
        v-model.trim="description"
        class="bg-gray-300 rounded-lg p-4 resize-none"
        rows="4"
        placeholder="Описание операции (необязательно)"
      />
    </section>
    <section class="flex flex-col gap-4">
      <label class="text-lg font-medium">
        Сумма
      </label>
      <input
        v-model.number="amount"
        class="bg-gray-300 rounded-lg p-4"
        type="number"
        placeholder="Сумма операции"
      >
    </section>
    <section class="flex flex-col gap-4">
      <label class="text-lg font-medium">
        Дата
      </label>
      <input
        v-model="date"
        class="bg-gray-300 rounded-lg p-4 w-full"
        type="date"
        placeholder="Дата операции"
      >
    </section>
    <div class="grow" />
    <section class="flex flex-row gap-4">
      <button
        :disabled="createButtonDisabled"
        class="bg-black rounded-full p-4 text-white w-full"
        @click="createNewExpense()"
      >
        Добавить
      </button>
    </section>
  </div>
</template>

<style scoped>

</style>
