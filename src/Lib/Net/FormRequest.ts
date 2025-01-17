import { IRequestOptions } from "Lib/Types/RequestTypes";
//Response Handler
import { handleResponse, handleBarAlert } from "./ResponseHandler";
import axios from "axios";
import _ from "lodash";
import Config from "Config";
import { getTokenAndUpdateKeys, kcolBnoitucexe } from "Modules/Common/Helpers/HelperMethod";
import store from "Store";

export const PostFile = (req: IRequestOptions) => {
    const requestOptions: any = getPOSTConfigFileUpload(req);
    return axios(requestOptions).then(handleResponse).catch(handleBarAlert);
};

const getPOSTConfigFileUpload = (options: IRequestOptions) => {
    const { token } = getTokenAndUpdateKeys();
    let signature = _.toString(localStorage.getItem("signature"));
    let form = new FormData();
    form.append("methodId", options.methodId);
    form.append("File", options.data.file);
    form.append("FolderID", "1");
    form.append("AuthorName", "Test");
    form.append("Description", "File Description Here");
    form.append("FileType", options.data.documentExtension);

    const myHeaders = new Headers();
    const request = {
        method: "post",
        url: options.url,
        headers: Object.assign(myHeaders, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }),
        data: form
    };

    if (!_.isEmpty(signature)) {
        Object.assign(request, { signature: signature });
    }
    if (!_.isEmpty(options.contentType)) {
        Object.assign(request.headers, {
            "Content-Type": options.contentType
        });
    }

    return request;
};

export const PostRegistrationFile = (req: IRequestOptions) => {
    const requestOptions: any = getPOSTRegistrationFileUpload(req);
    //console.log("Post Request =======", requestOptions.)
    const encodedToken : string = store.getState()?.loginReducer?.isDevMode || "True";
    return axios(requestOptions).then((res : any) => {
        if (!res.config.url.endsWith('/open') && (encodedToken !== "True") && res.data) {
            const { key } = getTokenAndUpdateKeys();
            res.data = kcolBnoitucexe(res.data, key);
        }
        return res;
    }).catch((err) => {
        return err.response
    });
};


const getPOSTRegistrationFileUpload = (options: IRequestOptions) => {
    const { token } = getTokenAndUpdateKeys();
    let signature = _.toString(localStorage.getItem("signature"));
    let form = new FormData();


    form.append("methodId", options.methodId);
    form.append("file", options.data.file);
    form.append("fileId", options.data.fileId);
    form.append("filepath", options.data.filepath);
    form.append("requestDocumentTypeCode", options.data.requestDocumentTypeCode);
    form.append("documentClassificationCode", options.data.documentClassificationCode);
    form.append("agencyId", options.data.agencyId);
    form.append("roleCode", options.data.roleCode);
    

    console.log("file =======>", form.has("File"))

    const myHeaders = new Headers();
    const request = {
        method: "post",
        url: options.url,
        headers: Object.assign(myHeaders, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        }),
        data: form
    };

    if (!_.isEmpty(signature)) {
        Object.assign(request, { signature: signature });
    }
    if (!_.isEmpty(options.contentType)) {
        Object.assign(request.headers, {
            "Content-Type": options.contentType
        });
    }
    
    return request;
};