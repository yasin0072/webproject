<template>
  <div id="calendar" :v-show="userRole == 'instructor'">
    <!-- <div class=""></div>
    <DatePicker
      v-model="date"
      mode="dateTime"
      is-range
      :minute-increment="5"
    /> -->
    <!-- <Fullcalendar defaultView="dayGridMonth" :plugins="calendarPlugins" /> -->
    <!-- <div class="demo-app-top">
      <button @click="toggleWeekends">toggle weekends</button>
      <button @click="gotoPast">go to a date in the past</button>
      (also, click a date/time to add an event)
    </div> -->
    <!-- <router-link to="/scheduling" class="text-decoration-none text-center"
      ><button class="btn btn-primary" href="#scheduling">
        Enroll
      </button></router-link
    > -->
    <!-- <router-link to="/scheduleForm" class="text-decoration-none"
      ><button @click="reSchedule" class="btn btn-primary">
        Schedule
      </button></router-link
    > -->
    <div class="mt-2"></div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
// require("@fullcalendar/core/main.css");
// import { DatePicker } from "v-calendar";
import { mapGetters } from "vuex";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
// import "@fullcalendar/core/vdom";
import axios from "axios";
export default {
  name: "calendar",
  data() {
    // let date = new Date();
    // date.setMinutes(0, 0, 0);
    return {
      userRole: localStorage.getItem("role"),
      modalShow: false,
      titles: [],
      date: [],
      startTime: [],
      endeTime: [],
      startDates: [],
      endDates: [],
      calendarOptions: {
        plugins: [
          // plugins must be defined in the JS
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          listPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev today next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        // eventResizableFromStart: true,
        // weekends: false,
        selectable: true,
        validRange: {
          start: "00:01",
          end: "23:59",
        },
        // eventClick: function (view) {
        //   this.modalShow = true;
        // }.bind(this),
        events: [],
        // dayClick: true,
        // events: this.EVENTS,
        // initialView: "dayGridMonth",
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        // editable: true,
        // selectMirror: true,
        dayMaxEvents: true,
        // weekends: true,
        // select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        // eventsSet: this.handleEvents,
        // dateClick: this.eventClick,
      },
      //   timezone: "",
      //   attributes: [
      //     {
      //       dot: true,
      //       dates: [],
      //     },
      //     {
      //       dot: "red",
      //       dates: [],
      //     },
      //     {
      //       dates: [],
      //     },
      //   ],
    };
  },
  components: {
    // DatePicker
    FullCalendar,
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
  computed: {
    ...mapGetters(["EVENTS"]),
  },
  methods: {
    // reSchedule() {
    //   for (let i = 0; i < this.titles.length; i++) {
    //     var eventDate = this.startDates[i].substring(0, 10);
    //     var eventStartTime = this.startDates[i].substring(11, 19);
    //     var eventEndTime = this.endDates[i].substring(11, 19);

    //     var newEventDate = this.calendarOptions.events[i].start.substring(
    //       0,
    //       10
    //     );
    //     var newEventStartTime = this.calendarOptions.events[i].start.substring(
    //       11,
    //       19
    //     );
    //     var newEventEndTime = this.calendarOptions.events[i].end.substring(
    //       11,
    //       19
    //     );
    //     console.log(newEventDate);
    //     if (this.eventDate) {
    //     }
    //   }
    // },
    // eventClick: function (view) {
    //   this.modalShow = true;
    // },
    // handleDateSelect(arg) {
    //   console.log(arg);
    // },
    // toggleWeekends() {
    //   this.calendarWeekends = !this.calendarWeekends; // update a property
    // },
    // gotoPast() {
    //   let calendarApi = this.$refs.fullCalendar.getApi(); // from the ref="..."
    //   calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
    // },
    // handleDateClick(arg) {
    //   alert("date click! " + arg.dateStr);
    // },
    handleEventClick(arg) {
      console.log(arg.event);
      console.log(arg.event.end);
      // console.log(arg.event.end);
    },
  },
  created() {
    axios
      .get(
        "https://mambly-backend-app.herokuapp.com/scheduling/instructor/instructor-course?email=" +
          localStorage.getItem("email")
      )
      .then((response) => {
        console.log(response);
        this.lessons = response.data;
        // console.log(this.lessons);
      })
      .then((response) => {
        for (let i = 0; i < this.lessons.length; i++) {
          this.date[i] = this.lessons[i].date;
          this.startTime[i] = this.lessons[i].startTime;
          this.endeTime[i] = this.lessons[i].endeTime;
          this.startDates[i] =
            this.lessons[i].date + "T" + this.lessons[i].startTime;
          this.endDates[i] =
            this.lessons[i].date + "T" + this.lessons[i].endTime;
          this.titles[i] = this.lessons[i].topic;
          var event = {
            title: this.titles[i],
            start: this.startDates[i],
            end: this.endDates[i],
          };
          this.calendarOptions.events.push(event);
        }
        this.lessonNumber = this.lessons.length;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style src="@/css/styles.css">
/* @import "../node_modules/@fullcalendar/core/min.css"; */
@import "~@fullcalendar/daygrid/main.css";
@import "~@fullcalendar/timegrid/main.css";
@import "~@fullcalendar/interaction/main.css";
@import "~@fullcalendar/list/main.css";
@import "~@fullcalendar/common/main.css";
</style>
