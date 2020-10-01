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
     <button name="possibleSaveGrades" v-if="possibleSave" @click="saveChanges()" class="btn btn-success btn-lg save">Zapisz zmiany</button>
     <button name="impossibleSaveGrades" v-else class="btn btn-success btn-lg save" disabled>Zapisz zmiany</button>
   </div>
   <button name="closeTheGradesPanel" @click="closeThePanel()"><img class="closeThePanel" src="../assets/eXit.png"/></button>
 </div>
</template>
<script>
import GradesService from "../assets/mixins.js"
import Grade from "./Grade.vue"
import { mapMutations } from "vuex"
//css-table
require("../assets/css/table.css");
export default {
 components: {
   "grade-component": Grade
 },
 watch: {
   "$store.state.newGrades.description": {
     handler: function(){
       const inputGradeDescription = document.querySelectorAll("input.description")[this.n].value;
       const descriptionCount = document.querySelectorAll("span.descriptionCount")[this.n];
       const counter = (30 - (inputGradeDescription.length));
       switch (counter) {
           case 2:
           case 3:
           case 4:
           case 22:
           case 23:
           case 24:
               descriptionCount.innerHTML = `Pozostały: ${counter} znaki.`;
               break;
           case 1:
               descriptionCount.innerHTML = `Pozostał: ${counter} znak.`;
               break;
           default:
               descriptionCount.innerHTML = `Pozostało: ${counter} znaków.`;
       }
     },
     deep:true
   }
 },
 name:"EditGrades",
 data(){
   return{
     ourStudent:{
       marks: [...this.$route.params.marks],
       weights: [...this.$route.params.weights],
       descriptions: [...this.$route.params.descriptions],
       dates: [...this.$route.params.dates],
       // marks: [].concat(this.$route.params.marks, this.$store.state.newGrades.marks),
       // weights: [].concat(this.$route.params.weights, this.$store.state.newGrades.weights),
       // descriptions: [].concat(this.$route.params.descriptions, this.$store.state.newGrades.descriptions),
       // dates: [].concat(this.$route.params.dates, this.$store.state.newGrades.dates),

     },
     characters: 30,
     gradesLength: 0,
       possibleSave: true
   }
 },
 beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.showTooltip(vm.$refs.EditStudentGrades, vm.ourStudent);
    })
 },
 beforeCreate(){
   this.$store.state.newGrades.marks = [...this.$route.params.marks];
   this.$store.state.newGrades.weights = [...this.$route.params.weights];
   this.$store.state.newGrades.descriptions = [...this.$route.params.descriptions];
   this.$store.state.newGrades.dates = [...this.$route.params.dates];
 },
 beforeMount(){
   // alert(this.ourStudent.marks)
   // this.$store.state.newGrades.marks = this.$route.params.marks;
   // this.$store.state.newGrades.weights = this.$route.params.weights;
   // this.$store.state.newGrades.descriptions = this.$route.params.descriptions;
   // this.$store.state.newGrades.dates = this.$route.params.dates;
 },
 mounted(){
   this.showTooltip(this.$refs.EditStudentGrades, this);
   // alert(this.ourStudent.marks)
 },
 destroyed(){
   this.$store.state.newGrades.marks = [];
   this.$store.state.newGrades.weights = [];
   this.$store.state.newGrades.descriptions = [];
   this.$store.state.newGrades.dates = [];
   // this.clearNewGradesArray([])
 },
 updated(){
   this.showTooltip(this.$refs.EditStudentGrades, this.$store.state.newGrades);
   for(let i=0; i<this.marks.length; i++){
     if( ((this.marks[i]!=="") && (this.weights[i]==="")) || ((this.marks[i]==="") && (this.weights[i]!==""))){
       this.possibleSave = false;
     }
   }
   // alert(this.ourStudent.marks)
   // this.ourStudent.marks = [].concat(this.$route.params.marks, this.$store.state.newGrades.marks);
 },
 props: ["showGradesEditionRouterView"],
 mixins: [GradesService],
 methods:{

   updater(){
     this.$forceUpdate();
   },
   remove(index){

     // alert(this.$store.state.newGrades.marks)
     // alert(this.ourStudent.marks)

     //clears table gradeWeightColor
     this.$store.state.newGrades.marks.splice(index,1);
     this.$store.state.newGrades.weights.splice(index,1);
     this.$store.state.newGrades.descriptions.splice(index,1);
     this.$store.state.newGrades.dates.splice(index,1);

     // alert(this.$store.state.newGrades.marks)
     // alert(this.ourStudent.marks)

     this.ourStudent.marks.splice(index,1);
     this.ourStudent.weights.splice(index,1);
     this.ourStudent.descriptions.splice(index,1);
     this.ourStudent.dates.splice(index,1);

     // alert(this.$store.state.newGrades.marks)
     // alert(this.ourStudent.marks)

      this.$forceUpdate();
   },
   changeGrade(index, newVal, what){
     this.$store.state.newGrades[what][index] = newVal;
     this.$store.state.newGrades.dates[index] = this.whatsTheDatePlease();
     this.$forceUpdate();

     this.possibleSave = true;

   },
   //adds a new grade to the new student
   moreGrades() {
     this.gradesLength++;
   },
   saveChanges(){

     const route = this.$route.params;

     const arrayMarks = [];
     const arrayWeights = [];
     const arrayDescriptions = [];
     const arrayDates = [];


     for(let i=0; i<this.$store.state.newGrades.marks.length; i++){
       if((this.$store.state.newGrades.marks[i]!=="")||(this.$store.state.newGrades.weights[i]!=="")){
         arrayMarks.push(this.$store.state.newGrades.marks[i])
         arrayWeights.push(this.$store.state.newGrades.weights[i])
         arrayDescriptions.push(this.$store.state.newGrades.descriptions[i])
         arrayDates.push(this.$store.state.newGrades.dates[i])
       }
     }

     this.$store.state.newGrades.marks = arrayMarks
     this.$store.state.newGrades.weights = arrayWeights
     this.$store.state.newGrades.descriptions = arrayDescriptions
     this.$store.state.newGrades.dates = arrayDates

     //divs in EditStudentGrades.vue and grades in Student.vue
     route.marks = this.marks;
     route.weights = this.weights;
     route.descriptions = this.descriptions;
     route.dates = this.dates;

     //table in EditStudentGrades.vue (gradeWeightColor())
     this.ourStudent.marks = this.marks;
     this.ourStudent.weights = this.weights;
     this.ourStudent.descriptions = this.descriptions;
     this.ourStudent.dates = this.dates;

     //adds to class in state in Vuex and FullClass.vue
     this.$store.state.students[route.id-1].marks = this.marks;
     this.$store.state.students[route.id-1].weights = this.weights;
     this.$store.state.students[route.id-1].descriptions = this.descriptions;
     this.$store.state.students[route.id-1].dates = this.dates;

     this.possibleSave = false;
     this.gradesLength = 0;


   },
   closeThePanel(){
     this.$router.push({name: "Student", params: {
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
select {
    font-size: 12px;
    padding-left: 6px;
    border-radius: 2px;
    background-color: black;
    width: 30px;
    background-image: url("./../assets/arrow_down.png");
    background-repeat: no-repeat, repeat;
    background-position: right .3em top 50%, 0 0 ;
    background-size: .55em auto, 130%
}
label {
    display: block;
    font-size: 13px;
    margin-bottom: 0;
}
input {
    margin-top: 10px;
    width: 90%;
    height: 23px;
    font-size: 12px;
    text-align: center;
    background-color: black;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    text-shadow: none;
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
.showAnotherGrade  button {
    background-color: #00c3ff;
    color: white;
    text-shadow: -1px 0 #00c3ff, 0 1px #00c3ff, 1px 0 #00c3ff, 0 -1px #00c3ff;
    -webkit-box-shadow: inset 0px 0px 20px 12px black,  0px 0px 20px 3px black;
    -moz-box-shadow: inset 0px 0px 20px 12px black,  0px 0px 20px 3px black;
    box-shadow: inset 0px 0px 20px 12px black,  0px 0px 20px 3px black;
    border: 1px solid #00c3ff !important;
    border-radius: 50%;
    margin-top: 20px;
    padding: 0 12px;
    font-size: 29px;
}
.showAnotherGrade  button:hover {
    background-color: black;
    -webkit-box-shadow: inset 0px 0px 15px 2px #00c3ff ,  0px 0px 15px 3px #00c3ff;
    -moz-box-shadow: inset 0px 0px 15px 2px #00c3ff ,  0px 0px 15px 3px #00c3ff;
    box-shadow: inset 0px 0px 15px 2px #00c3ff ,  0px 0px 15px 3px #00c3ff;
    color: black;
    border: 1px solid white !important;
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
span.remove{
    font-size: 10px;
    text-decoration: underline;
}
span.remove:hover{
    cursor: pointer;
}
@media (max-width: 768px){
  div.EditStudentGrades{
    width: 95%;
    top: -30%;
  }
  div[class^=col-]{
      padding: 0;
  }
  div.gainedGrades{
      /* width: 100%; */
  }
  .showAnotherGrade button{
      font-size: 19px;
      padding: 1px 9px;
      font-weight: 300;
  }
  label {
      font-size: 11px;
  }
  span.descriptionCount{
    font-size: 9.5px;
  }
  span.remove{
      font-size: 9px;
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
