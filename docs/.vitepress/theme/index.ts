import defaultTheme from "vitepress/dist/client/theme-default"
import { EnhanceAppContext,Theme } from "vitepress";
import CodeBlock from "../../../plugins/demoBlock/component/demo"

const themeConfig: Theme = {
    ...defaultTheme,
    enhanceApp(ctx:EnhanceAppContext){
        const { app } = ctx;
        app.use(CodeBlock)
    }
}

export default themeConfig;
