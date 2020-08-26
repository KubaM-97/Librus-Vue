<template>
    <div id="app">

    <header class="main-header" v-show="showNavpanel">

        <header>

            <div class="logo">
                <img src="./assets/Logo.png"/>
            </div>

            <div class="logo">
              <div class="logo_info">
                  Nauczyciel: <span v-html="teacher"></span>
              </div>
              <div class="logo_info">
                  Klasa: <span v-style-me:class="'italic'">{{Class}}</span>
              </div>
            </div>

        </header>

        <nav>

          <router-link :to="{name: 'FullClass'}" tag="button" active-class="active" class="btn btn-primary btn-lg">
              Klasa
          </router-link>

          <router-link :to="{name: 'AddStudent'}" tag="button" active-class="active" class="btn btn-primary btn-lg">
              Dodaj ucznia
          </router-link>

          <log-out-button>
             Wyloguj się
          </log-out-button>

        </nav>

    </header>

    <transition name="show-logOutGif" mode="out-in">
        <div class="loader" v-show="showLoaderGif">
            <img src="@/assets/gifloader.gif" alt="loaderLogo">
        </div>
    </transition>

    <log-out v-if="showMainLogPanel" :showNavpanel.sync="showNavpanel" :showLoaderGif.sync="showLoaderGif" :showMainLogPanel.sync="showMainLogPanel"></log-out>

    <transition name="router" mode="out-in">
      <router-view/>
    </transition>


  </div>

</template>


<script>

import Vue from 'vue'

//Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//CSS
require("./assets/style.css");
require("./assets/animations.css");

import LoggedOut from "./views/LoggedOut.vue"

export default {
  components: {"log-out": LoggedOut},
  data(){
    return{
      sitename: "Dziennik elektroniczny",
      teacher: "<em>Kuba Preceptor</em>",
      Class: "3B"
    }
  },
  computed: {
    showNavpanel(){
      return this.$store.getters.visibleNavpanel
    },
    showLoaderGif(){
      return this.$store.getters.visibleLoaderGif
    },
    showMainLogPanel(){
      return this.$store.getters.visibleMainLogPanel
    }
  },

};




// Log-Out-Button Component
Vue.component('log-out-button', {
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
              src: "./img/logout2.png",
              alt: "logout icon",
              height: "25"
            }
          }
        ),
        this.$slots.default // array of children
      ]
    )
  },
  created(){
      this.$store.dispatch("initFullClass")
  },
  methods:{
    logMeOut(){
      this.$router.push({name: 'LoggedOut'});
      this.$store.commit("changeNavpanel");
      this.$store.commit("changeLoaderGif");
      setTimeout(()=>{
        this.$store.commit("changeLoaderGif");
        this.$store.commit("changeMainLogPanel");
      }, 1000)
    }
  }
});
</script>





<style>
header.main-header {
    width: 100%;
    filter: blur(0.44px);
    background-color: rgba(0, 0, 0, .55);
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    padding: 20px 0 25px;
    font-size: 11px;
}

header, .logo, nav {
    display: inline-block;
}

header > header {
    width: 50%;
}

header .logo img {
    border-radius: 6px;
    height: 120px;
    vertical-align: -200%;
    margin: 5px 65px 20px 30px
}
header .logo_info{
  display: inline-block;
}
header span {
    margin-right: 30px;
}

nav {
    width: 47%;
    text-align: right;
}

nav button.btn{
    background-color: rgba(0, 162, 255, 0.822);
    margin-right: 10px;
    margin-top: 10px;
    font-size: 16px;
    padding: 10px 20px
}

nav button.btn.with-logout-icon{
    padding-left: 15px;
}

nav button.btn.active{
background-color: rgba(15, 88, 223, 0.55);}

button{
    border: none !important
}
.loader{
    display: block;
    position: absolute;
    width: 350px;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
}
.loader img{
    width: 100%;
}


@media (max-width: 768px){
  header{
    width: 55%;
  }

  header .logo img{
    height: 100px;
  }

  header .logo_info{
    display: inline-block;
    margin-left: 20px;
  }

  nav{
    width: 44%;
  }

  nav button.btn{
    display: inline-block;
    /* margin-right: 10px; */
    /* text-align: right; */
    /* float: right; */
      font-size: 11px;
      padding: 7px 11px
  }
  nav button.btn.with-logout-icon{
      padding-left: 10px;
  }
  nav img{
    height: 18px;
    /* padding-left: 0px; */
  }
}
</style>
