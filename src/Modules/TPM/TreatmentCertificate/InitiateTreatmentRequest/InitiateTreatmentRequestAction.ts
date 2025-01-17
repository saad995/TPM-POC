// import { IError } from "Lib/Types/SharedTypes";
// import { Dispatch } from "redux";
// import {
//     INIT_TREATMENT_REQUEST_GET_COUNTRY_OF_ORIGIN,
//     INIT_TREATMENT_REQUEST_GET_EXPORT_NAME,
//     INIT_TREATMENT_REQUEST_GET_EXPORT_ADDRESS,
//     INIT_TREATMENT_REQUEST_GET_TRADE_TYPE
// } from "./InitiateTreatmentRequestActionTypes";

import { Dispatch } from "react";
// import { request } from "http";
import {
    BASIC_INFO_FAILURE,
    BASIC_INFO_REQUEST,
    GET_AGENCY_DATA,
    GET_CITY_DATA,
    GET_CITY_DATA_CLEAR,
    GET_COLLECTORATE_DATA,
    GET_COUNTRY_DATA,
    GET_COUNTRY_INCLUDING_PAK_DATA,
    GET_DEPENDENT_TREATMENT_PROVIDER_DATA,
    GET_HS_CODE_INFO,
    GET_IMPORTER_DATA,
    GET_ORGANIZATION_ON_NTN,
    GET_PORT_OF_LOADING,
    GET_SHED_LOCATION_DATA_LIST,
    GET_SITE_DATA,
    GET_SUB_TREATMENT_TYPES,
    GET_TREATMENT_PROVIDER,
    GET_TREATMENT_TYPE,
    GET_UOM_BY_HS_CODE,
    SAVE_INITIATE_FORM_RESPONSE,
    SET_HSCODE_LOADER,
    SET_IS_LOADING,
    SET_LOADING_GET_COLLECTORATE_DATA,
    SET_LOADING_GET_DEPENDENT_TREATMENT_PROVIDER_DATA,
    SET_TREATMENT_TYPES_BASE_ON_TP
} from "./InitiateTreatmentRequestActionTypes";

