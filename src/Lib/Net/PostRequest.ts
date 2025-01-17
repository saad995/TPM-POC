import axios, { AxiosRequestConfig } from "axios";
import _ from "lodash";
import { IFileRequestOptions, IRequestOptions } from "Lib/Types/RequestTypes";
import jwtDecode from "jwt-decode";
import history from "Lib/Helpers/History";

//Response Handler
import { handleResponse, handleBarAlert } from "./ResponseHandler";
import { GetPOSTConfig } from "./RequestHandler";
import Auth from "Lib/Net/Auth";
//Interfaces
import { ITokenExpiry } from "../../../src/Layouts/AppLayout/AppLayoutInterfaces";
//Redux
import { Dispatch } from "redux";
import store from "Store";
import Config from "Config";
import { getTokenAndUpdateKeys, kcatSllac } from "Modules/Common/Helpers/HelperMethod";
import { clearDataMasking, setOldDataMaskingSuccess } from "Modules/Common/DataMasking/DataMaskingAction";

const { dispatch } = store;

const chkRefreshTokenRequired = () => {
    let token: any = Auth.getToken();
    let currentState = store.getState();
    if (token) {
        let expiry = jwtDecode<ITokenExpiry>(token).exp;
        let halfTimeOfTokenExpiry = _.toNumber(localStorage.getItem("Expiry")) / 120;
        let timeLeft = expiry - Date.now() / 1000;
        timeLeft = Math.trunc(timeLeft /= 60);
        //  
        if (timeLeft <= halfTimeOfTokenExpiry && timeLeft > 1) {
            store.dispatch(setOldDataMaskingSuccess(currentState?.DataMaskingReducer));
            return true;
        }
    }
    return false;
}


const callRefreshToken = () => async (
    dispatch: Dispatch<any>
) => {
    try {
      let response = await Auth.tokenRefresh(dispatch);
         return response;
    }
    catch (e) {
    }
};

axios.interceptors.request.use(config => {
    let skipRefreshTokenCall = false;
    if (typeof config.data == 'string') {
        let istokenRequest = config?.data.split("=");
        skipRefreshTokenCall = istokenRequest.includes("grant_type")
    }
    
    if (!skipRefreshTokenCall) {
        const requestInProgress = _.toString( sessionStorage.getItem( "RequestInProgress" ) );
        
        if ((!requestInProgress || _.isEmpty(requestInProgress)) && chkRefreshTokenRequired()) {
            dispatch(callRefreshToken());
        }
    }
    return config;
}, error => {
    
    return Promise.reject(error);
});



export const Post = (req: IRequestOptions) => {
    const requestOptions: any = GetPOSTConfig(req);
    return axios(requestOptions).then(handleResponse).catch(handleBarAlert);
};

export const PostFile = (req: IRequestOptions) => {
    const requestOptions: any = getPOSTConfigFileUpload(req);
    return axios(requestOptions).then(handleResponse).catch(handleBarAlert);
};

const getPOSTConfigFileUpload = (options: IRequestOptions) => {
    let token = _.toString(localStorage.getItem("Token"));
    let signature = _.toString(localStorage.getItem("signature"));
    let form = new FormData();
    form.append("methodId", options.methodId);
    form.append("File", options.data.file);
    form.append("FolderID", "1");
    form.append("AuthorName", "Shariq");
    form.append("Description", "File Description Here");
    form.append("FileType", options.data.documentExtension);

    const { key } = getTokenAndUpdateKeys();
    const encodedToken : string = store.getState()?.loginReducer?.isDevMode || "True";

    const myHeaders = new Headers();
    const request = {
        method: "post",
        url: options.url,
        headers: Object.assign(myHeaders, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }),
        data: !options.url.endsWith('/open') && (encodedToken !== "True") ? kcatSllac(form, key) : form
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
export const PostFileQuota = (req: IRequestOptions, sdid: number, itemID: number, webocItemID: number) => {
    const requestOptions: any = getPOSTConfigFileUploadQuota(req, sdid, itemID, webocItemID);
    return axios(requestOptions).then(handleResponse).catch(handleBarAlert);
};
const getPOSTConfigFileUploadQuota = (options: IRequestOptions, sdid: number, itemID: number, webocItemID: number) => {
    let token = _.toString(localStorage.getItem("Token"));
    let signature = _.toString(localStorage.getItem("signature"));
    let loggedInUserRoleID = Auth.getLoggedInUserRoleID();
    let form = new FormData();
    form.append("methodId", options.methodId);
    form.append("File", options.data.file);
    form.append("FolderID", "1");
    form.append("AuthorName", "Test");
    form.append("Description", "File Description Here");
    form.append("FileType", options.data.documentExtension);
    form.append("itemID", itemID.toString());
    form.append("sdid", sdid.toString());
    form.append("webocItemID", webocItemID.toString())

    const { key } = getTokenAndUpdateKeys();  
    const encodedToken : string = store.getState()?.loginReducer?.isDevMode || "True";


    const myHeaders = new Headers();
    const request = {
        method: "post",
        url: options.url,
        headers: Object.assign(myHeaders, {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }),
        data: !options.url.endsWith('/open') && (encodedToken !== "True") ? kcatSllac(form, key) : form
    };

    if (!_.isEmpty(signature)) {
        Object.assign(request, { signature: signature });
    }
    if (!_.isEmpty(options.contentType)) {
        Object.assign(request.headers, {
            "Content-Type": options.contentType
        });
    }
    if (!_.isEmpty(token)) {
        Object.assign(request.headers, {
            LoggedInUserRoleID: loggedInUserRoleID
        });
    }

    return request;
};

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
        .catch((error) => { });
};



export const postData = async (service: any, methodID: any, request?: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = service;
    requestOptions.methodId = methodID;
    if (request) {
        requestOptions.data = request;
    }
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};
