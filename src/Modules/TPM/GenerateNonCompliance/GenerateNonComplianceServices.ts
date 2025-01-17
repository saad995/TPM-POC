import ApiURLs from "Lib/API/ApiURLs";
import Methods from "../Constants/Methods";
import { Post } from "Lib/Net/PostRequest";

const getGenerateNonComplianceDataService = async (req: any) => {
    let requestOptions = {
      url: "",
      methodId: "",
      data: {},
      pagination: {},
    };
    requestOptions.url = ApiURLs.TPM_SERVICE_SECURE;
    requestOptions.methodId = Methods.GET_GENERATE_NON_COMPLIANCE_REQUEST;
    requestOptions.data = req;
    requestOptions.pagination = {};
    const verifiedResponse = await Post(requestOptions);
  
  
    return verifiedResponse.data;
  
  };

  export { getGenerateNonComplianceDataService };