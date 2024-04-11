const counterModule = {
  state() {
    return {
      counter: 0,
    };
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    increase(state, payload) {
      state.counter += payload.value;
    },
  },
  actions: {
    increase(context, payload) {
      context.commit({
        type: 'increase',
        value: payload.value,
      });
    },
    increment(context) {
      context.commit('increment');
    },
  },
  getters: {
    counterValue(state) {
      return state.counter;
    },
    normalizedCounterValue(_, getters) {
      return getters.counterValue > 100 ? 100 : getters.counterValue;
    },
  },
};

export default counterModule;