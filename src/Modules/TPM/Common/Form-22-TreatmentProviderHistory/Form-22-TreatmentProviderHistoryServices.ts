import ApiURLs from "Modules/TPM/Constants/ApiURLs";
import {
    IChangeReleaseOrderStatusRequestData,
    IGetPhysicalInspectionRequestData,
    ITPMForm22HistoryRequestData,
    IViewDetailRequestData,
    IViewRequestData
} from "./Form-22-TreatmentProviderHistoryInterfaces";
import { Post } from "Lib/Net/PostRequest";
import Methods from "Modules/TPM/Constants/Methods";

//Get TPM Form 22 history
const getTPMForm22HistoryService = async (request: ITPMForm22HistoryRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.Get_TPM_Form22_History_Form22;
    requestOptions.data = request;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

//GetRelease Order By ID Basic information service , for API calls
const getReleaseOrderBasicinformationById = async (request: IViewRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURLs.OGA_SERVICE;
    requestOptions.methodId = Methods.GET_RELEASE_ORDER_BY_ID;
    requestOptions.data = request;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};
//GetRelease Order Detailed information from gd service on behalf of gd number against release order
const getGDInformationById = async (request: IViewDetailRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURLs.SD_SERVICE;
    requestOptions.methodId = Methods.GET_GD_DETAILS;
    requestOptions.data = request;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);

    return verifiedResponse;
};

const changeReleaseOrderStatus = async (request: IChangeReleaseOrderStatusRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURLs.OGA_SERVICE;
    requestOptions.methodId = Methods.CHANGE_RELEASE_ORDER_STATUS;
    requestOptions.data = request;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};
//change Itemwise ReleaseOrder Status
// const changeItemWiseStatus = async (request: IChangeItemWiseStatusRequestData) => {
//     let requestOptions = {
//         url: "",
//         methodId: "",
//         data: {},
//         pagination: {}
//     };
//     requestOptions.url = ApiURL.OGA_SERVICE;
//     requestOptions.methodId = Methods.CHANGE_ITEMWISE_STATUS;
//     requestOptions.data = request;
//     requestOptions.pagination = {};

//     const verifiedResponse = await Post(requestOptions);
//     return verifiedResponse;
// };
//ViewPhysicalInspectionInfo information service , for API calls
const ViewPhysicalInspectionInfo = async (request: IGetPhysicalInspectionRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURLs.OGA_SERVICE;
    requestOptions.methodId = Methods.PHYSICAL_INSPECTION_VIEW;
    requestOptions.data = request;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse;
};

export default {
    getReleaseOrderBasicinformationById,
    changeReleaseOrderStatus,
    getGDInformationById,
    ViewPhysicalInspectionInfo,
    getTPMForm22HistoryService
    // changeItemWiseStatus
};
