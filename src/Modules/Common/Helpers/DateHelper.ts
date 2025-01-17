import Paths from "Modules/TPM/Constants/Paths";
import moment from "moment";
import _ from "lodash";
import { parse, stringify, toJSON, fromJSON } from "flatted";
import Config from "Config";
import { Role } from "Lib/Types/SharedTypes";
import AmountFormatter from "Lib/Helpers/AmountFormatter";
import { IGridFuncProps } from "./HelperInterface";
import { DocumentClassificationCode } from "Modules/TPM/Constants/Interfaces";

// import { IGetPremiseCreateFormElements } from "Modules/OGA/PremisesRegistration/CreatePremiseRegistration/ReviewPremiseForm/ReviewPremiseFormInterface";
// import { IRegistrationList,IAgencyListResponseData } from "Modules/OGA/PremisesRegistration/Grid/GridInterfaces";
// import { PremisesFieldControlTypes } from "Modules/OGA/Common/GenericFieldControlTypeList/GenericFieldControlTypeListInterface";

const { Converter } = require("any-number-to-words");

const converter = new Converter();
export const getPreviousDate = (days: number) => {
    const currentDate = new Date();
    const currentDateNumbered = currentDate.getDate();
    const previousDate = new Date(currentDate.setDate(currentDateNumbered - days));

    return new Date(previousDate.setHours(0, 0, 0, 0));
};

export const getPreviousMonthsDate = (months: number) => {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.setMonth(currentDate.getMonth() - months));

    return new Date(previousDate.setHours(0, 0, 0, 0));
};

export const getLastWeeksDate =()=> {
    const now = new Date();
  
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  }

export const formatDate = (value: any, splitter: string = "-") => {
    if (value && value !== undefined) {
        let format = `DD${splitter}MM${splitter}YYYY`;
        let formattedDate = moment(value).format(format);
        return formattedDate;
    }
    return "";
};

export const formatDateTime = (value: any, splitter: string = "-") => {
    if (value && value !== undefined) {
        let format = `DD${splitter}MM${splitter}YYYY hh:mm:ss`;
        let formattedDate = moment(value).format(format);
        return formattedDate;
    }
    return "";
};


export enum FieldControlTypesForMNC {
    COMBOBOX = 1,
    TEXT = 2,
    DATE = 3,
    NUMERIC = 4,
    TEXTAREA = 5,
    CALENDER = 6,
    DECIMAL = 7,
    CHECKBOX = 8,
    GRID = 11, // TODO: change hoga
    HEADING = 10,
    GROUPCHECKBOX = 11,
    ATTACHMENT = 12,
    LABEL = 13,
    MUTLISELECT = 0,
    RADIOGROUP = 14,
    HSCODE = 15,
    PhoneNumber = 17, // TODO: test phone number
    CHILDREN = 18,
    DISCLAIMER = 19,
    CURRENCY = 16,
    CNIC = 20
}

export const getURL = (type:string | undefined,path:any)=>{
    switch (type) {
        case DocumentClassificationCode.PRODUCT.toString(): 
           return path;
        case DocumentClassificationCode.PRODUCT_AMENDMENT.toString(): 
           return path;
        default:
            return Paths.Premises;
    }
}

export const getUserRoleAction = (userRoleCode: string, type?: string) => {
    switch (userRoleCode) {
        case Role.Officer:
            return (type == "PRR" || type == "PRA") ? Paths.ProductOfficer : Paths.PremisesOfficer;
        case Role.InspectionOfficer:
            if (type == "GCR") {
                return Paths.GroundCheckReport;
            } else {
                return (type == "PRR" || type == "PRA") ? Paths.Product : Paths.Premises;
            }
        default:
            return (type == "PRR" || type == "PRA") ? Paths.Product : Paths.Premises;
    }     
    // console.log("uurrll ===>", url);
    // return url;
};

export const formatDateYearWise = (value: any, splitter: string = "-") => {
    if (value && value !== undefined) {
        let format = `YYYY${splitter}MM${splitter}DD`;
        let formattedDate = moment(value).format(format);
        return formattedDate;
    }
    return "";
};

