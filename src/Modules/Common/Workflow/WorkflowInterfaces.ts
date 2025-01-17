import {
    WORKFLOW_REQUEST,
    WORKFLOW_FAILURE,
    WORKFLOW_CLEAR_STATE,
    CREATE_PROCESS_INSTANCE_SUCCESS,
    GET_AVAILABLE_COMMANDS_SUCCESS,
    EXECUTE_COMMAND_SUCCESS,
    GET_PROCESS_INSTANCE_PERSISTENCE_SUCCESS,
    WF_INVOKE_COMMAND_SUCCESS
} from "./WorkflowActionTypes";
import { IError } from "Lib/Types/SharedTypes";

export interface IWorkflowRequestPayloadType {
    processInstanceId: string;
    command?: ICommandType;
    parameters?: IProcessParameterType[];
}

export interface IWorkflowProcessInstanceType {
    id: string;
    // add other properties when needed
}
export interface IAvailableCommandsType {
    commandName: string;
    displayName: string;
    hasIcon?: boolean;
    style: string;
    validForActivityName: string;
    validForStateName: string;
    classifier: string;
    // processId: number;
    processId: string;
    isForSubprocess: boolean;
}

export interface ICommandParameterType {
    name: string;
    value: string;
}
export interface IProcessParameterType {
    persist: boolean;
    name: string;
    value: string;
}
export interface IWorkflowProcessInstancePersistenceType {
    id: string;
    processId: string;
    parameterName: string;
    value: string;
}

export interface ICommandType {
    name: string;
    parameter: ICommandParameterType[];
    serviceName: string;
    controllerRoute: string;
    methodId: string;
}

export interface IWorkflowRequestType {
    type: typeof WORKFLOW_REQUEST;
}
export interface IFailureType {
    type: typeof WORKFLOW_FAILURE;
    payload: IError;
}
export interface IClearStateType {
    type: typeof WORKFLOW_CLEAR_STATE;
}

export interface IWfCreateProcessInstanceSuccessType {
    type: typeof CREATE_PROCESS_INSTANCE_SUCCESS;
    payload: IWorkflowProcessInstanceType;
}

export interface IWfGetAvaiableCommandsSuccessType {
    type: typeof GET_AVAILABLE_COMMANDS_SUCCESS;
    payload: IAvailableCommandsType[];
}

export interface IWfExecuteCommandSuccessType {
    type: typeof EXECUTE_COMMAND_SUCCESS;
    payload: any;
}

export interface IWfProcessInstancePersistenceSuccessType {
    type: typeof GET_PROCESS_INSTANCE_PERSISTENCE_SUCCESS;
    payload: any;
}

export interface IWfInvlokeCommandSuccessType {
    type: typeof WF_INVOKE_COMMAND_SUCCESS;
    payload: any;
}

export type WorkflowReducerTypes =
    | IWorkflowRequestType
    | IFailureType
    | IClearStateType
    | IWfCreateProcessInstanceSuccessType
    | IWfGetAvaiableCommandsSuccessType
    | IWfExecuteCommandSuccessType
    | IWfProcessInstancePersistenceSuccessType
    | IWfInvlokeCommandSuccessType;

export type AppActions = WorkflowReducerTypes;
