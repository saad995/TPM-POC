import Methods from "Modules/TPM/Constants/Methods";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import { IUpdateCatchCertificateStatusRequestData, IViewRequestData } from "./ViewInterfaces";
import { Post } from "Lib/Net/PostRequest";

// Get Import Permit By ID service , for API calls
const getCatchCertificateByID = async (request: IViewRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.OGA_SERVICE;
    requestOptions.methodId = Methods.GET_CATCH_CERTIFICATE_BY_ID;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);

    return verifiedResponse.data;
};

const getCatchCertificateBySDID = async (request: IViewRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.SD_SERVICE;
    requestOptions.methodId = Methods.GET_CATCH_CERTIFICATE_BY_SDID;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);

    return verifiedResponse.data;
};

const updateCatchCertificateStatus = async (request: IUpdateCatchCertificateStatusRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.OGA_SERVICE;
    requestOptions.methodId = Methods.UPDATE_CATCH_CERTIFICATE_STATUS;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.message;
};

// Get Import Permit By ID service For Independent Component , for API calls
const getListCatchCertificatesForIndependentView = async (request: { id: string }) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.OGA_SERVICE;
    requestOptions.methodId = Methods.GET_LIST_OF_IMPORT_PERMIT_FOR_INDEPENDENT_VIEW;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);

    return verifiedResponse.data;
};

export default {
    getCatchCertificateByID,
    updateCatchCertificateStatus,
    getListCatchCertificatesForIndependentView,
    getCatchCertificateBySDID
};
