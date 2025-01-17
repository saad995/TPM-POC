import _ from "lodash";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { IRequestOptions } from "Lib/Types/RequestTypes";
import Auth from "./Auth";
import Config from "Config";
import { getTokenAndUpdateKeys, kcatSllac } from "Modules/Common/Helpers/HelperMethod";
import jwtDecode from "jwt-decode";
import store from "Store";

type AxiosRequest = AxiosRequestConfig & { headers: AxiosRequestHeaders }

export const GetPOSTConfig = (options: IRequestOptions): AxiosRequestConfig => {
    const { key } = getTokenAndUpdateKeys();
    const encodedToken : string = store.getState()?.loginReducer?.isDevMode || "True";
    const data = {
        methodId: options.methodId,
        data: options.data,
        pagination: options.pagination
    }
    const request: AxiosRequest = {
        method: "POST",
        url: "",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        data: !options.url.endsWith('/open') && (encodedToken !== "True")? kcatSllac(data, key) : data
    };

    if (!_.isEmpty(options)) {
        extendRequestObj(request, options)
    }

    return request;
};

function extendRequestObj (request: AxiosRequest, options: IRequestOptions) {
    let token = _.toString(localStorage.getItem("Token"));
    let loggedInUserRoleID = Auth.getLoggedInUserRoleID();
    let webocUserRoleID = Auth.getWebocUserRoleID();
    let signature = _.toString(localStorage.getItem("signature"));
    
    if (!_.isEmpty(options.url)) {
        Object.assign(request, { url: options.url });
    }
    if (!_.isEmpty(options.pagination)) {
        Object.assign(request, { pagination: options.pagination }); //request.pagination = options.pagination;
    }
    if (!_.isEmpty(token)) {
        Object.assign(request.headers, {
            Authorization: `Bearer ${token}`
        });
    }
    if (!_.isEmpty(token)) {
        Object.assign(request.headers, {
            LoggedInUserRoleID: loggedInUserRoleID
        });
    }
    if (!_.isEmpty(token)){
        Object.assign(request.headers, {
            webocUserRoleID: webocUserRoleID
        })
    }
    if (!_.isEmpty(signature)) {
        Object.assign(request, { signature: signature });
    }
    if (!_.isEmpty(options.contentType)) {
        Object.assign(request.headers, {
            "Content-Type": options.contentType
        });
    }
}


export const RequestFormData = (req: IRequestOptions) => {
    let form = new FormData();
    const { token } = getTokenAndUpdateKeys();

    form.append("methodId", req.methodId);
    form.append("File", req.data.file);
    form.append("FolderID", "1");
    form.append("AuthorName", "Test");
    form.append("Description", "File Description Here");
    form.append("FileType", req.data.documentExtension);

    const requestOptions = {
        method: "POST",
        headers: {
            "Cache-Control": "no-cache",
            Authorization: `Bearer ${token}`
        },
        body: form,
        redirect: "follow"
    };

    return requestOptions;
};
