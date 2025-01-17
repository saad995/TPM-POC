const UserIdValidator = (value: any = "") => {
    let msg = "Please enter valid User ID.";
    let regex =  /^[a-zA-Z0-9\-]*$/;
    if (
        value.length > 4 &&
        value.length < 25 &&
        regex.test(value)
    ) {
        msg = ""
    }

    return msg;
};

export default UserIdValidator; 