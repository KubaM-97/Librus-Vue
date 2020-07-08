<template>

  <div class="addStudentPanelGradesContentSingle">

       <div class="container">

          <div class="row">

            <div class="col-md-3">

              <div class="addStudentPanelGradesContentSingleGrade">

                  <label for="grades">Ocena:</label>

                  <div class="select">

                    <select v-model.number="add.grades" id="grades">
                        <option value=""></option>
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

            <div class="col-md-3">

              <div class="addStudentPanelGradesContentSingleWeight">

                  <label for="weight">Waga oceny:</label>

                  <div class="select">
                      <select v-model.number="add.weights" id="weight">
                          <option value=""></option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                      </select>
                  </div>

              </div>
            </div>

            <div class="col-md-5">

             <div class="addStudentPanelGradesContentSingleDescription">

                 <span class="descriptionCount">Pozostało: {{characters}} znaków.</span>

                 <label>Opis oceny:

                     <input type="text" v-model="add.description" class="description" maxlength="30">

                 </label>

             </div>

          </div>

          </div>

       </div>

  </div>
</template>

<script>
export default {
  name: "Grade",
  watch: {
    add: {
      handler(newValue, oldValue){
        const inputGradeDescription = document.querySelector(".description").value;
        const descriptionCount = document.querySelector("span.descriptionCount");
        console.log(inputGradeDescription.length)
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

        return this.characters--
      },
      deep: true
    }
  },
  data(){
    return{
      add: {
              name: "",
              grades: "",
              weights: "",
              avg: "",
              description: "",
              date: ""
      },
      characters: 30
    }
  }
}
</script>

<style scoped>

.addStudentPanelGradesContent {
  margin-top: 19px;
}


.addStudentPanelGradesContentSingle {
  display: inline-block;
  width: 90%;
  float: left;
  margin-bottom: 20px;
}

.addStudentPanelGradesContentSingleGrade {
    margin-top: 12px;
}

.addStudentPanelGradesContentSingleWeight {
    margin-top: 12px;
}


.addStudentPanelGradesContentSingleDescription input{
  width: 100%;
  height: 25px;
}

.addStudentPanelGradesContentSingleDescription span.descriptionCount {
    font-size: 9px;
}




</style>
