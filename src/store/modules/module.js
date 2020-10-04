import Vue from 'vue'
import Vuex from 'vuex'

//Vuex
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

// load Vuex
Vue.use(Vuex)

const state = {
  students: {},
  showNavpanel: true,
  showLoaderGif: false,
  newGrades:{
      marks: [],
      weights: [],
      descriptions: [],
      dates: []
  }
};

const getters = {
  fullNameGetters() {
    return (bar) => {
      return `${bar.lastName.toUpperCase()} ${bar.firstName}`;
    }
  }
};

const mutations = {
  changeNavpanel(state){
    state.showNavpanel = !state.showNavpanel;
  },
  changeLoaderGif(state){
    state.showLoaderGif = !state.showLoaderGif;
  },

  async setFullClass(state, students){
    state.students = students
  }
};

const actions = {
  async initFullClass({commit}) {
    axios.get("static/students.json")
    .then((response)=>{
      console.log(response.data.students);
      commit("setFullClass", response.data.students)
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
