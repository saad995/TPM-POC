import {
    FORM_STATE_UPDATE,
    SUBSCRIPTION_INFORMATION_VALIDATE_NTN_SUCCESS
} from "./SubscriptionActionTypes";
import {keyValue} from "Lib/Types/SharedTypes"


//Clear App State
import {
    FLOW_STATE_CLEAR_STATE,
    FLOW_STATE_UPDATE
} from "./SubscriptionActionTypes";

//Clear App State
export interface IFlowActionType {
    type: typeof FLOW_STATE_UPDATE;
    step: number;
}
export interface IClearFlowStateType {
    type: typeof FLOW_STATE_CLEAR_STATE;
}
export interface IStepActionType {
    type: typeof FORM_STATE_UPDATE;
    step: number;
}
export interface IGenerateVoucherResponse {
    message: any;
    data: any;
}
export interface IValidateNTNComponentMappingData {
    applicationId: string;
    NTN: string;
    STRN: string;
    nameofCompany: string;
    companyType?: string;
    principalActivity: keyValue[];
    businessName: keyValue[];
    businessAddress: keyValue[];
    cnicNumbers: keyValue[];
    formId?: string;
    cell?: string;
    email?: string;
    cnic?: string;
}

export interface IValidatNTNSuccessType {
    type: typeof SUBSCRIPTION_INFORMATION_VALIDATE_NTN_SUCCESS;
    payload: IValidateNTNComponentMappingData;
}
