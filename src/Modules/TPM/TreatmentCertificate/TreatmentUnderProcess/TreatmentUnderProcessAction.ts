import { baseLoadingState, failure } from "Modules/Common/Actions/GeneralActions";
import { GET_CONSIGNMENT_MODES, GET_CONTAINER_TYPE, GET_FETCH_SAVE_DATA, GET_TARGET_TREATMENT, GET_TREATMENT_CONDUCTION } from "./TreatmentUnderProcessActionTypes";
import { getConsignmentModeListDataService, getContainerTypeListDataService, getTPCertificateFetchSaveDataService, getTargetTreatmetListService, getTreatmentConductionListService } from "./TreatmentUnderProcessServices";
import { Dispatch } from "react";
import { setTreatmentCertificateIdAction } from "../PendingTreatmentRequestList/PendingTreatmentRequestListAction";
import { SET_IS_LOADING_TO_FALSE } from "../PendingTreatmentRequestList/PendingTreatmentRequestListActionTypes";

export const getTargetTreatmentsListAction = (response: any): any => {
    return {
        type: GET_TARGET_TREATMENT,
        payload: response
    };
};

export const getTreatmentConductionAction = (response: any): any => {
    return {
        type: GET_TREATMENT_CONDUCTION,
        payload: response
    };
};

export const getContainerTypeAction = (response: any): any => {
    return {
        type: GET_CONTAINER_TYPE,
        payload: response
    };
};

export const getConsignmentModesActions = (response: any): any => {
    return {
        type: GET_CONSIGNMENT_MODES,
        payload: response
    };
};

export const setIsLoadingToFalseAction = (): any => {
    return {
        type: SET_IS_LOADING_TO_FALSE,
    };
};

export const getFetchSaveDataAction = (response: any): any => {
    return {
        type: GET_FETCH_SAVE_DATA,
        payload: response
    };
};

export const getTargetTreatmentListData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await getTargetTreatmetListService(req);
        dispatch(getTargetTreatmentsListAction(response));

    } catch (e:any) {

        dispatch(failure(e));
    }
};

export const getTreatmentConductionListData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await getTreatmentConductionListService(req);
        dispatch(getTreatmentConductionAction(response));

    } catch (e:any) {

        dispatch(failure(e));
    }
};

export const getContainerTypeListData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await getContainerTypeListDataService(req);
        const filteredResponse : any = response?.filter((container:any)=> container.description != "");
        dispatch(getContainerTypeAction(filteredResponse));

    } catch (e:any) {

        dispatch(failure(e));
    }
};
export const getConsignmentModesListData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await getConsignmentModeListDataService(req);
        dispatch(getConsignmentModesActions(response));

    } catch (e:any) {

        dispatch(failure(e));
    }
};
export const getTPCertificateFetchSaveData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await getTPCertificateFetchSaveDataService(req);
        dispatch(setTreatmentCertificateIdAction(response?.id || 0))
        dispatch(getFetchSaveDataAction(response));
        dispatch(setIsLoadingToFalseAction());

    } catch (e:any) {

        dispatch(failure(e));
    }
};