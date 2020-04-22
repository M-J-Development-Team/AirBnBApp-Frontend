import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSession from 'vue-session'
import './plugins/bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import Geocoder from "@pderas/vue2-geocoder";
import 'vue-multiselect/dist/vue-multiselect.min.css';
 


Vue.use(Geocoder, {
    defaultCountryCode: null, // e.g. 'CA'
    defaultLanguage:    null, // e.g. 'en'
    defaultMode:        'address', // or 'lat-lng'
    googleMapsApiKey:   'af06866a8emsh40e59efd21a2a76p1c43bejsn44800aec1b62'
});

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSession);
Vue.use(require('vue-moment'));




const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});



new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
