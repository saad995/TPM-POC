import { Post } from "Lib/Net/PostRequest";
import Methods from "Modules/TPM/Constants/Methods";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import {
    IGeneralCommentsByGroupCodeRequest,
    IGeneralCommentsByGroupCodeResponse
} from "./GeneralCommentsInterfaces";

const getGeneralCommentsByGroupCode = async (
    req: IGeneralCommentsByGroupCodeRequest
) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.SHRD_SERVICE;
    requestOptions.methodId = Methods.GET_GENERAL_COMMENTS_BY_GROUP_CODE;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

export default {
    getGeneralCommentsByGroupCode
};
