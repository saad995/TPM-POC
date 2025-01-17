import {
    UPDATE_STORE_OBJECT_ITEM_FAILURE,
    UPDATE_STORE_OBJECT_ITEM_REQUEST,
    UPDATE_STORE_OBJECT_ITEM_SUCCESS
} from "./UpdateStoreObjectActionTypes";

import {
    IUpdateStoreFailureType,
    IUpdateStoreObject,
    IUpdateStoreRequestType,
    IUpdateStoreSuccessType,
    UpdateStoreReducerTypes
} from "./UpdateStoreObjectInterfaces";
import { Dispatch } from "redux";
import { IError } from "Lib/Types/SharedTypes";

//Update Store on Edit/View of respective record
export const updateStoreObjectAction = (data: IUpdateStoreObject) => async (
    dispatch: Dispatch<UpdateStoreReducerTypes>
) => {
    try {
        dispatch(request());
        dispatch(success(data));
    } catch (e) {
        dispatch(failure(e));
    }
};
/************************** Actions ************************/

//Request action
const request = (): IUpdateStoreRequestType => {
    return {
        type: UPDATE_STORE_OBJECT_ITEM_REQUEST
    };
};

//Failure action
const failure = (error: IError): IUpdateStoreFailureType => {
    return {
        type: UPDATE_STORE_OBJECT_ITEM_FAILURE,
        payload: error
    };
};

//Get List success action
const success = (responseDate: IUpdateStoreObject): IUpdateStoreSuccessType => {
    return {
        type: UPDATE_STORE_OBJECT_ITEM_SUCCESS,
        payload: responseDate
    };
};
