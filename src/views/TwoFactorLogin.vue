<template>
  <h1 class="top-h">Logga in</h1>
  <div class="login"> 
    <form @submit.prevent="login" novalidate>
      <div>
        <label for="email">Epostadress:</label>
        <input type="email" id="email" v-model="email" @blur="checkTwoFactor" />
        <p class="error" v-if="emailError">{{ emailError }}</p>
      </div>
      <div>
        <label for="password">Lösenord:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div v-if="twoFactorAuth">
        <label for="twofactortoken">Engångslösenord:</label>
        <input type="text" id="twofactortoken" v-model="twoFactorToken" />
      </div>
      
      <button>Logga in</button>
      <p class="error" v-if="error">{{ error }}</p>
    </form>
    
    <router-link class="nav-link" to="/reset"><i class="pi pi-question-circle"></i>Jag har glömt mitt lösenord</router-link><br />
    <router-link class="nav-link" to="/freja-eid-login"><i class="pi pi-key"></i>Fortsätt med med Freja eID</router-link><br />
    <router-link class="nav-link" to="/registertwo"><i class="pi pi-user"></i>Registrera ny användare </router-link><br />
      
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import { onMounted } from 'vue';
import { RouterLink } from "vue-router";
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: "",
      password: "",
      twoFactorToken: "",
      twoFactorAuth: false,
      error: "",
      validEmail: false,
      emailError: "",
    };
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      axios.get("/authenticate")
        .then(response => {    
          router.push("/secret");  
        })
        .catch(error => {
          return;
        });
    });
  },
  components: {
    RouterLink,
  },
  methods: {
    // checking for two factor login @ blur
    async checkTwoFactor() {
      try {
        const response = await axios.post("/check", { email: this.email });
        this.twoFactorAuth = response.data.twoFactor;
      } catch (error) {
        console.error("Error during checking two-factor authentication:", error);
      }
    },
    // function for user login. Checking for empty fields
    async login() {
      this.validateEmail();
      if (!this.validEmail || this.password.length < 6) {
          if (this.password.length < 6) this.error = "Ditt lösenord måste vara minst 6 tecken långt";
          return;
        }
      try {
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password,
          twoFactorToken: this.twoFactorToken,
        });

        if (response.data.status === "success") {
          this.$router.push("/secret");
        } else {
          this.error = response.data.error || "Fel epost och/eller lösenord";
        }
      } catch (error) {
        this.error = "Inloggningen misslyckades, var god försök igen senare.";
      }
    },
    // validate email
    validateEmail() {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Epostadressen måste vara i formatet "namn@domän.se"';
    } else {
      this.emailError = "";
      this.validEmail = true;
    }
  }
  },
};
</script>

<style scoped>


form {
  display: flex;
  flex-direction: column;
}
button {
  border-radius: 20px;
  width: 100%;
  margin-bottom: 2rem;
  font-size: 1.2em;
}
.error {
  padding-top: 0;
  margin-top: 0;
}
</style>