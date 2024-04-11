<template>
  <base-dialog :show="!!error" title="An error occured!" @close="handleDialogClose">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests">
        <Request-item
          v-for="request in requests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        ></Request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';

export default {
  data(){
    return {
      isLoading: false,
      error: null
    }
  },
  created() {
    this.loadRequests();
  },
  computed: {
    requests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try{
        await this.$store.dispatch('requests/loadRequests');
      } catch(error) {
        this.error = error.message || 'something went wrong!';
      }
      this.isLoading = false;
    },
    handleDialogClose() {
      this.error = null;
    }
  },
  components: { RequestItem },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
