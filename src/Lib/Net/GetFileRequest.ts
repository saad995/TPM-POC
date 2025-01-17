import axios from "axios";
import { IFileRequestOptions } from "Lib/Types/RequestTypes";
import _ from "lodash";
import { saveAs } from "file-saver";

//Response Handler
import { handleBarAlert } from "./ResponseHandler";

export const GetFile = (req: IFileRequestOptions) => {
    
    return axios
        .get(req.url)
        .then((response) => handleResponsesFile(req))
        .catch(handleBarAlert);
};

const handleResponsesFile = (req: IFileRequestOptions) => {
    fetch(req.url, {
        method: "GET"
    })
        .then(function (response) {
            return response.blob();
        })
        .then(function (blob) {
            saveAs(blob, req.data);
        })
        .catch((error) => {});
};
