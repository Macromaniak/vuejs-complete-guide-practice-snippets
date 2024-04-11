<template>
  <base-container title="Vuex" v-if="isAuthenticated">
    <increment-value></increment-value>
    <increase-value></increase-value>
  </base-container>
  <base-container title="auth">
    <auth></auth>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import IncrementValue from './components/IncrementValue.vue';
import IncreaseValue from './components/IncreaseValue.vue';
import Auth from './components/Auth.vue';

export default {
  components: {
    BaseContainer,
    IncrementValue,
    IncreaseValue,
    Auth,
  },
  methods: {},
  computed: {
    isAuthenticated() {
      return this.$store.getters.loginStatus;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
