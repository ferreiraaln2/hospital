<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        class="toast" 
        :class="'toast-' + toast.type"
      >
        <div class="toast-content">
          <i :class="getIconClass(toast.type)"></i>
          <span>{{ toast.message }}</span>
        </div>
        <button @click="removeToast(toast.id)" class="toast-close">×</button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'ToastNotification',
  data() {
    return {
      toasts: [],
      nextId: 1
    }
  },
  methods: {
    getIconClass(type) {
      switch (type) {
        case 'success': return 'fas fa-check-circle'
        case 'error': return 'fas fa-exclamation-circle'
        case 'warning': return 'fas fa-exclamation-triangle'
        case 'info': return 'fas fa-info-circle'
        default: return 'fas fa-bell'
      }
    },
    addToast(message, type = 'info', duration = 3000) {
      const id = this.nextId++
      this.toasts.push({ id, message, type })
      
      if (duration > 0) {
        setTimeout(() => {
          this.removeToast(id)
        }, duration)
      }
      
      return id
    },
    removeToast(id) {
      const index = this.toasts.findIndex(toast => toast.id === id)
      if (index !== -1) {
        this.toasts.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: white;
  animation: slide-in 0.3s ease-out;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toast-success {
  background-color: #42b983;
}

.toast-error {
  background-color: #e74c3c;
}

.toast-warning {
  background-color: #f39c12;
}

.toast-info {
  background-color: #3498db;
}

.toast-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.toast-close:hover {
  opacity: 1;
}

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s;
}

.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes slide-in {
  from {
    transform: translateX(30px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style> 