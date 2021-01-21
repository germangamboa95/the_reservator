import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Settings from "../views/Settings.vue";
import Reservations from "../views/Reservations.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/availability",
    name: "Availability",
    component: Settings
  },
  {
    path: "/reservations",
    name: "Reservations",
    component: Reservations
  },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
