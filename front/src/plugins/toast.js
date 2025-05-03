import { createApp } from 'vue'
import ToastNotification from '@/components/ToastNotification.vue'

export default {
  install: (app) => {
    // Cria uma instância do componente Toast
    const toastContainer = document.createElement('div')
    document.body.appendChild(toastContainer)
    
    const toastApp = createApp(ToastNotification)
    const toast = toastApp.mount(toastContainer)
    
    // Adiciona métodos ao objeto global
    app.config.globalProperties.$toast = {
      success(message, duration) {
        return toast.addToast(message, 'success', duration)
      },
      error(message, duration) {
        return toast.addToast(message, 'error', duration)
      },
      warning(message, duration) {
        return toast.addToast(message, 'warning', duration)
      },
      info(message, duration) {
        return toast.addToast(message, 'info', duration)
      }
    }
  }
} 