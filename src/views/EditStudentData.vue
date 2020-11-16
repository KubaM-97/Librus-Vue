<template>

  <div class="ourStudentPanel" ref="editDataPanel">
    <div class="container">
       <form action="#" enctype="application/x-www-form-urlencoded" method="get">
          <div class="form-group">
            <div class="row">
              <div class="col-10">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 offset-md-2">
                      <label for="FirstName">Imię</label>
                      <input name="#" type="text" autocomplete="off" id="FirstName" v-model="ourStudent.firstName" @keyup="validatorData('FirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Anna Maria')">
                      <span class="wrongAdditionalInfo" id="wrongFirstName"></span>
                    </div>
                    <div class="col-md-4">
                      {{ourStudent.firstName}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2" v-if="showGreenCheckMark.firstName">
                <img class="greenCheckMark" src="../assets/images/greenCheckMark.png" alt="green check mark">
                <transition name="showGreenMark">
                  <div class="blackLayer" v-if="hideCheckMarkWithLayer.firstName" key="1">

                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-10">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 offset-md-2">
                      <label for="LastName">Nazwisko</label>
                      <input name="#" type="text" autocomplete="off" id="LastName" v-model="ourStudent.lastName" @keyup="validatorData('LastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')">
                      <span class="wrongAdditionalInfo" id="wrongLastName"></span>
                    </div>
                    <div class="col-md-4">
                      {{ourStudent.lastName}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2" v-if="showGreenCheckMark.lastName">
                  <img class="greenCheckMark" src="../assets/images/greenCheckMark.png" alt="green check mark">
                  <transition name="showGreenMark">
                    <div class="blackLayer" v-if="hideCheckMarkWithLayer.lastName" key="2">

                    </div>
                  </transition>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-10">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 offset-md-2">
                      <label for="Pesel">PESEL</label>
                      <input name="#" type="text" autocomplete="off" id="Pesel" v-model="ourStudent.pesel" @keyup="validatorData('Pesel', '^[0-9]{11}$', 'Dokładnie 11 cyfr')">
                      <span class="wrongAdditionalInfo" id="wrongPesel"></span>
                    </div>
                    <div class="col-md-4">
                      {{ourStudent.pesel}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2" v-if="showGreenCheckMark.pesel">
                  <img class="greenCheckMark" src="../assets/images/greenCheckMark.png" alt="green check mark">
                  <transition name="showGreenMark">
                    <div class="blackLayer" v-if="hideCheckMarkWithLayer.pesel" key="3">

                    </div>
                  </transition>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-10">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 offset-md-2">
                      <label>Adres:</label>

                      <input name="#" type="text" autocomplete="off" v-model="ourStudent.street.streetName" id="Street" placeholder="ulica" @keyup="validatorData('Street', '^[0-9a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ ]*$', 'Bez znaków specjalnych.')">
                      <span class="wrongAdditionalInfo" id="wrongStreet"></span>

                      <input name="#" type="text" autocomplete="off" v-model="ourStudent.street.streetNr" id="HouseNr" placeholder="nr_domu" @keyup="validatorData('HouseNr', '^[0-9]+[a-zA-Z]?(/?[0-9]*[a-zA-Z]?)?$', 'Nr, Nr/Nr, Nr Litera <br /> np. 11 11/13 11A')">
                      <span class="wrongAdditionalInfo" id="wrongHouseNr"></span>

                      <input name="#" type="text" autocomplete="off" v-model="ourStudent.street.streetFlat" id="FlatNr" placeholder="nr_mieszkania" @keyup="validatorData('FlatNr', '^[0-9]+[a-zA-Z]?$', 'Liczba + ew.litera np.116F')">
                      <span class="wrongAdditionalInfo" id="wrongFlatNr"></span>

                      <input name="#" type="text" autocomplete="off" v-model="ourStudent.street.streetPostCode" id="PostCode" placeholder="kod pocztowy" @keyup="validatorData('PostCode', '^[0-9]{2}-[0-9]{3}$', '_ _ - _ _ _')">
                      <span class="wrongAdditionalInfo" id="wrongPostCode"></span>

                      <input name="#" type="text" autocomplete="off" v-model="ourStudent.street.streetCity" id="City" placeholder="miasto" @keyup="validatorData('City', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( (- )?[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)*$', 'Brak Cyfr i znaków specjalnych. <br />')">
                      <span class="wrongAdditionalInfo" id="wrongCity"></span>
                    </div>
                    <div class="col-md-4">
                      ul.{{ourStudent.street.streetName}} {{ourStudent.street.streetNr}} m.{{ourStudent.street.streetFlat}} <br />  {{ourStudent.street.streetPostCode}} {{ourStudent.street.streetCity}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2" v-if="showGreenCheckMark.street">
                  <img class="greenCheckMark" src="../assets/images/greenCheckMark.png" alt="green check mark">
                  <transition name="showGreenMark">
                    <div class="blackLayer" v-if="hideCheckMarkWithLayer.street" key="4">

                    </div>
                  </transition>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-10">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 offset-md-2">
                      <label for="Phone">Telefon</label>
                      <input name="#" type="text" autocomplete="off" id="Phone" v-model="ourStudent.phone" @keyup="validatorData('Phone', '^([0-9]{7}|[0-9]{9})$', 'Dokładnie 7 lub 9 cyfr.')">
                      <span class="wrongAdditionalInfo" id="wrongPhone"></span>
                    </div>
                    <div class="col-md-4">
                      {{ourStudent.phone}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2" v-if="showGreenCheckMark.phone">
                  <img class="greenCheckMark" src="../assets/images/greenCheckMark.png" alt="green check mark">
                  <transition name="showGreenMark">
                    <div class="blackLayer" v-if="hideCheckMarkWithLayer.phone" key="5">

                    </div>
                  </transition>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-10">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 offset-md-2">
                      <label for="Email">Email</label>
                      <input name="#" type="text" autocomplete="off" id="Email" v-model="ourStudent.email" @keyup="validatorData('Email', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
                      <span class="wrongAdditionalInfo" id="wrongEmail"></span>
                    </div>
                    <div class="col-md-4">
                      {{ourStudent.email}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2" v-if="showGreenCheckMark.email">
                  <img class="greenCheckMark" src="../assets/images/greenCheckMark.png" alt="green check mark">
                  <transition name="showGreenMark">
                    <div class="blackLayer" v-if="hideCheckMarkWithLayer.email" key="6">

                    </div>
                  </transition>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row">
              <div class="col-10">
                <div class="container">
                  <div class="row">
                    <div class="col-md-6 offset-md-2">
                      <label>Matka</label>
                      <input name="#" type="text" autocomplete="off" id="MothersFirstName" v-model="ourStudent.mother.firstName" @keyup="validatorData('MothersFirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Anna Maria')">
                      <span class="wrongAdditionalInfo" id="wrongMothersFirstName"></span>

                      <input name="#" type="text" autocomplete="off" id="MothersLastName" v-model="ourStudent.mother.lastName" @keyup="validatorData('MothersLastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')">
                      <span class="wrongAdditionalInfo" id="wrongMothersLastName"></span>

                      <input name="#" type="text" autocomplete="off" id="Mothersphone" v-model="ourStudent.mother.phone" @keyup="validatorData('Mothersphone', '^[0-9]{7}([0-9]{2})?$', 'Dokładnie 7 lub 9 cyfr.')">
                      <span class="wrongAdditionalInfo" id="wrongMothersphone"></span>

                      <input name="#" type="text" autocomplete="off" id="MothersEmail" v-model="ourStudent.mother.email" @keyup="validatorData('MothersEmail', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
                      <span class="wrongAdditionalInfo" id="wrongMothersEmail"></span>

                    </div>
                    <div class="col-md-4">
                      {{ourStudent.mother.firstName}}<br />{{ourStudent.mother.lastName}}<br />{{ourStudent.mother.phone}}<br />{{ourStudent.mother.email}}<br />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2" v-if="showGreenCheckMark.mother">
                  <img class="greenCheckMark" src="../assets/images/greenCheckMark.png" alt="green check mark">
                  <transition name="showGreenMark">
                    <div class="blackLayer" v-if="hideCheckMarkWithLayer.mother" key="7">

                    </div>
                  </transition>
              </div>
            </div>
          </div>
          <div class="form-group">
        <div class="row">
          <div class="col-10">
            <div class="container">
              <div class="row">
                <div class="col-md-6 offset-md-2">
                  <label>Ojciec</label>
                  <input name="#" type="text" autocomplete="off" id="FathersFirstName" v-model="ourStudent.father.firstName" @keyup="validatorData('FathersFirstName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*( [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br /> Możliwe drugie imię <br />np. Jan Maria')">
                  <span class="wrongAdditionalInfo" id="wrongFathersFirstName"></span>

                  <input name="#" type="text" autocomplete="off" id="FathersLastName" v-model="ourStudent.father.lastName" @keyup="validatorData('FathersLastName', '^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*(-[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]*)?$', 'Brak cyfr i znaków specjalnych. <br /><br />Możliwe drugie nazwisko po myślniku <br />np. Ćwierć-Parzącha')">
                  <span class="wrongAdditionalInfo" id="wrongFathersLastName"></span>

                  <input name="#" type="text" autocomplete="off" id="Fathersphone" v-model="ourStudent.father.phone" @keyup="validatorData('Fathersphone', '^[0-9]{7}([0-9]{2})?$', 'Dokładnie 7 lub 9 cyfr.')">
                  <span class="wrongAdditionalInfo" id="wrongFathersphone"></span>

                  <input name="#" type="text" autocomplete="off" id="FathersEmail" v-model="ourStudent.father.email" @keyup="validatorData('FathersEmail', '^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-]+\.[a-z]+$', 'nazwa@domena.pl')">
                  <span class="wrongAdditionalInfo" id="wrongFathersEmail"></span>

                </div>
                <div class="col-md-4">
                  {{ourStudent.father.firstName}}<br />{{ourStudent.father.lastName}}<br />{{ourStudent.father.phone}}<br />{{ourStudent.father.email}}<br />
                </div>
              </div>
            </div>
          </div>
          <div class="col-2" v-if="showGreenCheckMark.father">
              <img class="greenCheckMark" src="../assets/images/greenCheckMark.png" alt="green check mark">
              <transition name="showGreenMark">
                <div class="blackLayer" v-if="hideCheckMarkWithLayer.father" key="8">

                </div>
              </transition>
          </div>
        </div>
      </div>
      </form>
      <button name="possibleSaveData" v-if="possibleSave" @click="saveChanges(ourStudent)" class="btn btn-success btn-lg save">Zapisz zmiany</button>
      <button name="impossibleSaveData" v-else class="btn btn-success btn-lg save" disabled>Zapisz zmiany</button>
    </div>

    <button name="closeTheDataPanel" @click="closeThePanel()"><img class="closeThePanel" src="../assets/images/eXit.png"/></button>

  </div>

</template>

<script>
import MainMixins from "../assets/mixins/mixins.js"
import GradesService from "../assets/mixins/gradesMixins.js"

export default {
  name: 'EditData',
  data(){
    return{
      ourStudent:{
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

      showGreenCheckMark:{
        firstName: false,
        lastName: false,
        pesel: false,
        street: false,
        phone: false,
        email: false,
        mother: false,
        father: false
      },

      hideCheckMarkWithLayer:{
        firstName: true,
        lastName: true,
        pesel: true,
        street: true,
        phone: true,
        email: true,
        mother: true,
        father: true
      },

      possibleSave: true
    }
  },
  props:["showDataEditionRouterView"],
  mixins: [MainMixins, GradesService],
  methods:{


    closeThePanel(){
      this.pushMe("Student")
      this.$emit("update:showDataEditionRouterView", false)
    }

  }
}
</script>

<style lang="css" scoped>
div.ourStudentPanel{
  width: 90%;
  max-width: 1400px;
  margin: 100px auto;
  -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
  -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
  box-shadow: 3px 3px 30px 5px #00c3ff;
  background-color: rgba(0, 0, 0, 1);
  text-align: center;
  font-size: 13px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -47%);
  padding: 70px 0 40px;
}
.row div[class^="col"]{
  display: grid;
  align-content: center
}
label {
    display: block;
    font-size: 12px;
    margin-bottom: 0;
}
input {
    outline: none;
    display: block;
    margin: 5px auto;
    width: 65%;
    font-size: 12px;
    text-align: center;
    background-color: black;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    text-shadow: none;
}
img.greenCheckMark{
  width: 27px;
  height: 27px;
  margin: auto;
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
button.save[disabled]{
  background-color: red;
  cursor: not-allowed;
}
div.blackLayer{
  background-color: black;
  width: 150%;
  height: 100%;
  position: absolute;
  top: -20px;
  right: 0;
}
@media (max-width: 768px){
  div.ourStudentPanel{
    top: 95%;
  }
  .row div[class^="col"]{
    display: grid;
    align-content: center
  }

  span.wrongAdditionalInfo{
    font-size: 10px;
  }
  img.greenCheckMark{
    width: 22px;
    height: 22px;
  }
  button.save{
    font-size: 11px;
  }
  img.closeThePanel{
    width: 30px;
    height: 30px;
  }
}
@media (max-width: 500px){
  input{
    width: 100%;
  }
}
</style>
