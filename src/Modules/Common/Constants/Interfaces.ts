export enum DocumentInfo {
    OTHER_DOCUMENT_TYPE_CODE = "M99",
    RELEASE_ORDER_DOCUMENT_TYPE_CODE = "D04",
    RELEASE_ORDER_COM_DOCUMENT_TYPE_CODE = "D03",
    GOODS_DECLARATION_DOCUMENT_TYPE_CODE = "C51",
    IMPORT_PERMIT_DOCUMENT_TYPE_CODE = "D11",
    IMPORT_PERMIT_AMENDMENT_DOCUMENT_TYPE_CODE = "D56",
    MNC_IMPORT_PERMIT_AMENDMENT_DOCUMENT_TYPE_CODE = "A32",
    IMPORT_PERMIT_COM_DOCUMENT_TYPE_CODE = "D12",
    TRADE_TRAN_TYPE = 1,
    EXPORT_CERTIFICATE_DOCUMENT_TYPE_CODE = "D06",
    EXPORT_CERTIFICATE_COM_DOCUMENT_TYPE_CODE = "D15",
    AQD_EXPORT_CERTIFICATE_DOCUMENT_TYPE_CODE = "A05",
    AQD_EXPORT_CERTIFICATE_COM_DOCUMENT_TYPE_CODE = "A06",
    PHYSICAL_INSPECTION_FUMIGATION_REPORT = "M88",
    PEST_RISK_ANALYSIS_CERTIFICATE_TYPE_CODE = "D10",
    PEST_RISK_ANALYSIS_CERTIFICATE_DOCUMENT_TYPE_NAME = "Pest Risk Analysis Certificate/Any Other Official Document/Correspondence reference",
    PHYSICAL_INSPECTION_FUMIGATION_REPORT_DOCUMENT_TYPE_NAME = "Physical Inspection Treatment Report",
    FSCRD_SEED_ENLISTMENT_DOCUMENT_TYPE_CODE = "SE1",
    FSCRD_SEED_ENLISTMENT_COMMODITY_DOCUMENT_TYPE_CODE = "SE2",
    FSCRD_SEED_BUSINESS_NATIONAL_REGISTER = "F27",
    FSCRD_SEED_BUSINESS_NATIONAL_REGISTER_CERTIFICATE = "F28",
    MFD_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE = "A09",
    MFD_PREMISE_AMENDMENT_DOCUMENT_TYPE_CODE = "A17",
    MFD_PREMISE_RENEWAL_DOCUMENT_TYPE_CODE = "A18",
    DRAP_ENTITY_REGISTRATION_DOCUMENT_TYPE_CODE = "D90",
    MNC_PRODUCT_REGISTRATION_DOCUMENT_TYPE_CODE = "A30",
    MNC_PRODUCT_REGISTRATION_CERT_DOCUMENT_TYPE_CODE = "A31",
    MNC_PRODUCT_REGISTRATION_AMNEDMENT_DOCUMENT_TYPE_CODE = "A33",
    DPP_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE_18 = "F30",
    DPP_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE_19 = "F32",
    DPP_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE_20 = "F34",
    EXPORT_CERTIFICATE_EXTENSION = "E02",
    EXPORT_CERTIFICATE_MFD_EXTENSION = "E03",
    EXPORT_CERTIFICATE_REVIEW = "R50",
    SINGLE_DECLARATION_DOCUMENT_TYPE_CODE = "PS1",
    DRAP_DRUG_MANUFACTURING_LICENSE_REGISTRATION = "D92",
    DRAP_DRUG_REGISTRATION = "D93",
    DRAP_DRUG_IMPORT_LICENSE_REGISTRATION = "D91",
    IMPORT_PERMIT_DRAP_OPINION_REQUEST = "D86",
    IMPORT_PERMIT_FBR_OPINION_REQUEST = "D87",
    MNC_PRODUCT_GROUND_CHECK_REPORT_DOCUMENT_TYPE_CODE = "G01",

    // PSQCA
    PSQCA_RELEASE_ORDER_DOCUMENT_TYPE_CODE = "R01",
    PSQCA_RELEASE_ORDER_REQUEST_DOCUMENT_TYPE_CODE = "R02",

    FSCRD_RELEASE_ORDER_DOCUMENT_TYPE_CODE = "R05",
    FSCRD_RELEASE_ORDER_COM_DOCUMENT_TYPE_CODE = "R04",
    DPP_PREMISE_FORM_18_REGISTRATION_DOCUMENT_TYPE_CODE = "F30",
    DPP_PREMISE_FORM_19_REGISTRATION_DOCUMENT_TYPE_CODE = "F32",
    DPP_PREMISE_FORM_20_REGISTRATION_DOCUMENT_TYPE_CODE = "F34",

    DPP_PREMISE_FORM_18_RENEWAL_REGISTRATION_DOCUMENT_TYPE_CODE = "D74",
    DPP_PREMISE_FORM_19_RENEWAL_REGISTRATION_DOCUMENT_TYPE_CODE = "D75",
    DPP_PREMISE_FORM_20_RENEWAL_REGISTRATION_DOCUMENT_TYPE_CODE = "D76",

    DPP_FORM_18_PREMISES_REGISTRATION_AMENDMENT_CODE = "D77",
    DPP_FORM_19_PREMISES_REGISTRATION_AMENDMENT_CODE = "D78",
    DPP_FORM_20_PREMISES_REGISTRATION_AMENDMENT_CODE = "D79",

    //Catch Certificate
    CATCH_CERTIFICATE_DOCUMENT_TYPE_CODE = "CC1",
    CATCH_CERTIFICATE_DOCUMENT_CODE = "CC2",

    //Export Permit
    EXPORT_PERMIT_DOCUMENT_TYPE_CODE = "A22",
    EXPORT_PERMIT_DOCUMENT_CODE = "A23",
    //DPP PREMISE REGISTRATION
    DPP_FORM_18_PREMISES_REGISTRATION_REQUEST_CODE = "F30",
    DPP_FORM_18_PREMISES_REGISTRATION_CERTIFICATE_CODE = "F29",
    DPP_FORM_19_PREMISES_REGISTRATION_REQUEST_CODE = "F32",
    DPP_FORM_19_PREMISES_REGISTRATION_CERTIFICATE_CODE = "F31",
    DPP_FORM_20_PREMISES_REGISTRATION_REQUEST_CODE = "F34",
    DPP_FORM_20_PREMISES_REGISTRATION_CERTIFICATE_CODE = "F33",
    MNC_IMPORT_PERMIT_DOCUMENT_TYPE_CODE = "A20",
    MNC_IMPORT_PERMIT_COM_DOCUMENT_TYPE_CODE = "A21",

    // CESS WAIVER/EXEMPTION
    CESS_EXEMPTION_DOCUMENT_TYPE_CODE = "WA1",
    CESS_EXEMPTION_AGAINST_NTN_DOCUMENT_TYPE_CODE = "WA2",

    // Drug Sale License
    DRUG_SALES_LICENSE_REGISTRATION_TYPE_CODE = "D98",

    // Drug Sale License
    DRUG_MANUFACTURING_LICENSE_REGISTRATION_TYPE_CODE = "D92",
    //BANK GUARANTEE DOCUMENT
    BANK_GUARANTEE_DOCUMENT_TYPE_CODE = "GU2",
    TREATMENT_REG_DOC_TYPE_CODE = "C09",
}

