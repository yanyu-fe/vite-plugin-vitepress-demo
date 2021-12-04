// @ts-ignore
import MarkdownIt from "markdown-it";
import { highlight } from "./highlight";
import {preWrapperPlugin} from "./preWrapper";
const md = new MarkdownIt({
    highlight:highlight,
    html:true,
    linkify:true
});
md.use(preWrapperPlugin);

export const MarkdownFormat = (str:string) => {
    const source = md.render(str);
    // console.log(source);
    return encodeURIComponent(`${source}`);
}

export const MarkdownFormatInline = (str:string) => {
    const source = md.renderInline(str);
    // console.log(source);
    return encodeURIComponent(source);
}

