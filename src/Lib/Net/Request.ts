import _ from "lodash";
import axios from "axios";
import qs from "qs";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";

export interface IRequestOptions {
    url: string;
    methodId: string;
    data?: any;
    pagination?: any;
    signature?: string;
    contentType?: string;
}

export interface ILoginResponse {
    Token: string;
    Expiry: string;
    RefreshToken: string;
    TokenType: string;
    Scope: string;
    UserName?: string;
    EmailAddress?: string;
    FirstName?: string;
    LastName?: string;
    FullName?: string;
}

export const Request = (req: IRequestOptions) => {
    const config = {
        headers: { "Content-Type": `application/x-www-form-urlencoded` }
    };

    const body: any = {
        grant_type: req.data.grant_type,
        username: req.data.username,
        password: req.data.password,
        client_id: req.data.client_id
    };
    return axios
        .post(req.url, qs.stringify(body), config)
        .then(tokenResponse)
        .catch((error) => {
            const message: IMessage = {
                code: "",
                description: ""
            };
            if (error.response?.status === 500) {
                message.code = `${error.response?.status}`
                message.description = error.response?.statusText;
            } else if (error.response?.status === 400) {
                message.code = `${error.response?.status}`
                message.description = error.response.data.error_description; //"Invalid username or password"
            }

            return Promise.reject(message);
        });
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

const isJson = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};
