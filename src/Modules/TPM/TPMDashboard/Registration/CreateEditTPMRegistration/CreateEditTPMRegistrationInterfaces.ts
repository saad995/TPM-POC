import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
import { IError } from "Lib/Types/SharedTypes";
import { Action, DocumentInfo } from "Modules/TPM/Constants/Interfaces";
import * as ActionType from "./CreateEditTPMRegistrationActionTypes";
import {
    CREATE_EDIT_IMPORT_PERMIT_CLEAR_STATE,
    CREATE_EDIT_IMPORT_PERMIT_FAILURE,
    CREATE_EDIT_IMPORT_PERMIT_REQUEST,
    CREATE_EDIT_IMPORT_PERMIT_STOP_LOADER,
    DELETE_IMPORT_PERMIT_ATTACHMENT_SUCCESS,
    SUBMIT_IMPORT_PERMIT_SUCCESS
} from "./CreateEditTPMRegistrationActionTypes";

export enum RecordStatus {
    UNCHANGED = 1,
    ADD = 2,
    UPDATE = 3,
    REMOVE = 4
}
export interface IKeyValue {
    id: any;
    name: string;
}
export interface ITreatmentTypeKeyValue {
    Id: number;
    Name: string;
    //recordStatus?: RecordStatus
}

export interface IProps {
    roleCode?: string;
    onSave?: any;
    onSubmit?: any;
    agencyId: number;
}
export interface ItemRenderProps {
    selected: any;
    index: number;
}
export interface IAgencyPremiseRegistrationDPP {
    ntn: string;
    businessname: string;
    businessAddressFull: string;
    premiseAddressFull: string;
    agencyCityName: string;
};

export interface IDocumentInfo {
    fileNestFileId?: number;
    attachmentId?: number;
    docTypeCode: string;
    docTypeName: string;
    documentName: string;
    documentSize: string;
    documentExtension: string;
}


export interface IAgencyPremiseRegistrationMFD {
    ntn: string;
    traderName: string;
    premiseName: string;
    premiseBusinessStatus: string;
    businessAddressFull: string;
    traderCellNumber: string;
    premiseAddressFull: string;
    premiseOfficePhoneNum: string;
    premiseProcessingArea: string;
    premiseConstructionArea: string;
    dateOfSetup: string;
    premiseCapacityInvestment: string;
    premiseCapacityInvestmentMachinery: string;
    agencyCityID: string;
    agencySiteID: string;
}

export interface IGenerateVoucherRequest {
    documentID: string;
    documentTypeCode: DocumentInfo;
    ntn: string;
    billAmount: string | undefined;
    organizationName: string;
}

export interface IGenerateVoucherResponse {
    documentId: string;
    billId: number;
    psid: string;
    billAmount: string;
}

export interface ISubmitImportPermitRequest {
    roleCode: string;
    importPermitId: number;
    billAmount?: string;
}
export interface IPremiseFacilityItem {
    treatmentTypeId: number;
    name: string;
}

export interface IAgencyPremiseRegistration {
    ntn: string;
    traderName: string;
    premiseName: string;
    premiseBusinessStatus: string;
    businessAddressFull: string;
    traderCellNumber: string;
    premiseAddressFull: string;
    premiseOfficePhoneNum: string;
    premiseProcessingArea: string;
    premiseConstructionArea: string;
    dateOfSetup: string;
    premiseCapacityInvestment: string;
    premiseCapacityInvestmentMachinery: string;
    agencyCityID: string;
    agencySiteID: string;
}

export interface ISupportDocuments {
    documentTitle: string;
    fileNestFileId: string;
}
export interface ISubmitPremiseRegistrationRequest {
    roleCode: string;
    agencyID: number;
    documentTypeCode: string;
    rights: string;
    premiseRegistrationId: number;
    registrationElementDataJson: string;
    agencyPremiseRegistration: IAgencyPremiseRegistrationMFD | IAgencyPremiseRegistrationDPP | {};
    premiseFacilityItem: IPremiseFacilityItem[];
    attachments: ISupportDocuments[];
    hDRfee?: number;
}

