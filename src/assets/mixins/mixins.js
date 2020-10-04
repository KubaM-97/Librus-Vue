export default {
  methods:{

    //updates component
    updater(){
      this.$forceUpdate()
    },

    //regular expressions
    validatorData(Data, RegularExpression, Format) {
      //gets inserted value
      const insertedData = document.querySelector("#"+Data).value;

      //gets regular expression
      const reg = new RegExp(RegularExpression);
      const span = document.querySelector("#wrong"+Data);
      if((insertedData !== '') && (reg.test(insertedData)==false)){
          span.innerHTML = `Podaj prawidłowy format :
          <br /> ${Format}`;
          span.style.marginBottom = "10px";
          this.possibleSave = false;
       }
      else{
           span.innerHTML = ``;
           span.style.marginBottom = "0";
           this.possibleSave = true;
      }
      //prevents unlocking disabling button
       const allSpansContainingErrorTooltips = document.querySelectorAll("span[class^='wrongAdditionalInfo']")
       for(let i=0; i<allSpansContainingErrorTooltips.length; i++){
         if(allSpansContainingErrorTooltips[i].innerHTML !== ""){
           this.possibleSave = false;
           break;
        }
         else{
           this.possibleSave = true;
        }
      }
    },

    // saveChanges(){
    //
    // },
    pushMe(componentName){
      this.$router.push({name: componentName, params: {
        id: this.$route.params.id,
        lastName: this.$route.params.lastName,
        firstName: this.$route.params.firstName,
        marks: this.$route.params.marks,
        weights: this.$route.params.weights,
        descriptions: this.$route.params.descriptions,
        dates: this.$route.params.dates,
        pesel: this.$route.params.pesel,
        street: this.$route.params.street,
        phone: this.$route.params.phone,
        email: this.$route.params.email,
        mother: this.$route.params.mother,
        father: this.$route.params.father
       }})
    },

  }
}
