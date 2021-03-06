import { Plugin, HmrContext } from "vite"
import { FilterPattern,createFilter } from "@rollup/pluginutils"
import { transformCode } from "./transformCode"
import { hotUpdate } from "./hotUpdate";

export interface CodeBlockOptions{
    include?:FilterPattern
    exclude?:FilterPattern
    wrapper?:String
    transform?:(code:string,id:string) => string
}

export const vitePluginVitepressDemo = (options:CodeBlockOptions = {}):Plugin => {
    return {
        name:"vite-plugin-vitepress-demo",
        enforce:"pre",
        config:() => ({
            optimizeDeps:{
                exclude:['vite-plugin-vitepress-demo']
            }
        }),
        transform(code: string, id: string) {
            const include = options.include || /\.md$/;
            const exclude = options.exclude;
            const filter = createFilter(include,exclude);
            if (filter(id)){
                if (options.transform){
                    return options.transform(code,id);
                }
                return transformCode(id,code);
            }
            return code;
        },
        handleHotUpdate(ctx: HmrContext) {
            hotUpdate(ctx);
        }
    }
}
