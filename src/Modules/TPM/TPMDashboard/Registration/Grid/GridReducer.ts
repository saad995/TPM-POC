import * as ActionType from "./GridActionTypes";

import {
    ICatchCertificateListResponseData,
    getAllTreatmentProviderRegistrationTypes
} from "./GridInterfaces";

//default state type
interface ICatchCertificateGridState {
    loading: boolean;
    tpmRegistrations: ICatchCertificateListResponseData[];
}

//default state
const defaultState: ICatchCertificateGridState = {
    loading: false,
    tpmRegistrations: []
};

//Reducer
const RegistrationGridReducer = (
    state: ICatchCertificateGridState = defaultState,
    action: getAllTreatmentProviderRegistrationTypes
): ICatchCertificateGridState => {
    switch (action.type) {
        case  ActionType.TPM_REGISTRATION_GRID_REQUEST:
            return {
                ...state,
                loading: true
            };
        case  ActionType.TPM_REGISTRATION_GRID_SUCCESS:
            return {
                ...state,
                loading: false,
                tpmRegistrations: action.payload
            };
        case  ActionType.TPM_REGISTRATION_GRID_FAILURE:
            return {
                ...state,
                loading: false
            };
        case ActionType.TPM_REGISTRATION_LIST_SUCCESS_DNF:
            return {
                ...state,
                loading: false
            }
        case  ActionType.TPM_REGISTRATION_GRID_CLEAR:
            return {
                ...state,
                tpmRegistrations: []
            };
        default:
            return state;
    }
};

export default RegistrationGridReducer;
