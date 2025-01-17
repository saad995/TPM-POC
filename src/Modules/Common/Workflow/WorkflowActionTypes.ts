///////////////////////////////////// WORKFLOW //////////////////////////////////////////////////////////////////////////

//Manage Instances Action Types
export const GET_ALL_PROCESS_INSTANCES_REQUEST =
    "GET_ALL_PROCESS_INSTANCES_REQUEST";
export const GET_ALL_PROCESS_INSTANCES_FAILURE =
    "GET_ALL_PROCESS_INSTANCES_FAILURE";
export const PROCESS_INSTANCES_CLEAR_STATE = "PROCESS_INSTANCES_CLEAR_STATE";
export const GET_ALL_PROCESS_INSTANCES_SUCCESS =
    "GET_ALL_PROCESS_INSTANCES_SUCCESS";

//Instance Transition History Action Types
export const GET_TRANSITION_HISTORY_REQUEST = "GET_TRANSITION_HISTORY_REQUEST";
export const GET_TRANSITION_HISTORY_FAILURE = "GET_TRANSITION_HISTORY_FAILURE";
export const TRANSITION_HISTORY_CLEAR_STATE = "TRANSITION_HISTORY_CLEAR_STATE";
export const GET_TRANSITION_HISTORY_SUCCESS = "GET_TRANSITION_HISTORY_SUCCESS";

// Manage Scheme Action Types

export const GET_ALL_WORKFLOW_SCHEMES_REQUEST =
    "GET_ALL_WORKFLOW_SCHEMES_REQUEST";
export const GET_ALL_WORKFLOW_SCHEMES_SUCCESS =
    "GET_ALL_WORKFLOW_SCHEMES_SUCCESS";
export const GET_ALL_WORKFLOW_SCHEMES_FAILURE =
    "GET_ALL_WORKFLOW_SCHEMES_FAILURE";
export const WORKFLOW_SCHEMES_CLEAR_STATE = "WORKFLOW_SCHEMES_CLEAR_STATE";

export const WORKFLOW_REQUEST = "WORKFLOW_REQUEST";
export const WORKFLOW_FAILURE = "WORKFLOW_FAILURE";
export const WORKFLOW_CLEAR_STATE = "WORKFLOW_CLEAR_STATE";

export const CREATE_PROCESS_INSTANCE_SUCCESS =
    "CREATE_PROCESS_INSTANCE_SUCCESS";
export const GET_AVAILABLE_COMMANDS_SUCCESS = "GET_AVAILABLE_COMMANDS_SUCCESS";
export const EXECUTE_COMMAND_SUCCESS = "EXECUTE_COMMAND_SUCCESS";
export const GET_PROCESS_INSTANCE_PERSISTENCE_SUCCESS =
    "GET_PROCESS_INSTANCE_PERSISTENCE_SUCCESS";
export const WF_INVOKE_COMMAND_SUCCESS = "WF_INVOKE_COMMAND_SUCCESS";
