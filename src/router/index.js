import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';

Vue.use(Router);

const requireAuth = (to, from, next) => {
  if (to.query.code) {
    next();
  } else {
    next({
      path: '/login',
    });
  }
};

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
        window.location = process.env.VUE_APP_API_LOGIN;
        next();
      },
    },
  ],
});
