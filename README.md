# vite-plugin-vitepress-demo

A vite plugin for vitepress code block demo.




## Built-in component API

We built a vue-based demo component, which can be used in the vitepress.

We also support custom code block components, but the custom component must have the same API as the built-in component.


### Props


* src - demo source file path
* title - demo title
* desc - demo description
* raw - whether to show raw code
* link - preview link


### Slots

* title - demo title
* desc - demo description
* actions - custom action
