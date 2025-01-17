import { IError, IErrorType } from "Lib/Types/SharedTypes";
import { IUserRightsFailureType } from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
import { IAvailableCommandsType } from "Modules/Common/Workflow/WorkflowInterfaces";
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
import { IErrorAlertMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";

export interface IGetPhysicalInspectionRequestData {
    initDocumentID: number;
    initDocumentTypeCode: string;
    roleCode: string;
    agencyId: number;
    rights: string;
}
export interface IViewPhysicalInspectionResponseData {
    physicalInspectionId: number;
    percentageInfested: number | null;
    percentage?: string;
    insectIntercepted: string;
    diseaseIntercepted: string;
    noxiousWeedIntercepted: string;
    isMarkedFumigated: string;
    documentId: string;
    role: string;
    officerName?: string;
    requestOn?: Date;
    requestBy: number;
    requestBys: string;
    requestComments?: string;
    approvedOn: Date;
    approvedBy: number;
    approvedBys: string;
    assessorName?: string;
    approverComments: string;
    findings?: string;
    treatment?: string;
    comments: string;
    inspectedOn: Date;
    inspectedBy: number;
    inspectedBys: string;
    inspecterName?: string;
    attachments?: [];
    OfficerAttachments?: [];
}
export interface IViewRequestData {
    initDocumentId: number;
    initDocumentTypeCode: string;
    roleCode: string;
    rights: string;
    extensionId?: number;
    extensionDocumentTypeCode?: string;
    reviewId?: number;
    reviewDocumentTypeCode?: string;
}
export interface IViewResponseData {
    exportCertificateIdS: string;
    gdidS: string;
    exportCertificateId: number;
    gdid: number;
    gdNumber?: string;
    requestDocumentNumber?: string;
    certIssueDate?: string;
    certEffectiveDate?: string;
    certDocumentNumber?: string;
    certDocumentTypeCode: string;
    comments?: string;
    items: ExportCertificateItem[];
    statusID: number;
    status?: string;
    agencyId: string;
    sdid?: string;
    agencyIdN: number;
    billAmount: number;
    location: string;
    rejectedBy: string;
    rejectedByName: string;
    isExtensionAllowed: boolean;
    traderExtensionRemarks?: string;
    isExtensionRequested?: boolean;
    extensionDocumentTypeCode: string;
    extensionId: number;
    currentExpiryDate?: Date;
    exportCertificateExtensionHistory: ExportCertificateExtensionHistory[];
    officerName: string;
    agencyName: string;
    exportCertificateDocumentHistory: ExportCertificateDocumentHistory[];
    isReviewAllowed: boolean;
    isReviewRequested?: boolean;
    reviewDocumentTypeCode: string;
    reviewId: number;
    traderReviewRemarks?: string;
    isHealthCertificate: boolean;
    healthAttestaion: ExportCertificateHealthAttestation[];
}

export interface ExportCertificateExtensionHistory {
    extensionRequestID: Number;
    traderExtensionRemarks: string;
    createdOn: string;
    status: string;
    oldExpiryDate: string;
    newExpiryDate: string;
    officersRemarks: string;
    isBillPaid: boolean;
    billAmount: Number;
    billDocumentNumber: string;
    extensionRequestDetail: ExtensionRequestDetail[];
}
export interface ExtensionRequestDetail {
    extensionRequestID: Number;
    documentItemID: Number;
    itemDescription?: string;
    hsCodeExt?: string;
    expanded?: boolean;
    itemFields: ItemFields[];
}
export interface ItemFields {
    extensionRequestDetailID: Number;
    fieldName: string;
    oldValue: string;
    newValue: string;
}
export interface ExportCertificateDocumentHistory {
    actedOn: string;
    status: string;
    officersRemarks: string;
    actedBy: string;
    actedByName: string;
    facilityItems?: any;
}
export interface ExportCertificateItem {
    exportCertificateIdS: string;
    gdidS: string;
    exportCertificateItemIdS: string;
    gdItemIdS: string;
    exportCertificateId: number;
    itemId: number;
    itemIds: string;
    gdItemId: number;
    attachedDocumentId: Number;
    attachedDocName?: string;
    attachedDocumentTypeCode?: string;
    documentClassificationCode?: string;
    itemStatusID: number;
    itemStatus: string;
    comments: string;
    isExtensionRequested?: boolean;
    extensionId: number;
    oldExpiryDate: string;
    date?: Date;
}
export interface IViewDetailRequestData {
    gdid: string;
    agencyId: number;
    roleCode: string;
    isAmended: boolean;
}
export interface Package {
    packageId: number;
    packageTypeId: Number;
    typeOfPackages: string;
    numberOfPackages: Number;
}
export interface Container {
    containerId: Number;
    containerNumber: string;
    packageUnit: string;
    noOfPackages: string;
    soc: string;
    vehicleNumber: string;
    containerItems: ItemContainerInformation[];
    expanded?: boolean;
}
export interface IViewDetailResponseData {
    amendedExportCertificate?: ExportCertificateDetailsFromSD;
    exportCertificate: ExportCertificateDetailsFromSD;
}
export interface ExportCertificateDetailsFromSD {
    gdNumber?: string;
    ntn: string;
    consigneeName: string;
    consigneeAddress: string;
    agentName?: string;
    agentAddress?: string;
    blNumber: string;
    blDate: Date;
    importedFrom: string;
    terminal: string;
    vesselName: string;
    arivalDate: string;
    packageType: String;
    declarationTypeID: Number;
    imgCompleteNumber: string;
    igmCollectorateID: Number;
    traderSubscriptionId: Number;
    agentSubscriptionId: Number;
    additionalDescription: string;
    portId: Number;
    portName: string;
    destinationCountryCode: string;
    destinationCountryName: string;
    conveyance: string;
    transportId: Number;
    commodities: Commodity[];
    packages: Package[];
    containers: Container[];
    itemContainers: ItemContainerInformation[];
    location: string;
    consignmentModeId: Number;
    consignmentModeName: string;
}
export interface ItemContainerInformation {
    containerNumber: string;
    sealNumber: string;
    hsCode: string;
    containerId: Number;
    vehicleNumber: string;
}
export interface ExportCertificateHealthAttestation {
    id: Number;
    label: string;
    isChecked: string;
}
export interface Commodity {
    gdItemId?: string;
    gdItemIds?: string;
    hsCode: string;
    itemId: Number;
    itemIds: string;
    hsCodeExt: string;
    itemDescription: string;
    itemFee: Number;
    declaredDescription: string;
    commodity: string;
    originCountryCode: string;
    importPurpose: string;
    importPurposeId: string;
    quantity: string;
    numberOfPackages: string;
    uom: string;
    validityDate: string;
    categoryID?: Number;
}
export interface IChangeExportCertificateStatusRequestData {
    command?: IAvailableCommandsType;
    initDocumentId: number;
    initDocumentTypeCode: string;
    statusId: number;
    roleCode: string;
    comments: string;
    agencyId: number;
    rights: string;
    healthAttestaion?: ExportCertificateHealthAttestation[];
}

export interface IChangeExportCertificateAmendmentStatusRequestData {
    command?: IAvailableCommandsType;
    initDocumentId: number;
    initDocumentTypeCode: string;
    statusId: number;
    roleCode: string;
    comments: string;
    agencyId: number;
    rights: string;
    healthAttestaion?: ExportCertificateHealthAttestation[];
}
export interface ISubmitExtensionRequestData {
    sdId: string;
    initDocumentId: number;
    initDocumentTypeCode: string;
    documentTypeCode: string;
    statusId: number;
    roleCode: string;
    comments: string;
    agencyId: number;
    rights: string;
    currentExpiryDate?: Date;
    documentClassificationCode: string;
    //items: ItemExtension[];
}
// export interface ItemExtension {
//     itemId: string;
//     validityDate: string;
// }
export interface IChangeExportCertificateExtensionStatusRequestData {
    command?: IAvailableCommandsType;
    initDocumentId: number;
    initDocumentTypeCode: string;
    documentClassificationCode: string;
    statusId: number;
    comments: string;
    roleCode: string;
    rights: string;
}

export interface ISubmitReviewRequestData {
    initDocumentId: number;
    initDocumentTypeCode: string;
    documentTypeCode: string;
    statusId: number;
    roleCode: string;
    comments: string;
    agencyId: number;
    rights: string;
    documentClassificationCode: string;
    traderReviewRemarks: string;
}
export interface IChangeExportCertificateReviewStatusRequestData {
    command?: IAvailableCommandsType;
    initDocumentId: number;
    initDocumentTypeCode: string;
    documentClassificationCode: string;
    statusId: number;
    comments: string;
    roleCode: string;
    rights: string;
}
export interface IChangeValidityDateSDRequestData {
    sDID: string;
    // extensionDate?: Date;
    //items: ItemExtension[];
    agencyID: string;
}
export interface IChangeExportCertificateStatusResponseData {
    message: string;
    code: number;
}
export interface ISubmitExtensionResponseData {
    message: string;
    code: number;
}
export interface ISubmitReviewResponseData {
    message: string;
    code: number;
}
export interface ICheckIfExtendedElementsRequestData {
    sdid: string;
    agencyId: string;
}
export interface ICheckIfExtendedElementsResponseData {
    hsCodes: string[];
}
export interface IExportCertificateViewSuccessType {
    type: typeof EXPORT_CERTIFICATE_VIEW_SUCCESS;
    payload: IViewResponseData;
}
export interface IViewPhysicalInspectionSuccessType {
    type: typeof EXPORT_CERTIFICATE_VIEW_PHYSICAL_INSPECTION_SUCCESS;
    payload: IViewPhysicalInspectionResponseData[];
}
export interface IExportCertificateDetailedViewSuccessType {
    type: typeof EXPORT_CERTIFICATE_DETAILED_VIEW_SUCCESS;
    payload: IViewDetailResponseData;
}
export interface IChangeExportCertificateStatusSuccessType {
    type: typeof CHANGE_EXPORT_CERTIFICATE_STATUS_SUCCESS;
    payload: IChangeExportCertificateStatusResponseData;
}
export interface IChangeExportCertificateAmendmentStatusSuccessType {
    type: typeof CHANGE_EXPORT_CERTIFICATE_AMENDMENT_STATUS_SUCCESS;
    payload: IChangeExportCertificateStatusResponseData;
}
export interface IChangeExportCertificateExtensionStatusSuccessType {
    type: typeof CHANGE_EXPORT_CERTIFICATE_EXTENSION_STATUS_SUCCESS;
    payload: IChangeExportCertificateStatusResponseData;
}
export interface ICheckIfExtendedElementsSuccessType {
    type: typeof CKECK_IF_EXTENDED_ELEMENTS_SUCCESS;
    payload: ICheckIfExtendedElementsResponseData;
}
export interface ISubmitExtensionRequestSuccessType {
    type: typeof SUBMIT_EC_EXTENSION_SUCCESS;
    payload: ISubmitExtensionResponseData;
}
export interface ISubmitReviewRequestSuccessType {
    type: typeof SUBMIT_EC_REVIEW_SUCCESS;
    payload: ISubmitReviewResponseData;
}
export interface IChangeExportCertificateReviewStatusSuccessType {
    type: typeof CHANGE_EXPORT_CERTIFICATE_REVIEW_STATUS_SUCCESS;
    payload: IChangeExportCertificateStatusResponseData;
}

export interface IExportCertifiacteExtensionDetailsSuccessType {
    type: typeof EXPORT_CERTIFICATE_ATTESTATIONS_DETAILS;
    payload: ExportCertificateHealthAttestation[];
}
export interface RequestType {
    type: typeof EXPORT_CERTIFICATE_VIEW_REQUEST;
}

export interface FailureType {
    type: typeof EXPORT_CERTIFICATE_VIEW_FAILURE;
    payload: IErrorType;
}
export interface IClearStateType {
    type: typeof EXPORT_CERTIFICATE_VIEW_CLEAR_STATE;
}

export type ExportCertificateViewActionTypes =
    | IChangeExportCertificateStatusSuccessType
    | IExportCertificateDetailedViewSuccessType
    | IViewPhysicalInspectionSuccessType
    | IExportCertificateViewSuccessType
    | IChangeExportCertificateAmendmentStatusSuccessType
    | IChangeExportCertificateExtensionStatusSuccessType
    | ICheckIfExtendedElementsSuccessType
    | ISubmitExtensionRequestSuccessType
    | ISubmitReviewRequestSuccessType
    | IChangeExportCertificateReviewStatusSuccessType
    | IClearStateType
    | RequestType
    | IErrorAlertMessage
    | FailureType
    | IUserRightsFailureType
    | IExportCertifiacteExtensionDetailsSuccessType;
