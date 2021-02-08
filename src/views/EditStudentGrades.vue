<template lang="html">
 <div class="EditStudentGrades" ref="editStudentGrades">
   <span id="EditStudentGradesTitle">Edycja ocen:</span>
   <div class="container">
     <div class="row">
       <div class="col-12 col-md-11">
         <div v-for="k in grades.marks.length" :key="k">
           <div class="addStudentPanelGradesContentSingle">
             <div class="container gainedGrades">
               <div class="row">

                 <div class="col-2 col-md-3">
                     <div class="addStudentPanelGradesContentSingleGrade">
                       <label for="marks">Ocena:</label>
                       <div class="select">
                         <select id="marks" v-model.number="ourStudent.marks[k-1]">
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                             <option value="4">4</option>
                             <option value="5">5</option>
                             <option value="6">6</option>
                         </select>
                       </div>
                   </div>
                 </div>

                 <div class="col-2 col-md-3">
                     <div class="addStudentPanelGradesContentSingleWeight">
                       <label for="weight">Waga oceny:</label>
                       <div class="select">
                         <select id="weights" v-model.number="ourStudent.weights[k-1]">
                               <option value="1">1</option>
                               <option value="2">2</option>
                               <option value="3">3</option>
                           </select>
                       </div>
                   </div>
                 </div>

                 <div class="col-5">
                     <div class="addStudentPanelGradesContentSingleDescription">
                         <span class="descriptionCount">Pozostało: {{ characters - ourStudent.descriptions[k-1].length }} znaków.</span>
                      <label>Opis oceny:
                        <input autocomplete="off" name="#" type="text" v-model="ourStudent.descriptions[k-1]" class="description" maxlength="30">
                      </label>
                     </div>
                 </div>

                 <div class="col-1">
                     <span @click="removeGrade(k-1)" class="removeGrade"><em>Usuń</em></span>
                 </div>

               </div>
             </div>
           </div>
         </div>
      </div>

      <div class="col-12 col-md-11" v-for="(n, index) in gradesLength" :key="n">

          <grade-component :index="index+grades.marks.length" :gradesLength="gradesLength" @updater="updater" v-model:possibleSave="possibleSave"></grade-component>

      </div>

      <div class="showAnotherGrade">
        <button name="moreGradesEditGrades" @click="moreGrades()">  +  </button>
      </div>
     </div>
     <div class="row">
       <div class="studentPanelSummary">
         <table class="summary">

           <tr>
               <td>
                 <span>{{$route.params.lastName.toUpperCase()}} {{$route.params.firstName}}</span>
               </td>

               <td ref="allnewGrades">
                   <span class="grades" v-html="gradeWeightColor(ourStudent.marks, ourStudent.weights)">

                   </span>
               </td>

               <td>
                   <span>
                     {{avg(ourStudent.marks, ourStudent.weights)}}
                   </span>
               </td>

               <td>
                 <span v-html="threatness(avg(ourStudent.marks, ourStudent.weights))">

                 </span>
               </td>
           </tr>
         </table>
       </div>
     </div>
     
     <button name="possibleSaveGrades" v-if="possibleSave" @click="saveChanges(ourStudent)" class="btn btn-success btn-lg save">Zapisz zmiany</button>
     <button name="impossibleSaveGrades" v-else class="btn btn-success btn-lg save" disabled>Zapisz zmiany</button>
   </div>
   <button name="closeTheGradesPanel" @click="closeThePanel()"><img class="closeThePanel" src="../assets/images/eXit.png"/></button>
 </div>
</template>

<script>
import mainMixins from "../assets/mixins/mixins.js"
import gradesService from "../assets/mixins/gradesMixins.js"

import Grade from "./Grade.vue"

import{ ref, computed, onMounted, onUpdated, onUnmounted } from "vue";
import{ useStore } from "vuex";
import{ useRoute, useRouter } from "vue-router";

