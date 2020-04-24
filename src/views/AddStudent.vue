<template>
<div class="addStudentPanel">
        <div class="container">
          <div class="addStudentPanelMain">
             <div class="row">

               <div class="col-md-5">

                 <div class="addStudentPanelName">

                     <label for="name">*Imię i Nazwisko:
                         <span class="nameTooltip">
                             Podwójne nazwiska przy pomocy myślnika
                         </span>
                     </label>

                     <input type="text" v-model="add.name" id="name" maxlength="30">

                     <span class="required"></span>

                       Informacje dodatkowe
                       <span class="showInfo" @click="additionalInfoSwitcher">Rozwiń</span>

                 </div>

                 <div class="addStudentPanelNameInfo">

                   <div class="info" v-show="info">


                     <div class="form-group">
                       <label for="pesel">PESEL:</label>
                       <input type="text" id="Pesel" placeholder="PESEL" @keyup="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
                       <span class="wrongAdditionalInfo" id="wrongPesel"></span>
                     </div>

                     <div class="form-group">

                       <label>Adres:</label>

                       <input type="text" id="Street" placeholder="ulica" @keyup="validatorData('Street', '^[0-9a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ ]*$', 'Bez znaków specjalnych.')">
                       <span class="wrongAdditionalInfo" id="wrongStreet"></span>

                       <input type="text" id="HouseNr" placeholder="nr_domu" @keyup="validatorData('HouseNr', '^[0-9]+[a-zA-Z]?(/?[0-9]*[a-zA-Z]?)?$', 'Nr, Nr/Nr, Nr Litera <br /> np. 11 11/13 11A 11A/13B')">
                       <span class="wrongAdditionalInfo" id="wrongHouseNr"></span>

                       <input type="text" id="FlatNr" placeholder="nr_mieszkania" @keyup="validatorData('FlatNr', '^[0-9]+[a-zA-Z]?$', 'Liczba + ew.litera np.116F')">
                       <span class="wrongAdditionalInfo" id="wrongFlatNr"></span>

                       <input type="text" id="PostCode" placeholder="kod pocztowy" @blur="validatorData('PostCode', '^[0-9]{2}-[0-9]{3}$', '_ _ - _ _ _')">
                       <span class="wrongAdditionalInfo" id="wrongPostCode"></span>

                       <input type="text" id="City" placeholder="miasto" @keyup="validatorData('City', '^[A-ZĄĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( (- )?[A-ZĄĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)*$', 'Brak Cyfr i znaków specjalnych. <br />')">
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

                 </div>

               </div>

               <div class="col-md-7">
                 <div class="addStudentPanelGradesTitle">
                         <span class="addStudentGradeSubpanelTitle">Dotychczasowe oceny:</span>
                     </div>
                 <div class="container">
                   <div class="row">
                     <div class="col-md-3">
                       <div class="addStudentPanelGradesContentSingleGrade">

                           <label for="grades">Ocena:</label>

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
                     <div class="col-md-3">
                       <div class="addStudentPanelGradesContentSingleWeight">

                           <label for="weight">Waga oceny:</label>

                           <select v-model.number="add.weight" id="weight">
                               <option value=""></option>
                               <option value="1">1</option>
                               <option value="2">2</option>
                               <option value="3">3</option>
                           </select>

                       </div>

                     </div>
                     <div class="col-md-5">

                          <div class="addStudentPanelGradesContentSingleDescription">

                              <span class="descriptionCount">Pozostało: 30 znaków.</span>

                              <label>Opis oceny:

                                  <input type="text" v-model.number="add.description" class="description" maxlength="30">

                              </label>

                          </div>

                     </div>
                     <div class="col-md-1">
                       <div class="addStudentPanelGradesContentButton">

                         <button @click="addNewGrade()">
                                     +
                         </button>

                       </div>

                     </div>
                   </div>
                 </div>
                
               </div>

             </div>
          </div>
        </div>
</div>
</template>

 <!-- <template>
