<template>

      <component :is="chosenComponent" @changeLogStatus="logInOrLogOut"/>
      
</template>


<script>

//Bootstrap
import 'bootstrap/dist/css/bootstrap.css'

import Main from "./views/Main"
import LoggedOut from "./views/LoggedOut"

import { shallowRef } from "vue";
import { useRouter } from "vue-router";

//CSS
require("./assets/css/main-style.css");
require("./assets/css/table.css");
require("./assets/css/grades.css");
require("./assets/css/animations.css");

export default {
  name: "App",
  components: {
    Main,
    LoggedOut
  },
  setup(){

    const router = useRouter()
    
    const chosenComponent = shallowRef(Main)

    function logInOrLogOut(){

      if(chosenComponent.value == Main){


        // setTimeout(()=>{

        // }, 600)
        chosenComponent.value = LoggedOut;
        router.push({name: "LoggedOut"})

      }

      else if(chosenComponent.value == LoggedOut){

        chosenComponent.value = Main;
        router.push({name: "FullClass"})

      }

    }

  return { 
    chosenComponent,
    logInOrLogOut
  }
    
  }
};



</script>





<style>

</style>
