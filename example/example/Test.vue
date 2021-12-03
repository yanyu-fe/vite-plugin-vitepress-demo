<template>
  <div>
    {{data}} 啊是打算打算大所
    <button @click="onChangeData">测试</button>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const data = ref(0);
const onChangeData = () => {
  data.value ++;
}
</script>

<style scoped>

</style>
