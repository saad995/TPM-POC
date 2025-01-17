import { GridCellProps } from "@progress/kendo-react-grid";
import { getTimeAgoMessage } from "Modules/Common/CommonUtility";
import ApiURL from "Modules/TPM/Constants/ApiURLs";
import {ServiceCodes} from "../Interfaces";

const ITTMethodIds = {
    "1726":"220B",
    "1720":"220A",
    "1722":"220C",
    "1716":"220D",
    "1724":"220F",
    "1732":"220E",
    "1737":"220G",
    "1729":"220H"
}

export const GetRoute = (service : string, methodId : string) : string => {
    if(service == ServiceCodes.ITT)
    {
        return ITTMethodIds[methodId as keyof Object].toString();
    }
    
    return methodId;
};
export const GetQueue = (service : string) : string => {
    if(service == ServiceCodes.ITT)
    {
        return ApiURL.ITT_OPEN_SERVICE;
    }
    
    return ApiURL.TARP_OPEN_SERVICE;
};

export const GetSecureQueue = (service : string) : string => {
    if(service == ServiceCodes.ITT)
    {
        return ApiURL.ITT_SERVICE;
    }
    
    return ApiURL.TARP_SERVICE;
};
