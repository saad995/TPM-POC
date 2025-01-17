import {
    WORKFLOW_REQUEST,
    WORKFLOW_FAILURE,
    WORKFLOW_CLEAR_STATE,
    CREATE_PROCESS_INSTANCE_SUCCESS,
    GET_AVAILABLE_COMMANDS_SUCCESS,
    EXECUTE_COMMAND_SUCCESS,
    GET_PROCESS_INSTANCE_PERSISTENCE_SUCCESS
} from "./WorkflowActionTypes";
import {
    WorkflowReducerTypes,
    IWorkflowProcessInstanceType,
    IAvailableCommandsType,
    IWorkflowProcessInstancePersistenceType
} from "./WorkflowInterfaces";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";

//default state type
interface IWorkflowState {
    loading: boolean;
    setMessage: IMessage;
    ProcessInstance: IWorkflowProcessInstanceType;
    AvaiableCommands: IAvailableCommandsType[];
    ProcessInstancePersistance: IWorkflowProcessInstancePersistenceType;
}

// Default state
const defaultState: IWorkflowState = {
    loading: false,
    setMessage: { code: "", description: "" },
    ProcessInstance: { id: "" },
    AvaiableCommands: [],
    ProcessInstancePersistance:  {
        id: "0",
        parameterName: "",
        processId : "" ,
        value : ""
    } 
};

const workflowReducer = (
    state: IWorkflowState = defaultState,
    action: WorkflowReducerTypes
): IWorkflowState => {
    switch (action.type) {
        case WORKFLOW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case WORKFLOW_FAILURE:
            return {
                ...state,
                loading: false
            };

        case WORKFLOW_CLEAR_STATE:
            return {
                ...defaultState
            };
        case CREATE_PROCESS_INSTANCE_SUCCESS:
            return {
                ...state,
                ProcessInstance: action.payload,
                loading: false
            };
        case GET_AVAILABLE_COMMANDS_SUCCESS:
            return {
                ...state,
                AvaiableCommands: action.payload,
                loading: false
            };
        case EXECUTE_COMMAND_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case GET_PROCESS_INSTANCE_PERSISTENCE_SUCCESS:
            return {
                ...state,
                ProcessInstancePersistance: action.payload,
                loading: false
            };

        default:
            return state;
    }
};

export default workflowReducer;
