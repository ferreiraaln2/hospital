<template>
  <div class="sector-form">
    <div class="page-header">
      <h1>{{ isEditing ? 'Editar Setor' : 'Novo Setor' }}</h1>
      <button @click="goBack" class="btn btn-secondary">
        <i class="fas fa-arrow-left"></i> Voltar
      </button>
    </div>
    
    <div class="card">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
      
      <form v-else @submit.prevent="saveSector" class="form">
        <div class="form-group">
          <label for="name">Nome do Setor:</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            required
            placeholder="Ex: Cardiologia"
            :class="{ 'is-invalid': errors.name }"
          >
          <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
        </div>
        
        <div class="form-group">
          <label for="description">Descrição:</label>
          <textarea 
            id="description" 
            v-model="form.description" 
            rows="4"
            placeholder="Descreva o setor e suas funções"
            :class="{ 'is-invalid': errors.description }"
          ></textarea>
          <div v-if="errors.description" class="invalid-feedback">{{ errors.description }}</div>
        </div>
        
        <div class="form-actions">
          <button type="button" @click="goBack" class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary" :disabled="saving">
            <span v-if="saving">Salvando...</span>
            <span v-else>Salvar</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectorForm',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      errors: {
        name: '',
        description: ''
      },
      loading: false,
      saving: false
    }
  },
  computed: {
    isEditing() {
      return !!this.id
    }
  },
  created() {
    if (this.isEditing) {
      this.fetchSector()
    }
  },
  methods: {
    async fetchSector() {
      this.loading = true
      try {
        const sectors = await this.$store.dispatch('fetchSectors')
        const sector = sectors.find(s => s.id === parseInt(this.id))
        if (sector) {
          this.form = { ...sector }
        } else {
          this.$toast.error('Setor não encontrado')
          this.goBack()
        }
      } catch (error) {
        this.$toast.error('Erro ao carregar setor: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    validateForm() {
      let isValid = true
      this.errors = {
        name: '',
        description: ''
      }
      
      if (!this.form.name.trim()) {
        this.errors.name = 'O nome do setor é obrigatório'
        isValid = false
      } else if (this.form.name.length < 3) {
        this.errors.name = 'O nome deve ter pelo menos 3 caracteres'
        isValid = false
      }
      
      if (this.form.description && this.form.description.length > 500) {
        this.errors.description = 'A descrição não pode ter mais de 500 caracteres'
        isValid = false
      }
      
      return isValid
    },
    async saveSector() {
      if (!this.validateForm()) {
        return
      }
      
      this.saving = true
      try {
        if (this.isEditing) {
          await this.$store.dispatch('updateSector', {
            id: this.id,
            sectorData: this.form
          })
          this.$toast.success('Setor atualizado com sucesso!')
        } else {
          await this.$store.dispatch('createSector', this.form)
          this.$toast.success('Setor criado com sucesso!')
        }
        this.goBack()
      } catch (error) {
        this.$toast.error('Erro ao salvar setor: ' + error.message)
      } finally {
        this.saving = false
      }
    },
    goBack() {
      this.$router.push('/sectors')
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #42b983;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.form {
  max-width: 800px;
  margin: 0 auto;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style> 