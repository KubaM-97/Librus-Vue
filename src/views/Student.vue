<template>

  <div class="editStudentPanel" ref="editStudentPanel">

        <div class="editStudentPanelMain">

            <div class="editStudentPanelNameTitle">
                <span>Imię i Nazwisko ucznia</span>
            </div>

            <div class="editStudentPanelNameValue">
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



            <div class="editStudentPanelGradesTitle">
                <span>Oceny</span>
            </div>

            <div class="editStudentPanelGradesValue" v-html="gradeWeightColor($route.params.marks, $route.params.weights)">

            </div>

            <div class="editStudentPanelGradesButtons">

              <button name="showEditStudentGradesPanel" @click="showEditStudentGradesPanel()"> Edytuj / Dodaj ocenę </button>

            </div>

            <div class="editStudentPanelAvgTitle">
                <span>Średnia</span>
            </div>

            <div class="editStudentPanelAvgValue">
              {{avg(this.$route.params.marks, this.$route.params.weights)}}
            </div>

            <div class="editStudentPanelThreatnessTitle">
                <span>Zagrożenie</span>
            </div>

            <div class="editStudentPanelThreatnessValue" v-html="threatness(avg(this.$route.params.marks, this.$route.params.weights))">
            </div>

        </div>
       <transition-group name="EditStudentDataPanel" mode="out-in">
         <router-view v-if="showDataEditionRouterView" :showDataEditionRouterView.sync="showDataEditionRouterView" key="1"></router-view>
         <router-view v-if="showGradesEditionRouterView" :showGradesEditionRouterView.sync="showGradesEditionRouterView" key="2"></router-view>
       </transition-group>
    </div>
</template>

<script>

//Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

import { mapGetters } from "vuex"
import MainMixins from "../assets/mixins/mixins.js"
import GradesService from "../assets/mixins/gradesMixins.js"

export default {
  name: "Student",
  data(){
    return{
      student: '',
      showDataEditionRouterView: false,
      showGradesEditionRouterView: false
    }
  },
  computed:{
    ...mapGetters(['fullNameGetters']),
    fullName(){
      return this.$store.getters.fullNameGetters(this.$route.params)
    }
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
  updated(){
    this.showTooltip(this.$refs.editStudentPanel, this.$route.params);
  },
  mixins: [MainMixins, GradesService],
  methods:{
    showEditStudentDataPanel(){
      this.pushMe("EditData")
      this.showDataEditionRouterView = true;
    },
    showEditStudentGradesPanel(){
      this.pushMe("EditGrades")
      this.showGradesEditionRouterView = true;
    }
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
    font-size: 13px;
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

.editStudentPanelNameTitle {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelNameValue {
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


.editStudentPanelGradesTitle {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelGradesValue {
    grid-row: startStudentData / startStudentDetailData;
    margin: auto;
}

.editStudentPanelGradesButtons{
    grid-row: startStudentDetailDataButton;
}


div[class^="editStudentPanelAvg"] {
    grid-column: startAvg / startThreatness;
}

.editStudentPanelAvgTitle {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelAvgValue {
    grid-row: startStudentData / startStudentDetailData;
}


div[class^="editStudentPanelThreatness"] {
    grid-column: startThreatness;
}

.editStudentPanelThreatnessTitle {
    grid-row: startTitle / startStudentData;
}

.editStudentPanelThreatnessValue {
    grid-row: startStudentData / startStudentDetailData;
}

.editStudentPanelGradesButtons{
  /* background-color: green; */
  grid-column: startGrades / startThreatness;
}


.editStudentPanelNameDetailData{
    margin: 20px 0;
    float: left;
}

.editStudentPanelNameDetailData .form-group{
    display: block;
    margin: auto;
    margin-bottom: 25px;
    padding-left: 45px;
    font-size: 11px;
}

.editStudentPanelNameDetailData .form-group span.title{
    display: inline-block;
    width: 30%;
    font-size: 12.5px;
    text-align: left;
    vertical-align: middle;
}

.editStudentPanelNameDetailData .form-group span.data{
    text-align: left;
    display: inline-block;
    width: 60%;
    margin-left: 5px;
    vertical-align: middle;
}


.editStudentPanelMain button{
    background-color: blueviolet;
    display: inline-block;
    font-size: 13px;
    color: #fff;
    border-radius: 4px;
    padding: 6px 11px;
    text-shadow: 1px 1px 1px violet;
    margin: 0 15px;
}




@media (max-width: 768px){
  .editStudentPanelMain {
      /* width: 95%; */
      text-shadow: 5px 0px 10px #00c3ff, -5px 0px 10px #00c3ff, 0px 5px 10px #00c3ff, 0px -5px 10px #00c3ff;
  }
  .editStudentPanelMain{
      font-size: 10px;
  }
  .editStudentPanelMain{
      padding: 3px;
      grid-template-rows:[startTitle]50px [startStudentData]50px [startStudentDetailData]auto [startStudentDetailDataButton]50px;
  }
  .editStudentPanelNameDetailData .form-group span.title{
    font-size: 10px;
  }
  .editStudentPanelNameDetailData .form-group{
      padding-left: 3px;
      font-size: 9px;
  }
  .editStudentPanelMain button{
      font-size: 9px;
      padding: 5px;
  }
}
</style>
