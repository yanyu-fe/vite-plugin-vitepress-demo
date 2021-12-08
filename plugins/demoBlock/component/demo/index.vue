<template>
  <div class="demo-block">
    <div class="demo-block__content">
      <slot></slot>
    </div>
    <div class="demo-block__info" v-if="showInfo">
      <div class="demo-block__info--title" v-if="showTitle && showTitle.length > 0"  v-html="showTitle"></div>
      <div class="demo-block__info--description" v-if="showDesc && showDesc.length > 0" :class="{'demo-block__info--description__dashed':showDesc && showDesc.length > 0}" v-html="showDesc"></div>
      <div class="demo-block__actions" v-if="highlightCode.length > 0">
        <CodeSandbox class="demo-block__action" v-if="showCodeSandBox" @click="enterCodeSandBox" />
        <template v-if="isSupported">
          <FileCopy class="demo-block__action" v-if="!isCopied" @click="copyCodeData" />
          <FileSuccess class="demo-block__action" style="color: var(--c-brand)" v-else />
        </template>
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
import { defineComponent,computed,ref,onMounted } from "vue"
import Expand from "./icons/expand.vue";
import UnExpand from "./icons/UnExpand.vue";
import CodeSandbox from "./icons/CodeSandbox.vue";
import FileCopy from "./icons/FileCopy.vue";
import FileSuccess from "./icons/FileSuccess.vue";

export default defineComponent({
  components: {
    FileSuccess,
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
    const enterCodeSandBox = () => {
      if (window && 'open' in window){
        window.open(props.codeSandbox);
      }
    }
    const isCopied = ref(false);
    onMounted(()=>{
      if (navigator && 'clipboard' in navigator){
        isSupported.value = true;
      }
    })
    const isSupported = ref(false);
    // 判断当前环境支不支持赋值
    const copyCodeData = async () => {
      const formatCopyData = props.copyCode ? decodeURIComponent(props.copyCode) : null;
      // 复制代码
      if (isSupported.value && formatCopyData) {
        await navigator.clipboard.writeText(formatCopyData)
        isCopied.value = true
        const timer = setTimeout(()=>{
          isCopied.value = false;
          clearTimeout(timer);
        },1500)
      }
    }

    return{
      isSupported,
      copyCodeData,
      enterCodeSandBox,
      showTitle,
      showDesc,
      highlightCode,
      showCode,
      showCodeSandBox,
      changeShow,
      showInfo,
      isCopied
    }
  }
})
</script>

<style>
@import "./demo.css";
@import "./code.css";
.code-demo code{
  color: var(--c-code-text);
}
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
