import { TextArea } from "@progress/kendo-react-inputs";
import "./TreatmentInformationForm.scss";
// import '../InitiateTreatmentRequest.scss';
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormComboBox, FormDatePicker, FormDropDown, FormInput, FormInputWithList, FormNumericTextBoxWithAdditionalComponent, FormTextArea } from "Elements/Basic/FormComponent/FormComponent";
import { conductedType, defaultTemperatureData, defaultTimeData, durationData, temperatureData, treatmentProviderOptions, treatmentTypes } from "Modules/Common/CommonUtility";
import { LegacyRef, useEffect, useState } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import _ from "lodash";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import { getTreatmentSubTypesListData } from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestAction";
import Radio from "Elements/Basic/Radio/Radio";
import { Label } from "@progress/kendo-react-labels";
interface Iprops {
    data: any;
    getTreatmentTypesBaseOnTreatmentProvider: any;
    getTPCertificateFetchSaveData: any;
    setSaveInfoData: any;
    setDurationType: any;
    setTemperatureType: any;
    getConsignmentMode: any;
    getContainerType: any;
    getConductionTreatment: any;
    getTargetTreatment: any;
    getTreatmentTypeData: any;
    onSubmitTreatmentInfoForm: any;
    isTargetOfFumigationConform: any;
    setIsTargetOfFumigationConform: any;
    targetOfFumigationConform: any;
    setTargetOfFumigationConform: any;
    formRef?: LegacyRef<Form> | any;
    isLoading: Boolean;
    error:any,
    setError:any;
}
export default function TreatmentInformationForm({ getTreatmentTypesBaseOnTreatmentProvider, isTargetOfFumigationConform, setIsTargetOfFumigationConform, targetOfFumigationConform, setTargetOfFumigationConform, data, getTPCertificateFetchSaveData, setSaveInfoData, setDurationType, setTemperatureType, getConsignmentMode, getContainerType, getConductionTreatment, getTargetTreatment, getTreatmentTypeData, onSubmitTreatmentInfoForm, formRef, isLoading,  error, setError }: Iprops) {
    const dispatch = useDispatch();
    /**
     * * redux states
     */
    // *Get treatment sub types  Data From Store
    const getTreatmentSubTypes: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.subTreatmentTypes);/**
    // ! End of redux states  /**
     * * Rejection Information States Form
     */
    const [addtionalDeclaration, setAddtionalDeclaration] = useState("");
    const [treatmentType, setTreatmentType] = useState<any>({});
    const [treatmentSubType, setTreatmentSubType] = useState<any>({});
    const [targetTreatment, setTargetTreatment] = useState("");
    const [chemical, setChemical] = useState("");
    const [totalFumigationAppliedQty, setTotalFumigationAppliedQty] = useState("");
    const [concentration, setConcentration] = useState("");
    const [dateOfTreatment, setDateOfTreatment] = useState("");
    const [placeOfTreatment, setPlaceOfTreatment] = useState(null);
    const [doseRate, setDoseRate] = useState("");
    const [prescribedDose, setPrescribedDose] = useState("");
    const [ventilation, setVentilation] = useState("");
    const [treatmentConducted, setTreatmentConducted] = useState<any>({});
    const [consignmentMode, setConsignmentMode] = useState("");
    const [expectedPeriodDuration, setExpectedPeriodDuration] = useState("");
    const [expectedPeriodDurationType, setExpectedPeriodDurationType] = useState<any>({ name: "Hours", id: 1 });
    const [temperature, setTemperature] = useState("");
    const [temperatureType, setTemperatureTypeD] = useState<any>(defaultTemperatureData);
    const [containerType, setContainerType] = useState({ name: "", id: 1 });
    const [componentTreatmentSubType, setComponentTreatmentSubType] = useState<any>([]);
    const [isMethlyBromide, setIsMethlyBromide] = useState<boolean>(false);
    const [additionalTreatmentInformation,setAdditionalTreatmentInformation] = useState("");
  

    useEffect(() => {


        if (_.isEmpty(getTPCertificateFetchSaveData) && getTPCertificateFetchSaveData == null) {
            const getTreatmentType = getTreatmentTypesBaseOnTreatmentProvider?.filter((treatment: any) => treatment.id == data?.treatmentTypeID)[0];
            const getTreatmentSubType = getTreatmentType?.treatmentSubTypes.filter((subTypes:any)=>subTypes.id == data?.treatmentSubTypeID)[0];
            formRef.current?.valueSetter("treatmentSubType", getTreatmentSubType);
        }
        if (!_.isEmpty(getTPCertificateFetchSaveData) && getTPCertificateFetchSaveData != null) {
            // * new way to  set fields inside forms
            if (treatmentType.id == 7) {
                const getTreatmentType = getTreatmentTypesBaseOnTreatmentProvider?.filter((treatment: any) => treatment.id == data?.treatmentTypeID)[0];
                const getTreatmentSubType = getTreatmentType?.treatmentSubTypes.filter((subTypes:any)=>subTypes.id == data?.treatmentSubTypeID)[0];
                formRef.current?.valueSetter("treatmentSubType", getTreatmentSubType);
            }
            if(getTPCertificateFetchSaveData?.isTargetFumigationConfirmed){
                setTargetOfFumigationConform('Yes')
                setIsTargetOfFumigationConform(false);
            }else {
                setTargetOfFumigationConform('No')

            }
            // formRef.current?.valueSetter("treatmentType", getTreatmentTypeData.filter((treatment: any) => treatment.id == data?.treatmentTypeID)[0]);
            formRef.current?.valueSetter("targetTreatment", getTargetTreatment.filter((targetTreatment: any) => targetTreatment.id == getTPCertificateFetchSaveData?.targetID)[0]);
            formRef.current?.valueSetter("chemical", getTPCertificateFetchSaveData?.chemical);
            formRef.current?.valueSetter("placeOfTreatment", data?.placeOfTreatment);
            if (treatmentType.id == treatmentTypes.FUMIGATION || getTPCertificateFetchSaveData?.totalFumigationAppliedQty) {
            formRef.current?.valueSetter("totalFumigationAppliedQty", getTPCertificateFetchSaveData?.totalFumigationAppliedQty);
            }
            formRef.current?.valueSetter("concentration", getTPCertificateFetchSaveData?.concentration);
            formRef.current?.valueSetter("dateOfTreatment", new Date(data?.dateOfTreatment));
            formRef.current?.valueSetter("doseRate", getTPCertificateFetchSaveData?.appliedDoseRate);
            setDoseRate(getTPCertificateFetchSaveData?.appliedDoseRate);
            formRef.current?.valueSetter("prescribedDose", getTPCertificateFetchSaveData?.prescribedDose);
            formRef.current?.valueSetter("ventilation", getTPCertificateFetchSaveData?.ventilation);
            formRef.current?.valueSetter("expectedPeriodDuration", getTPCertificateFetchSaveData?.exposedDuration?.split(" ")[0]);
            setExpectedPeriodDuration(getTPCertificateFetchSaveData?.exposedDuration?.split(" ")[0]);
            setExpectedPeriodDurationType({ id: durationData.find((time: any) => time.name == getTPCertificateFetchSaveData?.exposedDuration?.split(" ")[1])?.id, name: getTPCertificateFetchSaveData?.exposedDuration?.split(" ")[1] })
            formRef.current?.valueSetter("temperature", getTPCertificateFetchSaveData?.temperature?.split(" ")[0]);
            setTemperatureTypeD({ id: temperatureData.find((time: any) => time.name == getTPCertificateFetchSaveData?.temperature?.split(" ")[1])?.id, name: getTPCertificateFetchSaveData?.temperature?.split(" ")[1] });
            formRef.current?.valueSetter("treatmentConducted", getConductionTreatment?.filter((treatment: any) => treatment?.id == getTPCertificateFetchSaveData?.conductionTypeID)[0]);
            formRef.current?.valueSetter("containerType", getContainerType?.filter((treatment: any) => treatment?.containerTypeId == getTPCertificateFetchSaveData?.containerTypeID)[0]);
            setContainerType(getContainerType?.filter((treatment: any) => treatment?.containerTypeId == getTPCertificateFetchSaveData?.containerTypeID)[0]);
            formRef.current?.valueSetter("consignmentMode", getConsignmentMode?.filter((treatment: any) => treatment?.cargoId == getTPCertificateFetchSaveData?.consignmentModeID)[0]);
            formRef.current?.valueSetter("addtionalDeclaration", getTPCertificateFetchSaveData?.additionalDeclaration);
            formRef.current?.valueSetter(
                "additionalTreatmentInformation",
                getTPCertificateFetchSaveData?.additionalTreatmentInfo
            );
            setAdditionalTreatmentInformation(getTPCertificateFetchSaveData?.additionalTreatmentInfo);
            // ! end of new ways
            // 
            // setTreatmentType(getTreatmentTypeData.filter((treatment: any) => treatment.id == data?.treatmentTypeID)[0]); // * done
            // setTargetTreatment(getTargetTreatment.filter((targetTreatment: any) => targetTreatment.id == getTPCertificateFetchSaveData?.targetID)[0]); // * done
            // setChemical(getTPCertificateFetchSaveData?.chemical)
            // setPlaceOfTreatment(data?.placeOfTreatment)
            // setConcentration(getTPCertificateFetchSaveData?.concentration)
            // setDateOfTreatment(new Date(getTPCertificateFetchSaveData?.certIssueDate));
            // setPlaceOfTreatment(getTPCertificateFetchSaveData?.certIssueDate); // ! missing
            // setDoseRate(getTPCertificateFetchSaveData?.appliedDoseRate);
            // setExpectedPeriodDuration(getTPCertificateFetchSaveData?.exposedDuration?.split(" ")[0]);
            // setTemperature(getTPCertificateFetchSaveData?.temperature?.split(" ")[0]);
            // setTreatmentConducted(getConductionTreatment?.filter((treatment: any) => treatment?.id == getTPCertificateFetchSaveData?.conductionTypeID)[0]);



            // setTemperatureType(temperatureData?.filter((tempature:any)=>tempature.name == getTPCertificateFetchSaveData?.temperature?.split(" ")[1]))
            // setExpectedPeriodDurationType(durationData?.filter((duration:any)=> duration.name == getTPCertificateFetchSaveData?.exposedDuration?.split(" ")[1]));
            // setContainerType(getContainerType?.filter((treatment: any) => treatment?.containerTypeId == getTPCertificateFetchSaveData?.containerTypeID)[0]);
            // setConsignmentMode(getConsignmentMode?.filter((treatment: any) => treatment?.cargoId == getTPCertificateFetchSaveData?.consignmentModeID)[0]);
            // setAddtionalDeclaration(getTPCertificateFetchSaveData?.additionalDeclaration);


        }
    }, [getTPCertificateFetchSaveData, getContainerType, getConsignmentMode, getTreatmentSubTypes])
    useEffect(() => {
        setTemperatureType(temperatureType?.name)
    }, [temperatureType])
    useEffect(() => {
        setDurationType(expectedPeriodDurationType?.name)
    }, [expectedPeriodDurationType])


    useEffect(() => {
        if (treatmentSubType?.id == 1) {
            setIsMethlyBromide(true);
        } else {
            if(totalFumigationAppliedQty){
                formRef.current?.valueSetter("totalFumigationAppliedQty", "");
                setTotalFumigationAppliedQty("");
            }
            setIsMethlyBromide(false);
        }
    }, [treatmentSubType]);

    useEffect(() => {
        // * new changes
        // * added treatment sub types on the base of treatment type
        // formRef.current?.valueSetter("treatmentSubType",{});
        if(treatmentType?.id != undefined && treatmentType?.id != data?.treatmentTypeID){
                setTargetOfFumigationConform('');
                formRef.current?.valueSetter("ventilation","");
                formRef.current?.valueSetter("prescribedDose", "");
        }
        if(!_.isEmpty(treatmentType)){
            if(treatmentType?.isSubTypeExists){
                // setTargetOfFumigationConform('');
                setComponentTreatmentSubType(treatmentType?.treatmentSubTypes)
            }  else {
                    formRef.current?.valueSetter("treatmentSubType",{});
                    setComponentTreatmentSubType([]) 
                }
            }
        // ! end of added treatment sub types on the base of treatment type
        // ! end of new changes
    }, [treatmentType]);


    useEffect(() => {
        const getTreatmentType = getTreatmentTypesBaseOnTreatmentProvider?.filter((treatment: any) => treatment.id == data?.treatmentTypeID)[0];
        const getTreatmentSubType = getTreatmentType?.treatmentSubTypes?.filter((subTypes:any)=>subTypes.id == data?.treatmentSubTypeID)[0];
        formRef.current?.valueSetter("treatmentType", getTreatmentType);
        console.log(componentTreatmentSubType);
        formRef.current?.valueSetter("treatmentSubType", getTreatmentSubType);
        formRef.current?.valueSetter("dateOfTreatment", new Date(data?.dateOfTreatment));
        formRef.current?.valueSetter("placeOfTreatment", data?.placeOfTreatment);
        formRef.current?.valueSetter("additionalTreatmentInformation", data?.additionalTreatmentInfo);
        setAdditionalTreatmentInformation(data?.additionalTreatmentInfo);
        // formRef.current?.valueSetter("treatmentSubType", getTreatmentSubTypes.filter((treatment: any) => treatment.id == data?.treatmentSubTypeID)[0]);

    }, [data])

    useEffect(() => {
        const saveObj: any = {};
        saveObj.addtionalDeclaration = addtionalDeclaration;
        saveObj.additionalTreatmentInformation = additionalTreatmentInformation;
        saveObj.treatmentType = treatmentType;
        saveObj.targetTreatment = targetTreatment;
        saveObj.chemical = chemical;
        saveObj.concentration = concentration;
        saveObj.dateOfTreatment = dateOfTreatment;
        saveObj.placeOfTreatment = placeOfTreatment;
        saveObj.doseRate = doseRate;
        saveObj.treatmentConducted = treatmentConducted;
        saveObj.consignmentMode = consignmentMode;
        saveObj.expectedPeriodDuration = expectedPeriodDuration;
        saveObj.temperature = temperature;
        saveObj.ventilation = ventilation;
        saveObj.prescribedDose = prescribedDose;
        saveObj.containerType = containerType;
        saveObj.treatmentSubType = treatmentSubType;
        saveObj.totalFumigationAppliedQty = totalFumigationAppliedQty;
        saveObj.targetOfFumigationConform = targetOfFumigationConform;
        setSaveInfoData(saveObj);
    }, [addtionalDeclaration, treatmentType, targetTreatment, chemical, concentration, dateOfTreatment, placeOfTreatment, doseRate, treatmentConducted, consignmentMode, expectedPeriodDuration, temperature, containerType, treatmentSubType, totalFumigationAppliedQty,prescribedDose,ventilation,targetOfFumigationConform])
    /**
     * ! End of Treatment Information States Form
     */
    /**
     * * A general validator function
     */
    const validator = (setter: Function) => (value: string) => {

        let msg = "Field is required";
        if (!value) {
            return msg;
        } else {
            setter(value);
            msg = "";
        }
        return msg;
    };
    const validatorForNumberField = (setter: Function) => (value: string) => {

        let msg = "Please enter valid number";
        let regex = /^(?:[0-9]{1,10})$/;
        // let nameLength = value.replace(/\s/g, "").length;
        if ((value?.length > 10)) {
            return msg = "Invalid input. Only 10-digit numbers are allowed.";
        }
        if (value?.length == 0) {
            setter("");
            return msg;
        }
        if (
            regex.test(value)
        ) {
            msg = "";
            setter(value);
        }
        return msg;
    };
    const validatorForNumberFieldWithDecimalAcceptance = (setter: Function) => (value: string) => {

        let msg = "";
        let regex = /^(?:[0-9]{1,10}(?:\.\d{1,5})?)$/;
      
        // let nameLength = value.replace(/\s/g, "").length;
      
       if (value?.length > 10) {
           return (msg = "Invalid input. Only 10-digit numbers are allowed.");
       }
        if (value?.length == 0) {
            setter("");
            return msg;
        }
        if (regex.test(value)) {
            msg = "";
            setter(value);
        }
        return msg;
    };
    const validatorForTemperatureField = (setter: Function) => (value: string) => {

        let msg = "";
        let regex = /^(?:-?[0-9]{1,10}(?:\.\d{1,5})?)$/;
        // let nameLength = value.replace(/\s/g, "").length;
        if ((value?.length > 10)) {
            return;
        }
       
        if (!value && value?.length == 0) {
            setter("");
            msg = "Please enter valid number"
            return msg;
        }
        if (
            regex.test(value)
        ) {
            msg = "";
            setter(value);
        }
        return msg;
    };
    const validatorForNumberFieldAppliedQuantity = (setter: Function) => (value: string) => {

        let msg = "";
        // let regex = /^(?:[0-9]{1,100})$/;
        let regex = /^(?:[0-9]{1,100}(?:\.[0-9]{1,2})?)$/
        // let nameLength = value.replace(/\s/g, "").length;
        if ((value?.length > 100)) {
            return msg = "Invalid input. Only 100-digit numbers are allowed.";
        }
        if (value?.length == 0) {
            setter("");
            return msg;
        }
        if (
            regex.test(value)
        ) {
            msg = "";
            setter(value);
        }
        return msg;
    };
    const validatorTextFeild = (setter: Function) => (value: string) => {
        let msg = "Field is required";
        if (value?.length == 0) {
            setter("");
            return msg;
        }
        if (!value) {
            return msg;
        } else {
            setter(value);
            msg = "";
        }
        return msg;
    }
    const optionalTextFeild = (setter: Function) => (value: string) => {
        let regex = /^.{0,10}$/;
        if (
            regex.test(value)
        ) {
            setter(value);
        }
        return '';
    }

    // ! End of validators

    // * Filters for fields
    const onFilterTreatmentSubType = (event: any) => {
        const filter: string = event.filter.value;
        console.log('filter: ', filter);
        console.log('componentTreatmentSubType: ', componentTreatmentSubType);

        if (filter) {
            const filteredData = componentTreatmentSubType?.filter(
                (treatment: any) => treatment?.name.toString()
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            );
            if (filteredData.length > 0) {
                setComponentTreatmentSubType(filteredData);
            }
        } else {
            setComponentTreatmentSubType(getTreatmentSubTypes);
        }
    };
    // ! End of filters for fields
    const onHandleTypeOfAction = (event: any) => {
        setTargetOfFumigationConform(event);
    }



    /* On Change */
    const onChange = (event:any,setter:any=() => {},name:string="") => {
        const value = event.value;

       if(value.length <= 10)
       {
        formRef.current._values[name] = value;
        setter(value);
    }

  
    }

    /* On Blur */
    const onBlur = (name:string,value:any,errorName:string) => {
        if(Number(value) < 0)
        {
             setError((prevState:any) => ({
                 ...prevState,
                 [errorName]: `${name} cannot be less than 0.`
             }));
        }
        else {
             setError((prevState:any) => ({
                 ...prevState,
                 [errorName]: ""
             }));
        }
    }

    return (
        <div className="form-group">
            <Form
                ref={formRef}
                onSubmit={onSubmitTreatmentInfoForm}
                render={(formRenderProps) => (
                    <FormElement>
                        <fieldset className={"k-form-fieldset p-2"}>
                            <Row className="pt-2" xs="1" sm="4">
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_treatment_type_field}
                                        component={FormComboBox}
                                        label={resources_EN.treatment_provider_treatment_type_label}
                                        loading={isLoading}
                                        placeholder={resources_EN.treatment_provider_treatment_type_placeholder}
                                        validator={validator(setTreatmentType)}
                                        labelClass={"pb-2"}
                                        className="custom-dropdown"
                                        data={getTreatmentTypesBaseOnTreatmentProvider}
                                        textField="name"
                                        dataItemKey="id"
                                    />
                                </Col>
                                {componentTreatmentSubType.length > 0 && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            id="treatmentSubType"
                                            name="treatmentSubType"
                                            component={FormComboBox}
                                            label={resources_EN.treatment_provider_treatment_sub_type_label}
                                            loading={isLoading}
                                            placeholder={resources_EN.treatment_provider_treatment_sub_type_placeholder}
                                            validator={validator(setTreatmentSubType)}
                                            labelClass={"pb-2"}
                                            disabled={!(componentTreatmentSubType.length > 0) || isLoading}
                                            data={componentTreatmentSubType}
                                            className="custom-dropdown"
                                            textField="name"
                                            dataItemKey="id"
                                            onFilterChange={onFilterTreatmentSubType}
                                            filterable={true}
                                        />
                                    </Col>
                                )}
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_target_treatment_field}
                                        component={FormComboBox}
                                        label={
                                            treatmentType.id == treatmentTypes.FUMIGATION
                                                ? resources_EN.treatment_provider_tc_fumigation_target_treatment_label
                                                : resources_EN.treatment_provider_target_treatment_label
                                        }
                                        loading={isLoading}
                                        placeholder={resources_EN.treatment_provider_target_treatment_placeholder}
                                        validator={validator(setTargetTreatment)}
                                        labelClass={"pb-2"}
                                        // data={getTreatmentTypeData}
                                        data={getTargetTreatment}
                                        textField="name"
                                        dataItemKey="id"
                                        className="custom-dropdown"
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="chemical"
                                        placeholder={resources_EN.treatment_provider_chemical_placeholder}
                                        value={chemical}
                                        maxlength={500}
                                        name={resources_EN.treatment_provider_chemical_field}
                                        component={FormInput}
                                        labelClass={"pb-2"}
                                        // onChange={(event:any)=>setChemical(event.target.value)}
                                        label={resources_EN.treatment_provider_chemical_label}
                                        validator={validatorTextFeild(setChemical)}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="concentration"
                                        value={concentration}
                                        maxlength={10}
                                        placeholder={resources_EN.treatment_provider_concentration_placeholder}
                                        name={resources_EN.treatment_provider_concentration_field}
                                        component={FormInput}
                                        labelClass={"pb-2"}
                                        label={resources_EN.treatment_provider_concentration_label}
                                        validator={validatorTextFeild(setConcentration)}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="date-picker"
                                        // max={today}
                                        // min={new Date()}
                                        value={dateOfTreatment}
                                        format={"dd-MM-yyyy"}
                                        // defaultValue={new Date()}
                                        // value={tentativeDateOfTreatment}
                                        name={resources_EN.treatment_provider_date_of_treatment_field}
                                        component={FormDatePicker}
                                        label={
                                            treatmentType.id == treatmentTypes.FUMIGATION
                                                ? resources_EN.treatment_provider_tt_fumigation_date_of_treatment_label
                                                : resources_EN.treatment_provider_date_of_treatment_label
                                        }
                                        validator={validator(setDateOfTreatment)}
                                        labelClass={"pb-2 font-normal"}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="placeOfTreatment"
                                        maxlength={100}
                                        value={placeOfTreatment}
                                        label={
                                            treatmentType.id == treatmentTypes.FUMIGATION
                                                ? resources_EN.treatment_provider_tc_submit_place_of_treatment_label
                                                : resources_EN.treatment_provider_place_of_treatment_label
                                        }
                                        placeholder={resources_EN.treatment_provider_place_of_treatment_placeholder}
                                        name={resources_EN.treatment_provider_place_of_treatment_field}
                                        component={FormInput}
                                        labelClass={"pb-2"}
                                        validator={validatorTextFeild(setPlaceOfTreatment)}
                                    />
                                </Col>
                                {treatmentType.id == treatmentTypes.FUMIGATION && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            id="prescribedDose"
                                            value={prescribedDose}
                                            maxlength={10}
                                            placeholder={resources_EN.treatment_provider_dose_rate_placeholder}
                                            name={resources_EN.treatment_provider_prescribed_dose_field}
                                            component={FormInput}
                                            customLabel={true}
                                            type="number"
                                            labelClass={"pb-2"}
                                            // label={resources_EN.treatment_provider_tc_fumigation_dose_rate_label}
                                            label={`<span>${resources_EN.treatment_provider_tc_fumigation_dose_rate_label}<sup>3</sup>)</span>`}
                                            validator={validatorForNumberFieldWithDecimalAcceptance(setPrescribedDose)}
                                        />
                                    </Col>
                                )}
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="doseRate"
                                        value={doseRate}
                                        maxLength={10}
                                        placeholder={resources_EN.treatment_provider_dose_rate_placeholder}
                                        name={resources_EN.treatment_provider_dose_rate_field}
                                        component={FormInput}
                                        customLabel={true}
                                        type="number"
                                        labelClass={"pb-2"}
                                        label={`<span>${resources_EN.treatment_provider_dose_rate_label}<sup>3</sup>)</span>`}
                                        // validator={validatorForNumberFieldWithDecimalAcceptance(setDoseRate)}
                                        onChange={(event: any) => onChange(event, setDoseRate, "doseRate")}
                                        onBlur={() => onBlur("Applied Dose Rate", doseRate, "doseRateError")}
                                    />
                                    <Label className="mt-1" style={{ color: "red" }}>
                                        {error?.doseRateError}
                                    </Label>
                                </Col>
                                {componentTreatmentSubType.length > 0 && isMethlyBromide && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            id="totalFumigationAppliedQty"
                                            placeholder={resources_EN.treatment_provider_fumigation_placeholder}
                                            value={totalFumigationAppliedQty}
                                            maxlength={100}
                                            type="number"
                                            name={resources_EN.treatment_provider_fumigation_field}
                                            component={FormInput}
                                            labelClass={"pb-2"}
                                            label={resources_EN.treatment_provider_fumigation_placeholder}
                                            validator={validatorForNumberFieldWithDecimalAcceptance(
                                                setTotalFumigationAppliedQty
                                            )}
                                        />
                                    </Col>
                                )}
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_expected_Period_duration_field}
                                        value={expectedPeriodDuration}
                                        type="number"
                                        placeholder={
                                            resources_EN.treatment_provider_expected_Period_duration_placeholder
                                        }
                                        maxlength={10}
                                        component={FormInputWithList}
                                        // validator={validatorForNumberFieldWithDecimalAcceptance(
                                        //     setExpectedPeriodDuration
                                        // )}
                                        valueDropdown={expectedPeriodDurationType}
                                        defaultValueDropdown={expectedPeriodDurationType}
                                        iDDropown={"expectedPeriodDurationType"}
                                        dataDropdown={durationData}
                                        label={resources_EN.treatment_provider_tc_submit_expected_Period_duration_label}
                                        data={defaultTimeData}
                                        textField="name"
                                        dataItemKey="id"
                                        labelClass="pb-2"
                                        onChangeDropdown={(event: any) =>
                                            setExpectedPeriodDurationType(event.target.value)
                                        }
                                        onChange={(event: any) =>
                                            onChange(event, setExpectedPeriodDuration, "expectedPeriodDuration")
                                        }
                                        onBlur={() =>
                                            onBlur(
                                                "Expected Period/Duration",
                                                expectedPeriodDuration,
                                                "expectedPeriodError"
                                            )
                                        }
                                    />
                                    <Label className="mt-1" style={{ color: "red" }}>
                                        {error?.expectedPeriodError}
                                    </Label>
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_temperature_field}
                                        value={temperature}
                                        type="number"
                                        placeholder={resources_EN.treatment_provider_temperature_placeholder}
                                        maxlength={10}
                                        component={FormInputWithList}
                                        iDDropdown={"temperatureType"}
                                        validator={validatorForTemperatureField(setTemperature)}
                                        onChangeDropdown={(event: any) => setTemperatureTypeD(event.target.value)}
                                        dataDropdown={temperatureData}
                                        defaultValueDropdown={temperatureType}
                                        label={
                                            treatmentType.id == treatmentTypes.FUMIGATION
                                                ? resources_EN.treatment_provider_tc_fumigation_temperature_label
                                                : resources_EN.treatment_provider_temperature_label
                                        }
                                        data={defaultTemperatureData}
                                        textField="name"
                                        dataItemKey="id"
                                        labelClass="pb-2"
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_treatment_conducted_field}
                                        component={FormComboBox}
                                        label={
                                            treatmentType.id == treatmentTypes.FUMIGATION
                                                ? resources_EN.treatment_provider_tc_fumigation_treatment_conducted_label
                                                : resources_EN.treatment_provider_treatment_conducted_label
                                        }
                                        loading={isLoading}
                                        placeholder={resources_EN.treatment_provider_treatment_conducted_placeholder}
                                        validator={validator(setTreatmentConducted)}
                                        labelClass={"pb-2"}
                                        className="custom-dropdown"
                                        // data={[{ name: "test", id: 2 }]}
                                        data={getConductionTreatment}
                                        textField="name"
                                        dataItemKey="id"
                                    />
                                </Col>
                                {treatmentType.id == treatmentTypes.FUMIGATION && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            id="ventilation"
                                            value={ventilation}
                                            maxlength={10}
                                            placeholder={
                                                treatmentConducted?.id == conductedType.SHEETED_STACK ||
                                                treatmentConducted?.id == conductedType.CHAMBER
                                                    ? resources_EN.treatment_provider_tc_fumigation_ventilation_optional_placeholder
                                                    : resources_EN.treatment_provider_tc_fumigation_ventilation_placeholder
                                            }
                                            name={resources_EN.treatment_provider_ventilation_field}
                                            component={FormInput}
                                            labelClass={"pb-2"}
                                            label={resources_EN.treatment_provider_tc_fumigation_ventilation_label}
                                            validator={
                                                treatmentConducted?.id == conductedType.SHEETED_STACK ||
                                                treatmentConducted?.id == conductedType.CHAMBER
                                                    ? optionalTextFeild(setVentilation)
                                                    : validatorTextFeild(setVentilation)
                                            }
                                        />
                                    </Col>
                                )}
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_container_type_field}
                                        component={FormComboBox}
                                        label={resources_EN.treatment_provider_container_type_label}
                                        loading={isLoading}
                                        placeholder={resources_EN.treatment_provider_container_type_placeholder}
                                        // validator={validator(setContainerType)}
                                        onChange={(event: any) => {
                                            setContainerType(event.target.value);
                                            formRef.current?.valueSetter("containerType", event.target.value);
                                        }} // ! HOT FIXED
                                        value={containerType}
                                        labelClass={"pb-2"}
                                        data={getContainerType}
                                        className="custom-dropdown"
                                        textField="description"
                                        dataItemKey="containerTypeId"
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_consignment_mode_field}
                                        component={FormComboBox}
                                        label={resources_EN.treatment_provider_consignment_mode_label}
                                        loading={isLoading}
                                        placeholder={resources_EN.treatment_provider_consignment_mode_placeholder}
                                        validator={validator(setConsignmentMode)}
                                        labelClass={"pb-2"}
                                        data={getConsignmentMode}
                                        className="custom-dropdown"
                                        textField="cargoName"
                                        dataItemKey="cargoId"
                                    />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                {treatmentType.id == treatmentTypes.FUMIGATION && (
                                    <Col className="pb-2 FormField ">
                                        <span className="sub-row-one">
                                            <span className="label ml-2 mb-1">
                                                Does the target of fumigation conform to the plastic wrapping,
                                                impervious surface, and timber thickness requirements at the time of
                                                fumigation?
                                            </span>
                                            <span className="pl-4">
                                                <Radio
                                                    defaultVal={"Yes"}
                                                    value={targetOfFumigationConform}
                                                    onChangeHandler={(event: any) => onHandleTypeOfAction(event)}
                                                />{" "}
                                                Yes
                                            </span>
                                            <span className="pl-4">
                                                <Radio
                                                    defaultVal={"No"}
                                                    value={targetOfFumigationConform}
                                                    onChangeHandler={(event: any) => onHandleTypeOfAction(event)}
                                                />{" "}
                                                No
                                            </span>
                                        </span>
                                        {isTargetOfFumigationConform && (
                                            <p className="pl-2 text-danger">*Please select</p>
                                        )}
                                    </Col>
                                )}
                            </Row>
                            <Row className="pt-2" xs="1" sm="1">
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_additional_treatment_information_field}
                                        value={additionalTreatmentInformation}
                                        maxlength={1000}
                                        component={FormTextArea}
                                        rows={6}
                                        label={resources_EN.treatment_provider_additional_treatment_information_label}
                                        disabled={true}
                                        // validator={validatorTextFeild(setAdditionalTreatmentInformation)}
                                    />
                                </Col>
                            </Row>
                            <Row className="pt-2" xs="1" sm="1">
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_addtional_declaration_field}
                                        value={addtionalDeclaration}
                                        maxlength={1000}
                                        placeholder={resources_EN.treatment_provider_addtional_declaration_placeholder}
                                        component={FormTextArea}
                                        label={resources_EN.treatment_provider_addtional_declaration_label}
                                        dataItemKey={"label"}
                                        textField={"value"}
                                        rows={6}
                                        autoSize={false}
                                        // value={rejectionReason}
                                        validator={validatorTextFeild(setAddtionalDeclaration)}
                                    />
                                </Col>
                            </Row>
                        </fieldset>
                    </FormElement>
                )}
            />
        </div>
    );
}
