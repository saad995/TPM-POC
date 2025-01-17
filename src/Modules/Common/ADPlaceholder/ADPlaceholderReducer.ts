//Import Dispatch from redux
import { Dispatch } from "redux";
import { IADPlaceholderActionType } from "./ADPlaceholderInterfaces";
import {
    ADPLACEHOLDER_CLEAR_STATE,
    ADPLACEHOLDER_SAVE_STATE
} from "./ADPlaceholderActionTypes";

interface IADPlaceholderState {
    ParentMenuID: number;
}

//default state
const defaultState: IADPlaceholderState = {
    ParentMenuID: 0
};

//Reducer
const ADPlaceholderReducer = (
    state: IADPlaceholderState = defaultState,
    action: IADPlaceholderActionType
): any => {
    switch (action.type) {
        case ADPLACEHOLDER_SAVE_STATE:
            return {
                ...state,
                ParentMenuID: action.payload.ParentMenuID
            };
        case ADPLACEHOLDER_CLEAR_STATE:
            return {
                ...state,
                ParentMenuID: 0
            };

        default:
            return state;
    }
};

export default ADPlaceholderReducer;
