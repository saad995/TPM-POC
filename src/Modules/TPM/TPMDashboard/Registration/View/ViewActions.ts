import { IFileDetails } from "Elements/Basic/File/FileTypes";
import fileService from "Elements/Basic/File/FileService";
import getPersonNameByUserRoleIdService from "Modules/TPM/Common/GetPersonNameByUserRoleId/GetPersonNameByUserRoleIdServices";
import { IPersonNameByUserRoleId } from "Modules/TPM/Common/GetPersonNameByUserRoleId/GetPersonNameByUserRoleIdInterfaces";
import { IError, IErrorType, Role } from "Lib/Types/SharedTypes";
import {
    CATCH_CERTIFICATE_VIEW_FAILURE,
    CATCH_CERTIFICATE_VIEW_REQUEST,
    CATCH_CERTIFICATE_VIEW_STOP_LOADER,
    CATCH_CERTIFICATE_VIEW_SUCCESS,
    INDEPENDENT_CATCH_CERTIFICATE_VIEW_SUCCESS,
    CHANGE_CATCH_CERTIFICATE_STATUS_SUCCESS,
    CATCH_CERTIFICATE_SD_VIEW_SUCCESS
} from "./ViewActionTypes";
import {
    FailureType,
    ICatchCertificateForIndependentViewSuccessType,
    ICatchCertificateViewSuccessType,
    CatchCertificateViewActionTypes,
    IViewRequestData,
    IViewResponseData,
    RequestType,
    StopLoaderType,
    IChangeCatchCertificateStatusResponseData,
    IChangeCatchCertificateStatusSuccessType,
    IViewSDResponseData,
    ICatchCertificateSDViewSuccessType,
    IUpdateCatchCertificateStatusRequestData,
    IViewSDData
} from "./ViewInterfaces";
import { Dispatch } from "redux";
import service from "./ViewServices";
import {
    IUserRightsFailureType,
    IUserRightsRequestData,
    IUserRightsResponseData
} from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
import { DocumentClassificationCode, DocumentInfo, CatchCertificateStatus } from "Modules/TPM/Constants/Interfaces";
import userRightsService from "Modules/TPM/Common/UserRights/UserRightService";
import Config from "Config";
import moment from "moment";
import { GET_USER_RIGHTS_FAILURE } from "Modules/TPM/Common/UserRights/UserRightsActionTypes";
import rightService from "Modules/TPM/Common/UserRights/UserRightService";

const mapSDResponseDataData = (responseData: any) => {
    let mappedResponse : IViewSDResponseData = {
        sdID: responseData.sdID,
        consigneeName: responseData.consigneeName,
        consigneeAddress: responseData.consigneeAddress,
        phoneNumber: responseData.phoneNumber,
        sdNumber: responseData.sdNumber,
        processor: responseData.processor,
        singleConsignmentWeight: responseData.singleConsignmentWeight,
        weight: responseData.weight,
        fishSpecies:responseData.items[0].fishSpecies,
        cartons: responseData.items[0].cartons,
        dateOfShipment: responseData.items[0].dateOfShipment ? moment(responseData.items[0].dateOfShipment).format(Config.DateFormat) : '-',
        nameOfFisheryProduct: responseData.items[0].nameOfFisheryProduct,
        hsCode: responseData.items[0].hsCode
    };
    return mappedResponse;
};

