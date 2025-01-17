import {
    RELEASE_ORDER_CLEAR_STATE,
    TPM_Form22_History_FAILURE,
    TPM_Form22_History_REQUEST,
    TPM_Form22_History_SUCCESS
} from "./Form-22-TreatmentProviderHistoryActionTypes";


import {
    IClearStateType,
    ITPMForm22HistoryFailureType,
    ITPMForm22HistoryRequestData,
    ITPMForm22HistoryRequestType,
    ITPMForm22HistorySuccessType,
    ITPMForm22ResponseData,
    ReleaseOrderViewActionTypes
} from "./Form-22-TreatmentProviderHistoryInterfaces";

import { IErrorType, Role } from "Lib/Types/SharedTypes";
import { Dispatch } from "redux";

import rightService from "Modules/TPM/Common/UserRights/UserRightService";
import { GET_USER_RIGHTS_FAILURE } from "Modules/TPM/Common/UserRights/UserRightsActionTypes";
import {
    IUserRightsFailureType,
    IUserRightsRequestData
} from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
import { ApplicationCodes } from "Modules/Common/Constants/Interfaces";
import service from "./Form-22-TreatmentProviderHistoryServices";
/************************** Actions Creators************************/

//Get TPM Form 22 History
export const getTPMForm22HistoryAction = (data: ITPMForm22HistoryRequestData) => async (
    dispatch: Dispatch<ReleaseOrderViewActionTypes>
) => {
    try {
        dispatch(TPMForm22HistoryRequest());

        const rightsReqData: IUserRightsRequestData = {
            documentTypeCode: data.initDocumentTypeCode,
            roleCode: data.roleCode,
            documentId: Number(data.initDocumentID)
        };
        ;
        const rightsResponse = await rightService.userRightsService(rightsReqData);
        ;
        if (
            rightsResponse.data == "" &&
            data.roleCode != Role.CustomAgent &&
            data.roleCode != Role.DeputyDirector &&
            data.roleCode != Role.Trader &&
            data.roleCode != Role.TreatmentProvider &&
            data.roleCode != Role.RODeputyDirector
        ) {
            const error = { code: ApplicationCodes.UNAUTHORIZED, description: "" };
            debugger;
            dispatch(RightsFailure(error));
        } else {
            debugger;
          
            const reqData:ITPMForm22HistoryRequestData = {
                rights: rightsResponse.data,
                initDocumentTypeCode: data.initDocumentTypeCode,
                initDocumentID: Number(data.initDocumentID),
                roleCode: data.roleCode
            }

            let response = await service.getTPMForm22HistoryService(reqData);
            
       
           // const userRoleIds: string[] = [];
            let responseData: ITPMForm22ResponseData = {} as ITPMForm22ResponseData;
            responseData.history =  response?.data?.history;

            //Amendment called documentAttachments History
            // if (responseData && responseData?.history?.length > 0) {
            //     responseData.history?.map((document: any) => {
            //         // ;
            //         userRoleIds.push(document.actedBy);
            //     });

            //     // ;
            //     if (responseData.rejectedBy && userRoleIds.filter((x) => x == responseData.rejectedBy).length === 0)
            //         userRoleIds.push(responseData.rejectedBy);
            //     if (userRoleIds.length > 0) {
            //         let data: IPersonNameByUserRoleId[] = await getPersonNameByUserRoleIdService.getPersonName({
            //             userRoleIds: userRoleIds
            //         });
            //         const rejecterName = data.filter((x) => x.userRoleId == responseData.rejectedBy);
            //         if (rejecterName.length > 0) responseData.rejectedByName = rejecterName[0].personName;

            //         responseData.history.map((document: any) => {
            //             const actorName = data.filter((x) => x.userRoleId == document.actedBy);
            //             if (actorName.length > 0) document.actedByName = actorName[0].personName;
            //         });
            //     } else {
            //         responseData.rejectedByName = "";
            //     }
            // }

            dispatch(TPMForm22HistorySuccess(responseData));
            
        }
    } catch (e: any) {
        dispatch(TPMForm22Historyfailure(e));
    }
};

/************************** Actions ************************/


const TPMForm22HistoryRequest = (): ITPMForm22HistoryRequestType => {
    return {
        type: TPM_Form22_History_REQUEST
    };
};
//Get GD Info  success action
const TPMForm22HistorySuccess = (responseDate: ITPMForm22ResponseData): ITPMForm22HistorySuccessType => {
    //action
    return {
        type: TPM_Form22_History_SUCCESS,
        payload: responseDate
    };
};
// Failure action
const TPMForm22Historyfailure = (error: IErrorType): ITPMForm22HistoryFailureType => {
    return {
        type: TPM_Form22_History_FAILURE,
        payload: error
    };
};

// Clear State Action
export const clearReducerState = (): IClearStateType => {
    return {
        type: RELEASE_ORDER_CLEAR_STATE
    };
};
//Failure action
const RightsFailure = (error: IErrorType): IUserRightsFailureType => {
    return {
        type: GET_USER_RIGHTS_FAILURE,
        payload: error
    };
};
