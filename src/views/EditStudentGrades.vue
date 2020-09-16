<template lang="html">
  <div class="EditStudentGrades" ref="EditStudentGrades">
    <span id="EditStudentGradesTitle">Edycja ocen:</span>
    <div class="container">
      <div class="row">
        <div class="col-11">
          <div v-for="k in $route.params.grades.length" :key="k">
            <div class="addStudentPanelGradesContentSingle">
              <div class="container gainedGrades">
                <div class="row">

                  <div class="col-3">
                      <div class="addStudentPanelGradesContentSingleGrade">
                        <label for="grades">Ocena:</label>
                        <div class="select">
                          <select v-model.number="$route.params.grades[k-1]" @change="changeGrade(k-1, $route.params.grades[k-1])">
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

                  <div class="col-3">
                      <div class="addStudentPanelGradesContentSingleWeight">
                        <label for="weight">Waga oceny:</label>
                        <div class="select">
                            <select v-model.number="$route.params.weights[k-1]" @change="changeWeight(k-1, $route.params.weights[k-1])">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                    </div>
                  </div>

                  <div class="col-5">
                      <div class="addStudentPanelGradesContentSingleDescription">
                          <span class="descriptionCount">Pozostało: {{characters-$route.params.descriptions[k-1].length}} znaków.</span>
                       <label>Opis oceny:
                           <input type="text" v-model="$route.params.descriptions[k-1]" @change="changeDescription(k-1, $route.params.descriptions[k-1])" class="description" maxlength="30">
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

       <div class="col-11" v-for="n in gradesLength" :key="n">
         {{n  }}
         <grade-component :n="n+$store.state.newGrades.grades.length" :gradesLength="gradesLength" :a.sync="a"></grade-component>

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
                            <span v-html="gradeWeightColor($route.params.grades, $route.params.weights)">

                            </span>
                        </td>

                        <td>
                            <span>
                              {{avg($route.params.grades, $route.params.weights)}}
                            </span>
                        </td>

                        <td>
                          <span v-html="threatness(avg($route.params.grades, $route.params.weights))">

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
require("../assets/table.css");

