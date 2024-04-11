<template>
  <base-dialog :show="!!error || !!resgiterSuccess" :title="dialogTitle" @close="handleDialogClose">
    {{ error || resgiterSuccess }}
  </base-dialog>
  <base-spinner v-if="isLoading"></base-spinner>
  <form @submit.prevent="formSubmit" v-else>
    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" name="message" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">Please enter valid data</p>
    <div class="actions">
      <base-button>Send request</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      resgiterSuccess: null,
      dialogTitle: null,
      email: '',
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    async formSubmit() {
      if (!this.checkValidity()) return;
      else {
        const data = {
          coachId: this.$route.params.id,
          email: this.email,
          message: this.message,
        };
        try {
          this.isLoading = true;
          await this.$store.dispatch('requests/contactCoach', data);
        } catch (error) {
          this.dialogTitle = 'Something went wrong!'
          this.error = error.message || 'Registration failed';
        }

        if(this.error === null)
        {
          this.dialogTitle = 'Success!';
          this.resgiterSuccess = 'Request sent succesfully!';
        }

        this.isLoading = false;
      }
    },
    checkValidity() {
      if (this.email === '' || !this.email.includes('@') || this.message === '')
        this.formIsValid = false;
      else this.formIsValid = true;

      return this.formIsValid;
    },
    handleDialogClose() {
      if(this.error === null)
      {
        this.$router.replace('/coaches');
      }     
      this.error = null;
      this.resgiterSuccess = null;
      this.dialogTitle = null;
    }
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
