import { useRouter, useRoute } from 'vue-router'
import { useStore } from "vuex";
import { computed } from "vue" 

export default function mainMixin(){

    const router = useRouter();
    const route = useRoute();

    const store = useStore();


    //regular expressions
    function validatorData(Data, RegularExpression, Format) {
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
    }

    //saves changes
    function saveChanges(ourStudent){

      // console.log(ourStudent)
      // console.log(ourStudent.value)
      const params = route.params;
      // const student = computed(() => store.state.newGrades ).value;
      console.log(params)
      // computed(() => store.state.students[params.id-1];
      const store2 = store.state.students[params.id-1];
      console.log(store2.marks)

      for(const el in ourStudent){

        // this is the version dedicated for street, mother and father datas
        if(params[el]!=ourStudent[el]){
          if((el==="street")||(el==="mother")||(el==="father")){
              for(const el2 in params[el]){
                if(params[el][el2]!=ourStudent[el][el2]){
                      params[el][el2] = ourStudent[el][el2];
                      store2[el][el2] = ourStudent[el][el2];
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
             store2[el] = [...this[el]];
          }
          else{
            params[el] = ourStudent[el];
            store2[el] = ourStudent[el];
            this.showGreenCheckMark[el] = true;
            setTimeout(()=>{this.hideCheckMarkWithLayer[el] = false},1);
          }
        }

      }

      this.gradesLength = 0;
      this.possibleSave = false;
    }

    function pushMe(componentName){
      router.push({name: componentName, params: {
        id: route.params.id,
        lastName: route.params.lastName,
        firstName: route.params.firstName,
        marks: route.params.marks,
        weights: route.params.weights,
        descriptions: route.params.descriptions,
        dates: route.params.dates,
        pesel: route.params.pesel,
        street: route.params.street,
        phone: route.params.phone,
        email: route.params.email,
        mother: route.params.mother,
        father: route.params.father
       }})
    }

    return{
      validatorData,
      saveChanges,
      pushMe
    }

}
