# vite-plugin-vitepress-demo

一个基于vite的插件，用于vitepress的演示代码块。

[English](./README.md) | 简体中文


## 安装

```shell
npm i vite-plugin-vitepress-demo -D

```


## 插件配置

当前包是一个`Pure ESM`包，确保当前项目中的`package.json`中包含`"type": "module"`。


在`vite.config.[jt]s`中做如下配置：

```ts
import { defineConfig } from 'vite'
import VitePluginVitepressDemo from 'vite-plugin-vitepress-demo'

export default defineConfig({
  plugins: [
    VitePluginVitepressDemo(),
  ],
})
```

### 插件属性

* glob: string | string[]

  指定需要处理的文件，支持glob语法，默认为`./**/demos/*.vue`。

* base: string

  指定从哪个文件夹进行监听，默认同`vite`配置的`root`。

* exclude: string[]

  指定需要排除的文件，支持glob语法，内置：`['**/node_modules/**', '**/dist/**', '**/build/**', '**/test/**', '**/tests/**', '**/__tests__/**']`默认会排除`.vitepress`。如果你不想排除`.vitepress`那么你可以设置`exclude:[]`。

* markdown: 同`vitepress`配置的`markdown`。

### 实验性

目前对于`jsx`的支持还处于实验阶段，可能会有一些不稳定的地方，如果你发现了bug，欢迎提issue。

## 组件配置

在2.x版本中，我们支持了自定义组件，但是自定义组件必须和内置组件具有相同的API。

如若我们的自带的主题满足不了你们的需求，那么你可以参考我们的[默认主题](https://github.com/yanyu-fe/vite-plugin-vitepress-demo/tree/main/src/components)自定义自己的主题。

同时也欢迎大家提交PR，让我们的主题更加完善。

### 导入组件

在.vitepress/theme/index.[jt]s中导入组件：

```ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { AntdTheme } from 'vite-plugin-vitepress-demo/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', AntdTheme)
  },
} as Theme

```


### 在markdown中使用

```md
<demo src="./demos/basic.vue" title="标题" desc="描述"></demo>
```

### 源码模式

```md
<demo src="./demos/basic.vue" raw></demo>
```


### 使用描述使用markdown渲染

在`demos/basic.vue`中：


```vue
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

```


在`markdown`中：

```md
<demo src="./demos/docs.vue"></demo>
```
