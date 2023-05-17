import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import './assets/styles.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


const app = createApp(App);
export const authenticated = ref(false);
app.use(PrimeVue);

createApp(App).use(router).mount('#app')
