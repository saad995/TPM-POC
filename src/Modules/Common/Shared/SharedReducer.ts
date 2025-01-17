import {
    GET_CITIES_BY_COUNTRY_SUCCESS,
    GET_CITIES_BY_COUNTRY_FAILURE,
    GET_COLLECTORATE_CITIES_FAILURE,
    GET_COLLECTORATE_CITIES_SUCCESS,
    GET_CUSTOMS_COLLECTORATE_SUCCESS,
    GET_CUSTOMS_COLLECTORATE_FAILURE
} from "./SharedActionTypes";
import { ICity,ICustomCollectorate, ISharedActionTypes } from "./SharedTypes";

//default state type
interface IDefaultState {
    cities: ICity[];
    collectorateCities: ICity[];
    customeCollectorate: ICustomCollectorate[];
}

//default state
const defaultState: IDefaultState = {
    cities: [],
    collectorateCities: [],
    customeCollectorate:[]
};

//Reducer
const SharedReducer = (
    state: IDefaultState = defaultState,
    action: ISharedActionTypes
): IDefaultState => {
    switch (action.type) {
        case GET_CITIES_BY_COUNTRY_SUCCESS:
            return {
                ...state,
                cities: action.payload
            };
        case GET_CITIES_BY_COUNTRY_FAILURE:
            return {
                ...state,
                cities: []
            };

        case GET_COLLECTORATE_CITIES_SUCCESS:
            return {
                ...state,
                collectorateCities: action.payload
            };
        case GET_COLLECTORATE_CITIES_FAILURE:
            return {
                ...state,
                collectorateCities: []
            };
        case GET_CUSTOMS_COLLECTORATE_SUCCESS:
            return {
                ...state,
                customeCollectorate: action.payload
            };
        case GET_CUSTOMS_COLLECTORATE_FAILURE:
            return {
                ...state,
                customeCollectorate: []
            };

        default:
            return state;
    }
};

export default {
    SharedReducer
};
