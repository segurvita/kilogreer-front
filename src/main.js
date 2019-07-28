// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import App from './App';
import Auth from './auth';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

// バックエンドURL設定
window.axios = axios.create({
  baseURL: process.env.VUE_APP_API_HOST,
});

// axios共通処理設定
window.axios.interceptors.request.use(
  (request) => {
    // アクセストークン設定
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  error => Promise.reject(error),
);

// axios共通応答設定
window.axios.interceptors.response.use(
  response => response,
  (error) => {
    // 認証エラー
    if (error.response.status === 401) {
      // 再認証
      Auth.refreshAccessToken()
        .then(() =>
          // 再リクエスト
          window.axios.request(error.config),
        )
        .catch(() => {
          // ログアウト
          router.replace('/logout');
        });
    }
    return Promise.reject(error);
  },
);

// axios設定
Vue.prototype.$http = window.axios;

// Debug用にダミーアクセストークンを設定
const dummyAccessToken = process.env.VUE_APP_DUMMY_ACCESS_TOKEN;
if (dummyAccessToken) {
  sessionStorage.setItem('access_token', dummyAccessToken);
}

// Debug用にダミーリフレッシュトークンを設定
const dummyRefreshToken = process.env.VUE_APP_DUMMY_REFRESH_TOKEN;
if (dummyRefreshToken) {
  localStorage.setItem('refresh_token', dummyRefreshToken);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
