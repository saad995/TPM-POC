//Import action types
import { IError } from "Lib/Types/SharedTypes";
import { Dispatch } from "redux";
import {
    CREATE_PROCESS_INSTANCE_SUCCESS,
    EXECUTE_COMMAND_SUCCESS,
    GET_AVAILABLE_COMMANDS_SUCCESS,
    GET_PROCESS_INSTANCE_PERSISTENCE_SUCCESS,
    WF_INVOKE_COMMAND_SUCCESS,
    WORKFLOW_CLEAR_STATE,
    WORKFLOW_FAILURE,
    WORKFLOW_REQUEST
} from "./WorkflowActionTypes";
import {
    IAvailableCommandsType,
    IClearStateType,
    ICommandType,
    IFailureType,
    IProcessParameterType,
    IWfCreateProcessInstanceSuccessType,
    IWfExecuteCommandSuccessType,
    IWfGetAvaiableCommandsSuccessType,
    IWfInvlokeCommandSuccessType,
    IWfProcessInstancePersistenceSuccessType,
    IWorkflowProcessInstancePersistenceType,
    // DataTypes
    IWorkflowProcessInstanceType,
    IWorkflowRequestType,
    WorkflowReducerTypes
} from "./WorkflowInterfaces";

import { UserRole } from "../Constants/Types/UserRole";
import service from "./WorkflowService";

/************************** Actions Creators ************************/

export const wfCreateProcessInstanceAction = (scheme: any) => async (dispatch: Dispatch<WorkflowReducerTypes>) => {
    try {
        dispatch(request());
        

        let response: IWorkflowProcessInstanceType = await service.wfCreateProcessInstance(
            { scheme } //req
        );

        dispatch(wfCreateProcessInstanceSuccess(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const wfGetAvaiableCommandsAction = (processInstanceId: string, stateName: string[], actor: string) => async (
    dispatch: Dispatch<WorkflowReducerTypes>
) => {
    try {
        dispatch(request());
        // 
        let response: IAvailableCommandsType[] = await service.wfGetAvaiableCommands(
            { processInstanceId, stateName, actor:actor } //req
        );

        dispatch(wfGetAvaiableCommandsSuccess(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const wfExecuteCommandAction = (
    processInstanceId: string,
    command?: ICommandType,
    processParameters?: IProcessParameterType[]
) => async (dispatch: Dispatch<WorkflowReducerTypes>) => {
    try {
        dispatch(request());

        let response = await service.wfExecuteCommand({
            processInstanceId,
            command,
            processParameters
        });
        dispatch(wfExecuteCommandSuccess(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const wfGetProcessInstancePersistenceAction = (parameterName: string, value: string) => async (
    dispatch: Dispatch<WorkflowReducerTypes>
) => {
    try {
        // 
        // 
        dispatch(request());

        let response: IWorkflowProcessInstancePersistenceType = await service.wfGetProcessInstancePersistence(
            { parameterName, value } //req
        );
        dispatch(wfGetProcessInstancePersistenceSuccess(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

export const wfInvlokeCommandAction = (command: ICommandType, reqData: any) => async (
    dispatch: Dispatch<WorkflowReducerTypes>
) => {
    try {
        dispatch(request());

        let apiURl = "";

        let response: any = await service.wfInvlokeCommand(reqData, apiURl, command.methodId);

        dispatch(wfInvlokeCommandSuccess(response));
    } catch (e:any) {
        dispatch(failure(e));
    }
};

/************************** Actions ************************/

// Request Action
const request = (): IWorkflowRequestType => {
    return {
        type: WORKFLOW_REQUEST
    };
};
// Failure Action
const failure = (error: IError): IFailureType => {
    return {
        type: WORKFLOW_FAILURE,
        payload: error
    };
};

// Failure Action
export const clearState = (): IClearStateType => {
    return {
        type: WORKFLOW_CLEAR_STATE
    };
};

export const wfCreateProcessInstanceSuccess = (
    response: IWorkflowProcessInstanceType
): IWfCreateProcessInstanceSuccessType => {
    return {
        type: CREATE_PROCESS_INSTANCE_SUCCESS,
        payload: response
    };
};

export const wfGetAvaiableCommandsSuccess = (response: IAvailableCommandsType[]): IWfGetAvaiableCommandsSuccessType => {
    return {
        type: GET_AVAILABLE_COMMANDS_SUCCESS,
        payload: response
    };
};

export const wfExecuteCommandSuccess = (response: any): IWfExecuteCommandSuccessType => {
    return {
        type: EXECUTE_COMMAND_SUCCESS,
        payload: response
    };
};

export const wfGetProcessInstancePersistenceSuccess = (
    response: IWorkflowProcessInstancePersistenceType
): IWfProcessInstancePersistenceSuccessType => {
    return {
        type: GET_PROCESS_INSTANCE_PERSISTENCE_SUCCESS,
        payload: response
    };
};

export const wfInvlokeCommandSuccess = (response: any): IWfInvlokeCommandSuccessType => {
    return {
        type: WF_INVOKE_COMMAND_SUCCESS,
        payload: response
    };
};

export default {};
