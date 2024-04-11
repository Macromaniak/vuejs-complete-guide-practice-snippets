<template>
  <section class="container">
    <h2>{{ fname }} {{ lname }}</h2>
    <h2>{{ fullName }}</h2>
    <h3>{{ userData.gender }}</h3>
    <h4>{{ userData.age }}</h4>

    <button @click="increase">Increase Age</button>
    <button @click="decrease">Decrease Age</button>

    <div>
      <input type="text" id="fname" @input="setFirstName">
      <input type="text" id="lname" @input="setLastName">
    </div>
  </section>
</template>

<script setup>
import { ref,  reactive, computed, watch } from 'vue';

// export default {
//   setup() {
//     const userName = ref('Anandhu');

//     setTimeout(function () {
//       userName.value = 'Nandhu';
//     }, 2000);

//     return { uName: userName };
//   },
// };
let userData = reactive({gender: 'Male', age: 30});

let fname = ref('');
let lname = ref('');

const fullName = computed(function(){
  return fname.value+ ' '+ lname.value;
})

// const uData = computed(function(){
//   return userData;
// })

watch([userData, fullName], function(newVaues, oldValues) {
  console.log('old age : ', oldValues[0]);
  console.log('new age : ', newVaues[0]);
  console.log('old name : ', oldValues[1]);
  console.log('new name : ', newVaues[1]);
})

function increase() {
  userData.age+= 1;
}

function decrease() {
  userData.age-= 1;
}

function setFirstName(event) {
  fname.value = event.target.value;
}

function setLastName(event) {
  lname.value = event.target.value;
}

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

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>
