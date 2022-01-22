import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'

import './index.css'

const app = createApp(App)
app.use(router)
app.use(Notifications)
app.isCustomElement = tag => tag === 'ion-icon'
app.mount('#app')

// https://missingdocuments.herokuapp.com