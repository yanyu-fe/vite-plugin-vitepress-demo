import { Plugin, HmrContext } from "vite"
import { FilterPattern,createFilter } from "@rollup/pluginutils"
import { transformCode } from "./transformCode"

export interface CodeBlockOptions{
    include?:FilterPattern
    exclude?:FilterPattern
}

export const vitepressPluginDemoBlock = (options:CodeBlockOptions = {}):Plugin => {
    return {
        name:"vitepress-plugin-demo-block",
        enforce:"pre",
        transform(code: string, id: string) {
            const include = options.include || /\.md$/;
            const exclude = options.exclude;
            const filter = createFilter(include,exclude);
            if (filter(id)){
                return transformCode(id,code);
            }
            return code;
        },
        handleHotUpdate(ctx: HmrContext) {
        }
    }
}
