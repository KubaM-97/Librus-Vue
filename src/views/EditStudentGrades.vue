<template lang="html">
  <div class="EditStudentGrades">
    Edycja ocen:
    <div class="container">
      <div class="row">
        <div class="col-11">
          <div v-for="k in $route.params.grades.length" :key="k">
            <div class="container gainedGrades">
              <div class="row">

                <div class="col-3">
                    <div class="addStudentPanelGradesContentSingleGrade">
                      <label for="grades">Ocena:</label>
                      <div class="select">
                        <select v-model.number="student.grades[k-1]" @change="changeGrade(k-1, $route.params.id, $route.params.grades[k-1])">
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
                          <select v-model.number="student.weights[k-1]" @change="changeWeight(k-1, $route.params.id, $route.params.weights[k-1])">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                          </select>
                      </div>
                  </div>
                </div>

                <div class="col-5">
                    <div class="addStudentPanelGradesContentSingleDescription">
                        <span class="descriptionCount">Pozostało: {{characters-student.descriptions[k-1].length}} znaków.</span>
                     <label>Opis oceny:
                         <input type="text" v-model="student.descriptions[k-1]" @change="changeDescription(k-1, $route.params.id, $route.params.descriptions[k-1])" class="description" maxlength="30">
                     </label>
                    </div>
                </div>

                <div class="col-1">
                    <span @click="remove(k-1, $route.params.id)" class="remove"><em>Usuń</em></span>
                </div>
              </div>
            </div>
          </div>
       </div>

       <div class="col-md-12" style="margin: auto" v-for="(n,index) in gradesLength" :key="index">

         <grade-component :n.sync="n" :gradesLength.sync="gradesLength" :a.sync="a"></grade-component>

       </div>

       <div class="col-1 showAnotherGrade">
         <button @click="moreGrades()">  +  </button>
       </div>
      </div>
      <div class="row">

        <div class="studentPanelSummary">

          <table class="summary">

                    <tr>
                        <td>
                          <span>{{this.$route.params.lastName.toUpperCase()}} {{this.$route.params.firstName}}</span>
                        </td>

                        <td ref="allnewGrades">
                            <span v-html="gradeWeightColor($route.params.grades, $route.params.weights)">

                            </span>
                        </td>

                        <td>
                            <span>
                              {{avg(this.$route.params.grades, this.$route.params.weights)}}
                            </span>
                        </td>

                        <td>
                          <span v-html="threatness(avg(this.$route.params.grades, this.$route.params.weights))">

                          </span>
                        </td>
                    </tr>

          </table>

        </div>

      </div>
    </div>

    <button @click="closeThePanel()"><img class="closeThePanel" src="../assets/eXit.png"/></button>

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
    "student.description": {
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
      student:{
        grades: this.$route.params.grades,
        weights: this.$route.params.weights,
        descriptions: this.$route.params.descriptions,
      },
      characters: 30,
      gradesLength: 0,
      payload:{
        placeInArray: "",
        StudentID: "",
        newValue: ""
      }
    }
  },
  created(){console.log(this.student.descriptions[3].length)},
  props: ["showDataEditionRouterView"],
  mixins: [GradesService],
  methods:{
    
    ...mapMutations([
      "removeGrade",
      "editStudentGrade",
      "editStudentWeight",
      "editStudentDescription",
      "editStudentGrade",
    ]),

    remove(placeInArray, StudentID){
      this.payload.placeInArray = placeInArray;
      this.payload.StudentID = StudentID;
      this.removeGrade(this.payload);
    },

    changeGrade(placeInArray, StudentID, newVal){
      this.payload.placeInArray = placeInArray;
      this.payload.StudentID = StudentID;
      this.payload.newValue = newVal;
      this.editStudentGrade(this.payload);
    },
    changeWeight(placeInArray, StudentID, newVal){
      this.payload.placeInArray = placeInArray;
      this.payload.StudentID = StudentID;
      this.payload.newValue = newVal;
      this.editStudentWeight(this.payload);
    },
    changeDescription(placeInArray, StudentID, newVal){
      this.payload.placeInArray = placeInArray;
      this.payload.StudentID = StudentID;
      this.payload.newValue = newVal;
      this.editStudentDescription(this.payload);
    },

    //adds a new grade to the new student
    moreGrades: function() {
      this.gradesLength++;
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -47%);
    padding: 70px 0 40px;
}
div.gainedGrades{
    margin: 10px;
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
    width: 65%;
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
    margin: auto;
    margin-top: 100px;
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