export enum TPRegisterType {
    TREATMENT_REG_DOC_TYPE_CODE = "C09",
}

export enum DocumentClassificationCode {
    RELEASE_ORDER = "RO",
    IMPORT_PERMIT = "IMP",
    IMPORT_PERMIT_AMENDMENT = "IPA",
    EXPORT_CERTIFICATE = "EC",
    HEALTH_CERTIFICATE = "HC",
    SEED_ENLISTMENT = "PRD",
    PRODUCT = "PRR",
    PRODUCT_AMENDMENT = "PRA",
    BUSINESS = "BSS",
    PREMISE = "PRM",
    CATCH_CERTIFICATE = "CC",
    EXPORT_PERMIT = "EXP",
    ENTITY_REGISTRATION = "BSS",
    IMPORT_PERMIT_OPINION_REQUEST = "IPO",
    WAIVER = "WR",
    WAIVER_AGAINST_NTN = "WR2",
    DRUG_SALES_LICENSE = "DSL",
    DRUG_MANUFACTURING_LICENSE = "DML",
    GROUD_CHECK_REPORT = "GCR",
    GROUD_CHECK_REPORT_AMENDMENT = "GCR",
    LICENSE_REGISTRATION= "ALR",
    DRUG_REGISTRATION= "DDR",
    TREATMENT_PROVIDER = "TPM"
}
export enum SupportingTools {
    BL_DETAILS = "BL",
    INVOICE_DETAILS = "ID",
    TRADER_PROFILE = "TP",
    AGENT_PROFILE = "AP",
    GD_INFORMATION = "GD",
    ATTACHED_DOCUMENTS = "AD"
}
export enum ImportPermitStatus {
    DPP_SAVED = 1,
    DPP_SUBMITTED = 2,
    DPP_PAID = 3,
    DPP_CANCELLED = 4,
    DPP_APPROVAL_FOR_CALL_DOCUMENT = 5,
    DPP_DOCUMENTS_CALLED = 6,
    DPP_DOCUMENTS_SUBMITTED = 7,
    DPP_REFERRED = 8,
    DPP_APPROVED = 9,
    DPP_REJECTED = 10,
    DPP_CALL_DOCUMENT_REJECTED = 11,
    DPP_CALL_DOCUMENT_REQUEST_REVERTED = 12,
    DPP_CALL_DOCUMENT_REQUEST_CANCELLED = 13,
    DPP_ASSIGN_TO_OFFICER = 15
}

