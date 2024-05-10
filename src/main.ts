import './assets/main.css'
// ---
import Button from 'primevue/button'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'

import {createApp} from 'vue'
import App from './App.vue'
import {router} from './router/router'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {ripple: true})
app.component('Button', Button)
app.mount('#app')
