<template>
<div class="fullClass">

    <div class="tableColorsLegend">

        <div class="tableColorsLegendTitle">
            Legenda:
        </div>

        <div class="tableColorsLegendContent">

            <div class="tableColorsLegendSingleContent">

                <div class="gradeWeightColor gradeWeightGreen">

                </div> - ocena z wagą 1

            </div>

            <div class="tableColorsLegendSingleContent">

                <div class="gradeWeightColor gradeWeightYellow">

                </div> - ocena z wagą 2

            </div>

            <div class="tableColorsLegendSingleContent">

                <div class="gradeWeightColor gradeWeightRed">

                </div> - ocena z wagą 3

            </div>

        </div>

    </div>

    <div class="students">
      <table id="tableStudents">

          <thead>
              <th>Nr.</th>
              <th>Uczeń:</th>
              <th>Oceny:</th>
              <th>Średnia ocen:</th>
              <th>Zagrożenia:</th>
          </thead>

          <tbody v-for="student in students" :key="student.id">
              <router-link tag="tr"
              :to="{ name: 'Student',
                     params: {
                      id: student.id,
                      lastName: student.lastName,
                      firstName: student.firstName,
                      grades: student.grades,
                      weights: student.weights,
                      descriptions: student.descriptions,
                      dates: student.dates,
                      pesel: student.pesel,
                      street: student.street,
                      phone: student.phone,
                      email: student.email,
                      mother: student.mother,
                      father: student.father
                     }
                    }">
                  <td></td>
                  <td>{{ student.lastName.toUpperCase() }} {{ student.firstName }}</td>
                  <td v-html="gradeWeightColor(student.grades, student.weights)"></td>
                  <td>{{ avg(student.grades, student.weights) }}</td>
                  <td v-html="threatness(avg(student.grades, student.weights))"></td>
              </router-link>
          </tbody>

      </table>
    </div>

</div>
</template>

<script>

//Axios
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//css-table
require("../assets/table.css");

