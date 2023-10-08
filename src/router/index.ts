import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/user/:username",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/DashboardView.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "wallet",
        name: "wallet",
        component: () => import("../views/WalletView.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to?.meta?.requiresAuth) {
    const token = localStorage.getItem('username');
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router;
