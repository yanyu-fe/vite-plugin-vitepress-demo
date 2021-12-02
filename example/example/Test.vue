<template>
  <div>
    s啊实打实寒假暑假
    {{ data }}
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
