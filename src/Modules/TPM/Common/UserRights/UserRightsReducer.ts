import {
    GET_USER_RIGHTS_SUCCESS,
    GET_USER_RIGHTS_REQUEST,
    GET_USER_RIGHTS_FAILURE
} from "./UserRightsActionTypes";
import { IError, IErrorType } from "Lib/Types/SharedTypes";
import {
    UserRightsReducerTypes,
    IUserRightsResponseData
} from "./UserRightsInterfaces";

//default state type
interface IUserRightsReducerState {
    loading: boolean;
    store: IUserRightsResponseData;
    reterived: boolean;
    error: IErrorType;
}

//default state
const defaultState: IUserRightsReducerState = {
    loading: false,
    reterived: false,
    store: { data: "" },
    error: { description: "", code: "" }
};

//Reducer
const UserRightsReducer = (
    state: IUserRightsReducerState = defaultState,
    action: UserRightsReducerTypes
): IUserRightsReducerState => {
    switch (action.type) {
        case GET_USER_RIGHTS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case GET_USER_RIGHTS_SUCCESS:
            return {
                ...state,
                reterived: true,
                loading: false,
                store: action.payload ?? defaultState.store
            };

        case GET_USER_RIGHTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload ?? defaultState.error
            };

        default:
            return state;
    }
};

export default UserRightsReducer;