export enum PremiseRegistrationStatus {
    SAVED = 1, //not in use
    SUBMITTED = 2,
    PAID = 3,
    CANCELLED = 4,
    DOCUMENTS_CALLED = 5,
    DOCUMENTS_SUBMITTED = 6,
    REGISTERED = 7,
    REJECTED = 8,
    ASSIGN_TO_OFFICER = 9,
    CALL_DOCUMENT_REQUEST_CANCELLED = 10,
    CALL_DOCUMENT_REQUEST_REVERTED = 11,
    EXPIRED = 13,
    DRAFT = 18,
    PAYMENT_AWAITED = 15,
    SUSPEND = 19,
    //TODO: These status are not in DB, need fixed
    APPROVAL_FOR_CALL_DOCUMENT = 6,
    REFERRED = 8,
    CALL_DOCUMENT_REJECTED = 8,
    APPROVED = 14,
    PARTIAL_APPROVED = 15,
    PENDING = 16
}

export enum PremisesRegistrationAmendmentStatus {
    SAVED = 1,
    SUBMITTED = 2,
    PAYMENT_RECEIVED = 3,
    CANCELLED = 4,
    DOCUMENTS_CALLED = 5,
    DOCUMENTS_SUBMITTED = 6,
    REGISTERED = 7,
    REJECTED = 8,
    ASSIGNED_TO_OFFICER = 9,
    CALL_DOCUMENT_REQUEST_CANCELLED = 10,
    CALL_DOCUMENT_REQUEST_REVERTED = 11,
    EXPIRED = 13,
    APPROVED = 14,
    PARTIAL_APPROVED = 15,
    PENDING = 16,
    PAYMENT_AWAITED = 17
}

export enum PremiseRegistrationFacilityItemActionStatus {
    REJECTED = 3,
    APPROVED = 2,
    PENDING = 1
}

export enum PremiseRegistrationFacilityItemStatusName {
    Pending = "Pending",
    Approve = "Approve",
    Reject = "Reject"
}

