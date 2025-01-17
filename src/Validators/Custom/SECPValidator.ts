import validation from "../validation";
/* eslint-disable */
const SECPValidation = (value: string = "") => {
   let msg = "Please enter valid 7 digits number.";
   let regex = /^[0-9]*$/;
    if (
        value.length === 7 &&
        regex.test(value)
    ) {
        msg
    }
    return msg;
};

export default SECPValidation;