import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: 0
  },
  mutations: {
    getId: (state, payload) => {
      state.id = payload;
    }
  },
  actions: {
    getId:({commit},payload)=>{
      commit('getId',payload);
    }
  },
  plugins: [createPersistedState()],
})
