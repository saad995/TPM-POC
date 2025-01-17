import validation from "../validation";


const IBANValidator = (value: any) => {
    let msg = validation.IBAN.message;
    let ibanValue = value === undefined ? "" : value;

    if (
        ibanValue.length === validation.IBAN.length &&
        validation.IBAN.regex.test(ibanValue)
    ) {
        msg = "";
    }
    return msg;
};
