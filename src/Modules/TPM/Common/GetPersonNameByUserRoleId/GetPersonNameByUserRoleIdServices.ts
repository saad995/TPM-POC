import { Post } from "Lib/Net/PostRequest";
import ApiURLs from "Modules/TPM/Constants/ApiURLs";
import Methods from "Modules/TPM/Constants/Methods";

const getPersonName = async (request: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURLs.AUTH_SERVICE;
    requestOptions.methodId = Methods.GET_PERSON_NAME;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);

    return verifiedResponse.data;
};

const GetTreatmentPersonNameByDocTypeCode = async (request: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURLs.OGA_SERVICE;
    requestOptions.methodId = Methods.GET_TREATMENT_PERSON_NAME;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

export default {
    getPersonName, GetTreatmentPersonNameByDocTypeCode
};
