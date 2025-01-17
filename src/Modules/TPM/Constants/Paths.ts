export default {
    ReleaseOrder: {
        Grid: "/OGA/LPCO/releaseOrder",
        View: `/OGA/LPCO/releaseOrder/View/`,
        RejectedDocuemnt: `/OGA/RejectedDocument/releaseOrder/View/`,
        CalledDocument: "/OGA/LPCO/releaseOrder/calledDocuments/view/",
        CallLab: "/OGA/LPCO/callLab/view/",
        PhysicalInspection: "/OGA/LPCO/releaseOrder/physicalInspection/view",
        Approvals: "/OGA/LPCO/releaseOrder/approvals/view",
        uploadTreatmentReport: "/OGA/LPCO/releaseOrder/treatmentReport/view",
        EDICalledDocument: "/OGA/LPCO/releaseOrder/EdiCalledDocuments/view/",
        EditItem: "/OGA/LPCO/releaseOrder/View/EditItem/",
        ViewItem: "/OGA/LPCO/releaseOrder/View/ViewItem/",
        Form22: "/OGA/LPCO/releaseOrder/View/Form22/",
        GenerateNonComplianceNotice: "/OGA/LPCO/releaseOrder/GenerateNonComplianceNotice",
    },
    ExportCertificate: {
        Approvals: "/OGA/LPCO/exportCertificate/approvals/view",
        Grid: "/OGA/LPCO/exportCertificate",
        View: "/OGA/LPCO/exportCertificate/View/",
        RejectedDocuemnt: "/OGA/RejectedDocument/exportCertificate/View/",
        CalledDocument: "/OGA/LPCO/exportCertificate/calledDocuments/view",
        CallLab: "/OGA/LPCO/callLab/view/",
        PhysicalInspection: "/OGA/LPCO/exportCertificate/physicalInspection/view",
        uploadTreatmentReport: "/OGA/LPCO/exportCertificate/treatmentReport/view",
        IndependentView: "/OGA/exportCertificate/view/",
        EditItem: "/OGA/LPCO/exportCertificate/View/EditItem/",
        ExtendItem: "/OGA/LPCO/exportCertificate/View/ExtendItem/",
        ViewItem: "/OGA/LPCO/exportCertificate/View/ViewItem/"
    },
    ImportPermit: {
        Approvals: "/OGA/LPCO/importPermit/approvals/view",
        Grid: "/OGA/LPCO/importPermit",
        CalledDocument: "/OGA/LPCO/importPermit/calledDocuments/view",
        View: "/OGA/LPCO/importPermit/view/",
        RejectedDocuemnt: "/OGA/RejectedDocument/importPermit/view/",
        Create: "/OGA/LPCO/importPermit/create",
        Edit: "/OGA/LPCO/importPermit/edit/",
        ExtensionView: "/OGA/LPCO/importPermit/extensionView/",
        RejectedAmmendmentDocument: "/OGA/RejectedDocument/importPermit/extensionView/",
        UpdateSite: "/OGA/LPCO/importPermit/updateSite/",
        OpinionRequestView: "/OGA/LPCO/importPermit/OpinionRequestView/"
    },
    Premises: {
        Approvals: "/registration/premises/approvals/view",
        Grid: "/registration/premises",
        CalledDocument: "/registration/premises/calledDocuments",
        View: "/registration/premises/view",
        RejectedDocuemnt: "/LPCO/RejectedDocument/premises/view/",
        Create: "/registration/premises/create",
        Edit: "/registration/premises/edit",
        RejectedAmmendmentDocument: "/LPCO/RejectedDocument/premises/extensionView/",
        Renewal: "/registration/premises/renewal",
        RenewalView: "/registration/premises/renewalView",
        ActivationDeactivationView: "/OGA/premisesRegistration/view/",
        ActivationDeactivation: "/OGA/premisesRegistration/",
        Amendment: "/registration/premises/amendment",
        CreateForm: "/registration/premises/createForm",
        CreateFormEdit: "/registration/premises/createFormEdit",
        AmendmentView: "/registration/premises/amendmentView"
    },
    Product: {
        Approvals: "/registration/product/approvals/view",
        Grid: "/registration/product",
        CalledDocument: "/registration/product/calledDocuments",
        View: "/registration/product/view/",
        RejectedDocuemnt: "/registration/RejectedDocument/product/view/",
        Create: "/registration/product/create",
        Edit: "/registration/product/edit/",
        RejectedAmmendmentDocument: "/registration/RejectedDocument/product/extensionView/",
        Renewal: "/registration/product/renewal/",
        RenewalView: "/registration/product/renewal/view/",
        ActivationDeactivationView: "/OGA/product/view/",
        ActivationDeactivation: "/OGA/product/",

        Amendment: "/registration/product/amendment/",
        AmendmentView: "/registration/product/amendmentView/",

        CreateItem: "/registration/product/createItem",
        EditItem: "/registration/product/Item/edit",
        IndependentView: "/OGA/product/view"
    },
    PremisesOfficer: {
        Grid: "/OGA/LPCO/premises",
        View: "/OGA/LPCO/premises/view",
        RenewalView: "/OGA/LPCO/premises/renewalView",
        AmendmentView: "/OGA/LPCO/premises/amendmentView",
        ActivationDeactivationView: "OGA/premisesRegistration/view/",
        IndependentView: "/OGA/common/premisesRegistration/view/"
    },

    ProductOfficer: {
        Grid: "/OGA/LPCO/product",
        View: "/OGA/LPCO/product/view",
        RenewalView: "/OGA/LPCO/product/renewalView",
        AmendmentView: "/OGA/LPCO/product/amendmentView"
    },
    SetupDeclaration: {
        Grid: "/OGA/ImportConditions",
        View: "/OGA/ImportConditions/view/",
        Create: "/OGA/ImportConditions/create",
        Edit: "/OGA/ImportConditions/edit/"
    },
    SeedEnlistment: {
        Approvals: "/OGA/LPCO/seedEnlistment/approvals/view",
        Grid: "/OGA/LPCO/seedEnlistment",
        CalledDocument: "/OGA/LPCO/seedEnlistment/calledDocuments/view",
        View: "/OGA/LPCO/seedEnlistment/view/",
        Create: "/OGA/LPCO/seedEnlistment/create",
        Edit: "/OGA/LPCO/seedEnlistment/edit/",
        Cancel: "/OGA/seedEnlistment/cancel",
        RejectedDocuemnt: `/OGA/RejectedDocument/seedEnlistment/View/`,
        ViewItem: "/OGA/LPCO/seedEnlistment/View/ViewItem"
    },
    Rejected: {
        Grid: "/OGA/rejectedDocument/"
    },
    QuotaManagement: {
        SingleTransactionNavigation: "/LPCO/others/quotaManagement/",
        SingleTransactionNavigationView: "/LPCO/others/quotaManagement/directDebit",
        QuotaHistoryNavigation: "/LPCO/others/quotaManagement/quotaHistory"
    },
    UPS: {
        PaymentInquiry: "/UPS/PaymentAdvice/"
    },
    CatchCertificate: {
        Grid: "/OGA/LPCO/catchCertificate",
        Create: "/OGA/LPCO/catchCertificate/create",
        View: "/OGA/LPCO/catchCertificate/view"
    },
    HSCodeListing: {
        Grid: "/OGA/LPCO/HSCodeListing",
        View: "/OGA/LPCO/HSCodeListing/view/",
        Create: "/OGA/LPCO/HSCodeListing/create"
    },
    ExportPermit: {
        Approvals: "/OGA/LPCO/exportPermit/approvals/view",
        Grid: "/OGA/LPCO/exportPermit",
        View: "/OGA/LPCO/exportPermit/view",
        Create: "/OGA/LPCO/exportPermit/create",
        Edit: "/OGA/LPCO/exportPermit/edit/",
        CalledDocument: "/OGA/LPCO/exportPermit/calledDocuments/view"
    },

    ActivationSuspension: {
        Grid: "/activationSuspension/",
        View: "/activationSuspension/view"
    },

    Revocation: {
        Grid: "/revocation/",
        View: "/revocation/view"
    },

    EntityRegistration: {
        Grid: "/registration/entityRegistration",
        CalledDocument: "/registration/entityRegistration/calledDocuments",
        View: "/registration/entityRegistration/view",
        RejectedDocuemnt: "/LPCO/RejectedDocument/entityRegistration/view/",
        Create: "/registration/entityRegistration/create",
        Edit: "/registration/entityRegistration/edit",
        RejectedAmmendmentDocument: "/LPCO/RejectedDocument/entityRegistration/extensionView/",
        Renewal: "/registration/entityRegistration/renewal",
        RenewalView: "/registration/entityRegistration/renewalView",
        ActivationDeactivationView: "/OGA/premisesRegistration/view/",
        ActivationDeactivation: "/OGA/premisesRegistration/",
        Amendment: "/registration/entityRegistration/amendment",
        AmendmentView: "/registration/entityRegistration/amendmentView"
    },
    EntityRegistrationOfficer: {
        Grid: "/OGA/LPCO/entityRegistration",
        View: "/OGA/LPCO/entityRegistration/view"
    },
    LicenseRegistrationDSL: {
        Grid: "/registration/licenseRegistration/drugsSaleLicense",
        Create: "/registration/licenseRegistration/drugsSaleLicense/create",
        View: "/registration/licenseRegistration/drugsSaleLicense/view",
        CalledDocument: "/registration/licenseRegistration/drugsSaleLicense/calledDocuments"
    },
    LicenseRegistrationDSLOfficer: {
        Grid: "/OGA/LPCO/drugsSaleLicense",
        View: "/OGA/LPCO/drugsSaleLicense/view"
    },
    SETN_Waiver: {
        Grid: "/OGA/LPCO/Sindh CESS Exemption/",
        View: "/OGA/LPCO/Sindh CESS Exemption/view"
    },

    GroundCheckReport: {
        Grid: "/GroundCheckReport",
        View: "/GroundCheckReport/view",
        AmendmentView: "/GroundCheckReport/amendmentView"
    },
    CessExemptionRequest: {
        Approvals: "/",
        Grid: "/OGA/LPCO/sindhCessExemption/",
        CalledDocument: "/OGA/LPCO/sindhCessExemption/calledDocuments/view",
        View: "/OGA/LPCO/sindhCessExemption/view",
        Create: "/OGA/LPCO/sindhCessExemption/Create",
        Edit: "/OGA/LPCO/sindhCessExemption/Edit/",
        Cancel: "",
        RejectedDocuemnt: ``
    },
    CessExemptionRequestAgainstNTN: {
        Approvals: "/",
        Grid: "/OGA/LPCO/sindhCessExemptionAgainstNtn/",
        CalledDocument: "/OGA/LPCO/sindhCessExemptionAgainstNtn/calledDocuments/view",
        View: "/OGA/LPCO/sindhCessExemptionAgainstNtn/view",
        Create: "/OGA/LPCO/sindhCessExemptionAgainstNtn/Create",
        Edit: "/OGA/LPCO/sindhCessExemptionAgainstNtn/Edit/",
        Cancel: "",
        RejectedDocuemnt: ``
    },
    // Drap DML Routes Starts
    LicenseRegistrationDML: {
        Grid: "/registration/licenseRegistration/drugsManufacturingLicense",
        Create: "/registration/licenseRegistration/drugsManufacturingLicense/create",
        View: "/registration/licenseRegistration/drugsManufacturingLicense/view",
        CalledDocument: "/registration/licenseRegistration/drugsManufacturingLicense/calledDocuments"
    },
    LicenseRegistrationDMLOfficer: {
        Grid: "/OGA/LPCO/drugsManufacturingLicense",
        View: "/OGA/LPCO/drugsManufacturingLicense/view"
    },
    // Drap DML Routes Ends
    DrugRegistrationTrader: {
        Grid: "/registration/drugRegistration",
        Create: "/registration/drugRegistration/create",
        View: "/registration/drugRegistration/view",
        CalledDocument: "/registration/drugRegistration/calledDocuments"
    },
    AgencyConfiguration: {
        //  Grid: "/agency",
        Create: "UMS/ConfigureOrganization/Create",
        Edit: "UMS/ConfigureOrganization/Edit",
        View: "UMS/ConfigureOrganization"
    },
    // Drap DML Routes Ends

    // License Registartion
    LicenseRegistrationTrader: {
        Menu: "/registration/licenseRegistration",
        View: "/registration/licenseRegistration/view"
    },
    LicenseRegistrationOfficer: {
        Grid: "/OGA/LPCO/licenseRegistration",
        View: "/OGA/LPCO/licenseRegistration/view"
    },
    DrugRegistrationOfficer: {
        Grid: "/OGA/LPCO/drugRegistration",
        View: "/OGA/LPCO/drugRegistration/view",
    },
    TPM: {
        Grid: "/TPM/TreatmentCertificates",
        View: `/TPM/TreatmentCertificates/View`
    },
    // Treatmet Providers
    TreatmentProviderTrader: {
        Grid: "/registration/dpp/treatmentProvider",
        registration: "/registration/dpp/treatmentProvider/register",
        TcGrid:"/tpm/treatmentcertificates"
    },
    Registration: {
        Grid: "registration",
        Create: "/tpm/registration/create",
        View: "/tpm/registration/view",
        ViewItem: "/tpm/registration/viewItem",
        Edit: "/tpm/registration/edit",
        Amendment: "/tpm/registration/amendment",
        AmendmentView: "/tpm/registration/amendmentView",
        RenewalView: "/tpm/registration/renewalView",
        Renewal: "/tpm/registration/renewal",
        CalledDocument: '',
        //CreateFormEdit:"/tpm/registration/edit",
        Approvals: '',
    }
};
