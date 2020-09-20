<template>

  <div class="fullClass">

      <div class="tableColorsLegend">

          <div class="tableColorsLegendTitle">
              Legenda:
          </div>

          <div class="tableColorsLegendContent">

              <div class="tableColorsLegendSingleContent">

                  <div class="gradeWeightColorLegend gradeWeightGreen">

                  </div> - ocena z wagą 1

              </div>

              <div class="tableColorsLegendSingleContent">

                  <div class="gradeWeightColorLegend gradeWeightYellow">

                  </div> - ocena z wagą 2

              </div>

              <div class="tableColorsLegendSingleContent">

                  <div class="gradeWeightColorLegend gradeWeightRed">

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
                        marks: student.marks,
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
                    <td v-html="gradeWeightColor(student.marks, student.weights)"></td>
                    <td>{{ avg(student.marks, student.weights) }}</td>
                    <td v-html="threatness(avg(student.marks, student.weights))"></td>
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

import { mapState } from 'vuex'

import GradesService from "../assets/mixins.js"

//css-table
require("../assets/table.css");

export default {
   name: 'FullClass',
   computed:{
     ...mapState([
       'students'
     ])
   },
   beforeRouteEnter (to, from, next) {

      next(vm => {
        vm.addNumberingToTheTable();
        vm.sortMyStudents();
      })

   },
   updated() {

       for(let i=0; i<this.$store.state.students.length; i++){
         this.showTooltip(document.querySelectorAll("tr")[i], this.$store.state.students[i]);
       }

       this.addNumberingToTheTable();
       this.sortMyStudents();
       
   },
   mixins: [GradesService],
   methods:{

        //adds Numbering to the first table's cell <td> of every table's row <tr>
        //e.g   1. 2. 3. 4. 5. .....
        addNumberingToTheTable(){

          //gets table
          const table = document.getElementById("tableStudents");

          //adds Nr (first <td> in every <tr>) in table
          const rowsNr = table.rows;

          for (let j = 1; j < rowsNr.length+1; j++) {
              rowsNr[j-1].getElementsByTagName("TD")[0].innerHTML = j+".";
          }

        },

        //sorts students in table
        sortMyStudents() {

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
