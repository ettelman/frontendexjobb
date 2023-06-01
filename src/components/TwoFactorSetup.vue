<template>
  <button @click="skipTwoFactor">Skippa tvåstegsinloggning</button>
  <h1>Registrera tvåstegsinloggning</h1>
  <div class="twofactor">
    
    <form v-if="!qrCodeImageUrl" @submit.prevent="setupTwoFactor">
      <div class="infobox">
        <p>För att registrera tvåstegsinloggning behöver du en authenticator app. Det finns många att välja mellan på både android eller iphone appstore. Sök på "Authenticator" <br>
        Om du vill ha en authenticator i din webbläsare kan du använda <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US" class="solo-link">Google Authenticator</a></p>
      </div>   
      <div>
        <label for="email">Epostadress:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Lösenord:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <button>Initiera tvåstegsinloggning</button>
    </form>
    <div v-if="qrCodeImageUrl" class="infobox">
        <p>Skanna QR-koden med din authenticator applikation</p>
      </div> 
    <img v-if="qrCodeImageUrl" :src="qrCodeImageUrl" alt="QR-kod" />
    <form v-if="qrCodeImageUrl" @submit.prevent="verifyTwoFactor">
      
      <div>
        <h2>Verifiera tvåstegsinloggning (frivilligt)</h2>
        <label for="passw">Engångslösenord</label>
        <input type="text" id="passw" v-model="token" />
      </div>
      <button>Verifiera tvåstegsinloggning</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      email: this.sentEmail,
      password: this.sentPassword,
      qrCodeImageUrl: "",
      token: "",
      error: "",
    };
  },
  props: {
    sentEmail: {
      type: String, 
      required: false,
    },
    sentPassword: {
      type: String, 
      required: false,
    } },
  methods: {
    // using setup route to setup twofactor. The response includes a qrCodeImageUrl
    async setupTwoFactor() {
      try {
        const response = await axios.post("/setup", { email: this.email, password: this.password });
        this.qrCodeImageUrl = response.data.qrCodeImageUrl;
      } catch (error) {
        this.error = "Ett fel uppstod vid tvåstegsinloggning, var god försök igen senare.";
      }
    },
    // verifying the token
    async verifyTwoFactor() {
      try {
        const response = await axios.post("/verify", {
          email: this.email,
          token: this.token,
        });

        if (response.data.status === "success") {
          this.$router.push("/");
        } else {
          this.error = "Verifikationen misslyckades. Försök igen";
        }
      } catch (error) {
        this.error = "Något gick fel vid verifikationen. Var god försök igen senare";
      }
    },
    // simple skip function sending the user to the loginscreen
    skipTwoFactor() {
      this.$router.push("/");
    }
  },
};
</script>
  
<style scoped>
.twofactor {
  width: 400px;
  margin: 0 auto;
}

</style>