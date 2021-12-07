<template>
  <div>
    {{counter}}
    <button @click="add">add</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const counter = ref(0);
const add = () => {
  counter.value ++;
}
</script>
