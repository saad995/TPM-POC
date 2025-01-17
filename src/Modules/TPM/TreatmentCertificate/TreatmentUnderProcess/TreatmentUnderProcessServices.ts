import { Post } from "Lib/Net/PostRequest";
import ApiURLs from "Modules/TPM/Constants/ApiURLs";
import Methods from "Modules/TPM/Constants/Methods";

const getTargetTreatmetListService = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {},
    };
    requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_TARGET_TREATMENT_REQUEST;
    requestOptions.data = req;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);


    return verifiedResponse.data;

};

const getTreatmentConductionListService = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {},
    };
    requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_CONDUCTION_TREATMENT_REQUEST;
    requestOptions.data = req;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);


    return verifiedResponse.data;

};

const getContainerTypeListDataService = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {},
    };
    requestOptions.url = ApiURLs.SHRD_SERVICE;
    requestOptions.methodId = Methods.GET_CONTAINER_TYPE_REQUEST;
    requestOptions.data = req;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);


    return verifiedResponse.data;

};

const getConsignmentModeListDataService = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {},
    };
    requestOptions.url = ApiURLs.SHRD_SERVICE;
    requestOptions.methodId = Methods.GET_CONSIGNMENT_MODES_REQUEST;
    requestOptions.data = req;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);


    return verifiedResponse.data;

};

const getTPCertificateFetchSaveDataService = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {},
    };
    requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_TREATMENT_CERTIFICATE_BY_ID;
    requestOptions.data = req;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);


    return verifiedResponse.data;

};

export { getTPCertificateFetchSaveDataService, getTargetTreatmetListService, getTreatmentConductionListService, getContainerTypeListDataService, getConsignmentModeListDataService }