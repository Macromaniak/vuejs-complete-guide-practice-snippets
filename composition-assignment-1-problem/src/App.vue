<template>
  <h2>My Course Goal</h2>
  <!-- Task 1: Output your main course goal with help of the composition API -->
  <!-- Don't hardcode it into the template, instead hardcode it into the JS code -->
  <!-- for option API and Composition API with separate refs -->
  <h3 v-if="goalIsVisible">{{courseGoal}}</h3>
  <!-- For composition API ref/reactive object -->
  <!-- <h3 v-if="courseGoalData.goalIsVisible">{{courseGoalData.courseGoal}}</h3> -->
  <!-- Task 2: Toggle (show/ hide) the goal with help of the button  -->
  <button @click="toggleGoal">Toggle Goal</button>
  <!-- Task 3: Manage data in three ways -->
  <!-- => Separate refs -->
  <!-- => Ref Object -->
  <!-- => Reactive Object -->
  <!-- Task 4: Also solve the assignment with the Options API -->
</template>

<!-- Options API -->
<script>
export default {
data() {
  return {
    courseGoal: 'Master VueJs',
    goalIsVisible: true
  }
},
methods: {
  toggleGoal() {
    this.goalIsVisible = !this.goalIsVisible;
  }
}
}
</script>

<!-- //composition API -->
<!--<script setup>
// import { ref } from 'vue';
import { reactive } from 'vue';

// let courseGoal = ref('Master VueJs');
// let goalIsVisible = ref(true);

// let courseGoalData = ref({courseGoal:'Master VueJs', goalIsVisible: true});

let courseGoalData = reactive({courseGoal:'Master VueJs', goalIsVisible: true});



function toggleGoal() {
  // goalIsVisible.value = !goalIsVisible.value; 
  // courseGoalData.value.goalIsVisible = !courseGoalData.value.goalIsVisible;
  courseGoalData.goalIsVisible = !courseGoalData.goalIsVisible;
}

</script> -->

<style>
html {
  font-family: sans-serif;
}
body {
  margin: 3rem;
  text-align: center;
}
</style>