// Import Permit In View Mode
export const ViewCatchCertificateAction = (data: IViewRequestData, callback: any) => async (
    dispatch: Dispatch<CatchCertificateViewActionTypes>
) => {
    try {
        dispatch(request());
        const req: IUserRightsRequestData = {
            documentClassificationCode: DocumentClassificationCode.CATCH_CERTIFICATE.toString(),
            roleCode: data.roleCode,
            documentId: Number(data.catchCertificateId),
        };
        

        let responseData: IViewResponseData;
        let sdResposneData: IViewSDData;
        let mappedResponse: IViewSDResponseData;
        if (data.roleCode !== Role.Trader && data.roleCode !== Role.CustomAgent) {
            const response = await userRightsService.userRightsService(req);
            console.log("Rights: ", response.data);

            if (response?.data) {
                data.rights = response.data;
                responseData = await service.getCatchCertificateByID(data);
                sdResposneData = await service.getCatchCertificateBySDID(data);
                mappedResponse = mapSDResponseDataData(sdResposneData);

            } else {
                //in case the role is DD and IP status = Rejected then DD can view the IP details and approve
                // try{
                data.rights = "";
                responseData = await service.getCatchCertificateByID(data);
                sdResposneData = await service.getCatchCertificateBySDID(data);
                mappedResponse = mapSDResponseDataData(sdResposneData);
                // }catch(e)
                // {
                //         dispatch(stopLoader());
                //         callback();
                //         return;
                // }
            }
        } else {
            data.rights = "";
            responseData = await service.getCatchCertificateByID(data);
            sdResposneData = await service.getCatchCertificateBySDID(data); 
            //mappedResponse = mapSDResponseDataData(sdResposneData); 
            
        }
        // console.log("responseDatass",responseData)
        if (!responseData || !sdResposneData || !responseData.catchCertificateStatusID) {  
            dispatch(stopLoader());
            callback();
            return;
        }
        
        
        responseData.date = responseData.date ? moment(responseData.date).format(Config.DateFormat) :responseData.date;
        sdResposneData.items = sdResposneData.items.map((item:any) =>{
            return{
                hsCode: item.hsCode,
                nameOfFisheryProduct: item.nameOfFisheryProduct,
                dateOfShipment: item.dateOfShipment ? moment(item.dateOfShipment).format(Config.DateFormat) : '-', 
                cartons: item.cartons,
                fishSpecies: item.fishSpecies
                
            }

        });

        responseData.vessels.forEach((vessel) => {
            vessel.dateOfLadding = vessel.dateOfLadding ? moment(vessel.dateOfLadding).format(Config.DateFormat) :'-'
        });
         

        dispatch(ViewCatchCertificateSuccess(responseData));
        dispatch(ViewCatchCertificateSDSuccess(sdResposneData));
    } catch (e) {
        dispatch(failure(e));
        callback();
    }
};

export const updateCatchCertificateStatusAction = (
    data: IUpdateCatchCertificateStatusRequestData,
    callback: any
) => async (dispatch: Dispatch<CatchCertificateViewActionTypes>) => {
    try {
        // dispatch(request());
        // await service.updateCatchCertificateStatus(req);
        // dispatch(stopLoader());
        // callback();
        dispatch(request());
        const req: IUserRightsRequestData = {
            documentClassificationCode: DocumentClassificationCode.CATCH_CERTIFICATE.toString(),
            roleCode: data.roleCode,
            documentId: Number(data.initDocumentId)
        };

        let responseData: IChangeCatchCertificateStatusResponseData;

        if (data.roleCode !== Role.Trader && data.roleCode !== Role.CustomAgent) {
            const response = await userRightsService.userRightsService(req);
            console.log("Rights: ", response.data);

            if (response?.data) {
                data.rights = response.data;
                responseData = await service.updateCatchCertificateStatus(data);
            } else {
                //in case the role is DD and IP status = Rejected then DD can view the IP details and approve
                // try{
                data.rights = "";
                responseData = await service.updateCatchCertificateStatus(data);

                // }catch(e)
                // {
                //         dispatch(stopLoader());
                //         callback();
                //         return;
                // }
            }
        } else {
            data.rights = "";
            responseData = await service.updateCatchCertificateStatus(data);
        }
        if (responseData.code == 200) {
            dispatch(ChangeExportCertificateStatusSuccess(responseData));
        }
        dispatch(stopLoader());
        callback(responseData);
    } catch (e) {
        dispatch(failure(e));
    }
};


// Request action
const request = (): RequestType => {
    return {
        type: CATCH_CERTIFICATE_VIEW_REQUEST
    };
};

// Failure action
const failure = (error: IError): FailureType => {
    return {
        type: CATCH_CERTIFICATE_VIEW_FAILURE,
        payload: error
    };
};

const stopLoader = (): StopLoaderType => {
    return {
        type: CATCH_CERTIFICATE_VIEW_STOP_LOADER
    };
};

// Get import Permit Details by ID
const ViewCatchCertificateSuccess = (responseDate: IViewResponseData): ICatchCertificateViewSuccessType => {
    //action
    return {
        type: CATCH_CERTIFICATE_VIEW_SUCCESS,
        payload: responseDate
    };
};

const ViewCatchCertificateSDSuccess = (responseDate: IViewSDData): ICatchCertificateSDViewSuccessType => {
    //action
    return {
        type: CATCH_CERTIFICATE_SD_VIEW_SUCCESS,
        payload: responseDate
    };
};

//Change Seed Enlistment Status success action
const ChangeExportCertificateStatusSuccess = (
    responseDate: IChangeCatchCertificateStatusResponseData
): IChangeCatchCertificateStatusSuccessType => {
    //action
    return {
        type: CHANGE_CATCH_CERTIFICATE_STATUS_SUCCESS,
        payload: responseDate
    };
};
//Failure action
const rightsFailure = (error: IErrorType): IUserRightsFailureType => {
    return {
        type: GET_USER_RIGHTS_FAILURE,
        payload: error
    };
};