export interface ISubmitPremiseRegistrationResponseData {
    billDocumentNumber: string;


}
export interface ISubmitPremiseRegistrationResponse {
    data: ISubmitPremiseRegistrationResponseData;
    message: IMessage
}
export interface ISubmitImportPermitResponse {
    hsCodeExt: string;
    billDocumentNumber: string;
    billAmount: number;
    status: string;
    data: any;
}

export interface ISaveTreatmentTypeRegistrationReq {
    action: Action;
    roleCode: string;
    activeStepNo?: number;
    agencyId: number;
    importPermitId: number | null;
    importConditionId: number | null;
    declarationText: string | null;
    requestDocumentTypeCode: string;
    NTN: string;
    consigneeUserRoleId?: number;
    traderSubscriptionId: number;

    agentName?: string;
    agentSubscriptionId: number;
    agentChalNumber: string;
    agentAddressFull: string;
    agentNumStreetPOBox: string;
    agentCountryCode: string;
    agentCountryId: number;
    agentCountryName: string;
    agentCountrySubEntityCode: string;
    agentCityId: number;
    agentCityName: string;
    agentPostalCode: string;

    consigneeName: string;
    organizationId: number;
    consigneeAddressId: number;
    consigneeAddressFull: string;
    consigneePhoneNum: string;
    consigneeCellNum: string;
    consigneeFaxNum: string;
    consigneeEmail: string;

    consigneeNumStreetPOBox: string;
    consigneeCountryCode: string;
    consigneeCountryId: number;
    consigneeCountryName: string;
    consigneeCountrySubEntityCode: string;
    consigneeCityId: number;
    consigneeCityName: string;
    consigneePostalCode: string;

    consignorName: string;
    consignorAddressFull: string;
    consignorNumStreetPOBox: string;
    consignorCountryCode: string;
    consignorCountryName: string;
    consignorCountryId: number;
    consignorCountrySubEntityCode: string;
    consignorCityId: number;
    consignorCityName: string;
    consignorPostalCode: string;
    consignorEmail: string;
    consignorCellNum: string;
    demographicPortOfEntryID: number;
    demographicDestCityId: number;
    demographicDestCityName: string;
    demographicMeansOfTransportName: string;
    demographicMeansOfTransportId: number;
    commodityHSCodeName: string;
    commodityHSCodeExt: string;
    commodityTradePurposeId: number;
    commodityTradePurposeName: string;
    commodityImportedFromId: number | null;
    commodityImportedFromCode: string;
    commodityImportedFromName: string;
    commodityQuantity: number;
    commodityTechnicalName: string;
    commodityUoMId: number;
    commodityUoMName: string;
    commodityPackageTypeId: number;
    commodityPackageTypeName: string;
    commodityNoOfPackages: number;
    commodityOriginCountryId: number;
    commodityOriginCountryCode: string;
    commodityOriginCountryName: string;
    commodityNoOfConsignment: number;
    commodityItemDescription: string;
    commodityItemDescriptionExt: string;
    commodityOtherDescription: string;
    portOfDischarge: string;
    portOfEntry: string;
    meansOfTransportationID: number;
    // arrivalDate: null | string;
    // portOfForeginShipment: string;
    // conveyanceOfIntendedImportation: string;
    // meansOfImportation: number;
    variety: string;
    // quantityWt: string;
    plantOrPlantPartsToBeImported: string;
    plantOrPlantProducts: string;
    specimens: number;
    typeOfPestId: number;
    typeOfPestName: string;
    otherTypeOfPest: string;
    classification: number;
    lifeOfStages: string;
    typeOfTimber: number;
    methodToBeUsedToPreventPlantPestEscape: string;
    appproximateDateOfArrival: Date | undefined;
    methodOfPacking: string;
    precautionsToPreventPestDissemination: string;
    methodOfFinalDisposition: string;
    nameAndAddressOfDPPApprovedReceivingFacility: string;

    billId?: number;
    billAmount?: number;
    psid?: string;
    oldAttachmentList: IDocumentInfo[];
    newAttachmentList: IDocumentInfo[];
    deletedAttachmentList: IDocumentInfo[];
    agencySiteId: number;
}

