import { IErrorType } from "Lib/Types/SharedTypes";
import {
    UNAUTORIZED_FAILURE,
    UNAUTORIZED_REQUEST
} from "./UnauthorizedActionTypes";
import { UnauthorizedActionTypes } from "./UnauthorizedInterface";

// Default state type
interface IUnauthorizedState {
    error: IErrorType;
}

// Default state
const defaultState: IUnauthorizedState = {
    error: {
        description: "",
        code: ""
    }
};

//Reducer
const unauthorizedReducer = (
    state: IUnauthorizedState = defaultState,
    action: UnauthorizedActionTypes
): IUnauthorizedState => {
    switch (action.type) {
        case UNAUTORIZED_REQUEST:
            return {
                ...state
            };

        case UNAUTORIZED_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
};

export default unauthorizedReducer;
