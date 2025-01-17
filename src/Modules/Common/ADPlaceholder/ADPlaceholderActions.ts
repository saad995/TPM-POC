import { Dispatch } from "redux";
import {
    ADPLACEHOLDER_CLEAR_STATE,
    ADPLACEHOLDER_SAVE_STATE
} from "./ADPlaceholderActionTypes";
import {
    IADPlaceholderActionType,
    IADPlaceholderClearStateType,
    IADPlaceholderPayload,
    IADPlaceholderType
} from "./ADPlaceholderInterfaces";

// ======================== ACTION CREATORS ===========================

export const SaveADPlaceholderData = (req: IADPlaceholderPayload) => async (
    dispatch: Dispatch<IADPlaceholderActionType>
) => {
    try {
        dispatch(SaveADPlaceholderDataAction(req));
    } catch (e) {
        dispatch(ClearADPlaceholderDataAction());
    }
};

// ============================ ACTIONs ===============================

export const SaveADPlaceholderDataAction = (
    req: IADPlaceholderPayload
): IADPlaceholderType => {
    return {
        type: ADPLACEHOLDER_SAVE_STATE,
        payload: req
    };
};

export const ClearADPlaceholderDataAction = (): IADPlaceholderClearStateType => {
    return {
        type: ADPLACEHOLDER_CLEAR_STATE
    };
};
