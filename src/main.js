import { createApp, VueElement } from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
require("./css/styles.css");
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      token: "",
      role: "",
      email: "",
    };
  },
  mutations: {
    assignToken(state, token) {
      state.token = token;
    },
    assignRole(state, role) {
      state.role = role;
    },
    assignEmail(state, email) {
      state.email = email;
    },
  },
});

//createApp(App).use(router, store).mount("#app");

const app = createApp(App);
// app.component(store);

app.use(router);
app.use(store);
app.mount("#app");
