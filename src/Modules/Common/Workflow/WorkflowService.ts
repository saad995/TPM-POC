import { Post } from "Lib/Net/PostRequest";
import Methods from "Lib/API/MethodIDs";
import ApiURL from "Lib/API/ApiURLs";

const wfCreateProcessInstance = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };

    requestOptions.url = ApiURL.WFS_SERVICE_SECURE;
    requestOptions.methodId = Methods.CREATE_PROCESS_INSTANEC;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const wfGetAvaiableCommands = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };

    requestOptions.url = ApiURL.WFS_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_AVAIABLE_COMMANDS;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const wfExecuteCommand = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };

    requestOptions.url = ApiURL.WFS_SERVICE_SECURE;
    requestOptions.methodId = Methods.EXECUTE_COMMANDS;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const wfGetProcessInstancePersistence = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };

    requestOptions.url = ApiURL.WFS_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_PROCESS_ID_BY_PARAMETER_NAME;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

const wfInvlokeCommand = async (req: any, url: string, methodId: string) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = url;
    requestOptions.methodId = methodId;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};

export default {
    wfCreateProcessInstance,
    wfGetAvaiableCommands,
    wfExecuteCommand,
    wfGetProcessInstancePersistence,
    wfInvlokeCommand
};
