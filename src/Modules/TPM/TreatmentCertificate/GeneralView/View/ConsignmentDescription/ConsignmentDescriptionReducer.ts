import {
    CHANGE_ITEMWISE_STATUS_SUCCESS,
    ITEMWISE_STATUS_FAILURE,
    ITEMWISE_STATUS_REQUEST
} from "./ConsignmentDescriptionActionTypes";

import { ItemWiseActionTypes, IChangeItemWiseStatusResponseData } from "./ConsignmentDescriptionInterfaces";

// Default state type
interface IItemWiseState {
    loading: boolean;
    changeItemWiseStatus: IChangeItemWiseStatusResponseData;
}

//default state
const defaultState: IItemWiseState = {
    loading: false,
    changeItemWiseStatus: { code: 0, message: "" }
};

//Reducer
const ItemWiseReducer = (state: IItemWiseState = defaultState, action: ItemWiseActionTypes): IItemWiseState => {
    switch (action.type) {
        case ITEMWISE_STATUS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ITEMWISE_STATUS_FAILURE:
            return {
                ...state,
                loading: false
            };
        case CHANGE_ITEMWISE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                changeItemWiseStatus: action.payload ?? defaultState.changeItemWiseStatus
            };
        default:
            return state;
    }
};

export default ItemWiseReducer;