export const fetchGridDataFunc = (GridFuncProps?: IGridFuncProps) => {
    let props: any = GridFuncProps;

    // Retrive request data if already set in previous request
    const gridInfoStoreHistoryObject = localStorage.getItem("gridInfoStore");
    //  let gridInfoStoreHistory = history?.location.state;
    let response = {
        initDocumentID: 0,
        agencyId: 0,
        action: 0,
        initDocumentTypeCode: "",
        documentClassificationCode: "",
        currentRecordId: 0,
        uploadPremisesExcelFIle: "",
        certDocumentTypeCode:"",
        encryptedId: "",
        isAmendment: false,
        isRenewal: false,
        agencyBusinessRegistrationEncryptedId:"",
        amendment: {
            initDocumentID: 0,
            documentClassificationCode: '',
            initDocumentTypeCode: '',
            initDocumentIDs: ''
        },
        renewal: {
            initDocumentID: 0,
            documentClassificationCode: '',
            initDocumentTypeCode: '',
            initDocumentIDs: ''
        }
    };

    // Retrive request data if already set in previous request
    // const gridInfoStoreHistoryObject = localStorage.getItem("gridInfoStoreHistoryObject");

    // if (history.location.state != null) {
    //     initDocumentID = props.id > 0 ? props.id : Number(history.location.state.id); // Number(param.id);
    //     gridInfoStoreHistory = history.location.state;

    if (props && Object.keys(props).length > 0) {
        Object.keys(props).map((item: any) => {
            if (props[item] !== undefined) {
                if (item == "id" || item == "initDocumentID") {
                    Object.assign(response, { initDocumentID: props[item] });
                } else if (item == "uploadPremisesExcelFIle") {
                    //Handle worse case
                    if (props[item]) {
                        Object.assign(response, { [item]: stringify(props[item]) });
                    } else {
                        Object.assign(response, { [item]: "" });
                    }
                } else {
                    Object.assign(response, { [item]: props[item] });
                }
            }
        });
        let reqJSON = JSON.stringify(response);
      //  const encrypted = CryptoJS.AES.encrypt(reqJSON, Config.secretKey).toString();

        // Setting localstorage to get request data on reload
        localStorage.setItem("gridInfoStore", reqJSON);
    } else if (gridInfoStoreHistoryObject != "undefined" && gridInfoStoreHistoryObject != null) {
        // const bytes = CryptoJS.AES.decrypt(gridInfoStoreHistoryObject, Config.secretKey);
        // const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        const tempGridInfoStoreHistory = JSON.parse(gridInfoStoreHistoryObject);

        // Setting up gridInfoStoreHistory from previous request data
        // response.initDocumentID = Number(tempGridInfoStoreHistory.id);

        //response.gridInfoStoreHistory = tempGridInfoStoreHistory;

        Object.keys(tempGridInfoStoreHistory).map((item: any) => {
            if (tempGridInfoStoreHistory[item] !== undefined) {
                if (item == "id" || item == "initDocumentID") {
                    Object.assign(response, { initDocumentID: tempGridInfoStoreHistory[item] });
                } else if (item == "uploadPremisesExcelFIle") {
                    //Handle worse case
                    if (tempGridInfoStoreHistory[item]) {
                        Object.assign(response, { [item]: parse(tempGridInfoStoreHistory[item]) });
                    } else {
                        Object.assign(response, { [item]: "" });
                    }
                } else {
                    Object.assign(response, { [item]: tempGridInfoStoreHistory[item] });
                }
            }
        });
    }
    //console.log("localStorage--", response);
    return response;
};

export const customSortFunction = (list: any, sortPara: any) => {
    return list?.sort((a: any, b: any) => (a[sortPara] > b[sortPara] ? 1 : -1));
};


export function reverseDateFormate(str: any) {
    if (!_.isNil(str)) {
        const splitDate = str.split("-");
        const date = splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0] + " " + "GMT";
        return new Date(date); //new Date("2022-5-19 GMT");
    }
    return str;
}

export function encodeBase64ToJson(base64String: string) {
    if (base64String) {
        const jsonString = Buffer.from(base64String, "base64").toString();
        if (jsonString) {
            try {
                return JSON.parse(jsonString);
            } catch (e) {
               // console.log("error--", e); // error in the above string (in this case, yes)!
                return null;
            }
        }
    }
    return null;
}

export function dateSortedInDecendingOrder(list: any, sortKey: any) {
    if (list) {
        let dateSorted = list?.sort(function (x: any, y: any) {
            let tx: any = Date.parse(x[sortKey]);
            let ty: any = Date.parse(y[sortKey]);
            return tx > ty ? -1 : 1;
        });
        return dateSorted;
    }
    return list;
}

export const UpdateValuesInStore = (formElements: any) => {
    let finalResult = {};

    if (!formElements || Object.keys(formElements).length === 0) return finalResult

    formElements?.map((sectionItem: any) => {
        if (!sectionItem || Object.keys(sectionItem).length === 0 || !sectionItem?.isEditAllowed) return

        const { columnName, DefaultValue, fieldControlTypeID } = sectionItem;
        let _fieldValue = DefaultValue == "" ? "-" : DefaultValue;

        if (finalResult.hasOwnProperty(columnName)) return

        switch (fieldControlTypeID) {
            case FieldControlTypesForMNC.TEXT:
                {
                    _fieldValue = _fieldValue;
                }
                break;
            case FieldControlTypesForMNC.DECIMAL:
            case FieldControlTypesForMNC.NUMERIC:
                {
                    _fieldValue = Number(_fieldValue);
                }
                break;
            case FieldControlTypesForMNC.DATE:
            case FieldControlTypesForMNC.CALENDER:
                {
                    // console.log("date value --", reverseDateFormate(_fieldValue));
                    // Fri Jan 06 2023 00:00:00 GMT+0500 (Pakistan Standard Time)
                    _fieldValue = reverseDateFormate(_fieldValue);
                }
                break;
            // case FieldControlTypesForMNC.COMBOBOX:
            //     {
            //         _fieldValue =
            //             element.listValues?.length > 0
            //                 ? element.listValues.find(
            //                       (item: any) =>
            //                           item?.name?.includes(_fieldValue) || item?.id == _fieldValue
            //                   )
            //                 : {};
            //     }
            //     break;
            default:
                {
                    _fieldValue = _fieldValue;
                }
                break;
        }

        finalResult = { ...finalResult, [columnName]: _fieldValue };
    });

    return finalResult;
};