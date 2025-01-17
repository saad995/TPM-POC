import { Dispatch } from "redux";
import { IError } from "Lib/Types/SharedTypes";
import service from "./GeneralCommentsServices";
import {
    ClearStateType,
    FailureType,
    GeneralComment,
    GetGeneralCommentsReducerTypes,
    IGeneralCommentsByGroupCodeRequest,
    IGeneralCommentsByGroupCodeResponse,
    IGetGeneralCommentsSuccessType,
    RequestType
} from "./GeneralCommentsInterfaces";
import {
    GET_GENERAL_COMMENTS_CLEAR_STATE,
    GET_GENERAL_COMMENTS_FAILURE,
    GET_GENERAL_COMMENTS_REQUEST,
    GET_GENERAL_COMMENTS_SUCCESS
} from "./GeneralCommentsActionTypes";

// Get General Comments By Group Code Action
export const getGeneralCommentsByGroupCodeAction = (
    req: IGeneralCommentsByGroupCodeRequest,
    comments: GeneralComment[]
) => async (dispatch: Dispatch<GetGeneralCommentsReducerTypes>) => {
    try {
        dispatch(request());
        const response: GeneralComment[] = await service.getGeneralCommentsByGroupCode(
            req
        );

        if (response) {
            const generalComments = response.map(
                (generalComment: GeneralComment) => {
                    generalComment.groupCode = req.groupCode;
                    return generalComment;
                }
            );
            const filteredComments = comments.filter(
                (x) => x.groupCode !== req.groupCode
            );
            dispatch(
                getGeneralCommentsByGroupCodeSuccess([
                    ...filteredComments,
                    ...generalComments
                ])
            );
        }
    } catch (e) {
        dispatch(failure(e));
    }
};

/************************** Actions ************************/

//Request action
const request = (): RequestType => {
    return {
        type: GET_GENERAL_COMMENTS_REQUEST
    };
};

//Failure action
const failure = (error: IError): FailureType => {
    return {
        type: GET_GENERAL_COMMENTS_FAILURE,
        payload: error
    };
};

//Failure action
export const clearState = (groupCode: string): ClearStateType => {
    return {
        type: GET_GENERAL_COMMENTS_CLEAR_STATE,
        payload: groupCode
    };
};

export const getGeneralCommentsByGroupCodeSuccess = (
    response: GeneralComment[]
): IGetGeneralCommentsSuccessType => {
    return {
        type: GET_GENERAL_COMMENTS_SUCCESS,
        payload: response
    };
};
