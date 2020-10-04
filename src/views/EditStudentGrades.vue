<template lang="html">
 <div class="EditStudentGrades" ref="EditStudentGrades">
   <span id="EditStudentGradesTitle">Edycja ocen:</span>
   <div class="container">
     <div class="row">
       <div class="col-12 col-md-11">
         <div v-for="k in ourStudent.marks.length" :key="k">
           <div class="addStudentPanelGradesContentSingle">
             <div class="container gainedGrades">
               <div class="row">

                 <div class="col-2 col-md-3">
                     <div class="addStudentPanelGradesContentSingleGrade">
                       <label for="marks">Ocena:</label>
                       <div class="select">
                         <select id="marks" v-model.number="$store.state.newGrades.marks[k-1]" @change="changeGrade(k-1, $store.state.newGrades.marks[k-1], 'marks')">
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
                         <select id="weights" v-model.number="$store.state.newGrades.weights[k-1]" @change="changeGrade(k-1, $store.state.newGrades.weights[k-1], 'weights')">
                               <option value="1">1</option>
                               <option value="2">2</option>
                               <option value="3">3</option>
                           </select>
                       </div>
                   </div>
                 </div>

                 <div class="col-5">
                     <div class="addStudentPanelGradesContentSingleDescription">
                         <span class="descriptionCount">Pozostało: {{characters-$store.state.newGrades.descriptions[k-1].length}} znaków.</span>
                      <label>Opis oceny:
                        <input autocomplete="off" name="#" type="text" v-model="$store.state.newGrades.descriptions[k-1]" @change="changeGrade(k-1, $store.state.newGrades.descriptions[k-1], 'descriptions')" class="description" maxlength="30">
                      </label>
                     </div>
                 </div>

                 <div class="col-1">
                     <span @click="remove(k-1)" class="remove"><em>Usuń</em></span>
                 </div>

               </div>
             </div>
           </div>
         </div>
      </div>

      <div class="col-12 col-md-11" v-for="(n, index) in gradesLength" :key="n">

          <grade-component :index="index+ourStudent.marks.length" :gradesLength="gradesLength" v-on:updater="updater" :possibleSave.sync="possibleSave"></grade-component>

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
                   <span class="grades" v-html="gradeWeightColor($store.state.newGrades.marks, $store.state.newGrades.weights)">

                   </span>
               </td>

               <td>
                   <span>
                     {{avg($store.state.newGrades.marks, $store.state.newGrades.weights)}}
                   </span>
               </td>

               <td>
                 <span v-html="threatness(avg($store.state.newGrades.marks, $store.state.newGrades.weights))">

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
import MainMixins from "../assets/mixins/mixins.js"
import GradesService from "../assets/mixins/gradesMixins.js"

