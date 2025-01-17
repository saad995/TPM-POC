import { GET_GENERAL_COMMENTS_CLEAR_STATE, GET_GENERAL_COMMENTS_FAILURE, GET_GENERAL_COMMENTS_REQUEST, GET_GENERAL_COMMENTS_SUCCESS } from "./GeneralCommentsActionTypes";
import { GeneralComment, GetGeneralCommentsReducerTypes } from "./GeneralCommentsInterfaces";

//default state type
interface IGeneralCommentsState {
    loading: boolean;
    generalComments: GeneralComment[];
}

// Default state
const defaultState: IGeneralCommentsState = {
    loading: false,
    generalComments: []
};

// General Comments Reducer for all the actions
const generalCommentsReducer = (
    state: IGeneralCommentsState = defaultState,
    action: GetGeneralCommentsReducerTypes
): IGeneralCommentsState => {
    switch (action.type) {
        case GET_GENERAL_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case GET_GENERAL_COMMENTS_FAILURE:
            return {
                ...state,
                loading: false
            };

        case GET_GENERAL_COMMENTS_CLEAR_STATE:
            return {
                loading: false,
                generalComments: state.generalComments.filter(x => x.groupCode != action.payload)
            };

        case GET_GENERAL_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                generalComments: action.payload
            };
        default:
            return state;
    }
};

export default generalCommentsReducer;