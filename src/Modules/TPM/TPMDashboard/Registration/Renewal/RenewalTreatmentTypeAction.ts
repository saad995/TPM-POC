import { Dispatch } from "redux";
import * as Interfaces from "./RenewalTreatmentTypeInterfaces";
import * as ActionType from "./RenewalTreatmentTypeActionTypes";

import {
    FailureType,
    IClearStateType,
    IGenerateVoucherResponse,
    ISaveImportPermitResponse,
    ISubmitImportPermitRequest,
    ISubmitImpPermSuccessType,
    ISubmitPremiseRegistrationRequest,
    ISubmitPremiseRegistrationResponse,
    ISubmitImportPermitResponse,
    RequestType,
    StopLoaderType,
    IPremisesRegistrationDeleteAttachmentReq
} from "./RenewalTreatmentTypeInterfaces";
import { ApplicationCodes } from "Modules/TPM/Constants/Interfaces";
import {
    CREATE_EDIT_IMPORT_PERMIT_CLEAR_STATE,
    CREATE_EDIT_IMPORT_PERMIT_FAILURE,
    CREATE_EDIT_IMPORT_PERMIT_REQUEST,
    CREATE_EDIT_IMPORT_PERMIT_STOP_LOADER,
    SUBMIT_IMPORT_PERMIT_SUCCESS
} from "./RenewalTreatmentTypeActionTypes";
import { IError } from "Lib/Types/SharedTypes";
import service from "./RenewalTreatmentTypeService";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import { clearAlert, errorAlert, successAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import swal from "sweetalert";
import { GetTreatmentTypeByProviderIdAction } from "Modules/TPM/Common/CommonApi/CommonApiAction";

// 
export const GetProvidersAction = (
    req: any,
    callback: any
) => async (dispatch: Dispatch<any>) => {
    try {
    let getTreatmentTypeByProviderId =   await  GetTreatmentTypeByProviderIdAction(req, callback)(dispatch);


    } catch (e:any) {
        const message: IMessage = {
            code: e?.code ? e?.code : "500",
            description: e?.description ? e?.description : "Some error occurred."
        };
        callback(message);
        dispatch(errorAlert(message));
        dispatch(failure(e));
    }
};
// Submit TP Registration Action
export const submitTPRegistrationAmendmentAction = (
    submitReq: ISubmitPremiseRegistrationRequest,
    callback: any
) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        dispatch(clearAlert({ code: "", description: "" }));

       const submitRes:ISubmitPremiseRegistrationResponse  = await service.submitPremiseAmendmentFormService(submitReq);
       const {data, message}=submitRes;

        if(submitRes){
            callback(submitRes);
        }
        dispatch(stopLoader());

    } catch (e:any) {
        const message: IMessage = {
            code: e?.code ? e?.code : "500",
            description: e?.description ? e?.description : "Some error occurred."
        };
        callback(message);
        dispatch(errorAlert(message));
        dispatch(failure(e));
    }
};

// Submit TP Registration Action
export const submitTreatmentTypeRegistrationAction = (
    submitReq: any,//ISubmitPremiseRegistrationRequest,
    callback?: any
) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        dispatch(clearAlert({ code: "", description: "" }));

       const submitRes:ISubmitPremiseRegistrationResponse  = await service.submitTreatmentTypeRegistrationService(submitReq);
       const {data, message}=submitRes;

        if(submitRes){
            callback(submitRes);

        }
        dispatch(stopLoader());

    } catch (e:any) {
        const message: IMessage = {
            code: "500",
            description: "Some error occurred."
        };
        
        swal({
            title: resources_EN.sweet_Alert_title_Failed,
            text: (e?.status == ApplicationCodes.BAD_REQUEST)
                ? e?.data
                : message.description,
            icon: "error",
        });
        dispatch(errorAlert(message));
        dispatch(failure(e));
    }
};

// draft Action
export const draftTPRegistrationAction = (
    req: Interfaces.ISaveTreatmentTypeRegistrationReq,
    submitReq: ISubmitImportPermitRequest,
    callback: any
) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        dispatch(clearAlert({ code: "", description: "" }));
        //const response: ISaveImportPermitResponse = await service.saveImportPermit(req);
        // console.log(response);

        const submitRes: ISubmitImportPermitResponse = await service.draftImportPermit(submitReq);
        dispatch(stopLoader());
        callback(submitRes);
    } catch (e:any) {
        const message: IMessage = {
            code: "500",
            description: "Some error occurred."
        };
        dispatch(errorAlert(message));
        dispatch(failure(e));
    }
};

// Save Action
export const saveTreatmentTypeRegistrationAction = (
    req: any, // Interfaces.ISaveTreatmentTypeRegistrationReq, 
    callback?: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        dispatch(clearAlert({ code: "", description: "" }));
        const response: any = await service.saveTreatmentTypeRegistration(req);

        dispatch(stopLoader());
        dispatch(saveTreatmentTypeRegistrationSuccess(response?.data));
        if(callback){
            callback(response);
        }
        
    } catch (e:any) {
        if(callback){
            callback(e);
        }
        const message: IMessage = {
            code: "500",
            description: "Some error occurred while saving"
        };
        dispatch(errorAlert(message));
        dispatch(failure(e));
    }
};