<div class="addStudentPanel">

    <div class="addStudentPanelMain">

        <div class="addStudentPanelName">

            <label for="name">*Imię i Nazwisko:
                <span class="nameTooltip">
                    Podwójne nazwiska przy pomocy myślnika
                </span>
            </label>

            <input type="text" v-model="add.name" id="name" maxlength="30">

            <span class="required"></span>

              Informacje dodatkowe
              <span class="showInfo" @click="additionalInfoSwitcher">Rozwiń</span>

        </div>

        <div class="addStudentPanelNameInfo">

          <div class="info" v-show="info">


            <div class="form-group">
              <label for="pesel">PESEL:</label>
              <input type="text" id="Pesel" placeholder="PESEL" @keyup="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
              <span class="wrongAdditionalInfo" id="wrongPesel"></span>
            </div>

            <div class="form-group">

              <label>Adres:</label>

              <input type="text" id="Street" placeholder="ulica" @keyup="validatorData('Street', '^[0-9a-zA-ZąćęłńóśźżĄĘŁŃÓŚŹŻ ]*$', 'Bez znaków specjalnych.')">
              <span class="wrongAdditionalInfo" id="wrongStreet"></span>

              <input type="text" id="HouseNr" placeholder="nr_domu" @keyup="validatorData('HouseNr', '^[0-9]+[a-zA-Z]?(/?[0-9]*[a-zA-Z]?)?$', 'Nr, Nr/Nr, Nr Litera <br /> np. 11 11/13 11A 11A/13B')">
              <span class="wrongAdditionalInfo" id="wrongHouseNr"></span>

              <input type="text" id="FlatNr" placeholder="nr_mieszkania" @keyup="validatorData('FlatNr', '^[0-9]+[a-zA-Z]?$', 'Liczba + ew.litera np.116F')">
              <span class="wrongAdditionalInfo" id="wrongFlatNr"></span>

              <input type="text" id="PostCode" placeholder="kod pocztowy" @blur="validatorData('PostCode', '^[0-9]{2}-[0-9]{3}$', '_ _ - _ _ _')">
              <span class="wrongAdditionalInfo" id="wrongPostCode"></span>

              <input type="text" id="City" placeholder="miasto" @keyup="validatorData('City', '^[A-ZĄĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( (- )?[A-ZĄĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)*$', 'Brak Cyfr i znaków specjalnych. <br />')">
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

        </div>

        <div class="addStudentPanelGradesTitle">
                <span class="addStudentGradeSubpanelTitle">Dotychczasowe oceny:</span>
            </div>

        <div class="addStudentPanelGradesContent">

                <div class="addStudentPanelGradesContentSingle">

                    <div class="addStudentPanelGradesContentSingleGrade">

                        <label for="grades">Ocena:</label>

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

                    <div class="addStudentPanelGradesContentSingleWeight">

                        <label for="weight">Waga oceny:</label>

                        <select v-model.number="add.weight" id="weight">
                            <option value=""></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>

                    </div>

                    <div class="addStudentPanelGradesContentSingleDescription">

                        <span class="descriptionCount">Pozostało: 30 znaków.</span>

                        <label>Opis oceny:

                            <input type="text" v-model.number="add.description" class="description" maxlength="30">

                        </label>

                    </div>

                </div>

            </div>

        <div class="addStudentPanelGradesContentButton">

          <button @click="addNewGrade()">
                      +
          </button>

        </div>

        <div class="addStudentPanelSummary">

          <table class="summary">
                    <tr>
                        <td><span v-if="add.name!==''">{{add.name | formatName}}</span></td>

                        <td>
                            <span v-if="add.grades!=='' && add.weight===''">
                                <div class="gradeWeightColor">
                                    {{add.grades}}
                                </div></span>
                            <span v-else-if="add.grades!=='' && add.weight===1">
                                <div class="gradeWeightColor gradeWeightGreen"> {{add.grades}}
                                </div></span>
                            <span v-else-if="add.grades!=='' && add.weight===2">
                                <div class="gradeWeightColor gradeWeightYellow"> {{add.grades}}
                                </div></span>
                            <span v-else-if="add.grades!=='' && add.weight===3">
                                <div class="gradeWeightColor gradeWeightRed"> {{add.grades}}
                                </div></span>
                        </td>

                        <td>
                             <span v-if="add.grades!=='' && add.weight!==''" v-model="add.avg">{{addAvg}}
                             </span>
                        </td>

                        <td>
                            <span v-if="add.avg!==''" class="fire">
                                {{addThreatness}}
                            </span>
                        </td>
                    </tr>

            </table>

        </div>

        <div class="addStudentPanelButtons">
          <button class="btn btn-danger btn-lg" @click="addStudentCancel()">Anuluj</button>
          <button class="btn btn-primary btn-lg" @click="addStudent()">Dodaj ucznia</button>
        </div>

    </div>

