import validation from "Modules/TPM/Constants/validation";
import _ from "lodash";
import { FieldControlTypes } from "Elements/Custom/FormGenerator/FormGeneratorInterface";
import { reverseDateFormate } from "Modules/Common/Helpers/DateHelper";
import { TreatmentType, TreatmentTypeRegistrationStatus } from "./CreateEditTPMRegistration/CreateEditTPMRegistrationInterfaces";
import { DocumentInfo } from "Modules/TPM/Constants/Interfaces";
import moment from "moment";
import { Agency } from "Modules/Common/Constants/Interfaces";
import { useDispatch } from "react-redux";
import Paths from "Modules/TPM/Constants/Paths";
import { TreatmentPurpose } from "./Renewal/RenewalTreatmentTypeInterfaces";

export const comboBoxValidator = (value: any) => {
   // debugger
    // let msg = validation.Address.message;

    // if (value) {
    //     if (
    //         value?.length >= validation.Address.minLength &&
    //         value?.length <= validation.Address.maxLength 
    //     ) {
    //         msg = '';
    //     } else {
    //        msg = msg;
    //     }
    // } else {
    //     msg = msg;
    // }
    
    return '';
};

export const addressValidator = (value: any) => {
    let msg = validation.Address.message;

    if (value) {
        if (
            value?.length >= validation.Address.minLength &&
            value?.length <= validation.Address.maxLength 
        ) {
            msg = '';
        } else {
           msg = msg;
        }
    } else {
        msg = msg;
    }
    
    return msg;
};

export const cellNumberValidator = (value: any) => {
    let msg = validation.Cell.message;

    if (value) {
        if (
            value?.length >= validation.Cell.length &&
            validation.Cell.regex.test(value)
        ) {
            msg = '';
        } else {
           msg = msg;
        }
    } else {
        msg = msg;
    }
    
    return msg;
};

export const ntnValidator = (value: any) => {
    let msg = validation.NTN.message;

    if (value) {
        if (
            value?.length >= validation.NTN.length
        ) {
            msg = '';
        } else {
           msg = msg;
        }
    } else {
        msg = msg;
    }
    
    return msg;
};


export const newEmailValidator = (value:any) => {
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    let msg = "";
    if(emailRegex.test(value))
    {
        msg = "";
    }
    else {
        msg = "Please enter a valid email.";
    }
    return msg;
}
export const emailValidator = (value: any) => {
    let msg = validation.Email.message;
    let emailOldRegex = validation.Email.regex;

   // let email_pattern = /r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'/;

    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    const emailValidator = (val: any) => emailRegex.test(val) ? "" : msg;
   // console.log("emailValidator", emailValidator(value),"=========",emailOldRegex.test(value))
    if (value) {
        if (emailValidator(value)){
            msg = '';
        } else {
           msg = msg;
        }
    } else {
        msg = msg;
    }
    
    return '';
};

export const textInputValidator = (value: any) => {
    let msg = validation.MandatoryField.message;

    if (value) {
        if (!_.isEmpty(value)) {
            msg = '';
        } else {
           msg = msg;
        }
    } else {
        msg = msg;
    }
    
    return msg;
};

export const phoneNumberValidator = (value: any) => {
    let msg = validation.Phone.message;

    if (value) {
        if (
            value?.length >= validation.Phone.length &&
            validation.Phone.regex.test(value)
        ) {
            msg = '';
        } else {
           msg = msg;
        }
    } else {
        msg = msg;
    }
    
    return msg;
};

export const dateValidator = (value: any) => {
    let msg = validation.Date.message;
   
    if (!(typeof value == "object" && value)) {
        msg = `date can not be empty`;
    } else {
        msg = "";
    }
    return msg;
};

export const accreditationNoValidator = (value: any) => {
    const accreditationNoRegex = new RegExp(/[A-Z]{3}[\/]?[A-Z]{3}[\/]?\d{3}\b/);
    if(accreditationNoRegex.test(value))
    {
        return "";
    }
    else {
        return "Please enter valid accreditation no:  DPP/[Treatment Abbreviation]/[000]";
    }   
};

function textFieldMapper (Config: any, treatmentTypeData: any, key: string, isDisabled: boolean, FormConfig: any) {
    Object.assign(Config, {
        ...Config,
        data: [],
       value: treatmentTypeData[key] ? treatmentTypeData[key] : '',
       disabled: isDisabled,
       validator:FormConfig[key].validator,
    });
}

