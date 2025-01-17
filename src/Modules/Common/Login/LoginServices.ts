import _ from "lodash";
import axios from "axios";
import ApiURL from "Lib/API/ApiURLs";
import { Request } from "Lib/Net/Request";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import { ILoginRequestData, ILoginResponse, IRole } from "./LoginInterfaces";
import config from "Config";
import jwtDecode from "jwt-decode";
import history from "Lib/Helpers/History";
import qs from "qs";
import Auth from "Lib/Net/Auth";

export interface User {
    UserName: string;
    Password: string;
    FirstName: string;
    LastName: string;
    IntialName: string;
    Token: string;
    DateOn: number;
    isAuthenticated: boolean;
    ApplicationID: string;
    Role: IRole[];
}

export const Authenticate = async (loginData: ILoginRequestData) => {
    const options = {
        methodId: "",
        method: "POST",
        url: ApiURL.TOKEN_SERVICE,
        contentType: "application/x-www-form-urlencoded",
        data: {
            grant_type: "password",
            username: loginData.userName,
            password: loginData.password,
            client_id: config.clientId
        }
    };

    await Request(options)
        .then((resp: ILoginResponse) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            const user: any = jwtDecode(resp.Token);
            resp.EmailAddress = user.email;
            resp.UserName = user.username;
            resp.FullName = user.personName;
            resp.Role = user.role;
            resp.UserRoleId = user.sub;
            resp.VerificationFlag = user.vf;
            Auth.setAuthToken(resp);

            history.push("/app/Dashboard");
            // window.location.reload(true);
            return resp;
        })
        .catch((message: any) => {
            return Promise.reject(message);
        });
};

const logout = () => {
    Auth.ClearLocalStorage();
    let user = {
        UserName: "",
        Password: "",
        FirstName: "",
        LastName: "",
        IntialName: "",
        Token: "",
        DateOn: "",
        RoleName: "",
        UserRoleId:"",
        Permissions: {},
        isAuthenticated: false,
        Role: []
    };
    return user; //Model.user;
};

const isJson = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

const tokenResponse = (response: any) => {
    let res;
    if (!isJson(response)) {
        res = JSON.parse(JSON.stringify(response));
    }

    if (res.status === 200) {
        const {
            access_token,
            expires_in,
            refresh_token,
            token_type,
            scope
        } = res.data;
        let AuthToken: ILoginResponse = {
            Token: access_token,
            RefreshToken: refresh_token,
            Expiry: expires_in,
            TokenType: token_type,
            Scope: scope
        };

        return AuthToken;
    } else {
        const { error } = res.data;
        return Promise.reject(error);
    }
};

export const refreshTokenRequest = (refreshToken: string) => {
    const requestConfig = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };

    const body: any = {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: config.clientId
    };
    return axios
        .post(ApiURL.TOKEN_SERVICE, qs.stringify(body), requestConfig)
        .then(tokenResponse)
        .catch((error) => {
            const message: IMessage = {
                code: "",
                description: ""
            };
            if (error.response?.status === 500) {
                message.code = `${error.response?.status}`;
                message.description = error.response?.statusText;
            } else if (error.response?.status === 400) {
                message.code = `${error.response?.status}`;
                message.description = error.response.data.error_description; //"Invalid username or password"
            }
            return Promise.reject(message);
        });
};

const RefreshTokenCall = async (refreshToken: string) => {
    return refreshTokenRequest(refreshToken);
};

const setWebocSessionId = (webocSessionId: string) => {
    if (webocSessionId != null && webocSessionId.length > 0) {
        localStorage.setItem("WebocSessionId", webocSessionId);
    }
};
const getWebocSessionId = (): string => {
    return _.toString(localStorage.getItem("WebocSessionId"));
};

const setWebocBaseUrl = (webocBaseUrl: string) => {
    if (webocBaseUrl != null && webocBaseUrl.length > 0) {
        localStorage.setItem("WebocBaseUrl", webocBaseUrl);
    }
};
const getWebocBaseUrl = (): string => {
    return _.toString(localStorage.getItem("WebocBaseUrl"));
};

export const userService = {
    Authenticate,
    logout,
    setWebocSessionId,
    getWebocSessionId,
    setWebocBaseUrl,
    getWebocBaseUrl,
    RefreshTokenCall
};
