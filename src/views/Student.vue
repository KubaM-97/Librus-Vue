<template>
<div class="editStudentPanel">

        <div class="editStudentPanelMain">

            <div class="editStudentPanelName">
                <span>Imię i Nazwisko ucznia</span>
            </div>

            <div class="editStudentPanelNameStudent">
                {{$route.params.lastName.toUpperCase()}}
                {{$route.params.firstName}}
            </div>

            <div class="editStudentPanelNameDetailData">

              <div class="form-group">
                  <span class="title">PESEL:</span>
                  <span class="data">{{$route.params.pesel}}</span>
              </div>

              <div class="form-group">
                  <span class="title">Adres:</span>
                  <span class="data">ul.{{$route.params.street.street_Name}} {{$route.params.street.street_Nr}} m.{{$route.params.street.street_Flat}} <br />{{$route.params.street.street_PostCode}} {{$route.params.street.street_City}}</span>
              </div>

              <div class="form-group">
                  <span class="title">Telefon:</span>
                  <span class="data">{{$route.params.phone}}</span>
              </div>

              <div class="form-group">
                  <span class="title">Email:</span>
                  <span class="data">{{$route.params.email}}</span>
              </div>

              <div class="form-group">
                  <span class="title">Matka:</span>
                  <span class="data">{{$route.params.mother.firstName}} {{$route.params.mother.lastName}} <br /> {{$route.params.mother.phone}} <br /> {{$route.params.mother.email}} </span>
              </div>

              <div class="form-group">
                  <span class="title">Ojciec:</span>
                  <span class="data">{{$route.params.father.firstName}} {{$route.params.father.lastName}} <br /> {{$route.params.father.phone}} <br /> {{$route.params.father.email}}</span>
              </div>


            </div>

            <div class="editStudentPanelNameButtons">
                <button>Edytuj Dane</button>
            </div>

            <div class="editStudentPanelGrades">
                <span>Oceny</span>
            </div>

            <div class="editStudentPanelGradesStudent" v-html="wrapMyGradesIntoDiv($route.params.grades)">
                <!-- <span v-html="gradeWeightColor($route.params.weights)"></span> -->
            </div>

            <div class="editStudentPanelGradesButtons">

                <button>
                    Edytuj
                </button>

                <button class="add">
                    Dodaj
                </button>

            </div>

            <div class="editStudentPanelAvg">
                <span>Średnia</span>
            </div>

            <div class="editStudentPanelAvgAvg">
              {{avg(this.$route.params.grades, this.$route.params.weights)}}
            </div>

            <div class="editStudentPanelThreatness">
                <span>Zagrożenie</span>
            </div>

            <div class="editStudentPanelThreatnessThreatness" v-html="threatness(avg(this.$route.params.grades, this.$route.params.weights))">
            </div>

        </div>
</div>
</template>

<script>