export enum AgencyOpinionStatus {
    SUBMITTED = 1,
    OFFICER_QUEUE = 2,
    DOCUMENTS_CALLED = 3,
    DOCUMENTS_SUBMITTED = 4,
    CALL_DOCUMENT_REJECTED = 5,
    CALL_DOCUMENT_REQUEST_REVERTED = 6,
    CALL_DOCUMENT_REQUEST_CANCELLED = 7,
    OPINION_SUBMITTED = 8,
    OPINION_REQUEST_CANCELLED = 9,
    OPINION_REQUEST_CANCELLED_BY_REQUESTING_AGENCY = 10
}

export enum ImportPermitAmendmentStatus {
    SUBMITTED = 1,
    PAYMENT_RECEIVED = 2,
    OFFICER_QUEUE = 3,
    APPROVAL_FOR_CALL_DOCUMENT = 4,
    DOCUMENTS_CALLED = 5,
    DOCUMENTS_SUBMITTED = 6,
    REFERRED = 7,
    AMENDMENT_APPROVED = 8,
    AMENDMENT_REJECTED = 9,
    CALL_DOCUMENT_REJECTED = 10,
    CALL_DOCUMENT_REQUEST_REVERTED = 11,
    CALL_DOCUMENT_REQUEST_CANCELLED = 12
}
export enum PremiseRegistrationAmendmentStatus {
    SUBMITTED = 1,
    PAYMENT_RECEIVED = 2,
    OFFICER_QUEUE = 3,
    APPROVAL_FOR_CALL_DOCUMENT = 4,
    DOCUMENTS_CALLED = 5,
    DOCUMENTS_SUBMITTED = 6,
    REFERRED = 7,
    AMENDMENT_APPROVED = 8,
    AMENDMENT_REJECTED = 9,
    CALL_DOCUMENT_REJECTED = 10,
    CALL_DOCUMENT_REQUEST_REVERTED = 11,
    CALL_DOCUMENT_REQUEST_CANCELLED = 12
}
export enum ReleaseOrderStatus {
    DPP_IN_QUEUE = 1,
    DPP_ASSIGNED_TO_OFFICER = 2,
    DPP_APPROVED = 3,
    DPP_REJECTED = 4,
    DPP_APPROVAL_FOR_CALL_DOCUMENT = 5,
    DPP_DOCUMENTS_CALLED = 6,
    DPP_APPROVAL_FOR_CALL_LABS = 7,
    DPP_LABS_CALLED = 8,
    DPP_CALL_DOCUMENT_REQUEST_REVERTED = 9,
    DPP_APPROVAL_FOR_PHYSICAL_INSPECTION = 10,
    DPP_INSPECTION_CALLED = 11,
    DPP_DOCUMENTS_SUBMITTED = 12,
    DPP_LAB_REPORT_SUBMITTED = 13,
    DPP_CALL_DOCUMENT_REQUEST_CANCELLED = 14,
    DPP_INSPECTION_DOCUMENTS_SUBMITTED = 15,
    DPP_CALL_DOCUMENT_REQUEST_REJECTED = 16,
    DPP_PHYSICAL_INSPECTION_REJECTED = 17,
    DPP_LAB_REQUEST_REJECTED = 18,
    DPP_APPROVAL_FOR_CALL_DOCUMENT_REQUESTED_BY_IO = 19,
    DPP_DOCUMENTS_CALLED_REQUESTED_BY_IO = 20,
    DPP_CALL_DOCUMENT_REQUEST_REJECTED_REQUESTED_BY_IO = 21,
    DPP_DOCUMENTS_SUBMITTED_REQUESTED_BY_IO = 22,
    DPP_PARTIAL_APPROVED = 23,
    DPP_CALL_DOCUMENT_REQUEST_CANCELLED_REQUESTED_BY_IO = 24,
    DPP_FUMIGATION_REQUESTED = 25,
    DPP_FUMIGATION_REPORT_SUBMITTED = 26,
    Channel_Assign = 27,
    Payment_Awaited = 28,
    Payment_Received = 29,
    Waiting_for_Arrangement_of_Examination = 30,
    Physical_Inspection_Request_Approved = 31,
    TEMPORARY_RELEASE_CERTIFICATE = 32,
    NON_CONFORMITY_ASSESSMENT_REPORT = 33,
    CANCELLED = 38,
    REVIEW_SUBMITTED = 39
}
export enum ReleaseOrderItemStatus {
    PENDING = 1,
    CALL_DOCUMENT = 2,
    CALL_INSPECTION = 3,
    APPROVED = 4,
    REJECTED = 5,
    OTHERS = 6
}
export enum ExportCertificateStatus {
    DPP_IN_QUEUE = 1,
    DPP_ASSIGNED_TO_OFFICER = 2,
    DPP_APPROVED = 3,
    DPP_REJECTED = 4,
    DPP_APPROVAL_FOR_CALL_DOCUMENT = 5,
    DPP_DOCUMENTS_CALLED = 6,
    DPP_APPROVAL_FOR_CALL_LABS = 7,
    DPP_LABS_CALLED = 8,
    DPP_APPROVAL_FOR_PHYSICAL_INSPECTION = 9,
    DPP_INSPECTION_CALLED = 10,
    DPP_DOCUMENTS_SUBMITTED = 11,
    DPP_LAB_REPORT_SUBMITTED = 12,
    DPP_INSPECTION_DOCUMENTS_SUBMITTED = 13,
    DPP_CALL_DOCUMENT_REQUEST_REJECTED = 14,
    DPP_PHYSICAL_INSPECTION_REQUEST_REJECTED = 15,
    DPP_LAB_REQUEST_REJECTED = 16,
    DPP_CALL_DOCUMENT_REQUEST_REVERTED = 17,
    DPP_CALL_DOCUMENT_REQUEST_CANCELLED = 18,
    DPP_APPROVAL_FOR_CALL_DOCUMENT_REQUESTED_BY_IO = 19,
    DPP_DOCUMENTS_CALLED_REQUESTED_BY_IO = 20,
    DPP_CALL_DOCUMENT_REQUEST_REJECTED_REQUESTED_BY_IO = 21,
    DPP_DOCUMENTS_SUBMITTED_REQUESTED_BY_IO = 22,
    DPP_CALL_DOCUMENT_REQUEST_CANCELLED_REQUESTED_BY_IO = 23,
    DPP_FUMIGATION_REQUESTED = 24,
    DPP_FUMIGATION_REPORT_SUBMITTED = 25,
    DPP_PARTIAL_APPROVED = 29,
    DPP_WAITING_FOR_ARRANGEMENT_OF_EXAMINATION = 30,
    DPP_PHYSICAL_INSPECTION_REQUEST_APPROVED = 31,
    CANCELLED = 32,
    AMENDMENT_REQUESTED = 33,
    REVIEW_SUBMITTED = 35
}
export enum ExportCertificateItemStatus {
    PENDING = 1,
    CALL_DOCUMENT = 2,
    CALL_INSPECTION = 3,
    APPROVED = 4,
    REJECTED = 5,
    OTHERS = 6
}

