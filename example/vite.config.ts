import { defineConfig } from "vite"
import { vitepressPluginDemoBlock } from "../dist/index.esm";

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
