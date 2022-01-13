<template>
  <div class="login">
    <section class="page-section" id="contact">
      <div class="container">
        <!-- Contact Section Heading-->
        <h2
          class="
            page-section-heading
            text-center text-uppercase text-secondary
            mb-0
          "
        >
          LOGIN
        </h2>
        <!-- Icon Divider-->
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
        </div>
        <!-- headers: { 'Content-Type': 'application/json' } -->
        <form id="app" @submit="checkForm" >
           <p v-if="errors.length">
            <b>Please correct the following error(s)</b>
            <ul style="list-style-type: none">
              <li style="  width: 100%;
                margin-top: 0.25rem;
                font-size: 0.875em;
                color: #dc3545;" v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="email" class="mb-0">Email</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input
                id="email"
                v-model="email"
                class="form-control"
                name="email"
                placeholder="Enter e-mail"
              />
            </div>
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="password" class="mb-0">Password</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                name="password"
                placeholder="Enter password"
              />
            </div>
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="role" class="mb-0">Select role</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <select id="role" v-model="role" name="role" class="form-control">
                <option>instructor</option>
                <option>student</option>
                <option>admin</option>
              </select>
            </div>
          </div>
          <p>
            
            <button
              class="btn btn-primary btn-l mt-5 justify-content-center"
              type="submit"
            >
              Submit
            </button>
            
          </p>
        </form>
      </div>
    </section>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      submitted: null,
      errors: [],
      role: null,
      email: null,
      password: null,
      token: null,
    };
  },
  methods: {
    ...mapMutations(["assignToken", "assignRole", "assignEmail"]),
    submit: function () {
      axios
        .post(
          "https://mambly-backend-app.herokuapp.com/scheduling/auth/" +
            this.role +
            "-signin?email=" +
            this.email +
            "&password=" +
            this.password
        )
        .then((response) => (this.token = response.data))
        .then((response) => {
          // that.$store.commit('LOGIN_SUCCESS', response.data)
          // console.log(this.store.$state.token);
          // console.log(this.token);

          // this.$store.state.token=response.data
          // console.log(this.token)
          // this.$store.commit('assignToken', response.data)
          // this.assignToken(this.token)

          localStorage.setItem("token", this.token);
          // console.log(this.$store.state.token)
          if (this.token == "user does not exists") {
            alert(this.token);
            // this.$router.push({ path: 'calendar' })
          } else if (this.token == "user is not activated") {
            alert(this.token);
            // this.$router.push({ path: 'calendar' })
          } else if (this.token == "wrong password") {
            alert(this.token);
            // this.$router.push({ path: 'calendar' })
          } else if (this.token != null) {
            if (this.role == "admin") {
              // this.assignRole(this.role)
              // this.assignEmail(this.email)
              localStorage.setItem("email", this.email);
              localStorage.setItem("role", this.role);
              this.$router.push({ path: "adminPage" });
            } else if (this.role == "student") {
              // this.assignRole(this.role)
              // this.assignEmail(this.email)
              localStorage.setItem("email", this.email);
              localStorage.setItem("role", this.role);
              this.$router.push({ path: "calendar" });
            } else {
              // this.assignRole(this.role)
              // this.assignEmail(this.email)
              localStorage.setItem("role", this.role);
              console.log(localStorage.getItem("role"));
              localStorage.setItem("email", this.email);
              this.$router.push({ path: "instructorCalendar" });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log(this.info)
    },
    checkForm: function (e) {
      this.errors = [];

      if (!this.role) {
        this.errors.push("Role required.");
      }
      if (!this.password) {
        this.errors.push("Password required.");
      }
      if (!this.email) {
        this.errors.push("Email required.");
      } else if (!this.validEmail(this.email)) {
        this.errors.push("Valid email required.");
      }
      if (this.errors.length == 0) {
        this.submit();
      }
      e.preventDefault();
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>
<style scoped src="@/css/styles.css"></style>
