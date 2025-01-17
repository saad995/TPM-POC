// import '../InitiateTreatmentRequest.scss';
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormComboBox, FormDatePicker, FormDropDown, FormInput, FormTextArea } from "Elements/Basic/FormComponent/FormComponent";
import { treatmentProviderOptions, treatmentTypes } from "Modules/Common/CommonUtility";
import './TreatmentInformation.scss';
import { LegacyRef, useEffect, useState } from "react";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDependentTreatmentProviderAction, getDependentTreatmentProviderList, getTreatmentSubTypesListData } from "../InitiateTreatmentRequestAction";
import { RootStore } from "Store";
import _ from "lodash";
// import "../ConsignmentInfo/ConsignmentInformation.scss";
interface ITreatmentInformationProps {
    formRef: any;
    getTreatmentProviderData: any;
    getTreatmentTypeData?: any;
    onTreatmentHandleSubmit: any;
    getTreatmentRequestData?: any;
    isLoading: Boolean;
    isTreatmentTypeVisible?: boolean;
}
export default function TreatmentInformation({ getTreatmentRequestData, getTreatmentProviderData, getTreatmentTypeData, onTreatmentHandleSubmit, formRef, isLoading, isTreatmentTypeVisible = true }: ITreatmentInformationProps) {
    const dispatch = useDispatch();
    const min = new Date();
    const today = new Date();
    const max = new Date(2002, 2, 10);
    /**
     * * redux states
     */
    // *Get treatment sub types  Data From Store
    const getTreatmentSubTypes: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.subTreatmentTypes);
    // *Get dependent treatment provider Data From Store
    const getDependentTreatmentProviderData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.getDependentTreatmentProvider);
    // *Get dependent treatment provider loadign Data From Store
    const isLoadingGetDependentTreatmentProviderData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.isLoadingGetDependentTreatmentProvider);
    // ! End of redux states 
    
    /**
        * * Treatment Information States Form
     */
    const [treatmentType, setTreatmentType] = useState<any>({});
    const [treatmentSubType, setTreatmentSubType] = useState<any>({});
    const [componentTreatmentSubType, setComponentTreatmentSubType] = useState([]);
    const [componentTreatmentType, setComponentTreatmentType] = useState(getTreatmentTypeData);

    const [treatmentProvider, setTreatmentProvider] = useState<any>("");
    const [componentTreatmentProvider, setComponentTreatmentProvider] = useState(getDependentTreatmentProviderData);

    const [expectedPlaceOfTreatment, setExpectedPlaceOfTreatment] = useState("");
    const [tentativeDateOfTreatment, setTentativeDateOfTreatment] = useState(new Date());
    const [additionalDeclaration,setAdditionalDeclaration] = useState("")

    const [selectedTreatmentProviderData, setSelectedTreatmentProviderData] = useState([]);
    const [isDependentProviderFetch,setIsDependentProviderFetch] = useState(false);
    // * REASSIGN: get dependent treatment provider in case of reassign
    useEffect(()=>{
        if(!isTreatmentTypeVisible) {
            dispatch(getDependentTreatmentProviderList({ id: 0, treatmentTypeID: getTreatmentRequestData?.treatmentTypeID, treatmentSubTypeID: getTreatmentRequestData?.treatmentSubTypeID  },(res:any)=>{
                if (res.hasOwnProperty("code") ? res.code !== "200" : res.message.code !== "200") {
                } else {
                    setIsDependentProviderFetch(true);
                }
            }));
        }
        if(isTreatmentTypeVisible) {
            dispatch(getDependentTreatmentProviderAction([]))
            setComponentTreatmentProvider([]);
            // dispatch(getDependentTreatmentProviderList({ id: 0, treatmentTypeID: 0, treatmentSubTypeID: 0 }));
        }
    },[])
    // ! End REASSIGN: get dependent treatment provider in case of reassign
    
    // * REASSIGN: set excluded treatment request dependent treatment provider in case of reassign
    useEffect(()=>{
        if(!isTreatmentTypeVisible) {
            console.log(getDependentTreatmentProviderData);
            const getSelectedTreatmentProvider = getDependentTreatmentProviderData?.filter((provider: any) => provider?.id != getTreatmentRequestData?.treatmentProviderID);
            debugger;
            setSelectedTreatmentProviderData(getSelectedTreatmentProvider)            
        }
    },[getDependentTreatmentProviderData])
    // ! REASSIGN: set excluded treatment request dependent treatment provider in case of reassign
    
    // * added treatment sub types on the base of treatment type
    useEffect(()=>{
        formRef.current?.valueSetter("treatmentSubType","");
        formRef.current?.valueSetter("treatmentProvider","")  
        if(!_.isEmpty(treatmentType)){
            if(treatmentType?.isSubTypeExists){ 
                setComponentTreatmentSubType(treatmentType?.treatmentSubTypes) 
                setComponentTreatmentProvider([]);
                dispatch(getDependentTreatmentProviderList({ id: 0, treatmentTypeID: treatmentType?.id, treatmentSubTypeID: 0  },()=>{}));
            }
            else { 
                setComponentTreatmentSubType([]) 
                dispatch(getDependentTreatmentProviderList({ id: 0, treatmentTypeID: treatmentType?.id, treatmentSubTypeID: 0  },()=>{}));
            }
        }
    },[treatmentType])
    // ! end of added treatment sub types on the base of treatment type

    // * treatment provider dropdown filling on the base of treatment type and treatment sub type
    useEffect(()=>{
        // setComponentTreatmentSubType(getTreatmentSubTypes);
        if(!_.isEmpty(treatmentSubType)){
            setComponentTreatmentProvider([]);
            formRef.current?.valueSetter("treatmentProvider","")  
            dispatch(getDependentTreatmentProviderList({ id: 0, treatmentTypeID: treatmentType?.id, treatmentSubTypeID: treatmentSubType?.id  },()=>{}));
        }
    },[treatmentSubType])
    // ! end of treatment provider dropdown filling on the base of treatment type and treatment sub type


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
          }  else {
              setter(value);
              msg = "";
          }
        return msg;
    };

    // * Data setter useEffect 

    useEffect(() => {
        setComponentTreatmentType(getTreatmentTypeData);
    }, [getTreatmentTypeData])

    useEffect(() => {
        // if(!_.isEmpty(getDependentTreatmentProviderData)){
            setComponentTreatmentProvider(getDependentTreatmentProviderData);
        // }
    }, [getDependentTreatmentProviderData]);

    // ! End of Data setter useEffect 

    // * Filters for combo box 

    const onFilterTreatmentProvider = (event: any) => {
        const filter: string = event?.filter?.value;
        console.log('filter: ', filter);

        if (filter) {
            const filteredData = getTreatmentProviderData?.filter(
                (treatment: any) => treatment?.treatmentProviderName?.toString()
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            );
            console.log('filteredData: ', filteredData);
            if (filteredData.length > 0) {
                setComponentTreatmentProvider(filteredData);
            }
        } else {
            setComponentTreatmentProvider(getDependentTreatmentProviderData);
        }
    };

    const onFilterTreatmentType = (event: any) => {
        const filter: string = event.filter.value;
        console.log('filter: ', filter);
        console.log('componentTreatmentType: ', componentTreatmentType);

        if (filter) {
            const filteredData = componentTreatmentType?.filter(
                (treatment: any) => treatment?.name.toString()
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            );
            if (filteredData.length > 0) {
                setComponentTreatmentType(filteredData);
            }
        } else {
            setComponentTreatmentType(getTreatmentTypeData);
        }
    };

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
            setComponentTreatmentSubType(treatmentType?.treatmentSubTypes);
        }
    };
    // ! End of Filter For combo
    return (
        <div className="form-group">
            <Form
                ref={formRef}
                onSubmit={onTreatmentHandleSubmit}
                render={(formRenderProps) => (
                    <FormElement>
                        <fieldset className={"k-form-fieldset"}>
                            <Row
                                style={{ flexDirection: !isTreatmentTypeVisible ? "column" : "row" }}
                                className="pt-2"
                                xs="1"
                                sm={`${!isTreatmentTypeVisible ? "1" : "4"}`}>
                                {isTreatmentTypeVisible && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            name="treatmentType"
                                            component={FormComboBox}
                                            label={resources_EN.treatment_provider_treatment_type_label}
                                            loading={isLoading}
                                            placeholder={resources_EN.treatment_provider_treatment_type_placeholder}
                                            validator={validator(setTreatmentType)}
                                            labelClass={"pb-2"}
                                            disabled={!(componentTreatmentType.length > 0) || isLoading}
                                            data={componentTreatmentType}
                                            className="custom-dropdown"
                                            textField="name"
                                            dataItemKey="id"
                                            onFilterChange={onFilterTreatmentType}
                                            filterable={true}
                                        />
                                    </Col>
                                )}
                                {treatmentType?.id == treatmentTypes.FUMIGATION &&
                                    isTreatmentTypeVisible &&
                                    componentTreatmentSubType.length > 0 && (
                                        <Col className="pb-2 FormField">
                                            <Field
                                                name="treatmentSubType"
                                                component={FormComboBox}
                                                label={resources_EN.treatment_provider_treatment_sub_type_label}
                                                loading={isLoading}
                                                placeholder={
                                                    resources_EN.treatment_provider_treatment_sub_type_placeholder
                                                }
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
                                    {isDependentProviderFetch &&
                                        !isTreatmentTypeVisible &&
                                        selectedTreatmentProviderData.length < 1 && (
                                            <p className="text-danger">
                                                {resources_EN.error_message_treatment_provider_not_found_reassign}
                                            </p>
                                        )}
                                    <Field
                                        name="treatmentProvider"
                                        component={FormComboBox}
                                        placeholder={resources_EN.treatment_provider_treatment_provider_placeholder}
                                        loading={isLoadingGetDependentTreatmentProviderData}
                                        label={resources_EN.treatment_provider_treatment_provider_label}
                                        disabled={
                                            !(componentTreatmentProvider.length > 0) ||
                                            isLoadingGetDependentTreatmentProviderData
                                        }
                                        validator={validator(setTreatmentProvider)}
                                        labelClass={"pb-2"}
                                        data={
                                            !isTreatmentTypeVisible
                                                ? selectedTreatmentProviderData
                                                : componentTreatmentProvider
                                        }
                                        className="custom-dropdown"
                                        textField="treatmentProviderName"
                                        dataItemKey="id"
                                        onFilterChange={onFilterTreatmentProvider}
                                        filterable={true}
                                    />
                                </Col>
                                {isTreatmentTypeVisible && treatmentProvider?.emailAddress && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            placeholder={resources_EN.treatment_provider_email_placeholder}
                                            name="email"
                                            disabled
                                            value={treatmentProvider?.emailAddress || ""}
                                            component={FormInput}
                                            maxlength={100}
                                            labelClass="mb-2"
                                            label={resources_EN.treatment_provider_email_placeholder}
                                            // validator={validator(setExpectedPlaceOfTreatment)}
                                        />
                                    </Col>
                                )}
                                {isTreatmentTypeVisible && treatmentProvider?.contactNumber && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            placeholder={resources_EN.treatment_provider_contact_number_placeholder}
                                            name="contactNumber"
                                            disabled
                                            value={treatmentProvider?.contactNumber || ""}
                                            component={FormInput}
                                            maxlength={100}
                                            labelClass="mb-2"
                                            label={resources_EN.treatment_provider_contact_number_placeholder}
                                            // validator={validator(setExpectedPlaceOfTreatment)}
                                        />
                                    </Col>
                                )}
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="date-picker"
                                        // max={today}
                                        min={new Date()}
                                        format={"dd-MM-yyyy"}
                                        // defaultValue={new Date()}
                                        // value={tentativeDateOfTreatment}
                                        name="tentativeDateOfTreatment"
                                        component={FormDatePicker}
                                        label={
                                            treatmentType?.id == treatmentTypes.FUMIGATION
                                                ? resources_EN.treatment_provider_tentative_date_of_fumigation_label
                                                : resources_EN.treatment_provider_tentative_date_of_treatment_label
                                        }
                                        validator={validator(setTentativeDateOfTreatment)}
                                        labelClass={"pb-2 font-normal"}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        placeholder={
                                            resources_EN.treatment_provider_expected_place_of_treatment_placeholder
                                        }
                                        name="expectedPlaceOfTreatment"
                                        component={FormInput}
                                        maxlength={100}
                                        labelClass="mb-2"
                                        label={
                                            treatmentType?.id == treatmentTypes.FUMIGATION
                                                ? resources_EN.treatment_provider_expected_place_of_fumigation_label
                                                : resources_EN.treatment_provider_expected_place_of_treatment_label
                                        }
                                        validator={validator(setExpectedPlaceOfTreatment)}
                                    />
                                </Col>
                                <Col>
                                    <Field
                                        placeholder={resources_EN.treatment_provider_additional_treatment_info}
                                        name="additionalDeclaration"
                                        component={FormTextArea}
                                        maxlength={1000}
                                        labelClass="mb-2"
                                        rows={3}
                                        label={resources_EN.treatment_provider_additional_treatment_info}
                                        validator={validator(setAdditionalDeclaration)}
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
