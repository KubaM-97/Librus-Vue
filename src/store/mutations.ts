import { MutationTree } from 'vuex'
import { State } from './state'

export enum MutationType {
    setFullClass = 'SET_FULL_CLASS',
}

export type Mutations = {
    [MutationType.setFullClass](state: State, students: State["students"]): void
  }

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.setFullClass](state, students) {
        state.students = students
    },
}

