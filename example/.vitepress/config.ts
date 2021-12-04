import { defineConfig } from "vitepress"
export default defineConfig({
    title:"test",
    themeConfig:{
        nav:[
            {
                text: "介绍",
                link: "/",
            },
            {
                text: "编码规范",
                link: "/index2",
            },
        ]
    }
})
