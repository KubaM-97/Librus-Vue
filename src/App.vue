<template>

  <Suspense>
    
    <template #default>
      <component :is="chosenComponent" @changeLogStatus="logInOrLogOut" />
    </template>

    <template #fallback>
      <div>Loading...</div>
    </template>

  </Suspense>

</template>


<script>
//Bootstrap
import "bootstrap/dist/css/bootstrap.css";

import Main from "./views/Main";
import LoggedOut from "./views/LoggedOut";

import { ref, shallowRef } from "vue";
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
    const isDisplayGif = ref(false);

    const router = useRouter();

    const chosenComponent = shallowRef(Main);

    function logInOrLogOut() {
      if (chosenComponent.value == Main) {
        isDisplayGif.value = true;

        setTimeout(() => {
          chosenComponent.value = LoggedOut;
          router.push({ name: "LoggedOut" });
          isDisplayGif.value = false;
        }, 600);
      } else if (chosenComponent.value == LoggedOut) {
        isDisplayGif.value = true;

        setTimeout(() => {
          chosenComponent.value = Main;
          router.push({ name: "FullClass" });
          isDisplayGif.value = false;
        }, 1100);
      }
    }

    return {
      isDisplayGif,
      chosenComponent,
      logInOrLogOut,
    };
  },
};
</script>





<style>
</style>
