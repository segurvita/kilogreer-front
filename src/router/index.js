import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import Auth from '@/auth';

Vue.use(Router);

/**
 * 認証済みか検査するナビゲーションガード
 * @param {*} to 次にナビゲーションされるルート
 * @param {*} from ナビゲーションされる前のルート
 * @param {*} next ナビゲーションの制御
 */
const requireAuth = (to, from, next) => {
  // 認証済みかどうか
  Auth.isAuthenticated(to.query.code).then(() => {
    // 次のナビゲーションへ遷移
    next();
  }).catch(() => {
    // 別のナビゲーションへ遷移
    next({
      path: '/login',
    });
  });
};

/**
 * ルーティング
 */
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      beforeEnter(to, from, next) {
        // ログインページへ遷移
        window.location = `${process.env.VUE_APP_API_HOST}/code`;
        next();
      },
    },
  ],
});
