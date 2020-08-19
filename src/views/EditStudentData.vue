<template>
<div class="EditStudentPanel" ref="editDataPanel">
  <div class="container">

    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="FirstName">Imię</label>
          <input type="text" id="FirstName" v-model.lazy="editStudent.firstName" @keyup="validatorData('FirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Anna Maria')">
          <span class="wrongAdditionalInfo" id="wrongFirstName"></span>
        </div>
        <div class="col-md-5">
          {{editStudent.firstName}}
        </div>
        <div class="col-md-1" v-if="showGreenCheckMarkFirstName">

            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="green check mark">
            <transition name="bayern">
              <div class="blackLayer" v-if="hideCheckMarkWithLayerFirstName" key=1>

              </div>
            </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="LastName">Nazwisko</label>
          <input type="text" id="LastName" v-model.lazy="editStudent.lastName" @keyup="validatorData('LastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')">
          <span class="wrongAdditionalInfo" id="wrongLastName"></span>
        </div>
        <div class="col-md-5">
          {{editStudent.lastName}}
        </div>
        <div class="col-md-1" v-if="showGreenCheckMarkLastName">

            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="green check mark">
            <transition name="bayern">
              <div class="blackLayer" v-if="hideCheckMarkWithLayerLastName">

              </div>
            </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="Pesel">PESEL</label>
          <input type="text" id="Pesel" v-model.lazy="editStudent.pesel" @keyup="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
          <span class="wrongAdditionalInfo" id="wrongPesel"></span>
        </div>
        <div class="col-md-5">
          {{editStudent.pesel}}
        </div>
        <div class="col-md-1" v-if="showGreenCheckMarkPesel">

            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="green check mark">
            <transition name="bayern">
              <div class="blackLayer" v-if="hideCheckMarkWithLayerPesel">

              </div>
            </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label>Adres:</label>

          <input type="text" v-model="editStudent.street.streetName" id="Street" placeholder="ulica" @keyup="validatorData('Street', '^[0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]*$', 'Bez znaków specjalnych.')">
          <span class="wrongAdditionalInfo" id="wrongStreet"></span>

          <input type="text" v-model="editStudent.street.streetNr" id="HouseNr" placeholder="nr_domu" @keyup="validatorData('HouseNr', '^[0-9]+[a-zA-Z]?(/?[0-9]*[a-zA-Z]?)?$', 'Nr, Nr/Nr, Nr Litera <br /> np. 11 11/13 11A 11A/13B')">
          <span class="wrongAdditionalInfo" id="wrongHouseNr"></span>

          <input type="text" v-model="editStudent.street.streetFlat" id="FlatNr" placeholder="nr_mieszkania" @keyup="validatorData('FlatNr', '^[0-9]+[a-zA-Z]?$', 'Liczba + ew.litera np.116F')">
          <span class="wrongAdditionalInfo" id="wrongFlatNr"></span>

          <input type="text" v-model="editStudent.street.streetPostCode" id="PostCode" placeholder="kod pocztowy" @keyup="validatorData('PostCode', '^[0-9]{2}-[0-9]{3}$', '_ _ - _ _ _')">
          <span class="wrongAdditionalInfo" id="wrongPostCode"></span>

          <input type="text" v-model="editStudent.street.streetCity" id="City" placeholder="miasto" @keyup="validatorData('City', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( (- )?[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)*$', 'Brak Cyfr i znaków specjalnych. <br />')">
          <span class="wrongAdditionalInfo" id="wrongCity"></span>
        </div>
        <div class="col-md-5">
          ul.{{editStudent.street.streetName}} {{editStudent.street.streetNr}} m.{{editStudent.street.streetFlat}} <br />  {{editStudent.street.streetPostCode}} {{editStudent.street.streetCity}}
        </div>
        <div class="col-md-1" v-if="showGreenCheckMarkStreet">

            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="green check mark">
            <transition name="bayern">
              <div class="blackLayer" v-if="hideCheckMarkWithLayerStreet">

              </div>
            </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="Telephone">Telefon</label>
          <input type="text" id="Telephone" v-model.lazy="editStudent.phone" @keyup="validatorData('Telephone', '^([0-9]{7}|[0-9]{9})$', 'Dokładnie 7 lub 9 cyfr.')">
          <span class="wrongAdditionalInfo" id="wrongTelephone"></span>
        </div>
        <div class="col-md-5">
          {{editStudent.phone}}
        </div>
        <div class="col-md-1" v-if="showGreenCheckMarkTelephone">

            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="green check mark">
            <transition name="bayern">
              <div class="blackLayer" v-if="hideCheckMarkWithLayerTelephone">

              </div>
            </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="Email">Email</label>
          <input type="text" id="Email" v-model.lazy="editStudent.email" @keyup="validatorData('Email', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
          <span class="wrongAdditionalInfo" id="wrongEmail"></span>
        </div>
        <div class="col-md-5">
          {{editStudent.email}}
        </div>
        <div class="col-md-1" v-if="showGreenCheckMarkEmail">

            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="green check mark">
            <transition name="bayern">
              <div class="blackLayer" v-if="hideCheckMarkWithLayerEmail">

              </div>
            </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label>Matka</label>
          <input type="text" id="MothersFirstName" v-model.lazy="editStudent.mother.firstName" @keyup="validatorData('MothersFirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Anna Maria')">
          <span class="wrongAdditionalInfo" id="wrongMothersFirstName"></span>

          <input type="text" id="MothersLastName" v-model.lazy="editStudent.mother.lastName" @keyup="validatorData('MothersLastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')">
          <span class="wrongAdditionalInfo" id="wrongMothersLastName"></span>

          <input type="text" id="MothersTelephone" v-model.lazy="editStudent.mother.phone" @keyup="validatorData('MothersTelephone', '^[0-9]{7}([0-9]{2})?$', 'Dokładnie 7 lub 9 cyfr.')">
          <span class="wrongAdditionalInfo" id="wrongMothersTelephone"></span>

          <input type="text" id="MothersEmail" v-model.lazy="editStudent.mother.email" @keyup="validatorData('MothersEmail', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
          <span class="wrongAdditionalInfo" id="wrongMothersEmail"></span>

        </div>
        <div class="col-md-5">
          {{editStudent.mother.firstName}}<br />{{editStudent.mother.lastName}}<br />{{editStudent.mother.phone}}<br />{{editStudent.mother.email}}<br />
        </div>
        <div class="col-md-1" v-if="showGreenCheckMarkMother">

            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="green check mark">
            <transition name="bayern">
              <div class="blackLayer" v-if="hideCheckMarkWithLayerMother">

              </div>
            </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label>Ojciec</label>
          <input type="text" id="FathersFirstName" v-model.lazy="editStudent.father.firstName" @keyup="validatorData('FathersFirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Jan Maria')">
          <span class="wrongAdditionalInfo" id="wrongFathersFirstName"></span>

          <input type="text" id="FathersLastName" v-model.lazy="editStudent.father.lastName" @keyup="validatorData('FathersLastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')">
          <span class="wrongAdditionalInfo" id="wrongFathersLastName"></span>

          <input type="text" id="FathersTelephone" v-model.lazy="editStudent.father.phone" @keyup="validatorData('FathersTelephone', '^[0-9]{7}([0-9]{2})?$', 'Dokładnie 7 lub 9 cyfr.')">
          <span class="wrongAdditionalInfo" id="wrongFathersTelephone"></span>

          <input type="text" id="FathersEmail" v-model.lazy="editStudent.father.email" @keyup="validatorData('FathersEmail', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
          <span class="wrongAdditionalInfo" id="wrongFathersEmail"></span>

        </div>
        <div class="col-md-5">
          {{editStudent.father.firstName}}<br />{{editStudent.father.lastName}}<br />{{editStudent.father.phone}}<br />{{editStudent.father.email}}<br />
        </div>
        <div class="col-md-1" v-if="showGreenCheckMarkFather">

            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="green check mark">
            <transition name="bayern">
              <div class="blackLayer" v-if="hideCheckMarkWithLayerFather">

              </div>
            </transition>
        </div>
      </div>
    </div>
    <button v-if="possibleSave" @click="saveChanges()" class="btn btn-success btn-lg save">Zapisz zmiany</button>
    <button v-else class="btn btn-success btn-lg save" disabled>Zapisz zmiany</button>
  </div>


  <button @click="closeThePanel()"><img class="closeThePanel" src="../assets/eXit.png"/></button>
