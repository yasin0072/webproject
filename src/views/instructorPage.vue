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
                  @click="answer(index - 1, true)"
                  class="btn btn-primary"
                >
                  Accept
                </button>
              </td>
              <td>
                <button
                  @click="answer(index - 1, false)"
                  class="btn btn-danger"
                >
                  Reject
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
  created() {
    // this.userRole = localStorage.getItem("role");

    axios
      .get(
        "https://mambly-backend-app.herokuapp.com/scheduling/instructor/accept-list?email=" +
          localStorage.getItem("email")
      )
      .then((response) => {
        // console.log(response);
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
          this.stdName[i] = this.lessons[i].courseTakenDto.student.name;
          this.stdSurname[i] = this.lessons[i].courseTakenDto.student.surname;
        }
        this.lessonNumber = this.lessons.length;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    answer(index, answer) {
      axios.post(
        "https://mambly-backend-app.herokuapp.com/scheduling/enroll/course-acceptance?courseId=" +
          this.lessons[index].id +
          "&isAccepted=" +
          answer
      );
      this.$router.go();
    },
  },
  mounted() {
    if (localStorage.getItem("reloadedinst")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloadedinst");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloadedinst", "1");
      location.reload();
    }
  },
};
</script>
<style scoped></style>
