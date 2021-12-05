# vite-plugin-vitepress-demo

基于`vitepress`实现的自定义代码块的功能

## 安装

```shell
yarn add vite-plugin-vitepress-demo
# or
npm i vite-plugin-vitepress-demo
```

## 使用

创建`.vitepress`在`config.ts`中引入

```ts
// config.ts

import { defineConfig } from "vitepress"
import { vitePluginVitepressDemo } from "vite-plugin-vitepress-demo"
export default defineConfig({
    vite:{
        plugins:[
            vitePluginVitepressDemo()
        ]
    }
})
```

创建`.vitepress/theme/index.ts`中使用代码块

```ts
// theme/index.ts
import ThemeDefault from "vitepress/dist/client/theme-default"
import { Theme } from "vitepress";
import DemoBlock from "vite-plugin-vitepress-demo/dist/demo/index.vue";

export default {
    ...ThemeDefault,
    enhanceApp:({app}) => {
        app.component('demo',DemoBlock);
    }
} as Theme
```

## 使用代码块

```markdown

引入代码块：

<demo src="./example/Test.vue"></demo>

增加标题

<demo src="./example/Test.vue" title="标题"></demo>

增加描述
<demo src="./example/Test.vue" title="标题">
<desc>
增加代码描述
    ```js
    console.log('desc')
    ```
</desc>
</demo>

增加`codeSandbox`

<demo codeSandbox="https://codesandbox.io/" src="./example/Test.vue" title="测试" desc="描述信息`codeSandbox`"></demo>
```

