import { createRouter, createWebHistory } from "vue-router";
import homeView from "../views/homeView.vue";
import configView from "../views/configView.vue";
import loginView from "../views/loginView.vue";
import cadastroView from "../views/cadastroView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: loginView,
  },
  {
    path: "/",
    redirect: { name: "login" },
  },
  {
    path: "/home",
    name: "home",
    component: homeView,
  },
  {
    path: "/config",
    name: "config",
    component: configView,
  },
  {
    path: "/cadastro",
    name: "cadastro",
    component: cadastroView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
