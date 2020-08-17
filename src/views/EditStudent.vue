<template>
<div class="EditStudentPanel">
  <div class="container">

    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="firstName">Imię</label>
          <input type="text" id="firstName" v-model.lazy="this.editStudent.firstName" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
        </div>
        <div class="col-md-5">
          {{editStudent.firstName}}
        </div>
        <div class="col-md-1">
          <transition>
            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="">
            <div class="blackLayer" if="hideCheckMarkWithLayer">

            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="lastName">Nazwisko</label>
          <input type="text" id="lastName" v-model.lazy="editStudent.lastName" value="editStudent.lastName" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
        </div>
        <div class="col-md-5">
          {{editStudent.lastName}}
        </div>
        <div class="col-md-1">
          <transition>
            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="">
            <div class="blackLayer" if="hideCheckMarkWithLayer">

            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="pesel">PESEL</label>
          <input type="text" id="pesel" v-model.lazy="this.editStudent.pesel" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
        </div>
        <div class="col-md-5">
          {{editStudent.pesel}}
        </div>
        <div class="col-md-1">
          <transition>
            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="">
            <div class="blackLayer" if="hideCheckMarkWithLayer">

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

          <input type="text" v-model="editStudent.street.streetPostCode" id="PostCode" placeholder="kod pocztowy" @blur="validatorData('PostCode', '^[0-9]{2}-[0-9]{3}$', '_ _ - _ _ _')">
          <span class="wrongAdditionalInfo" id="wrongPostCode"></span>

          <input type="text" v-model="editStudent.street.streetCity" id="City" placeholder="miasto" @keyup="validatorData('City', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( (- )?[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)*$', 'Brak Cyfr i znaków specjalnych. <br />')">
          <span class="wrongAdditionalInfo" id="wrongCity"></span>
    </div>
        <div class="col-md-5">
          {{editStudent.firstName}}
        </div>
        <div class="col-md-1">
          <transition>
            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="">
            <div class="blackLayer" if="hideCheckMarkWithLayer">

            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="phone">phone</label>
          <input type="text" id="phone" v-model.lazy="this.editStudent.phone" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
        </div>
        <div class="col-md-5">
          {{editStudent.phone}}
        </div>
        <div class="col-md-1">
          <transition>
            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="">
            <div class="blackLayer" if="hideCheckMarkWithLayer">

            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label for="email">Email</label>
          <input type="text" id="email" v-model.lazy="this.editStudent.email" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
        </div>
        <div class="col-md-5">
          {{editStudent.email}}
        </div>
        <div class="col-md-1">
          <transition>
            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="">
            <div class="blackLayer" if="hideCheckMarkWithLayer">

            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label>Matka</label>
          <input type="text" v-model.lazy="this.editStudent.mother.firstName" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
          <input type="text" v-model.lazy="this.editStudent.mother.lastName" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
          <input type="text" v-model.lazy="this.editStudent.mother.phone" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
          <input type="text" v-model.lazy="this.editStudent.mother.email" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
        </div>
        <div class="col-md-5">
          {{editStudent.mother.firstName}}<br />{{editStudent.mother.lastName}}<br />{{editStudent.mother.phone}}<br />{{editStudent.mother.email}}<br />
        </div>
        <div class="col-md-1">
          <transition>
            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="">
            <div class="blackLayer" if="hideCheckMarkWithLayer">

            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-5 col-md-offset-1">
          <label>Matka</label>
          <input type="text" v-model.lazy="this.editStudent.father.firstName" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
          <input type="text" v-model.lazy="this.editStudent.father.lastName" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
          <input type="text" v-model.lazy="this.editStudent.father.phone" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
          <input type="text" v-model.lazy="this.editStudent.father.email" @blur="validatorData('Pesel', '^[0-9]{9}$', 'Dokładnie 9 cyfr')">
        </div>
        <div class="col-md-5">
          {{editStudent.father.firstName}}<br />{{editStudent.father.lastName}}<br />{{editStudent.father.phone}}<br />{{editStudent.father.email}}<br />
        </div>
        <div class="col-md-1">
          <transition>
            <img class="greenCheckMark" src="../assets/greenCheckMark.png" alt="">
            <div class="blackLayer" if="hideCheckMarkWithLayer">

            </div>
          </transition>
        </div>
      </div>
    </div>

  </div>
  <button v-if="possibleSave" @click="saveChanges()" class="btn btn-success btn-lg">Zapisz zmiany</button>
  <button v-else class="btn btn-success btn-lg" disabled>Zapisz zmiany</button>

  <button @click="closeThePanel()"><img class="closeThePanel" src="../assets/eXit.png"/></button>
</div>
</template>

<script>
export default {
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
        email: this.$route.params.phone,
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
      possibleSave: true
      // possibleDataEditionRouter: false;
    }
  },

  methods:{
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
    saveChanges(){
      this.possibleSave = false
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
  background-color: rgba(0, 0, 0, .55);
  text-align: center;
  font-size: 13px;
  position: absolute;
  top: 50%;
  align-items:center;
}
label {
    display: block;
    font-size: 15px;
}
input {
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
  top: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  -webkit-box-shadow: 2px 2px 10px 2px #d54545;
  -moz-box-shadow: 2px 2px 10px 2px #d54545;
  box-shadow: 2px 2px 10px 2px #d54545;
}
</style>
