import DemoBlock from "./demo.vue"
import { App,Plugin } from "vue"
export { DemoBlock };

export default {
    install(app:App){
        app.component('demo',DemoBlock);
    }
} as Plugin;
