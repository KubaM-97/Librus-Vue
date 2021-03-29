import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

import { state, State } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  state,
  getters,
  mutations,
  actions
})

