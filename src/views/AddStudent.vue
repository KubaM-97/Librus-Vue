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

                       <input type="text" v-model.lazy.trim="name" id="name" maxlength="30">
                      <span class="required">
                           <transition name="bounce">
                              <span class="required" v-if="showError">Uzupełnij imię i nazwisko</span>
                           </transition>
                      </span>
                         Informacje dodatkowe
                         <span class="showInfo" @click="additionalInfoSwitcher">Rozwiń</span>

                   </div>

                   <div class="addStudentPanelNameInfo">

                      <transition @enter="enter" @leave="leave" :css="false">

                          <div class="info" v-if="info">

                               <div class="form-group">
                                 <label for="pesel">PESEL:</label>
                                 <input type="text" v-model.trim="add.pesel" id="Pesel" placeholder="PESEL" @keyup="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
                                 <span class="wrongAdditionalInfo" id="wrongPesel"></span>
                               </div>

                               <div class="form-group">

                                 <label>Adres:</label>

                                 <input type="text" v-model.trim="add.street.streetName" id="Street" placeholder="ulica" @keyup="validatorData('Street', '^[0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]*$', 'Bez znaków specjalnych.')">
                                 <span class="wrongAdditionalInfo" id="wrongStreet"></span>

                                 <input type="text" v-model.trim="add.street.streetNr" id="HouseNr" placeholder="nr_domu" @keyup="validatorData('HouseNr', '^[0-9]+[a-zA-Z]?(/?[0-9]*[a-zA-Z]?)?$', 'Nr, Nr/Nr, Nr Litera <br /> np. 11 11/13 11A 11A/13B')">
                                 <span class="wrongAdditionalInfo" id="wrongHouseNr"></span>

                                 <input type="text" v-model.trim="add.street.streetFlat" id="FlatNr" placeholder="nr_mieszkania" @keyup="validatorData('FlatNr', '^[0-9]+[a-zA-Z]?$', 'Liczba + ew.litera np.116F')">
                                 <span class="wrongAdditionalInfo" id="wrongFlatNr"></span>

                                 <input type="text" v-model.trim="add.street.streetPostCode" id="PostCode" placeholder="kod pocztowy" @blur="validatorData('PostCode', '^[0-9]{2}-[0-9]{3}$', '_ _ - _ _ _')">
                                 <span class="wrongAdditionalInfo" id="wrongPostCode"></span>

                                 <input type="text" v-model.trim="add.street.streetCity" id="City" placeholder="miasto" @keyup="validatorData('City', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( (- )?[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)*$', 'Brak Cyfr i znaków specjalnych. <br />')">
                                 <span class="wrongAdditionalInfo" id="wrongCity"></span>

                               </div>

                               <div class="form-group">
                                 <label for="Phone">Telefon:</label>
                                 <input type="text" v-model.trim="add.phone" id="Phone" placeholder="Telefon" @blur="validatorData('Phone', '^([0-9]{7}|[0-9]{9})$', 'Dokładnie 7 lub 9 cyfr.')">
                                 <span class="wrongAdditionalInfo" id="wrongPhone"></span>
                               </div>

                               <div class="form-group">

                                 <label for="Email">Email:</label>
                                 <input type="text" v-model.trim="add.email" id="Email" placeholder="adres e-mail" @blur="validatorData('Email', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
                                 <span class="wrongAdditionalInfo" id="wrongEmail"></span>

                               </div>

                               <div class="parents">

                             <div class="mother">

                               <div class="form-group">

                                 <label>Matka:</label>

                                   <input type="text" v-model.trim="add.mother.mothersFirstName" id="MothersFirstName" placeholder="Imię matki" @keyup="validatorData('MothersFirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-zząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Anna Maria')"/>
                                   <span class="wrongAdditionalInfo" id="wrongMothersFirstName"></span>

                                   <input type="text" v-model.trim="add.mother.mothersLastName" id="MothersLastName" placeholder="Nazwisko matki" @keyup="validatorData('MothersLastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')"/>
                                   <span class="wrongAdditionalInfo" id="wrongMothersLastName"></span>

                                   <input type="text" v-model.trim="add.mother.mothersTelephone" id="MothersTelephone" placeholder="numer telefonu matki" @blur="validatorData('MothersTelephone', '^[0-9]{7}([0-9]{2})?$', 'Dokładnie 7 lub 9 cyfr.')">
                                   <span class="wrongAdditionalInfo" id="wrongMothersTelephone"></span>

                                   <input type="text" v-model.trim="add.mother.mothersEmail" id="MothersEmail" placeholder="email matki" @blur="validatorData('MothersEmail', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
                                   <span class="wrongAdditionalInfo" id="wrongMothersEmail"></span>


                               </div>

                             </div>

                             <div class="father">

                               <div class="form-group">

                                 <label>Ojciec:</label>

                                 <input type="text" v-model.trim="add.father.fathersFirstName" id="FathersFirstName" placeholder="Imię ojca" @keyup="validatorData('FathersFirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Jan Maria')"/>
                                 <span class="wrongAdditionalInfo" id="wrongFathersFirstName"></span>

                                 <input type="text" v-model.trim="add.father.fathersLastName" id="FathersLastName" placeholder="Nazwisko ojca" @keyup="validatorData('FathersLastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')"/>
                                 <span class="wrongAdditionalInfo" id="wrongFathersLastName"></span>

                                 <input type="text" v-model.trim="add.father.fathersTelephone" id="FathersTelephone" placeholder="numer telefonu ojca" @blur="validatorData('FathersTelephone', '^[0-9]{7}([0-9]{2})?$', 'Dokładnie 7 lub 9 cyfr.')">
                                 <span class="wrongAdditionalInfo" id="wrongFathersTelephone"></span>

                                 <input type="text" v-model.trim="add.father.fathersEmail" id="FathersEmail" placeholder="email ojca" @blur="validatorData('FathersEmail', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
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

                     <grade-component :b.sync="b[n-1]" :n.sync="n" :gradesLength.sync="gradesLength" :a.sync="a"></grade-component>

                   </div>



                 </div>

                <div class="col-md-1">

                     <div class="addStudentPanelGradesContentButton">
                       <button name="moreGradesAddStudent" @click="moreGrades()">  +  </button>
                     </div>

                 </div>


              </div>

              <div class="row">

                <div class="addStudentPanelSummary">

                  <table class="summary">

                            <tr>
                                <td>
                                  <span v-if="name!==''">{{name | formatName}}</span>
                                </td>

                                <td ref="allnewGrades">
                                    <span class="grades" v-html="gradeWeightColor($store.state.newGrades.grades, $store.state.newGrades.weights)">

                                    </span>
                                </td>

                                <td>
                                    <span>
                                      {{avg($store.state.newGrades.grades, $store.state.newGrades.weights)}}
                                    </span>
                                </td>

                                <td>
                                  <span v-html="threatness(avg($store.state.newGrades.grades, $store.state.newGrades.weights))">

                                  </span>
                                </td>
                            </tr>

                  </table>

                </div>

              </div>

              <div class="row">

                <div class="addStudentPanelButtons">

                  <button name="addStudentCancel" class="btn btn-danger btn-lg" @click="addStudentCancel()">Anuluj</button>

                  <button name="addStudent" class="btn btn-primary btn-lg" @click="addStudent()">Dodaj ucznia</button>

                </div>

              </div>

          </div>

        </div>

        <div class="confirm" v-show="confirm">
          <p>Na pewno? Nie zapisano zmian...</p>
          <button name="showConfirmQuit" @click="showConfirmWindow('quit')">Wychodzę</button>
          <button name="showConfirmStay" @click="showConfirmWindow('stay')">Racja, zostaję!</button>
        </div>

    </div>

