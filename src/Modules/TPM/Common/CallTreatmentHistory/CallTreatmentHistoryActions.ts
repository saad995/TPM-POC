import {
    CHANGE_ITEMWISE_STATUS_SUCCESS,
    CHANGE_RELEASE_ORDER_STATUS_SUCCESS,
    RELEASE_ORDER_CLEAR_STATE,
    RELEASE_ORDER_DETAILED_VIEW_SUCCESS,
    RELEASE_ORDER_RIGHTS_SUCCESS,
    RELEASE_ORDER_VIEW_FAILURE,
    RELEASE_ORDER_VIEW_PHYSICAL_INSPECTION_SUCCESS,
    RELEASE_ORDER_VIEW_REQUEST,
    RELEASE_ORDER_VIEW_SUCCESS,
    TPM_CallTreatment_History_FAILURE,
    TPM_CallTreatment_History_REQUEST,
    TPM_CallTreatment_History_SUCCESS
} from "./CallTreatmentHistoryActionTypes";

import { IFileDetails } from "Elements/Basic/File/FileTypes";

import {
    FailureType,
    IChangeReleaseOrderStatusRequestData,
    IChangeReleaseOrderStatusResponseData,
    IChangeReleaseOrderStatusSuccessType,
    IViewPhysicalInspectionSuccessType,
    IReleaseOrderDetailedViewSuccessType,
    IReleaseOrderViewSuccessType,
    IViewDetailRequestData,
    IGetPhysicalInspectionRequestData,
    IViewDetailResponseData,
    IViewRequestData,
    IViewResponseData,
    ReleaseOrderViewActionTypes,
    RequestType,
    IViewPhysicalInspectionResponseData,
    IClearStateType,
    IChangeItemWiseStatusResponseData,
    IChangeItemWiseStatusSuccessType,
    Commodity,
    IReleaseOrderRightsSuccessType,
    ITPMCallTreatmentHistorySuccessType,
    ITPMCallTreatmentHistoryRequestType,
    ITPMCallTreatmentHistoryFailureType,
    ITPMCallTreatmentHistoryRequestData,
    ITPMCallTreatmentResponseData
} from "./CallTreatmentHistoryInterfaces";

import { IError, IErrorType, Role } from "Lib/Types/SharedTypes";
import { Dispatch } from "redux";

import fileService from "Elements/Basic/File/FileService";
import service from "./CallTreatmentHistoryServices";
import { IPersonNameByUserRoleId } from "Modules/TPM/Common/GetPersonNameByUserRoleId/GetPersonNameByUserRoleIdInterfaces";
import getPersonNameByUserRoleIdService from "Modules/TPM/Common/GetPersonNameByUserRoleId/GetPersonNameByUserRoleIdServices";
import {
    IUserRightsFailureType,
    IUserRightsRequestData,
    IUserRightsResponseData
} from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
import { ApplicationCodes, DocumentInfo } from "Modules/Common/Constants/Interfaces";
import rightService from "Modules/TPM/Common/UserRights/UserRightService";
import { GET_USER_RIGHTS_FAILURE } from "Modules/TPM/Common/UserRights/UserRightsActionTypes";
import getTreatmentPersonNameByDocTypeCodeServices from "Modules/TPM/Common/GetPersonNameByUserRoleId/GetPersonNameByUserRoleIdServices";
import { debug } from "console";
import _ from 'lodash'

/************************** Actions Creators************************/
//get officer name from ums
export const getOfficerNameAction = async (responseData: any) => {
    try {

        const userRoleIds: string[] = [];

        // History
        if (responseData && responseData?.history?.length > 0) {
            responseData.history?.map((document: any) => {
                userRoleIds.push(document?.createdByS);
            });

            if (userRoleIds.length > 0) {
                let data: IPersonNameByUserRoleId[] = await getPersonNameByUserRoleIdService.getPersonName({
                    userRoleIds: userRoleIds
                });

                responseData.history.map((document: any) => {
                    const actorName = data.find((x) => x.userRoleId == document.createdByS);
                    if (actorName) document.officerName = actorName?.personName;
                });
                return responseData;
            } else {
                return responseData;
            }
        }
    } catch (e) {
        console.error("fetch officer name error", e);
        return responseData;
    }
};

