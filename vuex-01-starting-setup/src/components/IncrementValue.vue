<template>
  <h3>{{ $store.getters.counterValue }}</h3>
  <button @click="increment">increment</button>
</template>

<script>
export default {
  methods: {
    increment() {
      this.$store.dispatch('increment');
    },
  },
};
</script>
