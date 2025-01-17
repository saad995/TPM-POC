import { Post } from "Lib/Net/PostRequest";
import Methods from "../Constants/Methods";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import { IUpdateProfilePictureRequest, IUserDetailRequest } from "./WorkloadSummaryInterfaces";

const getWorkloadSummaryService = async (request: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    // requestOptions.url = ApiURL.LMS_SERVICE_SECURE;
    // requestOptions.methodId = Methods.GET_WORKLOAD_SUMMARY;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

const getLabAllLabOfficers = async (request: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    // requestOptions.url = ApiURL.LMS_SERVICE_SECURE;
    // requestOptions.methodId = Methods.GET_LAB_OFFICERS;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};


const updateProfilePicture = async (
    request : IUpdateProfilePictureRequest
) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    // requestOptions.url = ApiURL.UMS_SERVICE;
    // requestOptions.methodId = Methods.UPDATE_PROFILE_PICTURE;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

const getUserDetail = async (
    request : IUserDetailRequest
) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    // requestOptions.url = ApiURL.UMS_SERVICE;
    // requestOptions.methodId = Methods.GET_USER_DETAIL;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

export default {
    getWorkloadSummaryService,
    getLabAllLabOfficers,
    updateProfilePicture,
    getUserDetail
 }