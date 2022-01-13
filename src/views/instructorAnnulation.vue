<template>
  <div :v-show="userRole == 'instructor'">
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Level</th>
              <th scope="col">Topic</th>
              <th scope="col">Student Name</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="index in lessonNumber" :key="index">
              <td>{{ date[index - 1] }}</td>
              <td>{{ startTime[index - 1] }}</td>
              <td>{{ endTime[index - 1] }}</td>
              <td>{{ level[index - 1] }}</td>
              <td>{{ topic[index - 1] }}</td>
              <td>{{ stdName[index - 1] }} {{ stdSurname[index - 1] }}</td>
              <td>
                <button
                  @click="answer(index - 1, false)"
                  class="btn btn-danger"
                >
                  Remove
                </button>
              </td>
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
      lessons: [],
      lessonNumber: 0,
      date: [],
      endTime: [],
      startTime: [],
      level: [],
      topic: [],
      stdName: [],
      stdSurname: [],
      lessonID: null,
      selectedLessonID: null,
    };
  },
  methods: {
    answer(index, answer) {
      axios.delete(
        "https://mambly-backend-app.herokuapp.com/enroll/cancel-course-instructor?instructorEmail=" +
          localStorage.getItem("email") +
          "&courseId=" +
          this.lessons[index].id
      );
      this.$router.go();
    },
  },
  mounted() {
    if (localStorage.getItem("reloadedinstAnn")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloadedinstAnn");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloadedinstAnn", "1");
      location.reload();
    }
  },
  created() {
    // this.userRole = localStorage.getItem("role");

    axios
      .get(
        "https://mambly-backend-app.herokuapp.com/scheduling/instructor/instructor-course?email=" +
          localStorage.getItem("email")
      )
      .then((response) => {
        // console.log(response);
        // console.log(response.data);
        this.lessons = response.data;
        // console.log(this.lessons);
      })
      .then((response) => {
        for (let i = 0; i < this.lessons.length; i++) {
          this.date[i] = this.lessons[i].date;
          this.endTime[i] = this.lessons[i].endTime;
          this.startTime[i] = this.lessons[i].startTime;
          this.level[i] = this.lessons[i].langLvl;
          this.topic[i] = this.lessons[i].topic;
          if (this.lessons[i].enrolled == true) {
            this.stdName[i] = this.lessons[i].courseTakenDto.student.name;
            this.stdSurname[i] = this.lessons[i].courseTakenDto.student.surname;
          } else {
            this.stdName[i] = "";
            this.stdSurname[i] = "-";
          }
        }
        this.lessonNumber = this.lessons.length;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
