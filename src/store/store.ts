import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
  state: {
    students: {},
    showNavpanel: true,
    showLoaderGif: false,
    showMainLogPanel: false,
    newStudentGrades:{
        grades: "",
        weights: "",
        descriptions: "",
        dates: []
    }
  },
  getters:{
    newGrades(state){
      return state.newStudentGrades.grades
    },
    visibleNavpanel(state){
      return state.showNavpanel;
    },
    visibleLoaderGif(state){
      return state.showLoaderGif;
    },
    visibleMainLogPanel(state){
      return state.showMainLogPanel;
    },
    students: state=>state.students
  },
  mutations: {

    changeNavpanel(state){
      state.showNavpanel = !state.showNavpanel;
    },
    changeLoaderGif(state){
      state.showLoaderGif = !state.showLoaderGif;
    },
    changeMainLogPanel(state){
      state.showMainLogPanel = !state.showMainLogPanel;
    },

    setFullClass(state, students){
      state.students = students
    },

    addNewGradeToArray(state, payload){

      if(state.newStudentGrades.grades == ""){
            //splits string into array
            //e.g    3 => [3]
            state.newStudentGrades.grades = state.newStudentGrades.grades.split("");
      }

      //places new grade in appropriate place according to the provided index
      //e.g    for second component Grade.vue:   newStudentGrades.grades[1] = 5        newStudentGrades.grades=[3,5]
      state.newStudentGrades.grades[payload.placeInArray]=payload.grade;

    },
    addNewWeightToArray(state, payload){

      if(state.newStudentGrades.weights == ""){
            //splits string into array
            //e.g    2 => [2]
            state.newStudentGrades.weights = state.newStudentGrades.weights.split("");
      }

      //places new grade's weight in appropriate place according to the provided index
      //e.g    for second component Grade.vue:   newStudentGrades.weights[1] = 5        newStudentGrades.weights=[3,5]
      state.newStudentGrades.weights[payload.placeInArray]=payload.weight;

    },
    addNewDescriptionToArray(state, payload){

      if(state.newStudentGrades.descriptions == ""){
            //splits string into array
            //e.g    "Kartkówka" => ["Kartkówka"]
            state.newStudentGrades.descriptions = state.newStudentGrades.descriptions.split("");
      }
      //places new grade's description in appropriate place according to the provided index
      //e.g    for second component Grade.vue:   newStudentGrades.description[1] = "Praca domowa"        newStudentGrades.description=["Kartkówka", "Praca domowa"]
      state.newStudentGrades.descriptions[payload.placeInArray] = payload.description;
    },
    addNewDateToArray(state, payload){
      //places new grade's date in appropriate place according to the provided index
      //e.g    for second component Grade.vue:   newStudentGrades.date[1] = "23.08.2020 14:00:00"        newStudentGrades.description=["Kartkówka", "Praca domowa"]
      state.newStudentGrades.dates[payload.placeInArray] = payload.date;
    },

    addNewStudentToClass(state, payload){
      // alert("HEJKA")
      const allStudents = state.students;
      allStudents[allStudents.length] = payload
      payload.id = allStudents.length + 1;
      payload.lastName = "AAA";
      payload.firstName = "BBB";
      console.log(allStudents)
      // allStudents[allStudents.length-1] = this.add;
    }
  },
  actions: {
    initFullClass:({commit})=>{
      axios.get("static/students.json")
      .then((response)=>{
        console.log(response.data.students);
        commit("setFullClass", response.data.students)
      })
    }
  },
  modules: {
  }
})
