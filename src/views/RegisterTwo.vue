<template>
  <h1 class="top-h">Registrera ny användare</h1>
    <div class="login">
      <div class="infobox">
        <p>Din epost måste vara i formatet namn@domän.se <br>
        Ditt lösenord måste vara minst 6 tecken långt.<br />Alla fält är obligatoriska</p>
      </div>
      <form @submit.prevent="register" v-if="!showTwoFactorSetup">
        <div>
          <label for="email">Epostadress:</label>
      <input type="email" id="email" v-model="email" @blur="validateEmail"/>
      <p class="error" v-if="emailError">{{ emailError }}</p>
    </div>
    <div>
      <label for="password">Lösenord</label>
      <input type="password" id="password" v-model="password"  @input="checkPasswordStrength"/>
      Lösenordsstyrka: <span :class="passwordStrength.class">{{ passwordStrength.message }}</span>
      <label class="top-margin" for="confirm">Upprepa lösenord</label>
      <input type="password" id="confirm" v-model="confirm"  />
    </div>
    
    
    
      <button type="submit">Registrera</button>
     
    </form>
    <two-factor-setup v-else :email="this.email" />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div class="flex">
      Är du redan registrerad? <router-link class="solo-link" to="/">Logga in</router-link>
    </div>
    <div class="infobox">
        <p>När du registrerar dig lagras din e-postadress i vår databas. Genom att skapa en ny användare accepterar du detta. <br />
        När du loggar in sparas din epostadress i en kaka för att hålla dig inloggad på servern</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import TwoFactorSetup from "../components/TwoFactorSetup.vue";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
        confirm: "",
        errorMessage: "",
        successMessage: "",
        emailError: "",
        showTwoFactorSetup: false,
        validEmail: false,
        passwordStrength: {
        class: "",
        message: "",
      }
      };
    },
    components: {
  TwoFactorSetup,
},
    methods: {
      // function to register user. Using basic checks for password length and also comparis password to confirm password
      // using function validate email
      async register() {
        if (!this.validEmail || this.password.length < 6 || this.password !== this.confirm) {
          if (this.password.length < 6) this.errorMessage = "Ditt lösenord måste vara minst 6 tecken långt";
          if (this.password !== this.confirm) this.errorMessage = "Lösenorden matchar inte";
          return;
        }
        // passed the checks, calling register post route and then passing in the twofactorsetup component
        try {
          await axios.post("/register", { email: this.email, password: this.password });
          this.errorMessage = "";
          this.successMessage = "Registreringen är nu klar. Du kan logga in.";
          this.showTwoFactorSetup = true;
        } catch (error) {
          console.error("Error during registration:", error);
          this.errorMessage = "Ett fel inträffade vid registrering, kontakta supporten.";
        }
      },
      // Validating email with regex for emails
      validateEmail() {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(this.email)) {
      this.emailError = 'Epostadressen måste vara i formatet "namn@domän.se"';
    } else {
      this.emailError = "";
      this.validEmail = true;
    }
  },
  // Checking password strenth on input with regex
  checkPasswordStrength() {
      const strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
      );
      const mediumRegex = new RegExp(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
      );

      if (strongRegex.test(this.password)) {
        this.passwordStrength.class = "strong";
        this.passwordStrength.message = "Starkt";
      } else if (mediumRegex.test(this.password)) {
        this.passwordStrength.class = "medium";
        this.passwordStrength.message = "Medium";
      } else {
        this.passwordStrength.class = "weak";
        this.passwordStrength.message = "Svagt";
      }
    },
    },
  };
  </script>
  
  <style scoped>
  .strong {
  color: #0f9d58;
  background-color: black;
  padding: 0.2rem;
}
.medium {
  color: #f4b400;
  background-color: black;
  padding: 0.2rem;
}
.weak {
  color: #db4437;
  background-color: black;
  padding: 0.2rem;
}
  .error-message {
    color: red;
    margin-top: 1rem;
  }
  
  .success-message {
    color: green;
    margin-top: 1rem;
  }
.register {
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

form {
  display: flex;
  flex-direction: column;
}

button {
  border-radius: 20px;
  margin-right: 2rem;
}
.flex {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
.error {
  color: #b71c1c;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 15px;
}
.top-margin {
 margin-top: 2rem;
}
  </style>