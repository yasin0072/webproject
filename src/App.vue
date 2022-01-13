<template>
  <div id="nav" class="text-start">
    <nav
      class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
      id="mainNav"
    >
      <div class="container">
        <router-link to="/" class="text-decoration-none"
          ><a class="navbar-brand"
            ><img
              style="max-width: 100%; max-height: 100% padding: 5px"
              src="../assets/asd.png"
              alt="" /></a
        ></router-link>
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
            </li>
            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'instructor'">
              <router-link to="/instructorCalendar" class="text-decoration-none"
                ><a
                  v-show="userRole == 'instructor'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#instructorCalendar"
                  >Calendar</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'instructor'">
              <router-link
                to="/instructorReSchedule"
                class="text-decoration-none"
                ><a
                  v-show="userRole == 'instructor'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#instructorReSchedule"
                  >Schedule</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'instructor'">
              <router-link to="/instructorPage" class="text-decoration-none"
                ><a
                  v-show="userRole == 'instructor'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#instructorPage"
                  >Applications</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'instructor'">
              <router-link to="/addCourse" class="text-decoration-none"
                ><a
                  v-show="userRole == 'instructor'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#addCourse"
                  >addCourse</a
                ></router-link
              >
            </li>

            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'instructor'">
              <router-link
                to="/instructorAnnulation"
                class="text-decoration-none"
                ><a
                  v-show="userRole == 'instructor'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#instructorAnnulation"
                  >Annulation</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'student'">
              <router-link to="/calendar" class="text-decoration-none"
                ><a
                  v-show="userRole == 'student'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#calendar"
                  >Calendar</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'student'">
              <router-link to="/scheduling" class="text-decoration-none"
                ><a
                  v-show="userRole == 'student'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#calendar"
                  >Enrollment</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'student'">
              <router-link to="/scheduleForm" class="text-decoration-none"
                ><a
                  v-show="userRole == 'student'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#scheduleForm"
                  >Reschedule</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'student'">
              <router-link to="/studentAnnulation" class="text-decoration-none"
                ><a
                  v-show="userRole == 'student'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#studentAnnulation"
                  >Annulation</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1" v-show="userRole == 'admin'">
              <router-link to="/accountActivation" class="text-decoration-none"
                ><a
                  v-show="userRole == 'admin'"
                  class="nav-link py-2 px-0 px-lg-3 rounded"
                  href="#accountActivation"
                  >Activation</a
                ></router-link
              >
            </li>
            <li class="nav-item mx-0 mx-lg-1">
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
