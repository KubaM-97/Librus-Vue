<template>

  <div class="addStudentPanelGradesContentSingle">

       <div class="container">

          <div class="row">

            <div class="col-2 col-md-3">

                <div class="addStudentPanelGradesContentSingleGrade">

                  <label for="marks">Ocena:</label>

                  <div class="select">

                    <select v-model.number="grade.mark" @change="addNewItem('mark')" id="mark">
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
                      <select v-model.number="grade.weight" @change="addNewItem('weight')" id="weight">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                  </div>

              </div>

            </div>

            <div class="col-7 col-md-5">

                <div class="addStudentPanelGradesContentSingleDescription">

                 <span class="descriptionCount">Pozostało: {{characters}} znaków.</span>

                 <label class="description">Opis oceny:

                     <input autocomplete="off" name="#" type="text" v-model="grade.description" @change="addNewItem('description')" class="description" maxlength="30">

                 </label>

             </div>

            </div>

            <div class="col-1">
                <span @click="remove(index)" class="remove"><em>Usuń</em></span>
            </div>

          </div>

       </div>

  </div>

</template>

<script>

import gradesService from "../assets/mixins/gradesMixins.js"

import { ref, reactive, onBeforeMount, onBeforeUpdate, onMounted, destroy, deactivated  } from "vue"
import { useStore } from "vuex"

export default {
  name: "Grade",
  props: {
    index: Number
  },
  setup(props, { emit }){

    const store = useStore()


    const grade = reactive({
      mark: "",
      weight: "",
      description: "",
      date: ""
    })
    
    const characters = ref(30);

    const index = props.index

    onBeforeUpdate(() => {
      grade.date = gradesService().whatsTheDatePlease();
      addNewItem("date");
    })


    function addNewItem(gradeProperty){

        //places a new mark, weight, description or date in appropriate place according to the provided index inside newGrades Array in Vuex
        //e.g    for second component Grade.vue:   store.state.newGrades.grades[1] = 5                           store.state.newGrades.grades=[3,5]
        //e.g    for second component Grade.vue:   store.state.newGrades.weights[1] = 5                          store.state.newGrades.weights=[3,5]
        //e.g    for second component Grade.vue:   store.state.newGrades.descriptions[1] = "Praca domowa"        store.state.newGrades.descriptions=["Kartkówka", "Praca domowa"]
        //e.g    for second component Grade.vue:   store.state.newGrades.dates[1] = "23.08.2020 14:00:00"        store.state.newGrades.dates=["21.08.2020 11:30:00", "23.08.2020 14:00:00"]

        //       store.state.newGrades.marks[1] = grade[mark]
        //       store.state.newGrades.weights[1] = grade[weight]
        //       store.state.newGrades.descriptions[1] = grade[description]
        //       store.state.newGrades.dates[1] = grade[date]

        store.state.newGrades[gradeProperty+"s"][index]=grade[gradeProperty];

        for(const el in store.state.newGrades){
          if( store.state.newGrades[el][index] === undefined){

          store.state.newGrades[el][index]="";
          }
        }
        
        

        emit("update:possibleSave", true);

    }

    //clears newGrades object in Vuex
    function remove(index){

      const store2 = store.state.newGrades;

      for (const gradeProperty in store2) {
        if (index !== undefined) {
          store2[gradeProperty][index] = "";
        }
        else {
          store2[gradeProperty] = "";
        }
      }
    
      document.querySelectorAll(".addStudentPanelGradesContentSingle")[index].style.display = "none";
      document.querySelectorAll(".addStudentPanelGradesContentSingle")[index].style.marginBottom = "0px";

      emit("update:possibleSave", true);

    }

    return {
      store,
      index,
      characters,
      grade,
      addNewItem,
      remove,
      ...gradesService()
    }
  }

  // props:["index", "updater", "possibleSave"],
  

}
</script>

<style scoped>

.addStudentPanelGradesContentSingle {
    margin-bottom: 30px;
}


.addStudentPanelGradesContentSingle .row>div{
  display: grid;
  align-content: flex-end;
}


@media (max-width: 768px){
    .addStudentPanelGradesContentSingle{
        width: 100%;
    }
}
</style>