export default {
   name: 'FullClass',
   data(){
       return{
         idCounter: 0,
       }
   },
   computed:{
     students(){
       return this.$store.getters.students
     }
   },
   created(){
       this.$store.commit("setFullClass", this.$store.state.students);
   },
   beforeRouteEnter (to, from, next) {
      next(vm => {
        // console.log(this.$store.state.students)
        // vm.gradeWeightColor(this.$store.state.students.grades, this.$store.state.students);
        vm.showTooltip();
        vm.sortMyStudents();

        //gets table
        const table = document.getElementById("tableStudents");

        //adds Nr (first <td> in every <tr>) in table
        const rowsNr = table.rows;
        for (let j = 1; j < rowsNr.length+1; j++) {
            rowsNr[j-1].getElementsByTagName("TD")[0].innerHTML = j+".";
        }
      })
   },
   mounted(){
     //gets table
     const table = document.getElementById("tableStudents");

     //adds Nr (first <td> in every <tr>) in table
     const rowsNr = table.rows;
     for (let j = 1; j < rowsNr.length+1; j++) {
         rowsNr[j-1].getElementsByTagName("TD")[0].innerHTML = j+".";
     }

   },
   updated() {

    this.sortMyStudents();

     //gets table
     const table = document.getElementById("tableStudents");

     //adds Nr (first <td> in every <tr>) in table
     const rowsNr = table.rows;

     for (let j = 1; j < rowsNr.length+1; j++) {
         rowsNr[j-1].getElementsByTagName("TD")[0].innerHTML = j+".";
     }
     // this.gradeWeightColor(this.$store.state.students, this.$store.state.students);
     this.showTooltip();

   },
   methods:{

        //colors grades
        gradeWeightColor: function(grades, weights) {


            //adds new classes to divs with grades, what causes coloring them on green, yellow or red
            let content = "";
            for (let i = 0; i < grades.length; i++) {
                if (weights[i] == 1) {
                    content += `<div class="gradeWeightColor gradeWeightGreen">${grades[i]}</div>`
                } else if (weights[i] == 2) {
                    content += `<div class="gradeWeightColor gradeWeightYellow">${grades[i]}</div>`
                } else if (weights[i] == 3) {
                    content += `<div class="gradeWeightColor gradeWeightRed">${grades[i]}</div>`
                }
            }

            return content
        },

        //show tooltip after hovering on every grade
        showTooltip: function() {


            const gradeInDiv = document.querySelectorAll("tbody .gradeWeightColor");

            const gradesSuperArray = [];
            const weightSuperArray = [];
            const descriptionSuperArray = [];
            const dateSuperArray = [];


            for (let i = 0; i < this.students.length; i++) {
                for (let j = 0; j < this.students[i].grades.length; j++) {
                    gradesSuperArray.push(this.students[i].grades[j]);
                    weightSuperArray.push(this.students[i].weights[j]);
                    descriptionSuperArray.push(this.students[i].descriptions[j]);
                    dateSuperArray.push(this.students[i].dates[j]);
                }
            }

            for (let i = 0; i < gradeInDiv.length; i++) {

                //draws tooltip after hovering
                gradeInDiv[i].addEventListener("mouseenter", function() {
                    this.canvas(gradesSuperArray, weightSuperArray, descriptionSuperArray, dateSuperArray, gradeInDiv[i], i)
                }.bind(this), false);


                //destroyes tooltip after leaving
                gradeInDiv[i].addEventListener("mouseleave", function() {
                    const canv = document.querySelector("canvas");
                    canv.parentNode.removeChild(canv);
                });

            }
        },

        //draws tooltip
        canvas: function(arrayWithAllGrades, arrayWithAllWeights, arrayWithAllDescriptions, arrayWithAllDates, anotherGradeWeightColorDiv, i) {


            const canvas = document.createElement("CANVAS");
            anotherGradeWeightColorDiv.appendChild(canvas);

            const canv = document.querySelector("canvas");
            const ctx = canv.getContext("2d");

            canvas.style['z-index'] = 2;
            canvas.style.position = 'absolute';
            canvas.style.padding = 0;
            canvas.style.border = 0;

            ctx.beginPath();
            ctx.moveTo(0, 10);
            ctx.lineTo(25, 15);
            ctx.lineTo(255, 15);
            ctx.lineTo(255, 135);
            ctx.lineTo(25, 135);
            ctx.lineTo(25, 40);
            ctx.lineTo(0, 10);
            ctx.stroke();
            ctx.fillStyle = "#ffeab0";
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.font = "bold 14px Arial";

            ctx.fillText(`Ocena: ${arrayWithAllGrades[i]}`, 40, 50);
            ctx.fillText(`Waga: ${arrayWithAllWeights[i] } `, 40, 70);
            ctx.fillText(`Opis: ${arrayWithAllDescriptions[i]}`, 40, 90);
            ctx.fillText(`Data: ${arrayWithAllDates[i]}`, 40, 110);

        },

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

        //sorts students in table
        sortMyStudents: function() {

            const table = document.getElementById("tableStudents");
            let switching = true;
            let Switch, i;

            // Run loop until no switching is needed
            while (switching == true) {

                switching = false;
                const rows = table.rows;

                //goes through all rows
                for (i = 0; i < (rows.length - 1); i++) {
                    Switch = false;

                    //fetches 2 elements that will be compared
                    const x = rows[i].getElementsByTagName("TD")[1];
                    const y = rows[i + 1].getElementsByTagName("TD")[1];

                    // alert(rows[1])
                    //checks if these 2 rows need to be switched
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        //if yes, updates Switch and breaks loop
                        Switch = true;
                        break;
                    }
                }

                if (Switch) {
                    // Function to switch rows and mark switch as completed
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                }
            }
        },



   }
}
</script>

<style scoped>


.fullClass {
    width: 90%;
    max-width: 1400px;
    margin: 100px auto;
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    background-color: rgba(0, 0, 0, .55);
    text-align: center;

    font-size: 17px;
    padding: 50px 0
}

.tableColorsLegend .tableColorsLegendTitle {
    font-size: 15.5px;
    margin: 30px 0;
}

.tableColorsLegend .tableColorsLegendContent .tableColorsLegendSingleContent {
    display: inline-block;
    margin-left: 10px;
    margin-right: 40px;
    font-size: 12px;
}

.tableColorsLegend .tableColorsLegendContent .tableColorsLegendSingleContent * {
    vertical-align: bottom;
}

div.tableColorsLegend div.gradeWeightColor {
  width: 32px;
}

div.students{
  width: 90%;
  margin: 50px auto;
}

@media (max-width: 768px){
  .tableColorsLegend .tableColorsLegendTitle {
      font-size: 11px;
      margin: 20px 0;
  }
  .tableColorsLegend .tableColorsLegendContent .tableColorsLegendSingleContent {
    font-size: 10px;
  }

  div.tableColorsLegend div.gradeWeightColor {
    width: 25px;
  }
}



</style>
