<template>

    <Suspense>
      <component :is="chosenComponent" @changeLogStatus="logInOrLogOut" />
    </Suspense>

    <img v-if="showImg" src="./assets/images/gifloader.gif" alt="gifloader">

</template>


<script lang="ts">

//Bootstrap
import "bootstrap/dist/css/bootstrap.css";

import Main from "./views/Main.vue";
import LoggedOut from "./views/LoggedOut.vue";

import { shallowRef, ref, defineComponent } from "vue";
import { useRouter } from "vue-router";

//CSS
require("./assets/css/main-style.css");
require("./assets/css/table.css");
require("./assets/css/grades.css");
require("./assets/css/animations.css");

export default defineComponent({
  name: "App",
  components: {
    Main,
    LoggedOut,
  },
  setup() {

    const router = useRouter();

    const chosenComponent: any = shallowRef(Main);
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
});
</script>

<style scoped>
img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
