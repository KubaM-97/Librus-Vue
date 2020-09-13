<template>

  <div class="editStudentPanel" ref="editStudentPanel">

        <div class="editStudentPanelMain">

            <div class="editStudentPanelName">
                <span>Imię i Nazwisko ucznia</span>
            </div>

            <div class="editStudentPanelNameStudent">
              {{fullName}}
            </div>

            <div class="editStudentPanelNameDetailData">

              <div class="form-group">
                  <span class="title">PESEL:</span>
                  <span class="data">{{$route.params.pesel}}</span>
              </div>

              <div class="form-group">
                  <span class="title">Adres:</span>
                  <span class="data">ul.{{$route.params.street.streetName}} {{$route.params.street.streetNr}} m.{{$route.params.street.streetFlat}} <br />{{$route.params.street.streetPostCode}} {{$route.params.street.streetCity}}</span>
              </div>

              <div class="form-group">
                  <span class="title">Telefon:</span>
                  <span class="data">{{$route.params.phone}}</span>
              </div>

              <div class="form-group">
                  <span class="title">Email:</span>
                  <span class="data">{{$route.params.email}}</span>
              </div>

              <div class="form-group">
                  <span class="title">Matka:</span>
                  <span class="data">{{$route.params.mother.firstName}} {{$route.params.mother.lastName}} <br /> {{$route.params.mother.phone}} <br /> {{$route.params.mother.email}} </span>
              </div>

              <div class="form-group">
                  <span class="title">Ojciec:</span>
                  <span class="data">{{$route.params.father.firstName}} {{$route.params.father.lastName}} <br /> {{$route.params.father.phone}} <br /> {{$route.params.father.email}}</span>
              </div>


            </div>

            <div class="editStudentPanelNameButtons">

              <button name="showEditStudentDataPanel" @click="showEditStudentDataPanel()"> Edytuj Dane </button>

            </div>



            <div class="editStudentPanelGrades">
                <span>Oceny</span>
            </div>

            <div class="editStudentPanelGradesStudent" v-html="gradeWeightColor($route.params.grades, $route.params.weights)">

            </div>

            <div class="editStudentPanelGradesButtons">

              <button name="showEditStudentGradesPanel" @click="showEditStudentGradesPanel()"> Edytuj / Dodaj ocenę </button>

            </div>

            <div class="editStudentPanelAvg">
                <span>Średnia</span>
            </div>

            <div class="editStudentPanelAvgAvg">
              {{avg(this.$route.params.grades, this.$route.params.weights)}}
            </div>

            <div class="editStudentPanelThreatness">
                <span>Zagrożenie</span>
            </div>

            <div class="editStudentPanelThreatnessThreatness" v-html="threatness(avg(this.$route.params.grades, this.$route.params.weights))">
            </div>

        </div>
       <transition name="EditStudentDataPanel" mode="out-in">
         <router-view v-if="showDataEditionRouterView" :showDataEditionRouterView.sync="showDataEditionRouterView"></router-view>
         <router-view v-if="showGradesEditionRouterView" :showGradesEditionRouterView.sync="showGradesEditionRouterView"></router-view>
          <!-- <router-view v-if="showDataEditionRouterView" :showDataEditionRouterView.sync="showDataEditionRouterView"/>
          <router-view v-if="showGradesEditionRouterView" :showGradesEditionRouterView.sync="showGradesEditionRouterView"/> -->
        </transition>
    </div>
</template>

<script>

//Axios
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import { mapGetters } from "vuex"
import GradesService from "../assets/mixins.js"

