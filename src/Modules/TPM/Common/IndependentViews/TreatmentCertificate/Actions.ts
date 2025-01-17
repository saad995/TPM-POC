import { Dispatch } from "react";

import { baseLoadingState, failure } from "Modules/Common/Actions/GeneralActions";
import { EXPORT_TP_ASSIGN, GET_TREATMENT_REQUEST_DATA, POST_UPDATE_CONTAINER_NUMBER, PREVIEW_TREATMENT_CERTIFICATE, REJECT_TREATMENT_REQUEST, RE_ASSIGN_TREATMENT_PROVIDER, SET_IS_LOADING_TO_FALSE, SET_IS_RESCIND_VALUE, SUBMIT_TREATMENT_CERTIFICATE, TP_ACCEPT_TREATMENT_REQUEST, UPDATE_SINGLE_ISSUE_TREATMENT_REQUEST_DATA } from "./ActionTypes";
import { getPreviewTreatmentCertificateService, getSingleTreatmentRequestDetails, postExportTPAssignService, postReassignTreatmentService, postRejectTreatmentRequestService, postSubmitTreatmentCertificateService, postUpdateTreatmentCertificateService } from "./Services";
import {  SUBMIT_IO_ENDORSEMENT_REQUEST } from "./ActionTypes";
import {  postIOEndorsedTreatmentCertificateService,  } from "./Services";
import { clearAlert, errorAlert, successAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import Axios from "axios";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import { ToasterTypes, setToastr } from "Modules/Common/Helpers/ToastrConfig";
import { SET_TREATMENT_CERTIFICATE_SAVE_ID } from "Modules/TPM/TreatmentCertificate/TreatmentUnderProcess/TreatmentUnderProcessActionTypes";

// * Actions
export const getTreatmentRequestDetailsAction = (response: any): any => {
    return {
        type: GET_TREATMENT_REQUEST_DATA,
        payload: response
    };
};

export const getPreviewTreatmentCertificateAction = (response: any): any => {
    return {
        type: PREVIEW_TREATMENT_CERTIFICATE,
        payload: response
    };
};

export const postReassignTreatmentAction = (response: any): any => {
    return {
        type: RE_ASSIGN_TREATMENT_PROVIDER,
        payload: response
    };
};

export const postExportTPAssignAction = (response: any): any => {
    return {
        type: EXPORT_TP_ASSIGN,
        payload: response
    };
};

export const updateStatusSingleTreatmentRequest = (response: any): any => {
    return {
        type: UPDATE_SINGLE_ISSUE_TREATMENT_REQUEST_DATA,
        payload: response
    };
};

export const postRejectTreatmentRequestAction = (response: any): any => {
    return {
        type: REJECT_TREATMENT_REQUEST,
        payload: response
    };
};

export const setIsLoadingToFalseAction = (): any => {
    return {
        type: SET_IS_LOADING_TO_FALSE,
    };
};

export const postAcceptTreatmentRequestByTpAction = (response: any): any => {
    return {
        type: TP_ACCEPT_TREATMENT_REQUEST,
        payload: response
    };
};

export const setRescindValueAction = (response: any): any => {
    return {
        type: SET_IS_RESCIND_VALUE,
        payload: response 
    }
}

export const setTreatmentCertificateIdAction = (response: any): any => {
    return {
        type: SET_TREATMENT_CERTIFICATE_SAVE_ID,
        payload: response
    };
};

export const postTreatmentCertificateAction = (response: any): any => {
    return {
        type: SUBMIT_TREATMENT_CERTIFICATE,
    }
}

export const postUpdateContainerNumberAction = (response: any): any => {
    return {
        type: POST_UPDATE_CONTAINER_NUMBER,
        payload: response
    }
}

export const postSubmitIoEndorsementAction = (response: any): any => {
    return {
        type: SUBMIT_IO_ENDORSEMENT_REQUEST,
        payload: response
    };
};


// * Service calls
export const getSingleTreatmentRequestData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(clearAlert({code: "", description: ""}));
        dispatch(baseLoadingState());
        let response: any = await getSingleTreatmentRequestDetails(req);
        dispatch(getTreatmentRequestDetailsAction(response));
        if (response.hasOwnProperty('treatmentCertificate')) {
            dispatch(setTreatmentCertificateIdAction(response?.treatmentCertificate?.id || 0));
          } 
    }
    catch (e:any) {

        dispatch(failure(e));
    }
};

export const postReassignTreatmentData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await postReassignTreatmentService(req);
        dispatch(postReassignTreatmentAction(response));
        dispatch(successAlert(response?.message));
    } catch (e:any) {
        dispatch(setIsLoadingToFalseAction());
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};
export const postExportTPAssignTreatmentData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await postExportTPAssignService(req);
        dispatch(postExportTPAssignAction(response));
        dispatch(successAlert(response?.message));
    } catch (e:any) {
        dispatch(setIsLoadingToFalseAction());
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};
export const postIoEndorseSubmitData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await postIOEndorsedTreatmentCertificateService(req);
        dispatch(postSubmitIoEndorsementAction(response));
        dispatch(setIsLoadingToFalseAction());
        // dispatch(updateStatusSingleTreatmentRequest("7"));
        dispatch(successAlert(response?.message));
    } catch (e:any) {
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

export const postRejectTreatmentRequestData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await postRejectTreatmentRequestService(req);
        dispatch(postRejectTreatmentRequestAction(response));
        dispatch(successAlert(response?.message));
    } catch (e:any) {
        dispatch(setIsLoadingToFalseAction());
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};
export const postAcceptTreatmentRequestByTpData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await postRejectTreatmentRequestService(req);
        dispatch(postRejectTreatmentRequestAction(response));
        const message: IMessage = {
            code: "200",
            description: "Treatment Request Rejected."
        };
        dispatch(successAlert(message));
    } catch (e:any) {
        
        
        const message: IMessage = {
            code: "500",
            description: "Some error occurred while treatment request rejection."
        };
        dispatch(errorAlert(message));
        dispatch(failure(e));
    }
};

export const postSubmitTreatmentCeritificateData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await postSubmitTreatmentCertificateService(req);
        dispatch(postTreatmentCertificateAction(response));
        dispatch(successAlert(response?.message));
    } catch (e:any) {
        debugger;
        dispatch(setIsLoadingToFalseAction());
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

export const postSubmitTreatmentCeritificateOnSaveData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        // dispatch(baseLoadingState());
        let response: any = await postSubmitTreatmentCertificateService(req);
        dispatch(postTreatmentCertificateAction(response));
        dispatch(setTreatmentCertificateIdAction(response?.data?.id))
        // dispatch(successAlert(response?.message));
        dispatch(
            setToastr({
                title: "Success",
                message: response?.message?.description,
                type: ToasterTypes.SUCCESS
            })
        );
    } catch (e:any) {
        // dispatch(errorAlert(e));
        dispatch(
            setToastr({
                title: "Error",
                message: e?.description,
                type: ToasterTypes.ERROR
            })
        );
        dispatch(failure(e));
    }
};


export const getPreviewTreatmentCertificateData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await getPreviewTreatmentCertificateService(req);
        dispatch(getPreviewTreatmentCertificateAction(response));
    } catch (e:any) {
        
        dispatch(failure(e));
    }
};

