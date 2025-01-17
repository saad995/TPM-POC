//Clear App State
import {FORM_STATE_UPDATE, FLOW_STATE_UPDATE, FLOW_STATE_CLEAR_STATE} from '../Subscription/SubscriptionActionTypes';
import {IStepActionType, IFlowActionType, IClearFlowStateType} from '../Subscription/SubscriptionInterfaces'

export const stepAction = (step:number): IStepActionType => {
    return { type: FORM_STATE_UPDATE, step: step };
}
//Clear App State
export const flowStepAction = (step:number): IFlowActionType => {
    return { type: FLOW_STATE_UPDATE, step: step };
}

export const clearFormState = (): IClearFlowStateType => {
    return { type: FLOW_STATE_CLEAR_STATE };
}

