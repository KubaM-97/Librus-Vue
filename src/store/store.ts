import Vue from 'vue'
import Vuex from 'vuex'

//Vuex
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// load Vuex
Vue.use(Vuex)



// Create store
export const store = new Vuex.Store({
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
    fullName(){
      return
    }
    // specificStudent(state){
    //   // console.log(this)
    //   // return state.students[payload];
    //   return 2
    // }
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

    addNewStudentToClass(state, payload){
        const allStudents = state.students;
        allStudents[allStudents.length] = payload
        payload.id = allStudents.length;
        state.students = allStudents;
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
  }
})
