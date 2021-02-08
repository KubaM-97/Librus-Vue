import { createStore } from 'vuex'

//Vuex
import axios from 'axios'
import VueAxios from 'vue-axios'


export default createStore({
  state: {
    students: {},
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
    setFullClass(state, students){
      state.students = students
    }
  },
  actions: {
    initFullClass:({commit})=>{
      axios.get("static/students.json")
      .then((response)=> commit("setFullClass", response.data.students))
    }
  },
})
