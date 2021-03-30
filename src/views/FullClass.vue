<template>
  <div class="fullClass">
    <div class="tableColorsLegend">
      <div class="tableColorsLegendTitle">Legenda:</div>

      <div class="tableColorsLegendContent">
        <div class="tableColorsLegendSingleContent">
          <div class="gradeWeightColorLegend gradeWeightGreen"></div>
          - ocena z wagą 1
        </div>

        <div class="tableColorsLegendSingleContent">
          <div class="gradeWeightColorLegend gradeWeightYellow"></div>
          - ocena z wagą 2
        </div>

        <div class="tableColorsLegendSingleContent">
          <div class="gradeWeightColorLegend gradeWeightRed"></div>
          - ocena z wagą 3
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
        <tbody>
          <router-link v-for="student in students" :key="student.id"
            custom
            v-slot="{ navigate }"
            :to="{
              name: 'Student',
              params: {
                
                id: student.id,

                lastName: student.lastName,
                firstName: student.firstName,

                marks: student.marks,
                weights: student.weights,
                descriptions: student.descriptions,
                dates: student.dates,

                pesel: student.pesel,

                streetName: student.street.name,
                streetNr: student.street.nr,
                streetFlat: student.street.flat,
                streetPostcode: student.street.postcode,
                streetCity: student.street.city,

                phone: student.phone,
                email: student.email,

                motherFirstName: student.mother.firstName,
                motherLastName: student.mother.lastName,
                motherPhone: student.mother.phone,
                motherEmail: student.mother.email,

                fatherFirstName: student.father.firstName,
                fatherLastName: student.father.lastName,
                fatherPhone: student.father.phone,
                fatherEmail: student.father.email,
                
              },
            }">
            <tr @click="navigate" @keypress.enter="navigate" role="link">
              <td></td>
              <td>
                {{ student.lastName.toUpperCase() }} {{ student.firstName }}
              </td>
              <td>
                <span class="grades" v-html="gradeWeightColor(student.marks, student.weights)">
                </span>
              </td>
              <td>{{ avg(student.marks, student.weights) }}</td>
              <td v-html="threatness(avg(student.marks, student.weights))"></td>
            </tr>
          </router-link>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">

import gradesService from "../assets/mixins/gradesMixins";

import { computed, ComputedRef, defineComponent, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "FullClass",

  setup() {
    const store = useStore();

    const students: ComputedRef<any> = computed(() => store.state.students);

    //adds Numbering to the first table's cell <td> of every table's row <tr>
    //e.g   1. 2. 3. 4. 5. .....
    function addNumberingToTheTable () {

      //gets table
      const table = document.getElementById("tableStudents") as HTMLTableElement;

      //adds Nr (first <td> in every <tr>) in table
      const rowsNr = table.rows;

      for (let j = 1; j < rowsNr.length + 1; j++) {
        rowsNr[j - 1].getElementsByTagName("TD")[0].innerHTML = j + ".";
      }

    };

    //sorts students in table
    function sortMyStudents() {
      const table = document.getElementById("tableStudents") as HTMLTableElement;
      let switching = true;
      let Switch, i;

      // Run loop until no switching is needed
      while (switching == true) {
        switching = false;
        const rows = table.rows as HTMLCollectionOf<HTMLTableRowElement>;

        //goes through all rows
        for (i = 0; i < rows.length - 1; i++) {
          Switch = false;

          //fetches 2 elements that will be compared
          const previousStudent = rows[i].getElementsByTagName("TD")[1];
          const nextStudent = rows[i + 1].getElementsByTagName("TD")[1];

          //checks if these 2 rows need to be switched
          if (previousStudent.innerHTML.toLowerCase() > nextStudent.innerHTML.toLowerCase()) {
            //if yes, updates Switch and breaks loop
            Switch = true;
            break;
          }
        }

        if (Switch) {

          // Function to switch rows and mark switch as completed
          rows[i].parentNode!.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
      }
    };

    onMounted(() => { updateTable() });

    onUpdated(() => { updateTable() });

    function updateTable(){

      for (let i = 0; i < students.value.length; i++) {
        gradesService().showTooltip(document.querySelectorAll("tr")[i], students.value[i]);
      }
      
      sortMyStudents();
      addNumberingToTheTable();

    }


    return {
      addNumberingToTheTable,
      sortMyStudents,
      toRefs(students: object){},
      ...gradesService()
    };
  },
});
</script>

<style>
.fullClass {
  width: 90%;
  max-width: 1400px;
  margin: 100px auto;
  -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
  -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
  box-shadow: 3px 3px 30px 5px #00c3ff;
  background-color: rgba(0, 0, 0, 0.55);
  text-align: center;
  font-size: 15px;
  padding: 40px 0;
}

div.students {
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

@media (max-width: 768px) {
  .tableColorsLegend .tableColorsLegendTitle {
    font-size: 10px;
  }
  .tableColorsLegend .tableColorsLegendContent .tableColorsLegendSingleContent {
    font-size: 9px;
    margin: auto;
    display: block;
  }
  .tableColorsLegend
    .tableColorsLegendContent
    .tableColorsLegendSingleContent
    .gradeWeightColorLegend {
    padding: 5px 12px;
    margin: 2px 3px;
  }
}
</style>
