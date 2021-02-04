import { createStore } from 'vuex'

//Vuex
import axios from 'axios'
import VueAxios from 'vue-axios'


export default createStore({
  state: {
    students: {},
    showNavpanel: true,
    showLoaderGif: false,
    newGrades:{
        marks: [],
        weights: [],
        descriptions: [],
        dates: []
    }
  },
  getters: {
    fullNameGetters() {
      return (bar) => {
        return `${bar.lastName.toUpperCase()} ${bar.firstName}`;
      }
    }
  },
  mutations: {
    changeNavpanel(state){
      state.showNavpanel = !state.showNavpanel;
    },
    changeLoaderGif(state){
      state.showLoaderGif = !state.showLoaderGif;
    },

    setFullClass(state, students){
      state.students = students
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
})