//Axios
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
  data(){
    return{
      student: ''
    }
  },
  created: function(){
    axios.get("/static/students.json")
    .then((response) => {
      this.student = response.data.students.filter(
        data => data.id == this.$route.params.id)[0];
    });
  },
  updated(){
    this.gradeWeightColor();
  },
  methods:{

    //wraps grades in div, it needs an array with one student's grades
    wrapMyGradesIntoDiv(anotherStudentGradesArray) {


        this.wrappedGrades = "";

        //wraps every single grade of one single student in div.gradeWeightColor, as a result we get one super big variable full of few divs
        for (let j = 0; j < anotherStudentGradesArray.length; j++) {
            this.wrappedGrades += `<div class="gradeWeightColor">${anotherStudentGradesArray[j]}</div>`
        }

        this.gradeWeightColor();
        this.gradeInDiv = "";
        return this.gradeInDiv = this.wrappedGrades;
    },

    //colors grades
    gradeWeightColor: function() {

        //adds new classes to divs with grades, what causes coloring them on green, yellow or red
        const allDivsWithGrades = document.querySelectorAll("div.editStudentPanel");

        console.log(this.$route.params.weights)
        // console.log(allDivsWithGrades.length);
        console.log(allDivsWithGrades);

        // for (let i = 0; i < allDivsWithGrades.length; i++) {
        //     if (this.$route.params.weights[i] == 1) {
        //         allDivsWithGrades[i].classList.add("gradeWeightGreen")
        //     } else if (this.$route.params.weights[i] == 2) {
        //         allDivsWithGrades[i].classList.add("gradeWeightYellow")
        //     } else if (this.$route.params.weights[i] == 3) {
        //         allDivsWithGrades[i].classList.add("gradeWeightRed")
        //     }
        // }


    },


    // //show tooltip after hovering on every grade
    // showTooltip: function() {
    //
    //     const gradeInDiv = document.querySelectorAll("div");
    //     console.log(gradeInDiv);
    //     const gradesSuperArray = [];
    //     const weightSuperArray = [];
    //     const descriptionSuperArray = [];
    //     const dateSuperArray = [];
    //
    //
    //
    //     for (let i = 0; i < this.students.length; i++) {
    //         for (let j = 0; j < this.students[i].grades.length; j++) {
    //             gradesSuperArray.push(this.students[i].grades[j]);
    //             weightSuperArray.push(this.students[i].weights[j]);
    //             descriptionSuperArray.push(this.students[i].description[j]);
    //             dateSuperArray.push(this.students[i].date[j]);
    //         }
    //     }
    //     // if (this.add.grades !== '') {
    //     //     this.whatsTheDatePlease();
    //     //     //                        for (let i = 0; i < this.add.grades.length;) {
    //     //     gradesSuperArray.push(this.add.grades);
    //     //     weightSuperArray.push(this.add.weight);
    //     //     descriptionSuperArray.push(this.add.description);
    //     //     // dateSuperArray.push(dateArray);
    //     //     console.log(dateSuperArray);
    //     //     //                        }
    //     // }
    //
    //     for (let i = 0; i < gradeInDiv.length; i++) {
    //
    //         //draws tooltip after hovering
    //         gradeInDiv[i].addEventListener("mouseenter", function() {
    //             this.canvas(gradesSuperArray, weightSuperArray, descriptionSuperArray, dateSuperArray, gradeInDiv[i], i)
    //         }.bind(this), false);
    //
    //
    //         //destroyes tooltip after leaving
    //         gradeInDiv[i].addEventListener("mouseleave", function() {
    //             const canv = document.querySelector("canvas");
    //             canv.parentNode.removeChild(canv);
    //         });
    //
    //     }
    // },
    //
    // //draws tooltip
    // canvas: function(arrayWithAllGrades, arrayWithAllWeights, arrayWithAllDescriptions, arrayWithAllDates, anotherGradeWeightColorDiv, i) {
    //
    //
    //     const canvas = document.createElement("CANVAS");
    //     anotherGradeWeightColorDiv.appendChild(canvas);
    //
    //     const canv = document.querySelector("canvas");
    //     const ctx = canv.getContext("2d");
    //
    //     canvas.style['z-index'] = 2;
    //     canvas.style.position = 'absolute';
    //     canvas.style.padding = 0;
    //     canvas.style.border = 0;
    //
    //     ctx.beginPath();
    //     ctx.moveTo(0, 10);
    //     ctx.lineTo(25, 15);
    //     ctx.lineTo(255, 15);
    //     ctx.lineTo(255, 135);
    //     ctx.lineTo(25, 135);
    //     ctx.lineTo(25, 40);
    //     ctx.lineTo(0, 10);
    //     ctx.stroke();
    //     ctx.fillStyle = "#ffeab0";
    //     ctx.fill();
    //     ctx.fillStyle = "black";
    //     ctx.font = "bold 15px Arial";
    //
    //     ctx.fillText(`Ocena: ${arrayWithAllGrades[i]}`, 40, 50);
    //     ctx.fillText(`Waga: ${arrayWithAllWeights[i] } `, 40, 70);
    //     ctx.fillText(`Opis: ${arrayWithAllDescriptions[i]}`, 40, 90);
    //     ctx.fillText(`Data: ${arrayWithAllDates[i]}`, 40, 110);
    //
    // },
    //

    //returns grades' average
    avg: function(gradesSmallArray, weightSmallArray) {

        let gradesSuperValue = 0;
        let weightSum = 0;


        for (let i = 0; i < gradesSmallArray.length; i++) {
            gradesSuperValue += gradesSmallArray[i] * weightSmallArray[i];
            weightSum += weightSmallArray[i]
        }

        //round avg to 2 decimal places
        const average = gradesSuperValue / weightSum;
        const averageRounded = (Math.round(average * 100) / 100).toFixed(2);

        return averageRounded;

    },

    //decides if student is threated
    threatness: function(myAVG) {
        if (myAVG < 2) {
            return "<span class='fire'>ZAGROŻENIE</span>"
        } else {
            return ""
        }
    },
  }
}

</script>


<style scoped>


.editStudentPanel {
    width: 90%;
    max-width: 1400px;
    margin: 100px auto;
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    background-color: rgba(0, 0, 0, .55);
    text-align: center;

    font-size: 15px;
}

.editStudentPanelMain{
    padding: 20px;
    display: grid;
    grid-template-columns: [startName]5fr [startGrades]5fr [startAvg]3fr [startThreatness]3fr;
    grid-template-rows:[startTitle]100px [startStudentData]100px [startStudentDetailData]auto [startStudentDetailDataButton]100px;
    align-items: center;
}


div[class^="editStudentPanelName"] {
    grid-column: startName / startGrades;
}

.editStudentPanelName {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelNameStudent {
    grid-row: startStudentData / startStudentDetailData;
}

.editStudentPanelNameDetailData {
    grid-row: startStudentDetailData / startStudentDetailDataButton;
}

.editStudentPanelNameButtons {
    grid-row: startStudentDetailDataButton;
    margin-left: 10px;
    text-align: center;
}


div[class^="editStudentPanelGrades"] {
    grid-column: startGrades / startAvg;
}

.editStudentPanelGrades {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelGradesStudent {
    grid-row: startStudentData / startStudentDetailData;
}

.editStudentPanelGradesButtons{
    grid-row: startStudentDetailData / startStudentDetailDataButton;
}


div[class^="editStudentPanelAvg"] {
    grid-column: startAvg / startThreatness;
}

.editStudentPanelAvg {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelAvgAvg {
    grid-row: startStudentData / startStudentDetailData;
}


div[class^="editStudentPanelThreatness"] {
    grid-column: startThreatness;
}

.editStudentPanelThreatness {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelThreatnessThreatness {
    grid-row: startStudentData / startStudentDetailData;
}



.editStudentPanelNameDetailData{
  margin: 20px 0;
  font-size: 15px;
  float: left;
}

.editStudentPanelNameDetailData .form-group{
  display: block;
  margin: auto;
  margin-bottom: 25px;
  padding-left: 45px;
  font-size: 12px;
}

.editStudentPanelNameDetailData .form-group span.title{
  float: left;
  display: inline-block;
  width: 30%;
  text-align: left;
}

.editStudentPanelNameDetailData .form-group span.data{
  text-align: left;
  display: inline-block;
  width: 60%;
}


.editStudentPanelMain button{
    background-color: blueviolet;
    display: inline-block;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    padding: 6px 11px;
    text-shadow: 1px 1px 1px violet;
    margin: 0 15px;
}

.editStudentPanelGradesButtons button.add{
  background-color: green;
}


</style>
