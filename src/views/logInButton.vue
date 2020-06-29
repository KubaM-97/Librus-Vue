<template>
  <div>
    <slot name="logIn">
    </slot>
  </div>
</template>

<script>
  import loggedOut from './LoggedOut.vue'
  export default{
    props: ['navpanel', 'mainpanel'],
    methods: {

          //Main Log Panel
          giveMeAccess: function() {
            this.navpanel = false
            alert(this.navpanel)
            alert(this.mainpanelLog)

            //gets inserted login
            const userLogin = document.querySelector(".mainPanelLog input[type=text]").value;

            //gets inserted password
            const userPassword = document.querySelector(".mainPanelLog input[type=password]").value;

            //if inserted login and password are correct
            if ((userLogin === "Login1") && (userPassword === "Hasło1")) {

              this.mainpanellog = false;
              this.showLoaderGif = true;

              setTimeout(()=>{
                this.showLoaderGif = false;
                this.navpanel = true;
                  // this.$router.push({name: 'Start', params: {navpanel: this.navpanel }});

                  // console.log(this)
                // this.$emit("update:navpanel", true);
              },3000);

            }

            //if inserted login or password are incorrect
            else {
                const wrong = document.querySelectorAll(".mainPanelLog span.wrongLoginPassword");
                for (let i = 0; i < wrong.length; i++) {
                    wrong[i].innerHTML = "Login i hasło muszą się zgadzać!"
                }
            }

          },

    }
}
</script>

<style>
</style>
