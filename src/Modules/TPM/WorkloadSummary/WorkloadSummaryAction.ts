import { errorAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import { Dispatch } from "react";
import { GET_ALL_LAB_OFFICERS_FAILURE, GET_WORKLOAD_SUMMARY_FAILURE, GET_WORKLOAD_SUMMARY_REQUEST, GET_WORKLOAD_SUMMARY_SUCCESS, RESET_WORKLOAD_SUMMARY_REDUCER_STATE, UPDATE_PROFILE_PICTURE_SUCCESS, USER_DETAIL_FAILURE, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS } from "./WorkloadSummaryActionTypes";
import { IUpdateProfilePictureRequest, IUserDetailRequest, IUserDetailResponse, WorkloadSummaryResponse } from "./WorkloadSummaryInterfaces";
import service from "./WorkloadSummaryServices";

export const getWorkloadSummaryAction = (req : any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(getWorkloadSummaryRequest());
        let response = await service.getWorkloadSummaryService(req);

        response = response.data;
        dispatch(getWorkloadSummaryResponse(response));
    } catch (e: any) {
        dispatch(errorAlert(e));
        dispatch(getWorkloadSummaryFailure(e));
    }
};


const getWorkloadSummaryResponse = (responseData: WorkloadSummaryResponse): any => {
    //action
    return {
        type: GET_WORKLOAD_SUMMARY_SUCCESS,
        payload: responseData
    };
};

const getWorkloadSummaryRequest = (): any => {
    return {
        type: GET_WORKLOAD_SUMMARY_REQUEST
    };
};

const getWorkloadSummaryFailure = (error: any): any => {
    return {
        type: GET_WORKLOAD_SUMMARY_FAILURE,
        payload: error
    };
};



const getLabAllLabOfficersFailure = (error: any): any => {
    return {
        type: GET_ALL_LAB_OFFICERS_FAILURE,
        payload: error
    };
};

export const resetWorkLoadSummaryReducerState = (): any => {
    return {
        type: RESET_WORKLOAD_SUMMARY_REDUCER_STATE
    };
};



export const updateProfilePictureId = (req: IUpdateProfilePictureRequest) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(userDetailRequest());
        let response = await service.updateProfilePicture(req);

        if ((response.message.code = "200")) {
            response = response.data;
            dispatch(updateProfilePictureSuccess());
        } else {
        }
    } catch (e:any) {
        dispatch(failure(e));
    }
};

const userDetailRequest = (): any => {
    return {
        type: USER_DETAIL_REQUEST
    };
};

const updateProfilePictureSuccess = (): any => {
    return {
        type: UPDATE_PROFILE_PICTURE_SUCCESS
    };
};

const failure = (error: any): any => {
    return {
        type: USER_DETAIL_FAILURE,
        payload: error
    };
};


export const getUserDetail = (req: IUserDetailRequest, callBack: any) => async (dispatch: Dispatch<any>) => {
    try {
        dispatch(userDetailRequest());
        let userDetail = await service.getUserDetail(req);

        userDetail = userDetail.data;
        dispatch(userDetailSuccess(userDetail));
        if (callBack) {
            callBack();
        }
    } catch (e:any) {
        dispatch(errorAlert(e));
        dispatch(failure(e));
    }
};

const userDetailSuccess = (responseData: IUserDetailResponse): any => {
    //action
    return {
        type: USER_DETAIL_SUCCESS,
        payload: responseData
    };
};