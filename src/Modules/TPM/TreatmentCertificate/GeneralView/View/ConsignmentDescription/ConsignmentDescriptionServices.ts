import { IChangeItemWiseStatusRequestData } from "./ConsignmentDescriptionInterfaces";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import Methods from "Modules/TPM/Constants/Methods";
import { Post } from "Lib/Net/PostRequest";
//change Itemwise ReleaseOrder Status
const changeItemWiseStatus = async (request: IChangeItemWiseStatusRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},

        pagination: {}
    };
    requestOptions.url = ApiURL.SHRD_SERVICE;
    requestOptions.methodId = Methods.CHANGE_ITEMWISE_STATUS;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

export default {
    changeItemWiseStatus
};
