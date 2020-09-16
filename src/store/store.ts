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
    showMainLogPanel: false,
    newGrades:{
        grades: [],
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

    addNewGradeToArray(state, payload){

      // if(state.newGrades.grades == ""){  alert("TTT")
      //       //splits string into array
      //       //e.g    3 => [3]
      //       state.newGrades.grades = state.newGrades.grades.split("");
      //       alert("TTT")
      // }

      // alert(payload.placeInArray)
      //places new grade in appropriate place according to the provided index
      //e.g    for second component Grade.vue:   newGrades.grades[1] = 5        newGrades.grades=[3,5]
      state.newGrades.grades[payload.placeInArray]=payload.grade;
      // alert(state.newGrades.grades)
    },
    addNewWeightToArray(state, payload){

      // if(state.newGrades.weights == ""){
      //       //splits string into array
      //       //e.g    2 => [2]
      //       state.newGrades.weights = state.newGrades.weights.split("");
      // }
      //
      //places new grade's weight in appropriate place according to the provided index
      //e.g    for second component Grade.vue:   newGrades.weights[1] = 5        newGrades.weights=[3,5]
      state.newGrades.weights[payload.placeInArray]=payload.weight;

    },
    addNewDescriptionToArray(state, payload){

      // if(state.newGrades.descriptions == ""){
      //       //splits string into array
      //       //e.g    "Kartkówka" => ["Kartkówka"]
      //       state.newGrades.descriptions = state.newGrades.descriptions.split("");
      // }

      //places new grade's description in appropriate place according to the provided index
      //e.g    for second component Grade.vue:   newGrades.descriptions[1] = "Praca domowa"        newGrades.descriptions=["Kartkówka", "Praca domowa"]

      state.newGrades.descriptions[payload.placeInArray] = payload.description;

      //alternative description
      if(state.newGrades.descriptions[payload.placeInArray] == ""){
        state.newGrades.descriptions[payload.placeInArray] = "BRAK OPISU"
      }
    },
    addNewDateToArray(state, payload){

      // if(state.newGrades.dates == ""){
      //       //splits string into array
      //       //e.g    23.08.2020 14:00:00" => [23.08.2020 14:00:00]
      //       state.newGrades.dates = state.newGrades.dates.split("");
      // }

      //places new grade's date in appropriate place according to the provided index
      //e.g    for second component Grade.vue:   newGrades.date[1] = "23.08.2020 14:00:00"        newGrades.date=["21.08.2020 11:30:00", "23.08.2020 14:00:00"]
      state.newGrades.dates[payload.placeInArray] = payload.date;
    },

    editStudent(state, payload){
      // console.log(payload)
      const ww = payload.itemsToChange;
      // alert(eval(payload.itemsToChange))

        state.newGrades.ww = 336;
        // console.log(state.newGrades)
    },

    editStudentGrade(state, payload){
      // alert(this.ourStudent.grades.length)
      state.newGrades.grades[payload.placeInArray] = payload.newVal;
    },
    editStudentWeight(state, payload){
      state.newGrades.weights[payload.placeInArray] = payload.newVal;
    },
    editStudentDescription(state, payload){
      state.newGrades.descriptions[payload.placeInArray] = payload.newVal;
    },
    editStudentDate(state, payload){
      state.newGrades.dates[payload.placeInArray] = payload.date;
    },

    removeGrade(state, placeInArray){
      // console.log(state.newGrades.grades)
      if(state.newGrades.grades != ""){
        state.newGrades.grades[placeInArray]="";
        // state.newGrades.grades.splice(placeInArray,1);
      }
      if(state.newGrades.weights != ""){
        state.newGrades.weights[placeInArray]="";
        // state.newGrades.weights.splice(placeInArray,1);
      }
      if(state.newGrades.descriptions != ""){
        state.newGrades.descriptions[placeInArray]="";
        // state.newGrades.descriptions.splice(placeInArray,1);
      }
      if(state.newGrades.dates != ""){
        state.newGrades.dates[placeInArray]="";
        // state.newGrades.dates.splice(placeInArray,1);
      }
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
