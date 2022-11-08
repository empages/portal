import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from "@/store";
import layoutsPlugin from '@/plugins/layouts';
import directives from "@/plugins/directives";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(directives);
app.use(layoutsPlugin);
app.mount('#app');
