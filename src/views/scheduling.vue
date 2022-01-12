<template>
  <div>
    <div class="row">
      <div class="col-2">
        <table class="table table-hover mx-5 px-5">
          <thead>
            <tr>
              <th scope="col">Instructor Name</th>
            </tr>
          </thead>
          <tbody>
            <tr class="clickable-row" v-for="row in teachers" :key="row">
              <td scope="row" @click="selectTeacher(row)">{{ row }}</td>
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
                  @click="enrollLesson(courseRow - 1, selectedTeacher)"
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
    };
  },
  methods: {
    selectTeacher(e) {
      this.selectedTeacher = e;
      for (let i = 0; i < this.instructors.length; i++) {
        if (this.selectedTeacher == this.instructors[i].name) {
          this.instructorNumber = this.instructors[i].courseList.length;
          for (let k = 0; k < this.instructors[i].courseList.length; k++) {
            this.date[k] = this.instructors[i].courseList[k].date;
            this.start[k] = this.instructors[i].courseList[k].startTime;
            this.end[k] = this.instructors[i].courseList[k].endTime;
            this.level[k] = this.instructors[i].courseList[k].langLvl;
            this.topic[k] = this.instructors[i].courseList[k].topic;
          }
          break;
        }
      }
    },
    enrollLesson(index, teacher) {
      //   console.log(this.instructors);
      for (let i = 0; i < this.instructors.length; i++) {
        if (teacher == this.instructors[i].name) {
          this.lessonID = this.instructors[i].courseList[index].id;
        }
        // console.log(this.lessonID);
        // console.log(this.$store.state.token);
        break;
      }
      axios
        .post(
          "http://localhost:8081/scheduling/enroll/enroll-course?studentEmail=" +
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
      .get("http://localhost:8081/scheduling/instructor/all")
      .then((response) => {
        this.instructors = response.data;
        for (let i = 0; i < this.instructors.length; i++) {
          this.teachers[i] = this.instructors[i].name;
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
