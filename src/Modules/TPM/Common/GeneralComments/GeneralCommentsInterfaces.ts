import { IError } from "Lib/Types/SharedTypes";
import { GET_GENERAL_COMMENTS_CLEAR_STATE, GET_GENERAL_COMMENTS_FAILURE, GET_GENERAL_COMMENTS_REQUEST, GET_GENERAL_COMMENTS_SUCCESS } from "./GeneralCommentsActionTypes";

export interface IGeneralCommentsByGroupCodeRequest {
    groupCode: string;
}

export interface IGeneralCommentsByGroupCodeResponse {
    generalComments: GeneralComment[];
}

export interface GeneralComment {
    id: number;
    comment: string;
    isSelected: boolean;
    groupCode: string;
}

export interface IProps {
    groupCode: string;
    onChipSelect: any;
    currentComment: string;
    additionalClasses?: string;
   itemsOnDesktop?:number;
   itemsOnTablet?:number;
   itemsOnMobile?:number;
}

export interface RequestType {
    type: typeof GET_GENERAL_COMMENTS_REQUEST;
}

export interface FailureType {
    type: typeof GET_GENERAL_COMMENTS_FAILURE;
    payload: IError;
}

export interface ClearStateType {
    type: typeof GET_GENERAL_COMMENTS_CLEAR_STATE;
    payload: string;
}

export interface IGetGeneralCommentsSuccessType {
    type: typeof GET_GENERAL_COMMENTS_SUCCESS;
    payload: GeneralComment[];
}

export type GetGeneralCommentsReducerTypes =
    | RequestType
    | FailureType
    | ClearStateType
    | IGetGeneralCommentsSuccessType;