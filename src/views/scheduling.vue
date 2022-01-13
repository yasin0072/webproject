<template>
  <div :v-show="userRole == 'student'">
    <div class="row">
      <div class="col-2">
        <table class="table table-hover mx-5 px-5">
          <thead>
            <tr>
              <th scope="col">Instructor Name</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="clickable-row"
              v-for="(row, index) in teachers"
              :key="row"
            >
              <td scope="row" @click="selectTeacher(index)">
                {{ row }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-2 mx-5"></div>
      <div class="col-6">
        <table class="table">
          <thead>
            <tr v-show="selectedTeacher">
              <th scope="col"></th>
              <th scope="col">Date</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Level</th>
              <th scope="col">Topic</th>
              <th scope="col"></th>
            </tr>
            <h4 class="text-danger" v-show="!selectedTeacher">
              instructor is not selected
            </h4>
          </thead>
          <tbody>
            <tr v-for="courseRow in instructorNumber" :key="courseRow">
              <td>
                <button
                  @click="enrollLesson(courseRow - 1)"
                  class="btn btn-primary"
                >
                  Enroll
                </button>
              </td>
              <td>{{ date[courseRow - 1] }}</td>
              <td>{{ start[courseRow - 1] }}</td>
              <td>{{ end[courseRow - 1] }}</td>
              <td>{{ level[courseRow - 1] }}</td>
              <td>{{ topic[courseRow - 1] }}</td>
              <!-- <td>
                <button
                  @click="cancelLesson(courseRow - 1, selectedTeacher)"
                  class="btn btn-primary"
                >
                  Enroll
                </button>
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userRole: localStorage.getItem("role"),
      instructorNumber: 0,
      teachers: [],
      selectedTeacher: "",
      instructors: [],
      date: [],
      start: [],
      end: [],
      level: [],
      topic: [],
      lessonID: null,
      insEmail: [],
    };
  },
  methods: {
    selectTeacher(e) {
      this.selectedTeacher = this.instructors[e].email;
      // console.log(this.instructors);
      // this.selectedTeacher = e;
      for (let i = 0; i < this.instructors.length; i++) {
        if (this.selectedTeacher == this.instructors[i].email) {
          // console.log(this.instructors[i].email == this.selectedTeacher);
          this.instructorNumber = this.instructors[i].courseList.length;
          for (let k = 0; k < this.instructors[i].courseList.length; k++) {
            // console.log(this.selectedTeacher);
            this.date[k] = this.instructors[i].courseList[k].date;
            this.start[k] = this.instructors[i].courseList[k].startTime;
            this.end[k] = this.instructors[i].courseList[k].endTime;
            this.level[k] = this.instructors[i].courseList[k].langLvl;
            this.topic[k] = this.instructors[i].courseList[k].topic;
            // console.log(this.date);
          }

          break;
        }
      }
    },
    enrollLesson(index) {
      for (let i = 0; i < this.instructors.length + 1; i++) {
        if (this.selectedTeacher == this.instructors[i].email) {
          // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          // console.log(this.instructors[i]);
          this.lessonID = this.instructors[i].courseList[index].id;
          break;
        }
        // console.log(this.lessonID);
        // console.log(this.$store.state.token);
      }
      axios
        .post(
          "https://mambly-backend-app.herokuapp.com/scheduling/enroll/enroll-course?studentEmail=" +
            localStorage.getItem("email") +
            "&courseId=" +
            this.lessonID
        )
        .then((response) => {
          this.instructors = response.data;
          for (let i = 0; i < this.instructors.length; i++) {
            this.teachers[i] = this.instructors[i].name;
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.$router.go();
    },
  },
  created() {
    axios
      .get("https://mambly-backend-app.herokuapp.com/scheduling/instructor/all")
      .then((response) => {
        this.instructors = response.data;
        // console.log(this.instructors);
        for (let i = 0; i < this.instructors.length; i++) {
          this.teachers[i] = this.instructors[i].name;
          this.insEmail[i] = this.instructors[i].email;
          // console.log(this.insEmail[i]);
          // console.log(localStorage.getItem("email"));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    if (localStorage.getItem("reloadedstudent")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloadedstudent");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloadedstudent", "1");
      location.reload();
    }
  },
};
</script>
<style scoped></style>
