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
                        <select v-model.number="$route.params.grades[k-1]" @change="changeGrade(k-1, $route.params.id, $route.params.grades[k-1])">
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
                          <select v-model.number="$route.params.weights[k-1]" @change="changeWeight(k-1, $route.params.id)">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                          </select>
                      </div>
                  </div>
                </div>

                <div class="col-5">
                    <div class="addStudentPanelGradesContentSingleDescription">
                        <span class="descriptionCount">Pozostało: {{characters}} znaków.</span>
                     <label>Opis oceny:
                         <input type="text" v-model="startPack.description[k-1]" @change="changeDescription(k-1, $route.params.id)" class="description" maxlength="30">
                     </label>
                    </div>
                </div>

                <div class="col-1">
                    <span @click="remove()" class="remove"><em>Usuń</em></span>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="addStudentPanelGradesContent" v-for="n in gradesLength" :key="n">

            <grade-component :n="n-1"></grade-component>

          </div> -->

          <!-- <div v-for="n in $route.params.grades.length" :key="n">
            <div v-if="$route.params.weights[n-1]==1" class="gradeWeightColor gradeWeightGreen" v-html="$route.params.grades[n-1]">
              $route.params.grades[n-1]
            </div>
            <div v-else-if="$route.params.weights[n-1]==2" class="gradeWeightColor gradeWeightYellow" v-html="$route.params.grades[n-1]">

            </div>
            <div v-else-if="$route.params.weights[n-1]==3" class="gradeWeightColor gradeWeightRed" v-html="$route.params.grades[n-1]">
              $route.params.grades[n-1]
            </div>
          </div> -->

        <!-- <div v-for="n in $route.params.grades.length" :key="n">
          <grade-component></grade-component>
        </div> -->

       </div>
       <div class="col-1 showAnotherGrade">
         <button @click="addNewGrade()">  +  </button>
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
                            <span v-html="gradeWeightColor(this.$route.params.grades)">

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
//css-table
require("../assets/table.css");
// import Grade from "./Grade.vue"
export default {
  computed: {
    pickedItem() {
      return this.$route.params.grades[0];
    }
  },
  watch: {
    "startPack.description": {
      handler: function(newVal,oldVal){
        // alert(33)
        const inputGradeDescription = document.querySelectorAll(".description")[this.n].value;
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
  // components:{"grade-component": Grade},
  data(){
    return{
      startPack: {
        description: this.$route.params.descriptions
      },
      characters: 30,
      gradesLength: 1,
      payload:{
        placeInArray: "",
        StudentID: "",
        newValue: ""
      }
    }
  },
  // beforeUpdate(){alert(222)},
  props: ["showDataEditionRouterView"],
  // created(){
  //   alert(this.$route.params.grades[0])
  // },
  methods:{
    remove(){
      console.log(this.$store.state.newGrades)
      document.querySelectorAll(".addStudentPanelGradesContentSingle")[this.n].innerHTML = "";
      document.querySelectorAll(".addStudentPanelGradesContent")[this.n].style.marginTop = "0px"
      document.querySelectorAll(".addStudentPanelGradesContentSingle")[this.n].style.marginBottom ="0px";
      this.$store.commit("removeGrade", this.payload);
      // document.querySelectorAll(".addStudentPanelGradesContentSingle")[this.n].removeAttribute("class");
      this.$emit("update:a", this.a+1)
      console.log(this.$store.state.newGrades)
    },
    changeGrade(placeInArray, StudentID, newVal){
      this.payload.placeInArray = placeInArray;
      this.payload.StudentID = StudentID;
      this.payload.newValue = newVal;
      this.$store.commit("changeStudentGrade", this.payload);
      console.log(this.$store.state.students)
    },
    changeWeight(placeInArray, StudentID){
      this.$store.commit("changeStudentWeight", this.changeWeighta);
    },
    changeDescription(placeInArray, StudentID){
      this.$store.commit("changeStudentDescription", this.changeDescriptiona);
    },
    //adds a new grade to the new student
    addNewGrade: function() {
      this.gradesLength++;
    },

    // addNewGrade(){
    //   alert(222)
    //     this.$store.commit("addNewGradeToArray", this.payload);
    // },

    //colors grades
    gradeWeightColor: function(newGrades) {

      // alert(1)
      let limit = this.$route.params.grades.length;
      if(this.$route.params.weights.length>this.$route.params.grades.length){
        limit = this.$route.params.weights.length
      }

      let aaa = "";

        for (let i = 0; i < limit; i++) {
            if(this.$route.params.grades[i]!==undefined){
                  if (this.$route.params.weights[i] == 1) {
                      aaa += `<div class="gradeWeightColor gradeWeightGreen">${this.$route.params.grades[i]}</div>`
                  } else if (this.$route.params.weights[i] == 2) {
                      aaa +=  `<div class="gradeWeightColor gradeWeightYellow">${this.$route.params.grades[i]}</div>`
                  } else if (this.$route.params.weights[i] == 3) {
                      aaa +=  `<div class="gradeWeightColor gradeWeightRed">${this.$route.params.grades[i]}</div>`
                  }
                  else if(this.$route.params.weights[i]==undefined){
                    aaa +=  `<div class="gradeWeightColor">${this.$route.params.grades[i]}</div>`
                  }

            }
            // else if(this.$store.state.newGrades.grades[i]==undefined){
            //   if(this.$store.state.newGrades.weights[i]===1){
            //     aaa +=  `<div class="gradeWeightColor gradeWeightGreen" style="height:32px;"> </div>`
            //   }
            //   else if(this.$store.state.newGrades.weights[i]===2){
            //     aaa +=  `<div class="gradeWeightColor gradeWeightYellow" style="height:32px;"> </div>`
            //   }
            //   else if(this.$store.state.newGrades.weights[i]===3){
            //     aaa +=  `<div class="gradeWeightColor gradeWeightRed" style="height:32px;"> </div>`
            //   }

            // }
            // else if((this.$store.state.newGrades.grades[i]!=="")&&(this.$store.state.newGrades.weights[i]==="")) {
            // alert(222)
            // }
            // else {
            //   aaa +=  `<div class="gradeWeightColor">${this.$store.state.newGrades.grades[i]}</div>`
            // }



            // if((this.$route.params.grades[i]!="")&&(this.$route.params.weights[i]!="")&&(this.$route.params.descriptions[i]!="")&&(this.$route.params.dates[i]!="")){
            //   this.showTooltip();
            // }
        }



        return aaa


    },

    //returns grades' average
    avg: function(gradesArray, weightArray) {

        let gradesSuperValue = 0;
        let weightSum = 0;


        for (let i = 0; i < gradesArray.length; i++) {
            gradesSuperValue += gradesArray[i] * weightArray[i];
            weightSum += weightArray[i]
        }

        //round avg to 2 decimal places
        const average = gradesSuperValue / weightSum;
        let averageRounded = (Math.round(average * 100) / 100).toFixed(2);
        if(isNaN(averageRounded)){
          averageRounded = ""
        }
        return averageRounded;


    },

    //decides if student is threated
    threatness: function(myAVG) {
        if ((myAVG < 2) && (myAVG != "")) {
            return "<span class='fire'>ZAGROŻENIE</span>"
        } else {
            return ""
        }
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
  /* height: 1000px; */
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
 /* .addStudentPanelMain select:after{
  content: "▼";
  padding: 12px 8px;
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 1;
  text-align: center;
  width: 10%;
  height: 100%;
  pointer-events: none;
} */
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

.studentPanelSummary{width: 80%; margin: auto; margin-top: 100px;}


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
