<template>

    <div class="addStudentPanel">

        <div class="addStudentPanelMain">

          <div class="container">

              <div class="row">

                 <div class="col-md-4">

                   <div class="addStudentPanelName">

                       <label for="name">*Imię i Nazwisko:
                           <span class="nameTooltip">
                               Podwójne nazwiska przy pomocy myślnika
                           </span>
                       </label>

                       <input type="text" v-model="add.name" id="name" maxlength="30">
                      <span class="required">
                           <transition name="bounce">
                              <span class="required" v-if="showError">Uzupełnij imię i nazwisko</span>
                           </transition>
                      </span>
                         Informacje dodatkowe
                         <span class="showInfo" @click="additionalInfoSwitcher">Rozwiń</span>

                   </div>

                   <div class="addStudentPanelNameInfo">

                      <transition name="slide-fade" @enter="enter" @leave="leave" :css="false">

                          <div class="info" v-if="info">

                               <div class="form-group">
                                 <label for="pesel">PESEL:</label>
                                 <input type="text" id="Pesel" placeholder="PESEL" @keyup="validatorData('Pesel', '^[0-9]{11}$', 'Dokładnie 9 cyfr')">
                                 <span class="wrongAdditionalInfo" id="wrongPesel"></span>
                               </div>

                               <div class="form-group">

                                 <label>Adres:</label>

                                 <input type="text" id="Street" placeholder="ulica" @keyup="validatorData('Street', '^[0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]*$', 'Bez znaków specjalnych.')">
                                 <span class="wrongAdditionalInfo" id="wrongStreet"></span>

                                 <input type="text" id="HouseNr" placeholder="nr_domu" @keyup="validatorData('HouseNr', '^[0-9]+[a-zA-Z]?(/?[0-9]*[a-zA-Z]?)?$', 'Nr, Nr/Nr, Nr Litera <br /> np. 11 11/13 11A 11A/13B')">
                                 <span class="wrongAdditionalInfo" id="wrongHouseNr"></span>

                                 <input type="text" id="FlatNr" placeholder="nr_mieszkania" @keyup="validatorData('FlatNr', '^[0-9]+[a-zA-Z]?$', 'Liczba + ew.litera np.116F')">
                                 <span class="wrongAdditionalInfo" id="wrongFlatNr"></span>

                                 <input type="text" id="PostCode" placeholder="kod pocztowy" @blur="validatorData('PostCode', '^[0-9]{2}-[0-9]{3}$', '_ _ - _ _ _')">
                                 <span class="wrongAdditionalInfo" id="wrongPostCode"></span>

                                 <input type="text" id="City" placeholder="miasto" @keyup="validatorData('City', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( (- )?[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)*$', 'Brak Cyfr i znaków specjalnych. <br />')">
                                 <span class="wrongAdditionalInfo" id="wrongCity"></span>

                               </div>

                               <div class="form-group">
                                 <label for="Tel">Telefon:</label>
                                 <input type="text" id="Tel" placeholder="Telefon" @blur="validatorData('Tel', '^([0-9]{7}|[0-9]{9})$', 'Dokładnie 7 lub 9 cyfr.')">
                                 <span class="wrongAdditionalInfo" id="wrongTel"></span>
                               </div>

                               <div class="form-group">

                                 <label for="Email">Email:</label>
                                 <input type="text" id="Email" placeholder="adres e-mail" @blur="validatorData('Email', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
                                 <span class="wrongAdditionalInfo" id="wrongEmail"></span>

                               </div>

                               <div class="parents">

                             <div class="mother">
                               <div class="form-group">
                                 <label>Matka:</label>

                                   <input type="text" id="MothersFirstName" placeholder="Imię matki" @keyup="validatorData('MothersFirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Anna Maria')"/>
                                   <span class="wrongAdditionalInfo" id="wrongMothersFirstName"></span>

                                   <input type="text" id="MothersLastName" placeholder="Nazwisko matki" @keyup="validatorData('MothersLastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')"/>
                                   <span class="wrongAdditionalInfo" id="wrongMothersLastName"></span>

                                   <input type="text" id="MothersTelephone" placeholder="numer telefonu matki" @blur="validatorData('MothersTelephone', '^[0-9]{7}([0-9]{2})?$', 'Dokładnie 7 lub 9 cyfr.')">
                                   <span class="wrongAdditionalInfo" id="wrongMothersTelephone"></span>

                                   <input type="text" id="MothersEmail" placeholder="email matki" @blur="validatorData('MothersEmail', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
                                   <span class="wrongAdditionalInfo" id="wrongMothersEmail"></span>


                               </div>
                             </div>

                             <div class="father">
                               <div class="form-group">

                                 <label>Ojciec:</label>

                                 <input type="text" id="FathersFirstName" placeholder="Imię ojca" @keyup="validatorData('FathersFirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Anna Maria')"/>
                                 <span class="wrongAdditionalInfo" id="wrongFathersFirstName"></span>

                                 <input type="text" id="FathersLastName" placeholder="Nazwisko ojca" @keyup="validatorData('FathersLastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')"/>
                                 <span class="wrongAdditionalInfo" id="wrongFathersLastName"></span>

                                 <input type="text" id="FathersTelephone" placeholder="numer telefonu ojca" @blur="validatorData('FathersTelephone', '^[0-9]{7}([0-9]{2})?$', 'Dokładnie 7 lub 9 cyfr.')">
                                 <span class="wrongAdditionalInfo" id="wrongFathersTelephone"></span>

                                 <input type="text" id="FathersEmail" placeholder="email ojca" @blur="validatorData('FathersEmail', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
                                 <span class="wrongAdditionalInfo" id="wrongFathersEmail"></span>

                               </div>
                             </div>

                           </div>

                          </div>

                      </transition>

                   </div>

                  </div>

                  <div class="col-md-7">

                   <div class="addStudentPanelGradesTitle">
                        <span class="addStudentGradeSubpanelTitle">Dotychczasowe oceny:</span>
                   </div>

                   <div class="addStudentPanelGradesContent" v-for="n in gradesLength" :key="n">

                     <grade-component :n="n-1"></grade-component>

                   </div>


                 </div>

                  <div class="addStudentPanelGradesContentButton">
                    <button @click="addNewGrade()">  +  </button>
                  </div>

              </div>

              <div class="row">

                <div class="addStudentPanelSummary">

                  <table>

                            <tr>
                                <td>
                                  <span v-if="add.name!==''">{{add.name | formatName}}</span>
                                </td>

                                <td>
                                    <!-- <span v-if="this.$store.state.newStudentGrades.grades!=='' && this.$store.state.newStudentGrades.weights[0]===1" v-html="gradeWeightColor(1)">

                                    </span>

                                    <span v-else-if="this.$store.state.newStudentGrades.grades!=='' && this.$store.state.newStudentGrades.weights===2" v-html="gradeWeightColor(2)">

                                    </span>

                                    <span v-else-if="this.$store.state.newStudentGrades.grades!=='' && this.$store.state.newStudentGrades.weights===3" v-html="gradeWeightColor(3)">

                                    </span> -->

                                    <span v-html="gradeWeightColor()">

                                    </span>
                                </td>

                                <td>
                                    <!-- <span v-if="add.grades!=='' && add.weight!==''">{{addAvg}}
                                    </span> -->
                                </td>

                                <td>
                                    <!-- <span v-if="add.avg!==''" class="fire">
                                        {{addThreatness}}
                                    </span> -->
                                </td>
                            </tr>

                  </table>

                </div>

              </div>

              <div class="row">

                <div class="addStudentPanelButtons">

                  <button class="btn btn-danger btn-lg" @click="addStudentCancel()">Anuluj</button>

                  <button class="btn btn-primary btn-lg" @click="addStudent()">Dodaj ucznia</button>

                </div>

              </div>

          </div>

        </div>

        <div class="confirm" v-show="confirm">
          <p>Na pewno chcesz wyjść? Nie zapisano zmian...</p>
          <button @click="confirmWindow('quit')">Wychodzę</button>
          <button @click="confirmWindow('stay')">Racja, zostaję!</button>
        </div>

    </div>

