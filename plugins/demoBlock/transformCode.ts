import {parser, NodeTag, Content,Node} from "posthtml-parser"
import { render } from "posthtml-render"
import { dirname,join,extname } from "path"
import { readFileSync,existsSync } from "fs"
import { highlight as highlightCode } from "./highlight"
import { MarkdownFormat, MarkdownFormatInline } from "./markdownFormat";
// 定义全局的参数
let scripts = [];
let myWrapper = 'demo';
// 处理代码结构
export const transformCode = (id:string,code:string,wrapper:string = 'demo') => {
    scripts = [];
    myWrapper = wrapper;
    const pat = new RegExp(`<${wrapper}.*?>.*?<.*?\/${wrapper}>`,'sg')
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
    let myCodeSource;
    parserCode.forEach((code:NodeTag) => {
        if (code.tag === myWrapper){
            const attrs = code.attrs;
            // 判断当前是不是vue文件，如果不是vue文件，就不走当前的处理方式
            if (attrs && attrs.src){
                if ((attrs.src as string).endsWith('.vue') && typeof attrs.raw === 'undefined'){
                    // 处理vue文件
                    const componentName = `demoComponent${scripts.length + 1}`;
                    const importStr = `import ${componentName} from "${attrs.src}"`;
                    scripts.push(importStr);
                    const sourceCode = srcCode(id,attrs.src as string);
                    if (!sourceCode) return '';
                    const { highlight,copyCode } = chunkCode(sourceCode);
                    // 处理src中的数据
                    delete attrs.src;
                    attrs.highlight = highlight;
                    attrs.copyCode = copyCode;
                    if (attrs.desc && typeof attrs.desc === 'string'){
                        // 存在就处理一下
                        attrs.desc = MarkdownFormatInline(attrs.desc);
                    }
                    if (attrs.title && typeof attrs.title === 'string'){
                        attrs.title = MarkdownFormatInline(attrs.title);
                    }
                    const descRes = chunkDesc(code.content);
                    if (descRes){
                        // 判断是否存在content
                        if (descRes.content){
                            code.content = descRes.content;
                        }else {
                            code.content = undefined;
                        }
                        attrs.desc = descRes.source;
                    }
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
                }else {
                    const source = srcCode(id,attrs.src as string);
                    if (source){
                        const ext = attrs.language ? '.'+attrs.language : extname(attrs.src as string);
                        myCodeSource = "```"+ext.slice(1) + "\n" + source + '\n```\n';
                    }
                }
            }
        }
    })
    if (myCodeSource){
        return myCodeSource;
    }
    return render(parserCode);
}

// 获取tag中指定的数据
const getTagSource = (content:Content,tag:string='desc') => {
    if (checkDataType(content,"Array")){
        let i = 0;
        for (const contentElement of (content as Array<Node | Node[]>)) {
            if (checkDataType(contentElement,'Object')){
                const el:NodeTag = (contentElement as NodeTag);
                if (el.tag === tag ){
                    return{
                        isSelf:false,
                        index:i,
                        source:render(el)
                    }
                }
            }
        }
    }else if (checkDataType(content,'Object') && (content as NodeTag).tag === tag){
        return {
            isSelf: true,
            index: 0,
            source: render(content as NodeTag)
        }
    }else {
        return false
    }
}

// 处理desc中的数据
const chunkDesc = (content:Content) => {
    const sourceData = getTagSource(content,'desc');
    if (sourceData){
        // 在这里对数据进行处理
        // console.log(sourceData);
        // 去除内容
        const path = /<desc.*?>(.*?)<.*?\/desc>/sg
        const res = path.exec(sourceData.source);
        let source = '';
        if (res && res.length >= 2){
            const code = res[1];
            source = MarkdownFormat(code);
        }
        // 删除当前的tag
        if (sourceData.isSelf){
            // 通过索引删除
            (content as Array<Node | Node[]>).splice(sourceData.index,1);
            return {
                source,
                content
            }
        }else {
            // 直接给空
            return {
                source
            };
        }
    }
    return false;
}

type CheckType = 'Array' | 'String' | 'Number' | 'Object' | 'Undefined' | 'Null' | 'Boolean' | 'Function' | 'Symbol' | 'Date' | 'RegExp' | 'global' | 'Error' | 'HTMLDocument';

// 检查类型
const checkDataType = (data:unknown,type:CheckType = "Array"): boolean => {
    return Object.prototype.toString.call(data).includes(type)
}

// 正常返回数据
const chunkCode = (source:string) => {
    // 返回数据
    return{
        highlight: encodeURIComponent(highlightCode(source,'vue')),
        copyCode: encodeURIComponent(source)
    }
}

// 将代码转换为一个正常的代码块
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
