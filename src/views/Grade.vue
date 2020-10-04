<template>

  <div class="addStudentPanelGradesContentSingle">

       <div class="container">

          <div class="row">

            <div class="col-2 col-md-3">

                <div class="addStudentPanelGradesContentSingleGrade">

                  <label for="marks">Ocena:</label>

                  <div class="select">

                    <select v-model.number="payload.mark" @change="addNewItem('mark')" id="marks">
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
                      <select v-model.number="payload.weight" @change="addNewItem('weight')" id="weight">
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

                     <input autocomplete="off" name="#" type="text" v-model="payload.description" @change="addNewItem('description')" class="description" maxlength="30">

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
import GradesService from "../assets/mixins/gradesMixins.js"
export default {
  name: "Grade",
  data(){
    return{
      characters: 30,
      payload: {
        mark: "",
        weight: "",
        description: "",
        date: ""
      }
    }
  },
  props:["index", "updater", "possibleSave"],
  
  beforeMount(){
    this.clearNewGradesArray("", this.index);
  },
  beforeUpdate(){
      this.payload.date = this.whatsTheDatePlease();
      this.addNewItem("date");
  },
  destroyed(){
    this.$emit("updater");
    this.$emit("update:possibleSave", true);
  },
  mixins: [GradesService],
  methods:{

    addNewItem(whatToAdd){

        //places a new mark, weight, description or date in appropriate place according to the provided index inside newGrades Array in Vuex
        //e.g    for second component Grade.vue:   newGrades.grades[1] = 5                           newGrades.grades=[3,5]
        //e.g    for second component Grade.vue:   newGrades.weights[1] = 5                          newGrades.weights=[3,5]
        //e.g    for second component Grade.vue:   newGrades.descriptions[1] = "Praca domowa"        newGrades.descriptions=["Kartkówka", "Praca domowa"]
        //e.g    for second component Grade.vue:   newGrades.dates[1] = "23.08.2020 14:00:00"        newGrades.dates=["21.08.2020 11:30:00", "23.08.2020 14:00:00"]

        //       this.marks[1] = this.payload[mark]
        //       this.weights[1] = this.payload[weight]
        //       this.descriptions[1] = this.payload[description]
        //       this.dates[1] = this.payload[date]
        this[whatToAdd+"s"][this.index]=this.payload[whatToAdd];

        this.$emit("updater")
        this.$emit("update:possibleSave", true);

    },

    remove(index){
      this.clearNewGradesArray("", index);
      document.querySelectorAll(".addStudentPanelGradesContentSingle")[this.index].style.display = "none";
      document.querySelectorAll(".addStudentPanelGradesContentSingle")[this.index].style.marginBottom = "0px";

      this.$destroy(index);
    },

  }
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
