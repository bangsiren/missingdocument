import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/upload-document",
    name: "UploadDocument",
    component: () => import("../views/UploadDocument/Index.vue"),
  },
  {
    path: "/security",
    name: "security",
    component: () => import("../views/Security/Index.vue"),
  },
  {
    path: "/donations",
    name: "donations",
    component: () => import("../views/Donations/Index.vue"),
  },
  {
    path: "/post",
    name: "post",
    component: () => import("../views/Lose/Index.vue"),
  },

  {
    path: "/post/success",
    name: "post-success",
    component: () => import("../views/Lose/success.vue"),
  },

  // admin

  {
    path: "/admin",
    component: () => import("../views/Admin/Index.vue"),
    children: [
      {
        path: "login",
        component: () => import("../views/Admin/Login.vue"),
      },
      {
        path: "",
        beforeEnter: (to, from, next) => {
          const token = localStorage.getItem("jwt");

          if (token) return next();

          return next("/admin/login");
        },
        component: () => import("../views/Admin/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes,
})

export default router;
