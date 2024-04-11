<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Wanna hire? Reach out!!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :type="area"
        :title="area"
        :key="area"
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      currentCoach: null,
    };
  },
  created() {
    this.currentCoach = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id === this.id
    );
  },
  computed: {
    contactLink() {
      return this.$route.path + '/contact';
    },
    areas() {
      return this.currentCoach.areas;
    },
    fullName() {
      return this.currentCoach.firstName + ' ' + this.currentCoach.lastName;
    },
    rate() {
      return this.currentCoach.hourlyRate;
    },
    description() {
      return this.currentCoach.description;
    },
  },
};
</script>

<style>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
