import { Dispatch } from "react";
import { GET_IO_RIGHTS, GET_TREATMENT_CERTIFICATE_DATA, GET_TREATMENT_REQUEST_LIST, LOADING_PENDING_LIST, SELECTED_TAB, SET_IS_LOADING_FALSE } from "./TreatmentCertificatesActionTypes";

import { baseLoadingState, failure } from "Modules/Common/Actions/GeneralActions";
import { getIORightDataSerice, getIssueTreatmentCertificateService, getTreatmentCertificatesList } from "./TreatmentCertificatesServices";

// * Actions
export const getTreatmentListDetails = (response: any): any => {
    return {
        type: GET_TREATMENT_REQUEST_LIST,
        payload: response
    };
};

export const setLoadingPendingListAction = (loaderFlag: any): any => {
    return {
        type: LOADING_PENDING_LIST,
        payload: loaderFlag
    };
};

export const setLoadingPendingListFalseAction = (): any => {
    return {
        type: SET_IS_LOADING_FALSE,
    };
};

export const getIssueTreatmentCeritificateAction = (response: any): any => {
    return {
        type: GET_TREATMENT_CERTIFICATE_DATA,
        payload: response
    };
};

export const setSelectedTabValue = (response: any): any => {
    return {
        type: SELECTED_TAB,
        payload: response,
    }
}
export const getIORightsActions = (response: any): any => {
    return {
        type: GET_IO_RIGHTS,
        payload: response
    };
};


// * Service calls
export const getTreatmentRequestList = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setLoadingPendingListAction(true));
        let response: any = await getTreatmentCertificatesList(req);
        dispatch(getTreatmentListDetails(response));
        dispatch(setLoadingPendingListAction(false));
    } catch (e:any) {
        dispatch(setLoadingPendingListAction(false));
        dispatch(failure(e));
    }
};

export const getIssueTreatmentCertificateData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await getIssueTreatmentCertificateService(req);
        dispatch(getIssueTreatmentCeritificateAction(response));
        dispatch(setLoadingPendingListFalseAction())
    } catch (e:any) {
        dispatch(setLoadingPendingListFalseAction())
        dispatch(failure(e));
    }
};

export const getIORightsData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await getIORightDataSerice(req);
        dispatch(getIORightsActions(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

