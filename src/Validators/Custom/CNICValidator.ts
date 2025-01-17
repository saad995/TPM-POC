

import validation from "../validation";


const CNICValidator = (value: any = "") => {
    let msg = validation.CNIC.message;
    if (value) {
        value = value.replace(/-/g, "");
        if (
            value.length === validation.CNIC.length &&
            validation.CNIC.regex.test(value)
        ) {
            msg = "";
        }
    }
    return msg;
};
  
  export default CNICValidator;