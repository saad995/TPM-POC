import _ from "lodash";
import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import Auth from "./Auth";
import appConfig from "Config";
import ApiURL from "Lib/API/ApiURLs";
import Config from "Config";
import { getTokenAndUpdateKeys, kcolBnoitucexe } from "Modules/Common/Helpers/HelperMethod";
import jwtDecode from "jwt-decode";
import store from "Store";

export const handleResponse = (response: any) => {
    let res;
    const encodedToken : string = store.getState()?.loginReducer?.isDevMode || "True";
    const token = _.toString(localStorage.getItem("Token"));
    if (!isJson(response)) {
        res = JSON.parse(JSON.stringify(response));
    } else res = JSON.parse(response);
    if (!res.config.url.endsWith('/open') && (encodedToken !== "True") && res.data) {
        const { key } = getTokenAndUpdateKeys();
        res.data = kcolBnoitucexe(res.data, key);
    }

    let code = null
    let msg = null

    if (!_.isEmpty(res.data) && !_.isEmpty(res.data.message)) {
        const { code: _code } = res.data.message;

        code = _code
        msg = res.data.message
    } else if (!_.isEmpty(res.data) && !_.isEmpty(res.message)) {
        const { code: _code } = res.message;

        code = _code
        msg = res.data.message
    }

    if (code || msg) {
        document
            .getElementById("barErrorDiv")
            ?.classList.remove("barErrorShow");
        document.getElementById("barErrorDiv")?.classList.add("barErrorHide");

        if (!_.isEmpty(code) && !_.isEqual(code, "200")) {
            return Promise.reject(res.data.message);
        } else {
            return _.get(res, "data", {});
        }
    }
};

export const handleBarAlert = (response: any) => {
    if (!_.isEmpty(response.code)) {
        return Promise.reject(response);
    } else if (response.response.status === 401) {
        const token = _.toString(localStorage.getItem("Token"));
        const res = tokenIntrospectRequest(token);
        if (!res.active) {
            Auth.Logout();
        }
    } else {
        if (appConfig.AlertBarEnable) {
            document
                .getElementById("barErrorDiv")
                ?.classList.remove("barErrorHide");
            document
                .getElementById("barErrorDiv")
                ?.classList.add("barErrorShow");
        } else {
            return;
        }
    }
};

export const tokenIntrospectRequest = (token: string): any => {
    const data = qs.stringify({
        token: token
    });
    const config: AxiosRequestConfig = {
        method: "post",
        url: ApiURL.TOKEN_INTROSPECT,
        headers: {
            Authorization: "Basic YXV0aDphdXRo",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data
    };

    return axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            
        });
};

export const isJson = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
