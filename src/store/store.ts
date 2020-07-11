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
    newGrades:{
        grades: [],
        weights: [],
        descriptions: []
    }
  },
  getters:{
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

    addNewGrade(state, payload){
      state.newGrades.grades[payload.placeInArray] = payload.grade;
      console.log(state.newGrades.grades)
    },
    addNewWeight(state, payload){
      state.newGrades.weights[payload.placeInArray] = payload.weight;
      console.log(state.newGrades.weights)
    },
    addNewDescription(state, payload){
      state.newGrades.descriptions[payload.placeInArray] = payload.description;
      console.log(state.newGrades.descriptions)
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
