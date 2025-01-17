import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import { SET_IS_LOADING } from "./InitiateTreatmentRequest/InitiateTreatmentRequestActionTypes";
import { GET_IO_RIGHTS, GET_TREATMENT_CERTIFICATE_DATA, GET_TREATMENT_REQUEST_LIST, LOADING_PENDING_LIST, SELECTED_TAB, SET_IS_LOADING_FALSE } from "./TreatmentCertificatesActionTypes";

// * default state type
interface IDefaultInfoState {
    loading: boolean;
    treatmentRequestsList: any[];
    issueTreatmentCertificateData: any[];
    demoRole: string,
    selectedTab: 0,
    ioRightsData: string;
    isLoadingPendingList:boolean;

}

// * Default state
const defaultState: IDefaultInfoState = {
    loading: true,
    treatmentRequestsList: [],
    issueTreatmentCertificateData: [],
    demoRole: UserRole.TreatmentProvider,
    selectedTab: 0,
    ioRightsData: "",
    isLoadingPendingList: false,

};

// * reducer function
const TreatmentCertificateReducer = (state: IDefaultInfoState = defaultState, action: any): IDefaultInfoState => {
    
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                loading: true
            };
        
        case SET_IS_LOADING_FALSE:
            return {
                ...state,
                loading: false
            };
        
        case LOADING_PENDING_LIST:
            return {
                ...state,
                isLoadingPendingList: action.payload,
            };

        case GET_TREATMENT_REQUEST_LIST:
            
            return {
                ...state,
                treatmentRequestsList: action.payload,
                loading: false
            };

        case GET_TREATMENT_CERTIFICATE_DATA:
            return {
                ...state,
                issueTreatmentCertificateData: action.payload,
                loading: false
            };

        case SELECTED_TAB:
            return {
                ...state,
                selectedTab: action?.payload?.selectedValue,
            }

        case GET_IO_RIGHTS:
            
            return {
                ...state,
                ioRightsData: action.payload,
                loading: false
            };

        default:
            return state;
    }
};

export default TreatmentCertificateReducer;
