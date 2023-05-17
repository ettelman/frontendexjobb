<template>
  <div id="app">
    <div class="top">
      <img src="./assets/bonnier.png" alt="Logotyp för Bonnier News" class="logo"/>
      <a href="#" class="nav-link mobile-offset" @click="toggleTheme"><i class="pi pi-tag"></i>Ljus/mörkt tema</a>
    </div>
    <div class="container">
    <router-view></router-view>
    
  </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    RouterView,
  },
  methods: {
    toggleTheme() {
      document.body.classList.toggle('dark');
    },
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
@media (max-width: 900px) {
#app {
  padding: 0.1rem;
}
}

</style>