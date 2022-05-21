import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import About from "../views/About";
import Single from "../views/Single";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/post/:id",
    name: "Single",
    component: Single,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