function radioGroupFieldMapper (Config: any, treatmentTypeData: any, key: string, isDisabled: boolean) {
    let rabioGroupValue = false;
    if(typeof treatmentTypeData[key] == 'boolean'){
            rabioGroupValue = treatmentTypeData[key]
    }
    Object.assign(Config, {
        ...Config,
        value: rabioGroupValue,
        disabled: isDisabled
    });
}
function dateFieldMapper(Config: any, treatmentTypeData: any, key: string, isDisabled: boolean, purpose: number) {
    let dateValue = '';

    if (treatmentTypeData[key] !== '' && treatmentTypeData[key] !== null) {
        let dateValue = reverseDateFormate(treatmentTypeData[key])
        //   rabioGroupValue = treatmentTypeData[key]
    }

    Object.assign(Config, {
        ...Config,
        //data: [],
        // value: rabioGroupValue,
        disabled: purpose == TreatmentPurpose.AMENDMENT ? true : isDisabled
    });
}
function comboboxFieldMapper(Config: any, treatmentTypeData: any, key: string, isDisabled: boolean, businessDataLabel: string[], agencyBusinessRegistration: any, cities: any) {
    if (businessDataLabel.includes(key)) {
        let obj: any = { label: '', value: '' }

        if (agencyBusinessRegistration) {
            obj = { label: agencyBusinessRegistration[key], value: agencyBusinessRegistration[key] }
        }
        Object.assign(Config, {
            ...Config,
            data: [],
            value: obj,
            disabled: Config?.disabled ? Config?.disabled : isDisabled
        });
    } else if (key == 'city') {
        let cityMapped: any = cities?.map((city: any) => ({ label: city?.cityName, value: city?.cityId }));
        let obj: any = cityMapped.length > 0 ? cityMapped[0] : {}; //{label: treatmentTypeData[key], value: treatmentTypeData?.cityId};

        if (treatmentTypeData[key] !== null) {
            obj = { label: treatmentTypeData[key], value: treatmentTypeData?.cityId };
        } else if (cityMapped?.length === 0) {
            obj = { label: 'Karachi', value: 1 };

        } else {
            obj = cityMapped.length > 0 ? cityMapped[0] : {}
        }

        // console.log({obj,treatmentTypeData})
        Object.assign(Config, {
            ...Config,
            data: cityMapped,
            value: {},//obj, // TODO: create new idea for data mapping
            disabled: isDisabled
        });
    }
}
function gridFieldMapper(Config: any, isDisabled: boolean) {
    let _formFields: any = Config?.formFields;
    if (Config?.formFields) {
        Object.keys(Config?.formFields).map((fieldKey: any) => {
            let field: any = { ...Config?.formFields[fieldKey], disabled: isDisabled };
            _formFields = { ..._formFields, [fieldKey]: field }
        })
    }
    Object.assign(Config, {
        ...Config,
        formFields: _formFields,
        //data: [],
        //value: { label: treatmentTypeData[key], value: treatmentTypeData[key] },
        disabled: isDisabled
    });
}
function maskedFieldMapper(Config: any, key: string, isDisabled: boolean, FormConfig: any) {
    Object.assign(Config, {
        ...Config,
        disabled: isDisabled,
        validator: FormConfig[key].validator
        //enabling modification on amendment
        //disabled: purpose==TreatmentPurpose.AMENDMENT ? true: isDisabled,
    });
}
function defaultFieldMapper(Config: any, treatmentTypeData: any, key: string, isDisabled: boolean) {
    Object.assign(Config, {
        ...Config,
        //data: [],
        value: { label: treatmentTypeData[key], value: treatmentTypeData[key] },
        disabled: isDisabled
    });
}