//get treatment officer name from ums
export const getTreatmentProviderNameAction = async (responseData: any) => {
    try {
        const userRoleIds: string[] = [];

        // History
        if (responseData && responseData?.history?.length > 0) {
            responseData.history?.map((document: any) => {
                userRoleIds.push(document?.treatmentProviderIDS);
            });

            if (userRoleIds.length > 0) {
            let data: any = await getTreatmentPersonNameByDocTypeCodeServices.GetTreatmentPersonNameByDocTypeCode({
                userRoleIds: userRoleIds,
                registrationTypeCode: DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE
            });

            responseData.history.map((document: any) => {
                const actorName:any = data.find((x:any) => x.userRoleId == document?.treatmentProviderIDS);
                if (data) document.treatmentProvider = actorName?.businessName ?? "N/A";
               //return document;
            });
            return responseData;
            } else {
                return responseData;
            }
        }
    } catch (e) {
        console.error("fetch treatment provider name error", e);
        responseData.history = responseData.history.map((document: any) => {
                 document.treatmentProvider = "N/A"
                 return document;
        });
        return responseData
    }
};
//Get TPM Form 22 History
export const getTPMCallTreatmentHistoryAction = (data: any) => async (
    dispatch: Dispatch<any>
) => {
    try {
        dispatch(TPMCallTreatmentHistoryRequest());
        const rightsReqData: IUserRightsRequestData = {
            documentTypeCode: data.initDocumentTypeCode,
            roleCode: data.roleCode,
            documentId: Number(data.initDocumentID)
        };
        const rightsResponse = await rightService.userRightsService(rightsReqData);
        if (
            rightsResponse.data == "" &&
            data.roleCode != Role.CustomAgent &&
            data.roleCode != Role.Trader &&
            data.roleCode != Role.DeputyDirector &&
            data.roleCode != Role.RODeputyDirector &&
            data.roleCode != Role.TreatmentProvider && 
            data.roleCode != Role.InspectionOfficer 
            ) {
                const error = { code: ApplicationCodes.UNAUTHORIZED, description: "" };
                dispatch(RightsFailure(error));
            } else {
                dispatch(request());
                const reqData:ITPMCallTreatmentHistoryRequestData = {
                    rights: rightsResponse.data,
                    initDocumentTypeCode: data.initDocumentTypeCode,
                    initDocumentID: Number(data.initDocumentID),
                    roleCode: data.roleCode
                }

                let response = await service.getTPMCallTreatmentHistoryService(reqData);  
                let responseData: ITPMCallTreatmentResponseData = {} as ITPMCallTreatmentResponseData;
                responseData.history =  response?.data?.history;
                responseData = await getOfficerNameAction(responseData);
                responseData = await getTreatmentProviderNameAction(responseData);
                dispatch(TPMCallTreatmentHistorySuccess(responseData));
            
        }
    } catch (e: any) {
        dispatch(TPMCallTreatmentHistoryfailure(e));
    }
};

