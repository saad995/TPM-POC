export const compareStringInsensitive = (firstString: string, secondString: string) => {
    return firstString.localeCompare(secondString, undefined, { sensitivity: "accent" }) === 0;
};

export const containsStringInsensitive = (stringToSearchIn: string, variable: string) => {
    return stringToSearchIn.toLocaleLowerCase().includes(variable.toLocaleLowerCase());
};