</div>
</template>

<script>
//CSS
require("../assets/animations.css");
export default {
  name:"EditData",
  data(){
    return{
      editStudent:{
        firstName: this.$route.params.firstName,
        lastName: this.$route.params.lastName,
        pesel: this.$route.params.pesel,
        street: {
            streetName: this.$route.params.street.streetName,
            streetNr: this.$route.params.street.streetNr,
            streetFlat: this.$route.params.street.streetFlat,
            streetPostCode: this.$route.params.street.streetPostCode,
            streetCity: this.$route.params.street.streetCity,
        },
        phone: this.$route.params.phone,
        email: this.$route.params.email,
        mother: {
            firstName: this.$route.params.mother.firstName,
            lastName: this.$route.params.mother.lastName,
            phone: this.$route.params.mother.phone,
            email: this.$route.params.mother.email,
        },
        father: {
            firstName: this.$route.params.father.firstName,
            lastName: this.$route.params.father.lastName,
            phone: this.$route.params.father.phone,
            email: this.$route.params.father.email
        }
      },

      showGreenCheckMarkFirstName: false,
      showGreenCheckMarkLastName: false,
      showGreenCheckMarkPesel: false,
      showGreenCheckMarkStreet: false,
      showGreenCheckMarkTelephone: false,
      showGreenCheckMarkEmail: false,
      showGreenCheckMarkMother: false,
      showGreenCheckMarkFather: false,

      hideCheckMarkWithLayerFirstName: true,
      hideCheckMarkWithLayerLastName: true,
      hideCheckMarkWithLayerPesel: true,
      hideCheckMarkWithLayerStreet: true,
      hideCheckMarkWithLayerTelephone: true,
      hideCheckMarkWithLayerEmail: true,
      hideCheckMarkWithLayerMother: true,
      hideCheckMarkWithLayerFather: true,

      possibleSave: true
      // possibleDataEditionRouter: false;
    }
  },
  props:["showDataEditionRouterView"],
  methods:{
    //regular expressions
    validatorData: function(Data, RegularExpression, Format) {

      //gets inserted value
      const insertedData = this.$refs.editDataPanel.querySelector("#"+Data).value;
      //gets regular expression
      const reg = new RegExp(RegularExpression);
      const span = this.$refs.editDataPanel.querySelector("#wrong"+Data);
      if((insertedData !== '') && (reg.test(insertedData)==false)){
        span.innerHTML = `Podaj prawidłowy format :
        <br /> ${Format}`;
      }
      else{
        span.innerHTML = ``;
      }
      this.possibleSave = true;
    },
    saveChanges(){

      const old = this.$route.params;

      if(old.firstName!=this.editStudent.firstName){
        old.firstName = this.editStudent.firstName;
        this.showGreenCheckMarkFirstName = true;
        setTimeout(()=>{this.hideCheckMarkWithLayerFirstName = false},1)
      }
      if(old.lastName!=this.editStudent.lastName){
        old.lastName = this.editStudent.lastName;
        this.showGreenCheckMarkLastName = true;
        setTimeout(()=>{this.hideCheckMarkWithLayerLastName = false},1)
      }
      if(old.pesel!=this.editStudent.pesel){
        old.pesel = this.editStudent.pesel;
        this.showGreenCheckMarkPesel = true;
        setTimeout(()=>{this.hideCheckMarkWithLayerPesel = false},1)
      }
      if((old.street.streetName!=this.editStudent.street.streetName)||(old.street.streetNr!=this.editStudent.street.streetNr)||(old.street.streetFlat!=this.editStudent.street.streetFlat)||(old.street.streetPostCode!=this.editStudent.street.streetPostCode)||(old.street.streetCity!=this.editStudent.street.streetCity)){
        old.street = this.editStudent.street;
        this.showGreenCheckMarkStreet = true;
        setTimeout(()=>{this.hideCheckMarkWithLayerStreet = false},1)
      }
      if(old.email!=this.editStudent.email){
        old.email = this.editStudent.email;
        this.showGreenCheckMarkEmail = true;
        setTimeout(()=>{this.hideCheckMarkWithLayerEmail = false},1)
      }
      if(old.telephone!=this.editStudent.telephone){
        old.telephone = this.editStudent.telephone;
        this.showGreenCheckMarkTelephone = true;
        setTimeout(()=>{this.hideCheckMarkWithLayerTelephonee = false},1)
      }
      if((old.mother.firstName!=this.editStudent.mother.firstName)||(old.mother.lastName!=this.editStudent.mother.lastName)||(old.mother.phone!=this.editStudent.mother.phone)||(old.mother.email!=this.editStudent.mother.email)){
        old.mother = this.editStudent.mother;
        this.showGreenCheckMarkMother = true;
        setTimeout(()=>{this.hideCheckMarkWithLayerMother = false},1)
      }
      if((old.father.firstName!=this.editStudent.father.firstName)||(old.father.lastName!=this.editStudent.father.lastName)||(old.father.phone!=this.editStudent.father.phone)||(old.father.email!=this.editStudent.father.email)){
        old.father = this.editStudent.father;
        this.showGreenCheckMarkFather = true;
        setTimeout(()=>{this.hideCheckMarkWithLayerFather = false},1)
      }

      this.possibleSave = false;
    },

    closeThePanel(){
      this.$emit("update:showDataEditionRouterView", false)
    }



  }
}
</script>

