import { Post } from "Lib/Net/PostRequest";
import Methods from "Modules/TPM/Constants/Methods";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import {
    IPremisesRegistrationDeleteAttachmentReq,
    ISaveTreatmentTypeRegistrationReq,
    ISubmitImportPermitRequest,
    ISubmitPremiseRegistrationRequest,
    ISubmitRenewalTreatmentType,
} from "./AmendmentTreatmentTypeInterfaces";

const submitPremiseAmendmentFormService = async (req: ISubmitPremiseRegistrationRequest) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.OGA_SERVICE;
    requestOptions.methodId = Methods.SUBMIT_PREMIESE_AMENDMENT;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

const submitTreatmentTypeRegistrationService = async (req: ISubmitPremiseRegistrationRequest) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.SUBMIT_Treatment_Type_REGISTRATION;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

const saveTreatmentTypeRegistration = async (req: ISaveTreatmentTypeRegistrationReq) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.SAVE_TREATMENT_TYPE_DATA;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

const deleteTreatmentTypeRegistration = async (req: ISaveTreatmentTypeRegistrationReq) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.DELETE_TREATMENT_TYPE_DATA;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

const draftImportPermit = async (req: ISubmitImportPermitRequest) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.SUBMIT_IMPORT_PERMIT;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const deletePremisesRegistrationAttachments = async (req: IPremisesRegistrationDeleteAttachmentReq) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.OGA_SERVICE;
    requestOptions.methodId = Methods.DELETE_PREMISE_REGISTRATION_SUPPORT_DOCUMENT;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const confirmRegisteredTreatmentTypesService = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };

    requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.REGISTERED_TP_STEP1;
    requestOptions.data = req;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);

    return verifiedResponse;
};

const submitRenewalTreatmentTypeDataService = async (req:ISubmitRenewalTreatmentType)  => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };

    requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.SUBMIT_RENEWAL_TREATMENT_TYPE_DATA;
    requestOptions.data = req;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);

    return verifiedResponse;
}

export default {
    draftImportPermit,
    saveTreatmentTypeRegistration,
    deletePremisesRegistrationAttachments,
    submitTreatmentTypeRegistrationService,
    submitPremiseAmendmentFormService,
    confirmRegisteredTreatmentTypesService,
    deleteTreatmentTypeRegistration,
    submitRenewalTreatmentTypeDataService
};
