<script setup lang="ts">
import hehegege from '@/assets/hehegege.gif?url'

await new Promise(resolve => setTimeout(resolve, 2000))
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center gap-4">
    <img :src="hehegege">
    <h1 class="font-bold text-2xl">
      Top level await test
    </h1>
    <p>
      This text will be shown after 2 seconds
    </p>
  </div>
</template>