</template>



<script>

//CSS
require("../assets/animations.css");

//css-table
require("../assets/table.css");
import Grade from "./Grade.vue"

import { mapState, mapMutations } from "vuex"

export default {
  name: "AddStudent",
  data(){
       return{
         b: {

         },
         add: {
             id: "",
             lastName: "",
             firstName: "",
             grades: "",
             weights: "",
             descriptions: "",
             dates: "",
             pesel: "",
             street: {
                 streetName: "",
                 streetNr: "",
                 streetFlat: "",
                 streetPostCode: "",
                 streetCity: ""
             },
             phone: "",
             email: "",
             mother: {
                 firstName: "",
                 lastName: "",
                 phone: "",
                 email: ""
             },
             father: {
                 firstName: "",
                 lastName: "",
                 phone: "",
                 email: ""
             }
        },
        name: "",
        info: false,
        confirm: false,
        exitPath: "",
        quit: false,
        stay: false,
        showError: false,
        gradesLength: 1,
        a: 1,
        color: ""
      }
  },
  mounted(){
    this.b[0] = true;
    // console.log(this.b)
  },
  components: {
    "grade-component": Grade
  },
  beforeRouteLeave(to,from,next){
    const grades = this.$store.state.newGrades.grades
    const weights = this.$store.state.newGrades.weights
    const descriptions = this.$store.state.newGrades.descriptions


    if((this.confirm==false) && (
      (this.add.name == "") ||
      (grades.length!=weights.length) || (grades.length!=descriptions.length) || (weights.length!=descriptions.length)
      || (grades.includes(undefined)) || (weights.includes(undefined)) || (descriptions.includes(undefined))
      || (descriptions.includes("")))
    ){
      if(to.path == "/LoggedOut"){
        next()
        this.addStudentCancel()
      }
      else if (this.exitPath == ""){
        setTimeout(()=>{

          //shows confirm window
          this.confirm = true;

        },500)
        this.exitPath = to.path;
        next(false)
      }
    }
    else{
      next()
      this.addStudentCancel()
    }

  },
  computed:{
    ...mapState({
        student: state => state.student,
        grades: state => state.newGrades.grades,
        weights: state => state.newGrades.weights,
        descriptions: state => state.newGrades.descriptions,
        dates: state => state.newGrades.dates,
    }),
  },
  // beforeUpdate(){
  //   if(){}
  // },
  updated(){
    if(this.name!=""){
      const arrName = this.name.split(" ");
      this.add.firstName = arrName[0];
      this.add.lastName = arrName[1];
    }
    // this.showTooltip();
    //
    let limit = this.$store.state.newGrades.grades.length;
    if(this.$store.state.newGrades.weights.length > limit){
      limit = this.$store.state.newGrades.weights.length
    }

    for(let i=0; i<limit; i++){

      if((this.$store.state.newGrades.grades[i]!="")&&(this.$store.state.newGrades.weights[i]!="")){
        this.showTooltip();
      }
    //
    }

    // alert(this.b[0])
  },
  beforeDestroy(){
    this.$store.state.newGrades.grades = "";
    this.$store.state.newGrades.weights = "";
    this.$store.state.newGrades.descriptions = "";
    this.$store.state.newGrades.dates = "";
  },
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
      enter(el, done){
        el.addEventListener("animationend", function(){
          el.style="";
          done();
        });
        el.style.animationName="showDetailData";
        el.style.animationDuration="1s"
      },

      //ends animation
      leave(el, done){
        el.addEventListener("animationend", function(){
          el.style="";
          done();
        });
        el.style.animationName="showDetailData";
        el.style.animationDuration="1s";
        el.style.animationDirection="reverse"
      },

      //shows confirm window
      showConfirmWindow(action){
        if(action=="quit"){
          this.$router.push({path: this.exitPath})
          this.confirm = false;
        }
        else if(action == "stay"){
          this.confirm = false;
          this.exitPath = "";
          this.$router.push({path: this.exitPath});
        }
      },

      //shows additional information
      additionalInfoSwitcher() {
        const spanInfoSwitcher = document.querySelector(".addStudentPanelName span.showInfo");
        this.info = !this.info;
        if(spanInfoSwitcher.innerHTML == "Rozwiń") {
          spanInfoSwitcher.innerHTML = "Zwiń";
        }
        else {
          spanInfoSwitcher.innerHTML = "Rozwiń";
        }
      },

      //regular expressions
      validatorData(Data, RegularExpression, Format) {

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
      gradeWeightColor(grades, weights) {


        let limit = grades.length;
        if(weights.length > limit){
          limit = weights.length
        }
        // alert(limit)
        const allGrades = this.$store.state.newGrades.grades;
        const allWeights = this.$store.state.newGrades.weights;
        const allDescriptions = this.$store.state.newGrades.descriptions;
        const allDates = this.$store.state.newGrades.dates;
        let content = "";

          for (let i = 0; i < limit; i++) {
              if(allGrades[i]!==""){
                // alert(allWeights[i])
                    if (allWeights[i] == 1) {
                        content += `<div class="gradeWeightColor gradeWeightGreen">${allGrades[i]}</div>`
                    } else if (allWeights[i] == 2) {
                        content +=  `<div class="gradeWeightColor gradeWeightYellow">${allGrades[i]}</div>`
                    } else if (allWeights[i] == 3) {
                        content +=  `<div class="gradeWeightColor gradeWeightRed">${allGrades[i]}</div>`
                    }
                    else if(allWeights[i]==""){
                      content +=  `<div class="gradeWeightColor">${allGrades[i]}</div>`
                    }
                    // alert(44)
              }
              else if(allGrades[i]==""){
                if(allWeights[i]===1){
                  content +=  `<div class="gradeWeightColor gradeWeightGreen"> </div>`
                }
                else if(allWeights[i]===2){
                  content +=  `<div class="gradeWeightColor gradeWeightYellow"> </div>`
                }
                else if(allWeights[i]===3){
                  content +=  `<div class="gradeWeightColor gradeWeightRed"> </div>`
                }
                // alert(55)
              }

              // if((allGrades[i]!=="")&&(allWeights[i]!=="")){
              //   alert(33)
              //   this.showTooltip(allGrades, allWeights)
              // }
          }
          return content

      },

      //adds a new grade to the new student
      moreGrades() {
        this.gradesLength++;
        this.b++;
      },

      //returns grades' average
      avg(gradesArray, weightsArray) {

          let gradesSuperValue = 0;
          let weightsSum = 0;


          for (let i = 0; i < gradesArray.length; i++) {
            if( (gradesArray[i]!=="") && (weightsArray[i]!=="") ){
              gradesSuperValue += gradesArray[i] * weightsArray[i];
              weightsSum += weightsArray[i]
            }
          }

          //round avg to 2 decimal places
          const average = gradesSuperValue / weightsSum;
          let averageRounded = (Math.round(average * 100) / 100).toFixed(2);
          if(isNaN(averageRounded)){
            averageRounded = ""
          }
          return averageRounded;


      },

      //decides if student is threated
      threatness(myAVG) {
          if ((myAVG < 2) && (myAVG != "")) {
              return "<span class='fire'>ZAGROŻENIE</span>"
          } else {
              return ""
          }
      },

      //shows tooltip after hovering on every grade
      showTooltip: function() {
        // const gradesWrappedInDiv = document.getElementsByClassName("gradeWeightColor");
        //   if(gradesWrappedInDiv.length>0){
        //       for(let i=0; i<gradesWrappedInDiv.length;i++){
        //         //draws tooltip after hovering
        //           gradesWrappedInDiv[i].addEventListener("mouseenter", function() {
        //               this.canvas(this.grades, this.weights, this.descriptions, this.dates, gradesWrappedInDiv[i], i)
        //           }.bind(this), false);
        //           //destroyes tooltip after leaving
        //           gradesWrappedInDiv[i].addEventListener("mouseleave", function() {
        //               const canv = document.querySelector("canvas");
        //               canv.parentNode.removeChild(canv);
        //           });
        //       }
        //   }
        if((this.$store.state.newGrades.grades!=="")&&(this.$store.state.newGrades.weights!=="")){
          const gradeInDiv = document.querySelectorAll("div.gradeWeightColor");

          for(let i=0; i<=gradeInDiv.length;i++){
          //  draws tooltip after hovering
            gradeInDiv[i].addEventListener("mouseenter", function() {
                this.canvas(this.grades, this.weights, this.descriptions, 330, gradeInDiv[i], i)
            }.bind(this), false);
            //destroyes tooltip after leaving
            gradeInDiv[i].addEventListener("mouseleave", function() {
                const canv = document.querySelector("canvas");
                canv.parentNode.removeChild(canv);
            });
          }
          }
      },
      //draws tooltip
      canvas(arrayWithAllGrades, arrayWithAllWeights, arrayWithAllDescriptions, arrayWithAllDates, anotherGradeWeightColorDiv, i) {
        // alert("canvas")
          const canvas = document.createElement("CANVAS");
          anotherGradeWeightColorDiv.appendChild(canvas);

          const canv = document.querySelector("canvas");
          const ctx = canv.getContext("2d");

          canvas.style['z-index'] = 2;
          canvas.style.position = 'absolute';
          canvas.style.padding = 0;
          canvas.style.border = 0;

          ctx.beginPath();
          ctx.moveTo(0, 10);
          ctx.lineTo(25, 15);
          ctx.lineTo(255, 15);
          ctx.lineTo(255, 135);
          ctx.lineTo(25, 135);
          ctx.lineTo(25, 40);
          ctx.lineTo(0, 10);
          ctx.stroke();
          ctx.fillStyle = "#ffeab0";
          ctx.fill();
          ctx.fillStyle = "black";
          ctx.font = "bold 14px Arial";

          ctx.fillText(`Ocena: ${arrayWithAllGrades[i]}`, 40, 50);
          ctx.fillText(`Waga: ${arrayWithAllWeights[i] } `, 40, 70);
          ctx.fillText(`Opis: ${arrayWithAllDescriptions[i]}`, 40, 90);
          ctx.fillText(`Data: ${arrayWithAllDates[i]}`, 40, 110);

      },

      //resets addStudent Panel
      addStudentCancel() {
          this.name = ""
          this.add.grades = "";
          this.add.weights = "";
          this.add.descriptions = "";
          this.gradesLength = 0;
          setTimeout(()=>{
            this.gradesLength = 1;
          },10);
      },

      //adds a new student to the class table
      addStudent() {

        //this is inserted by user (by teacher) name for a new student
        const addedStudentName = this.name;

        //splits name into firstname and lastname
        const addedStudentNameArray = addedStudentName.split(" ");

        //if we've got both firstname and lastname
           if (addedStudentNameArray.length >= 2) {

                this.add.grades = this.grades;
                this.add.weights = this.weights;
                this.add.descriptions = this.descriptions;
                this.add.dates = this.dates;



                this.addNewStudentToClass(this.add);
                this.setFullClass(this.students);
                this.$router.push({name: "FullClass"});
          }
          else{
              this.showError = true;
              if(this.showError==true){
                this.showError = false;
                setTimeout(()=>{
                  this.showError = true
                },10)
              }
          }

      },

      ...mapMutations([
        "addNewStudentToClass",
        "setFullClass"
      ])

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
    position: relative;
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
.addStudentPanelGradesTitle {
    margin-top: 10px;
    font-size: 11px;
}
.addStudentPanelGradesContentButton{
  position: absolute;
  top: 20px;
  right: 10px
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
  width: 90%;
  margin: 100px 70px 0;
}
span.grades{
  width: 100%
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

@media (max-width: 768px){
  .addStudentPanelMain{
      padding: 40px 10px;
  }

  span.required{
    height: 40px;
  }

  .addStudentPanelNameInfo input{
    margin-right: 0px;
    width: 150px;
  }
  .addStudentPanelNameInfo span[class^="wrong"]{
    margin-right: 0px;
  }
  .addStudentPanelGradesTitle {
    margin-top: 70px;
  }
  .addStudentPanelGradesContentButton{
    top: 35px;
    right: 10px
  }
  .addStudentPanelGradesContentButton button{
    font-size: 19px;
    padding: 1px 9px;
    font-weight: 300;
  }
  .addStudentPanelSummary{
    width: 100%;
    margin: 100px 0;
  }
  .confirm button{
    margin: 0 20px;
  }
}
</style>