//Release order basic information In View Mode
export const ViewReleaseOrderAction = (requestData: IViewRequestData) => async (
    dispatch: Dispatch<ReleaseOrderViewActionTypes>
) => {
    try {
        console.log(requestData);
        // dispatch(request());
        // var reqData: IUserRightsRequestData = {
        //     // documentTypeCode: DocumentInfo.RELEASE_ORDER_DOCUMENT_TYPE_CODE.toString(),
        //     documentTypeCode: data.documentTypeCode,
        //     roleCode: data.roleCode,
        //     documentId: data.releaseOrderId
        // };
        // const userRoleIds: string[] = [];
        // var rightsResponse = await rightService.userRightsService(reqData);
        // var rightsResponseData: IUserRightsResponseData = {
        //     data: rightsResponse.data
        // };

        const userRoleIds: string[] = [];

        // console.log("rightsResponse", rightsResponse);
        if (
            requestData.rights == "" &&
            requestData.roleCode != Role.CustomAgent &&
            requestData.roleCode != Role.Trader &&
            requestData.roleCode != Role.DeputyDirector &&
            requestData.roleCode != Role.RODeputyDirector
        ) {
            const error = { code: ApplicationCodes.UNAUTHORIZED, description: "" };
            // console.log("errssssor", error);
            dispatch(RightsFailure(error));
            return
        }


        dispatch(request());
        //data.rights = rightsResponseData.data;

        let response = await service.getReleaseOrderBasicinformationById(requestData);
        if (response.message.code == 200) {
            let responseData: IViewResponseData = response.data;
            responseData.releaseOrderDocumentHistory?.map((document: any) => {
                // ;
                userRoleIds.push(document.actedBy);
            });

            // ;
            if (responseData.rejectedBy && userRoleIds.filter((x) => x == responseData.rejectedBy).length === 0)
                userRoleIds.push(responseData.rejectedBy);
            if (userRoleIds.length > 0) {
                let data: IPersonNameByUserRoleId[] = await getPersonNameByUserRoleIdService.getPersonName({
                    userRoleIds: userRoleIds
                });
                const rejecterName = data.filter((x) => x.userRoleId == responseData.rejectedBy);
                if (rejecterName.length > 0) responseData.rejectedByName = rejecterName[0].personName;

                responseData.releaseOrderDocumentHistory.map((document: any) => {
                    const actorName = data.filter((x) => x.userRoleId == document.actedBy);
                    if (actorName.length > 0) document.actedByName = actorName[0].personName;
                });
            } else {
                responseData.rejectedByName = "";
            }

            dispatch(ViewReleaseOrderSuccess(responseData));
        } else {
            throw response.message;
        }
    } catch (e: any) {
        dispatch(ReleaseOrderViewfailure(e));
    }
};
//Release order Detailed information In View Mode
export const ViewReleaseOrderDetailsAction = (data: IViewDetailRequestData) => async (
    dispatch: Dispatch<ReleaseOrderViewActionTypes>
) => {
    try {
        dispatch(request());

        let response = await service.getGDInformationById(data);

        let responseData: IViewDetailResponseData = response.data;
        responseData.commodities.map((item: Commodity) => {
            item.quantity = Number(item.quantity).toFixed(2);
        });
        dispatch(ViewReleaseOrderDetailsSuccess(responseData));
    } catch (e: any) {
        dispatch(ReleaseOrderViewfailure(e));
    }
};

//Release order Detailed information In View Mode
export const ReleaseOrderRightsAction = (req: IUserRightsRequestData) => async (
    dispatch: Dispatch<ReleaseOrderViewActionTypes>
) => {
    try {
        dispatch(request());

        const rightsResponse = await rightService.userRightsService(req);

        const rightsResponseData: IUserRightsResponseData = {
            data: rightsResponse.data
        };

        dispatch(ReleaseOrderRightsSuccess(rightsResponseData));
    } catch (e:any) {
        dispatch(RightsFailure(e));
    }
};

//Change Status of Release Order
export const changeReleaseOrderStatusAction = (req: IChangeReleaseOrderStatusRequestData, callback: any) => async (
    dispatch: Dispatch<ReleaseOrderViewActionTypes>
) => {
    try {
        dispatch(request());
        // var reqData: IUserRightsRequestData = {
        //     documentTypeCode: req.initDocumentTypeCode,
        //     roleCode: req.roleCode
        // };
        // var rightsResponse = await rightService.userRightsService(reqData);
        // var rightsResponseData: IUserRightsResponseData = {
        //     data: rightsResponse.data
        // };
        if (req.rights == "" && req.roleCode != Role.CustomAgent && req.roleCode != Role.Trader) {
            if (req.roleCode == Role.DeputyDirector || req.roleCode === Role.RODeputyDirector) {
                //req.rights = rightsResponseData.data;
                let response = await service.changeReleaseOrderStatus(req);
                console.log("response", response);
                if (response.message.code == 200) {
                    let responseData: IChangeReleaseOrderStatusResponseData = response.message;
                    dispatch(ChangeReleaseOrderStatusSuccess(responseData));
                    callback(responseData);
                }
            } else {
                const error = { code: ApplicationCodes.UNAUTHORIZED, description: "" };
                dispatch(RightsFailure(error));
            }
        } else {
            //req.rights = rightsResponseData.data;

            let response = await service.changeReleaseOrderStatus(req);
            if (response.message.code == 200) {
                let responseData: IChangeReleaseOrderStatusResponseData = response.message;
                dispatch(ChangeReleaseOrderStatusSuccess(responseData));
            }
            callback(response);
        }
    } catch (e: any) {
        dispatch(ReleaseOrderViewfailure(e));
        callback(e);
    }
};

