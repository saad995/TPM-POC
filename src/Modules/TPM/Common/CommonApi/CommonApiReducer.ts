import { ICity } from "Modules/Common/Shared/SharedTypes";
import { BASIC_INFO_FAILURE, GET_AGENCY_DATA, SET_HSCODE_LOADER, GET_CITY_DATA, GET_COUNTRY_DATA, GET_COUNTRY_INCLUDING_PAK_DATA, GET_HS_CODE_INFO, GET_IMPORTER_DATA, GET_PORT_OF_LOADING, GET_SHED_LOCATION_DATA_LIST, GET_SITE_DATA, GET_SUB_TREATMENT_TYPES, GET_TREATMENT_PROVIDER, GET_TREATMENT_TYPE, GET_UOM_BY_HS_CODE, SAVE_INITIATE_FORM_RESPONSE, SET_IS_LOADING } from "./CommonApiActionTypes";
import { demoProductHSCODEData } from "Modules/Common/CommonUtility";
import * as ActionType from "./CommonApiActionTypes";

//default state type
interface IDefaultInfoState {
    loading: boolean;
    agencies: [];
    cities: any[];
    sites: any[];
    importerData: any[];
    countryList: any[];
    hsCodeList: any[];
    ishsCodeListReterived:boolean;
    uomData: {};
    initiateReqRes:{};
    errorData:{};
    treatmentTypes: any[];
    treatmentProviderBusines: any[];
    countryListIncludingPak:[];
    portOfLoadingData:[];
    shedLocations:[];
    subTreatmentTypes:[];
    // agencySites: IAgencySite[];
    getTreatmentTypesByTPId: any;
    getTreatmentTypesByTPIdLoading: boolean;
}

// Default state
const defaultState: IDefaultInfoState = {
    loading: true,
    getTreatmentTypesByTPIdLoading: true,
    agencies: [],
    sites: [],
    cities: [],
    importerData: [],
    countryList: [],
    hsCodeList: [],
    ishsCodeListReterived:true,
    uomData: {},
    initiateReqRes:{},
    errorData:{},
    countryListIncludingPak:[],
    portOfLoadingData:[],
    shedLocations:[],

    subTreatmentTypes:[],
    treatmentTypes:[],
    treatmentProviderBusines:[],
    getTreatmentTypesByTPId: {}
};

const CommonApiReducer = (state: any = defaultState, action: any): IDefaultInfoState => {
    
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
            return {
                ...state,
                shedLocations: action.payload,
                loading: false
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

        case GET_IMPORTER_DATA:
            
            return {
                ...state,
                importerData: action.payload.organizationsOnNTNs[0].organizations,
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

        case ActionType.GET_TREATMENT_PROVIDER:
            return {
                ...state,
                loading: false,
                treatmentProviderBusines: action.payload
            };
            
        case ActionType.GET_TREATMENT_TYPE:
            return {
                ...state,
                treatmentTypes: action.payload,
                loading: false
            };
        case ActionType.GET_TREATMENT_TYPES_BY_TP_ID_REQUEST:
            return {
                ...state,
                getTreatmentTypesByTPIdLoading: true,
            }
        case ActionType.GET_TREATMENT_TYPES_BY_TP_ID_FAILURE:
            return {
                ...state,
                getTreatmentTypesByTPIdLoading: false,
            }
        case ActionType.GET_TREATMENT_TYPES_BY_TP_ID_SUCCESS:
            return {
                ...state,
                getTreatmentTypesByTPIdLoading: false,
                getTreatmentTypesByTPId: action.payload,
            }
        case ActionType.GET_TREATMENT_TYPES_BY_TP_ID_CLEAR:
            return {
                ...state,
                getTreatmentTypesByTPIdLoading: false,
                getTreatmentTypesByTPId: {}
            }
        case ActionType.GET_TREATMENT_TYPE_CLEAR:
            return {
                ...state,
                treatmentTypes: []
            };
        default:
            return state;
    }
};

export default CommonApiReducer;
