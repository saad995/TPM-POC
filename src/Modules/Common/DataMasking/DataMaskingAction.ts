import { IDataMaskingSuccessType, IDataMaskingDefaultState, IClearJUILW, IMaskingData, IClearMaskedData, IDataMaskingkKeys, ISBJUSuccessType, IDataOldMaskingSuccessType } from "./DataMaskingInterface";
import { SET_SBFTP_JUILW, CLEAR_SBFTP_JUILW, SET_MASKED_DATA, CLEAR_MASKED_DATA, SET_OLD_MASKED_DATA } from "./DataMaskingTypes";




export const setDataSBJUSuccess = (
    response: IDataMaskingkKeys
): ISBJUSuccessType => {
    return {
        type: SET_SBFTP_JUILW,
        payload: response
    };  
};
export const setDataMaskingSuccess = (
    response: IMaskingData
): IDataMaskingSuccessType => {
    return {
        type: SET_MASKED_DATA,
        payload: response
    };
};
export const clearDataMasking = (): IClearMaskedData => {
    return {
        type: CLEAR_MASKED_DATA,
    };
};
export const clearSBJU = (): IClearJUILW => {
    return {
        type: CLEAR_SBFTP_JUILW,
    };
};
export const setOldDataMaskingSuccess = (
    response: IMaskingData
): IDataOldMaskingSuccessType => {
    return {
        type: SET_OLD_MASKED_DATA,
        payload: response
    };
};
