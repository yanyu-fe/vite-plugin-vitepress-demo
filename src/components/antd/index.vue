<template>
  <div class="demo-block">
    <div class="demo-block__content">
      <component :is="demoComp" />
    </div>
    <div v-if="showInfo" class="demo-block__info">
      <div v-if="showTitle && showTitle.length > 0" class="demo-block__info--title" v-html="showTitle" />
      <div v-if="showDesc && showDesc.length > 0" class="demo-block__info--description" :class="{'demo-block__info--description__dashed':showDesc && showDesc.length > 0}" v-html="showDesc" />
      <div v-if="highlightCode.length > 0" class="demo-block__actions">
        <template v-if="isSupported">
          <FileCopy v-if="!isCopied" class="demo-block__action" @click="copyCodeData" />
          <FileSuccess v-else class="demo-block__action" style="color: var(--vp-c-brand)" />
        </template>
        <Expand v-if="!showCode" class="demo-block__action" @click="changeShow" />
        <UnExpand v-if="showCode" class="demo-block__action" @click="changeShow" />
      </div>
    </div>
    <div v-if="showCode" class="code-demo" v-html="highlightCode" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted, ref, shallowRef } from 'vue'
import Expand from './icons/expand.vue'
import UnExpand from './icons/UnExpand.vue'
import FileCopy from './icons/FileCopy.vue'
import FileSuccess from './icons/FileSuccess.vue'

const props = defineProps<{ src: string; title: string; desc: string }>()
const demoComp = shallowRef()
const content = shallowRef<Record<string, any>>()
const decode = (str?: string) => {
  if (!str) return ''
  return decodeURIComponent(str)
}

const showTitle = computed(() => decode(content.value?.title || props.title))
const code = computed(() => decode(content.value?.code))
const highlightCode = computed(() => decode(content.value?.highlight))
const showDesc = computed(() => decode(content.value?.desc || props.desc))

const showCode = ref(false)
const changeShow = () => {
  showCode.value = !showCode.value
}

const isSupported = ref(false)
const isCopied = ref(false)
// 判断当前环境支不支持赋值
const copyCodeData = async() => {
  await navigator.clipboard.writeText(code.value)
  isCopied.value = true
  const timer = setTimeout(() => {
    isCopied.value = false
    clearTimeout(timer)
  }, 1500)
}

const showInfo = computed(() =>
  (highlightCode.value && highlightCode.value.length > 0)
    || (showDesc.value && showDesc.value.length > 0)
    || (showTitle.value && showTitle.value.length > 0),
)

onMounted(async() => {
  const data = await import('virtual:vitepress-demo')
  const demos = data.default
  const demo = demos[props.src]
  if (demo && demo.comp)
    demoComp.value = defineAsyncComponent(demo.comp)
  if (demo)
    content.value = demo
  if (navigator && 'clipboard' in navigator)
    isSupported.value = true
})
</script>

<style>
@import "./demo.css";
@import "./code.css";
.code-demo code{
  color: var(--vp-c-text-code);
}
</style>

<style scoped>
.demo-block{
  overflow: hidden;
}
.code-demo{
  overflow: auto;
  background-color: var(--vp-code-block-bg);
}
.demo-block div[class*='language-']{
  background: none;
  margin: 1rem 0;
}
.demo-block div[class~='language-vue']:before{
  content: "";
}

</style>
