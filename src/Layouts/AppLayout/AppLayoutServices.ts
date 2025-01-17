import ApiURL from "Lib/API/ApiURLs";
import { Post } from "Lib/Net/PostRequest";
import Methods from "Lib/API/MethodIDs";
import {
    IGetLatestMessagesRequestData,
    IGetUnreadUserAlertsRequestData,
    IGetUnreadUserMessagesRequestData,
    IGetWebocNavigationEncryptedTokenRequestData,
    ISwitchUserRoleRequestData
} from "./AppLayoutInterfaces";

const switchUserRole = async (req: ISwitchUserRoleRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.USER_SERVICE_SECURE;
    requestOptions.methodId = Methods.SWITCH_USER_ROLE;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const pinMenu = async (menuId: number) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.USER_SERVICE_SECURE;
    requestOptions.methodId = Methods.PIN_USER_MENU;
    requestOptions.data = menuId;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse; //.data;
};

const getLatestMessages = async (req: IGetLatestMessagesRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.INBOX_SERVICE;
    requestOptions.methodId = Methods.GET_LATEST_MESSAGES;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const unPinMenu = async (menuId: number) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.USER_SERVICE_SECURE;
    requestOptions.methodId = Methods.UN_PIN_USER_MENU;
    requestOptions.data = menuId;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse; //.data;
};

const getTopUnreadMessages = async (req: IGetUnreadUserMessagesRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.USER_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_TOP_UNREAD_MESSAGES;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const getTopUnreadAlerts = async (req: IGetUnreadUserAlertsRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.USER_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_TOP_UNREAD_ALERTS;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};


const getUserDashboardInfo = async () => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.USER_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_USER_DASHBOARD_INFO;
    requestOptions.data = {};
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const getWebocNavigationEncryptedToken = async (req: IGetWebocNavigationEncryptedTokenRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.USER_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_WEBOC_NAV_ENCRYPTED_TOKEN;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

export default {
    switchUserRole,
    getUserDashboardInfo,
    getTopUnreadAlerts,
    getTopUnreadMessages,
    getWebocNavigationEncryptedToken,
    pinMenu,
    getLatestMessages,
    unPinMenu,
};
