<template>
  <div>
    <component :is="demoComp" />
    <div v-html="highlight" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted, shallowRef } from 'vue'
const props = defineProps<{ src: string }>()
const demoComp = shallowRef()
const content = shallowRef<Record<string, any>>()
const decode = (str?: string) => {
  if (!str) return ''
  return decodeURIComponent(str)
}
const title = computed(() => decode(content.value?.title))
const code = computed(() => decode(content.value?.code))
const highlight = computed(() => decode(content.value?.highlight))
const desc = computed(() => decode(content.value?.desc))
onMounted(async() => {
  const data = await import('virtual:vitepress-demo')
  const demos = data.default
  const demo = demos[props.src]
  if (demo && demo.comp)
    demoComp.value = defineAsyncComponent(demo.comp)
  if (demo) {
    if (demo.comp)
      delete demo.comp

    content.value = demo
  }
})
</script>
