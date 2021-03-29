<template>
  <div>
    <div id="Error404">
      <img src="../assets/images/Error404.png" alt="Error404">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error404"
})
</script>

<style lang="css" scoped>
div#Error404{
  position: absolute;
  left: 40%;
  transform: translateX(-50%);
  margin: 100px 0
}
img{
  width: 100%;
}
@media (max-width: 768px){
  div#Error404{
    left: 50%;
    transform: translateX(-50%);
  }
  img{
    width: 100vw;
  }
}
</style>
