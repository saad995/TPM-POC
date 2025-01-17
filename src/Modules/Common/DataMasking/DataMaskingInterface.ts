import { CLEAR_MASKED_DATA, CLEAR_SBFTP_JUILW, SET_MASKED_DATA, SET_OLD_MASKED_DATA, SET_SBFTP_JUILW } from "./DataMaskingTypes";


export interface IDataMaskingDefaultState {
    sbftp: undefined | string,
    juilw: undefined | string,
    masked: undefined | string,
    oldMasked: undefined | string,
    token: undefined | string
}
export interface IDataMaskingkKeys {
    sbftp: undefined | string,
    juilw: undefined | string,
    // masked: undefined | string,
}
export interface IMaskingData {
    masked: undefined | string,
    token: undefined | string,
    oldMasked : undefined | string,
}
export interface ISetJUILW {
    type: typeof SET_SBFTP_JUILW;
    payload: IDataMaskingDefaultState;
}
export interface IClearJUILW {
    type: typeof CLEAR_SBFTP_JUILW;
}
export interface ISetMaskedData {
    type: typeof SET_MASKED_DATA;
    payload: IDataMaskingDefaultState;
}
export interface IClearMaskedData {
    type: typeof CLEAR_MASKED_DATA;
}
export interface IDataOldMaskingSuccessType {
    type: typeof SET_OLD_MASKED_DATA;
    payload: IMaskingData;
}
export type IDataMaskingTypes = 
    ISetJUILW |
    IClearJUILW |
    ISetMaskedData |
    IClearMaskedData |
    IDataOldMaskingSuccessType
;

export interface IDataMaskingSuccessType {
    type: typeof SET_MASKED_DATA;
    payload: IMaskingData;
}

export interface ISBJUSuccessType {
    type: typeof SET_SBFTP_JUILW;
    payload: IDataMaskingkKeys;
}