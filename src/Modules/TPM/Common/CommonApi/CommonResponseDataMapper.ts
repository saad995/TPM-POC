import { FieldControlTypes } from "Elements/Custom/FormGenerator/FormGeneratorInterface";
import { FormConfig } from "Modules/TPM/TPMDashboard/Registration/CreateEditTPMRegistration/RegistrationDetails/FormConfig";

export const treatmentTypeFormDataMapping = (data:any)=>{
    let _formConfig: any =  JSON.parse(JSON.stringify(FormConfig));
    let businessDataLabel:any = ['ntn','companyName', 'businessName'];
    let mappingKeys:any = Object.keys(_formConfig).map((item: any)=>item);
    let otherThanBusinessDataLabel = ['city'];

let formData = {};
if(data && Object.keys(data).length > 0){
    const {agencyBusinessRegistration, treatmentTypes} = data;

    let busniessTreatmentMappedObj = {};
    businessDataLabel.map((businessFieldKey:any)=>{
        let formFieldObj = _formConfig[businessFieldKey];

        switch (formFieldObj?.controlType) {
            case FieldControlTypes.TEXT: {
                busniessTreatmentMappedObj = {...busniessTreatmentMappedObj, [businessFieldKey]: agencyBusinessRegistration[businessFieldKey]}
            }
            break;
            case FieldControlTypes.COMBOBOX: {
                let val = { label: agencyBusinessRegistration[businessFieldKey], value: agencyBusinessRegistration[businessFieldKey] }
                busniessTreatmentMappedObj = {...busniessTreatmentMappedObj, [businessFieldKey]: val}
            }
            break;
            default:
                busniessTreatmentMappedObj = {...busniessTreatmentMappedObj, [businessFieldKey]: agencyBusinessRegistration[businessFieldKey]}
                break;
        }

    });

    //treatmentTypes.filter((item:any)=>item.isSaveCompleted).map((treatmenttype:any)=>{
    treatmentTypes.map((treatmenttype:any)=>{

        let treatmentMappedObj = {};

        mappingKeys.map((formFieldKey: any)=>{
            let formFieldObj = _formConfig[formFieldKey];

            switch (formFieldObj?.controlType) {
                case FieldControlTypes.TEXT: {
                    let val = treatmenttype[formFieldKey] ? treatmenttype[formFieldKey] : '';
                    treatmentMappedObj = {...treatmentMappedObj, [formFieldKey]: val}
                }
                break;
                case FieldControlTypes.COMBOBOX: {
                    if(otherThanBusinessDataLabel.includes(formFieldKey)){
                        let val = formFieldObj?.value;

                        if(treatmenttype?.cityId){
                        val = { label: treatmenttype[formFieldKey], value: treatmenttype?.cityId }
                        }else{
                         val = { label: '', value: treatmenttype?.cityId }
                        }

                        treatmentMappedObj = {...treatmentMappedObj, [formFieldKey]: val}
                    }
                    // else{
                    //     debugger
                    //     let val = { label: formFieldKey, value: treatmenttype[formFieldKey] }
                    //     treatmentMappedObj = {...treatmentMappedObj, [formFieldKey]: val}
                    // }
                }
                break;
                case FieldControlTypes.DATE:
                case FieldControlTypes.CALENDER: {
                    let val = treatmenttype[formFieldKey];
                    let dat:any = '';
                    if(val){
                        let splitVal = val.split('-');
                        let joinSplit = splitVal[2] +"-"+ splitVal[1] +"-"+ splitVal[0];
                         dat = new Date(joinSplit);
                    }
                    treatmentMappedObj = { ...treatmentMappedObj, [formFieldKey]:  dat};
                }
                break;
                case FieldControlTypes.GROUPCHECKBOX: {
                    treatmentMappedObj = { ...treatmentMappedObj, [formFieldKey]:  formFieldObj?.data};
                }
                break;
                case FieldControlTypes.RADIOGROUP: {
                    let radioValue:any = treatmenttype[formFieldKey] ? treatmenttype[formFieldKey] : formFieldObj?.value;
                    treatmentMappedObj = { ...treatmentMappedObj, [formFieldKey]:  radioValue};
                }
                break;
                case FieldControlTypes.GRID: {
                    let tplicenseLicense:any = treatmenttype[formFieldKey] ? JSON.parse(treatmenttype[formFieldKey]): [];
                    treatmentMappedObj = { ...treatmentMappedObj, [formFieldKey]:  tplicenseLicense};
                }
                break;
                default:
                    treatmentMappedObj = {...treatmentMappedObj, [formFieldKey]: treatmenttype[formFieldKey]}
                    break;
            }
        })
        
        formData = {...formData, [treatmenttype?.name]: {...treatmentMappedObj, ...busniessTreatmentMappedObj}}

    });


}

return formData;
}