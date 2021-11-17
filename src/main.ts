import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from "@/store";
import emPagesComponentsPlugin from '@/plugins/em-page-components';
import runtimeService from "@/services/runtime-service";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(emPagesComponentsPlugin);

runtimeService.startEmeraudePortal(app);