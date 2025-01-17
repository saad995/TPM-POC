import { Post } from "Lib/Net/PostRequest";
import ApiURL from "Lib/API/ApiURLs";
import Methods from "Lib/API/MethodIDs";

const getWelcomeMessage = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.USER_SERVICE_OPEN;
    requestOptions.methodId = Methods.GET_WELCOME_MESSAGE;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

export default {
    getWelcomeMessage
};