import { errorAlert, successAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import { IError } from "Elements/Types/SharedTypes";
import { BasicFailureType, BasicLoadingRequestType, BasicRequestType } from "Layouts/AppLayout/AppLayoutInterfaces";
import service from "./InitiateTreatmentRequestServices";
// Request Action
const request = (): BasicRequestType => {
    return {
        type: BASIC_INFO_REQUEST
    };
};
const baseLoadingState = (): BasicLoadingRequestType => {
    return {
        type: SET_IS_LOADING
    };
};
// Failure Action
const failure = (error: IError): BasicFailureType => {
    return {
        type: BASIC_INFO_FAILURE,
        payload: error
    };
};

// Failure Action
const setIsLoadingCollectorateDataLoading = (data: any): any => {
    return {
        type: SET_LOADING_GET_COLLECTORATE_DATA,
        payload: data
    };
};

// Get All Agency Success Action
export const getRegisteredAgencyListData = (response: []): {} => {
    return {
        type: GET_AGENCY_DATA,
        payload: response
    };
};
// * getTreatmentType action
export const getTreatmentType = (response: any): any => {
    return {
        type: GET_TREATMENT_TYPE,
        payload: response
    };
};

// * get treatment types base on the treatment provider
export const setTreatmentTypesBaseOnTreatmentProviderAction = (response: any): any => {
    return {
        type: SET_TREATMENT_TYPES_BASE_ON_TP,
        payload: response 
    }
}

// * get custom collector base on the city
export const setCustomCollectorateBaseOnCityAction = (response: any): any => {
    return {
        type: GET_COLLECTORATE_DATA,
        payload: response 
    }
}

// * get treatment proivder data base on treatment type and treatment sub type
export const getDependentTreatmentProviderAction = (response: any): any => {
    return {
        type: GET_DEPENDENT_TREATMENT_PROVIDER_DATA,
        payload: response
    };
};
// * set loading treatment proivder data base on treatment type and treatment sub type
export const setLoadingDependentTreatmentProviderAction = (response: any): any => {
    return {
        type: SET_LOADING_GET_DEPENDENT_TREATMENT_PROVIDER_DATA,
        payload: response
    };
};

export const getShedLocationDataListAction = (response: any): any => {
    return {
        type: GET_SHED_LOCATION_DATA_LIST,
        payload: response
    };
};

export const getTreatmentProvider = (response: any): any => {
    return {
        type: GET_TREATMENT_PROVIDER,
        payload: response
    };
};

export const getSiteListDataByAgency = (response: []): {} => {
    return {
        type: GET_SITE_DATA,
        payload: response
    };
};

export const getCitiesListDataByAgency = (response: any[]): {} => {
    
    return {
        type: GET_CITY_DATA,
        payload: response
    };
};

export const getOrganizationOnNTNAction = (response: any[]): {} => {
    
    return {
        type: GET_ORGANIZATION_ON_NTN,
        payload: response
    };
};

export const getCitiesListClear = (): {} => {
    
    return {
        type: GET_CITY_DATA_CLEAR
    };
};

export const getCountryListData = (response: []): {} => {
    
    return {
        type: GET_COUNTRY_DATA,
        payload: response
    };
};
export const getCountryIncludingPakListData = (response: []): {} => {
    
    return {
        type: GET_COUNTRY_INCLUDING_PAK_DATA,
        payload: response
    };
};
export const getImporterListDetails = (response: []): {} => {
    
    return {
        type: GET_IMPORTER_DATA,
        payload: response
    };
};
export const getHSCodeListDetails = (response: []): {} => {
    
    return {
        type: GET_HS_CODE_INFO,
        payload: response
    };
};

export const setHscodeLoaderAction = (flag: boolean): {} => {
    
    return {
        type: SET_HSCODE_LOADER,
        payload: flag
    };
};

export const getPortOfLoadingAction = (response: []): {} => {
    
    return {
        type: GET_PORT_OF_LOADING,
        payload: response
    };
};

export const getTreatmentSubTypesAction = (response: []): {} => {
    
    return {
        type: GET_SUB_TREATMENT_TYPES,
        payload: response
    };
};

export const getUomByHsCodeAction = (response: []): {} => {
    
    return {
        type: GET_UOM_BY_HS_CODE,
        payload: response
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

export const getTreatmentSubTypesListData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getTreatmentSubTypesService(req);
        dispatch(getTreatmentSubTypesAction(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const getPortOfLoadingListData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getPortOfLoadingService(req);
        dispatch(getPortOfLoadingAction(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};
export const getCities_customUse = (req: any, isReturn?: boolean) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getCitiesListByAgencyId(req);
        dispatch(getCitiesListDataByAgency(response));
        if(isReturn){
            return response?.data ? response?.data : [];
        }
    } catch (e:any) {
        if(isReturn){
            return [];
        }
        dispatch(failure(e));
    }
};
export const getCities = (req: any, callback?:any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getCitiesListByAgencyId(req);
        dispatch(getCitiesListDataByAgency(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};
export const getCountries = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getCountryList(req);
        
        dispatch(getCountryListData(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};
export const getCountriesIncludingPak = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getCountryListIncludingPak(req);
        
        dispatch(getCountryIncludingPakListData(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};
export const getShedLocationDataList = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getShedLocationDataListService(req);
        
        dispatch(getShedLocationDataListAction(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};
export const getUomByHsCode = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getUomDataByHsCode(req);
        
        dispatch(getUomByHsCodeAction(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};
export const getHSCodeListData = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setHscodeLoaderAction(true));
        let response: any = await service.getHSCodeList(req);
        
        dispatch(getHSCodeListDetails(response));
        dispatch(setHscodeLoaderAction(false));
    } catch (e:any) {
        dispatch(setHscodeLoaderAction(false));
        dispatch(failure(e));
    }
};

export const getSites = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: [] = await service.getSiteListByAgencyId(req);
        dispatch(getSiteListDataByAgency(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};
export const getTreatmentTypesList = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getTreatmentTypeService(req);
        dispatch(getTreatmentType(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};
export const getTreatmentProviderList = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getTreatmentProviderService(req);
        dispatch(getTreatmentProvider(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const getTreatmentTypesBaseOnTPList = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getTreatmentProviderService(req);
        dispatch(setTreatmentTypesBaseOnTreatmentProviderAction(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const getCustomCollectorateBaseOnCityList = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(setIsLoadingCollectorateDataLoading(true));
        let response: any = await service.getCustomCollectorateBaseOnCityService(req);
        dispatch(setCustomCollectorateBaseOnCityAction(response));
        dispatch(setIsLoadingCollectorateDataLoading(false));
    } catch (e:any) {
        dispatch(setIsLoadingCollectorateDataLoading(false));
        dispatch(failure(e));
    }
};
export const getDependentTreatmentProviderList = (req: any,callback?:any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        dispatch(setLoadingDependentTreatmentProviderAction(true));
        let response: any = await service.getDependentTreatmentProviderService(req);
        dispatch(getDependentTreatmentProviderAction(response?.data));
        callback(response);
    } catch (e:any) {
        callback(e)
        dispatch(failure(e));
    }
};
export const getImporterList = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: [] = await service.getImporterListByRole(req);
        dispatch(getImporterListDetails(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const getOrganzationDataOnNTNList = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(request());
        let response: any = await service.getImporterListByRole(req);
        let data = response.organizationsOnNTNs;
        if(data && data.length > 0)
        {
        data = data.map((val:any) => ({
            ...val,
            status:val.isExpired ? "Subscription Expired" : "Subscription Active"
        }));
        response.organizationsOnNTNs = [...data];   
        console.log("Data",data);
    }
    console.log("Responsesdafasdf",response);
        dispatch(getOrganizationOnNTNAction(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const setInitateRequestResponse = (res: any) => {
    return {
        type: SAVE_INITIATE_FORM_RESPONSE,
        payload: res
    };
};

export const sendInitiateRequest = (req: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(baseLoadingState());
        let response: any = await service.submitRequest(req);
        dispatch(setInitateRequestResponse(response));
        dispatch(successAlert(response?.message));
        
    } catch (e:any) {
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};
