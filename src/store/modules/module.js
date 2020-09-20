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
      marks: "",
      weights: "",
      descriptions: "",
      dates: ""
  }
};

const getters = {
  specificStudent(state){
    return state.students[this.$route.params.id-1];
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
    console.log(state)
    state.students = students
  },

  addNewGradeToArray(state, payload){

    if(state.newGrades.marks == ""){
          //splits string into array
          //e.g    3 => [3]
          state.newGrades.marks = state.newGrades.marks.split("");
    }

    //places new grade in appropriate place according to the provided index
    //e.g    for second component Grade.vue:   newGrades.marks[1] = 5        newGrades.marks=[3,5]
    state.newGrades.marks[payload.index]=payload.grade;

  },
  addNewWeightToArray(state, payload){

    if(state.newGrades.weights == ""){
          //splits string into array
          //e.g    2 => [2]
          state.newGrades.weights = state.newGrades.weights.split("");
    }

    //places new grade's weight in appropriate place according to the provided index
    //e.g    for second component Grade.vue:   newGrades.weights[1] = 5        newGrades.weights=[3,5]
    state.newGrades.weights[payload.index]=payload.weight;

  },
  addNewDescriptionToArray(state, payload){

    if(state.newGrades.descriptions == ""){
          //splits string into array
          //e.g    "Kartkówka" => ["Kartkówka"]
          state.newGrades.descriptions = state.newGrades.descriptions.split("");
    }

    //places new grade's description in appropriate place according to the provided index
    //e.g    for second component Grade.vue:   newGrades.descriptions[1] = "Praca domowa"        newGrades.descriptions=["Kartkówka", "Praca domowa"]
    state.newGrades.descriptions[payload.index] = payload.description;

    //alternative description
    if((state.newGrades.descriptions[payload.index] == undefined)||(state.newGrades.descriptions[payload.index] == "")){
      state.newGrades.descriptions[payload.index] = "BRAK OPISU"
    }
  },
  addNewDateToArray(state, payload){

    if(state.newGrades.dates == ""){
          //splits string into array
          //e.g    23.08.2020 14:00:00" => [23.08.2020 14:00:00]
          state.newGrades.dates = state.newGrades.dates.split("");
    }

    //places new grade's date in appropriate place according to the provided index
    //e.g    for second component Grade.vue:   newGrades.date[1] = "23.08.2020 14:00:00"        newGrades.date=["21.08.2020 11:30:00", "23.08.2020 14:00:00"]
    state.newGrades.dates[payload.index] = payload.date;
  },

  editStudentGrade(state, payload){
    console.log(state.students[payload.StudentID-1])
    state.students[payload.StudentID-1].marks[payload.index] = payload.newValue;
    console.log(state.students[payload.StudentID-1])
  },
  editStudentWeight(state, payload){
    state.students[payload.StudentID-1].weights[payload.index] = payload.newValue;
  },
  editStudentDescription(state, payload){
    state.students[payload.StudentID-1].descriptions[payload.index] = payload.newValue;
  },

  removeGrade(state, payload){
    state.students[payload.StudentID-1].marks.splice(payload.index,1);
    state.students[payload.StudentID-1].weights.splice(payload.index,1);
    state.students[payload.StudentID-1].descriptions.splice(payload.index,1);
  },

  addNewStudentToClass(state, payload){
    const allStudents = state.students;
    allStudents[allStudents.length] = payload
    payload.id = allStudents.length;
    state.students = allStudents;
  }
};

const actions = {
  initFullClass:({commit})=>{
    axios.get("static/students.json")
    .then((response)=>{
      console.log(response.data.students);
      commit("setFullClass", response.data.students);
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
