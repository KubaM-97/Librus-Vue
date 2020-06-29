<template>
<div>

  <div class="mainPanelLog" v-show="mainpanellog">

    <div class="form-group">

      <label for="login">
        Login<span class="mainPanelLogTooltip">(Proszę wpisać: Login1)</span>
      </label>

      <input type="text" id="login">

      <span class="wrongLoginPassword"></span>

    </div>

    <div class="form-group">

        <label for="password">
          Hasło<span class="mainPanelLogTooltip">(Proszę wpisać: Hasło1)</span>
        </label>

        <input type="password" id="password">

        <span class="wrongLoginPassword"></span>

    </div>

    <div class="form-group">

      <!-- <log-in>Zaloguj się</log-in> -->


      <log-in-button :navpanel="navpanel">

          <button @click="giveMeAccess()" slot="logIn">
              Zaloguj się
          </button>

      </log-in-button>

    </div>

  </div>

  <transition name="fade-logOut" mode="out-in">
      <div class="loader" v-show="showLoaderGif">
          <img src="@/assets/gifloader.gif" alt="loaderLogo">
      </div>
  </transition>

</div>
</template>

<script>
import logInButton from './logInButton.vue'
export default {
  components: {'log-in-button': logInButton},
  props:["navpanel", "mainpanellog"],
  data(){
    return{
      // mainpanellog: true,
      showLoaderGif: false
    }
  },
  methods: {

        // //Main Log Panel
        // giveMeAccess: function() {
        //   this.navpanel = false
        //     alert(this.navpanel)
        //     alert(this.mainpanelLog)
        //   //gets inserted login
        //   const userLogin = document.querySelector(".mainPanelLog input[type=text]").value;
        //
        //   //gets inserted password
        //   const userPassword = document.querySelector(".mainPanelLog input[type=password]").value;
        //
        //   //if inserted login and password are correct
        //   if ((userLogin === "Login1") && (userPassword === "Hasło1")) {
        //
        //     this.mainpanellog = false;
        //     this.showLoaderGif = true;
        //
        //     setTimeout(()=>{
        //       this.showLoaderGif = false;
        //       this.navpanel = true;
        //         // this.$router.push({name: 'Start', params: {navpanel: this.navpanel }});
        //
        //         // console.log(this)
        //       // this.$emit("update:navpanel", true);
        //     },3000);
        //
        //   }
        //
        //   //if inserted login or password are incorrect
        //   else {
        //       const wrong = document.querySelectorAll(".mainPanelLog span.wrongLoginPassword");
        //       for (let i = 0; i < wrong.length; i++) {
        //           wrong[i].innerHTML = "Login i hasło muszą się zgadzać!"
        //       }
        //   }

        },


}
</script>

<style scoped>

.mainPanelLog {
    margin: 100px auto;
    background-image: url(../assets/Logo.png);
    background-position: center;
    background-size: cover;
    padding: 50px 18px 35px;
    text-align: center;
    max-width: 440px;
    border-left: 2px solid #00c3ff;
    border-right: 2px solid #00c3ff;
}

.mainPanelLog .form-group {
    font-size: 22px;
    margin-bottom: 55px;
    filter: blur(0.44px);
    filter: sepia();
    opacity: 0.7
}

.mainPanelLog .form-group:hover {
    opacity: 1;
}

.mainPanelLog .form-group label {
    margin-bottom: 16px
}

.mainPanelLog .form-group label span.mainPanelLogTooltip {
    font-size: 15px;
    margin-left: 20px
}

.mainPanelLog .form-group label + input {
    height: 36px;
    width: 95%;
    max-width: 360px;
    color: black;
}

.mainPanelLog .form-group button {
    background-color: deeppink;
    padding: 10px;
    border: 2px solid black;
    border-radius: 7px;
    width: 80%;
    margin-top: 10px;
}

.mainPanelLog span.wrongLoginPassword,
.form-group span.required {
    font-size: 14px;
}

</style>