export const ViewPhysicalInspectionInfoAction = (requestData: IGetPhysicalInspectionRequestData) => async (
    dispatch: Dispatch<ReleaseOrderViewActionTypes>
) => {
    try {
        // dispatch(request());
        // var reqData: IUserRightsRequestData = {
        //     documentTypeCode: DocumentInfo.RELEASE_ORDER_DOCUMENT_TYPE_CODE.toString(),
        //     roleCode: data.roleCode,
        //     documentId: data.initDocumentID
        // };
        // var rightsResponse = await rightService.userRightsService(reqData);
        // var rightsResponseData: IUserRightsResponseData = {
        //     data: rightsResponse.data
        // };
        if (
            requestData.rights == "" &&
            requestData.roleCode != Role.CustomAgent &&
            requestData.roleCode != Role.Trader &&
            requestData.roleCode != Role.DeputyDirector &&
            requestData.roleCode != Role.RODeputyDirector &&
            requestData.roleCode != Role.RODeputyDirector
        ) {
            const error = { code: ApplicationCodes.UNAUTHORIZED, description: "" };
            dispatch(RightsFailure(error));
        } else {
            //data.rights = rightsResponseData.data;

            dispatch(request());

            let response = await service.ViewPhysicalInspectionInfo(requestData);
            const fileIds: string[] = [];
            let responseData: IViewPhysicalInspectionResponseData[] = response.data;
            const userRoleIds: string[] = [];

            responseData.map((document: any) => {
                document.attachments?.map((file: any) => {
                    fileIds.push(file.fileIds);
                });
                document.OfficerAttachments?.map((file: any) => {
                    fileIds.push(file.fileNestFileId);
                });
                if (document.requestBy && userRoleIds.filter((x) => x == document.requestBy).length === 0)
                    userRoleIds.push(document.requestBys);
                if (document.approvedBy && userRoleIds.filter((x) => x == document.approvedBy).length === 0)
                    userRoleIds.push(document.approvedBys);
                if (document.inspectedBy && userRoleIds.filter((x) => x == document.inspectedBy).length === 0)
                    userRoleIds.push(document.inspectedBys);
            });

            if (fileIds.length > 0) {
                let fileDetails: IFileDetails[] = await fileService.getFilesDetail(fileIds);
                response.data.map((document: any) => {
                    document?.attachments?.map((file: any) => {
                        const fileDetail = _.filter(fileDetails, ['fileId', file.fileId])
                        
                        if (fileDetail.length > 0) file.documentName = fileDetail[0].fileName;
                    });
                    document?.OfficerAttachments?.map((file: any) => {
                        const fileDetail = _.filter(fileDetails, ['fileId', file.fileId])

                        if (fileDetail.length > 0) file.documentName = fileDetail[0].fileName;
                    });
                });
            }
            if (userRoleIds.length > 0) {
                let data: IPersonNameByUserRoleId[] = await getPersonNameByUserRoleIdService.getPersonName({
                    userRoleIds: userRoleIds
                });

                response.data.map((document: any) => {
                    const assessorName = data.filter((x) => x.userRoleId == document.approvedBy);
                    if (assessorName.length > 0) document.assessorName = assessorName[0].personName;

                    const officerName = data.filter((x) => x.userRoleId == document.requestBy);
                    if (officerName.length > 0) document.officerName = officerName[0].personName;

                    const inspecterName = data.filter((x) => x.userRoleId == document.inspectedBy);
                    if (inspecterName.length > 0) document.inspecterName = inspecterName[0].personName;
                });
            }
            dispatch(ViewPhysicalInspectionSuccess(responseData));
        }
    } catch (e: any) {
        dispatch(ReleaseOrderViewfailure(e));
    }
};
// //Change Status of Release Order
// export const changeItemWiseStatusAction = (req: IChangeItemWiseStatusRequestData, callback: any) => async (
//     dispatch: Dispatch<ReleaseOrderViewActionTypes>
// ) => {
//     try {
//         dispatch(request());
//         let response = await service.changeItemWiseStatus(req);
//         if (response.message.code == 200) {
//             let responseData: IChangeItemWiseStatusResponseData = response.message;
//             dispatch(ChangeItemWiseStatusSuccess(responseData));
//             callback();
//         }
//     } catch (e) {
//         dispatch(failure(e));
//     }
// };
/************************** Actions ************************/

