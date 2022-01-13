<template>
<div class="AddCourse" :v-show="userRole == 'instructor'">
    <section class="page-section" id="contact">
      <div class="container">
        <h2
         class="
          page-section-heading
          text-center text-uppercase text-secondary
            mb-0
          "
        >
          Add Course
        </h2>
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
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
              <label id="datefield" for="date" class="mb-0" >Date</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input id="date"
              v-model="date" type="date" class="form-control" :min="mindate" name="date">
            </div>
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="startTime" class="mb-0">Start Time</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input id="startTime"
              v-model="startTime" type="time" class="form-control" name="startTime">
            </div>
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="email" class="mb-0">End Time</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input id="endTime"
              v-model="endTime" type="time" class="form-control" name="endTime" :min="startTime">
            </div>
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="topic" class="mb-0">Topic</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <input id="topic"
              v-model="topic" type="topic" class="form-control" name="topic"
              placeholder="Enter Topic" >
            </div>
          </div>
          <div class="row mt-4 justify-content-center">
            <div class="col-sm-3">
              <label for="level" class="mb-0">Level</label>
            </div>
            <div class="col-sm-3 text-secondary">
              <select id="level" v-model="level" name="level" class="form-control">
               <!-- <option value="" disabled selected>Select your option</option> -->
                <option>A1</option>
                <option>A2</option>
                <option>B1</option>
                <option>B2</option>
                <option>C1</option>
                <option>C2</option>
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
      userRole: localStorage.getItem("role"),
      date: null,
      startTime: null,
      endTime: null,
      topic: null,
      errors: [],
      level: null,
      mindate: null,
    };
  },
  created() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    this.mindate = today;
  },
  methods: {
    submit() {
      var email = localStorage.getItem("email");
      console.log(this.startTime);
      const headers = {
        courseDto: {
          date: this.date,
          startTime: this.startTime,
          endTime: this.endTime,
          langLvl: this.level,
          topic: this.topic,
        },
        email: email,
      };
      var json = JSON.stringify(headers);
      // console.log(json);
      const res = axios
        .post(
          "https://mambly-backend-app.herokuapp.com/scheduling/instructor/create-course",
          json,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          alert(response.data);
        });
      this.$router.go();
    },
    checkForm: function (e) {
      this.errors = [];
      if (!this.date) {
        this.errors.push("Date is required.");
      }
      if (!this.startTime) {
        this.errors.push("Start Time is required.");
      }
      if (!this.endTime) {
        this.errors.push("End Time is required.");
      }
      if (!this.level) {
        this.errors.push("language level is required.");
      }
      if (!this.topic) {
        this.errors.push("Topic is required.");
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