export default {
  components: {
    "grade-component": Grade
  },
  watch: {
    "ourStudent.description": {
      handler: function(){
        // alert(33)
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
        grades: [].concat(this.$route.params.grades, this.$store.state.newGrades.grades),
        weights: [].concat(this.$route.params.weights, this.$store.state.newGrades.weights),
        descriptions: [].concat(this.$route.params.descriptions, this.$store.state.newGrades.descriptions),
        dates: [].concat(this.$route.params.dates, this.$store.state.newGrades.dates),
        itemsToChange: "",
        placeInArray: "",
        value: ""
      },
      characters: 30,
      gradesLength: 0,
      a: 1,
      // payload:{
      //   placeInArray: "",
      //   newValue: "",
      //   date: ""
      // },
        possibleSave: true
    }
  },
  beforeRouteEnter (to, from, next) {
     next(vm => {
       vm.showTooltip(vm.$refs.EditStudentGrades, vm.ourStudent);
     })
  },
  beforeMount(){
    // alert(this.ourStudent.grades)
    // this.$store.state.newGrades.grades = this.$route.params.grades;
    // this.$store.state.newGrades.weights = this.$route.params.weights;
    // this.$store.state.newGrades.descriptions = this.$route.params.descriptions;
    // this.$store.state.newGrades.dates = this.$route.params.dates;
  },
  mounted(){
    // alert(this.ourStudent.grades)
  },
  destroyed(){
    this.$store.state.newGrades.grades = [];
    this.$store.state.newGrades.weights = [];
    this.$store.state.newGrades.descriptions = [];
    this.$store.state.newGrades.dates = [];
  },
  updated(){
    this.showTooltip(this.$refs.EditStudentGrades, this.ourStudent);
    // alert(this.ourStudent.grades)
    // this.ourStudent.grades = [].concat(this.$route.params.grades, this.$store.state.newGrades.grades);
  },
  props: ["showDataEditionRouterView"],
  mixins: [GradesService],
  methods:{

    ...mapMutations([
      "editStudent",
      "editStudentGrade",
      "editStudentWeight",
      "editStudentDescription",
      "editStudentDate",
      "removeGrade"
    ]),

    remove(placeInArray){
      this.$route.params.grades.splice(placeInArray,1);
      this.$route.params.weights.splice(placeInArray,1);
      this.$route.params.descriptions.splice(placeInArray,1);
      this.$route.params.dates.splice(placeInArray,1);
      this.$forceUpdate();
      console.log(this.$route.params.grades)
      console.log(this.$route.params.grades.length)
      // this.$destroy(placeInArray);
      // alert(this.ourStudent.grades.length)
      // this.removeGrade(placeInArray);
      // alert(this.ourStudent.grades.length)
      // this.ourStudent.grades.length--;
        // this.$store.state.newGrades.grades = "";
        // this.$store.state.newGrades.weights = "";
        // this.$store.state.newGrades.descriptions = "";
        // this.$store.state.newGrades.dates = "";
    },

    // changeStudent(placeInArray, newValue, itemsToChange){
    //   this.ourStudent.dates[placeInArray] = this.whatsTheDatePlease();
    //   this.ourStudent.itemsToChange = itemsToChange;
    //   this.editStudent(this.ourStudent)
    // },

    changeGrade(placeInArray, newVal, what){

      this.ourStudent.grades[placeInArray] = newVal;
      this.$forceUpdate()

      this.possibleSave = true;

    },
    changeWeight(placeInArray,newVal, what){

      this.ourStudent.weights[placeInArray] = newVal;
      this.$forceUpdate()

      this.possibleSave = true;

    },
    changeDescription(placeInArray,newVal, what){

      this.ourStudent.descriptions[placeInArray] = newVal;
      this.$forceUpdate()

      this.possibleSave = true;

    },

    //adds a new grade to the new student
    moreGrades() {
      this.gradesLength++;
    },

    //returns current Date in an Array
    whatsTheDatePlease() {
        const today = new Date();
        const currentYear = today.getFullYear();
        let currentMonth = today.getMonth();
        let currentDay = today.getDate();
        let currentHours = today.getHours();
        let currentMinutes = today.getMinutes();
        let currentSeconds = today.getSeconds();
        if (currentMonth < 10) {
            currentMonth = `0${currentMonth}`;
        }
        if (currentDay < 10) {
            currentDay = `0${currentDay}`;
        }
        if (currentHours < 10) {
            currentHours = `0${currentHours}`;
        }
        if (currentMinutes < 10) {
            currentMinutes = `0${currentMinutes}`;
        }
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        // [DD.MM.YYYY]
        const dateSubArrayDDMMYYYY = [currentDay, currentMonth, currentYear].join(".");

        // [HH:MM:SS]
        const dateSubArrayHHMMSS = [currentHours, currentMinutes, currentSeconds].join(":");

        // [["DD.MM.YYYY"] ["HH:MM:SS"]]
        const dateFull = [];
        dateFull.push(dateSubArrayDDMMYYYY, dateSubArrayHHMMSS)

        // DD.MM.YYYY HH:MM:SS
        const dateFullStr = dateFull.join(" ")

        // [DD.MM.YYYY HH:MM:SS]
        const dateFullArray = [];
        dateFullArray.push(dateFullStr);

        let dateArray;
        return dateArray = dateFullStr;

    },

    saveChanges(){

      const old = this.$route.params;
      const store = this.$store.state.students[this.$route.params.id-1];
      const ourStudent = this.ourStudent;

      old.grades = ourStudent.grades;
      old.weights = ourStudent.weights;
      old.descriptions = ourStudent.descriptions;
      old.dates = ourStudent.dates;

      store.grades = ourStudent.grades;
      store.weights = ourStudent.weights;
      store.descriptions = ourStudent.descriptions;
      store.dates = ourStudent.dates;

      this.possibleSave = false;

    },

    closeThePanel(){
      this.$emit("update:showGradesEditionRouterView", false)
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
    font-size: 15px;
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    padding: 70px 0 40px;
}
div.gainedGrades{
    margin: 15px;
}
div.gainedGrades .row>div{
  align-content: flex-end;
  display: grid;
}
select {
    margin-top: 5px;
    line-height: 1.7em;
    font-size: 15px;
    text-shadow: none;
    padding-left: 6px;
    border-radius: 2px;
    background-color: black;
    appearance: none;
    width: 35px;
    background-image: url("./../assets/arrow_down.png");
    background-repeat: no-repeat, repeat;
    background-position: right .3em top 50%, 0 0 ;
    background-size: .55em auto, 130%
}
select option {
    color: #00c3ff;
    text-align: center;
    border-bottom: 1px solid blue;
}
label {
    display: block;
    font-size: 14px;
    margin-bottom: 0;
}
input {
    outline: none;
    display: block;
    margin: auto;
    margin-top: 10px;
    width: 90%;
    height: 23px;
    font-size: 14px;
    text-align: center;
    background-color: black;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    text-shadow: none;
}

.studentPanelSummary{
    width: 80%;
    margin: 200px auto 100px;
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
    font-size: 12px;
    text-decoration: underline;
}
span.remove:hover{
    cursor: pointer;
}
@media (max-width: 768px){
    .showAnotherGrade button{
        font-size: 19px;
        padding: 1px 9px;
        font-weight: 300;
    }
}
</style>
