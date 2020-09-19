<template>

  <div class="addStudentPanelGradesContentSingle">

       <div class="container gainedGrades">

          <div class="row">

            <div class="col-3">

                <div class="addStudentPanelGradesContentSingleGrade">

                  <label for="grades">Ocena:</label>

                  <div class="select">

                    <select v-model.number="payload.grade" @change="addNewGrade" id="grades">
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
                      <select v-model.number="payload.weight" @change="addNewWeight" id="weight">
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

                 <label class="description">Opis oceny:

                     <input type="text" v-model="payload.description" @change="addNewDescription" class="description" maxlength="30">

                 </label>

             </div>

            </div>

            <div class="col-1">
                <span @click="remove(n-1)" class="remove"><em>Usuń</em></span>
            </div>

          </div>

       </div>



  </div>

</template>

<script>
import { mapMutations } from "vuex"
export default {
  name: "Grade",
  data(){
    return{
      characters: 30,
      payload: {
        grade: "",
        weight: "",
        description: "",
        date: "",
        placeInArray: this.n-1
      }
    }
  },
  watch: {
      "payload.description": {
        handler: function(){
          const inputGradeDescription = document.querySelectorAll("input.description")[this.n-1].value;
          const descriptionCount = document.querySelectorAll("span.descriptionCount")[this.n-1];
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
  props:["n", "a", "gradesLength", "possibleSave"],
  created(){

    this.$store.state.newGrades.grades[this.payload.placeInArray] = "";
    this.$store.state.newGrades.weights[this.payload.placeInArray] = "";
    this.$store.state.newGrades.descriptions[this.payload.placeInArray] = "";
    this.$store.state.newGrades.dates[this.payload.placeInArray] = "";

  },
  updated(){
    // if we've got both: grade, weight and description
    // if((this.payload.grade!=="")&&(this.payload.weight!=="")&&(this.payload.description!=="")){
      this.payload.date = this.whatsTheDatePlease();
    //   this.addNewDate();
    // }
    this.addNewDate()
  },
  mounted(){
    // alert(this.n)
  },
  destroyed(placeInArray){
    this.$emit("update:a", this.a+1);
    this.$emit("update:possibleSave", true);
    this.removeGrade(this.payload.placeInArray);
  },
  methods:{

    ...mapMutations([
      "addNewGradeToArray",
      "addNewWeightToArray",
      "addNewDescriptionToArray",
      "addNewDateToArray",
      "removeGrade",
    ]),

      remove(placeInArray){
      document.querySelectorAll(".addStudentPanelGradesContentSingle")[this.payload.placeInArray].innerHTML = "";
      document.querySelectorAll(".addStudentPanelGradesContentSingle")[this.payload.placeInArray].style.marginBottom = "0px";
        this.$destroy(placeInArray);
      },

    addNewGrade(){
        this.addNewGradeToArray(this.payload);
        this.$emit("update:a", this.a+1);
        this.$emit("update:possibleSave", true);
    },
    addNewWeight(){
        this.addNewWeightToArray(this.payload);
        this.$emit("update:a", this.a+1);
        this.$emit("update:possibleSave", true);
    },
    addNewDescription(){
        this.addNewDescriptionToArray(this.payload);
        this.$emit("update:a", this.a+1);
    },
    addNewDate(){
        this.addNewDateToArray(this.payload);
    },

    //returns current Date in an Array
    whatsTheDatePlease: function() {
        const today = new Date();
        const currentYear = today.getFullYear();
        let currentMonth = today.getMonth();
        let currentDay = today.getDate();
        let currentHours = today.getHours();
        let currentMinutes = today.getMinutes();
        let currentSeconds = today.getSeconds();
        if (currentMonth < 10) {
            currentMonth = `0${currentMonth}`;
        }
        if (currentDay < 10) {
            currentDay = `0${currentDay}`;
        }
        if (currentHours < 10) {
            currentHours = `0${currentHours}`;
        }
        if (currentMinutes < 10) {
            currentMinutes = `0${currentMinutes}`;
        }
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        // [DD.MM.YYYY]
        const dateSubArrayDDMMYYYY = [currentDay, currentMonth, currentYear].join(".");

        // [HH:MM:SS]
        const dateSubArrayHHMMSS = [currentHours, currentMinutes, currentSeconds].join(":");

        // [["DD.MM.YYYY"] ["HH:MM:SS"]]
        const dateFull = [];
        dateFull.push(dateSubArrayDDMMYYYY, dateSubArrayHHMMSS)

        // DD.MM.YYYY HH:MM:SS
        const dateFullStr = dateFull.join(" ")

        // [DD.MM.YYYY HH:MM:SS]
        const dateFullArray = [];
        dateFullArray.push(dateFullStr);

        let dateArray;
        return dateArray = dateFullStr;

    }
  }
}
</script>

<style>

div.gainedGrades{
    margin: 15px;
}
.addStudentPanelMain select {
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
.addStudentPanelMain select option {
    color: #00c3ff;
    text-align: center;
    border-bottom: 1px solid blue;
}
.addStudentPanelMain input {
    outline: none;
    display: block;
    margin: auto;
    margin-top: 10px;
    width: 65%;
    height: 23px;
    font-size: 0.40rem;
    text-align: center;
    background-color: black;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    text-shadow: none;
}
.addStudentPanelMain input:focus {
    border: 2px solid #a5cda5;
    color: white;
    -webkit-box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.9);
    -moz-box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.9);
    box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.9)
}

.addStudentPanelGradesContent {
    margin-top: 19px;
}


.addStudentPanelGradesContentSingle {
    display: inline-block;
    width: 100%;
    float: left;
    margin-bottom: 20px;
}

.addStudentPanelGradesContentSingleGrade {
    margin-top: 12px;
}

.addStudentPanelGradesContentSingleWeight {
    margin-top: 12px;
}

.addStudentPanelGradesContentSingleDescription label.description{
    margin-bottom: 0;
}

.addStudentPanelGradesContentSingleDescription input{
    width: 90%;
    /* height: 25px; */
}

.addStudentPanelGradesContentSingleDescription span.descriptionCount {
    font-size: 9px;
}

.addStudentPanelGradesContentSingle .row>div{
  align-content: flex-end;
  display: grid;
}

span.remove{
    font-size: 12px;
    text-decoration: underline;
}
span.remove:hover{
    cursor: pointer;
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
    width: 90%;
    height: 23px;
    font-size: 14px;
    text-align: center;
    background-color: black;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    text-shadow: none;
}
@media (max-width: 768px){
    .row{
        margin-right: 0;
    }

    div[class^=col-]{
        padding: 0;
    }

    .addStudentPanelGradesContentSingle{
        width: 100%;
    }

    span.remove{
        margin-left: 20px;
    }
}
</style>
