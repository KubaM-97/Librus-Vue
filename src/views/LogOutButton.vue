<template>
    <!-- <button active-class="active" class="btn btn-primary btn-lg with-logout-icon"  @click="logMeOut()">
      <img src="../assets/logout.png" alt="logout icon" height="25"/> Wyloguj się
    </button> -->
    <my-comp></my-comp>
</template>

<script>
export default{
  Vue.component("my-comp" {
    render(h) {
     return h('button',
       {
         'class': "btn btn-primary btn-lg with-logout-icon"
       },
     "Wyloguj się")
    }
  })

}

</script>
