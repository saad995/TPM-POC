import { Dispatch } from "react";
import * as ActionType from "./FormGeneratorActionTypes";

export const createEditTreatmentOnBoardDataAction = (payload:any): any => {
    return {
        type: ActionType.CREATE_EDIT_TREATMENT_ON_BOARD_DATA,
        payload: payload
        };
};

export const addValidationMsg = (payload:any): any => {
    return {
        type:ActionType.ADD_VALIDATION_MSG,
        payload:payload
    }
}


export const storeAttachmentInForm = (payload:any) => {
    return {
        type:ActionType.FILE_STORE_IN_FORM,
        payload:payload,
    }
}

export const createEditTreatmentOnBoardDataClearAction = (): any => {
    return {
        type: ActionType.CREATE_EDIT_TREATMENT_ON_BOARD_DATA_CLEAR
        };
};