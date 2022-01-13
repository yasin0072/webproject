<template>
  <div :v-show="userRole == 'instructor'">
    <div class="row">
      <div class="col">
        <h1>Course List</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Student Name</th>
              <th scope="col">New Date</th>
              <th scope="col">New Start Time</th>
              <th scope="col">New End Time</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="index in courseNumber" :key="index">
              <td>{{ topic[index - 1] }}</td>
              <td>{{ date[index - 1] }}</td>
              <td>{{ startTime[index - 1] }}</td>
              <td>{{ endTime[index - 1] }}</td>
              <td>{{ insName[index - 1] }} {{ insSurname[index - 1] }}</td>

              <td>
                <input
                  id="date"
                  v-model="newDate[index - 1]"
                  type="date"
                  class="form-control"
                  :min="mindate"
                  name="date"
                />
              </td>
              <td>
                <input
                  id="startTime"
                  v-model="newStartTime[index - 1]"
                  type="time"
                  class="form-control"
                  name="startTime"
                />
              </td>
              <td>
                <input
                  id="endTime"
                  v-model="newEndTime[index - 1]"
                  type="time"
                  class="form-control"
                  name="endTime"
                />
              </td>

              <td>
                <button @click="reSchedule(index - 1)" class="btn btn-primary">
                  submit
                </button>
              </td>
              <!-- <td>{{ stdName[index - 1] }} {{ stdSurname[index - 1] }}</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br />
    <!-- --------------------------------------------------------------------------------------------------- -->
    <hr />
    <div class="row">
      <div class="col">
        <h1>Reschedule Requests</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Start Time</th>
              <th scope="col">End Time</th>
              <th scope="col">Student Name</th>
              <th scope="col">New Date</th>
              <th scope="col">New Start Time</th>
              <th scope="col">New End Time</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="index in scheduledNumber" :key="index">
              <td>{{ inputTopic[index - 1] }}</td>
              <td>{{ inputDate[index - 1] }}</td>
              <td>{{ inputStartTime[index - 1] }}</td>
              <td>{{ inputEndTime[index - 1] }}</td>
              <td>
                {{ inputInsName[index - 1] }} {{ inputInsSurname[index - 1] }}
              </td>
              <td>{{ inputNewDate[index - 1] }}</td>
              <td>{{ inputNewStartTime[index - 1] }}</td>
              <td>{{ inputNewEndTime[index - 1] }}</td>

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
              <!-- <td>{{ stdName[index - 1] }} {{ stdSurname[index - 1] }}</td> -->
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
      courseNumber: 0,
      insName: [],
      insSurname: [],
      lessons: [],
      date: [],
      startTime: [],
      endTime: [],
      topic: [],
      level: [],
      courseId: [],
      mindate: [],
      minTime: null,
      newDate: [],
      newStartTime: [],
      newEndTime: [],

      inputTopic: [],
      inputDate: [],
      inputStartTime: [],
      inputEndTime: [],
      inputInsName: [],
      inputInsSurname: [],
      inputNewDate: [],
      inputNewStartTime: [],
      inputNewEndTime: [],
      scheduledNumber: 0,
      reScheduledCourses: [],
      scheduleID: [],
    };
  },
  methods: {
    reSchedule(index) {
      // console.log(this.newStartTime);
      // console.log(this.newDate[index]);
      axios
        .post(
          "https://mambly-backend-app.herokuapp.com/scheduling/reschedule/request?time1=" +
            this.newStartTime[index] +
            "&time2=" +
            this.newEndTime[index] +
            "&date=" +
            this.newDate[index] +
            "&courseId=" +
            this.lessons[index].id +
            "&email=" +
            localStorage.getItem("email")
        )
        .then((response) => {
          alert(response.data);
          this.$router.go();
        });
      // this.$router.go();
    },
    answer(index, answer) {
      // burağı bekliyor
      axios.post(
        "https://mambly-backend-app.herokuapp.com/scheduling/reschedule/accept?courseId=" +
          this.reScheduledCourses[index].id +
          "&isAccepted=" +
          answer
      );
      this.$router.go();
    },
    // enrollLesson(index, teacher) {
    //   //   console.log(this.instructors);
    //   for (let i = 0; i < this.instructors.length; i++) {
    //     if (teacher == this.instructors[i].name) {
    //       this.lessonID = this.instructors[i].courseList[index].id;
    //     }
    //     // console.log(this.lessonID);
    //     // console.log(this.$store.state.token);
    //     break;
    //   }

    //     .then((response) => {
    //       this.instructors = response.data;
    //       for (let i = 0; i < this.instructors.length; i++) {
    //         this.teachers[i] = this.instructors[i].name;
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   this.$router.go();
    // },
  },
  created() {
    var today = new Date();
    var hh = today.getHours();
    var hm = today.getMinutes();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (hm < 10) {
      hm = "0" + hm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    this.minTime = hh + ":" + hm;
    this.mindate = today;

    axios
      .get(
        "https://mambly-backend-app.herokuapp.com/scheduling/instructor/instructor-course?email=" +
          localStorage.getItem("email")
      )
      .then((response) => {
        // console.log(response);
        this.lessons = response.data;
        // console.log(this.lessons);
      })
      .then((response) => {
        for (let i = 0; i < this.lessons.length; i++) {
          //   this.courses[i] = this.lessons[i].topic;
          this.date[i] = this.lessons[i].date;
          this.startTime[i] = this.lessons[i].startTime;
          this.endTime[i] = this.lessons[i].endTime;
          this.topic[i] = this.lessons[i].topic;
          if (this.lessons[i].courseTakenDto != undefined) {
            // console.log(this.lessons[i].courseTakenDto);
            this.insName[i] = this.lessons[i].courseTakenDto.student.name;
            this.insSurname[i] = this.lessons[i].courseTakenDto.student.surname;
          } else {
            this.insName[i] = "-";
            this.insSurname[i] = "";
          }
        }

        this.courseNumber = this.lessons.length;
        // console.log(this.startTime, this.minTime);
      });
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // // // // axios burakdan gelecek
    axios
      .get(
        "https://mambly-backend-app.herokuapp.com/scheduling/instructor/rescheduled-courses?email=" +
          localStorage.getItem("email")
      )
      .then((response) => {
        this.reScheduledCourses = response.data;
        // console.log(this.reScheduledCourses);
        for (let i = 0; i < this.reScheduledCourses.length; i++) {
          this.inputNewDate[i] = this.reScheduledCourses[i].rescheduleDto.date;
          this.inputNewStartTime[i] =
            this.reScheduledCourses[i].rescheduleDto.startTime;
          this.inputNewEndTime[i] =
            this.reScheduledCourses[i].rescheduleDto.endTime;

          this.inputTopic[i] = this.reScheduledCourses[i].topic;
          if (this.reScheduledCourses[i].courseTakenDto != undefined) {
            this.inputInsName[i] =
              this.reScheduledCourses[i].courseTakenDto.student.name;
            this.inputInsSurname[i] =
              this.reScheduledCourses[i].courseTakenDto.student.surname;
          } else {
            this.inputInsName[i] = "-";
            this.inputInsSurname[i] = "";
          }

          this.scheduleID[i] = this.reScheduledCourses[i].id;
          this.inputDate[i] = this.reScheduledCourses[i].date;
          this.inputStartTime[i] = this.reScheduledCourses[i].startTime;
          this.inputEndTime[i] = this.reScheduledCourses[i].endTime;
        }
        this.scheduledNumber = this.reScheduledCourses.length;
      });
  },
};
</script>