// Save Action
export const deleteTreatmentTypeRegistrationAction = (
    req: any, // Interfaces.ISaveTreatmentTypeRegistrationReq, 
    callback?: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        dispatch(clearAlert({ code: "", description: "" }));
        const response: ISaveImportPermitResponse = await service.deleteTreatmentTypeRegistration(req);
        dispatch(stopLoader());
        if(callback){
            callback(response);
        }
    } catch (e:any) {
        const message: IMessage = {
            code: "500",
            description: "Some error occurred while deleting treatment type"
        };
        dispatch(errorAlert(message));
        dispatch(failure(e));
    }
};

export const ConfirmStep1Action = (req: any, callBack?:any) => async (dispatch: Dispatch<Interfaces.ICreateEditTPRegistrationFormReducerTypes>) => {
    try {
       // dispatch(request());
        let response: any = await service.confirmRegisteredTreatmentTypesService(req);
        dispatch(confirmRegisteredTreatmentTypesSuccess(response?.data));
       // dispatch(successAlert(response?.message));
        if(callBack){
            callBack(response?.data)
        }
    } catch (e:any) {
        if(callBack){
            callBack(e)
        }
       // dispatch(errorAlert(e));
        //dispatch(failure(e));
    }
};


export const submitRenewalTreatmentTypeAction = (req: any, callBack?:any) => async (dispatch: Dispatch<Interfaces.ICreateEditTPRegistrationFormReducerTypes>) => {
    try {
       // dispatch(request());
        let response: any = await service.submitRenewalTreatmentTypeDataService(req);
        dispatch(submitRenewalTreatmentTypeData(response?.data));
       // dispatch(successAlert(response?.message));
        if(callBack){
            callBack(response?.data)
        }
    } catch (e:any) {
        if(callBack){
            callBack(e)
        }
       // dispatch(errorAlert(e));
        //dispatch(failure(e));
    }
};


// Request Action
const request = (): RequestType => {
    return {
        type: CREATE_EDIT_IMPORT_PERMIT_REQUEST
    };
};

// Failure Action
const failure = (error: IError): FailureType => {
    return {
        type: CREATE_EDIT_IMPORT_PERMIT_FAILURE,
        payload: error
    };
};

// Stop Loader Action
const stopLoader = (): StopLoaderType => {
    return {
        type: CREATE_EDIT_IMPORT_PERMIT_STOP_LOADER
    };
};

// Submit Import Permit Success Action
export const submitImportPermitSuccess = (response: IGenerateVoucherResponse): ISubmitImpPermSuccessType => {
    return {
        type: SUBMIT_IMPORT_PERMIT_SUCCESS,
        payload: response
    };
};

//confirm Success Action
export const confirmRegisteredTreatmentTypesSuccess = (response: any): Interfaces.IConfirmedSuccessType => {
    return {
        type: ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_SUCCESS,
        payload: response
    };
};

//confirm Success Action
export const saveTreatmentTypeRegistrationSuccess = (response: any): Interfaces.ISaveSuccessType => {
    return {
        type: ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_SUCCESS,
        payload: response
    };
};

// Clear State Action
export const clearReducerState = (): IClearStateType => {
    return {
        type: CREATE_EDIT_IMPORT_PERMIT_CLEAR_STATE
    };
};

export const clearConfirmReducerState = (): Interfaces.IConfirmedClearStateType => {
    return {
        type: ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_CLEAR_STATE
    };
};
// Save Action
export const saveTreatmentTypeLicenseGridDataAction = (data:any[]): Interfaces.ISaveTreatmentTypeLicenseGridDataType => {
    return {
        type: ActionType.SAVE_TREATMENT_LICENSE_GRID_DATA,
        payload: data
    };
};
export const deleteTreatmentTypeLicenseGridDataAction = (data:any): Interfaces.IDeleteTreatmentTypeLicenseGridDataType => {
    return {
        type: ActionType.DELETE_TREATMENT_LICENSE_GRID_DATA,
        payload: data
    };
};
// Clear State Action
export const saveTreatmentTypeLicenseGridDataClearAction = (): Interfaces.ISaveTreatmentTypeLicenseGridClearDataType => {
    return {
        type: ActionType.SAVE_TREATMENT_LICENSE_GRID_DATA_CLEAR
    };
};

// Submit Form Data Action 
export const submitRenewalTreatmentTypeData = (data:any):Interfaces.ISubmitRenewalTreatmentTypeData =>{
    return {
        type:ActionType.SUBMIT_RENEWAL_TREATMENT_TYPE_DATA,
        payload:data
    }
}
