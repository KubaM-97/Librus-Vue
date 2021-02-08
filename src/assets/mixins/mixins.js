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
    function saveChanges(ourStudent, showGreenCheckMark, hideCheckMarkWithLayer){

      const fromParams = route.params;
      const fromState = store.state.students[fromParams.id-1];
      
      for(const category in ourStudent){
        console.log(fromParams[category])
        console.log(ourStudent[category])
        if(fromParams[category]!=ourStudent[category]){
          console.log("c")
          fromParams[category] = ourStudent[category];
          fromState[category] = ourStudent[category];
          switch(ourStudent[category]){
            case ourStudent.streetName:
            case ourStudent.streetNr:
            case ourStudent.streetFlat:
            case ourStudent.streetPostcode:
            case ourStudent.streetCity:
              showGreenCheckMark.street = true;
              setTimeout(()=>{hideCheckMarkWithLayer.street = false},1);
              break;
            
            case ourStudent.motherFirstName:
            case ourStudent.motherLastName:
            case ourStudent.motherPhone:
            case ourStudent.motherEmail:
              showGreenCheckMark.mother = true;
              setTimeout(()=>{hideCheckMarkWithLayer.mother = false},1);
              break;
            
            case ourStudent.fatherFirstName:
            case ourStudent.fatherLastName:
            case ourStudent.fatherPhone:
            case ourStudent.fatherEmail:
              showGreenCheckMark.father = true;
              setTimeout(()=>{hideCheckMarkWithLayer.father = false},1);
              break;
            
            default: 
            showGreenCheckMark[category] = true
            setTimeout(()=>{hideCheckMarkWithLayer[category] = false},1);
            break;
            
          }

        // // this is the version dedicated for street, mother and father datas
        // // if(fromParams[category]!=ourStudent[category]){

        //   if((category==="street")||(category==="mother")||(category==="father")){

        //       // console.log(JSON.parse(fromParams.street))
        //       // console.log(ourStudent.street)
        //       // console.log(fromState.street)

        //       // console.log("=====================")

        //       // console.log(JSON.parse(fromParams.street).city)
        //       // console.log(ourStudent.street.city)
        //       // console.log(fromState.street.city)

        //       for(const subCategory in ourStudent[category]){
        //         if(fromParams[category][subCategory]!=ourStudent[category][subCategory]){

        //           // console.log(fromParams[category][subCategory])
        //           // console.log(ourStudent[category][subCategory])
                  
        //             if(typeof fromParams[category] === "string") fromParams[category] = JSON.parse(fromParams[category])
                  
        //             fromParams[category][subCategory] = ourStudent[category][subCategory];
        //             fromState[category][subCategory] = ourStudent[category][subCategory];

        //             if(typeof fromParams[category] === "object") fromParams[category] = JSON.stringify(fromParams[category])

        //             showGreenCheckMark[category] = true;
        //             setTimeout(()=>{hideCheckMarkWithLayer[category]= false},1);
        //         }

        //       }

        //   }
        //   // this is the version dedicated for the rest of datas
        //   else if((category==="marks")||(category==="weights")||(category==="descriptions")||(category==="dates")){
             
        //      //updates route.params, divs in EditStudentGrades.vue and divs in Student.vue
        //      fromParams[category] = ourStudent[category];

        //     //  //table in EditStudentGrades.vue (gradeWeightColor())
        //     //  ourStudent[category] = [...this[category]];

        //      //adds to class in state in Vuex and FullClass.vue
        //      fromState[category] = ourStudent[category];

        //   }
        //   else{
        //     // console.log(showGreenCheckMark)
        //     fromParams[category] = ourStudent[category];
        //     fromState[category] = ourStudent[category];
        //     // console.log(showGreenCheckMark[category] )
        //     showGreenCheckMark[category] = true;
        //     setTimeout(()=>{hideCheckMarkWithLayer[category] = false},1);
        //   }
        }
        }

      // } 
        
      this.gradesLength = 0;
      this.possibleSave = false;
    }

    // function pushMe(componentName){
    //   router.push({name: componentName, params: {
    //     id: route.params.id,
    //     lastName: route.params.lastName,
    //     firstName: route.params.firstName,
    //     marks: route.params.marks,
    //     weights: route.params.weights,
    //     descriptions: route.params.descriptions,
    //     dates: route.params.dates,
    //     pesel: route.params.pesel,
    //     street: route.params.street,
    //     phone: route.params.phone,
    //     email: route.params.email,
    //     mother: route.params.mother,
    //     father: route.params.father
    //    }})
    // }

    return{
      validatorData,
      saveChanges,
      // pushMe
    }

}
