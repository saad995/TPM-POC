// import '../InitiateTreatmentRequest.scss';
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormComboBox, FormDatePicker, FormDropDown, FormInput, FormTextArea } from "Elements/Basic/FormComponent/FormComponent";
import { treatmentProviderOptions, treatmentTypes } from "Modules/Common/CommonUtility";
import './ExportTreatmentInformation.scss';
import './../../TreatmentCertificate.scss';
import { LegacyRef, useEffect, useState } from "react";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDependentTreatmentProviderList, getTreatmentSubTypesListData } from "../InitiateTreatmentRequestAction";
import { RootStore } from "Store";
// import "../ConsignmentInfo/ConsignmentInformation.scss";
interface IExportTreatmentInformationProps {
    formRef: any | undefined;
    getTreatmentProviderData: any;
    getTreatmentTypeData?: any;
    onTreatmentHandleSubmit: any;
    getTreatmentRequestData?: any;
    isLoading: Boolean;
    isAddTreatmentProvider: Boolean;
}
export default function ExportTreatmentInformation({ isAddTreatmentProvider, getTreatmentRequestData, getTreatmentProviderData, getTreatmentTypeData, onTreatmentHandleSubmit, formRef, isLoading }: IExportTreatmentInformationProps) {
    const dispatch = useDispatch();
    const min = new Date();
    const today = new Date();
    const max = new Date(2002, 2, 10);
    debugger;
    /**
     * * redux states
     */
        // *Get dependent treatment provider Data From Store
        const getDependentTreatmentProviderData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.getDependentTreatmentProvider);
        // *Get dependent treatment provider loadign Data From Store
        const isLoadingGetDependentTreatmentProviderData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.isLoadingGetDependentTreatmentProvider);
        // *Get treatment sub types  Data From Store
        const getTreatmentSubTypes: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.subTreatmentTypes);/**
    // ! End of redux states 
        * * Treatment Information States Form
     */
    const [treatmentType, setTreatmentType] = useState<any>({});
    const [isTreatmentTypeVisible,setIsTreatmentTypeVisible]=useState(false);
    const [treatmentSubType, setTreatmentSubType] = useState<any>({});
    const [componentTreatmentSubType, setComponentTreatmentSubType] = useState([]);
    const [componentTreatmentType, setComponentTreatmentType] = useState(getTreatmentTypeData);
    const [isDependentProviderFetch,setIsDependentProviderFetch] = useState(false);

    const [treatmentProvider, setTreatmentProvider] = useState("");
    const [componentTreatmentProvider, setComponentTreatmentProvider] = useState(getDependentTreatmentProviderData);

    const [expectedPlaceOfTreatment, setExpectedPlaceOfTreatment] = useState("");
    const [tentativeDateOfTreatment, setTentativeDateOfTreatment] = useState(new Date());
    const [additionalTreatmentInformation,setAdditionalTreatmentInformation] = useState("");

    const [selectedTreatmentProviderData, setSelectedTreatmentProviderData] = useState([]);

    useEffect(()=>{
        dispatch(getDependentTreatmentProviderList({ id: 0, treatmentTypeID: getTreatmentRequestData?.treatmentTypeID, treatmentSubTypeID: getTreatmentRequestData?.treatmentSubTypeID  },(res:any)=>{
            if (res.hasOwnProperty("code") ? res.code !== "200" : res.message.code !== "200") {
            } else {
                setIsDependentProviderFetch(true);
            }
        }));
    },[])
    useEffect(() => {
        const getSelectedTreatmentProvider = getTreatmentProviderData?.filter((provider: any) => provider?.id != getTreatmentRequestData?.treatmentProviderID);
        if(formRef?.current){
            formRef?.current?.valueSetter("treatmentType", getTreatmentTypeData.filter((treatment: any) => treatment.id == getTreatmentRequestData.treatmentTypeID)[0]);
            dispatch(getTreatmentSubTypesListData({ "id": 0, treatmentTypeID: getTreatmentRequestData.treatmentTypeID  }));
            if (getTreatmentRequestData.treatmentSubTypeID) {
                setIsTreatmentTypeVisible(true);
                console.log('testing:..',getTreatmentSubTypes.filter((treatment: any) => treatment.id == getTreatmentRequestData?.treatmentSubTypeID)[0])
                formRef?.current?.valueSetter("treatmentSubType", getTreatmentSubTypes.filter((treatment: any) => treatment.id == getTreatmentRequestData?.treatmentSubTypeID)[0]);
            }
        }
        setSelectedTreatmentProviderData(getSelectedTreatmentProvider);
    }, [getTreatmentRequestData])

    useEffect(()=>{
        dispatch(getTreatmentSubTypesListData({ "id": 0, treatmentTypeID: treatmentType?.id  }));
    },[treatmentType])

    useEffect(()=>{
        setComponentTreatmentSubType(getTreatmentSubTypes);
    },[getTreatmentSubTypes])


    /**
     * ! End of Treatment Information States Form
     */
    /**
     * * A general validator function
     */
    const validator = (setter: Function) => (value: string) => {
        let msg = "Field is required";
        const dateValue = new Date(value);
        const nowDate = new Date();
        dateValue.setHours(0, 0, 0, 0);
        nowDate.setHours(0, 0, 0, 0);
        if (!value) {
            return msg;
        }
        else {
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
        setComponentTreatmentProvider(getDependentTreatmentProviderData);
    }, [getDependentTreatmentProviderData])

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
            if (filteredData?.length > 0) {
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
            setComponentTreatmentSubType(getTreatmentSubTypes);
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
                                style={{ flexDirection: false ? "column" : "row" }}
                                className="pt-2"
                                xs="1"
                                sm={`${false ? "1" : "3"}`}>
                                <Col className="pb-2 FormField">
                                    <Field
                                        name="treatmentProvider"
                                        component={FormComboBox}
                                        placeholder={resources_EN.treatment_provider_treatment_provider_placeholder}
                                        loading={isLoadingGetDependentTreatmentProviderData}
                                        label={resources_EN.treatment_provider_treatment_provider_label}
                                        disabled={
                                            !(componentTreatmentProvider?.length > 0) ||
                                            isLoadingGetDependentTreatmentProviderData
                                        }
                                        validator={validator(setTreatmentProvider)}
                                        labelClass={"pb-2"}
                                        data={componentTreatmentProvider}
                                        className="custom-dropdown"
                                        textField="treatmentProviderName"
                                        dataItemKey="id"
                                        onFilterChange={onFilterTreatmentProvider}
                                        filterable={true}
                                    />
                                    {isDependentProviderFetch && componentTreatmentProvider.length < 1 && (
                                        <p className="text-danger">
                                            {resources_EN.error_message_treatment_provider_not_found}
                                        </p>
                                    )}
                                </Col>
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
                                        label={resources_EN.treatment_provider_tentative_date_of_treatment_label}
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
                                        label={resources_EN.treatment_provider_expected_place_of_treatment_label}
                                        validator={validator(setExpectedPlaceOfTreatment)}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        placeholder={resources_EN.treatment_provider_additional_treatment_info}
                                        name="additionalTreatmentInformation"
                                        component={FormTextArea}
                                        maxlength={1000}
                                        rows={3}
                                        labelClass="mb-2"
                                        label={resources_EN.treatment_provider_additional_treatment_info}
                                        validator={validator(setAdditionalTreatmentInformation)}
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