export interface IImportPermitEdit {
    importPermitId: string;
    agentName: string;
    date: string;
    HSCode: string;
    HSCodeExt: string;
    commodityName: string;
    status: string;
    requestDocumentTypeCode: string;
    requestDocumentNumber: string;
    traderSubscriptionId: string;
    agentSubscriptionId: string;
    agentChalNumber: string;
    consigneeUserRoleId: number;
    NTN: string;
    applicantName: string;
    applicantAddressFull: string;
    applNumStreetPOBox: string;
    applCountryCode: string;
    applCountrySubEntityCode: string;
    applCityID: string;
    applPostalCode: string;
    consigneeName: string;
    organizationId: number;
    consigneeAddressID: string;
    consigneeAddressFull: string;
    consigneePhoneNum: string;
    consigneeCellNum: string;
    consigneeFaxNum: string;
    consigneeEmail: string;
    consignorName: string;
    consignorAddressFull: string;
    consignorNumStreetPOBox: string;
    consignorCountryCode: string;
    consignorCountryID: string;
    consignorCountrySubEntityCode: string;
    consignorCityID: string;
    consignorPostalCode: string;
    consignorEmail: string;
    consignorCellNum: string;
    importFromCountryCode: string;
    importFromCountryID: string;
    destCityID: string;
    destCityName: string;
    transportMeansID: string;
    transportMeansName: string;
    entryPortID: string;
    entryPortName: string;
    portOfDischarge: string;
    portOfEntry: string;
    meansOfTransportationID: number;
    meansOfTransportationName: string;
    arrivalDate: Date;
    importPemitCreatedOn: string;
    importPemitCreatedBy: string;
    importPemitUpdatedOn: string;
    importPemitUpdatedBy: string;
    impPermStatusID: string;
    importPermitItemID: string;
    tradePurposeID: string;
    tradePurposeName: string;
    originCountryCode: string;
    originCountryID: string;
    uoMID: string;
    uoMName: string;
    quantityAllowed: string;
    packageTypeId: number;
    packageType: string;
    packageCount: string;
    technicalName: string;
    importPermitItemCreatedOn: string;
    importPermitItemCreatedBy: string;
    importPermitItemUpdatedOn: string;
    importPermitItemUpdatedBy: string;
    importPermitStatusID: string;
    importPermitStatusName: string;
    agencyID: string;
    itemDescription: string;
    itemDescriptionExt: string;
    otherDescription: string;
    noOfConsignments: string;
    amount: string;
    documents: any;
    activeStepNo: number;
    importConditionID: number;
    importConditionTitle: string;
    importCondition: string;
    importConditionNotAvailable: string;
    declarationText: string;
    itemExtDpp: ItemExtDpp;
    agencySiteId: number;
}
interface ItemExtDpp {
    // pointOfImport: string;
    // intendedUse: string;
    // noOfShipment: number;
    // pointOfEntry: string;

    plantOrPlantProducts: string;
    variety: string;
    plantOrPlantPartsToBeImported: string;
    specimens: number;
    typeOfPest: { id: number; name: string };
    otherTypeOfPest: string;
    classification: { id: number; name: string };
    typeOfTimber: { id: number; name: string };
    lifeOfStages: string;
    methodToBeUsedToPreventPlantPestEscape: string;
    appproximateDateOfArrival: Date | undefined;
    methodOfPacking: string;
    intendedUse: string;
    precautionsToPreventPestDissemination: string;
    methodOfFinalDisposition: string;
    nameAndAddressOfDPPApprovedReceivingFacility: string;
}
export interface IPremisesRegistrationDeleteAttachmentReq {
    roleCode: string;
    agencyId: number;
    ownerDocumentID: number | null;
    ownerDocumentTypeCode: string;
    identification: string;
}

export interface ISaveImportPermitResponse {
    importPermitId: number;
}

export interface IUpdateBillInfoRequest {
    documentId: number;
    documentTypeCode: string;
    psid: string;
    billId: number;
    billAmount: number;
}

export interface RequestType {
    type: typeof CREATE_EDIT_IMPORT_PERMIT_REQUEST;
}

export interface FailureType {
    type: typeof CREATE_EDIT_IMPORT_PERMIT_FAILURE;
    payload: IError;
}
export interface ISubmitImpPermSuccessType {
    type: typeof SUBMIT_IMPORT_PERMIT_SUCCESS;
    payload: IGenerateVoucherResponse;
}

export interface StopLoaderType {
    type: typeof CREATE_EDIT_IMPORT_PERMIT_STOP_LOADER;
}

