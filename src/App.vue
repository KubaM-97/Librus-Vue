<template>

  <component :is="chosenComponent" @changeLogStatus="logInOrLogOut" />
  <img v-if="showImg" src="./assets/images/gifloader.gif" alt="gifloader">

</template>


<script>

//Bootstrap
import "bootstrap/dist/css/bootstrap.css";

import Main from "./views/Main";
import LoggedOut from "./views/LoggedOut";

import { shallowRef, ref } from "vue";
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
    LoggedOut,
  },
  setup() {

    const router = useRouter();

    const chosenComponent = shallowRef(Main);
    const showImg = ref(false)

    function logInOrLogOut() {

      if (chosenComponent.value == Main) {

          chosenComponent.value = null
          showImg.value = true

          setTimeout(()=>{

            showImg.value = false
            chosenComponent.value = LoggedOut;
            router.push({ name: "LoggedOut" });

          },700)


      } else if (chosenComponent.value == LoggedOut) {

          chosenComponent.value = null
          showImg.value = true

          setTimeout(()=>{

            showImg.value = false
            router.push({ name: "FullClass" });

            setTimeout(()=>{
              chosenComponent.value = Main;
            },300)

          },1500)


      }

    }

    return {
      chosenComponent,
      showImg,
      logInOrLogOut,
    };
  },
};
</script>

<style scoped>
img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