<style lang="css" scoped>
div.EditStudentPanel{
  width: 90%;
  max-width: 1400px;
  margin: 100px auto;
  -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
  -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
  box-shadow: 3px 3px 30px 5px #00c3ff;
  background-color: rgba(0, 0, 0, 1);
  text-align: center;
  font-size: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -47%);
  padding: 70px 0 40px;
}
.col-md-5, .col-md-1{
  display: grid;
  align-content: center
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
    width: 65%;
    height: 23px;
    font-size: 14px;
    text-align: center;
    background-color: black;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    text-shadow: none;
}
img.greenCheckMark{
  width: 32px;
  height: 32px;
  -webkit-box-shadow: 2px 2px 10px 2px #199c05;
  -moz-box-shadow: 2px 2px 10px 2px #199c05;
  box-shadow: 2px 2px 10px 2px #199c05;
  opacity: 0.8;
}
img.closeThePanel{
  position: absolute;
  top: -10px;
  right: -10px;
  width: 40px;
  height: 40px;
  -webkit-box-shadow: 2px 2px 10px 2px #d54545;
  -moz-box-shadow: 2px 2px 10px 2px #d54545;
  box-shadow: 2px 2px 10px 2px #d54545;
  border-radius: 50px;
}
button.save{
  font-size: 15px;
  padding: 8px 12px;
  opacity: 1;
  float: right;
}
div.blackLayer{
  background-color: black;
  width: 150%;
  height: 150%;
  position: absolute;
  top: -20px;
  right: 0;
}
/* .bayern-leave-active, .bayern-enter-active, .bayern-leave-to, .bayern-enter-to, .bayern-leave, .bayern-enter{
  animation: showCheckMarka 2s linear;
} */
</style>