export enum Agency {
    DPP = 2,
    AQD = 3,
    FSCRD = 4,
    PSQCA = 5,
    PSI = 6,
    MFD = 10,
    MNC = 11,
    DRAP = 12,
    MMD = 13,
    IOCO = 14,
    SETN = 15
}
export enum ModuleEnum{
    PSI=6, // For PSI we use agency Id as it si already implemented
    TreatmentProvider=1
}

export enum ServiceCodes {
    ITT = "ITT",
    TARP = "TARP",
}

export enum AgencyCodes {
    DPP = "DPP",
    AQD = "AQD ",
    FSCRD = "FSCRD",
    PSQCA = "PSQCA",
    PSI = "DPP PSI",
    MFD = "MFD",
    DRAP = "DRAP",
    MNC = "MNC"
}
export enum Action {
    Save = "save",
    Submit = "submit",
    Cancel = "cancel",
    Approve = "approve",
    ItemsValidity = "itemsValidity",
    RequestApprove = "requestApprove",
    RequestReject = "requestReject",
    Reject = "reject",
    RequestFumigarion = "requestFumigarion",
    Refer = "refer",
    Delete = "delete",
    CallDocReq = "callDocReq",
    CancelCallDocReq = "cancelCallDocReq",
    ApproveAfterReject = "approveAfterReject",
    AmendmentReject = "amendmentReject",
    AmendmentApprove = "amendmentApprove",
    RequestAmendment = "requestAmendment",
    AmendmentSubmitted = "amendmentSubmitted",
    ConfirmPayment = "confirmPayment",
    SaveChanges = "saveChanges",
    RequestExtension = "requestExtension",
    ProvisionalReleaseOrder = "ProvisionalReleaseOrder",
    ExtensionReject = "extensionReject",
    ExtensionApprove = "extensionApprove",
    ExtensionRequestProcess = "extensionRequestProcess",
    RequestReview = "requestReview",
    ReviewReject = "reviewReject",
    ReviewApprove = "reviewApprove",
    Insert = "insert",
    RenewalSubmit = "RenewalSubmit",
    SDNumberChange = "sDNumberChange",
    Suspended = "suspend",
    Activate = "activate",
    Revoke = "revoke",
    RequestAgencyOpinion = "requestAgencyOpinion",
    CallInspection = "CallInspection",
    PhysicalBGReceived = "isPhysicalBGReceived",
    CancelCallTreatmentReq = "CancelCallTreatmentReq",
}

