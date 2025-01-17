import { IDataMaskingDefaultState, IDataMaskingTypes } from "./DataMaskingInterface";
import { CLEAR_MASKED_DATA, CLEAR_SBFTP_JUILW, SET_MASKED_DATA, SET_SBFTP_JUILW, SET_OLD_MASKED_DATA} from "./DataMaskingTypes";
 
// export interface IDataMaskingDefaultState {
//     // sbftp: undefined | string,
//     // juilw: undefined | string,
//     masked: undefined | string;
 
// }
 
export const defaultState: IDataMaskingDefaultState = {
    sbftp: undefined,
    juilw: undefined,
    masked: undefined,
    oldMasked: undefined,
    token: undefined,
};
const DataMaskingReducer = (
    state: IDataMaskingDefaultState = defaultState,
    action: IDataMaskingTypes
): IDataMaskingDefaultState => {
    switch (action.type) {
        case SET_MASKED_DATA:
            return {
                ...state,
                // sbftp: action.payload.sbftp,
                // juilw: action.payload.juilw
                masked: action.payload.masked,
                token: action.payload.token,
                oldMasked: action.payload.oldMasked,
            };
        case SET_OLD_MASKED_DATA:
            return {
                ...state,
                // sbftp: action.payload.sbftp,
                // juilw: action.payload.juilw
                oldMasked: action.payload.masked,
                // masked: undefined
            };
        // case CLEAR_MASKED_DATA:
        //     return {
        //         ...state,
        //         masked: defaultState.masked,
        //     };
        case CLEAR_MASKED_DATA:
            return {
                ...state,
                masked: defaultState.masked,
            };
        default:
            return state;
    }
};

export default {
    DataMaskingReducer
};
