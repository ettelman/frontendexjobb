<template>
    <div>
      <h1 class="top-h">Inloggad</h1>
      Inloggad som: {{ userEmail }} <br />
      <button @click="logout">Logga ut</button>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import axios from "axios";
  
  export default {
    // getting user email on setup, just for testing purposes
    // email is picked up from JWT on server side
    setup() {
      const userEmail = ref("");
  
      axios.get("/authenticate")
        .then(response => {
          userEmail.value = response.data.email;
        })
        .catch(error => {
          console.error("Felmeddelande:", error);
        });
  
      return {
        userEmail
      }
    },
    methods: {
    logout() {
      axios.post("/logout", {}, { withCredentials: true })
        .then(response => {
          console.log(response);
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
  </script>