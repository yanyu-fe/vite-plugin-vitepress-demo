<docs>
---
title: Test Title
---

Hello World This is Test Docs block code in `docs.vue`.

</docs>

<template>
  <div>
    {{ msg }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const msg = ref('Hello World')
</script>
