import { baseLoadingState, failure } from "Modules/Common/Actions/GeneralActions";
import { Dispatch } from "react";
import { getGenerateNonComplianceDataService } from "./GenerateNonComplianceServices";
import { GET_NON_COMPLIANCE_DATA, SET_IS_LOADING } from "./GenerateNonComplianceActionTypes";

export const getNonGenerateComplianceAction = (response: []): {} => {
    
    return {
        type: GET_NON_COMPLIANCE_DATA,
        payload: response
    };
};

export const setIsLoadingAction = (flag:boolean): {} => {
    
    return {
        type: SET_IS_LOADING,
        payload: flag,
    };
};

export const getIssueTreatmentCertificateData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setIsLoadingAction(true));
        let response: any = await getGenerateNonComplianceDataService(req);
        dispatch(getNonGenerateComplianceAction(response));
        dispatch(setIsLoadingAction(false));
    } catch (e:any) {
        dispatch(setIsLoadingAction(false));
        dispatch(failure(e));
    }
};