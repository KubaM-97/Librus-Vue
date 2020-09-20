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

                     <grade-component :n="n" :gradesLength.sync="gradesLength" :a.sync="a"></grade-component>

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
                                    <span class="grades" v-html="gradeWeightColor(marks, weights)">

                                    </span>
                                </td>

                                <td>
                                    <span>
                                      {{avg(marks, weights)}}
                                    </span>
                                </td>

                                <td>
                                  <span v-html="threatness(avg(marks, weights))">

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
import GradesService from "../assets/mixins.js"
import Grade from "./Grade.vue"

import { mapState, mapMutations } from "vuex"

export default {
  name: "AddStudent",
  data(){
       return{
         add: {
             id: "",
             lastName: "",
             firstName: "",
             marks: "",
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
  components: {
    "grade-component": Grade
  },
  beforeRouteLeave(to,from,next){
    const marks = this.marks
    const weights = this.weights
    const descriptions = this.descriptions

    const limit = marks.length;
    let block = false;
    for(let i=0; i<limit; i++){
      if( ((marks[i]==="") && (weights[i]!=="")) || (marks[i]!=="") && (weights[i]==="")){
        block = true;
        alert(block)
      }
    }
    if((this.confirm==false) && (
      (this.add.name == "") || (block))){
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
  updated(){
    if(this.name!=""){
      const arrName = this.name.split(" ");
      this.add.firstName = arrName[0];
      this.add.lastName = arrName[1];
    }

    for(let i=0; i<this.marks.length; i++){

      if((this.marks[i]!="")&&(this.weights[i]!="")){
        this.showTooltip(document, this);
      }
    }

  },
  beforeDestroy(){
    const store = this.$store.state.newGrades;

    store.marks = [];
    store.weights = [];
    store.descriptions = [];
    store.dates = [];
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
  mixins: [GradesService],
  methods: {
    aaa(){
      alert(56666)
    },
      //starts animation of Student's detail data
      enter(el, done){
        el.addEventListener("animationend", function(){
          el.style="";
          done();
        });
        el.style.animationName="showDetailData";
        el.style.animationDuration="1s"
      },

      //ends animation of Student's detail data
      leave(el, done){
        el.addEventListener("animationend", function(){
          el.style="";
          done();
        });
        el.style.animationName="showDetailData";
        el.style.animationDuration="1s";
        el.style.animationDirection="reverse"
      },

      //shows additional information
      additionalInfoSwitcher() {
        const spanInfoSwitcher = document.querySelector(".addStudentPanelName span.showInfo");
        this.info = !this.info;
        spanInfoSwitcher.innerHTML=="Rozwiń" ? spanInfoSwitcher.innerHTML="Zwiń" : spanInfoSwitcher.innerHTML="Rozwiń";
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


      //adds a new grade to the new student
      moreGrades() {
        this.gradesLength++;
        this.b++;
      },

      //resets addStudent Panel
      addStudentCancel() {
        const store = this.$store.state.newGrades;

        for(const whatToRemove in store){
          this.$store.state.newGrades[whatToRemove] = ""
        }

        this.name = "";

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

             //mapState
             this.add.marks = this.marks;
             this.add.weights = this.weights;
             this.add.descriptions = this.descriptions;
             this.add.dates = this.dates;

             this.addNewStudentToClass(this.add);
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
