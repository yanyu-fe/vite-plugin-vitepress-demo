import { defineConfig } from "vite"
export default defineConfig({
    build:{
        lib:{
            entry:"plugins/demoBlock/component/demo/index.ts",
            name:"demoBlock"
        },
        outDir:"dist/demo"
    }
})
