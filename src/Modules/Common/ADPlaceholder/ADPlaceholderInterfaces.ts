//Import action types
import {
    ADPLACEHOLDER_CLEAR_STATE,
    ADPLACEHOLDER_SAVE_STATE
} from "./ADPlaceholderActionTypes";

export interface IADPlaceholderPayload {
    ParentMenuID: number;
}

export interface IADPlaceholderType {
    type: typeof ADPLACEHOLDER_SAVE_STATE;
    payload: IADPlaceholderPayload;
}

export interface IADPlaceholderClearStateType {
    type: typeof ADPLACEHOLDER_CLEAR_STATE;
}

export type IADPlaceholderActionType =
    | IADPlaceholderType
    | IADPlaceholderClearStateType;

export type AppActions = IADPlaceholderActionType;
