import { Post } from "Lib/Net/PostRequest";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import Methods from "Modules/TPM/Constants/Methods";
import { IGetDocTypeByDocGroupCodeRequest } from "./UploadDocumentsInterfaces";
// import {
//     IGetDataByHSCodeRequest,
//     IGetDocTypeByDocGroupCodeRequest,
//     IRequestCallDocsRequest
// } from "./CallDocumentInterfaces";

// const getDocumentTypeByHSCode = async (req: IGetDataByHSCodeRequest) => {
//     let requestOptions = {
//         url: "",
//         methodId: "",
//         data: {},
//         pagination: {}
//     };
//     requestOptions.url = ApiURL.TARP_OPEN_SERVICE;
//     requestOptions.methodId = Methods.GET_DOCUMENT_TYPE_BY_HSCODE;
//     requestOptions.data = req;
//     requestOptions.pagination = {};

//     const verifiedResponse = await Post(requestOptions);
//     return verifiedResponse.data[0].documents;
// };

//2506
const getDocTypeByDocGroupCode = async (req: IGetDocTypeByDocGroupCodeRequest) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.SHRD_SERVICE;
    requestOptions.methodId = Methods.GET_DOCUMENT_TYPE_BY_DOCUMENT_GROUP_CODE;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

// const requestCallDocs = async (req: IRequestCallDocsRequest) => {
//     let requestOptions = {
//         url: "",
//         methodId: "",
//         data: {},
//         pagination: {}
//     };
//     requestOptions.url = ApiURL.OGA_SERVICE;
//     requestOptions.methodId = Methods.CALL_DOCUMENTS;
//     requestOptions.data = req;
//     requestOptions.pagination = {};
//     const verifiedResponse = await Post(requestOptions);
//     return verifiedResponse.message;
// };

const getSupportDocTypeCode = async (req: IGetDocTypeByDocGroupCodeRequest) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.SHRD_SERVICE;
    requestOptions.methodId = Methods.GET_SUPPORT_DOCUMENT_TYPE_BY_DOCUMENT_GROUP_CODE;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

export default {
    // getDocumentTypeByHSCode,
    // requestCallDocs,
    getDocTypeByDocGroupCode,
    getSupportDocTypeCode
};
