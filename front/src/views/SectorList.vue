<template>
  <div class="sector-list">
    <div class="page-header">
      <h1>Gerenciamento de Setores</h1>
      <router-link to="/sectors/new" class="btn btn-primary">
        <i class="fas fa-plus"></i> Novo Setor
      </router-link>
    </div>
    
    <div class="card">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>Carregando setores...</p>
      </div>
      
      <div v-else-if="error" class="alert alert-danger">
        <i class="fas fa-exclamation-circle"></i> {{ error }}
      </div>
      
      <div v-else-if="sectors.length === 0" class="empty-state">
        <i class="fas fa-folder-open"></i>
        <h3>Nenhum setor encontrado</h3>
        <p>Clique no botão "Novo Setor" para adicionar um setor.</p>
      </div>
      
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th class="actions-column">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sector in sectors" :key="sector.id">
            <td>{{ sector.id }}</td>
            <td>{{ sector.name }}</td>
            <td>{{ sector.description }}</td>
            <td class="actions-column">
              <div class="actions-buttons">
                <router-link :to="`/sectors/edit/${sector.id}`" class="btn btn-secondary btn-sm">
                  <i class="fas fa-edit"></i> Editar
                </router-link>
                <button @click="confirmDelete(sector)" class="btn btn-danger btn-sm">
                  <i class="fas fa-trash"></i> Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SectorList',
  data() {
    return {
      loading: false,
      error: null
    }
  },
  computed: {
    ...mapGetters({
      sectors: 'getSectors'
    })
  },
  created() {
    this.fetchSectors()
  },
  methods: {
    async fetchSectors() {
      this.loading = true
      this.error = null
      try {
        await this.$store.dispatch('fetchSectors')
      } catch (error) {
        this.error = 'Erro ao carregar setores: ' + error.message
      } finally {
        this.loading = false
      }
    },
    confirmDelete(sector) {
      if (confirm(`Tem certeza que deseja excluir o setor "${sector.name}"?`)) {
        this.deleteSector(sector.id)
      }
    },
    async deleteSector(id) {
      try {
        await this.$store.dispatch('deleteSector', id)
        this.$toast.success('Setor excluído com sucesso!')
      } catch (error) {
        this.$toast.error('Erro ao excluir setor: ' + error.message)
      }
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

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert i {
  margin-right: 0.5rem;
}

.data-table {
  width: 100%;
}

.actions-column {
  width: 200px;
  text-align: center;
}

.actions-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}
</style> 