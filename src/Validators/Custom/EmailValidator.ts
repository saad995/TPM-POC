import RegexValidator from "../Basic/RegexValidator"



const EmailValidator = (value:string = "") => {
    let msg = "Please enter valid email address.";
    let regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (regex.test(value)) {
        msg="";
    }
    return msg;
  };
  
  
  export default EmailValidator;