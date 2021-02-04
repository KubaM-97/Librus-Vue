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
                    <td>
                      <span class="grades" v-html="gradeWeightColor(student.marks, student.weights)"></span>
                    </td>
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
import axios from 'axios'
import VueAxios from 'vue-axios'

import GradesService from "../assets/mixins/gradesMixins.js"

export default {
   name: 'FullClass',
   mounted(){
       for(let i=0; i<this.students.length; i++){
          this.showTooltip(document.querySelectorAll("tr")[i], this.students[i]);
        }

      this.sortMyStudents();
      this.addNumberingToTheTable();
   },
   updated() {

       for(let i=0; i<this.students.length; i++){
         this.showTooltip(document.querySelectorAll("tr")[i], this.students[i]);
       }

       this.addNumberingToTheTable();

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

<style>

.fullClass {
    width: 90%;
    max-width: 1400px;
    margin: 100px auto;
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    background-color: rgba(0, 0, 0, .55);
    text-align: center;
    font-size: 15px;
    padding: 40px 0
}

div.students{
    width: 90%;
    margin: 50px auto;
}

.tableColorsLegend .tableColorsLegendTitle {
    font-size: 13.5px;
    margin: 20px 0;
}

.tableColorsLegend .tableColorsLegendContent .tableColorsLegendSingleContent {
    display: inline-block;
    margin-left: 10px;
    margin-right: 40px;
    font-size: 12px;
}

.tableColorsLegend .tableColorsLegendContent .tableColorsLegendSingleContent * {
    vertical-align: middle;
}



@media (max-width: 768px){
  .tableColorsLegend .tableColorsLegendTitle {
      font-size: 10px;
  }
  .tableColorsLegend .tableColorsLegendContent .tableColorsLegendSingleContent {
      font-size: 9px;
      margin: auto;
      display: block;
  }
  .tableColorsLegend .tableColorsLegendContent .tableColorsLegendSingleContent .gradeWeightColorLegend{
   padding: 5px 12px;
   margin: 2px 3px;
 }
}


</style>
