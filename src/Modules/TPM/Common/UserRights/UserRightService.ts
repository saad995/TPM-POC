import { Post } from "Lib/Net/PostRequest";
import { IUserRightsRequestData } from "./UserRightsInterfaces";
import Methods from "Modules/TPM/Constants/Methods";
import ApiURLs from "Modules/TPM/Constants/ApiURLs";

const userRightsService = async (req: IUserRightsRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURLs.UMS_SERVICE;
    requestOptions.methodId = Methods.GET_USER_RIGHTS;
    requestOptions.data = req;

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

export default {
    userRightsService
};
