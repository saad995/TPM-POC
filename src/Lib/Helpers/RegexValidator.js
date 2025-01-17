import Regex from '../../Constants/Regex';
import _ from 'lodash';



const RegexValidator = (value,key) => {
    if(!_.isEmpty(value) && !_.isEmpty(key)){
        return Regex[key].test(value) ? "" : `Please enter a valid ${key}.`
    }
};

export default RegexValidator;