export enum CallDocumentStatus {
    Initiated = 1,
    Approved = 2,
    Rejected = 3,
    Uploaded = 4,
    Cancelled = 5,
    Reverted = 6,
    Initiated_By_IO = 7,
    Approved_Requested_By_IO = 8,
    Uploaded_For_IO = 9,
    Rejected_Requested_By_IO = 10
}

export enum PhysicalInspectionStatus {
    Approved = 1,
    InspectionCalled = 2,
    Rejected = 4,
    Uploaded = 3,
    Findings_and_Treatments = 5,
    Treatment_Requested = 6,
    Treatment_Report_Uploaded = 7,
    WAITING_FOR_ARRANGEMENT_OF_EXAMINATION = 8,
    PHYSICAL_INSPECTION_REQUEST_APPROVED = 9
}

export enum LabStatus {
    Initiated = 1,
    Approved = 2,
    Rejected = 3,
    Uploaded = 4
}

export enum GeneralCommentsEnum {
    IMPORT_PERMIT = "IP",
    RELEASE_ORDER = "RO",
    EXPORT_CERTIFICATE = "EC",
    CALL_DOCUMENT = "CD",
    CALLED_DOCUMENT = "CDD",
    APPROVAL = "AP",
    PHYSICAL_INSPECTION = "PI",
    PHYSICAL_INSPECTION_CALLED = "PIC",
    ITEMWISE_STATUS_CHANGE = "ISC",
    PHYSICAL_INSPECTION_UPLOAD_DOCUMENT = "PUD",
    SEED_ENLISTMENT = "PRD",
    CATCH_CERTIFICATE = "CC",
    PREMISE_REGISTARTION = "PRM",
    PRODUCT_REGISTRATION = "PRD"
}

export enum DocumentGroupCode {
    IMPORT_PERMIT = "IP",
    RELEASE_ORDER = "RO",
    EXPORT_CERTIFICATE = "EC",
    SEED_ENLISTMENT = "PRD",
    PREMISE_REGISTARTION = "PRM",
    EXORT_PERMIT = "EXP",
    IMPORT_PERMIT_OPINION_REQUEST = "IPO",
    PRODUCT_REGISTARTION = "PRR",
    PRODUCT_REGISTARTION_AMENDMENT = "PRA",
    CESS_WAIVER = "CW",
    CESS_WAIVER_AGAINST_NTN = "CW2",
    PREMISE_REGISTARTION_AMENDMENT = "PMA",
    PREMISE_REGISTARTION_RENEWAL = "PMR",
    DRUG_SALES_LICENSE= "DSL",
    DRUG_MANUFACTURING_LICENSE= "DML"
}

export enum RequirementType {
    Documentary = "Documentary",
    Financial = "Financial",
    Validity_Period = "Validity Period"
}

