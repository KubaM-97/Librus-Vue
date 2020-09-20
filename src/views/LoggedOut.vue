<template>
  <div>

    <div class="mainLogPanel">

      <div class="form-group">

        <label for="login">
          Login<span class="mainLogPanelTooltip">(Proszę wpisać: Login1)</span>
        </label>

        <input type="text" id="login" autocomplete="off">

        <span class="wrongLoginPassword"></span>

      </div>

      <div class="form-group">

          <label for="password">
            Hasło<span class="mainLogPanelTooltip">(Proszę wpisać: Hasło1)</span>
          </label>

          <input type="password" id="password">

          <span class="wrongLoginPassword"></span>

      </div>

      <div class="form-group">


        <log-in-button>
            <button name="logMeIn" @click="logMeIn()" slot="logIn">
                Zaloguj się
            </button>
        </log-in-button>

      </div>

    </div>


  </div>
</template>

<script>
import LogInButton from './LogInButton.vue'
import { mapMutations } from "vuex"
export default {
  name: "LoggedOut",
  beforeCreate(){
    this.$store.state.showNavpanel = false;
  },
  methods: {

        ...mapMutations([
          "changeMainLogPanel",
          "changeLoaderGif",
          "changeNavpanel"
        ]),

        //Main Log Panel
        logMeIn() {

          //gets inserted login
          const userLogin = document.querySelector(".mainLogPanel input[type=text]").value;

          //gets inserted password
          const userPassword = document.querySelector(".mainLogPanel input[type=password]").value;

          //if inserted login and password are correct
          if ((userLogin === "Login1") && (userPassword === "Hasło1")) {

            // this.changeMainLogPanel();
            this.changeLoaderGif();

            setTimeout(()=>{
              this.changeLoaderGif();
              this.changeNavpanel();
            },1200);

            this.$router.push({name: "FullClass"})
          }

          //if inserted login or password are incorrect
          else {
              const wrong = document.querySelectorAll(".mainLogPanel span.wrongLoginPassword");
              for (let i = 0; i < wrong.length; i++) {
                  wrong[i].innerHTML = "Login i hasło muszą się zgadzać!"
              }
          }

        }

      }


}
</script>

<style scoped>

.mainLogPanel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
    background-image: url(../assets/Logo.png);
    background-position: center;
    background-size: cover;
    padding: 50px 18px 35px;
    text-align: center;
    width: 440px;
    border-left: 2px solid #00c3ff;
    border-right: 2px solid #00c3ff;
}

.mainLogPanel .form-group {
    font-size: 22px;
    margin-bottom: 55px;
    filter: blur(0.44px);
    filter: sepia();
    opacity: 0.7
}

.mainLogPanel .form-group:hover {
    opacity: 1;
}

.mainLogPanel .form-group label {
    margin-bottom: 16px;
    font-size: 18px;
}

.mainLogPanel .form-group label span.mainLogPanelTooltip {
    font-size: 15px;
    margin-left: 20px
}

.mainLogPanel .form-group label + input {
    height: 36px;
    width: 95%;
    max-width: 360px;
    text-align: left;
    padding-left: 15px;
}

.mainLogPanel .form-group button {
    background-color: deeppink;
    padding: 10px;
    border: 2px solid black;
    border-radius: 7px;
    width: 80%;
    margin-top: 10px;
}

.mainLogPanel span.wrongLoginPassword,
.form-group span.required {
    margin-top: 10px;
    display: block;
    font-size: 14px;
}

@media (max-width: 768px){
  .mainLogPanel {
      width: 90%;
  }

  .mainLogPanel .form-group {
      font-size: 16px;
  }
  .mainLogPanel .form-group label span.mainLogPanelTooltip {
      font-size: 14px;
  }
  .mainLogPanel .form-group label + input {
      height: 28px;
      width: 75%;
      color: black;
  }
}
</style>
