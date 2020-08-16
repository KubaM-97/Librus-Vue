//Vuex
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

const state = {
  students: {},
  showNavpanel: true,
  showLoaderGif: false,
  showMainLogPanel: false,
  newStudentGrades:{
      grades: "",
      weights: "",
      descriptions: "",
      dates: ""
  }
};

const getters = {
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
    if(state.newStudentGrades.dates == ""){
          //splits string into array
          //e.g    23.08.2020 14:00:00" => [23.08.2020 14:00:00]
          state.newStudentGrades.dates = state.newStudentGrades.dates.split("");
    }

    //places new grade's date in appropriate place according to the provided index
    //e.g    for second component Grade.vue:   newStudentGrades.date[1] = "23.08.2020 14:00:00"        newStudentGrades.description=["Kartkówka", "Praca domowa"]
    state.newStudentGrades.dates[payload.placeInArray] = payload.date;
  },

  removeGrade(state, indexInArray){
    if(state.newStudentGrades.grades!=""){
      for(let i=0; i<state.newStudentGrades.grades.length; i++){
        if(i >= indexInArray){
          state.newStudentGrades.grades[i-1]=state.newStudentGrades.grades[i]
        }
      }
      state.newStudentGrades.grades.pop();
    }
    if(state.newStudentGrades.weights!=""){
    for(let i=0; i<state.newStudentGrades.weights.length; i++){
      if(i >= indexInArray){
        state.newStudentGrades.weights[i-1]=state.newStudentGrades.weights[i]
      }
    }
    state.newStudentGrades.weights.pop();
    }

    if(state.newStudentGrades.descriptions!=""){
      for(let i=0; i<state.newStudentGrades.descriptions.length; i++){
        if((i >= indexInArray) && (state.newStudentGrades.descriptions[i]!=undefined)){
          state.newStudentGrades.descriptions[i-1]=state.newStudentGrades.descriptions[i]
        }
      }
      state.newStudentGrades.descriptions.pop();
    }
    if((state.newStudentGrades.grades!="")&&(state.newStudentGrades.weights!="")&&(state.newStudentGrades.descriptions!="")){
      state.newStudentGrades.dates.pop();
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
