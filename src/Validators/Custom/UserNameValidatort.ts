const UserNameValidator = (value: any = "") => {
    let msg = "Invalid user name. Please enter a valid user name with format as abc-12-1234567";
    let regex = /[a-zA-Z]{3,3}-\d{2,2}-\d{7,7}/;
    if (value.length == 14 && regex.test(value)) {
        msg = ""
    }

    return msg;
};

export default UserNameValidator;