<template>
  <base-dialog :show="!!error" title="An error occured!" @close="handleDialogClose">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <h2>Register as a coach!</h2>
      <base-spinner v-if="isLoading"></base-spinner>
      <coach-reg-form @save-data="saveData"></coach-reg-form>
    </base-card>
  </section>
</template>

<script>
import CoachRegForm from '../../components/coaches/CoachRegForm.vue';
export default {
  components: {
    CoachRegForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async saveData(formData) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/addCoach', formData);
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
      this.$router.replace('/coaches');
    },
    handleDialogClose() {
      this.error = null;
    }
  },
};
</script>
