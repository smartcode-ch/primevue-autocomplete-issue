import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

createApp(App)
  .use(PrimeVue)
  .mount('#app')
