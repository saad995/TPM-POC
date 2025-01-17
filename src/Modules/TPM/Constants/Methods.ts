export default {
    // Assign Agent
    GET_AUTHORIZED_AGENT_LIST: "1122",
    ASSIGN_AUTHORIZED_AGENT: "1124",
    GET_COLLECTORATE_LIST: "1706",
    GET_AGENT_REGISTRATION_RECORD: "1708",
    GET_AGENT_SUBSCRIPTION_RECROD: "1126",
    GET_AGENT_ASSIGNED_TO_TRADER_SUBID: "1128",
    GET_AGENT_ASSIGNED_TO_TRADER_DETAILS: "1710",
    DELETE_ASSIGN_AGENT: "1130",

    GET_HS_CODE_EXT_INFO: "1732",
    GET_HS_CODE_INFO: "1724",
    GET_HS_CODE_WITH_PURPOSE: "1729",
    SEARCH_HS_CODES: "1714",
    GET_IMPORT_PURPOSES_BY_HSCODE: "1712",
    GET_PACKAGE_TYPES: "1632",
    GET_FSC_ENLISTMENT: "1637",
    GET_MEANS_OF_CONVEYANCE: "2540",
    GET_TYPES_OF_PESTS: "2529",
    GET_CLASSIFICATION: "2528",
    GET_TYPES_OF_TIMBER: "2537",
    GET_AGENCY_SITES: "2543",

    //LPCO
    GET_DOCUMENT_COUNT: "1234",
    // Call Document
    CALL_DOCUMENTS: "1635",
    GET_DOCUMENT_TYPE_BY_HSCODE: "1722",
    CANCEL_CALL_DOCUMENT_REQUEST: "1664",

    // Called Document
    GET_CALLED_DOCUMENTS: "1636",
    SAVE_CALLED_DOCUMENTS: "1631",
    GET_DOCUMENT_STATUS: "1601",

    // Import Permit
    GET_IMPORT_PERMIT_BASIC_INFO: "1091",
    GET_ALL_IMPORT_PERMITS: "1610",
    GET_ALL_SUBMITTED_IMPORT_PERMITS: "1615",
    GET_IMPORT_PERMIT_BY_ID: "1628",
    GET_IMPORT_PERMIT_AMENDMENT_BY_ID: "1606",
    GET_LIST_OF_IMPORT_PERMIT_FOR_INDEPENDENT_VIEW: "1611",
    GET_CALL_DOCUMENT_FOR_APPROVAL: "1639",
    UPDATE_CALL_DOCUMENT_STATUS: "1633",
    UPDATE_IMPORT_PERMIT_STATUS: "1630",
    GET_PERSON_NAME: "1092",
    NTN_DETAILS: "1093",
    UPDATE_BILL_INFO: "1634",
    SAVE_IMPORT_PERMIT: "1626",
    SUBMIT_IMPORT_PERMIT: "1684",
    UPDATE_IMPORT_PERMIT_ATTACHMENT: "1674",
    SAVE_IMPORT_PERMIT_AMENDMENT: "1602",
    GET_ALL_AMENDMENT_IMPORT_PERMITS: "1604",
    UPDATE_IMPORT_PERMIT_AMENDMENT_STATUS: "1605",
    SAVE_IMPORT_PERMIT_CHANGES_STATUS: "1607",
    CHANGE_IMPORT_PERMIT_SITE: "16AK",
    AGENCY_OPINION_REQUEST: "16AT",
    GET_ALL_AGENCY_OPINION_REQUEST: "16AU",
    GET_IMPORT_PERMIT_OPINION_REQUEST_BY_ID: "16AV",
    UPDATE_IMPORT_PERMIT_AGENCY_OPINION_STATUS: "16AW",

    // Premises Registration
    GET_ALL_PREMISES: "16BI",
    GET_PREMIESE_FORM_ELEMENTS: "1730",
    SUBMIT_PREMIESE_REGISTRATION: "17A1",
    SUBMIT_PREMIESE_AMENDMENT: "16BL",
    GET_ALL_APPROVED_PREMISES_REGISTRATIONS: "16BR",
    ACTIVATE_DEACTIVATE_PREMISE_REGISTARTION: "16BS",
    GET_APPROVED_PREMISES_REGISTRATIONS_FOR_ACTIVATION: "16BT",
    SUBMIT_PREMISE_REGISTRATION_RENEWAL: "16BN",
    UPDATE_PREMISE_REGISTRATION_STATUS: "16BK",
    PREMISES_REGISTARTION_INDEPENDENT_VIEW: "16BZ",
    SUBMIT_PREMISE_REGISTRATION_AMENDMENT: "16CA",
    DELETE_PREMISE_REGISTRATION_SUPPORT_DOCUMENT: "16D1",

    // Release Order
    GET_ALL_RELEASE_ORDERS: "1640",
    GET_RELEASE_ORDER_BY_ID: "1641",
    CHANGE_RELEASE_ORDER_STATUS: "1642",
    CALL_PHYSICAL_INSPECTION: "1643",
    GET_ALL_ATTACHED_CALL_DOCUMENTS: "1644",
    UPDATE_PHYSICAL_INSPECTION_STATUS: "1645",
    CALL_LAB: "1646",
    UPDATE_LAB_STATUS: "1647",
    GET_ALL_LABORATORIES: "XXXX",
    GET_ALL_TESTS: "XXXX",
    GET_GD_DETAILS: "1983",
    GET_COMMODITY_DESCRIPTION: "1988",
    PHYSICAL_INSPECTION_VIEW: "1654",
    CHANGE_ITEMWISE_STATUS: "1665",
    GET_ALL_ATTACHED_FUMIGATION_REPORTS: "1668",
    GET_PHYSICAL_INSPECTION_FIELD: "1667",

    //Supporting Tools
    GET_BL_DETAILS: "1915",
    GET_BL_VIR_DETAILS: "1986",
    GET_GD_INFORMATION: "1923",
    AGENT_PROFILE: "1651",
    TRADER_PROFILE: "1652",
    INVOICE_DETAILS: "1982",
    IGM_DETAILS: "1656",
    IMPORT_COMMODITIES: "1980",
    IMPORTER_EXPORTER_INFORMATION: "1981",
    GET_ALL_ATTACHED_DOCUMENTS: "1653",
    GET_WAREHOUSE_DETAILS: "19P2",

    //Export Certificate
    GET_EXPORT_CERTIFICATE_BY_ID: "1657",
    GET_GD_DETAILS_FOR_EC: "1984",
    GET_HSCODE_INFORATION_BY_GDITEMID_FOR_APPROVAL: "1985",
    GET_FINDINGS_AND_ATTACHMENTS_FOR_PHYSICAL_INSPECTION: "1661",
    DELETE_FINDINGS_AND_TREATMENTS_FOR_PHYSICAL_INSPECTION: "1666",
    CHANGE_EXPORT_CERTIFICATE_STATUS: "1658",
    GET_ALL_EXPORT_CERTIFICATES: "1660",
    GET_ALL_AMENDED_EXPORT_CERTIFICATES: "1694",
    GET_HSCODE_INFORMATION_BY_SDITEMIDS: "1987",
    GET_EXPORT_CERTIFICATE_FOR_INDEPENDENT_VIEW_OGA: "1614",
    GET_EXPORT_CERTIFICATE_FOR_INDEPENDENT_VIEW_SD: "1942",
    GET_RELEASE_ORDER_CERTIFICATE_FOR_INDEPENDENT_VIEW: "1625",
    GET_RELEASE_ORDER_CERTIFICATE_FOR_INDEPENDENT_VIEW_SD: "194A",
    CHANGE_EXPORT_CERTIFICATE_AMENDMENT_STATUS: "2002",
    UPDATE_SDITEM_EXT: "1903",
    GET_HSCODE_EXT_DATA_ELEMENTS: "1939",
    GET_SD_FIELD_CONTROL_TYPE: "1991",
    GET_FACTORS_LOVS: "1720",
    CHECK_IF_EXTENDED_ELEMENTS: "19F7",
    GET_EC_PAYMENT_INFO: "1435",
    GET_EC_ALLOWED_EXTENSIONS: "19F8",
    SUBMIT_EC_EXTENSIONS: "1615",
    CHANGE_EXPORT_CERTIFICATE_EXTENSION_STATUS: "1616",
    CHANGE_EXPORT_CERTIFICATE_EXTENSION_DATE_SD: "19G9",
    GET_ALL_EXTENDED_EXPORT_CERTIFICATES: "1617",
    GET_ALL_REVIEWED_EXPORT_CERTIFICATES: "16AK",
    SUBMIT_EC_REVIEW: "17A2",
    CHANGE_EXPORT_CERTIFICATE_REVIEW_STATUS: "",
    SAVE_EXTENDED_EXPORT_CERTIFICATES_ITEMS: "16AM",

    // Files
    UPLOAD_FILE: "1211",
    DELETE_FILE: "1212",
    READ_FILE: "1213",
    GET_FILES_DETAIL: "1214",

    // Generate Voucher
    GENERATE_VOUCHER: "1415",

    // SHRD
    GET_PRESCRIBED_PORT_OF_ENTRY: "2501",
    GET_ALL_COUNTRIES: "2502", // ok
    GET_ALL_COUNTRIES_INCLUDE_PAK: "2532", // ok
    GET_ALL_SHED_LOCATION: "2520",
    GET_CITIES_BY_COUNTRY_CODE: "2503", // ok
    GET_GENERAL_COMMENTS_BY_GROUP_CODE: "2505",
    GET_DOCUMENT_TYPE_BY_DOCUMENT_GROUP_CODE: "2506",
    GET_SUPPORT_DOCUMENT_TYPE_BY_DOCUMENT_GROUP_CODE: "2548",
    GET_AGENCY: "2544", // ok
    GET_TRADE_PURPOSES: "2530",
    GET_UOM_BY_HS_CODE: "2531",
    GET_COUNTRIES: "2532",
    GET_AGENCIES_AGAINST_CLASSIFICATION_CODE: "2547",

    // UMS
    GET_CITIES_BY_AGENCY_ID: "1230",
    GET_USER_RIGHTS: "1231",

    //DPP Dashboard
    WORKLOAD_SUMMARY: "1655",
    FEE_COLLECTION_REPORT: "1662",
    MANAGEMENT_REPORT: "1663",

    // Registration
    GET_REGISTRATION_TYPE_DOCUMENTS: "1721",
    UPLOAD_OGA_FILE: "1722",
    GET_REGISTRATION_TYPES: "1723",
    GET_COLUMN_NAMES: "1724",
    GET_HSCODE_DATA: "1739",
    GET_UPLOADED_REGISTRATION: "1725",
    GET_UPLOADED_PROGRESS: "1726",
    GET_UPLOADED_HISTORY: "1727",
    UPDATE_UPLOADED_HISTORY_STATUS: "1728",
    UPLOAD_OGA_PREMISE_FILE: "1729",
    UPLOAD_OGA_PREMISE_SUPPORT_FILEs: "1741",
    UPLOAD_OGA_PRODUCT_FILE: "1629",
    GET_PRODUCT_FORM_ELEMENTS: "1608",
    GET_ALL_PRODUCTS: "1609",
    SUBMIT_PRODUCT_REGISTRATION: "1617",
    UPDATE_PRODUCT_REGISTRATION_STATUS: "1621",

    // Export to PDF
    EXPORT_TO_PDF: "1998",
    EXPORT_TO_PDF_ANONYMOUS: "2000",
    EXPORT_PDF: "2010",

    // Get Rejected Docoments
    GET_REJECTED_DOCUMENTS: "1999",

    //Import Conditions
    UPDATE_IMPORT_CONDITION_STATUS: "2006",
    GET_ALL_IMPORT_CONDITIONS_FOR_GRID: "2005",
    DELETE_IMPORT_CONDITION: "2007",
    IMPORT_CONDITION_FOR_SUPPORTING_TOOL: "2008",
    GET_IMPORT_CONDITION_BY_ID: "2009",
    //Revocation
    GET_IMPORT_PERMITS_FOR_REVOCATION: "1612",
    REVOKE_RESTORE_IP: "1613",

    //FSCRD
    GET_ALL_SEED_ENLISTMENTS: "16AA",
    GET_ALL_APPROVED_SEED_ENLISTMENTS: "16A1",
    GET_ORGANIZATION_ADDRESS: "16AB",
    SAVE_SEED_ENLISTMENT: "16AC",
    GET_SEED_ENLISTMENT_BY_ID: "16AD",
    GET_DOCUMENT_TYPE_BY_HSCODE_FACTOR_LIST: "1732",
    SUBMIT_SEED_ENLISTMENT: "16AE",
    CANCEL_SEED_ENLISTMENT: "16A2",
    UPDATE_SEED_ENLISTMENT_STATUS: "16AG",
    GET_SEED_ENLISTMENT_BY_ID_INDEPENDENT_VIEW: "16AH",
    GET_SEED_ENLISTMENT_BY_USERROLEID: "16A3",
    // EDI Based
    EDI_GET_CALLED_DOCUMENTS: "1811",
    EDI_SAVE_CALLED_DOCUMENTS: "1812",
    EDI_SUBMIT_RELEASE_ORDER_REVIEW: "1814",

    //Track Document
    TRACK_DOCUMENT: "2015",
    VIEW_ACTIVITY_LOG: "2016",
    //SHRD
    GET_LOV_FROM_SHRD: "2542",

    // Quota Management
    UPDATE_QUOTA_IP: "2017",
    GET_ALL_APPROVED_IPS: "2019",
    GET_IMPORT_PERMIT_HISTORY_QUOTA: "2020",

    //Catch Certificate
    GET_ALL_CATCH_CERTIFICATES: "16BD",
    SUBMIT_CREATE_CATCH_CERTIFICATE: "16BB",
    GET_SD_NUMBERS_BY_NTN: "19M2",
    GET_CATCH_CERTIFICATE_BY_ID: "16BE",
    GET_CATCH_CERTIFICATE_BY_SDID: "19M1",
    UPDATE_CATCH_CERTIFICATE_STATUS: "16BF",
    GET_KEY_BY_VALUE: "16BM",

    //Call Lab
    GENEARTE_CALL_LAB_SAMPLE_ID: "1699",
    GET_CALL_LAB_HISTORY: "9138",
    //LMS
    GET_ASSOCIATED_LABS: "9130",
    SUBMIT_CALL_LAB: "1646",

    //PSI
    GET_PSI_REPORT: "29AK",
    GET_PSI_REPORT_By_id: "29AJ",
    GET_PSI_REPORT_DETAILS: "29AL",
    GET_PSI_PAYMENT_DETAILS: "29AN",

    //Container Examination
    GET_CONTAINER_INFO_AGAINST_SDNUMBER: "16A4",
    GET_CONATINERS_FROM_SD: "19H8",

    //Export Permits
    // GET_ITEM_REG_BY_HSCODE: "16C3",
    SAVE_EXPORT_PERMIT: "16C4",
    SUBMIT_EXPORT_PERMIT: "16C5",
    GET_ALL_EXPORT_PERMITS: "16C1",
    GET_EXPORT_PERMIT_BY_ID: "16C2",
    UPDATE_EXPORT_PERMIT_STATUS: "16C6",
    GET_ALLOWED_OPERATIONS: "16C8",
    GET_SUSPENDABLE_EXPORT_PERMIT: "16D4",
    GET_REVOCABLE_EXPORT_PERMIT: "16C7",
    REVOKE_EXPORT_PERMIT: "16C9",
    ACTIVATE_SUSPEND_EXPORT_PERMIT: "16D2",
    GET_EXPORT_PERMIT_BY_ID_ACTIVATION_REVOCATION: "16D3",
    FEES_CALCULATION: "16AR",

    //Import Permit
    GET_AGENCIES_BY_CLASSIFICATION_CODE: "2549",
    GET_HSCODE_EXT_DATA_ELEMENTS_OGA: "16M2",
    GET_REGISTRATION_LIST: "16M1",
    GET_HS_CODE_INFO_FROM_COMMODITY_REGISTRATION: "16M3",
    GET_OGA_FIELD_CONTROL_TYPE: "16M4",
    UPDATE_VALIDITY_DATE: "16M5",
    GET_IMPORT_PERMIT_BY_ID_ACTIVATION_REVOCATION: "16D5",

    // Drap Entity Registration
    GET_ALL_ENTITY_REGISTRATION: "16E1",
    UPDATE_ENTITY_REGISTRATION_STATUS: "16E2",
    SUBMIT_ENTITY_REGISTRATION: "16E3",
    GET_DRAP_DOCUMENT_TYPE: "16E4",
    GET_REGISTRATION_TYPE: "16E5",
    GET_PARTNERSHIP_TYPE: "16E6",
    GET_OTHER_TYPE_DIRECTOR_INFO: "16E7",
    GET_ATTACHED_AND_CALL_DOCUMENTS: "16E8",

    //Bulk Upload View
    GET_DRUG_REGISTRATION_BY_ID: "16AX",
    GET_LICENSE_REGISTRATION_BY_ID: "16AY",

    //Import Permit
    GET_EXPORT_PERMIT_INDEPENDENT_VIEW_BY_ID: "16M6",

    // DML Detail Dump
    SUBMIT_DML_DETAIL: "01D1",
    GET_DML_DETAIL: "01D2",
    SUBMIT_DML_PRODUCT_DETAIL: "01D3",
    GET_DML_PRODUCT_DETAIL: "01D4",

    // * TPM strategy methods
    SUBMIT_TREATMENT_REQUEST: "5004",
    GET_LIST_OF_TREAMENT_REQUESTS: "5003",
    GET_SINGLE_TREAMENT_REQUESTS: "5007",
    GET_TREATMENT_CERTIFICATE_REQUESTS: "5009",
    GET_TREATMENT_TYPE_METHOD: "5002",
    GET_TREATMENT_PROVIDER_METHOD: "5005",
    GET_CUSTOM_COLLECTORATE_BASE_ON_CITY_METHOD: "2558",
    GET_PORT_OF_LOADING: "2519",
    POST_RE_ASSIGN_TREATMENT_PROVIDER: "5008",
    POST_EXPORT_TP_ASSIGNED: "5023",
    POST_REJECT_TREATMENT_REQUEST: "5006",
    GET_TARGET_TREATMENT_REQUEST: "5010",
    GET_CONDUCTION_TREATMENT_REQUEST: "5011",
    POST_SUBMIT_TREATMENT_REQUEST: "5012",
    POST_UPDATE_CONTAINER_NUMBER_REQUEST: "5025",
    GET_CONTAINER_TYPE_REQUEST: "2517",
    GET_CONSIGNMENT_MODES_REQUEST: "2511",
    GET_TREATMENT_CERTIFICATE_BY_ID: "5013",
    GET_IO_RIGHT_REQUEST:"1231",
    GET_PREVIEW_TREATMENT_CERTIFICATE_REQUEST: "5015",
    GET_TREATMENT_SUB_TYPES: "5018",
    Get_TPM_Form22_History: '5024',
    Get_TPM_Form22_History_Form22: '5028',
    GET_TREATMENT_PERSON_NAME: "1707",
    GET_DEPENDENT_TREATMENT_PROVIDER: "5032",


    //TP onBoarding
    GET_ALL_TREATMENT_PROVIDER_REGISTRATIONS: "5030",
    GET_UN_REGISTERED_TP_LIST_METHOD: "1709",  //GetAllTreatmentProviders
    REGISTERED_TP_STEP1: "5031", //confirmTreatmentTypes
    GET_TREATMENT_TYPES_BY_TP_Id: "5037",  //Get treatment type data
    SAVE_TREATMENT_TYPE_DATA: "5033",
    DELETE_TREATMENT_TYPE_DATA: "5034",
    SUBMIT_Treatment_Type_REGISTRATION: "5035",
    SUBMIT_RENEWAL_TREATMENT_TYPE_DATA:"5041",
    
    GET_GENERATE_NON_COMPLIANCE_REQUEST: "5039"
};
