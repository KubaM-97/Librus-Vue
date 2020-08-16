import Vue from 'vue'
import Vuex from 'vuex'
import module from "./modules/module.ts"

//load Vuex
Vue.use(Vuex)


export const store = new Vuex.Store({

  modules: {
    module
  }
})
