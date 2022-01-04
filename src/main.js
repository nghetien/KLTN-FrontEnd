import App from './App.vue';
import Antd from 'ant-design-vue';
import VueCookies from 'vue3-cookies';
import gAuth from 'vue3-google-auth';
import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';

import router from './router';
import store from './store';
import './assets/styles/reset_css.scss';
import './assets/styles/global.scss';

const $gAuth = gAuth.createGAuth({
    clientId: process.env.VUE_APP_CLIENT_ID,
    scope: process.env.VUE_APP_SCOPE,
    prompt: process.env.VUE_APP_PROMPT,
});

const app = createApp(App);

app.use($gAuth);
app.use(VueCookies);
app.use(Antd);
app.use(store);
app.use(router);
app.mount('#app');