export const treatmentTypeCreateEditConfigDataMapper = (treatmentTypeData:any, agencyBusinessRegistration: any, FormConfig: any, cities?:any)=>{
    let _formConfig: any =  JSON.parse(JSON.stringify(FormConfig));
   // console.log(" on change treatmentEditDataMapper", _formConfig)
    
    let mappingKeys = Object.keys(_formConfig).map(item=>item);
    let businessDataLabel = ['ntn','companyName', 'businessName'];
    let otherThanBusinessDataLabel = ['city'];
    let isDisabled = treatmentTypeData?.treatmentTypeRegistrationStatusId  === TreatmentTypeRegistrationStatus.ACTIVATED ? true : false;
    let purpose=FormConfig.purpose.action;

    if (window.location.pathname.includes(Paths.Registration.Renewal)
    ) {
        isDisabled = true;//treatmentTypeData?.treatmentTypeRegistrationStatusId  === TreatmentTypeRegistrationStatus.ACTIVATED ? true : false;
    } else if (window.location.pathname.includes(Paths.Registration.Amendment)) {
        isDisabled = false;//treatmentTypeData?.treatmentTypeRegistrationStatusId  === TreatmentTypeRegistrationStatus.ACTIVATED ? true : false;
    } else {
        isDisabled = treatmentTypeData?.treatmentTypeRegistrationStatusId  === TreatmentTypeRegistrationStatus.ACTIVATED ? true : false;
    };


    mappingKeys.map((key:any)=>{
            let Config:any = _formConfig[key];

            if(Config?.controlType == FieldControlTypes.TEXT){
                textFieldMapper(Config, treatmentTypeData, key, isDisabled, FormConfig)
            }else if(Config?.controlType == FieldControlTypes.RADIOGROUP){
                radioGroupFieldMapper(Config, treatmentTypeData, key, isDisabled)
            }else if(Config?.controlType == FieldControlTypes.DATE){
                dateFieldMapper(Config, treatmentTypeData, key, isDisabled, purpose)
            }else if(Config?.controlType == FieldControlTypes.COMBOBOX){
                comboboxFieldMapper(Config, treatmentTypeData, key, isDisabled, businessDataLabel, agencyBusinessRegistration, cities)
            }else if (Config?.controlType == FieldControlTypes.GRID) {
                gridFieldMapper(Config, isDisabled)
            }else if(Config?.controlType === FieldControlTypes.MASKED){
                maskedFieldMapper(Config, key, isDisabled, FormConfig)
            }else {
                defaultFieldMapper(Config, treatmentTypeData, key, isDisabled)
            }

            _formConfig[key] = Config;

        });


     //let list = {...treatmentTypesFormConfig, ...{[treatmentTypeData?.name]: _formConfig}}

   return _formConfig;

};

function getStringOrDefault (val: string) {
    if (val) return val;

    return ""
}

export const saveFormReqDataMapper = (formData: any, data: any, providerData:any) => {
    if(!formData || !data || !providerData) return {}

    const { treatmentProviderId, agencyBusinessRegistration, treatmentTypes } = providerData; //treatmentProvider data

    const {
        treatmentProviderUserRoleId,
        principalActivity,
        companyName,
        businessName,
        ntn
    } = agencyBusinessRegistration;
    const {
        documentTypeCode,
        treatmentTypeRegistrationId,
        treatmentTypeId,
        name,
    } = data;
    const {
        cellNumber,
        city,
        emailAddress,
        officeAddress,
        plantAddress,
        productionUnitCode,
        validUpto,
        ispmMark,
        treatmentSubTypes,
        treatmentOperatorInfo,
        treatmentTypeAttachments,
        packHouse
    } = formData;

    //let _isSubType = treatmentSubTypes.length > 0 ? true : false;
    let _isSubType = name == TreatmentType.Fumigation ? true : false;

    let req = {
        treatmentProviderId: treatmentProviderId,
        agencyBusinessRegistration: {
            ...agencyBusinessRegistration,
            agencyId: Agency.DPP,
            registrationTypeCode: DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE
        },
        treatmentTypeInformation: {
            ...formData,
            //...data,
            cityId: city && Object.keys(city).length > 0 ? city?.value : 0,
            city: city && Object.keys(city).length > 0 ? city?.label : "",
            productionUnitCode: getStringOrDefault(productionUnitCode),
            cellNumber: getStringOrDefault(cellNumber),
            emailAddress: getStringOrDefault(emailAddress),
            plantAddress: getStringOrDefault(plantAddress),
            officeAddress: getStringOrDefault(officeAddress),
            validUpto: validUpto ? moment(validUpto).format("YYYY-MM-DD") : "",
            ispmMark: getStringOrDefault(ispmMark),
            packHouse: packHouse ? packHouse : false,
            treatmentOperatorInfo: treatmentOperatorInfo?.length>0 ? JSON.stringify(treatmentOperatorInfo) : '',//"YourTreatmentOperatorInfoValue",
            treatmentTypeRegistrationId: treatmentTypeRegistrationId,
            treatmentTypeId: treatmentTypeId,
            name: name,
            documentTypeCode: documentTypeCode,
            isSubType: _isSubType,
            isSaveCompleted: false,
            treatmentProviderUserRoleId: treatmentProviderUserRoleId,
            companyName: companyName,
            businessName: businessName,
            ntn: ntn,
            principalActivity: principalActivity,
            treatmentTypeAttachments: treatmentTypeAttachments ? treatmentTypeAttachments : [],
            // .map((attachment:any) => ({
            //     ...attachment,
            //     fileIdS: attachment?.fileNestFileId
            // })),
            treatmentSubTypes: _isSubType && name == TreatmentType.Fumigation? treatmentSubTypes : [],
        }
    };
    
    return req;
};
