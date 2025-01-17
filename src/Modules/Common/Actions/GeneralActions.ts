import { IError } from "Elements/Types/SharedTypes";
import { BasicFailureType, BasicLoadingRequestType, BasicRequestType, FailureType, RequestType } from "Layouts/AppLayout/AppLayoutInterfaces";
import {
    BASIC_INFO_FAILURE,
    BASIC_INFO_REQUEST,
    SET_IS_LOADING
} from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestActionTypes";

const request = (): BasicRequestType => {
    return {
        type: BASIC_INFO_REQUEST
    };
};
const baseLoadingState = (): BasicLoadingRequestType => {
    return {
        type: SET_IS_LOADING
    };
};
// Failure Action
const failure = (error: IError): BasicFailureType => {
    return {
        type: BASIC_INFO_FAILURE,
        payload: error
    };
};

export { failure, baseLoadingState, request };
