import { defineConfig,ModuleNode } from "vite"
import { vitepressPluginDemoBlock } from "../plugins/demoBlock";

export default defineConfig({
    server:{
        port:9989,
        fs:{
            strict:false
        }
    },
    plugins:[
        vitepressPluginDemoBlock()
    ]
})
