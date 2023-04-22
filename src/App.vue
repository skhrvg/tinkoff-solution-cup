<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue'

const route = useRoute()

const pending = ref(false)

const layout = computed(() => {
  const layout = route.meta.layout
  if (layout)
    return layout
  return MainLayout
})
</script>

<template>
  <Component :is="layout">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Suspense @pending="pending = true" @resolve="pending = false" @fallback="pending = false">
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback>
            <div class="w-screen h-screen flex flex-col items-center justify-center">
              <h1 class="font-bold text-2xl">
                Loading...
              </h1>
            </div>
          </template>
        </Suspense>
      </template>
    </RouterView>
  </Component>
</template>

<style scoped>

</style>
