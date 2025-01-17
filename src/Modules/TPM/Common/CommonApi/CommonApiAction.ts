import { Dispatch } from "react";
import * as ActionType from "./CommonApiActionTypes";

import { errorAlert, infoAlert, successAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import { IError } from "Elements/Types/SharedTypes";
import { BasicFailureType, BasicLoadingRequestType, BasicRequestType } from "Layouts/AppLayout/AppLayoutInterfaces";
import service from "./CommonApiServices";
import { stepAction } from "Modules/Common/Actions/SubscriptionActions";
import rightService from "Modules/TPM/Common/UserRights/UserRightService";
import {rightsFailure} from "Modules/TPM/Common/UserRights/UserRightsActions";
import { IUserRightsRequestData } from "../UserRights/UserRightsInterfaces";
import { Role } from "Lib/Types/SharedTypes";
import { ApplicationCodes } from "Modules/Common/Constants/Interfaces";
import { Agency } from "Modules/TPM/Constants/Interfaces";
import { getCities_customUse } from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestAction";
import Paths from "Modules/TPM/Constants/Paths";
import { treatmentTypeFormDataMapping } from "./CommonResponseDataMapper";
import {createEditTreatmentOnBoardDataAction} from "Elements/Custom/FormGenerator/FormGeneratorAction";
import _ from "lodash";
import { subTypeDocumentCode, treatmentTypeProperties, } from "Modules/TPM/TPMDashboard/Registration/CreateEditTPMRegistration/CreateEditTPMRegistrationInterfaces";

// Request Action
const request = (): BasicRequestType => {
    return {
        type: ActionType.BASIC_INFO_REQUEST
    };
};
const baseLoadingState = (): BasicLoadingRequestType => {
    return {
        type: ActionType.SET_IS_LOADING
    };
};
// Failure Action
const failure = (error: IError): BasicFailureType => {
    return {
        type: ActionType.BASIC_INFO_FAILURE,
        payload: error
    };
};

// Get All Agency Success Action
export const getRegisteredAgencyListData = (response: []): {} => {
    return {
        type: ActionType.GET_AGENCY_DATA,
        payload: response
    };
};
// * getTreatmentType action
export const getTreatmentType = (response: any): any => {
    return {
        type: ActionType.GET_TREATMENT_TYPE,
        payload: response
    };
};

export const getShedLocationDataListAction = (response: any): any => {
    return {
        type: ActionType.GET_SHED_LOCATION_DATA_LIST,
        payload: response
    };
};

export const getTreatmentProvider = (response: any): any => {
    return {
        type: ActionType.GET_TREATMENT_PROVIDER,
        payload: response
    };
};

export const getSiteListDataByAgency = (response: []): {} => {
    return {
        type: ActionType.GET_SITE_DATA,
        payload: response
    };
};

export const getCitiesListDataByAgency = (response: []): {} => {
    
    return {
        type: ActionType.GET_CITY_DATA,
        payload: response
    };
};
export const getCountryListData = (response: []): {} => {
    
    return {
        type: ActionType.GET_COUNTRY_DATA,
        payload: response
    };
};
export const getCountryIncludingPakListData = (response: []): {} => {
    
    return {
        type: ActionType.GET_COUNTRY_INCLUDING_PAK_DATA,
        payload: response
    };
};
export const getImporterListDetails = (response: []): {} => {
    
    return {
        type: ActionType.GET_IMPORTER_DATA,
        payload: response
    };
};
export const getHSCodeListDetails = (response: []): {} => {
    
    return {
        type: ActionType.GET_HS_CODE_INFO,
        payload: response
    };
};

export const setHscodeLoaderAction = (flag: boolean): {} => {
    
    return {
        type: ActionType.SET_HSCODE_LOADER,
        payload: flag
    };
};

export const getPortOfLoadingAction = (response: []): {} => {
    
    return {
        type: ActionType.GET_PORT_OF_LOADING,
        payload: response
    };
};

export const getTreatmentSubTypesAction = (response: []): {} => {
    
    return {
        type: ActionType.GET_SUB_TREATMENT_TYPES,
        payload: response
    };
};

export const getUomByHsCodeAction = (response: []): {} => {
    
    return {
        type: ActionType.GET_UOM_BY_HS_CODE,
        payload: response
    };
};

export const setInitateRequestResponse = (res: any) => {
    return {
        type: ActionType.SAVE_INITIATE_FORM_RESPONSE,
        payload: res
    };
};

export const getAgencies = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: [] = await service.getRegisteredAgencyList(req);
        dispatch(getRegisteredAgencyListData(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

// export const getPortOfLoadingListData = (req: any) => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(request());
//         let response: any = await service.getPortOfLoadingService(req);
//         dispatch(getPortOfLoadingAction(response));
//     } catch (e:any) {
//         dispatch(failure(e));
//     }
// };

// export const getCities = (req: any) => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(request());
//         let response: any = await service.getCitiesListByAgencyId(req);
        
//         dispatch(getCitiesListDataByAgency(response));
//     } catch (e:any) {
//         dispatch(failure(e));
//     }
// };
// export const getCountries = (req: any) => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(request());
//         let response: any = await service.getCountryList(req);
        
//         dispatch(getCountryListData(response));
//     } catch (e:any) {
//         dispatch(failure(e));
//     }
// };
// export const getCountriesIncludingPak = (req: any) => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(request());
//         let response: any = await service.getCountryListIncludingPak(req);
        
//         dispatch(getCountryIncludingPakListData(response));
//     } catch (e:any) {
//         dispatch(failure(e));
//     }
// };
// export const getShedLocationDataList = (req: any) => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(request());
//         let response: any = await service.getShedLocationDataListService(req);
        
//         dispatch(getShedLocationDataListAction(response));
//     } catch (e:any) {
//         dispatch(failure(e));
//     }
// };
// export const getUomByHsCode = (req: any) => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(request());
//         let response: any = await service.getUomDataByHsCode(req);
        
//         dispatch(getUomByHsCodeAction(response));
//     } catch (e:any) {
//         dispatch(failure(e));
//     }
// };
// export const getHSCodeListData = (req: any) => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(setHscodeLoaderAction(true));
//         let response: any = await service.getHSCodeList(req);
        
//         dispatch(getHSCodeListDetails(response));
//         dispatch(setHscodeLoaderAction(false));
//     } catch (e:any) {
//         dispatch(setHscodeLoaderAction(false));
//         dispatch(failure(e));
//     }
// };

// export const getSites = (req: any) => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(request());
//         let response: [] = await service.getSiteListByAgencyId(req);
//         dispatch(getSiteListDataByAgency(response));
//     } catch (e:any) {
//         dispatch(failure(e));
//     }
// };

// export const getImporterList = (req: any) => async (dispatch: Dispatch<any>) => {
//     try {
//         dispatch(request());
//         let response: [] = await service.getImporterListByRole(req);
//         dispatch(getImporterListDetails(response));
//     } catch (e:any) {
//         dispatch(failure(e));
//     }
// };

export const getUnRegisteredTPBusinessAction = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getUnRegisteredTPBusinessService(req);
        if (!_.isEmpty(response.data)) {
            dispatch(getTreatmentProvider(response.data));
        } else {
            if (response.message.code === ApplicationCodes.SUCCESS) {
                dispatch(successAlert(response.message));
            } else {
                dispatch(errorAlert(response.message));
            }
        }
    } catch (e: any) {
        dispatch(failure(e));
    }
};
//5002
export const getTreatmentTypesListAction = (req: any, callBack?:any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());

        if(req && req?.roleCode !== Role.OGAAdmin && req?.roleCode !== Role.TreatmentProvider && callBack){
            callBack()
        }else{
            let response: any = await service.getTreatmentTypeService(req);
            dispatch(getTreatmentType(response));
        }
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const getTreatmentSubTypesListAction = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getTreatmentSubTypesService(req);
        dispatch(getTreatmentSubTypesAction(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

//Get treatment type by provider id 5037
export const GetTreatmentTypeByProviderIdAction_customeUse = (req: any, callBack?: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(GetTreatmentTypeByProviderIdRequest());
        if(callBack && req && (req?.roleCode !== Role.OGAAdmin && req?.roleCode !== Role.TreatmentProvider) ){
            callBack();
            dispatch(getTreatmentTypeByProviderIdClear());
        } else {
            let response: any = await service.getTreatmentTypeByProviderIdService(req);
            if(window.location.pathname.includes(Paths.Registration.Create) || 
            window.location.pathname.includes(Paths.Registration.Edit) || 
            window.location.pathname.includes(Paths.Registration.Renewal) || 
            window.location.pathname.includes(Paths.Registration.Amendment)){
               let formDataMapped:any = treatmentTypeFormDataMapping(response?.data); 
               /* Adding Attachments In Order To Show on Form */
                if(response?.data.treatmentTypes && response.data.treatmentTypes.length > 0)
                {
                     response.data.treatmentTypes.map((val:any) => {
                        let name = val.displayName;
                        if(name.includes(treatmentTypeProperties.fumigation) && name.includes('-'))
                        {
                            name = name.split('-');
                            name = name[0].trim();
                        }
                        if(formDataMapped[name])
                        {
                            formDataMapped[name][treatmentTypeProperties.treatmentAttachments] = val.treatmentTypeAttachments;
                            if(name.trim() === treatmentTypeProperties.fumigation)
                            {
                            let formDataMappedSubType =  formDataMapped[name][treatmentTypeProperties.treatmentTypeSubType];
                           let responseSubTypeData = val.treatmentSubTypes
                           let  mergedSubTypeData = settingSubTypes(formDataMappedSubType,responseSubTypeData)
                            formDataMapped[name][treatmentTypeProperties.treatmentTypeSubType] = mergedSubTypeData;
                            }
                        }
                    })
                }
               dispatch(createEditTreatmentOnBoardDataAction({...formDataMapped}));
            }
            
            getCities_customUse({ agencyId: Agency.DPP },true)(dispatch).catch((e:any)=>console.error('Cities not found, Api error'));
            dispatch(getTreatmentTypeByProviderIdSuccess(response?.data));
            dispatch(stepAction(1));
        }
    } catch (e:any) {
        if(callBack){
            callBack()
        }
        dispatch(getTreatmentTypeByProviderIdClear());
        dispatch(GetTreatmentTypeByProviderIdFailure(e));
    }
};


const settingSubTypes = (_formDataSubType:any,_treatmentTypeSubTypes:any) => {
    let dummyTreatmentTypeSubTypes:any = [];
    if(_treatmentTypeSubTypes && _treatmentTypeSubTypes.length > 0)
    {
    let findMethylSubType = _treatmentTypeSubTypes.find((val:any) => val.subTypeDocumentTypeCode === subTypeDocumentCode.MB);
    let findAluminiumSubType = _treatmentTypeSubTypes.find((val:any) => val.subTypeDocumentTypeCode === subTypeDocumentCode.ALP);
    let findCarbonSubType = _treatmentTypeSubTypes.find((val:any) => val.subTypeDocumentTypeCode === subTypeDocumentCode.CO2);
    _formDataSubType.map((val:any) => {
        let data = {};
        switch(val.documentTypeCode)
        {
            case subTypeDocumentCode.MB:
                data = settingSubTypeData(val,findMethylSubType);
                dummyTreatmentTypeSubTypes.push(data);
                break;
            case subTypeDocumentCode.ALP:
                data = settingSubTypeData(val,findAluminiumSubType)
                dummyTreatmentTypeSubTypes.push(data);
                break;
            case subTypeDocumentCode.CO2:
                data = settingSubTypeData(val,findCarbonSubType)
                dummyTreatmentTypeSubTypes.push(data)
                break;
        }
    });

}
else {
    dummyTreatmentTypeSubTypes = [..._formDataSubType];
}
return dummyTreatmentTypeSubTypes;


}

const settingSubTypeData = (payload:any,filterData:any) => {
    let _payload = {...payload};
    _payload = {
        ...payload,
        checked:filterData && Object.keys(filterData).length > 0,
        treatmentSubTypeAttachments:filterData && Object.keys(filterData).length > 0 ? filterData.treatmentSubTypeAttachments : null
    }
    return _payload;
}

//Get treatment type by provider id 5037
export const GetTreatmentTypeByProviderIdAction = (req: any, callBack?: any) => async (dispatch: Dispatch<any>) => {
        try {
            console.log("view treatment provider view 1 ==>>>", req)
            dispatch(GetTreatmentTypeByProviderIdRequest());
            if(callBack && req && (req?.roleCode !== Role.OGAAdmin && req?.roleCode !== Role.TreatmentProvider) ){
                console.log("view treatment provider view 2 ==>>>", req)

                callBack()
            } else {
                console.log("view treatment provider view 1.1 ==>>>", req)

                let response: any = await service.getTreatmentTypeByProviderIdService(req);
                console.log("view treatment provider view 3 ==>>>", req, response)

                if(window.location.pathname.includes(Paths.Registration.Create) 
                || window.location.pathname.includes(Paths.Registration.Edit) 
                || window.location.pathname.includes(Paths.Registration.Renewal) 
                || window.location.pathname.includes(Paths.Registration.Amendment)
                || window.location.pathname.includes(Paths.Registration.View)){
                    let formDataMapped:any = treatmentTypeFormDataMapping(response?.data);
                    if(response?.data.treatmentTypes && response.data.treatmentTypes.length > 0)
                    {
                        let treatmentData = response.data.treatmentTypes.map((val:any) => {
                            let name:string = val.displayName;
                            if(formDataMapped[name])
                            {
                                formDataMapped[name]["treatmentTypeAttachments"] = val.treatmentTypeAttachments;
                            }
                        })
                    }
                   
                    dispatch(createEditTreatmentOnBoardDataAction({...formDataMapped}));
                 }
                 console.log("view treatment provider view 4 ==>>>", req, response)

                dispatch(getTreatmentTypeByProviderIdSuccess(response?.data));
              //  if(window.location.pathname.includes(Paths.Registration.Create) || window.location.pathname.includes(Paths.Registration.Edit)){
                    dispatch(stepAction(1));
                //}
            }
            console.log("view treatment provider view 5 ==>>>", req)

        } catch (e:any) {
            if(callBack){
                callBack()
            }
            dispatch(GetTreatmentTypeByProviderIdFailure(e));
        }
    };

    // Request Action
const GetTreatmentTypeByProviderIdRequest = (): any => {
    return {
        type: ActionType.GET_TREATMENT_TYPES_BY_TP_ID_REQUEST
    };
};

// Failure Action
const GetTreatmentTypeByProviderIdFailure = (error: IError): any => {
    return {
        type: ActionType.GET_TREATMENT_TYPES_BY_TP_ID_FAILURE,
        payload: error
    };
};

const getTreatmentTypeByProviderIdSuccess = (payload: any): any => {
    return {
        type: ActionType.GET_TREATMENT_TYPES_BY_TP_ID_SUCCESS,
        payload: payload
    };
};

export const getTreatmentTypeByProviderIdClear = (): any => {
    return {
        type: ActionType.GET_TREATMENT_TYPES_BY_TP_ID_CLEAR
        };
};

export const getTreatmentTypeClear = (): any => {
    return {
        type: ActionType.GET_TREATMENT_TYPES_BY_TP_ID_CLEAR
        };
};