// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import App from './App';
import router from './router';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

// バックエンドURL設定
const http = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
});

// axios共通処理設定
http.interceptors.request.use((request) => {
  // アクセストークン設定
  const accessToken = sessionStorage.getItem('access_token');
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
}, error => Promise.reject(error));

// axios設定
Vue.prototype.$http = http;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

