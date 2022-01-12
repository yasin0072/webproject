import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/signup",
    name: "signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/signup.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/calendar.vue"),
  },
  {
    path: "/scheduling",
    name: "scheduling",
    component: () => import("../views/scheduling.vue"),
  },
  {
    path: "/adminPage",
    name: "adminPage",
    component: () => import("../views/adminPage.vue"),
  },
  {
    path: "/instructorPage",
    name: "instructorPage",
    component: () => import("../views/instructorPage.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/logout.vue"),
  },
  {
    path: "/studentAnnulation",
    name: "studentAnnulation",
    component: () => import("../views/studentAnnulation.vue"),
  },
  {
    path: "/instructorAnnulation",
    name: "instructorAnnulation",
    component: () => import("../views/instructorAnnulation.vue"),
  },
  {
    path: "/addCourse",
    name: "addCourse",
    component: () => import("../views/addCourse.vue"),
  },
  {
    path: "/accountActivation",
    name: "accountActivation",
    component: () => import("../views/accountActivation.vue"),
  },
  {
    path: "/scheduleForm",
    name: "scheduleForm",
    component: () => import("../views/scheduleForm.vue"),
  },
  {
    path: "/instructorCalendar",
    name: "instructorCalendar",
    component: () => import("../views/instructorCalendar.vue"),
  },
  {
    path: "/instructorReSchedule",
    name: "instructorReSchedule",
    component: () => import("../views/instructorReSchedule.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
