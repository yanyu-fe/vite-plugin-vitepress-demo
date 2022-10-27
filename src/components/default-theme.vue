<template>
  <div>
    DEMO
    <component :is="demoComp" />
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted, shallowRef } from 'vue'
const props = defineProps<{ src: string }>()
const demoComp = shallowRef()
onMounted(async() => {
  const data = await import('virtual:vitepress-demo')
  const demos = data.default
  const demo = demos[props.src]
  if (demo && demo.comp)
    demoComp.value = defineAsyncComponent(demo.comp)
})
</script>
