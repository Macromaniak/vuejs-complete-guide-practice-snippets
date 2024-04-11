<template>
    <h3>Normalized value {{ $store.getters.normalizedCounterValue }}</h3>
    <button @click="increase(10)">Add 10</button>
    <button @click="increase(5)">Add 5</button>
</template>

<script>
export default {
    methods: {
        increase(val) {
            this.$store.dispatch('increase', {value: val});
        }
    }
}
</script>