import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    sectors: []
  },
  getters: {
    getSectors: state => state.sectors
  },
  mutations: {
    SET_SECTORS(state, sectors) {
      state.sectors = sectors
    },
    ADD_SECTOR(state, sector) {
      state.sectors.push(sector)
    },
    UPDATE_SECTOR(state, updatedSector) {
      const index = state.sectors.findIndex(s => s.id === updatedSector.id)
      if (index !== -1) {
        state.sectors.splice(index, 1, updatedSector)
      }
    },
    DELETE_SECTOR(state, sectorId) {
      state.sectors = state.sectors.filter(s => s.id !== sectorId)
    }
  },
  actions: {
    async fetchSectors({ commit }) {
      try {
        const response = await axios.get('/api/sectors')
        commit('SET_SECTORS', response.data)
        return response.data
      } catch (error) {
        console.error('Error fetching sectors:', error)
        throw error
      }
    },
    async createSector({ commit }, sectorData) {
      try {
        const response = await axios.post('/api/sectors', sectorData)
        commit('ADD_SECTOR', response.data)
        return response.data
      } catch (error) {
        console.error('Error creating sector:', error)
        throw error
      }
    },
    async updateSector({ commit }, { id, sectorData }) {
      try {
        const response = await axios.put(`/api/sectors/${id}`, sectorData)
        commit('UPDATE_SECTOR', response.data)
        return response.data
      } catch (error) {
        console.error('Error updating sector:', error)
        throw error
      }
    },
    async deleteSector({ commit }, id) {
      try {
        await axios.delete(`/api/sectors/${id}`)
        commit('DELETE_SECTOR', id)
      } catch (error) {
        console.error('Error deleting sector:', error)
        throw error
      }
    }
  }
}) 