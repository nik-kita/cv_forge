import './assets/main.css'
// ---
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'
import {createApp} from 'vue'
import GLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router/router'

const app = createApp(App)

app.use(GLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})
app.use(router)
app.use(PrimeVue, {ripple: true})
app.component('Button', Button)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.mount('#app')
