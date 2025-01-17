
const OTPValidator = (value: any = "") => {
    let msg = "Please enter valid OTP Code";
    let regex = /^[0-9]*$/;
    if (
        value.length === 6 &&
        regex.test(value)
    ) {
        msg = "";
       
    }
    return msg;
};


export default OTPValidator;