</div>
</template> -->

<script>
export default {
  name: "currentViewAdd",
  data(){
       return{
        add: {
                name: "",
                grades: "",
                weight: "",
                avg: "",
                description: "",
                date: "",
            },
        info: false
       }
  },
  filters: {

    //converts student's full name to correct form
    //e.g jan kowalski => KOWALSKI Jan
    formatName(name) {

      const wrongName = document.querySelector(".required");

      const reg = new RegExp("^[A-Z]?[a-z]*( [A-Z]?[a-z]*)?$");

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
        wrongName.innerHTML = "Bez cyferek i znaków specjalnych."
      }
    },

  },
  methods: {

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

      //adds a new grade to new student
      addNewGrade: function() {

          // const button = document.querySelector(".addStudentPanelGradesContentButton button");

          //tutaj docelowo content
          const panelGrades = document.querySelector(".addStudentPanelGradesContent");

          const panelSingleGrade = document.querySelector(".addStudentPanelGradesContentSingle");

          console.log(panelGrades, panelSingleGrade);

          //transforms node to string and appends it to mainSubPane
          const tmpNode = document.createElement("div");
          tmpNode.appendChild(panelSingleGrade.cloneNode(true));

          console.log(tmpNode)
          //                    button.parentNode.removeChild(button)
          const newStr = tmpNode.innerHTML;
          panelGrades.innerHTML += newStr;

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
              document.querySelector("span.required").innerHTML = "Uzupełnij imię i nazwisko"
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
    max-width: 1500px;
    margin: 100px auto;
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    background-color: rgba(0, 0, 0, .55);
    text-align: center;
    font-size: 11px;
}

.addStudentPanelMain {
    padding: 40px;
    /* display: grid; */

    grid-template-columns: [startName]4fr [startGrade]5fr [startButton]1fr;

    grid-template-rows: [startTitle]100px [startName]200px [startNameInfo]auto [startFreeSpace]100px [startFreeSpace]1fr [startSummary]100px [startButton]100px;
}

.addStudentPanelMain .addStudentPanelName {
    grid-column: startName / span 1;
    grid-row: startName / span 1;
}

.addStudentPanelMain .addStudentPanelNameInfo {
    grid-column: startName / span 1;
    grid-row: startNameInfo / span 1;
}

.addStudentPanelMain .addStudentPanelGradesTitle {
    grid-column: startGrade;
    grid-row: startTitle / startName;
    font-size: 12px;
}

.addStudentPanelMain .addStudentPanelGradesContent {
    grid-column: startGrade;
    grid-row: startName / startSummary;
}

.addStudentPanelMain .addStudentPanelSummary {
    grid-column: startName / span 2;
    grid-row: startSummary;
}

.addStudentPanelMain .addStudentPanelButtons {
    grid-column: startGrade / startButton;
    grid-row: startButton;
    margin-left: 70px;
}


.addStudentPanelMain label {
    display: block;
}

.addStudentPanelMain input {
    outline: none;
    display: block;
    margin: auto;
    margin-top: 10px;
    width: 50%;
    height: 23px;
    font-size: 0.30rem;
    text-align: center;
    background-color: black;
    border-radius: 5px;
    border: .6px solid #ddd;
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

.addStudentPanelMain select {
    color: #00c3ff;
    font-size: 18px;
    border-radius: 4px;
    margin-top: 5px;
}

.addStudentPanelMain select option {
    color: #00c3ff;
    text-align: center;
}

.addStudentPanelMain .addStudentPanelName span.nameTooltip {
    font-size: 10px;
    display: block;
}

.addStudentPanelMain .addStudentPanelName input{
  margin-bottom: 80px;
}

.addStudentPanelMain .addStudentPanelName span.showInfo {
  cursor: pointer;
  font-size: 9px;
  margin-left: 25px;
}

.addStudentPanelMain .addStudentPanelNameInfo .form-group{
  width: 70%;
  margin: 0 auto;
  display: inline-block;
}

.addStudentPanelMain .addStudentPanelNameInfo .form-group:first-child{
  margin-top: 5px;
}

.addStudentPanelMain .addStudentPanelNameInfo label{
  float: left;
  font-size: 10.5px;
  padding-left: 25px;
  margin-top: 35px;
}

.addStudentPanelMain .addStudentPanelNameInfo input{
  display: block;
  float: right;
  font-size: 9px;
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
}

.addStudentPanelMain .addStudentPanelNameInfo span[class^="wrong"]{
  font-size: 9px;
  display: block;
  width: 60%;
  float: right;
  margin-right: 30px;
  margin-top: 11px;
}


.addStudentPanelMain div[class^="addStudentPanelGradesContentSingle"] {
    margin-bottom: 20px;
    display: inline-block;
}

.addStudentPanelMain .addStudentPanelGradesContentSingleGrade {
    grid-column:
}

.addStudentPanelMain .addStudentPanelGradesContentSingleWeight {
    grid-column:
}

.addStudentPanelMain .addStudentPanelGradesContentSingleDescription {
    grid-column:
}




.addStudentPanelMain .addStudentPanelGradesContentSingleDescription span.descriptionCount {
    font-size: 12px;
}

.addStudentPanelMain .addStudentPanelGradesContentButton {
    grid-column: startButton;
    grid-row: startName;
    position: relative;
    /* position: absolute;
    right: 90px;
    top: 10px; */
}

.addStudentPanelMain .addStudentPanelGradesContentButton button {
  background-color: #00c3ff;
  color: white;
  text-shadow: -1px 0 #00c3ff, 0 1px #00c3ff, 1px 0 #00c3ff, 0 -1px #00c3ff;
  -webkit-box-shadow: inset 0px 0px 20px 12px black,  0px 0px 20px 3px black;
  -moz-box-shadow: inset 0px 0px 20px 12px black,  0px 0px 20px 3px black;
  box-shadow: inset 0px 0px 20px 12px black,  0px 0px 20px 3px black;
  border: 1px solid #00c3ff !important;
  padding: 0 15px;
  font-size: 39px;
  border-radius: 50%;
  position: absolute;
  right: 40%;
  margin-top: 50px;
}

.addStudentPanelMain .addStudentPanelGradesContentButton button:hover {
    background-color: black;
    -webkit-box-shadow: inset 0px 0px 15px 2px #00c3ff ,  0px 0px 15px 3px #00c3ff;
    -moz-box-shadow: inset 0px 0px 15px 2px #00c3ff ,  0px 0px 15px 3px #00c3ff;
    box-shadow: inset 0px 0px 15px 2px #00c3ff ,  0px 0px 15px 3px #00c3ff;
    color: black;
    border: 1px solid white !important;
}

.addStudentPanelMain .addStudentPanelSummary table.summary {
    width: 100%;
    margin-left: 30px;
}

.addStudentPanelMain .addStudentPanelSummary table.summary td {
    height: 60px;
    padding: 15px 50px;
    border: 1px solid white;
    text-align: center;
}

.addStudentPanelMain .addStudentPanelSummary table.summary td:nth-child(1),
.addStudentPanelMain .addStudentPanelSummary table.summary td:nth-child(4) {
    width: 250px;
}

.addStudentPanelMain .addStudentPanelSummary table.summary td:nth-child(2),
.addStudentPanelMain .addStudentPanelSummary table.summary td:nth-child(3) {
    width: 100px;
}

.addStudentPanelMain .addStudentPanelButtons button{
  font-size: 16px;
  height: 50px;
  margin-top: 10px;
  margin-left: 30px;
}


</style>
