import validation from "../validation";

const NTNValidator = (value: any = "") => {

    let msg =  "Please enter valid 7 digits NTN number.";
    let regex = /^[0-9]*$/;
    if (
        value.length === 7 &&
        regex.test(value)
    ) {
        msg = "";
    }

    return msg;
};

export default NTNValidator;