import Grade from "./Grade.vue"
export default {
 name:"EditGrades",
 components: {
   "grade-component": Grade
 },
 data(){
   return{
     ourStudent:{
       marks: [...this.$route.params.marks],
       weights: [...this.$route.params.weights],
       descriptions: [...this.$route.params.descriptions],
       dates: [...this.$route.params.dates],
     },
     characters: 30,
     gradesLength: 0,
     possibleSave: true
   }
 },
 props: ["showGradesEditionRouterView"],
 beforeCreate(){
   const store = this.$store.state.newGrades;
   const params = this.$route.params;
   for(const el in store){
     store[el] = [...params[el]]
   }
 },
 mounted(){
   this.showTooltip(this.$refs.EditStudentGrades, this);
 },
 beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.showTooltip(vm.$refs.EditStudentGrades, vm.ourStudent);
    })
 },
 updated(){
   this.showTooltip(this.$refs.EditStudentGrades, this.$store.state.newGrades);
   for(let i=0; i<this.marks.length; i++){
     if( ((this.marks[i]!=="") && (this.weights[i]==="")) || ((this.marks[i]==="") && (this.weights[i]!==""))){
       this.possibleSave = false;
     }
   }
 },
 destroyed(){
   this.$store.state.newGrades.marks = [];
   this.$store.state.newGrades.weights = [];
   this.$store.state.newGrades.descriptions = [];
   this.$store.state.newGrades.dates = [];
 },
 mixins: [MainMixins, GradesService],
 methods:{

   remove(index){
     const sourcesArray = [this.$store.state.newGrades, this.ourStudent];

     for(let i=0; i<sourcesArray.length; i++){
       for(const el in sourcesArray[i]){
         sourcesArray[i][el].splice(index,1)
       }
     }

     this.updater();
     this.possibleSave = true;

   },

   changeGrade(index, newVal, what){
     this[what][index] = newVal;
     this.dates[index] = this.whatsTheDatePlease();
     this.updater();
     this.possibleSave = true;
   },

   saveChanges(ourStudent){
     const route = this.$route.params;
     const store = this.$store.state.students[route.id-1];
     const storeGrades = this.$store.state.newGrades;

     const arrayMarks = [];
     const arrayWeights = [];
     const arrayDescriptions = [];
     const arrayDates = [];

     for(let i=0; i<storeGrades.marks.length; i++){
       if((storeGrades.marks[i]!=="")||(storeGrades.weights[i]!=="")){
         arrayMarks.push(storeGrades.marks[i])
         arrayWeights.push(storeGrades.weights[i])
         arrayDescriptions.push(storeGrades.descriptions[i])
         arrayDates.push(storeGrades.dates[i])
       }
     }

     storeGrades.marks = arrayMarks
     storeGrades.weights = arrayWeights
     storeGrades.descriptions = arrayDescriptions
     storeGrades.dates = arrayDates


     //table in EditStudentGrades.vue (gradeWeightColor())
     for(const el in ourStudent){

        //divs in EditStudentGrades.vue and grades in Student.vue
        route[el] = [...this[el]];

       //table in EditStudentGrades.vue (gradeWeightColor())
       ourStudent[el] = [...this[el]];

       //adds to class in state in Vuex and FullClass.vue
       store[el] = [...this[el]];

     }

     // //divs in EditStudentGrades.vue and grades in Student.vue
     // route.marks = [...this.marks];
     // route.weights = [...this.weights];
     // route.descriptions = [...this.descriptions];
     // route.dates = [...this.dates];

     // //table in EditStudentGrades.vue (gradeWeightColor())
     // this.ourStudent.marks = [...this.marks];
     // this.ourStudent.weights = [...this.weights];
     // this.ourStudent.descriptions = [...this.descriptions];
     // this.ourStudent.dates = [...this.dates];

     // //adds to class in state in Vuex and FullClass.vue
     // this.$store.state.students[route.id-1].marks = [...this.marks];
     // this.$store.state.students[route.id-1].weights = [...this.weights];
     // this.$store.state.students[route.id-1].descriptions = [...this.descriptions];
     // this.$store.state.students[route.id-1].dates = [...this.dates];

     this.gradesLength = 0;


     this.possibleSave = false;


   },
   closeThePanel(){
     this.pushMe("Student")
     this.$emit("update:showGradesEditionRouterView", false);
   }
 }
}
</script>
<style lang="css" scoped>
div.EditStudentGrades{
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
#EditStudentGradesTitle{
  display: block;
  margin-bottom: 40px;
}
div.gainedGradesAndNewGrades{
  width: 80%;
}
div.gainedGrades{
    margin: auto;
}
div.gainedGrades .row>div{
  align-content: flex-end;
  display: grid;
  margin-bottom: 30px;
}
.studentPanelSummary{
    width: 80%;
    margin: 150px auto 100px;
}
button.save{
  font-size: 15px;
  padding: 8px 12px;
  opacity: 1;
  float: right;
}
button.save[disabled]{
  background-color: red;
  cursor: not-allowed;
}
.showAnotherGrade{
    position: absolute;
    top: 50px;
    right: 20px
}
img.closeThePanel{
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
@media (max-width: 768px){
  div.EditStudentGrades{
    width: 95%;
    top: -30%;
  }
  .showAnotherGrade button{
      font-size: 19px;
      padding: 1px 9px;
      font-weight: 300;
  }
  table td{
    font-size: 11px;
  }
  button.save{
    font-size: 11px;
  }
  img.closeThePanel{
    width: 30px;
    height: 30px;
  }
}
</style>