export interface IClearStateType {
    type: typeof CREATE_EDIT_IMPORT_PERMIT_CLEAR_STATE;
}

/////////////////////////////////////////////////////////////////////////////

//Save
export interface ISaveRequestType {
    type: typeof ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_REQUEST;
}

export interface ISaveFailureType {
    type: typeof ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_FAILURE;
    payload: IError;
}
export interface ISaveSuccessType {
    type: typeof ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_SUCCESS;
    payload: IGenerateVoucherResponse;
}

export interface ISaveClearStateType {
    type: typeof ActionType.SAVE_TREATMENT_TYPES_REGISTRATION_CLEAR_STATE;
}

//Confirm
export interface IConfirmedRequestType {
    type: typeof ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_REQUEST;
}

export interface IConfirmedFailureType {
    type: typeof ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_FAILURE;
    payload: IError;
}
export interface IConfirmedSuccessType {
    type: typeof ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_SUCCESS;
    payload: IGenerateVoucherResponse;
}

export interface IConfirmedClearStateType {
    type: typeof ActionType.CONFIRMED_TREATMENT_TYPES_REGISTRATION_CLEAR_STATE;
}

//Submit
export interface ISubmitRequestType {
    type: typeof ActionType.SUBMIT_TREATMENT_TYPES_REGISTRATION_REQUEST;
}

export interface ISubmitFailureType {
    type: typeof ActionType.SUBMIT_TREATMENT_TYPES_REGISTRATION_FAILURE;
    payload: IError;
}
export interface ISubmitSuccessType {
    type: typeof ActionType.SUBMIT_TREATMENT_TYPES_REGISTRATION_SUCCESS;
    payload: IGenerateVoucherResponse;
}

export interface ISubmitClearStateType {
    type: typeof ActionType.SUBMIT_TREATMENT_TYPES_REGISTRATION_CLEAR_STATE;
}

export enum TreatmentTypeRegistrationStatus {
    DRAFT = 1,
    //SUBMITTED = 2,
    ACTIVATED = 2,
    SUSPEND = 3,
    CANCELLED = 4
};

export interface IDummyDeleteTreatmentTypeData {
    eventData:IKeyValue[];
    isLastOption:number;
}
export enum ChangePurposeEnum {
    REGISTRATION = 0,
    RENEWAL = 1,
    AMENDMENT = 2
    }
export interface IDummyDeleteTreatmentTypeData {
    eventData:IKeyValue[];
    isLastOption:number;
};

export enum LastOption {
    isLast = 1,
    isNotLast = 0
    
};

export enum TreatmentSubType {
    MB = 1,
    ALP = 2,
    CO2 = 3
};

export enum subTypeDocumentCode {
    MB = "T13",
    ALP = "T14",
    CO2 = "T15"
  }
export enum treatmentTypeProperties {
    fumigation = "Fumigation",
    treatmentAttachments = "treatmentTypeAttachments",
    treatmentTypeSubType = "treatmentSubTypes"
}
export enum TreatmentType {
    Fumigation = "Fumigation",
    VaporHeatTreatment = "Vapor Heat Treatment",
    HotWaterTreatment = "Hot Water Treatment",
    ColdTreatment = "Cold Treatment",
    IrradiationTreatment = "Irradiation Treatment",
    FormalinTreatment = "Formalin Treatment",
    HeatTreatment = "Heat Treatment"
};

export enum TreatmentTypeAbbreviation {
    Fumigation = "FMG",
    VaporHeatTreatment = "VHT",
    HotWaterTreatment = "HWT",
    ColdTreatment = "CLT",
    IrradiationTreatment = "IRT",
    FormalinTreatment = "FNT",
    HeatTreatment = "HTT"
}



export type ICreateEditTPRegistrationFormReducerTypes =
    | ISubmitImpPermSuccessType
    | RequestType
    | FailureType
    | StopLoaderType
    | IClearStateType
    | ISaveRequestType
    | ISaveFailureType
    | ISaveSuccessType
    | ISaveClearStateType
    | IConfirmedRequestType
    | IConfirmedFailureType
    | IConfirmedSuccessType
    | IConfirmedClearStateType
    | ISubmitRequestType
    | ISubmitFailureType
    | ISubmitSuccessType
    | ISubmitClearStateType;
