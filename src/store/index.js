import Vue from 'vue';
import Vuex from 'vuex';
import api from '../services/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    baseRates: {},
  },
  mutations: {
    /**
     * Saves state to store
     */
    saveBaseRate: (state, data) => {
      state.baseRates = data;
    },
  },
  getters: {
    /**
     * Gets state from store
     */
    getBaseRates: (state) => state.baseRates,
  },
  actions: {
    /**
     * Fetches rates from API
     *
     */
    async fetchBaseRates({ commit }) {
      try {
        const response = await api.get(`latest?access_key=${process.env.VUE_APP_RATES_KEY}`);
        commit('saveBaseRate', response.data);
        return Promise.resolve(response);
      } catch (error) {
        return error;
      }
    },
  },
  modules: {},
});
