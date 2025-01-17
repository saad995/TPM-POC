import _ from 'lodash';

const cnicFormater = (val = "") => {
   
    let arr;
    if(_.isEmpty(val)){
        return "";
    }
    arr = val.split("");
    arr.splice(5,0,"-");
    arr.splice(13,0,"-");
    return arr.toString().replaceAll(',',"");
}

export default cnicFormater;