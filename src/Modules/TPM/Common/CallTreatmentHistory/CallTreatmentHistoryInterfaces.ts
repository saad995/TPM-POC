import { IErrorType } from "Lib/Types/SharedTypes";
import { IAvailableCommandsType } from "Modules/Common/Workflow/WorkflowInterfaces";
import { IUserRightsFailureType, IUserRightsResponseData } from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
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

export interface ITPMCallTreatmentHistory {
    tradeType: string;
    isTreatment: string;
    treatmentType: string;
    treatmentProvider: string;
    sdID: number;
    initDocumentTypeCode: string;
    initDocumentID: string;
    dateOfArrival: string;
    actionType: string;
    dateOfInspection: string;
    typeOfInfestation: string;
    actionCompleteDuration: string;
    remarks: string;
    actedBy: string;
    actedByName: null | string;
    actedOn: string;
    createdOn:string;
    treatmentSubType:string;
    officerName:string;
    officersRemarks: string;
    status: string;
    isOfficerEndorsed: boolean;
    paymentMode: string;
    treatmentCertificateStatus: string;
    officerEndorementRemarks: string;
    treatmentRequestStatus: string;

    treatmentRequestStatusID: number;
    treatmentProviderID: number;
    officerRemarks: string | null;
    requestDocumentNumber: string;
    treatmentTypeID: number;
    id: number; //treatment requested id
    treatmentSubTypeID:number;
    cancellationReason:string;
    updatedOn?:any;
}

export interface IChangeReleaseOrderStatusRequestData {
    releaseOrderId: number;
    statusId: number;
    roleCode: string;
    comments: string;
    agencyId: number;
    initDocumentTypeCode: string;
}

export interface IViewDetailRequestData {
    gdid: string;
    agencyId: number;
    roleCode: string;
}

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
    requestOn?: string;
    requestBy?: number;
    requestComments?: string;
    approvedOn: string;
    approvedBy: number;
    assessorName: string;
    approverComments: string;
    findings?: string;
    treatment?: string;
    comments: string;
    inspectedOn: string;
    inspectedBy: number;
    inspecterName?: string;
    status?: string;
    statusId?: number;
    attachments?: [];
    OfficerAttachments?: [];
}
export interface ITPMCallTreatmentHistoryRequestData {
    initDocumentID: number;
    roleCode: string;
    rights: string;
    initDocumentTypeCode: string;
}
export interface IViewRequestData {
    releaseOrderId: number;
    roleCode: string;
    //initDocumentId: number;
    // roleCode: string;
    rights: string;
    documentTypeCode: string;
}
export interface IViewResponseData {
    releaseOrderId?: number;
    releaseOrderIdS?: string;
    gdid: number;
    gdidS: string;
    gdNumber: string;
    requestDocumentNumber?: string;
    documentNumber?: string;
    comments?: string;
    issueDate?: string;
    agencyId: string;
    statusID?: number;
    status: string;
    items: item[];
    pendingItemsCount?: number;
    agencyID: number;
    agencyIdN: number;
    requestDocumentTypeCode: string;
    billAmount: number;
    location: string;
    intrmDocumentTypeCode: string;
    intrmDocumentNumber: string;
    rejectedBy: string;
    rejectedByName: string;
    releaseOrderDocumentHistory: ReleaseOrderDocumentHistory[];
    officerName: string;
    agencyName: string;
    callLabHistory: any;
}
export interface ITPMCallTreatmentResponseData {
    releaseOrderId?: number;
    releaseOrderIdS?: string;
    gdid?: number;
    gdidS?: string;
    gdNumber?: string;
    requestDocumentNumber?: string;
    documentNumber?: string;
    comments?: string;
    issueDate?: string;
    agencyId?: string;
    statusID?: number;
    status?: string;
    items?: item[];
    pendingItemsCount?: number;
    agencyID?: number;
    agencyIdN?: number;
    requestDocumentTypeCode?: string;
    billAmount?: number;
    location?: string;
    intrmDocumentTypeCode?: string;
    intrmDocumentNumber?: string;
    rejectedBy?: string;
    rejectedByName?: string;
    history: ITPMCallTreatmentHistory[];

}
export interface ReleaseOrderDocumentHistory {
    actedOn: string;
    status: string;
    officersRemarks: string;
    actedBy: string;
    actedByName: string;
}
export interface item {
    itemStatusID: number;
    itemStatus: string;
    gdItemId: number;
    gdItemIds: string;
    itemId: number;
    itemIds: string;
    attachments: string;
    gdidS: string;
    releaseOrderIdS?: string;
    comments?: string;
}

export interface IChangeItemWiseStatusResponseData {
    message: string;
    code: number;
}
export interface IChangeReleaseOrderStatusRequestData {
    command?: IAvailableCommandsType;
    releaseOrderId: number;
    statusId: number;
    roleCode: string;
    comments: string;
    agencyId: number;
    // initDocumentId: number;
    rights: string;
}
export interface IChangeReleaseOrderStatusResponseData {
    message: string;
    code: number;
}

