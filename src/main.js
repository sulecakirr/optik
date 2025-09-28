import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


// Tarih görüntülenmesi için filter
import moment from 'moment'
Vue.filter('formatDate', function (value, format = "DD/MM/YYYY") {
  if (!value) return '';
  return moment(value).format(format);
});

Vue.prototype.$toastApiResponse = function (res) {
  if (res.success && res.message!==null) {
    this.$toast({
      component: ToastificationContent,
      props: {
        title: res.message,
        icon: 'CheckIcon',
        variant: 'success',
      },
    })
  } else if(!res.success && res.message!==null) {
    this.$toast({
      component: ToastificationContent,
      props: {
        title: res.message,
        icon: 'AlertCircleIcon',
        variant: 'danger',
      },
    })
  }
}

Vue.prototype.$toastSubu = function (message, type = 'success') {
  this.$toast({
    component: ToastificationContent,
    props: {
      title: message,
      icon: 'EditIcon',
      variant: type,
    },
  })
}

Vue.prototype.$swalDeleteAsk = function () {
  return new Promise((resolve) => {
    this.$swal({
      title: 'Silmek istediğinize emin misiniz?',
      text: 'Yapılan işlem geri alınamaz!',
      icon: 'warning',
      showClass: {
        popup: 'animate__animated animate__shakeX',
      },
      showCancelButton: true,
      confirmButtonText: 'Sil',
      cancelButtonText: 'İptal',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1',
      },
      buttonsStyling: false,
    })
      .then(result => {
        resolve(result.value)
      })
  })
}

// Composition API
Vue.use(VueCompositionAPI)

Vue.prototype.JWT_TOKEN_SECRET = 'f6487bbd3efde8d42012ed742e70c7153ee39b05'

axios.defaults.baseURL = 'https://apikystest.subu.edu.tr/'
axios.defaults.headers.common.Authorization = `Bearer ${store.getters['subu/getToken'] ?? ''}`

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false


// Validate uyarıları türkçeleştirilmesi
import { ValidationObserver, ValidationProvider, localize, extend } from 'vee-validate';
import tr from 'vee-validate/dist/locale/tr.json';
import * as rules from 'vee-validate/dist/rules';
import subuAxios from "@/libs/subu-axios";
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
localize('tr', tr);


Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