export enum ApplicationCodes {
    SUCCESS = "200",
    NOTFOUND = "404",
    INTERNALSERVERERROR = "500",
    BAD_REQUEST = "400",
    UNAUTHORIZED = "401"
}

export enum TradeTranType {
    Import = 1,
    Export = 2,
    Transit = 3,
    ImportAndExport = 4
}
export enum HsCodeFormsForIP {
    FORM1 = "form 1",
    FORM5 = "form 5",
    FORM6 = "form 6",
    FORM11 = "form 11",
    FORM15 = "form 15",
    FORM17 = "form 17",
    FORM19 = "form 19",
    FORM23 = "form 23"
}

export enum ExportCertificateGridStatus {
    IN_QUEUE = 0,
    AMENDMENT = 1,
    EXTENSION = 2,
    REVIEW = 3
}
export enum ExportCertificateAmendmentStatus {
    PENDING = 1,
    APPROVED = 2,
    REJECT = 3,
    PAYMENT_AWAITED = 4,
    ASSIGN_TO_OFFICER = 5,
    CANCELLED = 6
}
export enum ExportCertificateExtensionStatus {
    PENDING = 1,
    APPROVED = 2,
    REJECTED = 3,
    PAYMENT_AWAITED = 4,
    PAYMENT_RECEIVED = 5,
    ASSIGN_TO_OFFICER = 6,
    CANCELLED = 7,
    COMPLETED = 8
}

export enum SetupDeclarationStatus {
    SAVED = 1,
    SUBMITTED = 2,
    DELETED = 3
}

export enum SeedEnlistmentStatus {
    SAVED = 1,
    SUBMITTED = 2,
    PAYMENT_RECEIVED = 3,
    CANCELLED = 4,
    DOCUMENTS_CALLED = 5,
    DOCUMENTS_SUBMITTED = 6,
    APPROVED = 7,
    REJECTED = 8,
    ASSIGNED_TO_OFFICER = 9,
    CALL_DOCUMENT_REQUEST_CANCELLED = 10,
    CALL_DOCUMENT_REQUEST_REVERTED = 11,
    COMPLETED = 12
}
export enum SeedEnlistmentItemStatus {
    PENDING = 4,
    // CALL_DOCUMENT = 2,
    APPROVED = 1,
    REJECTED = 3,
    CANCELLED = 5,
    RESTORED = 6
}
export enum TradePupose {
    AnimalFeed = 1,
    CommercialSowing = 2,
    Consumption = 3,
    ConsumptionAndProceesing = 4,
    Processing = 5,
    ProcessingDecoration = 6,
    Screening_Research_Trial = 7,
    Culturing = 8,
    Sowing_Cultivation = 9,
    Sowing = 10
}
export enum CatchCertificateStatus {
    APPROVED = 1,
    CANCELLED = 2,
    PAYMENT_RECEIVED = 3,
    ASSIGNED_TO_OFFICER = 4
}
export enum ECReviewStatus {
    PENDING = 1,
    APPROVED = 2,
    REJECTED = 3,
    PAYMENT_AWAITED = 4,
    PAYMENT_RECEIVED = 5,
    ASSIGN_TO_OFFICER = 6,
    CANCELLED = 7
}
export enum CallLabStatus {
    NEW_REQUEST = 1,
    PENDING = 2,
    COMPLETED = 3,
    COMPLETED_BY_OFFICER = 4
}
export enum AttachedDocumentFormat {
    SCANNED_DOCUMENT = 1,
    NATIVE_ELECTRONIC_DOCUMENT = 2
}

export enum ActionTypeId {
    CREATE_ELEMENTS = 1,
    VIEW_ELEMENTS = 2
}
export enum AppConfigkeys {
    CATCH_CERTIFICATE_FEE = "MFDCatchCertificateFee"
}

export enum ActionViewGrid {
    IN_QUEUE = 0,
    AMENDMENT = 1,
    EXTENSION = 2,
    REVIEW = 3,
    RENEWAL = 4,
    VIEW = 5,
    CREATE = 6,
    AMENDMENT_ELEMENT = 7
}

