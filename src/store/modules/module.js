import Vue from 'vue'

//Vuex
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

const state = {
  students: {},
  showNavpanel: true,
  showLoaderGif: false,
  showMainLogPanel: false,
  newGrades:{
      grades: "",
      weights: "",
      descriptions: "",
      dates: ""
  }
};

const getters = {
  newGrades(state){
    return state.newGrades.grades
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
  students(state){
    return state.students
  }
};

const mutations = {
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

    if(state.newGrades.grades == ""){
          //splits string into array
          //e.g    3 => [3]
          state.newGrades.grades = state.newGrades.grades.split("");
    }

    //places new grade in appropriate place according to the provided index
    //e.g    for second component Grade.vue:   newGrades.grades[1] = 5        newGrades.grades=[3,5]
    state.newGrades.grades[payload.placeInArray]=payload.grade;

  },
  addNewWeightToArray(state, payload){

    if(state.newGrades.weights == ""){
          //splits string into array
          //e.g    2 => [2]
          state.newGrades.weights = state.newGrades.weights.split("");
    }

    //places new grade's weight in appropriate place according to the provided index
    //e.g    for second component Grade.vue:   newGrades.weights[1] = 5        newGrades.weights=[3,5]
    state.newGrades.weights[payload.placeInArray]=payload.weight;

  },
  addNewDescriptionToArray(state, payload){
    if(state.newGrades.descriptions == ""){
          //splits string into array
          //e.g    "Kartkówka" => ["Kartkówka"]
          state.newGrades.descriptions = state.newGrades.descriptions.split("");
    }
    //places new grade's description in appropriate place according to the provided index
    //e.g    for second component Grade.vue:   newGrades.description[1] = "Praca domowa"        newGrades.description=["Kartkówka", "Praca domowa"]
    state.newGrades.descriptions[payload.placeInArray] = payload.description;
  },
  addNewDateToArray(state, payload){
    if(state.newGrades.dates == ""){
          //splits string into array
          //e.g    23.08.2020 14:00:00" => [23.08.2020 14:00:00]
          state.newGrades.dates = state.newGrades.dates.split("");
    }

    //places new grade's date in appropriate place according to the provided index
    //e.g    for second component Grade.vue:   newGrades.date[1] = "23.08.2020 14:00:00"        newGrades.description=["Kartkówka", "Praca domowa"]
    state.newGrades.dates[payload.placeInArray] = payload.date;
  },

  removeGrade(state, indexInArray){
    if(state.newGrades.grades!=""){
      for(let i=0; i<state.newGrades.grades.length; i++){
        if(i >= indexInArray){
          state.newGrades.grades[i-1]=state.newGrades.grades[i]
        }
      }
      state.newGrades.grades.pop();
    }
    if(state.newGrades.weights!=""){
    for(let i=0; i<state.newGrades.weights.length; i++){
      if(i >= indexInArray){
        state.newGrades.weights[i-1]=state.newGrades.weights[i]
      }
    }
    state.newGrades.weights.pop();
    }

    if(state.newGrades.descriptions!=""){
      for(let i=0; i<state.newGrades.descriptions.length; i++){
        if((i >= indexInArray) && (state.newGrades.descriptions[i]!=undefined)){
          state.newGrades.descriptions[i-1]=state.newGrades.descriptions[i]
        }
      }
      state.newGrades.descriptions.pop();
    }
    if((state.newGrades.grades!="")&&(state.newGrades.weights!="")&&(state.newGrades.descriptions!="")){
      state.newGrades.dates.pop();
    }
  },
  addNewStudentToClass(state, payload){
    const allStudents = state.students;
    allStudents[allStudents.length] = payload
    console.log(payload)
    payload.id = allStudents.length;
    state.students = allStudents;
  }
};

const actions = {
  initFullClass:({commit})=>{
    axios.get("static/students.json")
    .then((response)=>{
      console.log(response.data.students);
      commit("setFullClass", response.data.students)
    })
  }
};

export default{
  state,
  getters,
  mutations,
  actions
}
