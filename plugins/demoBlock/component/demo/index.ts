import DemoBlock from "./demo.vue"

export { DemoBlock }

export default {
    install(app){
        app.component('demo',DemoBlock)
    }
}
