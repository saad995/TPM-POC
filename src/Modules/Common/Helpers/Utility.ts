import { Action, Agency, AgnencyName } from "Modules/TPM/Constants/Interfaces";

import { fetchGridDataFunc } from "./DateHelper";

export const getAgencyName =(agencyId:any)=>{
    let agencyName = '';
    if(agencyId && agencyId !== undefined){
        switch(agencyId){
            case Agency.MFD:
                agencyName = AgnencyName.MFD;
                break;
            case Agency.DPP:
                    agencyName = AgnencyName.DPP;
                    break;    
            default:
                agencyName = '';
                break;
        }
    }
    return agencyName;
}

export const getHeaderTitle =(title:any, agencyId:number | null)=>{
    let agencyName = '';
     agencyId = agencyId
         ? agencyId
         : (() => {
               const { agencyId } = fetchGridDataFunc();
               return agencyId;
           })();

    let headerTitle = title;
    if(agencyId && agencyId !== undefined){
        switch(agencyId){
            case Agency.MFD:
                agencyName = AgnencyName.MFD;
                headerTitle = headerTitle + " ("+  agencyName +")";
                break;
            case Agency.DPP:
                    agencyName = AgnencyName.DPP;
                    headerTitle = headerTitle + " ("+  agencyName +")";
                    break;
            case Agency.MFD:
                agencyName = AgnencyName.MFD;
                headerTitle = headerTitle + " ("+  agencyName +")";
                break;    
            default:
                headerTitle = headerTitle;
                break;
        }
    }
    return headerTitle;
}


export const getAgencyWiseMsgText = (agencyId: number, pathURL: any, action: any) => {
    let msg = "";
    let title = "";

    switch (agencyId) {
        case Agency.DPP:
            if (window.location.pathname.includes(pathURL.RenewalView)) {
                switch(action){
                    case Action.ReviewApprove:
                        msg = "Premises Registration Renewal request has been successfully approved!";
                        title = "Approved";
                        break;
                    case Action.ReviewReject:
                        msg = "Premises Registration Renewal request has been Rejected!";
                        title = "Rejected";
                        break;
                    default: 
                        break;
                }
            } else if (window.location.pathname.includes(pathURL.AmendmentView)) {
                switch(action){
                    case Action.ReviewApprove:
                        msg = "Premises Registration Amendment request has been successfully approved!";
                        title = "Approved";
                        break;
                    case Action.ReviewReject:
                        msg = "Premises Registration Amendment request has been Rejected!";
                        title = "Rejected";
                        break;
                    default: 
                        break;
                }
            }
            break;
        default:
            msg = "";
            title = "";
            break;
    }
    return { msg, title };
};