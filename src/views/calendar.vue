<template>
  <div id="calendar">
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
    <router-link to="/scheduling" class="text-decoration-none text-center"
      ><button class="btn btn-primary" href="#scheduling">
        Enroll
      </button></router-link
    >
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
export default {
  name: "calendar",
  data() {
    // let date = new Date();
    // date.setMinutes(0, 0, 0);
    return {
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
        weekends: false,
        selectable: true,
        validRange: {
          start: "00:01",
          end: "23:59",
        },
        // dayClick: true,
        events: this.EVENTS,
        // initialView: "dayGridMonth",
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        // editable: true,
        // selectMirror: true,
        // dayMaxEvents: true,
        // weekends: true,
        select: this.handleDateSelect,
        // eventClick: this.handleEventClick,
        // eventsSet: this.handleEvents,
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
    handleDateSelect(arg) {
      console.log(arg);
      // this.$store.dispatch("addevent", {
      //   title: "asd",
      //   start: arg.start,
      //   end: arg.end,
      //   allday: arg.allDay,
      // });
    },
    toggleWeekends() {
      this.calendarWeekends = !this.calendarWeekends; // update a property
    },
    gotoPast() {
      // Admin Part
      let calendarApi = this.$refs.fullCalendar.getApi(); // from the ref="..."
      calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
    },
    handleDateClick(arg) {
      if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
        this.calendarEvents.push({
          // add new event data
          title: "New Event",
          start: arg.date,
          allDay: arg.allDay,
        });
      }
    },
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
