//Import Dispatch from redux
import { Dispatch } from "redux";
import {
    TEST_ACTION_TYPE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    CHECK_AUTHORIZED,
    SET_CURRENT_USER,
    SET_TOKEN,
    SET_INTERVAL
} from "./LoginActionTypes";
import Auth from "Lib/Net/Auth";
import { userService } from "./LoginServices";
import { User } from "./LoginInterfaces";
import { ILoginRequestData ,IToken} from "./LoginInterfaces";
import {
    clearAlert,
    errorAlert
} from "Elements/Basic/AlertDismissible/AlertDismissibleActions";

export function setCurrentUser() {
    return {
        type: TEST_ACTION_TYPE,
        payload: Auth.CurrentUser()
    };
}

//Subscription type submit action creator
export const Authenticate = (
    LoginData: ILoginRequestData,
    history: any
) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let res: any = await userService.Authenticate(LoginData);
        dispatch(clearAlert({ code: "", description: "" }));
        dispatch(success(res));
        dispatch(setToken(res));
        history.push("/Dashboard");
    } catch (e) {
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

function request() {
    return {
        type: LOGIN_REQUEST
    };
}

function success(user: User) {
    return {
        type: LOGIN_SUCCESS,
        user
    };
}
function failure(error: any) {
    return { type: LOGIN_FAILURE };
}

export function IsAuthorized() {
    return {
        type: CHECK_AUTHORIZED,
        payload: Auth.IsAuthorized()
    };
}

export const logout = () => {
    return {
        type: SET_CURRENT_USER,
        payload: userService.logout()
    };
};



export const setToken= (token:string): IToken => {
    return {
        type: SET_TOKEN,
        token: Auth.getToken()
    };
};

export const disableInterval= (isActive:boolean) => {
    return {
        type: SET_INTERVAL,
        isActive: isActive
    };
};


