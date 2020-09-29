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

                     <input name="#" type="text" v-model="payload.description" @change="addNewItem('description')" class="description" maxlength="30">

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
import GradesService from "../assets/mixins.js"
//css-table
require("../assets/css/grades.css");
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
  watch: {
      "payload.description": {
        handler(){
          const inputGradeDescription = document.querySelectorAll("input.description")[this.index].value;
          const descriptionCount = document.querySelectorAll("span.descriptionCount")[this.index];
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
  props:["index", "updater", "possibleSave"],
  created(){

    this.clearNewGradesArray("", this.index)

  },
  updated(){
      this.payload.date = this.whatsTheDatePlease();
      this.addNewItem("date")
  },
  destroyed(){
    this.$emit("updater");
    this.$emit("update:possibleSave", true);
  },
  mixins: [GradesService],
  methods:{

    addNewItem(whatToAdd){
      // console.log(whatToAdd)
      // console.log(this.marks[0])
      // console.log(this[whatToAdd+"s"])
      // console.log(this.index)
      // console.log(this[whatToAdd+"s"][this.index])
      // console.log(this.payload[whatToAdd])
        //places new mark, weight, description or date in appropriate place according to the provided index inside newGrades Array in Vuex
        //e.g    for second component Grade.vue:   newGrades.grades[1] = 5                           newGrades.grades=[3,5]
        //e.g    for second component Grade.vue:   newGrades.weights[1] = 5                          newGrades.weights=[3,5]
        //e.g    for second component Grade.vue:   newGrades.descriptions[1] = "Praca domowa"        newGrades.descriptions=["Kartkówka", "Praca domowa"]
        //e.g    for second component Grade.vue:   newGrades.dates[1] = "23.08.2020 14:00:00"        newGrades.dates=["21.08.2020 11:30:00", "23.08.2020 14:00:00"]

        //       this.marks[1] = this.payload[mark]
        //       this.weights[1] = this.payload[weight]
        //       this.descriptions[1] = this.payload[description]
        //       this.dates[1] = this.payload[date]
        this.$store.state.newGrades[whatToAdd+"s"][this.index]=this.payload[whatToAdd];
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

input{
  font-size: 12px;
  height: 23px;
  width: 90%;
}

@media (max-width: 768px){

    div[class^=col-]{
        padding: 0;
    }

    .addStudentPanelGradesContentSingle{
        width: 100%;
    }
    label {
        font-size: 11px;
    }
    span.descriptionCount{
      font-size: 9.5px;
    }
}
</style>