export enum ExportPermitStatus {
    EXP_DRAFTED = 1,
    EXP_SUBMITTED = 2,
    EXP_ASSIGN_TO_OFFICER = 15,
    EXP_CANCELLED = 4,
    EXP_APPROVAL_FOR_CALL_DOCUMENT = 5,
    EXP_DOCUMENTS_CALLED = 6,
    EXP_DOCUMENTS_SUBMITTED = 7,
    EXP_REFERRED = 8,
    EXP_APPROVED = 9,
    EXP_REJECTED = 10,
    EXP_CALL_DOCUMENT_REJECTED = 11,
    EXP_CALL_DOCUMENT_REQUEST_REVERTED = 12,
    EXP_CALL_DOCUMENT_REQUEST_CANCELLED = 13
}
export enum PremisesActionTypes {
    AMENDMENT = 1,
    RENEWAL = 4
}

export enum PremisesAction {
    DRAFT = 2,
    IN_QUEUE = 0,
    VIEW = 5,
    CREATE = 6
}

export enum AllowedOpertions {
    REVOCATION = 1,
    ACTIVATIONSUSPENSION = 2
}

export enum ProductRegistrationHDRStatus {
    SAVED = 1,
    SUBMITTED = 2,
    PAYMENT_RECEIVED = 3,
    CANCELLED = 4,
    DOCUMENTS_CALLED = 5,
    DOCUMENTS_SUBMITTED = 6,
    APPROVED = 7,
    REJECTED = 8,
    ASSIGNED_TO_OFFICER = 9,
    CALL_DOCUMENT_REQUEST_CANCELLED = 10,
    CALL_DOCUMENT_REQUEST_REVERTED = 11,
    COMPLETED = 12,
    INSPECTION_CALLED = 15,
    INSPECTION_SUBMITTED = 17,
    INSPECTION_CANCELLED = 16
}

export enum ProductRegistrationStatus {
    SAVED = 1,
    PAYMENT_AWAITED = 2,
    PENDING = 4,
    // CALL_DOCUMENT = 2,
    APPROVED = 1,
    REJECTED = 3,
    CANCELLED = 5,
    RESTORED = 6,
    SUBMITTED = 14
}
export enum DrapEntityRegistrationStatus {
    BSS_APPROVED = 2,
    BSS_REJECTED = 4,
    BSS_CALL_DOCUMENT
}
export enum Page {
    FIRST_PAGE = 1,
    SECOND_PAGE = 2,
    THIRD_PAGE = 3
}
export enum ImportPermitAction {
    VIEW = 5,
    CREATE = 6,
    DRAFT = 2
}
// Drug Sales License
export enum DrugSalesLicensenStatus {
    DSL_APPROVED = 3,
    DSL_REJECTED = 4,
    DSL_CALL_DOCUMENT
}

export enum WaiverRequestStatus {

    DRAFT = 1,
    ASSIGNED_TO_OFFICER = 2,
    DOCUMENTS_CALLED = 3,
    APPROVED = 4,
    REJECTED = 5,
    SUBMITTED = 10
}
export enum WaiverRequestStatusDescription {

    DRAFT = "Draft",
    ASSIGNED_TO_OFFICER = "Assigned To Officer",
    DOCUMENTS_CALLED = "Document Called",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    SUBMITTED = "Submitted",
}

export enum CESSType {
    SindhCESS = 1,
    PunjabCESS = 2
}
export const DeclarationType = {
    HC : {
        ID: 47,
    },
}

export enum GuaranteeType {
    BankGuarantee = 1
}
// Drug Sales License
export enum DrugManufacturingLicensenStatus {
    DML_APPROVED = 3,
    DML_REJECTED = 4,
    DML_CALL_DOCUMENT
}

export enum AgnencyName {
    MFD = "Marine Fishries Department",
    DPP = "Department of Plant Protection"
}
// Drug Registration
export enum DrugRegistrationStatus {
    DDR_APPROVED = 3,
    DDR_REJECTED = 4,
    DDR_CALL_DOCUMENT
}