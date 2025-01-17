import { IError } from "Elements/Types/SharedTypes";
import { IErrorType } from "Lib/Types/SharedTypes";
import { GET_USER_RIGHTS_FAILURE } from "Modules/TPM/Common/UserRights/UserRightsActionTypes";
import {
    CHANGE_EXPORT_CERTIFICATE_AMENDMENT_STATUS_SUCCESS,
    CHANGE_EXPORT_CERTIFICATE_EXTENSION_STATUS_SUCCESS,
    CHANGE_EXPORT_CERTIFICATE_REVIEW_STATUS_SUCCESS,
    CHANGE_EXPORT_CERTIFICATE_STATUS_SUCCESS,
    CKECK_IF_EXTENDED_ELEMENTS_SUCCESS,
    EXPORT_CERTIFICATE_ATTESTATIONS_DETAILS,
    EXPORT_CERTIFICATE_DETAILED_VIEW_SUCCESS,
    EXPORT_CERTIFICATE_VIEW_CLEAR_STATE,
    EXPORT_CERTIFICATE_VIEW_FAILURE,
    EXPORT_CERTIFICATE_VIEW_PHYSICAL_INSPECTION_SUCCESS,
    EXPORT_CERTIFICATE_VIEW_REQUEST,
    EXPORT_CERTIFICATE_VIEW_SUCCESS,
    SUBMIT_EC_EXTENSION_SUCCESS,
    SUBMIT_EC_REVIEW_SUCCESS
} from "./ViewActionTypes";
import {
    ExportCertificateHealthAttestation,
    ExportCertificateViewActionTypes,
    IChangeExportCertificateStatusResponseData,
    ICheckIfExtendedElementsResponseData,
    ISubmitExtensionResponseData,
    ISubmitReviewResponseData,
    IViewDetailResponseData,
    IViewPhysicalInspectionResponseData,
    IViewResponseData
} from "./ViewInterfaces";

//default state type
interface IExportCertifiateViewState {
    loading: boolean;
    basicInformation: IViewResponseData;
    changeStatus: IChangeExportCertificateStatusResponseData;
    physicalInspection: IViewPhysicalInspectionResponseData[];
    amendmentChangeStatus: IChangeExportCertificateStatusResponseData;
    detailedInformation: IViewDetailResponseData;
    isExtendedElements: ICheckIfExtendedElementsResponseData;
    message: {
        message: string;
        code: number;
    };
    error: IErrorType;
    rightsReterived: boolean;
    submitExtensionRequest: ISubmitExtensionResponseData;
    submitReviewRequest: ISubmitReviewResponseData;
    attestations: ExportCertificateHealthAttestation[];
}

