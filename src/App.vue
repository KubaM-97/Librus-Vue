<template>
    <div id="app">

    <header class="main-header" v-show="navpanel">

        <header>

            <div class="logo">
                <img src="./assets/Logo.png"/>
            </div>

            <div class="logo">
                Nauczyciel: <span v-html="teacher"></span>
                Klasa: <span v-html="Class"></span>
            </div>

        </header>

        <nav>

          <router-link :to="{name: 'FullClass'}" tag="button" active-class="active" class="btn btn-primary btn-lg">
              Klasa
          </router-link>

          <router-link :to="{name: 'AddStudent'}" tag="button" active-class="active" class="btn btn-primary btn-lg">
              Dodaj ucznia
          </router-link>

          <button active-class="active" class="btn btn-primary btn-lg with-logout-icon"  @click="logMeOut()">
            <img src="./assets/logout.png" alt="logout icon" height="30"/> Wyloguj się
          </button>

        </nav>

    </header>


    <div class="loader" v-show="showLoaderGif">
        <img src="@/assets/gifloader3.gif" alt="loaderLogo">
    </div>

    <log-out v-show="mainpanellog" :navpanel.sync="navpanel"></log-out>

    <router-view/>

  </div>

</template>


<script>
import Vue from 'vue'

//Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//CSS
require("./assets/style.css");

import MainLogPanel from "./views/MainLogPanel.vue"

export default {
  components: {"log-out": MainLogPanel},
  data(){
    return{
      navpanel: true,
      mainpanellog: false,
      showLoaderGif: false,
      sitename: "Dziennik elektroniczny",
      teacher: "<em>Kuba Preceptor</em>",
      Class: "<em>3B</em>"
    }
  },
methods:{
  logMeOut(){
    this.$router.push({name: 'Start'})
    this.navpanel = false;
    this.showLoaderGif = true;
    setTimeout(()=>{
      this.showLoaderGif = false;
      this.mainpanellog = true;
    },1000)
  }
}

}
</script>





<style>
header.main-header {
    width: 100%;
    filter: blur(0.44px);
    background-color: rgba(0, 0, 0, .55);
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    padding: 20px 0 70px;
    margin-bottom: 100px;
    font-size: 14px;
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
    height: 150px;
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
    font-size: 20px;
    padding: 10px 30px
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
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
}
.loader img{
    width: 100%
}
</style>
