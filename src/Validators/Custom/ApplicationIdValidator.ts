const ApplicationIdValidator = (value: any = "") => {
    let msg = "Please enter valid application ID.";
    let regex =  /^[0-9]*$/
    if (
        value.length >= 3 &&
        value.length <= 10 &&
        regex.test(value)
    ) {
        msg = "";
       
    }
    return msg;
};


export default ApplicationIdValidator; 