//default state
const defaultState: IExportCertifiateViewState = {
    loading: false,
    physicalInspection: [],
    amendmentChangeStatus: { code: 0, message: "" },
    changeStatus: { code: 0, message: "" },
    basicInformation: {
        exportCertificateId: 0,
        gdid: 0,
        billAmount: 0,
        exportCertificateIdS: "",
        gdidS: "",
        gdNumber: undefined,
        requestDocumentNumber: undefined,
        certIssueDate: undefined,
        certEffectiveDate: undefined,
        certDocumentNumber: undefined,
        certDocumentTypeCode: "",
        comments: undefined,
        status: undefined,
        agencyId: "",
        agencyIdN: 0,
        statusID: 0,
        location: "",
        rejectedBy: "",
        rejectedByName: "",
        isExtensionAllowed: false,
        extensionDocumentTypeCode: "",
        extensionId: 0,
        exportCertificateExtensionHistory: [],
        isReviewAllowed: false,
        isReviewRequested: false,
        reviewDocumentTypeCode: "",
        reviewId: 0,
        isHealthCertificate: false,
        officerName: "",
        agencyName: "",
        exportCertificateDocumentHistory: [],
        healthAttestaion: [],
        items: [
            {
                exportCertificateIdS: "",
                exportCertificateItemIdS: "",
                gdItemIdS: "",
                exportCertificateId: 0,
                itemId: 0,
                itemIds: "",
                gdItemId: 0,
                gdidS: "",
                attachedDocumentId: 0,
                attachedDocName: undefined,
                attachedDocumentTypeCode: undefined,
                documentClassificationCode: undefined,
                itemStatusID: 0,
                itemStatus: "",
                comments: "",
                isExtensionRequested: false,
                extensionId: 0,
                oldExpiryDate: ""
            }
        ],
    },
    detailedInformation: {
        amendedExportCertificate: {
            gdNumber: "",
            ntn: "",
            consigneeName: "",
            consigneeAddress: "",
            agentName: "",
            agentAddress: "",
            blNumber: "",
            blDate: new Date(),
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
            portId: 0,
            portName: "",
            destinationCountryCode: "",
            destinationCountryName: "",
            conveyance: "",
            transportId: 0,
            additionalDescription: "",
            commodities: [
                {
                    hsCode: "",
                    gdItemId: "",
                    itemId: 0,
                    gdItemIds: "",
                    itemIds: "",
                    hsCodeExt: "",
                    itemDescription: "",
                    itemFee: 0,
                    declaredDescription: "",
                    commodity: "",
                    originCountryCode: "",
                    importPurpose: "",
                    importPurposeId: "",
                    quantity: "",
                    numberOfPackages: "",
                    uom: "",
                    validityDate: ""
                }
            ],
            packages: [],
            itemContainers: [],
            containers: [],
            location: "",
            consignmentModeId: 0,
            consignmentModeName: ""
        },
        exportCertificate: {
            gdNumber: "",
            ntn: "",
            consigneeName: "",
            consigneeAddress: "",
            agentName: "",
            agentAddress: "",
            blNumber: "",
            blDate: new Date(),
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
            portId: 0,
            portName: "",
            destinationCountryCode: "",
            destinationCountryName: "",
            conveyance: "",
            transportId: 0,
            additionalDescription: "",
            commodities: [
                {
                    hsCode: "",
                    gdItemId: "",
                    itemId: 0,
                    gdItemIds: "",
                    itemIds: "",
                    hsCodeExt: "",
                    declaredDescription: "",
                    itemDescription: "",
                    itemFee: 0,
                    commodity: "",
                    originCountryCode: "",
                    importPurpose: "",
                    importPurposeId: "",
                    quantity: "",
                    numberOfPackages: "",
                    uom: "",
                    validityDate: ""
                }
            ],
            packages: [],
            itemContainers: [],
            containers: [],
            location: "",
            consignmentModeId: 0,
            consignmentModeName: ""
        }
    },
    isExtendedElements: {
        hsCodes: []
    },
    message: { code: 0, message: "" },
    error: {
        description: "",
        code: ""
    },
    rightsReterived: false,
    submitExtensionRequest: { code: 0, message: "" },
    submitReviewRequest: { code: 0, message: "" },
    attestations: []
};

//Reducer
const exportCertificateViewReducer = (
    state: IExportCertifiateViewState = defaultState,
    action: ExportCertificateViewActionTypes
): IExportCertifiateViewState => {
    switch (action.type) {
        case EXPORT_CERTIFICATE_VIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case EXPORT_CERTIFICATE_VIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                basicInformation: action.payload ?? defaultState.basicInformation
            };
        case EXPORT_CERTIFICATE_DETAILED_VIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                detailedInformation: action.payload ?? defaultState.detailedInformation
            };
        case EXPORT_CERTIFICATE_VIEW_PHYSICAL_INSPECTION_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                physicalInspection: action.payload ?? defaultState.physicalInspection
            };
        case CHANGE_EXPORT_CERTIFICATE_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                changeStatus: action.payload ?? defaultState.changeStatus
            };
        case CHANGE_EXPORT_CERTIFICATE_AMENDMENT_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                amendmentChangeStatus: action.payload ?? defaultState.amendmentChangeStatus
            };
        case CKECK_IF_EXTENDED_ELEMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                isExtendedElements: action.payload
            };
        case EXPORT_CERTIFICATE_VIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case EXPORT_CERTIFICATE_VIEW_CLEAR_STATE:
            return {
                ...defaultState
            };
        case GET_USER_RIGHTS_FAILURE:
            return {
                ...state,
                loading: false,
                rightsReterived: false,
                error: action.payload ?? defaultState.error
            };
        case SUBMIT_EC_EXTENSION_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                submitExtensionRequest: action.payload ?? defaultState.changeStatus
            };
        case CHANGE_EXPORT_CERTIFICATE_EXTENSION_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true
            };
        case SUBMIT_EC_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true,
                submitReviewRequest: action.payload ?? defaultState.changeStatus
            };
        case CHANGE_EXPORT_CERTIFICATE_REVIEW_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                rightsReterived: true
            };
        case EXPORT_CERTIFICATE_ATTESTATIONS_DETAILS:
            return {
                ...state,
                attestations: action.payload
            };
        default:
            return state;
    }
};

export default exportCertificateViewReducer;
