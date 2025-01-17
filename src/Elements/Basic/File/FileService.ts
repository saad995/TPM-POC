import Methods from "Lib/API/MethodIDs";
import ApiURL from "Lib/API/ApiURLs";
import {
    IFile,
    IFileDownloadRequest,
    IGetFilePathRequestData
} from "./FileTypes";
import { PostFile } from "Lib/Net/FormRequest";
import { GetFile } from "Lib/Net/GetFileRequest";
import { Post } from "Lib/Net/PostRequest";

//Download Document service, for API calls
const downloadDocument = async (request: IFileDownloadRequest) => {
    let requestOptions = {
        url: "",
        data: ""
    };
    requestOptions.url =
        ApiURL.FSS_READ + "/" + Methods.READ_FILE + "?fileId=" + request.id;
    requestOptions.data = request.fileName;

    const verifiedResponse = await GetFile(requestOptions);
    return verifiedResponse;
};

const uploadFile = async (req: IFile) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {},
        pagination: {}
    };
    requestOptions.url = ApiURL.FSS_UPLOAD;
    requestOptions.methodId = Methods.UPLOAD_FILE;
    requestOptions.data = req;
    requestOptions.pagination = {};

    const verifiedResponse = await PostFile(requestOptions);
    return verifiedResponse;
};

const deleteFile = async (id: string) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {}
    };
    requestOptions.url = ApiURL.FS_SERVICE;
    requestOptions.methodId = Methods.DELETE_FILE;
    requestOptions.data = { fileId: id };

    await Post(requestOptions);
};
const deleteFileTPMService = async (req: any) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {}
    };
    requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.DELETE_TPM_UPLOADED_FILE_FROM_OGA;
    requestOptions.data = req;
debugger
    await Post(requestOptions);
};
const getFilesDetail = async (ids: string[]) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {}
    };
    requestOptions.url = ApiURL.FS_SERVICE;
    requestOptions.methodId = Methods.GET_FILES_DETAIL;
    requestOptions.data = { files: ids };

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data.files;
};

const getFilePath = async (request: IGetFilePathRequestData) => {
    let requestOptions = {
        url: "",
        methodId: "",
        data: {}
    };
    requestOptions.url = ApiURL.FS_SERVICE;
    requestOptions.methodId = Methods.GET_FILEPATH;
    requestOptions.data = request;

    const verifiedResponse = await Post(requestOptions);
    return verifiedResponse.data;
};
export default {
    downloadDocument,
    uploadFile,
    deleteFile,
    getFilesDetail,
    getFilePath,
    deleteFileTPMService
};
