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
        descriptions: []
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
      //e.g    second component Grade.vue:   newGradesArray[1] = 5        newGradesArray=[3,5]
      state.newStudentGrades.grades.splice(payload.placeInArray,1,payload.grade);

    },
    addNewWeightToArray(state, payload){
      if(state.newStudentGrades.weights == ""){
            //splits string into array
            //e.g    3 => [3]
            state.newStudentGrades.weights = state.newStudentGrades.weights.split("");
      }

      //places new grade in appropriate place according to the provided index
      //e.g    second component Grade.vue:   newGradesArray[1] = 5        newGradesArray=[3,5]
      state.newStudentGrades.weights.splice(payload.placeInArray,1,payload.weight);
    },
    addNewDescriptionToArray(state, payload){
      state.newStudentGrades.descriptions[payload.placeInArray] = payload.description;
      // console.log(state.newGrades.descriptions)
    },
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