</template>



<script>
//CSS
require("../assets/animations.css");

import Grade from "./Grade.vue"
export default {
  name: "AddStudent",
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
        info: false,
        confirm: false,
        exitPath: "",
        quit: false,
        stay: false,
        showError: false,
        gradesLength: 1,
        color: ""
      }
  },
  components: {
    "grade-component": Grade
  },
  computed: {
      newGrades(){
        console.log(this.$store.getters.newGrades);
        return this.gradeWeightColor();
      },
      addAvg: function() {
          if (this.add.grades !== '' && this.add.weight !== '') {
              const arr1 = [];
              const arr2 = [];
              this.avg(arr1.push(this.add.grades), arr2.push(this.add.weights));
              const addAvgRounded = Math.round(arr1[0] * arr2[0] / arr2[0]).toFixed(2);
              console.log(arr1)
              console.log(arr2)
              console.log(addAvgRounded)
              // this.add.avg = addAvgRounded;
              return addAvgRounded
          }
          else{return ''}
      },
      addThreatness: function() {
          if (this.add.avg !== "") {
              if (this.add.avg < 2) {
                  return "ZAGROŻENIE"
              } else {
                  return ""
              }
          }
          else{return ''}
      }
  },
  beforeRouteLeave(to,from,next){
    if((this.confirm==false) && ((this.add.name == "")||(this.add.grades == "")||(this.add.weights == "")||(this.add.description == ""))){
      if(to.path == "/LoggedOut"){
        next()
      }
      else if(this.exitPath == ""){
        setTimeout(()=>{
          //shows confirm window
          this.confirm = true;
        },500)
        this.exitPath = to.path;
        next(false)
      }
      else{
        next()
      }
    }
  },
  beforeUpdate() {
    let addAvgRounded = '';
      if (this.add.avg !== '') {
          const arr1 = [];
          const arr2 = [];
          arr1.push(this.add.grades);
          arr2.push(this.add.weight);
          addAvgRounded = Math.round(arr1[0] * arr2[0] / arr2[0]).toFixed(2);
      }
      return this.add.avg = addAvgRounded;
  },
  // updated(){
  //   this.gradeWeightColor()
  // },
  filters: {
    //converts student's full name to correct form
    //e.g jan kowalski => KOWALSKI Jan
    formatName(name) {
      const wrongName = document.querySelector(".required");
      const reg = new RegExp("^[A-Z]?[a-z]*( [A-Z]?[a-z]*)+(-[A-Z]?[a-z]+)?$");
      if(reg.test(name) == true){
        wrongName.innerHTML = "";
        const array = [];
        //splits name into firstName and lastName
        //e.g jan kowalski => ["jan", "kowalski"]
        const nameArray = name.split(" ");
        nameArray[0].toLowerCase();
        //splits firstName and lastName into single letters
        //e.g jan => ["j", "a", "n"]
        const singleLetter = nameArray[0].split("");
        //makes the first letter bigger
        //e.g jan[0] => ["j"] => ["J"]
        const bigFirstLetter = singleLetter[0].toUpperCase();
        //replaces firts small letter of firstName to Big letter
        //e.g jan => Jan
        array.push(nameArray[0].replace(singleLetter[0], bigFirstLetter));
        if (nameArray.length > 1) {
            //replaces lastname to BIG LETTERS
            //e.g kowalski => KOWALSKI
            array.push(nameArray[1].toUpperCase());
        }
        //converts array into string
        return array.reverse().join(" ");
      }
      else if(reg.test(name) == false){
        wrongName.innerHTML = "Bez cyfr i znaków specjalnych."
      }
    },
  },
  methods: {
      //starts animation
      enter: function(el, done){
        el.addEventListener("animationend", function(){
          el.style="";
          done();
        });
        el.style.animationName="aaa";
        el.style.animationDuration="1s"
      },
      //ends animation
      leave: function(el, done){
        el.addEventListener("animationend", function(){
          el.style="";
          done();
        });
        el.style.animationName="aaa";
        el.style.animationDuration="1s";
        el.style.animationDirection="reverse"
      },
      //shows confirm window
      confirmWindow: function(action){
        if(action=="quit"){
          this.confirm = false;
          this.$router.push({path: this.exitPath})
        }
        else if(action == "stay"){
          this.confirm = false;
          this.exitPath = "";
          this.$router.push({path: this.exitPath});
        }
      },
      //shows additional information
      additionalInfoSwitcher: function() {
        const spanInfoSwitcher = document.querySelector(".addStudentPanelName span.showInfo");
        this.info = !this.info;
        if(spanInfoSwitcher.innerHTML == "Rozwiń") {
          spanInfoSwitcher.innerHTML = "Zwiń";
          // document.querySelector(".info").classList.add("expanded")
        }
        else {
          spanInfoSwitcher.innerHTML = "Rozwiń";
          // document.querySelector(".info").classList.remove("expanded")
        }
      },
      //regular expressions
      validatorData: function(Data, RegularExpression, Format) {
        //gets inserted value
        const insertedData = document.querySelector("#"+Data).value;
        //gets regular expression
        const reg = new RegExp(RegularExpression);
        const span = document.querySelector("#wrong"+Data);
        if((insertedData !== '') && (reg.test(insertedData)==false)){
          span.innerHTML = `Podaj prawidłowy format :
          <br /> ${Format}`;
        }
        else{
          span.innerHTML = ``;
        }
      },

      //colors grades
      gradeWeightColor: function() {

        let aaa = "";

          for (let i = 0; i < this.$store.state.newStudentGrades.grades.length; i++) {
              if((this.$store.state.newStudentGrades.grades!=="")&&(this.$store.state.newStudentGrades.weights!=="")){
                    if (this.$store.state.newStudentGrades.weights[i] == 1) {
                        aaa += `<div class="gradeWeightColor gradeWeightGreen">${this.$store.state.newStudentGrades.grades[i]}</div>`
                    } else if (this.$store.state.newStudentGrades.weights[i] == 2) {
                        aaa +=  `<div class="gradeWeightColor gradeWeightYellow">${this.$store.state.newStudentGrades.grades[i]}</div>`
                    } else if (this.$store.state.newStudentGrades.weights[i] == 3) {
                        aaa +=  `<div class="gradeWeightColor gradeWeightRed">${this.$store.state.newStudentGrades.grades[i]}</div>`
                    }
              }
              else {
                aaa +=  `<div class="gradeWeightColor">${this.$store.state.newStudentGrades.grades[i]}</div>`
              }
          }

        return aaa


      },
      //adds a new grade to new student
      addNewGrade: function() {
        this.gradesLength++;
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
          const averageRounded = (Math.round(average * 100) / 100).toFixed(2);
          return averageRounded;
      },
      //decides if student is threated
      threatness: function(myAVG) {
          if (myAVG < 2) {
              return "<span class='fire'>ZAGROŻENIE</span>"
          } else {
              return ""
          }
      },
      //resets addStudent Panel
      addStudentCancel: function() {
          this.add.name = "";
          this.add.grades = "";
          this.add.weight = "";
          this.add.description = "";
      },
      //adds a new student to the class table
      addStudent: function() {
          const gradeInDiv = document.querySelectorAll("table.summary .gradeWeightColor");
          //these arrays contain grades and weigths of a new student
          const ArrayNewStudentGrade = [];
          const ArrayNewStudentWeight = [];
          const ArrayNewStudentDescription = [];
          ArrayNewStudentGrade.push(this.add.grades);
          ArrayNewStudentWeight.push(this.add.weight);
          ArrayNewStudentDescription.push(this.add.description);
          //this is inserted by user (by teacher) name for a new student
          const addedStudentName = this.add.name;
          //splits name into firstname and lastname
          const addedStudentNameArray = addedStudentName.split(" ");
          //if we've got both firstname and lastname
          if (addedStudentNameArray.length >= 2) {
              //adds a new row to the end of table and connects new cells with a new row
              const table = document.querySelector(".students");
              const tr = document.querySelectorAll(".students tbody tr").length;
              const row = table.insertRow(tr + 1);
              const cell1 = row.insertCell(0);
              const cell2 = row.insertCell(1);
              const cell3 = row.insertCell(2);
              const cell4 = row.insertCell(3);
              const cell5 = row.insertCell(4);
              //this is a variable with avg
              const cell4Shorthand = this.avg(ArrayNewStudentGrade, ArrayNewStudentWeight);
              //wraps grades in div
              this.wrapMyGradesIntoDiv(ArrayNewStudentGrade);
              //adds content to table
              cell1.innerHTML = tr + 1;
              cell2.innerHTML = addedStudentNameArray[1].toUpperCase() + " " + addedStudentNameArray[0];
              cell3.appendChild(gradeInDiv[0]);
              cell4.innerHTML = cell4Shorthand;
              cell5.innerHTML = this.threatness(cell4Shorthand);
              //colors grades
              this.gradeWeightColor(ArrayNewStudentWeight);
              //adds tooltips
              this.showTooltip();
              //sorts students in table
              this.sortMyStudents();
              //get current date
              this.whatsTheDatePlease();
          }
          //if we've got only firstname or lastname
          else {
            this.showError = true;
              // document.querySelector("span.required").innerHTML = "Uzupełnij imię i nazwisko"
          }
          //if we've got both grade, weigth and description
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



<style scoped>
.addStudentPanel {
    width: 90%;
    max-width: 1400px;
    margin: 100px auto;
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    background-color: rgba(0, 0, 0, .55);
    text-align: center;
    font-size: 13px;
}
.addStudentPanelMain{
    padding: 40px;
}
.addStudentPanelMain label {
    display: block;
    font-size: 15px;
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
.addStudentPanelName {
    padding-top: 40px
}
.addStudentPanelName input{
  margin-bottom: 10px;
  height: 28px;
}
.addStudentPanelName span.nameTooltip {
    font-size: 10px;
    display: block;
}
.addStudentPanelName span.showInfo {
  cursor: pointer;
  font-size: 9px;
  margin-left: 25px;
}
.addStudentPanelNameInfo div.info{
  margin-top:50px;
  width: 100%
}
.addStudentPanelNameInfo .form-group{
  width: 100%;
  display: inline-block;
  vertical-align: top;
}
.addStudentPanelNameInfo label{
  float: left;
  padding-left: 25px;
  margin-top: 15px;
  font-size: 12px;
}
.addStudentPanelNameInfo input{
  display: block;
  float: right;
  width: 50%;
  margin-right: 50px;
  background-color: black;
  border: 0.2px solid white;
  box-shadow: 2px 2px 0px 0px white;
  border-top: none;
  border-left: none;
  border-right: none;
  text-align: left;
  padding-left: 15px;
  text-shadow: none;
  font-size: 11px;
}
.addStudentPanelNameInfo span[class^="wrong"]{
  font-size: 9px;
  display: block;
  width: 60%;
  float: right;
  margin-right: 30px;
  margin-top: 11px;
}
/* .addStudentPanelMain div.select {
  height: 40px;
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  margin-bottom: 1em;
} */
/* .addStudentPanelMain select:after {
  content: "▼";
  position: absolute;
  right: 10px;
  top: 0;
  z-index: 1;
  text-align: center;
  height: 100%;
  pointer-events: none;
} */
.addStudentPanelGradesTitle {
    margin-top: 10px;
    font-size: 11px;
}
.addStudentPanelGradesContentButton button {
  background-color: #00c3ff;
  color: white;
  text-shadow: -1px 0 #00c3ff, 0 1px #00c3ff, 1px 0 #00c3ff, 0 -1px #00c3ff;
  -webkit-box-shadow: inset 0px 0px 20px 12px black,  0px 0px 20px 3px black;
  -moz-box-shadow: inset 0px 0px 20px 12px black,  0px 0px 20px 3px black;
  box-shadow: inset 0px 0px 20px 12px black,  0px 0px 20px 3px black;
  border: 1px solid #00c3ff !important;
  border-radius: 50%;
  margin-top: 20px;
  padding: 0 12px;
  font-size: 29px;
}
.addStudentPanelGradesContentButton button:hover {
    background-color: black;
    -webkit-box-shadow: inset 0px 0px 15px 2px #00c3ff ,  0px 0px 15px 3px #00c3ff;
    -moz-box-shadow: inset 0px 0px 15px 2px #00c3ff ,  0px 0px 15px 3px #00c3ff;
    box-shadow: inset 0px 0px 15px 2px #00c3ff ,  0px 0px 15px 3px #00c3ff;
    color: black;
    border: 1px solid white !important;
}
.addStudentPanelSummary{
  width: 80%;
  margin: 50px 70px 0;
}
table {
    width: 100%;
}
table td {
    height: 50px;
    padding: 15px 50px;
    border: 1px solid white;
    text-align: center;
}
table td:nth-child(1),
table td:nth-child(4) {
    width: 33%;
}
table td:nth-child(2),
table td:nth-child(3) {
    width: 16%;
}
.addStudentPanelButtons {
    width: 90%;
    text-align: right;
    margin-top: 50px;
}
.addStudentPanelButtons button{
  font-size: 14px;
  padding: 8px 12px;
  margin-left: 25px;
}
.confirm{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15px;
  width: 500px;
  max-width: 80%;
  height: 200px;
  padding-top: 50px;
  background-color: black;
  box-shadow: 3px 3px 30px 5px #00c3ff;
}
.confirm p{
  margin-bottom: 50px;
}
.confirm button{
  padding: 10px;
  color: white;
  margin: 0 30px;
  border-radius: 10px;
}
.confirm button:first-of-type{
  background-color: red
}
.confirm button:last-of-type{
  background-color: green
}
</style>
