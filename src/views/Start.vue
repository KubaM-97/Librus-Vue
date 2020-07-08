<template lang="html">
 <div>
 <h2 @click="show=!show">gdfgdf</h2>
   <transition>
   <h1 v-if="show">fggdfgdf</h1>
   </transition>
 </div>
</template>

<script>
export default {
  data(){
    return{
      show: false
    }
  }
}
</script>

<style lang="css" scoped>
.v-enter-active {
  /* transition: all .3s ease; */
animation: shake .73s ease;
transform: translate3d(0,0,0);
backface-visibility: hidden;
}

  @keyframes shake {
    10%, 90% { color: green; transform: translate3d(-1px, 0, 0) }
    20%, 80% { transform: translate3d(2px, 0, 0) }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0) }
    40%, 60% { transform: translate3d(4px, 0, 0) }
  }
</style>
