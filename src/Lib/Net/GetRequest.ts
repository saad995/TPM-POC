import axios from "axios";
import _ from "lodash";

//Response Handler
import {handleResponse, handleBarAlert} from "./ResponseHandler";

export const Get = (URL: string) => {
    return axios.get(URL).then(handleResponse).catch(handleBarAlert);
};