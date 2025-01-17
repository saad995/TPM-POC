import { GET_NON_COMPLIANCE_DATA, SET_IS_LOADING } from "./GenerateNonComplianceActionTypes";

//default state type
interface IDefaultInfoState {
    loading: boolean;
    generateNonComplianceResponse: [];
}

// Default state
const defaultState: IDefaultInfoState = {
    loading: true,
    generateNonComplianceResponse: [],
};

const GenerateNonComplianceReducer = (state: any = defaultState, action: any): IDefaultInfoState => {
    
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case GET_NON_COMPLIANCE_DATA:
            
            return {
                ...state,
                generateNonComplianceResponse: action.payload,
                loading: false
            };

        default:
            return state;
    }
};

export default GenerateNonComplianceReducer;
