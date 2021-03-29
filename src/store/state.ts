export type NewGrades = {
    marks: number[],
    weights: number[],
    descriptions: string[],
    dates: Date[],
}

export type State = {
    students: object,
    newGrades: NewGrades;
};
  
export const state: State = {
    students: {},
    newGrades:{
        marks: [],
        weights: [],
        descriptions: [],
        dates: []
    }
};