const CellValidator = (value: any = "") => {
    let msg = "Please enter 13 characters without special characters. e.g.+921231231231";
    let regex =  /^[+0-9]*$/;
    if (
        value.length === 10 &&
        regex.test(value)
    ) {
        msg = "";
       
    }
    return msg;
};


export default CellValidator; 