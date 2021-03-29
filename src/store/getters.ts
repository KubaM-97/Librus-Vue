type Getters = {
    fullNameGetters(bar: object): string;
}

export const getters: Getters = {
    fullNameGetters(x: any): string {
        return `${x.lastName.toUpperCase()} ${x.firstName}`; 
    }
}