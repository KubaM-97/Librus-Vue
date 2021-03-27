type Getters = {
    fullNameGetters(bar: object): string;
}

export const getters: Getters = {
    fullNameGetters(bar: { lastName: string; firstName: string; }): string {
        return `${bar.lastName.toUpperCase()} ${bar.firstName}`; 
    }
}