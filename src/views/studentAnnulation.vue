<template>
  <div :v-show="userRole == 'student'">
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
              <th scope="col">Instructor Name</th>
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
              <td>{{ insName[index - 1] }} {{ insSurname[index - 1] }}</td>
              <td>
                <button @click="answer(index - 1, true)" class="btn btn-danger">
                  Cancel
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
      insName: [],
      insSurname: [],
      lessonID: null,
      selectedLessonID: null,
    };
  },
  methods: {
    answer(index, answer) {
      axios.delete(
        "https://mambly-backend-app.herokuapp.com/scheduling/enroll/cancel-course-student?studentEmail=" +
          localStorage.getItem("email") +
          "&courseId=" +
          this.lessons[index].id
      );
      this.$router.go();
    },
  },
  mounted() {
    if (localStorage.getItem("reloadedstdAnn")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloadedstdAnn");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloadedstdAnn", "1");
      location.reload();
    }
  },
  created() {
    // this.userRole = localStorage.getItem("role");

    axios
      .get(
        "https://mambly-backend-app.herokuapp.com/scheduling/student/courses?email=" +
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
          this.insName[i] = this.lessons[i].instructor.name;
          this.insSurname[i] = this.lessons[i].instructor.surname;
        }
        this.lessonNumber = this.lessons.length;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
