import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import RegistrationForm from './components/RegistrationForm.vue';
import RegistrationSuccess from './components/RegistrationSuccess.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: RegistrationForm },
    { path: '/success', component: RegistrationSuccess },
  ],
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