export interface Commodity {
    gdItemId?: string;
    itemId?: number;
    hsCode: string;
    hsCodeExt: string;
    itemDescription: string;
    itemFee: number;
    declaredDescription: string;
    commodity: string;
    originCountryCode: string;
    importPurpose: string;
    importPurposeId: string;
    quantity: string;
    numberOfPackages: string;
    uom: string;
    details?: Details;
}

export interface Details {
    CategoryID?: number;
}

export interface IViewDetailResponseData {
    gdNumber?: string;
    ntn: string;
    consigneeName: string;
    consigneeAddress: string;
    agentName?: string;
    agentAddress?: string;
    blNumber: string;
    blDate: string;
    importedFrom: string;
    terminal: string;
    vesselName: string;
    arivalDate: string;
    packageType: string;
    declarationTypeID: number;
    imgCompleteNumber: string;
    igmCollectorateID: number;
    traderSubscriptionId: number;
    agentSubscriptionId: number;
    commodities: Commodity[];
    additionalDescription: string;
    portId: number;
    portName: string;
    destinationCountryCode: string;
    destinationCountryName: string;
    conveyance: string;
    transportId: number;
    packages: Package[];
    containers: Container[];
    itemContainers: ItemContainerInformation[];
    location: string;
}
export interface Package {
    packageTypeId: number;
    typeOfPackages: string;
    numberOfPackages: number;
}
export interface Container {
    containerId: number;
    containerNumber: string;
    sealNumber: string;
    isoCode: string;
    soc: string;
    vehicleNumber: string;
    location: string;
}
export interface ItemContainerInformation {
    containerNumber: string;
    sealNumber: string;
    hsCode: string;
    containerId: number;
    vehicleNumber: string;
}
export interface IConsignmentInformation {
    consignorName: string;
    consignorCountry: string;
    consignorCity: string;
    consignorAddress: string;
    consigneeName: string;
    consigneeCountry: string;
    consigneeCity: string;
    consigneeAddress: string;
    destinationCountryName: string;
    portName: string;
    conveyance: string;
}
export interface IReleaseOrderViewSuccessType {
    type: typeof RELEASE_ORDER_VIEW_SUCCESS;
    payload: IViewResponseData;
}

export interface IViewPhysicalInspectionSuccessType {
    type: typeof RELEASE_ORDER_VIEW_PHYSICAL_INSPECTION_SUCCESS;
    payload: IViewPhysicalInspectionResponseData[];
}
export interface ITPMCallTreatmentHistoryRequestType {
    type: typeof TPM_CallTreatment_History_REQUEST;
}
export interface ITPMCallTreatmentHistorySuccessType {
    type: typeof TPM_CallTreatment_History_SUCCESS;
    payload: ITPMCallTreatmentResponseData;
}
export interface ITPMCallTreatmentHistoryFailureType {
    type: typeof TPM_CallTreatment_History_FAILURE;
    payload: IErrorType;
}
export interface IReleaseOrderDetailedViewSuccessType {
    type: typeof RELEASE_ORDER_DETAILED_VIEW_SUCCESS;
    payload: IViewDetailResponseData;
}

export interface IChangeReleaseOrderStatusSuccessType {
    type: typeof CHANGE_RELEASE_ORDER_STATUS_SUCCESS;
    payload: IChangeReleaseOrderStatusResponseData;
}
export interface IChangeItemWiseStatusSuccessType {
    type: typeof CHANGE_ITEMWISE_STATUS_SUCCESS;
    payload: IChangeItemWiseStatusResponseData;
}
export interface RequestType {
    type: typeof RELEASE_ORDER_VIEW_REQUEST;
}

export interface FailureType {
    type: typeof RELEASE_ORDER_VIEW_FAILURE;
    payload: IErrorType;
}
export interface IClearStateType {
    type: typeof RELEASE_ORDER_CLEAR_STATE;
}
export interface IReleaseOrderRightsSuccessType {
    type: typeof RELEASE_ORDER_RIGHTS_SUCCESS;
    payload: IUserRightsResponseData;
}

export type ReleaseOrderViewActionTypes =
    | IChangeReleaseOrderStatusSuccessType
    | IReleaseOrderDetailedViewSuccessType
    | IViewPhysicalInspectionSuccessType
    | IChangeItemWiseStatusSuccessType
    | IReleaseOrderViewSuccessType
    | IClearStateType
    | RequestType
    | FailureType
    | IUserRightsFailureType
    | IReleaseOrderRightsSuccessType
    | ITPMCallTreatmentHistorySuccessType
    | ITPMCallTreatmentHistoryRequestType
    | ITPMCallTreatmentHistoryFailureType;
