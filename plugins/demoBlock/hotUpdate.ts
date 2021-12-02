import {HmrContext, Update} from "vite";

/**
 * 代码块热更新
 * @param ctx
 */
export const hotUpdate = (ctx:HmrContext) => {
    const { modules,server } = ctx;
    const updates:Update[] = [];
    for (const module of modules) {
        for (const moduleNode of Array.from(module.importers)) {
            updates.push({
                type:moduleNode.type === 'js' ? 'js-update':'css-update',
                acceptedPath:moduleNode.url,
                path:moduleNode.url,
                timestamp: Date.now()
            })
        }
    }
    server.ws.send({
        type:'update',
        updates
    })
}