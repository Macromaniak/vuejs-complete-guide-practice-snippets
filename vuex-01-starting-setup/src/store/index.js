import { createStore } from 'vuex';

import counterModule from './counterModule/index.js';

const store = createStore({
  modules: {
    counter: counterModule,
  },
  state() {
    return {
      counter: 0,
      isLoggedIn: false,
    };
  },
  mutations: {
    updateLoginStatus(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
  getters: {
    loginStatus(state) {
      return state.isLoggedIn;
    },
  },
  actions: {
    toggleLogin(context) {
      context.commit('updateLoginStatus');
    },
  },
});

export default store;
