import { defineConfig } from "vite"

export default defineConfig({
    server:{
        port:9989,
        fs:{
            strict:false
        }
    }
})