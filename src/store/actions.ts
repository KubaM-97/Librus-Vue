//Vuex
import axios from 'axios';

import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State } from './state'

enum ActionTypes {
    initFullClass = 'INIT_FULL_CLASS'
}

type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

type Actions = {
    [ActionTypes.initFullClass](context: ActionAugments): void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.initFullClass]({ commit }) {
        axios.get("static/students.json")
        .then( (response: { data: { students: object; }; })=> commit(MutationType.setFullClass, response.data.students))
    }
}
