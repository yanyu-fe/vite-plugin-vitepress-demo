# vite-plugin-vitepress-demo

一个基于vite的插件，用于vitepress的演示代码块。




## 内置组件API

我们内置了一个vue组件，可以在vitepress中使用。

我们也支持自定义代码块组件，但是自定义组件必须和内置组件具有相同的API。


### Props


* src - 演示源文件路径
* title - 演示标题
* desc - 演示描述
* raw - 是否使用原始代码模式渲染
* link - 预览链接


### Slots

* title - 标题插槽
* desc - 描述插槽
* actions - 自定义操作插槽
