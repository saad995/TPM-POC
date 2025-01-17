import { Post } from "Lib/Net/PostRequest";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import Methods from "Modules/TPM/Constants/Methods";
import type { IPrintRequestData } from "./ExportPdfInterfaces";
import ApiURLs from "Modules/Common/Constants/ApiURLs";

const ExportPdfService = async (request: IPrintRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };

    requestOptions.url =ApiURLs.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_PREVIEW_TREATMENT_CERTIFICATE_REQUEST;
    requestOptions.data = request;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

export default {
    ExportPdfService,
};
