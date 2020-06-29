<template>
    <div id="app">

    <header class="main-header" v-show="navpanel">

        <header>

            <div class="logo">
                <img src="./assets/Logo.png"/>
            </div>

            <div class="logo">
                Nauczyciel: <span v-html="teacher"></span>
                Klasa: <span v-style-me:class="'italic'">{{Class}}</span>
            </div>

        </header>

        <nav>

          <router-link :to="{name: 'FullClass'}" tag="button" active-class="active" class="btn btn-primary btn-lg">
              Klasa
          </router-link>

          <router-link :to="{name: 'AddStudent'}" tag="button" active-class="active" class="btn btn-primary btn-lg">
              Dodaj ucznia
          </router-link>

          <log-out-button :navpanel.sync="navpanel" :showLoaderGif.sync="showLoaderGif"> Wyloguj się</log-out-button>

          <!-- <button active-class="active" class="btn btn-primary btn-lg with-logout-icon"  @click="logMeOut()">
            <img src="./assets/logout.png" alt="logout icon" height="25"/> Wyloguj się
          </button> -->

        </nav>

    </header>

    <transition name="fade-logOut" mode="out-in">
        <div class="loader" v-show="showLoaderGif">
            <img src="@/assets/gifloader.gif" alt="loaderLogo">
        </div>
    </transition>

    <log-out v-if="navpanel"></log-out>

    <transition name="fade" mode="out-in">
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

import LoggedOut from "./views/LoggedOut.vue"
// import LogOutButton from "./views/LogOutButton.vue"

export default {
  components: {"log-out": LoggedOut},
  data(){
    return{
      navpanel: true,
      mainpanellog: false,
      showLoaderGif: false,
      sitename: "Dziennik elektroniczny",
      teacher: "<em>Kuba Preceptor</em>",
      Class: "3B"
    }
//   },
// methods:{
//   logMeOut(){
//     this.$router.push('/LoggedOut');
//     this.navpanel = false;
//     this.showLoaderGif = true;
//     setTimeout(()=>{
//       this.showLoaderGif = false;
//       // this.mainpanellog = true;
//     },1500)
//   }
}
}
Vue.component('log-out-button', {
  render: function (createElement) {
    return createElement(
      'button',   // tag name
      {
        "class": "btn btn-primary btn-lg with-logout-icon",
          on: {
            click:(e)=>{
              console.log(this)
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
  methods:{
    logMeOut(){

      this.navpanel = false
      this.$router.push({name: 'LoggedOut', params: {navpanel: false, mainpanellog: true}});
      // this.$emit('update:navpanel', false)
      this.$emit('update:showLoaderGif', true)

      setTimeout(()=>{
        this.$emit('update:showLoaderGif', false)
      },500)
    }
  },
  props:['navpanel'],
  data(){
    return{
      aaa: "true"
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
    padding: 20px 0 40px;
    font-size: 11px;
}

header, .logo, nav {
    display: inline-block;
    vertical-align: bottom
}

header > header {
    width: 50%;
}

header .logo {
    display: inline-block;
}

header .logo img {
    border-radius: 6px;
    height: 120px;
    vertical-align: -200%;
    margin: 5px 65px 0 30px
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
.fade-enter-active, .fade-leave-active{
  transition: opacity .5s ease-out;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

.fade-logOut-enter-active, .fade-logOut-leave-active{
  transition: opacity .15s ease-out;
}
.fade-logOut-enter, .fade-logOut-leave-to{
  opacity: 0;
}
</style>
