<template>
    <button v-if="!isAuthenticated" @click="updateLoginStatus">Login</button>
    <button v-if="isAuthenticated" @click="updateLoginStatus">Logout</button>
</template>

<script>
export default {
    methods: {
        updateLoginStatus() {
            this.$store.dispatch('toggleLogin');
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.loginStatus;
        }
    }
}
</script>