<template>
  <div class="top-h"><h1 class="white-h1">Logga in med</h1> <img src="../assets/FrejaWhite.svg" alt="Freja" class="freja-logo"></div>
  
 <div class="login"> 
    <form @submit.prevent="submitForm">
      <label for="login">Epost eller personnummer:</label><br />
      <input id="login" v-model="login" type="text" :disabled="isLoading" required><br>
      
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Laddar..." : "Logga in" }}
      </button>
    </form>

    <div :class="{ 'success': isSuccess, 'error': !isSuccess }" class="big-msg" v-if="message">
      {{ message }}
    </div>
  </div>
  <div class="infobox margin">
        <p>Ange E-post eller personnummer i fältet. Använd sedan Freja Eid mobilapplikation för att identifiera dig. Epost måste vara i formatet
          namn@domän.se och personnummer vara i formatet ååååmmddxxxx (exempelvis: 196303053355)
        </p>
      </div>
      <div class="login">
      <router-link class="nav-link" to="/"><i class="pi pi-chevron-left"></i>Tillbaka</router-link></div>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
export default {
  data() {
    return {  
      login: "",
      message: "",
      isLoading: false,
      isSuccess: false,
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    // function called when form is submitted. Waiting for authentication from Freja API
    async submitForm() {
      this.isLoading = true;
      this.isSuccess = true;
      this.message = "Öppna Freja Eid på din mobiltelefon";
      
      // Determine type based on if there is @ or not in the login field.
      const type = this.login.includes("@") ? "email" : "ssn";

      try {
        
        const response = await axios.post("/freja", {
          login: this.login,
          type: type,
        });
        // this is where the API responded and user needs to use freja on cellphone
        this.isLoading = false;

        if (response.data.status === "success") {
          // response successful and user is now logged in. JWT has been sent to user
          this.$router.push('/secret')
        } else {
          // The reponse wasnt successful. Sending error to user
          this.message = "Fel vid inloggning, svar från freja: " + response.data.status;
        }
      } catch (error) {
        // Credentials were wrong
        this.isLoading = false;
        this.message = "Fel epost eller personnummer";
        this.isSuccess = false;
        console.error(error);
      }
    },
  },
};
</script>

<style>
.freja-logo {
  max-width: 200px;
}
.white-h1 {
  color:white;
  margin-top: 0;
}
.margin {
  margin: 0.5rem;
}

</style>