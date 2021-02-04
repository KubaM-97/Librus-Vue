<template>

    <div id="app">

      <header class="main-header" v-show="showNavpanel">

          <header>

              <div class="logo">
                  <img src="./assets/images/Logo.png"/>
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
              <img src="@/assets/images/gifloader.gif" alt="loaderLogo">
          </div>
      </transition>


      <transition name="router" mode="out-in">
        <router-view/>
      </transition>


    </div>

</template>


<script>

import { mapState, mapMutations, mapActions } from "vuex"

//Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

//CSS
require("./assets/css/main-style.css");
require("./assets/css/table.css");
require("./assets/css/grades.css");
require("./assets/css/animations.css");

export default {
  name: "App",
  data(){
    return{
      sitename: "Dziennik elektroniczny",
      teacher: "<em>Kuba Modzelik</em>",
      Class: "3B"
    }
  },
  computed: {
    ...mapState([
      "showNavpanel",
      "showLoaderGif"
    ])
  },
  created(){
    this.initFullClass();
  },
  methods:{
    ...mapActions([
      'initFullClass'
    ])
  }
};



</script>





<style>
header.main-header {
    width: 100%;
    filter: blur(0.44px);
    background-color: rgba(0, 0, 0, .55);
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    padding: 10px 0 15px;
    font-size: 8.5px;
}
header, nav {
    display: inline-block;
    vertical-align: bottom;
}
header > header {
    width: 50%;
}
header .logo img {
    border-radius: 6px;
    height: 100px;
    vertical-align: bottom;
    margin: 5px 45px 10px 30px;
}
header .logo_info{
  display: inline-block;
  margin-left: 25px;
}
nav {
    width: 47%;
    text-align: right;
}
nav button.btn{
    background-color: rgba(0, 162, 255, 0.822);
    margin-right: 10px;
    font-size: 13px;
    padding: 8px 16px;
}
nav button.btn.with-logout-icon{
    padding: 7px 18px 7px 15px;
    vertical-align: top;
}
nav button.btn.active{
    background-color: rgba(15, 88, 223, 0.55);
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
    position: relative;
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
    float: right;
    position: absolute;
    bottom: 0;
  }
  nav button.btn{
    display: inline-block;
    font-size: 11px;
    padding: 7px 11px;
    margin: 4px 5px;
  }
  nav button.btn.with-logout-icon{
    padding-left: 10px;
  }
  nav img{
    height: 18px;
  }
}
</style>
