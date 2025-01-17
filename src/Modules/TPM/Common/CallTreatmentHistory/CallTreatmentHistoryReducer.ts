import { IErrorType } from "Lib/Types/SharedTypes";
import { GET_USER_RIGHTS_FAILURE } from "Modules/TPM/Common/UserRights/UserRightsActionTypes";
import { IUserRightsResponseData } from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
import {
    CHANGE_ITEMWISE_STATUS_SUCCESS,
    CHANGE_RELEASE_ORDER_STATUS_SUCCESS,
    RELEASE_ORDER_CLEAR_STATE,
    RELEASE_ORDER_DETAILED_VIEW_SUCCESS,
    RELEASE_ORDER_RIGHTS_SUCCESS,
    RELEASE_ORDER_VIEW_FAILURE,
    RELEASE_ORDER_VIEW_PHYSICAL_INSPECTION_SUCCESS,
    RELEASE_ORDER_VIEW_REQUEST,
    RELEASE_ORDER_VIEW_SUCCESS,
    TPM_CallTreatment_History_FAILURE,
    TPM_CallTreatment_History_REQUEST,
    TPM_CallTreatment_History_SUCCESS
} from "./CallTreatmentHistoryActionTypes";

import {
    IChangeReleaseOrderStatusResponseData,
    IViewPhysicalInspectionResponseData,
    IViewDetailResponseData,
    IViewResponseData,
    ReleaseOrderViewActionTypes,
    IChangeItemWiseStatusResponseData,
    ITPMCallTreatmentHistory,
    ITPMCallTreatmentResponseData
} from "./CallTreatmentHistoryInterfaces";

// Default state type
interface IReleaseOrderViewState {
    loading: boolean;
    tpmCallTreatmentLoading: boolean;
    basicInformation: IViewResponseData;
    changeStatus: IChangeReleaseOrderStatusResponseData;
    changeItemWiseStatus: IChangeItemWiseStatusResponseData;
    physicalInspection: IViewPhysicalInspectionResponseData[];
    detailedInformation: IViewDetailResponseData;
    error: IErrorType;
    rightsReterived: boolean;
    userRights: IUserRightsResponseData;
    tpmCallTreatmentHistory: ITPMCallTreatmentResponseData;
}

//default state
const defaultState: IReleaseOrderViewState = {
    loading: false,
    tpmCallTreatmentLoading: false,
    basicInformation: {
        releaseOrderId: 0,
        gdid: 0,
        gdNumber: "",
        requestDocumentNumber: "",
        status: "",
        releaseOrderIdS: "",
        statusID: 0,
        gdidS: "",
        agencyId: "",
        items: [],
        agencyID: 0,
        agencyIdN: 0,
        requestDocumentTypeCode: "",
        billAmount: 0,
        location: "",
        intrmDocumentTypeCode: "",
        intrmDocumentNumber: "",
        rejectedBy:"",
        rejectedByName:"",
        officerName:"",
        agencyName:"",
        releaseOrderDocumentHistory:[],
        callLabHistory: { isAllLabCompleted: false, labSummary: [] }
    },
    physicalInspection: [],
    detailedInformation: {
        gdNumber: "",
        ntn: "",
        consigneeName: "",
        consigneeAddress: "",
        agentName: "",
        agentAddress: "",
        blNumber: "",
        blDate: "",
        importedFrom: "",
        terminal: "",
        vesselName: "",
        arivalDate: "",
        packageType: "",
        declarationTypeID: 0,
        igmCollectorateID: 0,
        imgCompleteNumber: "",
        traderSubscriptionId: 0,
        agentSubscriptionId: 0,
        commodities: [
            {
                hsCode: "",
                gdItemId: "",
                hsCodeExt: "",
                declaredDescription: "",
                itemDescription: "",
                itemFee:0,
                commodity: "",
                originCountryCode: "",
                importPurpose: "",
                importPurposeId: "",
                quantity: "",
                numberOfPackages: "",
                uom: "",
                details:{}
            }
        ],
        additionalDescription: "",
        portId: 0,
        portName: "",
        destinationCountryCode: "",
        destinationCountryName: "",
        conveyance: "",
        transportId: 0,
        packages: [],
        itemContainers: [],
        containers: [],
        location: ""
    },
    changeStatus: { code: 0, message: "" },
    changeItemWiseStatus: { code: 0, message: "" },
    error: {
        description: "",
        code: ""
    },
    rightsReterived: false,
    userRights:{data:""},
    tpmCallTreatmentHistory: {} as ITPMCallTreatmentResponseData
};

//Reducer
const CallTreatmentHistoryReducer = (
    state: IReleaseOrderViewState = defaultState,
    action: ReleaseOrderViewActionTypes
): IReleaseOrderViewState => {
    switch (action.type) {
        case RELEASE_ORDER_VIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case RELEASE_ORDER_VIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                basicInformation: action.payload ?? defaultState.basicInformation
            };
        case RELEASE_ORDER_RIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                userRights: action.payload ?? defaultState.userRights
            };
        case RELEASE_ORDER_VIEW_PHYSICAL_INSPECTION_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                physicalInspection: action.payload ?? defaultState.physicalInspection
            };
        case RELEASE_ORDER_DETAILED_VIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                detailedInformation: action.payload ?? defaultState.detailedInformation
            };
        case CHANGE_RELEASE_ORDER_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                changeStatus: action.payload ?? defaultState.changeStatus
            };
        case RELEASE_ORDER_VIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case RELEASE_ORDER_CLEAR_STATE:
            return {
                ...defaultState
            };
        case CHANGE_ITEMWISE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                changeStatus: action.payload ?? defaultState.changeItemWiseStatus
            };
        case GET_USER_RIGHTS_FAILURE:
            return {
                ...state,
                loading: false,
                rightsReterived: false,
                error: action.payload ?? defaultState.error
            };
        case TPM_CallTreatment_History_REQUEST:
            return {
                ...state,
                tpmCallTreatmentLoading: true
            };
        case TPM_CallTreatment_History_SUCCESS:
            return {
                ...state,
                tpmCallTreatmentLoading: false,
                tpmCallTreatmentHistory: action.payload ?? defaultState.tpmCallTreatmentHistory
            };
        case TPM_CallTreatment_History_FAILURE:
            return {
                ...state,
                tpmCallTreatmentLoading: false,
                tpmCallTreatmentHistory: defaultState.tpmCallTreatmentHistory
            };
        default:
            return state;
    }
};

export default CallTreatmentHistoryReducer;
