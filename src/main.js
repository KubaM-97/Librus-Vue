import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(store).use(router).mount('#app')

//Custom directive
app.directive("style-me",{
    beforeMount(el,binding){
      if((binding.value == 'italic')&&(binding.arg == 'class')){
        el.style.fontStyle = "italic"
      }
      else{
        el.style.fontStyle = "normal"
      }
    }
});


// Log-Out-Button Component
app.component('log-out-button', {
  render: function (createElement) {
    return createElement(
      'button',   // tag name
      {
        "class": "btn btn-primary btn-lg with-logout-icon",
          on: {
            click:(e)=>{
              this.logMeOut()
            }
          }
      },
      [
        createElement('img',
          {
            attrs: {
              src: require('./assets/images/logout.png'),
              alt: "logout icon",
              height: "20"
            }
          }
        ),
        this.$slots.default // array of children
      ]
    )
  },
  methods:{
    ...mapMutations([
      "changeNavpanel",
      "changeLoaderGif"
    ]),
    logMeOut(){
      this.$router.push({name: "LoggedOut"});

      this.changeNavpanel();
      this.changeLoaderGif();

      setTimeout(()=>{
        this.changeLoaderGif();
      },600);

    }
  }
});

