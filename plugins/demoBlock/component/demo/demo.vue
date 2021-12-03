<template>
  <div class="demo-block">
    <div class="demo-block__content">
      <slot></slot>
    </div>
    <div class="demo-block__info">
      <div class="demo-block__info--title">{{ title }}</div>
      <div class="demo-block__info--description">
        {{desc}}
      </div>
      <div class="demo-block__actions">
        <CodeSandbox class="demo-block__action" />
        <FileCopy class="demo-block__action" />
        <Expand class="demo-block__action" v-if="!showCode" @click="changeShow" />
        <UnExpand class="demo-block__action" v-if="showCode" @click="changeShow"/>
      </div>
    </div>
    <transition name="fade">
      <div v-show="showCode" class="code-demo language-vue" v-html="highlightCode"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed,ref } from "vue"
import Expand from "./icons/expand.vue";
import UnExpand from "./icons/UnExpand.vue";
import CodeSandbox from "./icons/CodeSandbox.vue";
import FileCopy from "./icons/FileCopy.vue";

export default defineComponent({
  components: {FileCopy, CodeSandbox, UnExpand, Expand },
  props:{
    highlight:{
      type:String,
      default:""
    },
    copyCode:{
      type:String,
      default:""
    },
    desc:{
      type:String,
      default:""
    },
    title:{
      type:String,
      default:""
    }
  },
  setup(props){
    const showCode = ref(false);
    const highlightCode = computed(() => props.highlight ? decodeURIComponent(props.highlight):null);
    const changeShow = () => {
      showCode.value = !showCode.value
    }
    const wrapperClass = computed(()=>{
      return{
      }
    })
    return{
      wrapperClass,
      highlightCode,
      showCode,
      changeShow
    }
  }
})
</script>

<style>
@import "./demo.css";
@import "./code.css";
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  height: auto;
}
.fade-enter-from,
.fade-leave-to {
  height: auto;
}
.code-demo{
  overflow: auto;
}


</style>
