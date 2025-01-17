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
    TPM_Form22_History_FAILURE,
    TPM_Form22_History_REQUEST,
    TPM_Form22_History_SUCCESS
} from "./Form-22-TreatmentProviderHistoryActionTypes";

import {
    IChangeReleaseOrderStatusResponseData,
    IViewPhysicalInspectionResponseData,
    IViewDetailResponseData,
    IViewResponseData,
    ReleaseOrderViewActionTypes,
    IChangeItemWiseStatusResponseData,
    ITPMForm22History,
    ITPMForm22ResponseData
} from "./Form-22-TreatmentProviderHistoryInterfaces";

// Default state type
interface IReleaseOrderViewState {
    loading: boolean;
    tpmForm22Loading: boolean;
    basicInformation: IViewResponseData;
    changeStatus: IChangeReleaseOrderStatusResponseData;
    changeItemWiseStatus: IChangeItemWiseStatusResponseData;
    physicalInspection: IViewPhysicalInspectionResponseData[];
    detailedInformation: IViewDetailResponseData;
    error: IErrorType;
    rightsReterived: boolean;
    userRights: IUserRightsResponseData;
    tpmForm22History: ITPMForm22ResponseData;
}

//default state
const defaultState: IReleaseOrderViewState = {
    loading: false,
    tpmForm22Loading: false,
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
    tpmForm22History: {} as ITPMForm22ResponseData
};

//Reducer
const TPMForm22HistoryReducer = (
    state: IReleaseOrderViewState = defaultState,
    action: ReleaseOrderViewActionTypes
): IReleaseOrderViewState => {
    switch (action.type) {
        case GET_USER_RIGHTS_FAILURE:
            return {
                ...state,
                loading: false,
                rightsReterived: false,
                error: action.payload ?? defaultState.error
            };
        case TPM_Form22_History_REQUEST:
            return {
                ...state,
               tpmForm22Loading: true
            };
        case TPM_Form22_History_SUCCESS:
            return {
                ...state,
                tpmForm22Loading: false,
                tpmForm22History: action.payload ?? defaultState.tpmForm22History
            };
        case TPM_Form22_History_FAILURE:
            return {
                ...state,
                tpmForm22Loading: false,
                tpmForm22History: defaultState.tpmForm22History
            };
        default:
            return state;
    }
};

export default TPMForm22HistoryReducer;