// Request action
const request = (): RequestType => {
    return {
        type: RELEASE_ORDER_VIEW_REQUEST
    };
};

// Failure action
const ReleaseOrderViewfailure = (error: IErrorType): FailureType => {
    return {
        type: RELEASE_ORDER_VIEW_FAILURE,
        payload: error
    };
};

//Get Basic Info  success action
const ViewReleaseOrderSuccess = (responseDate: IViewResponseData): IReleaseOrderViewSuccessType => {
    //action
    return {
        type: RELEASE_ORDER_VIEW_SUCCESS,
        payload: responseDate
    };
};
// Request action
const TPMCallTreatmentHistoryRequest = (): ITPMCallTreatmentHistoryRequestType => {
    return {
        type: TPM_CallTreatment_History_REQUEST
    };
};
//Get GD Info  success action
const TPMCallTreatmentHistorySuccess = (responseDate: ITPMCallTreatmentResponseData): ITPMCallTreatmentHistorySuccessType => {
    //action
    return {
        type: TPM_CallTreatment_History_SUCCESS,
        payload: responseDate
    };
};
// Failure action
const TPMCallTreatmentHistoryfailure = (error: IErrorType): ITPMCallTreatmentHistoryFailureType => {
    return {
        type: TPM_CallTreatment_History_FAILURE,
        payload: error
    };
};
const ReleaseOrderRightsSuccess = (responseData: IUserRightsResponseData): IReleaseOrderRightsSuccessType => {
    //action
    return {
        type: RELEASE_ORDER_RIGHTS_SUCCESS,
        payload: responseData
    };
};

//Get GD Info  success action
const ViewReleaseOrderDetailsSuccess = (
    responseDate: IViewDetailResponseData
): IReleaseOrderDetailedViewSuccessType => {
    //action
    return {
        type: RELEASE_ORDER_DETAILED_VIEW_SUCCESS,
        payload: responseDate
    };
};

//Change Release order Status success action
const ChangeReleaseOrderStatusSuccess = (
    responseDate: IChangeReleaseOrderStatusResponseData
): IChangeReleaseOrderStatusSuccessType => {
    //action
    return {
        type: CHANGE_RELEASE_ORDER_STATUS_SUCCESS,
        payload: responseDate
    };
};
//Change Release order Status Item Wise success action
const ChangeItemWiseStatusSuccess = (
    responseDate: IChangeItemWiseStatusResponseData
): IChangeItemWiseStatusSuccessType => {
    //action
    return {
        type: CHANGE_ITEMWISE_STATUS_SUCCESS,
        payload: responseDate
    };
};
const ViewPhysicalInspectionSuccess = (
    responseDate: IViewPhysicalInspectionResponseData[]
): IViewPhysicalInspectionSuccessType => {
    //action
    return {
        type: RELEASE_ORDER_VIEW_PHYSICAL_INSPECTION_SUCCESS,
        payload: responseDate
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
