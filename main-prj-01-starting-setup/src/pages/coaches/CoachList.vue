<template>
  <base-dialog
    :show="!!error"
    title="An error occured!"
    @close="handleDialogClose"
  >
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @filter-updated="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button link v-if="!isLoggedIn" to="/auth?redirect=register">Login to register as coach</base-button>
        <base-button to="/register" link v-if="!isCoach && !isLoading && isLoggedIn">Register as coach</base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstName="coach.firstName"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
          >{{ coach.firstName }}</coach-item
        >
      </ul>
      <h3 v-else>There are no coaches available!</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: {
    CoachItem,
    CoachFilter,
  },
  created() {
    this.loadCoaches();
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.filters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.filters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.filters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    setFilters(updatedFilters) {
      // console.log(updatedFilters);
      this.filters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleDialogClose() {
      this.error = null;
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
