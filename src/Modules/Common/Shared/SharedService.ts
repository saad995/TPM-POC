import ApiURL from "Modules/Common/Constants/ApiURLs";
import { Post } from "Lib/Net/PostRequest";
import Methods from "Lib/API/MethodIDs";
import { ICitiesByCountryCodeRequest } from "./SharedTypes";

const getCitiesByCountryCode = async (req: ICitiesByCountryCodeRequest) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.SHRD_SERVICE;
    requestOptions.methodId = Methods.GET_CITIES;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    if (Object.keys(verifiedResponse.data).length === 0) return [];
    return verifiedResponse.data;
};

const getCollectorateCities = async () => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.SHRD_SERVICE;
    requestOptions.methodId = Methods.GET_COLLECTORATE_CITIES_LIST;
    requestOptions.data = {};
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    if (Object.keys(verifiedResponse.data).length === 0) return [];
    return verifiedResponse.data;
};

const getCustomsCollectorate = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: undefined,
        pagination: {}
    };
    requestOptions.url = ApiURL.SHRD_SERVICE;
    requestOptions.methodId = Methods.GET_COLLECTORATE_CITIES_LIST;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

export default {
    getCitiesByCountryCode,
    getCollectorateCities,
    getCustomsCollectorate
};
