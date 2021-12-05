<template>
  <div class="demo-block">
    <div class="demo-block__content">
      <slot></slot>
    </div>
    <div class="demo-block__info" v-if="showInfo">
      <div class="demo-block__info--title" v-if="showTitle && showTitle.length > 0"  v-html="showTitle"></div>
      <div class="demo-block__info--description" v-if="showDesc && showDesc.length > 0" :class="{'demo-block__info--description__dashed':showDesc && showDesc.length > 0}" v-html="showDesc"></div>
      <div class="demo-block__actions" v-if="highlightCode.length > 0">
        <CodeSandbox class="demo-block__action" v-if="showCodeSandBox" />
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
  components: {
    FileCopy,
    CodeSandbox,
    UnExpand,
    Expand
  },
  props:{
    codeSandbox:{
      type:String,
      default:""
    },
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
    const highlightCode = computed(() => props.highlight ? decodeURIComponent(props.highlight):'');
    const changeShow = () => {
      showCode.value = !showCode.value
    }
    const showInfo = computed(()=>
        (highlightCode.value && highlightCode.value.length > 0)
        || (showDesc.value && showDesc.value.length > 0)
        || (showTitle.value && showTitle.value.length > 0)
    )
    const showTitle = computed(()=>props.title ? decodeURIComponent(props.title) : '');
    const showDesc = computed(()=>props.desc ? decodeURIComponent(props.desc) : '');
    const showCodeSandBox = computed(() => props.codeSandbox && props.codeSandbox.length > 0);
    const wrapperClass = computed(()=>{
      return{
      }
    })
    return{
      showTitle,
      showDesc,
      wrapperClass,
      highlightCode,
      showCode,
      showCodeSandBox,
      changeShow,
      showInfo
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
.demo-block div[class*='language-']{
  background: none;
}
.demo-block div[class~='language-vue']:before{
  content: "";
}

</style>
