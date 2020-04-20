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


Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSession);



const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});



new Vue({
  el: '#app',
  render: h => h(App),
  router: router
})
