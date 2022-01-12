<template>
  <div id="nav" class="text-start">
    <nav
      :v-show="userRole == undefined"
      class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
      id="mainNav"
    >
      <div class="container">
        <router-link to="/" class="text-decoration-none"
          ><a class="navbar-brand">Homepage</a></router-link
        >
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item mx-0 mx-lg-1">
              <router-link to="/login" class="text-decoration-none"
                ><a
                  v-show="userRole == undefined"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#login"
                  >login</a
                ></router-link
              >
              <router-link to="/logout" class="text-decoration-none"
                ><a
                  v-show="userRole != undefined"
                  class="
                    nav-link
                    py-2
                    px-0 px-lg-3
                    rounded
                    text-decoration-none
                  "
                  href="#login"
                  >Logout</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1">
              <router-link to="/signup" class="text-decoration-none"
                ><a
                  v-show="userRole == undefined"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#signup"
                  >Sign-up</a
                ></router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <router-view />
</template>
<script>
export default {
  data() {
    return {
      userRole: localStorage.getItem("role"),
    };
  },
  methods: {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  margin-top: 1.5%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
