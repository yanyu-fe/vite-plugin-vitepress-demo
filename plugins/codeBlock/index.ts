import { Plugin } from "vite"
export interface CodeBlockOptions{
    include:string[]
}

export const codeBlock = ():Plugin => {
    return {
        name:"vitepress-plugin-code-block",
        enforce:"pre",
    }
}