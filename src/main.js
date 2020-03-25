import Vue from 'vue'
import PortalVue from 'portal-vue'
import { extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import App from './app/app.vue'
import Modal from './components/ui/modal/modal.vue'
import VButton from './components/ui/v-button/v-button.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

extend('required', {
  ...required,
  message: 'This field is required'
})

Vue.component('modal', Modal)
Vue.component('v-button', VButton)

Vue.use(PortalVue)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
