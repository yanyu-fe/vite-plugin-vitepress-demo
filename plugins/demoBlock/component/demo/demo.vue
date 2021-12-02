<template>
  <div>
    <slot></slot>
    <div v-if="highlightCode" class="code" v-html="highlightCode"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from "vue"

export default defineComponent({
  props:{
    highlight:{
      type:String,
      default:""
    },
    copyCode:{
      type:String,
      default:""
    }
  },
  setup(props){
    const highlightCode = computed(()=>props.highlight ?decodeURIComponent(props.highlight):null);
    return{
      highlightCode
    }
  }
})
</script>

<style scoped>

</style>
