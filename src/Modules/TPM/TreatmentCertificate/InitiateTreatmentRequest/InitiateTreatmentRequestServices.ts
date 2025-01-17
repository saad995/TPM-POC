import ApiURL from "Modules/TPM/Constants/ApiURLs";
import Methods from "Modules/TPM/Constants/Methods";
import { Post } from "Lib/Net/PostRequest";
import ApiURLs from "Modules/Common/Constants/ApiURLs";
// import { IWareHouseDetailsRequest } from "./WarehouseInformationInterface";

const getRegisteredAgencyList = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.SHRD_SERVICE;
  requestOptions.methodId = Methods.GET_AGENCY;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;

};

const getSiteListByAgencyId = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.SHRD_SERVICE;
  requestOptions.methodId = Methods.GET_AGENCY_SITES;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;

}

const getCitiesListByAgencyId = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.UMS_SERVICE;
  requestOptions.methodId = Methods.GET_CITIES_BY_AGENCY_ID;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;

}

const getImporterListByRole = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.AUTH_SERVICE;
  requestOptions.methodId = Methods.GET_IMPORT_PERMIT_BASIC_INFO;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;

}

const submitRequest = async (req: any) => {
  let requestOptions = {
      url: "",
      methodId: Methods.SUBMIT_TREATMENT_REQUEST,
      data: {},
      pagination: {}
  };
  
  
  requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.SUBMIT_TREATMENT_REQUEST;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);
  


  return verifiedResponse;

}

const getCountryList = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.SHRD_SERVICE;
  requestOptions.methodId = Methods.GET_ALL_COUNTRIES;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

const getCountryListIncludingPak = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.SHRD_SERVICE;
  requestOptions.methodId = Methods.GET_ALL_COUNTRIES_INCLUDE_PAK;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

const getShedLocationDataListService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.SHRD_SERVICE;
  requestOptions.methodId = Methods.GET_ALL_SHED_LOCATION;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

const getHSCodeList = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.TARP_OPEN_SERVICE;
  requestOptions.methodId = Methods.GET_HSCODE_DATA;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

const getUomDataByHsCode = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.SHRD_SERVICE;
  requestOptions.methodId = Methods.GET_UOM_BY_HS_CODE;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

const getTreatmentTypeService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.GET_TREATMENT_TYPE_METHOD;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

const getTreatmentProviderService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.GET_TREATMENT_PROVIDER_METHOD;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

const getCustomCollectorateBaseOnCityService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.SHRD_SERVICE;
  requestOptions.methodId = Methods.GET_CUSTOM_COLLECTORATE_BASE_ON_CITY_METHOD;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

const getDependentTreatmentProviderService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.GET_DEPENDENT_TREATMENT_PROVIDER;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse;
}

const getPortOfLoadingService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.SHRD_SERVICE;
  requestOptions.methodId = Methods.GET_PORT_OF_LOADING;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

const getTreatmentSubTypesService = async (req: any) => {
  let requestOptions = {
    url: "",
    methodId: "",
    data: {},
    pagination: {},
  };
  requestOptions.url = ApiURL.TPM_SERVICE_SECURE;
  requestOptions.methodId = Methods.GET_TREATMENT_SUB_TYPES;
  requestOptions.data = req;
  requestOptions.pagination = {};
  const verifiedResponse = await Post(requestOptions);


  return verifiedResponse.data;
}

export default {
  getCustomCollectorateBaseOnCityService, getDependentTreatmentProviderService, getTreatmentSubTypesService, getShedLocationDataListService, getPortOfLoadingService, getCountryListIncludingPak, getTreatmentProviderService, getTreatmentTypeService, getRegisteredAgencyList, getHSCodeList , getSiteListByAgencyId, getCitiesListByAgencyId, getImporterListByRole, submitRequest, getCountryList, getUomDataByHsCode
};
