import { parser,NodeTag } from "posthtml-parser"
import { render } from "posthtml-render"
import { dirname,join } from "path"
import { readFileSync,existsSync } from "fs"
import {highlight as highlightCode} from "./highlight"
// 定义全局的参数
let scripts = [];

// 处理代码结构
export const transformCode = (id:string,code:string) => {
    scripts = [];
    const pat = /<demo.*?>.*?<.*?\/demo>/sg
    const data = code.match(pat);
    if (data && data.length > 0){
        // 这里需要处理一下数据
        data.forEach(v=>{
           code = code.replace(v, transformBlockCode(id,v));
        })
    }
    if (scripts.length > 0){
        const headerStr = `<script setup>${scripts.join('\n')}</script>\n`;
        code =  headerStr + code;
    }
    return code;
}

// 正常生成数据
const chunkAttrs = (id:string,code:string) => {
    // 开始获取
    const parserCode = parser(code);
    if (parserCode.length < 1) return code;
    parserCode.forEach((code:NodeTag) => {
        if (code.tag === 'demo'){
            const attrs = code.attrs;
            if (attrs && attrs.src){
                const componentName = `demoComponent${scripts.length + 1}`;
                const importStr = `import ${componentName} from "${attrs.src}"`;
                scripts.push(importStr);
                const sourceCode = srcCode(id,attrs.src as string);
                const { highlight,copyCode } = chunkCode(sourceCode);
                // 处理src中的数据
                delete attrs.src;
                attrs.highlight = highlight;
                attrs.copyCode = copyCode;
                // 处理content中的数据
                const tag:NodeTag = {
                    tag:componentName
                }
                if (code.content && code.content instanceof Array){
                    code.content.push(tag);
                }else if (typeof code.content === 'string' || typeof code.content === 'number'){
                    const nextData = code.content;
                    code.content = [];
                    code.content.push(nextData);
                    code.content.push(tag);
                }else {
                    code.content = [];
                    code.content.push(tag);
                }
            }
        }
    })
    return render(parserCode);
}

// 正常返回数据
const chunkCode = (source:string) => {
    // 返回数据
    return{
        highlight: encodeURIComponent(highlightCode(source,'vue')),
        copyCode: encodeURIComponent(source)
    }
}


const srcCode = (id:string,src:string) => {
    const dir = dirname(id);
    const filePath = join(dir,src);
    if (existsSync(filePath)){
        return readFileSync(filePath,{encoding:'utf-8'})
    }else {
        console.warn("not exists:" + src);
    }

}

// 处理已经拿到的数据
const transformBlockCode = (id:string,code:string):string => {
    return chunkAttrs(id,code);
}
