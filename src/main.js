import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import "./assets/main.css"
import axios from 'axios'

const app = createApp(App);

axios.defaults.timeout = 5000
app.config.globalProperties.$axios = axios

app.use(router);
app.mount('#app');
