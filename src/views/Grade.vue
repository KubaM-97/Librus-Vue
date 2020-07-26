<template>

  <div class="addStudentPanelGradesContentSingle">

       <div class="container">

          <div class="row">

            <div class="col-md-3">

                <div class="addStudentPanelGradesContentSingleGrade">

                  <label for="grades">Ocena:</label>

                  <div class="select">

                    <select v-model.number="payloadGrade.grade" @change="addNewGrade" id="grades">
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
                      <select v-model.number="payloadWeight.weight" @change="addNewWeight" id="weight">
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

                     <input type="text" v-model="payloadDescription.description" @change="addNewDescription" class="description" maxlength="30">

                 </label>

             </div>

            </div>

          </div>

       </div>

       <span @click="usun"><em>Usuń</em></span>

  </div>
</template>

<script>
export default {
  name: "Grade",
  watch: {
    "payloadDescription.description": {
      handler: function(newVal,oldVal){
        const inputGradeDescription = document.querySelectorAll(".description")[this.n].value;
        const descriptionCount = document.querySelectorAll("span.descriptionCount")[this.n];
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

        // return this.characters--
      },
      deep:true
      // handler(newValue, oldValue){
      //   alert(newValue)
      //   const inputGradeDescription = document.querySelector(".description").value;
      //   const descriptionCount = document.querySelector("span.descriptionCount");
      //   console.log(inputGradeDescription.length)
      //   const counter = (30 - (inputGradeDescription.length));
      //   switch (counter) {
      //       case 2:
      //       case 3:
      //       case 4:
      //       case 22:
      //       case 23:
      //       case 24:
      //           descriptionCount.innerHTML = `Pozostały: ${counter} znaki.`;
      //           break;
      //       case 1:
      //           descriptionCount.innerHTML = `Pozostał: ${counter} znak.`;
      //           break;
      //       default:
      //           descriptionCount.innerHTML = `Pozostało: ${counter} znaków.`;
      //   }
      //
      //   return this.characters--
      // },
      // deep: true
    }
  },
  data(){
    return{
      characters: 30,
      payloadGrade:{
        grade: "",
        placeInArray: this.n
      },
      payloadWeight:{
        weight: "",
        placeInArray: this.n
      },
      payloadDescription:{
        description: "",
        placeInArray: this.n
      },
      payloadDate: {
        date: "",
        placeInArray: this.n
      }
    }
  },
  props:["n"],
  // updated(){
  //   this.gradeWeightColor
  // },
  updated(){
    // if we've got both: grade, weight and description
    if((this.payloadGrade.grade!=="")&&(this.payloadWeight.weight!=="")&&(this.payloadDescription.description!=="")){
      this.payloadDate.date = this.whatsTheDatePlease();
      this.addNewDate();
    }
  },
  methods:{
    usun(){
      document.querySelectorAll(".addStudentPanelGradesContentSingle")[this.n].innerHTML = ""
      // this.$emit("bbbb", false)
    },
    addNewGrade(){
        this.$store.commit("addNewGradeToArray", this.payloadGrade);
    },
    addNewWeight(){
        this.$store.commit("addNewWeightToArray", this.payloadWeight)
    },
    addNewDescription(){
        this.$store.commit("addNewDescriptionToArray", this.payloadDescription)
    },
    addNewDate(){
        this.$store.commit("addNewDateToArray", this.payloadDate)
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

  },
  // beforeDestroy(){
  //
  // },
  destroy(){
    let limit = this.$store.state.newStudentGrades.grades.length;
    if(this.$store.state.newStudentGrades.weights.length>this.$store.state.newStudentGrades.grades.length){
      limit = this.$store.state.newStudentGrades.weights.length
    }
    for(let i = 0; i<=limit; i++){
      if(i>this.n){
        this.$store.state.newStudentGrades.grades[i]=this.$store.state.newStudentGrades.grades[i-1]
      }
    }
    this.$store.state.newStudentGrades.grades.pop()
    this.$store.state.newStudentGrades.weights.pop()
    this.$store.state.newStudentGrades.descriptions.pop()
    this.$store.state.newStudentGrades.dates.pop()
  }
}
</script>

<style>
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
 /* .addStudentPanelMain select:after{
  content: "▼";
  padding: 12px 8px;
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 1;
  text-align: center;
  width: 10%;
  height: 100%;
  pointer-events: none;
} */
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
    /* text-shadow: .2px 0px 1px #00c3ff, -.2px 0px 1px #00c3ff, 0px .2px 1px #00c3ff, 0px -.2px 1px #00c3ff; */
    -webkit-box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.9);
    -moz-box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.9);
    box-shadow: 0px 0px 10px 2px rgba(204, 204, 204, 0.9)
}

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
