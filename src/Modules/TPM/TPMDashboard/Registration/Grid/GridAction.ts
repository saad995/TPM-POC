import * as ActionType from "./GridActionTypes";

import {
    FailureType,
    IGetSuccessDNFType,
    IGetSuccessType,
    ICatchCertificateListResponseData,
    getAllTreatmentProviderRegistrationTypes,
    RequestType,
    ITreatmentProviderRegistrationClearType
} from "./GridInterfaces";
import { Dispatch } from "redux";

import service from "./GridService";
import userRightsService from "Modules/TPM/Common/UserRights/UserRightService";
import { IError, Role } from "Lib/Types/SharedTypes";
import moment from "moment";
import Config from "Config";
import { IUserRightsRequestData } from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
import { DocumentClassificationCode } from "Modules/TPM/Constants/Interfaces";
import _ from "lodash";

const mapCatchCertificateData = (responseData: any) => {
    let mappedResponse = responseData.map((item: any, index:any) => {
      
        return {
            ...item,
            // name: !item.agentSubscriptionId ? `${item.traderName}` : `${item.traderName}/${item.agentName}`,
            // requestDocumentNumber: item.requestDocumentNumber,
            // assignedDate: item.submittedOn ? moment(new Date(item.submittedOn)).format(Config.DateFormat) : "",
            // age: item.age,
            // sdNumber: item.sdNumber,
            // sdID: item.sdID,
            // status: item.status,
            // certificateNumber: item.certificateNumber,
            // requestDocumentTypeCode: item.requestDocumentTypeCode,
            // statusId: item.statusId,
            // catchCertificateId: item.catchCertificateId,
            sno: index + 1,
            principalActivity: _.isEmpty(item.principalActivity) ? '-' :  item.principalActivity,
            status: item.statusName,
        };
    });

   // console.log(mappedResponse);
    return mappedResponse;
};

const getDataAndCheckForRights = async (rightsReq: IUserRightsRequestData, req:any) => {
    const {roleCode} = rightsReq;
    const {purposeId} = req;

    let response: any = {};
    response.data = '';

    // if (roleCode !== Role.Trader && roleCode !== Role.CustomAgent) {
    //     response = await userRightsService.userRightsService(req);
    //     console.log("Rights: ", response.data);
    // }

    let responseData: any;
    if (response?.data) {
        responseData = await service.GetAllRegistrations({
            roleCode: roleCode,
            rights: response.data,
            purposeId
        });
    } else {
        responseData = await service.GetAllRegistrations({
            roleCode: roleCode,
            purposeId,
            rights: ""
        });
    }

    return responseData;
};

//Get the list of all import permits
export const getAllTreatmentProviderRegistrationAction = (req:any, callBack: any) => async (
    dispatch: Dispatch<getAllTreatmentProviderRegistrationTypes>
) => {
    try {
        const rightsReq: IUserRightsRequestData = {
            documentClassificationCode: DocumentClassificationCode.TREATMENT_PROVIDER.toString(),
            roleCode: req.userRole
        };
        dispatch(request());

        let responseData = await getDataAndCheckForRights(rightsReq, req);
        let mappedResponse: any = mapCatchCertificateData(responseData);
        if (mappedResponse && mappedResponse.length > 0) dispatch(GetListSuccess(mappedResponse));
        else dispatch(GetListDataNotFoundSuccess());
    } catch (e) {
        dispatch(failure(e))
        dispatch(GetListDataNotFoundSuccess());
    }
};


// Request action
const request = (): RequestType => {
    return {
        type: ActionType.TPM_REGISTRATION_GRID_REQUEST
    };
};

// Failure action
const failure = (error: IError): FailureType => {
    return {
        type: ActionType.TPM_REGISTRATION_GRID_FAILURE,
        payload: error
    };
};

//Get List success action
const GetListSuccess = (responseDate: ICatchCertificateListResponseData[]): IGetSuccessType => {
    //action
    return {
        type: ActionType.TPM_REGISTRATION_GRID_SUCCESS,
        payload: responseDate
    };
};
// Get List success action
const GetListDataNotFoundSuccess = (): IGetSuccessDNFType => {
    //action
    return {
        type: ActionType.TPM_REGISTRATION_LIST_SUCCESS_DNF
    };
};

export const ClearGetAllTreatmentProviderRegistrations = (): ITreatmentProviderRegistrationClearType => {
    return {
        type: ActionType.TPM_REGISTRATION_GRID_CLEAR
    };
};
