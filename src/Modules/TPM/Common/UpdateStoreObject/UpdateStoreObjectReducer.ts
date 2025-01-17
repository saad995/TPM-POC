import {
    UPDATE_STORE_OBJECT_ITEM_FAILURE,
    UPDATE_STORE_OBJECT_ITEM_REQUEST,
    UPDATE_STORE_OBJECT_ITEM_SUCCESS
} from "./UpdateStoreObjectActionTypes";
import { IError } from "Lib/Types/SharedTypes";
import {
    IUpdateStoreObject,
    UpdateStoreReducerTypes
} from "./UpdateStoreObjectInterfaces";

//default state type
interface IUpdateStoreReducerState {
    loading: boolean;
    store: IUpdateStoreObject;
    error: IError;
}

//default state
const defaultState: IUpdateStoreReducerState = {
    loading: false,
    store: { initDocumentTypeCode: "" },
    error: { error: "", status: 0 }
};

//Reducer
const updateStoreReducer = (
    state: IUpdateStoreReducerState = defaultState,
    action: UpdateStoreReducerTypes
): IUpdateStoreReducerState => {
    switch (action.type) {
        case UPDATE_STORE_OBJECT_ITEM_REQUEST:
            return {
                ...state,
                loading: true
            };

        case UPDATE_STORE_OBJECT_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                store: action.payload ?? defaultState.store
            };

        case UPDATE_STORE_OBJECT_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload ?? defaultState.error
            };

        default:
            return state;
    }
};

export default updateStoreReducer;
