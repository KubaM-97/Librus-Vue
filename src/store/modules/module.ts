// console.log("modul")
// import { VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'

// //Vuex
// import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

// @Module({ namespaced: true, name: 'test' })
// // interface NewGrades {
// //   [marks: string]: number[],
// //   [weights: string]: number[],
// //   [descriptions: string]: number[];
// //   [dates: string]: number[];
// // }
// // class User extends VuexModule implements NewGrades{
// class User extends VuexModule {
//     public name = "";
//     public students: Array<object> = [];
//     public showNavpanel = true;
//     public showLoaderGif = false;
//     @Mutation
//       public setName(newName: string): void {
//         this.name = newName
//       }
//       changeNavpanel(){
//         this.showNavpanel = !this.showNavpanel;
//       }
//       changeLoaderGif(){
//         this.showLoaderGif = !this.showLoaderGif;
//       }
//       setFullClass(students: Array<object>){
//         this.students = students
//       }
//     @Action
//       public updateName(newName: string): void {
//         this.context.commit('setName', newName)
//       }
//       public initFullClass(): void {
//         axios.get("static/students.json")
//         .then((response)=>{
//           console.log(response.data.students);
//           this.context.commit("setFullClass", response.data.students)
//         })
//       }
// }
// export default User
// //   showNavpanel: true,
// //   showLoaderGif: false,
// //   NewGrades:{
// //       marks: [],
// //       weights: [],
// //       descriptions: [],
// //       dates: []
// //   }

// // import Vue from 'vue'
// // import Vuex from 'vuex'

// // //Vuex
// // import axios from 'axios'
// // import VueAxios from 'vue-axios'
// // Vue.use(VueAxios, axios)

// // // load Vuex
// // Vue.use(Vuex)

// // const state = {
// //   students: {},
// //   showNavpanel: true,
// //   showLoaderGif: false,
// //   NewGrades:{
// //       marks: [],
// //       weights: [],
// //       descriptions: [],
// //       dates: []
// //   }
// // };

// // const getters = {
// //   fullNameGetters() {
// //     return (bar) => {
// //       return `${bar.lastName.toUpperCase()} ${bar.firstName}`;
// //     }
// //   }
// // };

// // const mutations = {
// //   changeNavpanel(state){
// //     state.showNavpanel = !state.showNavpanel;
// //   },
// //   changeLoaderGif(state){
// //     state.showLoaderGif = !state.showLoaderGif;
// //   },

// //   async setFullClass(state, students){
// //     state.students = students
// //   }
// // };

// // const actions = {
// //   async initFullClass({commit}) {
// //     axios.get("static/students.json")
// //     .then((response)=>{
// //       console.log(response.data.students);
// //       commit("setFullClass", response.data.students)
// //     })
// //   }
// // };

// // export default {
// //   state,
// //   getters,
// //   actions,
// //   mutations
// // }
