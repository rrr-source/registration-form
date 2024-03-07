<template>
  <div id="app">
    <!-- Show RegistrationForm when showForm is true -->
    <RegistrationForm v-if="showForm" @formSubmitted="handleFormSubmitted" />

    <!-- Show RegistrationSuccess when showForm is false -->
    <RegistrationSuccess v-if="!showForm" />
  </div>
</template>

<script>
import RegistrationForm from "./components/RegistrationForm";
import RegistrationSuccess from "./components/RegistrationSuccess";

export default {
  name: 'App',
  components: {
    RegistrationForm,
    RegistrationSuccess,
  },

  data() {
    return {
      showForm: true, // Initially, show the form
    };
  },

  methods: {
    handleFormSubmitted() {
      // Update state to hide the form and show the success message
      this.showForm = false;
    },
  },
}
</script>

<style>
#app {
  margin: 0 auto;
  width: 100%;
  height: 80vh;
  background-color: rgba(248, 246, 246, 0.92);

  padding-top: 100px;

  box-sizing: content-box;
}
</style>
