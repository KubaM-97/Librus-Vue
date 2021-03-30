type Getters = {
    fullNameGetters(params: object): string;
}

export const getters: Getters = {
    fullNameGetters(params: any): string {
        return `${params.lastName.toUpperCase()} ${params.firstName}`; 
    }
}