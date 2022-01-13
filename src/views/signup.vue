<template>
  <div class="signup">
    <section class="page-section" id="contact">
      <div class="container">
        <h2
         class="
          page-section-heading
          text-center text-uppercase text-secondary
            mb-0
          "
        >
          Signup
        </h2>
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
        </div>
        <form id="contactForm" @submit="checkForm">
          <p v-if="errors.length">
            <b>Please correct the following error(s)</b>
            <ul style="list-style-type: none">
              <li style="  width: 100%;
                margin-top: 0.25rem;
                font-size: 0.875em;
                color: #dc3545;" v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p>
        <div class="row justify-content-center mt-5">
            <div class="col-sm-3">
              <label for="firstname" class="mb-0">First Name</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input id="firstname"
              v-model="firstname" type="firstname" class="form-control" name="firstname"
              placeholder="Enter firstname" >
            </div>
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="lastname" class="mb-0">Last Name</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input id="lastname"
              v-model="lastname" type="lastname" class="form-control" name="lastname"
              placeholder="Enter lastname" >
            </div>
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="email" class="mb-0">Email</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input id="email"
              v-model="email" class="form-control" name="email"
              placeholder="Enter e-mail" >
            </div>
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="password" class="mb-0">Password</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input id="password"
              v-model="password" type="password" class="form-control" name="password"
              placeholder="Enter password" >
            </div>
            
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="role" class="mb-0">Select Role</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <select id="role" v-model="role" name="role" class="form-control">
                <option>instructor</option>
                <option>student</option>
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
import axios from "axios";
export default {
  name: "signup",
  data() {
    return {
      firstname: null,
      lastname: null,
      email: null,
      password: null,
      role: null,
      errors: [],
    };
  },
  methods: {
    submit() {
      const headers = {
        id: null,
        name: this.firstname,
        email: this.email,
        active: null,
        password: this.password,
        surname: this.lastname,
      };
      var json = JSON.stringify(headers);
      const res = axios
        .post(
          "https://mambly-backend-app.herokuapp.com/scheduling/auth/" +
            this.role +
            "-signup",
          json,
          {
            headers: {
              // Overwrite Axios's automatically set Content-Type
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data == "success") {
            alert("Account is created");
            this.$router.push({ path: "login" });
          } else {
            alert("E-mail is used before");
          }
        })
        .catch((error) => {
          alert(error);
        });

      // res.data.data; // '{"answer":42}'
      // res.data.headers['Content-Type']; // 'application/json',
      //   .then(response => (console.log(response.data)))
      //   .catch((error) => {
      //   console.log(error);
      // });
    },
    checkForm: function (e) {
      this.errors = [];
      if (!this.firstname) {
        this.errors.push("First name required.");
      }
      if (!this.lastname) {
        this.errors.push("Last name required.");
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
<style scoped src="@/css/styles.css">
</style>
