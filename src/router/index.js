/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import TwoFactorLogin from '../views/TwoFactorLogin.vue';
import FrejaEidLogin from '../views/FrejaEidLogin.vue';
import RegisterTwo from '../views/RegisterTwo.vue';
import SecretView from '../views/SecretView.vue';
import ResetView from '../views/ResetView.vue';
import axios from 'axios';

const routes = [
  {
    path: '/',
    name: 'TwoFactorLogin',
    component: TwoFactorLogin,
  },
  {
    path: '/freja-eid-login',
    name: 'FrejaEidLogin',
    component: FrejaEidLogin,
  },{
    path: '/registertwo',
    name: 'RegisterTwo',
    component: RegisterTwo,
  },{
    path: '/secret',
    name: 'SecretView',
    component: SecretView, meta: { requiresAuth: true }
  },
  {
    path: '/reset',
    name: 'ResetView',
    component: ResetView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    axios.get("/authenticate")
      .then(() => {
        // If the request is successful, then the user is authenticated
        next();
      })
      .catch(() => {
        // If the request fails, then the user is not authenticated
        next({
          name: "TwoFactorLogin", 
          query: { redirect: to.fullPath },
        });
      });
  } else {
    next(); // Does not require login proceed to route
  }
});

export default router;