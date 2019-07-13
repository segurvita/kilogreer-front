import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

/**
 * 認証済みか検査するナビゲーションガード
 * @param {*} to 次にナビゲーションされるルート
 * @param {*} from ナビゲーションされる前のルート
 * @param {*} next ナビゲーションの制御
 */
const requireAuth = (to, from, next) => {
  // クエリcodeの有無
  if (to.query.code) {
    // 次のナビゲーションへ遷移
    next();
  } else {
    // 別のナビゲーションへ遷移
    next({
      path: '/login',
    });
  }
};

/**
 * ルーティング
 */
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'home',
    },
    {
      path: '/home',
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
