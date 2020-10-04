import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import {store} from './store/store'

Vue.config.productionTip = false

//Custom directives
Vue.directive("styleMe",{
  bind(el,binding){
    if((binding.value == 'italic')&&(binding.arg == 'class')){
      el.style.fontStyle = "italic"
    }
    else{
      el.style.fontStyle = "normal"
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
