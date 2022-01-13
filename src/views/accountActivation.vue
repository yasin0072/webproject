<template>
  <div :v-show="userRole == 'admin'">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <!-- <th scope="col">Role</th> -->
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in accountNumber" :key="index">
          <td>{{ name[index - 1] }} {{ surname[index - 1] }}</td>
          <td>{{ email[index - 1] }}</td>
          <!-- <td>{{ role[index - 1] }}</td> -->
          <td>
            <button @click="activate(index - 1)" class="btn btn-primary">
              Activate
            </button>
          </td>
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
      name: [],
      surname: [],
      accountNumber: 0,
      email: [],
      //   role: [],
      accounts: [],
    };
  },
  methods: {
    activate(index) {
      axios
        .post(
          "https://mambly-backend-app.herokuapp.com/scheduling/admin/activate-user?email=" +
            this.accounts[index].email
        )
        .catch((error) => {
          console.log(error);
        });
      // // // // //   // post axios email[index]

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
  },
  created() {
    // this.userRole = localStorage.getItem("role");
    axios
      .get(
        "https://mambly-backend-app.herokuapp.com/scheduling/admin/inactivated-users"
      )
      .then((response) => {
        console.log(response);
        this.accounts = response.data;
        // console.log(this.lessons);
      })
      .then((response) => {
        for (let i = 0; i < this.accounts.length; i++) {
          this.name[i] = this.accounts[i].name;
          this.surname[i] = this.accounts[i].surname;
          this.email[i] = this.accounts[i].email;
          //   this.role[i] = this.accounts[i].role;
        }
        this.accountNumber = this.accounts.length;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped></style>
