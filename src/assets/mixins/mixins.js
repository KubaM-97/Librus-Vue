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

    //saves changes
    saveChanges(ourStudent){

      const params = this.$route.params;
      const store = this.$store.state.students[params.id-1];

      for(const el in ourStudent){

        // this is the version dedicated for street, mother and father datas
        if(params[el]!=ourStudent[el]){
          if((el==="street")||(el==="mother")||(el==="father")){
            // alert(params[el])
              for(const el2 in params[el]){
                if(params[el][el2]!=ourStudent[el][el2]){
                      params[el][el2] = ourStudent[el][el2];
                      store[el][el2] = ourStudent[el][el2];
                      this.showGreenCheckMark[el] = true;
                      setTimeout(()=>{this.hideCheckMarkWithLayer[el]= false},1);

                }
              }

          }
          // this is the version dedicated for the rest of datas
          else if((el==="marks")||(el==="weights")||(el==="descriptions")||(el==="dates")){

             this.getRidOfEmptyGrades();

             //divs in EditStudentGrades.vue and grades in Student.vue
             params[el] = [...this[el]];

             //table in EditStudentGrades.vue (gradeWeightColor())
             ourStudent[el] = [...this[el]];

             //adds to class in state in Vuex and FullClass.vue
             store[el] = [...this[el]];
          }
          else{
            params[el] = ourStudent[el];
            store[el] = ourStudent[el];
            this.showGreenCheckMark[el] = true;
            setTimeout(()=>{this.hideCheckMarkWithLayer[el] = false},1);
          }
        }

      }

      this.gradesLength = 0;
      this.possibleSave = false;
    },

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
