import defaultTheme from "vitepress/dist/client/theme-default"
import { EnhanceAppContext,Theme } from "vitepress";
import CodeBlock from "../../../dist/demo/index.vue"

const themeConfig: Theme = {
    ...defaultTheme,
    enhanceApp(ctx:EnhanceAppContext){
        const { app } = ctx;
        app.component('demo',CodeBlock);
    }
}

export default themeConfig;
