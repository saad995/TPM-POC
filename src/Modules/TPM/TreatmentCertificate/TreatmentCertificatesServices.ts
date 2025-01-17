import ApiURL from "Modules/TPM/Constants/ApiURLs";
import Methods from "Modules/TPM/Constants/Methods";
import { Post } from "Lib/Net/PostRequest";
import ApiURLs from "Modules/TPM/Constants/ApiURLs";
// import { IWareHouseDetailsRequest } from "./WarehouseInformationInterface";

const getTreatmentCertificatesList = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.GET_LIST_OF_TREAMENT_REQUESTS;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;

};

const getIssueTreatmentCertificateService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.GET_TREATMENT_CERTIFICATE_REQUESTS;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;

};

const getIORightDataSerice = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.UMS_SERVICE;
  requestOptions.methodId = Methods.GET_IO_RIGHT_REQUEST;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;

};
export { getIORightDataSerice, getTreatmentCertificatesList, getIssueTreatmentCertificateService };