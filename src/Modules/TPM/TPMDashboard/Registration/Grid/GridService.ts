import Methods from "Modules/TPM/Constants/Methods";
import ApiURL from "Modules/TPM//Constants/ApiURLs";
import { Post } from "Lib/Net/PostRequest";

const GetAllRegistrations = async (request: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_ALL_TREATMENT_PROVIDER_REGISTRATIONS;
    requestOptions.data = request;
    requestOptions.pagination = request.pagination;
    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

export default {
    GetAllRegistrations
};
