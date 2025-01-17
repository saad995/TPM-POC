import axios from "axios";
import _ from "lodash";

import history from "Lib/Helpers/History";
import { User } from "Modules/Common/Constants/Types/User/UserTypes";
import { userService } from "Modules/Common/Login/LoginServices";
import { setToken, disableInterval } from "Modules/Common/Login/LoginActions";
import { useDispatch } from "react-redux";
import { getTokenAndUpdateKeys } from "Modules/Common/Helpers/HelperMethod";


export const authHeader = () => {
    // return authorization header with jwt token
    const { token } = getTokenAndUpdateKeys();
    let tokenDateOn = new Date(_.toString(localStorage.getItem("DateOn")));

    if (token && token.length > 0) {
        let _user = IsTokenExpired(tokenDateOn);
        if (_user.Token.length > 0 && _user.IsAuthenticated === true) {
            return { Authorization: "Bearer " + _user.Token };
        } else {
            return {};
        }
    } else {
        return {};
    }
};

const setAuthorizationToken = (): void => {
    const { token } = getTokenAndUpdateKeys();
    let tokenDateOn = new Date(_.toString(localStorage.getItem("DateOn")));

    if (token.length > 0) {
        let _user = IsTokenExpired(tokenDateOn);
        if (_user.Token.length > 0 && _user.IsAuthenticated === true) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

const setAuthToken = (response: any) => {
    if (response.Token != null && response.Token.length > 0) {
        localStorage.setItem("Token", response.Token);
        localStorage.setItem("RefreshToken", response.RefreshToken);
        localStorage.setItem("Expiry", response.Expiry);
        localStorage.setItem("TokenType", response.TokenType);
        localStorage.setItem("UserRoleId", response.UserRoleId);
        localStorage.setItem("Scope", response.Scope);
        localStorage.setItem("DateOn", new Date().toString());
        localStorage.setItem("IsAuthenticated", "true");
        localStorage.setItem("ApplicationID", "true");
        sessionStorage.setItem("RequestInProgress", "");
        localStorage.setItem("EmailAddress", response.EmailAddress);
        localStorage.setItem("UserName", response.UserName);
        localStorage.setItem("FirstName", response.FirstName);
        localStorage.setItem("LastName", response.LastName);
        localStorage.setItem("FullName", response.FullName);
        localStorage.setItem("Role", response.Role);
        localStorage.setItem("VerificationFlag", response.VerificationFlag);
        localStorage.setItem("LoggedInUserRoleID", response.LoggedInUserRoleID);
    }
};

const setLoggedInUserRoleID = (loggedInUserRoleID: string) => {
    

    if (loggedInUserRoleID != null && loggedInUserRoleID.length > 0) {
        
        localStorage.setItem("LoggedInUserRoleID", loggedInUserRoleID);
    }
};

const setWebocUserRoleID = (webocUserRoleID: string) => {
    if (webocUserRoleID !== null && webocUserRoleID.length > 0) {
        localStorage.setItem("webocUserRoleId", webocUserRoleID);
    }
};
const getLoggedInUserRoleID = (): string => {
    return _.toString(localStorage.getItem("LoggedInUserRoleID"));
};

const getUserRoleId = (): string => {
    return _.toString(localStorage.getItem("UserRoleId"));
};

const getWebocUserRoleID = (): string => {
    return _.toString(localStorage.getItem("webocUserRoleId"));
};

const setWebocSessionId = (webocSessionId: string) => {
    if (webocSessionId != null && webocSessionId.length > 0) {
        localStorage.setItem("WebocSessionId", webocSessionId);
    }
};
const getWebocSessionId = (): string => {
    return _.toString(localStorage.getItem("WebocSessionId"));
};

const getWebocBaseUrl = (): string => {
    return _.toString(localStorage.getItem("WebocBaseUrl"));
};

const tokenRefresh = async (dispatch: any) => {
    // Refresh token here
    const refreshToken = _.toString(localStorage.getItem("RefreshToken"));

    sessionStorage.setItem("RequestInProgress", "true");
    const response = await userService.RefreshTokenCall(refreshToken);
    dispatch(disableInterval(false));
    setRefreshedToken(response, dispatch);
};


const setRefreshedToken = (response: any, dispatch: any) => {
    if (response.Token != null && response.Token.length > 0) {
        localStorage.setItem("Token", response.Token);
        localStorage.setItem("RefreshToken", response.RefreshToken);
        localStorage.setItem("DateOn", new Date().toString());
        localStorage.setItem("Expiry", response.Expiry);
        localStorage.setItem("TokenType", response.TokenType);
        localStorage.setItem("Scope", response.Scope);
        dispatch(setToken(response.Token));
        dispatch(disableInterval(true));
        sessionStorage.setItem("RequestInProgress", "");
    }
};

const setCurrentUser = (user: User) => {
    if (user.Token != null && user.Token.length > 0 && user.UserName.length > 0) {
        localStorage.setItem("Token", user.Token);
        localStorage.setItem("UserName", user.UserName);
        localStorage.setItem("FirstName", user.FirstName);
        localStorage.setItem("LastName", user.LastName);
        localStorage.setItem("IntialName", user.IntialName);
        localStorage.setItem("DateOn", new Date().toString());
        localStorage.setItem("IsAuthenticated", "true");
        localStorage.setItem("ApplicationID", "true");
    }
};

const CurrentUser = () => {
    let _user = {
        UserName: "",
        Password: "",
        FirstName: "",
        LastName: "",
        IntialName: "",
        Token: "",
        DateOn: "",
        IsAuthenticated: false,
        ApplicationID: ""
    };

    try {
        if (localStorage.length > 0) {
            let token = _.toString(localStorage.getItem("Token"));
            let dateOn = _.toString(localStorage.getItem("DateOn"));

            let tokenDateOn = new Date(dateOn);

            if (token.length > 0) {
                return IsTokenExpired(tokenDateOn);
            } else {
                return _user;
            }
        } else {
            return _user;
        }
    } catch (err) {
        return _user;
    }
};

const IsAuthorized = () => {
    let _user = {
        UserName: "",
        Password: "",
        FirstName: "",
        LastName: "",
        IntialName: "",
        Token: "",
        DateOn: "",
        IsAuthenticated: false,
        ApplicationID: ""
    };
    try {
        let token = _.toString(localStorage.getItem("Token"));
        let dateOn = _.toString(localStorage.getItem("DateOn"));
        let tokenDateOn = new Date(dateOn);

        if (token.length > 0) {
            return IsTokenExpired(tokenDateOn);
        } else {
            return _user;
        }
    } catch (err) {
        return _user;
    }
};

const getToken = (): string => {
    let token = _.toString(localStorage.getItem("Token"));
    return token;
}

const ClearLocalStorage = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("UserName");
    localStorage.removeItem("FirstName");
    localStorage.removeItem("LastName");
    localStorage.removeItem("IntialName");
    localStorage.removeItem("DateOn");
    localStorage.removeItem("RoleName");
    localStorage.removeItem("Permissions");
    localStorage.removeItem("DateOn");
    localStorage.removeItem("IsAuthenticated");
    localStorage.removeItem("ApplicationID");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("Expiry");
    localStorage.removeItem("TokenType");
    localStorage.removeItem("Scope");
    localStorage.removeItem("WebocSessionId");
    localStorage.removeItem("LoggedInUserRoleID");
    localStorage.removeItem("Role");
    localStorage.removeItem("VerificationFlag");
    localStorage.removeItem("webocUserRoleId");
    // history.push("/login");
    // window.location.reload();
};

const Logout = () => {
    ClearLocalStorage();
    history.push("/");
};

const IsTokenExpired = (tokenDateOn: Date) => {
    let Token_Exp_Time_Minutes = _.toNumber(localStorage.getItem("Expiry")) / 60; //Constant.TokenExpiryTime;
    const Last_LoginTime: any = tokenDateOn;
    const CurrentTime: any = new Date();
    const diffMs = CurrentTime - Last_LoginTime; // milliseconds between Last_LoginTime & CurrentTime
    //var diffDays = Math.floor(diffMs / 86400000); var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    let TotalDiffInMinutes = diffMins;
    let _user = {
        UserName: "",
        Password: "",
        FirstName: "",
        LastName: "",
        IntialName: "",
        Token: "",
        DateOn: "",
        IsAuthenticated: false,
        ApplicationID: ""
    };
    if (TotalDiffInMinutes < Token_Exp_Time_Minutes) {
        _user.Token = _.toString(localStorage.getItem("Token"));
        _user.UserName = _.toString(localStorage.getItem("UserName"));
        _user.FirstName = _.toString(localStorage.getItem("FirstName"));
        _user.LastName = _.toString(localStorage.getItem("LastName"));
        _user.IntialName = _.toString(localStorage.getItem("IntialName"));
        _user.IntialName = _.toString(localStorage.getItem("ApplicationID"));
        _user.IsAuthenticated = true;
        return _user;
    } else {
        ClearLocalStorage();
        history.push("/login");
        return _user;
    }
};

const setWebocBaseUrl = (webocBaseUrl: string) => {
    if (webocBaseUrl != null && webocBaseUrl.length > 0) {
        localStorage.setItem("WebocBaseUrl", webocBaseUrl);
    }
};

const getVerificationFlag = (): number => {
    return _.toInteger(localStorage.getItem("VerificationFlag"));
};

const getCurrentUserRoleCode = (): string => {
    return _.toString(localStorage.getItem("CurrentUserRoleCode"));
};

export default {
    authHeader,
    setAuthorizationToken,
    setCurrentUser,
    CurrentUser,
    IsAuthorized,
    ClearLocalStorage,
    Logout,
    setAuthToken,
    setLoggedInUserRoleID,
    setWebocUserRoleID,
    getLoggedInUserRoleID,
    setWebocSessionId,
    getWebocSessionId,
    setWebocBaseUrl,
    getWebocBaseUrl,
    tokenRefresh,
    getWebocUserRoleID,
    getVerificationFlag,
    getToken,
    getUserRoleId,
    getCurrentUserRoleCode
};