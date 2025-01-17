import ApiURL from "Modules/TPM/Constants/ApiURLs";
import Methods from "Modules/TPM/Constants/Methods";
import { Post } from "Lib/Net/PostRequest";
import ApiURLs from "Modules/Common/Constants/ApiURLs";
// import { IWareHouseDetailsRequest } from "./WarehouseInformationInterface";

const getSingleTreatmentRequestDetails = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.GET_SINGLE_TREAMENT_REQUESTS;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;

};

const postReassignTreatmentService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.POST_RE_ASSIGN_TREATMENT_PROVIDER;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse;

};

const postExportTPAssignService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.POST_EXPORT_TP_ASSIGNED;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse;

};
const postIOEndorsedTreatmentCertificateService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.POST_REJECT_TREATMENT_REQUEST;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse;

};

const postRejectTreatmentRequestService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.POST_REJECT_TREATMENT_REQUEST;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse;

};

const postSubmitTreatmentCertificateService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.POST_SUBMIT_TREATMENT_REQUEST;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse;

};

const postUpdateTreatmentCertificateService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.POST_UPDATE_CONTAINER_NUMBER_REQUEST;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse;

};

const getPreviewTreatmentCertificateService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.GET_PREVIEW_TREATMENT_CERTIFICATE_REQUEST;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;

};

// const postAcceptTreatmentRequestByTpService = async (req: any) => {
//   let requestOptions = {
//     url: "",
//     methodId: "",
//     data: {},
//     pagination: {},
//   };
//   requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
//   requestOptions.methodId = Methods.POST_REJECT_TREATMENT_REQUEST;
//   requestOptions.data = req;
//   requestOptions.pagination = {};
//   const verifiedResponse = await Post(requestOptions);


//   return verifiedResponse.data;

// };

export { postUpdateTreatmentCertificateService, postExportTPAssignService, getPreviewTreatmentCertificateService, postSubmitTreatmentCertificateService, postIOEndorsedTreatmentCertificateService, postReassignTreatmentService, getSingleTreatmentRequestDetails, postRejectTreatmentRequestService };
