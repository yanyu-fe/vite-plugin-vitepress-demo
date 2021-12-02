import { Plugin, HmrContext } from "vite"
import { FilterPattern,createFilter } from "@rollup/pluginutils"
import { transformCode } from "./transformCode"
import {readFileSync} from "fs";

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
            const { file , modules} = ctx;
            // console.log(modules);
            modules.forEach(module => {
                if (module.file === file){
                    // 进来
                    module.importers.forEach(newModule => {
                        const content = readFileSync(newModule.file,{encoding:'utf-8'});
                        const myCode = this.transform(content,newModule.id);
                        console.log(myCode);
                    })
                }
            })
        }
    }
}
