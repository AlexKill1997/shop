import Vue from 'vue'
import VueToastify from "vue-toastify";
Vue.use(VueToastify, {
  position: 'bottom-right',
  theme: 'light',
  iconEnabled: 'true',
  hideProgressbar: true,
  // canTimeout: false
  draggable: true,
  successDuration: 2000,
  baseIconClass: 'icon__tutify',
  errorDuration: 2000
});

