import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Input } from "@progress/kendo-react-inputs";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import "../ConsignmentInfo/ConsignmentInformation.scss";
import { FormComboBox, FormDropDown, FormInput } from "Elements/Basic/FormComponent/FormComponent";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { getUomByHsCode } from "../InitiateTreatmentRequestAction";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../../TPM/TreatmentCertificate/GeneralView/View/View.module.scss";
import _ from "lodash";
import CheckInput from "Elements/Custom/CheckInput/CheckInput";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import { Col, Row } from "react-bootstrap";
import { RootStore } from "Store";
import { ToasterTypes, setToastr } from "Modules/Common/Helpers/ToastrConfig";
import { generateUniqueId } from "Modules/Common/CommonUtility";
interface Iprops {
    getUomData: any;
    productCodeList: any;
    hsCodeData: any;
    setStoreAllInformationRequest: any;
    storeAllInformationRequest: any;
    setProductCodeList: any;
    isLoading: boolean;
    formPropRefferenceCommodity: any;
}
function CommodityInformation({
    isLoading,
    storeAllInformationRequest,
    setStoreAllInformationRequest,
    getUomData,
    productCodeList,
    hsCodeData,
    setProductCodeList,
    formPropRefferenceCommodity
}: Iprops) {
    /**
     * * Contain Form Value Refference
     * */

    const dispatch = useDispatch();

      // *Get ishsCodeListReterived Data From Store
      const ishsCodeListReterived: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.ishsCodeListReterived);
      console.log("ishsCodeListReterived", hsCodeData);
    /**
     * * Commodity Information States
     */
    const [hsCode, setHsCode] = useState<any>({});
    const [componentHsCode, setComponentHsCode] = useState<any>(hsCodeData);
    const [productCode, setProductCode] = useState<any>("");
    const [copyProductCodeList, setCopyProductCodeList] = useState<any>([]);
    const [declaredDesc, setDeclaredDesc] = useState("");
    const [quantity, setQuantity] = useState("");
    const [uom, setUOM] = useState<any>({ id: 0, text: "UOM" });
    const [uomData, setUomData] = useState([]);
    const [container, setContainerNumber] = useState("");
    const [productItemDescription, setProductItemDescription] = useState("");
    const [isContainerValid, setIsContainerValid] = useState(false);
    /**
     * * UseEffect Event raise on change on HsCode Value
     */
    useEffect(() => {
        setCopyProductCodeList([]);
        setProductCode("")
        formPropRefferenceCommodity.current.valueSetter("productCode","");

        dispatch(getUomByHsCode({ hsCode: hsCode?.hsCode }));
        setProductCodeList(hsCode?.hscodeDetails);
        setCopyProductCodeList(hsCode?.hscodeDetails);
    }, [hsCode]);

    /**
     * * UseEffect Event raise on change on getUomData Value and will set into uom
     */
    useEffect(() => {
        setUOM({ id: 0, text: getUomData?.unitCode || "UOM" });
        let uomDataAdded: any = [uom, ...uomData];
        setUomData(uomDataAdded);
    }, [getUomData]);

    /**
     * * UseEffect Event raise on change on productCode Value and will set into item description
     */
    useEffect(() => {

        setProductItemDescription(productCode?.itemDescription);
    }, [productCode]);

    /**
     * * Start of Component supporting functions
     */

    /**
     * * A general validator function
     */
    const containerValidator = (setter: Function) => (value: string) => {
        if(value !== undefined) 
        {
        setIsContainerValid(false);

        let msg = "Invalid input: special characters, spaces are not allowed.";
        let regex = /^[a-zA-Z0-9]{0,11}$/;
        
        if ((value?.length < 11) && (value?.length != 0)) {
            return msg = "Invalid input. Only 11-digit numbers are allowed.";
        }
        // let nameLength = value.replace(/\s/g, "").length;
        if (
            regex.test(value)
        ) {
            msg = "";
            setIsContainerValid(true);
            setContainerNumber(value);
        }
              return msg;
    }
   
    };
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

    const quantityValidator = (setter: Function) => (value: string) => {
            let msg = "Please enter a valid quantity number.";
            let regex = /^[0-9][0-9]{0,9}(\.[0-9]+)?$/;
            // let nameLength = value.replace(/\s/g, "").length;
            if ((value?.length > 10)) {
                return msg = "Invalid input. Only 10-digit numbers are allowed.";
            }
            if(Number(value) === 0 )
            {   
                return msg = "Quantity cannot be zero."
            }
            if(Number(value) < 0)
            {
                return msg = "Quantity cannot be less than zero.";
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

    /**
     * * Sumbit function for commodity to add dynamic values into states.
     */
    const onHandleSubmit = (data: any) => {
        const hsCodePlusProdCode = `${hsCode?.hsCode}.${productCode?.productCode}`;
        const compareContainerNumber = container || "";
        for (let i = 0; i < storeAllInformationRequest.length; i++) {
            if (!storeAllInformationRequest[i].containerNumber) {
                storeAllInformationRequest[i].containerNumber = ''; // Set empty string if containerNumber is undefined
            }
        }
        // * add condtion to check either hsCode and container number shouldn't be duplicated

        const filterDuplicateData = storeAllInformationRequest.filter((item:any) => {
            if(item.containerNumber)
            {
                if(typeof(item.containerNumber) === "string"){ 
                    if (item.containerNumber.toLowerCase() === container.toLowerCase() && item.hsCodePlusProductCode === hsCodePlusProdCode) {
                        return item;
                    }
                }
                else {
                      if (
                          item.containerNumber === container &&
                          item.hsCodePlusProductCode === hsCodePlusProdCode
                      ) {
                          return item;
                      }
                }
            }
        })

        if(filterDuplicateData && filterDuplicateData.length > 0)
        {
              dispatch(
                  setToastr({
                      title: resources_EN.error_message_title,
                      message: _.isEmpty(compareContainerNumber)
                          ? resources_EN.error_message_duplicate_hscode
                          : resources_EN.error_message_duplicate_hscode_container_number,
                      type: ToasterTypes.ERROR
                  })
              );
              return; 
        }



        if(storeAllInformationRequest.some((item:any)=> { 
            
            if(item.containerNumber)
            {
            item.containerNumber.toLowerCase() == compareContainerNumber.toLowerCase() 
            }
         }) && storeAllInformationRequest.some((item:any)=>item.hsCodePlusProductCode == hsCodePlusProdCode)){
            dispatch(
                    setToastr({
                        title: resources_EN.error_message_title,
                        message: _.isEmpty(compareContainerNumber) ? resources_EN.error_message_duplicate_hscode : resources_EN.error_message_duplicate_hscode_container_number,
                        type: ToasterTypes.ERROR
                    })
                );
            return 
        }
        // * add condtion to check either hsCode is duplicated 
        if(storeAllInformationRequest.some((item:any)=>item.hsCodePlusProductCode == hsCodePlusProdCode) && storeAllInformationRequest.some((item:any)=>{
          
            if(item.containerNumber)
            {
            item.containerNumber.toLowerCase() == compareContainerNumber.toLowerCase() 
            }
    
    } )){
             dispatch(
                    setToastr({
                        title: resources_EN.error_message_title,
                        message: resources_EN.error_message_duplicate_hscode,
                        type: ToasterTypes.ERROR
                    })
                );
            return 
        }


        const storeAllInformationRequestClone = [
            {
                id: generateUniqueId(),
                hsCodePlusProductCode: `${hsCode?.hsCode}.${productCode?.productCode}`,
                hsCode: hsCode?.hsCode,
                hsCodeExt: `${hsCode?.hsCode}.${productCode?.productCode}`,
                declaredDescription: declaredDesc,
                containerNumber: container == "" ? null : container,
                customContainerNumber: _.isEmpty(container) ? "N/A" : container,
                quantity: parseFloat(quantity),
                uomCode: uom?.text,
                itemDescriptionExt: productCode?.itemDescriptionExt,
                terrifDescription: "",
                itemDescription: productItemDescription
            },
            ...storeAllInformationRequest
        ];
        debugger
        setStoreAllInformationRequest(storeAllInformationRequestClone);
        setHsCode("");
        setProductCode("");
        setDeclaredDesc("");
        setProductItemDescription("");
        setQuantity("");
        setContainerNumber("");
        setUOM("");
        formPropRefferenceCommodity.onFormReset();
    };
    /**
     * * function to hold the form refference to reset the form easily.
     */
    const holdingFormRefference = (formRenderProps: any) => {
        formPropRefferenceCommodity = formRenderProps;
    };

    /**
     * * onHandleChange for non-validate fields
     */
    const onHandleChange = (event: any) => {


        setContainerNumber(event.target.vlaue);
    };

    /**
     * * End of Component supporting functions
     */


    // * Data setter useEffect 

    useEffect(() => {
        setComponentHsCode(hsCodeData);
    }, [hsCodeData])


    // ! End of Data setter useEffect 

    // * Filters for combo box 

    const onFilterHSCode = (event: any) => {
        const filter: string = event.filter.value;

        if (filter) {
            const filteredData = hsCodeData?.filter((hsCode: any) => hsCode?.hsCode.includes(filter));
            if (filteredData.length > 0) {
                setComponentHsCode(filteredData);
            }
        } else {
            setComponentHsCode(hsCodeData);
        }
    };

    const onFilterProductCode = (event: any) => {
        const filter: string = event?.filter?.value;

        if (filter) {
            const filteredData = productCodeList?.filter(
                (productCode: any) => productCode?.productCode?.includes(filter)
            );
            if (filteredData?.length > 0) {
                setCopyProductCodeList(filteredData);
            }
        } else {
            setCopyProductCodeList(productCodeList);
        }
    };


    // ! End of Filters for combox box
    return (
        <div className="form-group">
            <Form
                onSubmit={onHandleSubmit}
                ref={formPropRefferenceCommodity}
                render={(formRenderProps) => (
                    <FormElement>
                        <fieldset className={"k-form-fieldset"}>
                            <Row className="pt-2" xs="1" sm="4">
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="hsCode"
                                        placeholder={resources_EN.treatment_provider_hs_code_placeholder}
                                        disabled={!(componentHsCode?.length > 0) || ishsCodeListReterived}
                                        name="hsCode"
                                        loading={ishsCodeListReterived}
                                        component={FormComboBox}
                                        // value={hsCode}
                                        data={componentHsCode}
                                        clearButton={false}
                                        textField="hsCode"
                                        dataItemKey="hsCode"
                                        labelClass="mb-2"
                                        label={resources_EN.treatment_provider_hs_code_label}
                                        // onChange={onChangeHsCode}
                                        validator={validator(setHsCode)}
                                        onFilterChange={onFilterHSCode}
                                        filterable={true}

                                    />
                                </Col>

                                <Col className="pb-2 FormField">
                                    <Field
                                        id="productCode"
                                        component={FormComboBox}
                                        placeholder={resources_EN.treatment_provider_product_code_placeholder}
                                        loading={isLoading}
                                        disabled={!(copyProductCodeList?.length > 0)}
                                        name="productCode"
                                        data={copyProductCodeList?.length > 0 ? copyProductCodeList : []}
                                        textField="productCode"
                                        dataItemKey="productCode"
                                        labelClass="mb-2"
                                        label={resources_EN.treatment_provider_product_code_label}
                                        validator={validator(setProductCode)}
                                        onFilterChange={onFilterProductCode}
                                        filterable={true}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="productItemDescription"
                                        placeholder={resources_EN.treatment_provider_product_item_description_placeholder}
                                        name="productItemDescription"
                                        component={FormInput}
                                        value={productItemDescription}
                                        labelClass="mb-2"
                                        label={resources_EN.treatment_provider_product_item_description_label}
                                        disabled
                                    // validator={validator(setDeclaredDesc)}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="declaredDesc"
                                        placeholder={resources_EN.treatment_provider_declared_desc_placeholder}
                                        name="declaredDesc"
                                        component={FormInput}
                                        maxlength={1000}
                                        // value={declaredDesc}
                                        labelClass="mb-2"
                                        label={resources_EN.treatment_provider_declared_desc_label}
                                        validator={validator(setDeclaredDesc)}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        id="quantity"
                                        placeholder={resources_EN.treatment_provider_quantity_placeholder}
                                        name={resources_EN.treatment_provider_quantity_field}
                                        // value={quantity}
                                        maxlength={10}
                                        type="number"
                                        component={FormInput}
                                        labelClass="mb-2"
                                        label={resources_EN.treatment_provider_quantity_label}
                                        validator={quantityValidator(setQuantity)}
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        name={resources_EN.treatment_provider_uom_field}
                                        component={FormDropDown}
                                        label={resources_EN.treatment_provider_uom_label}
                                        // value={uom}
                                        defaultValue={uom}
                                        textField="text"
                                        dataItemKey="id"
                                        placeholder={resources_EN.treatment_provider_uom_placeholder}
                                        data={uomData}
                                        // value={{ text:getUomData?.unitCode , id:0 }}
                                        labelClass={"pb-2"}
                                        disabled
                                        className="custom-dropdown"
                                    />
                                </Col>
                                <Col className="pb-2 FormField">
                                    <Field
                                        id={resources_EN.treatment_provider_container_field}
                                        placeholder={resources_EN.treatment_provider_container_placeholder}
                                        // value={container}
                                        maxlength={11}
                                        // onChange={(e: any) => setContainerNumber(e.target.value)}
                                        name={resources_EN.treatment_provider_container_field}
                                        component={CheckInput}
                                        labelClass="mb-2"
                                        label={resources_EN.treatment_provider_container_label}
                                        validator={containerValidator(setContainerNumber)}
                                    />
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end mr-3">
                                <button
                                    type="submit"
                                    disabled={!formRenderProps.allowSubmit}
                                    onClick={() => holdingFormRefference(formRenderProps)}
                                    // className={`ml-4 ${tradeType.text != "Select Trade Type" && hsCode != "" && exporterName != "" && exporterAddress != "" && importerName != "" && countryOfOrigin?.code != "" && importerAddress != "" && portOfLoading != "" && countryOfDestination.code != "" && site?.name != "" && city.cityName != "" && tentativeDateOfTreatment != "" && treatmentType?.name != "" && treatmentProvider.name != "" && expectedPlaceOfTreatment != "" && productCode != "" && productItemDescription != "" && declaredDesc != "" && quantity != "" && uom != "" && container != "" ? styles.floatingBtnPrimary : styles.disabledBtn}`}
                                    className={`${styles.floatingBtnPrimary}`}>
                                    <FontAwesomeIcon icon={faPlus} className={"my-1 mr-1"} />
                                    <span>Add Commodity</span>
                                </button>
                            </div>
                        </fieldset>
                    </FormElement>
                )}
            />
        </div>
    );
}

export default React.memo(CommodityInformation);