export default {
 name:"EditGrades",
 components: {
   "grade-component": Grade
 },
 setup(_, { emit }){

   const store = useStore()
   
   const route = useRoute()
   const router = useRouter()

  const editStudentGrades = ref(null)
 
  const ourStudent = ref({
    marks: [...route.params.marks].map(el => parseInt(el)),
    weights: [...route.params.weights].map(el => parseInt(el)),
    descriptions: [...route.params.descriptions],
    dates: [...route.params.dates],
  });

  const characters = ref(30);
  const gradesLength = ref(0);
  const possibleSave = ref(true);

  const grades = computed(() => store.state.newGrades ).value;

  route.params.marks = route.params.marks.map(el => parseInt(el));
  route.params.weights = route.params.weights.map(el => parseInt(el));

  for(const el in grades){
    grades[el] = [...route.params[el]]
  }
   
  function removeGrade(index){

    // here there are vuex and this component stud
    const sourcesArray = [grades];

    for(let i=0; i<sourcesArray.length; i++){
      for(const el in sourcesArray[i]){
        sourcesArray[i][el].splice(index,1)
      }
    }

    this.possibleSave = true;

  }
   

  function closeThePanel(){
    router.push({name: "Student", params: route.params})
    emit("update:showGradesEditionRouterView", false);
  }

 
  onMounted(()=>{
    gradesService().showTooltip(editStudentGrades.value, grades);
  })

  onUpdated(()=>{
   gradesService().showTooltip(editStudentGrades.value, grades);
   for(let i=0; i<grades.marks.length; i++){
     if( ((grades.marks[i]!=="") && (grades.weights[i]==="")) || ((grades.marks[i]==="") && (grades.weights[i]!==""))){
       possibleSave = false;
     }
   }
  })

  onUnmounted(()=>{
    store.state.newGrades.marks = [];
    store.state.newGrades.weights = [];
    store.state.newGrades.descriptions = [];
    store.state.newGrades.dates = [];
  })

  return{
    params: route.params,
    store,
    grades,
    editStudentGrades,
    ourStudent,
    characters,
    gradesLength,
    possibleSave,
    removeGrade,
    // changeGrade,
    closeThePanel,
    ...mainMixins(),
    ...gradesService()
  }
 }
}
</script>
<style lang="css" scoped>
div.EditStudentGrades {
  width: 90%;
  max-width: 1400px;
  margin: 100px auto;
  -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
  -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
  box-shadow: 3px 3px 30px 5px #00c3ff;
  background-color: rgba(0, 0, 0, 1);
  text-align: center;
  font-size: 13px;
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  padding: 70px 0 40px;
}
#EditStudentGradesTitle {
  display: block;
  margin-bottom: 40px;
}
div.gainedGradesAndNewGrades {
  width: 80%;
}
div.gainedGrades {
  margin: auto;
}
div.gainedGrades .row > div {
  align-content: flex-end;
  display: grid;
  margin-bottom: 30px;
}
.studentPanelSummary {
  width: 80%;
  margin: 150px auto 100px;
}
button.save {
  font-size: 15px;
  padding: 8px 12px;
  opacity: 1;
  float: right;
}
button.save[disabled] {
  background-color: red;
  cursor: not-allowed;
}
.showAnotherGrade {
  position: absolute;
  top: 50px;
  right: 20px;
}
img.closeThePanel {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 40px;
  height: 40px;
  -webkit-box-shadow: 2px 2px 10px 2px #d54545;
  -moz-box-shadow: 2px 2px 10px 2px #d54545;
  box-shadow: 2px 2px 10px 2px #d54545;
  border-radius: 50px;
}
@media (max-width: 768px) {
  div.EditStudentGrades {
    width: 95%;
    top: -30%;
  }
  .showAnotherGrade button {
    font-size: 19px;
    padding: 1px 9px;
    font-weight: 300;
  }
  table td {
    font-size: 11px;
  }
  button.save {
    font-size: 11px;
  }
  img.closeThePanel {
    width: 30px;
    height: 30px;
  }
}
</style>
