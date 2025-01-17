import {
    GET_WORKLOAD_SUMMARY_REQUEST,
    GET_WORKLOAD_SUMMARY_SUCCESS,
    GET_WORKLOAD_SUMMARY_FAILURE,
    GET_ALL_LAB_OFFICERS_FAILURE,
    GET_ALL_LAB_OFFICERS_REQUEST,
    GET_ALL_LAB_OFFICERS_SUCCESS,
    RESET_WORKLOAD_SUMMARY_REDUCER_STATE
} from "./WorkloadSummaryActionTypes";
import { IGetAllLabOfficersResponse, WorkloadSummaryResponse } from "./WorkloadSummaryInterfaces";

//default state type
interface IDefaultState {
    loading: boolean;
    workloadSummary: WorkloadSummaryResponse;
    message: string;
    labOfficers: IGetAllLabOfficersResponse[];
}

//default state
const defaultState: IDefaultState = {
    loading: false,
    workloadSummary: {} as WorkloadSummaryResponse,
    message: "",
    labOfficers: []
};

//Reducer
const LabEmployeesPerformance = (state: IDefaultState = defaultState, action: any): IDefaultState => {
    switch (action.type) {
        case GET_WORKLOAD_SUMMARY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_WORKLOAD_SUMMARY_SUCCESS:
            return {
                ...state,
                loading: false,
                workloadSummary: action.payload
            };
        case GET_WORKLOAD_SUMMARY_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.payload.description
            };

        case GET_ALL_LAB_OFFICERS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_ALL_LAB_OFFICERS_SUCCESS:
            return {
                ...state,
                loading: false,
                labOfficers: action.payload
            };
        case GET_ALL_LAB_OFFICERS_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.payload.description
            };

        case RESET_WORKLOAD_SUMMARY_REDUCER_STATE:
            return {
                ...state,
                loading: false,
                workloadSummary: {} as WorkloadSummaryResponse,
                message: "",
                labOfficers: [],
            };

        default:
            return state;
    }
};

export default LabEmployeesPerformance;
