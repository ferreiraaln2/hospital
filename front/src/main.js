import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ToastPlugin from './plugins/toast'

// Importar Font Awesome
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ToastPlugin)

app.mount('#app')
