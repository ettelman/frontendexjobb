<template>
 <div v-if="showCookieMessage" id="cookieMessage" class="cookie-banner">
    <div class="cookie-content">
      <p>Vi använder cookies på vår webbplats för att förbättra din användarupplevelse och hålla dig inloggad mellan olika webbplatser. </p>
      <button @click="acceptCookies">Godkänn</button>
    </div>
  </div>
  <div id="app">
    <div class="top">
      <img src="./assets/bonnier.png" alt="Logotyp för Bonnier News" class="logo"/>
      <a href="#" class="nav-link mobile-offset" @click="toggleTheme"><i class="pi pi-tag"></i>Ljust/mörkt tema</a>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import { ref } from "vue";

export default {
  name: "App",
  components: {
    RouterView,
  },
  setup() {
    const showCookieMessage = ref(!localStorage.getItem("cookiesAccepted"));

    const acceptCookies = () => {
      localStorage.setItem("cookiesAccepted", "true");
      showCookieMessage.value = false;
    }

    const toggleTheme = () => {
      document.body.classList.toggle("dark");
    }

    return { showCookieMessage, acceptCookies, toggleTheme };
  },
};
</script>


<style>
#app {
  text-align: center;
  padding: 1rem;
  max-width: 1000px;
  margin: 0 auto;
}
.logo {
  display: block;
}
.cookie-banner {
  position: fixed;
  bottom: 0;
  max-width: 1000px;
  min-width: 50%;
  background-color: rgba(0,0,0,0.9);
  z-index: 10000;
}
.cookie-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
  text-align: center;
  color: white;
}
.cookie-banner p {
  display: inline;
}
.cookie-banner button {
  
  padding: 5px 10px;
}
@media (max-width: 900px) {
#app {
  padding: 0.1rem;
}
}
</style>