export default {
  data(){
    return{
      student: '',
      showDataEditionRouterView: false,
      showGradesEditionRouterView: false
    }
  },
  computed:{
    ...mapGetters([
      "fullName"
    ]),
    fullName(){
      return `${this.$route.params.lastName.toUpperCase()} ${this.$route.params.firstName}`
    }
  },
  updated(){
     this.showTooltip(this.$refs.editStudentPanel, this.$route.params);
  },
  created(){
    axios.get("/static/students.json")
    .then((response) => {
      this.student = response.data.students.filter(
        data => data.id == this.$route.params.id)[0];
    });
  },
  beforeRouteEnter (to, from, next) {
     next(vm => {
       vm.showTooltip(vm.$refs.editStudentPanel, vm.$route.params);
     })
  },
  mixins: [GradesService],
  methods:{
    showEditStudentDataPanel(){
      this.$router.push({name: "EditData", params: {
        id: this.$route.params.id,
        lastName: this.$route.params.lastName,
        firstName: this.$route.params.firstName,
        grades: this.$route.params.grades,
        weights: this.$route.params.weights,
        descriptions: this.$route.params.descriptions,
        dates: this.$route.params.dates,
        pesel: this.$route.params.pesel,
        street: this.$route.params.street,
        phone: this.$route.params.phone,
        email: this.$route.params.email,
        mother: this.$route.params.mother,
        father: this.$route.params.father
       }})
      this.showDataEditionRouterView = true;
    },
    showEditStudentGradesPanel(){
      this.$router.push({name: "EditGrades", params: {
        id: this.$route.params.id,
        lastName: this.$route.params.lastName,
        firstName: this.$route.params.firstName,
        grades: this.$route.params.grades,
        weights: this.$route.params.weights,
        descriptions: this.$route.params.descriptions,
        dates: this.$route.params.dates,
        pesel: this.$route.params.pesel,
        street: this.$route.params.street,
        phone: this.$route.params.phone,
        email: this.$route.params.email,
        mother: this.$route.params.mother,
        father: this.$route.params.father
       }})
      this.showGradesEditionRouterView = true;
    },

    //show tooltip after hovering on every grade
    showTooltip: function() {


        const gradeInDiv = this.$refs.editStudentPanel.querySelectorAll(".gradeWeightColor");

        const gradesSuperArray = [];
        const weightSuperArray = [];
        const descriptionSuperArray = [];
        const dateSuperArray = [];

        for (let j = 0; j < gradeInDiv.length; j++) {
            gradesSuperArray.push(this.$route.params.grades[j]);
            weightSuperArray.push(this.$route.params.weights[j]);
            descriptionSuperArray.push(this.$route.params.descriptions[j]);
            dateSuperArray.push(this.$route.params.dates[j]);
        }

        for (let i = 0; i < gradeInDiv.length; i++) {

            //draws tooltip after hovering
            gradeInDiv[i].addEventListener("mouseenter", function() {
                this.canvas(gradesSuperArray, weightSuperArray, descriptionSuperArray, dateSuperArray, gradeInDiv[i], i)
            }.bind(this), false);


            //destroyes tooltip after leaving
            gradeInDiv[i].addEventListener("mouseleave", function() {
                const canv = document.querySelector("canvas");
                canv.parentNode.removeChild(canv);
            });

        }
    },






  }
}

</script>


<style scoped>


.editStudentPanel {
    width: 90%;
    max-width: 1400px;
    margin: 100px auto;
    -webkit-box-shadow: 3px 3px 30px 5px #00c3ff;
    -moz-box-shadow: 3px 3px 30px 5px #00c3ff;
    box-shadow: 3px 3px 30px 5px #00c3ff;
    background-color: rgba(0, 0, 0, .55);
    text-align: center;
    position: relative;
    font-size: 15px;
}

.editStudentPanelMain{
    padding: 20px;
    display: grid;
    grid-template-columns: [startName]5fr [startGrades]5fr [startAvg]3fr [startThreatness]3fr;
    grid-template-rows:[startTitle]100px [startStudentData]100px [startStudentDetailData]auto [startStudentDetailDataButton]100px;
    align-items: center;
}


div[class^="editStudentPanelName"] {
    grid-column: startName / startGrades;
}

.editStudentPanelName {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelNameStudent {
    grid-row: startStudentData / startStudentDetailData;
}

.editStudentPanelNameDetailData {
    grid-row: startStudentDetailData / startStudentDetailDataButton;
}

.editStudentPanelNameButtons {
    grid-row: startStudentDetailDataButton;
    margin-left: 10px;
    text-align: center;
}


div[class^="editStudentPanelGrades"] {
    grid-column: startGrades / startAvg;
}

.editStudentPanelGrades {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelGradesStudent {
    grid-row: startStudentData / startStudentDetailData;
    margin: auto;
}

.editStudentPanelGradesButtons{
    grid-row: startStudentDetailDataButton;
}


div[class^="editStudentPanelAvg"] {
    grid-column: startAvg / startThreatness;
}

.editStudentPanelAvg {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelAvgAvg {
    grid-row: startStudentData / startStudentDetailData;
}


div[class^="editStudentPanelThreatness"] {
    grid-column: startThreatness;
}

.editStudentPanelThreatness {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelThreatnessThreatness {
    grid-row: startStudentData / startStudentDetailData;
}



.editStudentPanelNameDetailData{
    margin: 20px 0;
    font-size: 15px;
    float: left;
}

.editStudentPanelNameDetailData .form-group{
    display: block;
    margin: auto;
    margin-bottom: 25px;
    padding-left: 45px;
    font-size: 12px;
}

.editStudentPanelNameDetailData .form-group span.title{
    float: left;
    display: inline-block;
    width: 30%;
    text-align: left;
}

.editStudentPanelNameDetailData .form-group span.data{
    text-align: left;
    display: inline-block;
    width: 60%;
}


.editStudentPanelMain button{
    background-color: blueviolet;
    display: inline-block;
    font-size: 14px;
    color: #fff;
    border-radius: 4px;
    padding: 6px 11px;
    text-shadow: 1px 1px 1px violet;
    margin: 0 15px;
}




@media (max-width: 768px){
  .editStudentPanel {
      width: 95%;
  }
  .editStudentPanelMain{
      font-size: 11px;
  }
  .editStudentPanelMain{
      padding:  3px;
      grid-template-rows:[startTitle]50px [startStudentData]50px [startStudentDetailData]auto [startStudentDetailDataButton]50px;
  }
  .editStudentPanelNameDetailData {
      margin-bottom: 0
  }
  .editStudentPanelNameDetailData .form-group{
      padding-left: 3px;
      font-size: 8px;
  }
  .editStudentPanelMain button{
      font-size: 9px;
      padding: 5px;
  }
}
</style>
