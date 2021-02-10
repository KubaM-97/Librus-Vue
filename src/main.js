import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

 //Custom directive
app.directive("styleMe",{
  mounted(el,binding){
      if((binding.value == 'italic')&&(binding.arg == 'class')){
        el.style.fontStyle = "italic"
      }
      else{
        el.style.fontStyle = "normal"
      }
    }
});
// app.directive('highlight', {
//   beforeMount(el, binding, vnode) {
//     el.style.background = binding.value
//   }
// })


app.use(store).use(router).mount('#app')

