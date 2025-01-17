import * as ActionType from "./FormGeneratorActionTypes";

//default state type
interface IDefaultInfoState {
    loading: boolean;
    createEditTreatmentOnBoardData: any;
    addValidationMsgs:any;
}

// Default state
const defaultState: IDefaultInfoState = {
    loading: true,
    createEditTreatmentOnBoardData: {},
    addValidationMsgs:{}
};

const FormGeneratorReducer = (state: any = defaultState, action: any): IDefaultInfoState => {
    switch (action.type) {
        case ActionType.CREATE_EDIT_TREATMENT_ON_BOARD_DATA:
            return {
                ...state,
                createEditTreatmentOnBoardData: action.payload
            };
        case ActionType.CREATE_EDIT_TREATMENT_ON_BOARD_DATA_CLEAR:
            return {
                ...state,
                createEditTreatmentOnBoardData: {}
            };
        case ActionType.ADD_VALIDATION_MSG:
            return {
                ...state,
                addValidationMsgs:action.payload
            }
        default:
            return state;
    }
};

export default FormGeneratorReducer;
