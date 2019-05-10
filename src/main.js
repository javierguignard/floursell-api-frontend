import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './plugins/router'
import "vue-material-design-icons/styles.css"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
