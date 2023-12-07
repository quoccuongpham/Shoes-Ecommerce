import {createApp} from 'vue'
import Antd from "ant-design-vue";
import App from './App.vue';
import "@ant-design/icons-vue";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";

createApp(App).use(router).use(Antd).mount('#app');
