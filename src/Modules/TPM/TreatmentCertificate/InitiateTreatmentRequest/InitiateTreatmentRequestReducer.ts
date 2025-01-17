import { ICity } from "Modules/Common/Shared/SharedTypes";
import { BASIC_INFO_FAILURE, GET_AGENCY_DATA, SET_HSCODE_LOADER, GET_CITY_DATA, GET_COUNTRY_DATA, GET_COUNTRY_INCLUDING_PAK_DATA, GET_HS_CODE_INFO, GET_IMPORTER_DATA, GET_PORT_OF_LOADING, GET_SHED_LOCATION_DATA_LIST, GET_SITE_DATA, GET_SUB_TREATMENT_TYPES, GET_TREATMENT_PROVIDER, GET_TREATMENT_TYPE, GET_UOM_BY_HS_CODE, SAVE_INITIATE_FORM_RESPONSE, SET_IS_LOADING, GET_DEPENDENT_TREATMENT_PROVIDER_DATA, SET_LOADING_GET_DEPENDENT_TREATMENT_PROVIDER_DATA, SET_TREATMENT_TYPES_BASE_ON_TP, GET_COLLECTORATE_DATA, SET_LOADING_GET_COLLECTORATE_DATA, GET_CITY_DATA_CLEAR, GET_ORGANIZATION_ON_NTN } from "./InitiateTreatmentRequestActionTypes";
import { demoProductHSCODEData } from "Modules/Common/CommonUtility";

//default state type
interface IDefaultInfoState {
    loading: boolean;
    // countries: ICountry[];
    agencies: [];
    cities: any[];
    sites: any[];
    importerData: any[],
    countryList: any[],
    hsCodeList: any[],
    ishsCodeListReterived:boolean,
    uomData: {}
    initiateReqRes:{},
    errorData:{},
    treatmentTypes:[],
    treatmentProviders:[],
    countryListIncludingPak:[],
    portOfLoadingData:[],
    shedLocations:[],
    subTreatmentTypes:[],
    getDependentTreatmentProvider:[],
    isLoadingGetDependentTreatmentProvider:boolean,
    treatmentTypesBaseOnTreatmentProvider:[],
    customCollectorateBaseOnCity:[],
    isCustomCollectorateLoading:boolean,
    getOrganizationOnNTN : []

    // agencySites: IAgencySite[];

}

// Default state
const defaultState: IDefaultInfoState = {
    loading: true,
    agencies: [],
    sites: [],
    cities: [],
    importerData: [],
    countryList: [],
    hsCodeList: [],
    ishsCodeListReterived:false,
    uomData: {},
    initiateReqRes:{},
    errorData:{},
    treatmentTypes:[],
    treatmentProviders:[],
    countryListIncludingPak:[],
    portOfLoadingData:[],
    shedLocations:[],
    subTreatmentTypes:[],
    getDependentTreatmentProvider:[],
    isLoadingGetDependentTreatmentProvider:false,
    treatmentTypesBaseOnTreatmentProvider:[],
    customCollectorateBaseOnCity:[],
    isCustomCollectorateLoading:false,
    getOrganizationOnNTN : []
    

};

const InitiateTreatmentRequestReducer = (state: any = defaultState, action: any): IDefaultInfoState => {
    
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                loading: true
            };

        case BASIC_INFO_FAILURE:
            
            return {
                ...state,
                errorData: action.payload,
                loading: false
            };
        case SET_HSCODE_LOADER:
            return {
                ...state,
                ishsCodeListReterived: action.payload,
            };
        case GET_SUB_TREATMENT_TYPES:
            
            return {
                ...state,
                subTreatmentTypes: action.payload,
                loading: false
            };
        case SET_LOADING_GET_DEPENDENT_TREATMENT_PROVIDER_DATA:
            
            return {
                ...state,
                isLoadingGetDependentTreatmentProvider: action.payload
            };
        case GET_DEPENDENT_TREATMENT_PROVIDER_DATA:
            debugger
            return {
                ...state,
                getDependentTreatmentProvider: action.payload,
                isLoadingGetDependentTreatmentProvider: false
            };
        case GET_PORT_OF_LOADING:
            
            return {
                ...state,
                portOfLoadingData: action.payload,
                loading: false
            };
        case GET_PORT_OF_LOADING:
            
            return {
                ...state,
                portOfLoadingData: action.payload,
                loading: false
            };
        case GET_AGENCY_DATA:
            
            return {
                ...state,
                agencies: action.payload,
                loading: false
            };
        case GET_SHED_LOCATION_DATA_LIST:
            console.log("GET_SHED_LOCATION_DATA_LIST: ", action.payload);
            return {
                ...state,
                shedLocations: action.payload,
                loading: false
            };


        case SET_LOADING_GET_COLLECTORATE_DATA:
            console.log("SET_LOADING_GET_COLLECTORATE_DATA: ", action.payload);
            return {
                ...state,
                isCustomCollectorateLoading: action.payload
            };
        
        case GET_COLLECTORATE_DATA:
            
            console.log("GET_COLLECTORATE_DATA: ", action.payload);
            debugger;
            return {
                ...state,
                customCollectorateBaseOnCity: action.payload,
                isCustomCollectorateLoading: false
            };

        case GET_SITE_DATA:
            
            return {
                ...state,
                sites: action.payload,
                loading: false
            };

        case GET_CITY_DATA:
            
            return {
                ...state,
                cities: action.payload,
                loading: false
            };
        case GET_CITY_DATA_CLEAR:
            return {
                ...state,
                cities: [],
                loading: false
            };
        case GET_IMPORTER_DATA:
            
            return {
                ...state,
                importerData: action.payload.organizationsOnNTNs[0].organizations,
                loading: false
            };
        case GET_ORGANIZATION_ON_NTN:
            
            return {
                ...state,
                getOrganizationOnNTN: action.payload.organizationsOnNTNs,
                loading: false
            };

        case GET_COUNTRY_DATA:
            
            return {
                ...state,
                countryList: action.payload,
                loading: false
            };

        case GET_COUNTRY_INCLUDING_PAK_DATA:
            
            return {
                ...state,
                countryListIncludingPak: action.payload,
                loading: false
            };

        case GET_HS_CODE_INFO:
            
            return {
                ...state,
                hsCodeList: action.payload.regulatedHsCodeList,
                loading: false
            };
            
        case GET_UOM_BY_HS_CODE:
            
            return {
                ...state,
                uomData: action.payload,
                loading: false
            };

        case SAVE_INITIATE_FORM_RESPONSE:
            
            return {
                ...state,
                initiateReqRes: action.payload,
                loading: false
            };

        case SET_TREATMENT_TYPES_BASE_ON_TP:
            const getOnlyActiveTypes: any = action?.payload[0]?.treatmentTypes?.filter((treatmentType:any)=>treatmentType?.isActive == true); 
            return {
                ...state,
                treatmentTypesBaseOnTreatmentProvider: getOnlyActiveTypes,
                loading: false
            };
        case GET_TREATMENT_PROVIDER:

            return {
                ...state,
                treatmentProviders: action.payload,
                loading: false
            };
            
        case GET_TREATMENT_TYPE:
            
            return {
                ...state,
                treatmentTypes: action.payload,
                loading: false
            };
        default:
            return state;
    }
};

export default InitiateTreatmentRequestReducer;
