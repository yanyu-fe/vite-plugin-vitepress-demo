// @ts-ignore
import MarkdownIt from "markdown-it";
import { highlight } from "./highlight";
const md = new MarkdownIt({
    highlight:highlight,
    html:true,
    linkify:true
});

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

