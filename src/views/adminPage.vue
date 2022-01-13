<template>
  <div :v-show="userRole == 'admin'">
    <div class="row">
      <div class="col-2 offset-3">
        Start Date:
        <input v-model="filterStartDate" type="date" name="asd" id="" />
      </div>
      <div class="col-2">
        <button class="btn btn-primary" @click="filterResults">Filter</button>
      </div>

      <div class="col-2">
        End Date:
        <input
          v-model="filterEndDate"
          type="date"
          name="asd"
          :placeholder="filterStartDate"
          :min="filterStartDate"
        />
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Start Time</th>
          <th scope="col">End Time</th>
          <th scope="col">Level</th>
          <th scope="col">Topic</th>
          <th scope="col">Instructor Name</th>
          <th scope="col">Student Name</th>
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
          <td>{{ stdName[index - 1] }} {{ stdSurname[index - 1] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userRole: localStorage.getItem("role"),
      filterStartDate: null,
      filterEndDate: null,
      lessons: [],
      lessonNumber: 0,
      date: [],
      endTime: [],
      startTime: [],
      level: [],
      topic: [],
      insName: [],
      insSurname: [],
      stdName: [],
      stdSurname: [],
    };
  },
  methods: {
    filterResults() {
      this.date = [];
      this.endTime = [];
      this.startTime = [];
      this.level = [];
      this.topic = [];
      this.insName = [];
      this.insSurname = [];
      this.stdName = [];
      this.stdSurname = [];
      this.lessonNumber = 0;
      //   console.log(this.filterStartDate);
      axios
        .get(
          "https://mambly-backend-app.herokuapp.com/scheduling/course-date/period?date1=" +
            this.filterStartDate +
            "&date2=" +
            this.filterEndDate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
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
            this.stdName[i] = this.lessons[i].courseTakenDto.student.name;
            this.stdSurname[i] = this.lessons[i].courseTakenDto.student.surname;
          }
          this.lessonNumber = this.lessons.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    if (localStorage.getItem("reloadedadmin")) {
      // The page was just reloaded. Clear the value from local storage
      // so that it will reload the next time this page is visited.
      localStorage.removeItem("reloadedadmin");
    } else {
      // Set a flag so that we know not to reload the page twice.
      localStorage.setItem("reloadedadmin", "1");
      location.reload();
    }
  },
  created() {
    // this.userRole = localStorage.getItem("role");
    axios
      .get(
        "https://mambly-backend-app.herokuapp.com/scheduling/course-date/all"
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
          this.stdName[i] = this.lessons[i].courseTakenDto.student.name;
          this.stdSurname[i] = this.lessons[i].courseTakenDto.student.surname;
        }
        this.lessonNumber = this.lessons.length;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
