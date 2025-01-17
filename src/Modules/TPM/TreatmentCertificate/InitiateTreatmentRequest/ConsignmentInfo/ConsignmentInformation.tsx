import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Input } from "@progress/kendo-react-inputs";
import "../InitiateTreatmentRequest.scss";
import "./ConsignmentInformation.scss";
import CheckInput from "Elements/Custom/CheckInput/CheckInput";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { getter } from "@progress/kendo-react-common";
import { FieldRenderProps, FormRenderProps, FormValidatorType } from "@progress/kendo-react-form";
import {
    FormCheckbox,
    FormComboBox,
    FormDatePicker,
    FormDropDown,
    FormInput,
    FormMaskedTextBox,
    FormNumericTextBox,
    FormTextArea
} from "Elements/Basic/FormComponent/FormComponent";
import { Button } from "@progress/kendo-react-buttons";
import React, { LegacyRef, useEffect, useState } from "react";
import { TradeTypes, defaultAgency, defaultCountry, tradeTypeOptions } from "Modules/Common/CommonUtility";
// import { resources_EN } from "Modules/TPM/Constants/Resources_EN";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import { Col, Row } from "react-bootstrap";
import { getCustomCollectorateBaseOnCityList, getHSCodeListData, getPortOfLoadingListData, setLoadingDependentTreatmentProviderAction } from "../InitiateTreatmentRequestAction";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import SearchNTN from "Modules/TPM/Common/SearchNTN/SearchNTN";
import { off } from "process";

interface IDropDownType {
    text: string;
    id: number;
}
interface IConsignmentInformationProps {
    formRef: any;
    countryData: any;
    importerData: any;
    agencies: any;
    siteData: any;
    isLoadingCustomCollectorateBaseOnCity:boolean;
    customCollectorateBaseOnCity:any;
    cityData: any;
    onConsignmentHandleSubmit: any;
    isLoading: Boolean;
    countryDataWithPak: any;
    shedLocationData: any;
    countryOfOrigin: any;
    setCountryOfOrigin: any;
    countryOfDestination: any;
    setCountryOfDestination: any;
    portOfLoadingData: any;
    formPropRefferenceCommodity: any;
    roleCode:any;
    organizationsData:any;
    traderNTN:any;
    setTraderNTN:any;
    setIImporterAddress:any;
    iImporterAddress:any;
    exporterAddress:any;
     setExporterAddress:any
}
function ConsignmentInformation({
    formRef,
    countryData,
    importerData,
    agencies,
    siteData,
    shedLocationData,
    cityData,
    onConsignmentHandleSubmit,
    isLoading,
    countryDataWithPak,
    countryOfOrigin,
    setCountryOfOrigin,
    countryOfDestination,
    setCountryOfDestination,
    portOfLoadingData,
    customCollectorateBaseOnCity,
    isLoadingCustomCollectorateBaseOnCity,
    formPropRefferenceCommodity,
    roleCode,
    organizationsData,
    traderNTN,
    setTraderNTN,
    setIImporterAddress,
    iImporterAddress,
    exporterAddress,
     setExporterAddress,
}: IConsignmentInformationProps) {
    const dispatch = useDispatch();
    /**
     * * Consignment Informations States
     */

    // ! End of CA States
    const [selectImporterAddress, setSelectImporterAddress] = useState([]);
    const [tradeType, setTradeType] = useState({
        text: "Select Trade Type", id: 0
    });
    // * Import case feilds
    const [iExportNameImport, setIExportName] = useState("");
    const [iExportAddressImport, setIExportAddress] = useState("");
    const [iPortOfLoading, setIPortOfLoading] = useState("");
    const [iImporterName, setIImporterName] = useState<any>({
        importerConsigneeName: "",
        id: "",
    });
    // const [iImporterAddress, setIImporterAddress] = useState({
    //     address: "Select Importer Address",
    //     id: 0
    // });
    // ! end of Import case fields
    const [exporterName, setExporterName] = useState<any>({
        importerConsigneeName: "",
        id: "",
    });
   
    const [importerName, setImporterName] = useState({
        importerConsigneeName: "",
        id: "",
    });

    // const [countryOfOrigin, setCountryOfOrigin] = useState({ code: "", name: "Select Country" });
    const [importerAddress, setImporterAddress] = useState({
        address: "Enter Importer Address",
        id: 0
    });
    const [portOfLoading, setportOfLoading] = useState({description:"",collectorateId:""});
    // const [countryOfDestination, setCountryOfDestination] = useState({ code: "", name: "Select Country" });
    const [componentCountryOfDestination, setComponentCountryOfDestination] = useState(countryData);
    const [city, setCity] = useState<any>({ cityId: 0, cityName: "Select City" });
    const [componentCitiesData, setComponentCitiesData] = useState(cityData);
    const [componentOriginCountryData, setComponentOriginCountryData] = useState(countryData);
    const [site, setSite] = useState({ siteId: 0, cityName: "Select Site" });
    const [collectorate, setCollectorate] = useState({ collectorateId: 0, descritpion: "" });
    const [componentSite, setComponentSite] = useState(siteData);
    const [componentCollectorate, setComponentCollectorate] = useState(customCollectorateBaseOnCity);
    const [componentCollectorateFiltered, setComponentCollectorateFiltered] = useState([]);
    const [componentShedLocation, setComponentShedLocation] = useState([]);
    const [componentPortOfLoading, setComponentPortOfLoading] = useState([]);
    const [componentSiteData,setComponentSiteData] = useState([]);
    const [traderData,setTraderData] = useState([]);

    /**
     * ! End of Consignment Informations States
     */

    /**
     * * Search modal states
     */
    const [showSearchNTNDialog, setShowSearchNTNDialog] = useState(false);
    const [isNTNChange, setIsNTNChange] = useState(false);

    const setVariables = () => {
        console.log('traderNTN: ',traderNTN);
        // if (.NTN) {
        //     const orgOnNTN =
        //         importerData.length > 0
        //             ? importerData.filter((x) => x.NTN === basicInfo.NTN)[0]
        //             : defaultOrganizationsOnNTN;
        //     if (!_.isEqual(orgOnNTN, organizationsOnNTN)) {
        //         setOrganizationsOnNTN(orgOnNTN);
        //         setIsPageRendered(true);
        //     }

        //     if (!isEdit) setIsPageRendered(true);
        // } else {
        //     if (roleCode === Role.Trader) {
        //         defaultOrganizationsOnNTN.NTN = traderOrganizations?.length > 0 ? traderOrganizations[0].NTN : "";
        //         if (traderOrganizations?.length > 0 && traderOrganizations[0] != organizationsOnNTN) {
        //             setOrganizationsOnNTN(traderOrganizations[0]);
        //         } else if (!_.isEqual(organizationsOnNTN, defaultOrganizationsOnNTN)) {
        //             setOrganizationsOnNTN(
        //                 traderOrganizations?.length > 0 ? traderOrganizations[0] : defaultOrganizationsOnNTN
        //             );
        //         }
        //         // setOrganizationsOnNTN(
        //         //     traderOrganizations?.length > 0 ? traderOrganizations[0] : defaultOrganizationsOnNTN
        //         // );
        //         setIsOrganizationValid(traderOrganizations?.length > 0);
        //     }

        //     if (!isEdit) setIsPageRendered(true);
        // }

        // setBreederName(basicInfo.breederName);
        // setMaintainer(basicInfo.maintainer);

        // if (!_.isEmpty(basicInfo.exporterName)) {
        //     setExpoterName(basicInfo.exporterName);
        //     setIsExpoterName(true);
        // }
        // if (!_.isEmpty(basicInfo.exporterAddress)) {
        //     setExpoterAddress(basicInfo.exporterAddress);
        //     setIsexpoterAddress(true);
        // }
        // if (!_.isEmpty(basicInfo.institute)) {
        //     setInstitute(basicInfo.institute);
        //     setIsInstitute(true);
        // }
        // if (!_.isEmpty(basicInfo.applicationConsent)) {
        //     setApplicationConsent(basicInfo.applicationConsent);
        //     setIsApplicationConsent(true);
        // }
        // if (!_.isEmpty(basicInfo.sector)) {
        //     setSector(basicInfo.sector);
        //     setIsSector(true);
        // }
        // if (!_.isEmpty(basicInfo.businessName)) {
        //     if (!_.isEqual(organization.businessName, basicInfo.businessName)) {
        //         setOrganization(defaultBusinessState);
        //     }
        //     else {
        //         setIsOrganizationValid(true);
        //     }
        // }
        // if (!_.isEmpty(basicInfo.businessAddressFull)) {
        //     setAddress(basicInfo.businessAddressFull);
        //     setIsAddressValid(true);
        // }
        // if (!_.isEmpty(basicInfo.cityId) && !_.isEmpty(citiesStore)) {
        //     setCity(citiesStore.find(x => x.cityId == basicInfo.cityId) ?? defaultCity);
        //     setIsCityValid(true);
        // }
    };
    useEffect(() => {
        if (!isNTNChange) setVariables();
        setIsNTNChange(false);
        setTraderData(importerData);
    }, [importerData]);
    /**
     * ! End of search modal states
     */
    /**
     * * useEffect Event trigger when importer name will change
     */
    useEffect(() => {
        if (roleCode == UserRole.Trader) {
            setTraderData(importerData);
        }

        if (tradeType?.id == TradeTypes.IMPORT) {
            if (iImporterName?.importerConsigneeAddress?.length == 1) {
                setSelectImporterAddress(iImporterName?.importerConsigneeAddress);
                formRef.current?.valueSetter("iImporterAddress", iImporterName?.importerConsigneeAddress[0]);
                setIImporterAddress(iImporterName?.importerConsigneeAddress[0]);
            } else {
                setSelectImporterAddress(iImporterName?.importerConsigneeAddress);
                formRef.current?.valueSetter("iImporterAddress", setIImporterAddress({ address: "Select Importer Address", id: 0 }));
            }
        } else if (tradeType?.id == TradeTypes.EXPORT) {
            if (exporterName?.importerConsigneeAddress?.length == 1) {
                setSelectImporterAddress(exporterName?.importerConsigneeAddress);
                formRef.current?.valueSetter("exporterAddress", exporterName?.importerConsigneeAddress[0]);
                setExporterAddress(exporterName?.importerConsigneeAddress[0]);
            } else {
                setSelectImporterAddress(exporterName?.importerConsigneeAddress);
                formRef.current?.valueSetter("iImporterAddress", setExporterAddress({ address: "Select Exporter Address", id: 0 }));
            }
        }
    }, [importerName, exporterName, iImporterName]);

    useEffect(() => {
        console.log('TradeType',tradeType);
        if (tradeType?.id == TradeTypes.IMPORT) {
            setImporterName({
                importerConsigneeName: "Importer Name",
                id: "",
            })
            setImporterAddress({
                address: "Enter Importer Address",
                id: 0
            });
            setCountryOfDestination({ code: "PK", name: "Pakistan" });
            setCountryOfOrigin({ code: "", name: "Select Country" });
            dispatch(getPortOfLoadingListData({ tradeTranTypeId: 1, isForGD: false }));
        }
        
        if (tradeType?.id == TradeTypes.EXPORT) {
            setCountryOfOrigin({ code: "PK", name: "Pakistan" });
            setCountryOfDestination({ code: "", name: "Select Country" });
            dispatch(getPortOfLoadingListData({ tradeTranTypeId: 2, isForGD: false }));
        }
        if(tradeType?.id !== 0) {
            formPropRefferenceCommodity.current.valueSetter("hsCode",{});
            dispatch(
                getHSCodeListData({
                    agencyId: 2,
                    tradeTranTypeId: tradeType?.id
                })
                );
        }
    }, [tradeType]);
    /**
     * !End of useEffect Event trigger when importer name will change
     */

    useEffect(()=>{
        const filteredLocationBaseOnCollectorate = shedLocationData?.filter((location:any)=> location?.collectorateId == collectorate?.collectorateId);
        if(filteredLocationBaseOnCollectorate?.length > 0) {
            formRef.current?.valueSetter("site", {});
            setComponentShedLocation(filteredLocationBaseOnCollectorate);
            setComponentCollectorateFiltered(filteredLocationBaseOnCollectorate);
        }
    },[collectorate])



   
    
    const validator = (setter: Function,fieldValue="") => (value: string) => {
        // console.log('fieldValue',fieldValue);
        if(fieldValue !== "")
        {
            setter(fieldValue);
            return;
        }
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
    };
    // * Value setter 

    useEffect(() => {
        setComponentCitiesData(cityData);
    }, [cityData])

    useEffect(() => {
        setComponentSite(siteData);
    }, [siteData])

    useEffect(()=>{
        if(cityData.length > 0){
            formRef.current?.valueSetter("site", "");
            const siteFilteredData: any = siteData.filter((siteItem:any)=> siteItem.cityId == city.cityId);
            console.log('siteFilteredData: ',siteFilteredData);
            setComponentSiteData(siteFilteredData);
        }
        if(cityData.length > 0 && tradeType?.id == TradeTypes.IMPORT) {
            formRef.current?.valueSetter("collectorate", "");
            dispatch(getCustomCollectorateBaseOnCityList({ tradeType: tradeType?.id, parentCollectorateCode: city?.parentCollectorateCode }))
        }
        },[city])

    useEffect(() => {
        setComponentPortOfLoading(portOfLoadingData)
    }, [portOfLoadingData]);

    useEffect(() => {
        setComponentOriginCountryData(countryData);
        setComponentCountryOfDestination(countryData);
    }, [countryData]);

    useEffect(() => {
        setComponentCollectorate(customCollectorateBaseOnCity)
    }, [customCollectorateBaseOnCity]);

    /* Setting Importer Or Exporter Name Same As NTN and Address  */
    useEffect(() => {
        if (tradeType.id === 0) return 

        if (roleCode == UserRole.CustomAgent) {
            setTraderData(traderNTN.organizations)

            if (!traderNTN || Object.keys(traderNTN).length == 0) return

            if (tradeType.id === TradeTypes.IMPORT) {
                setIImporterName({
                    importerConsigneeName: "",
                    id: 0,
                })
                formRef.current?.valueSetter("iImporterName", {
                    importerConsigneeName: "",
                    id: 0,
                });
            }
            else {
                formRef.current?.valueSetter("exporterName", {
                    importerConsigneeName: "Select Exporter Name",
                    id: 0,
                });
            }

            if (traderNTN.organizations && traderNTN.organizations.length > 0) {
                setSelectImporterAddress(traderNTN.organizations[0].importerConsigneeAddress);
                setExporterAddress({
                    address: "Select Exporter Address",
                    id: 0
                });
                setIImporterAddress({
                    address: "Select Importer Address",
                    id: 0
                })
            }
        } else {
            setTraderData(importerData)

            if (!importerData || !importerData.importerConsigneeAddress || importerData.importerConsigneeAddress.length == 0) return

            setSelectImporterAddress(importerData.organizations[0].importerConsigneeAddress);
            setExporterAddress({
                address: "Select Exporter Address",
                id: 0
            });
            setIImporterAddress({
                address: "Select Importer Address",
                id: 0
            })
        }
    }, [tradeType, traderNTN])

    
    // * Filters for combo box fields 

    const onFilterOriginCountry = (event: any) => {
        const filter: string = event?.filter?.value;

        if (filter) {
            const filteredData = componentOriginCountryData?.filter(
                (country: any) => country?.name?.toString()
                    .toLowerCase()
                    .includes(filter?.toLowerCase())
            );
            if (filteredData?.length > 0) {
                setComponentOriginCountryData(filteredData);
            }
        } else {
            setComponentOriginCountryData(countryData);
        }
    };
  
    const onFilterCountryOfDestination = (event: any) => {
        const filter: string = event?.filter?.value;

        if (filter) {
            const filteredData = componentCountryOfDestination?.filter(
                (country: any) => country?.name?.toString()
                    .toLowerCase()
                    .includes(filter?.toLowerCase())
            );
            if (filteredData?.length > 0) {
                setComponentCountryOfDestination(filteredData);
            }
        } else {
            setComponentCountryOfDestination(countryData);
        }
    };

    const onFilterCities = (event: any) => {
        const filter: string = event.filter.value;

        if (filter) {
            const filteredData = componentCitiesData?.filter(
                (city: any) => city.cityName.toString()
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            );
            if (filteredData.length > 0) {
                setComponentCitiesData(filteredData);
            }
        } else {
            setComponentCitiesData(cityData);
        }
    };

    const onFilterSities = (event: any) => {
        const filter: string = event.filter.value;

        if (filter) {
            const filteredData = siteData?.filter(
                (site: any) => site?.name?.toString()
                    .toLowerCase()
                    .includes(filter?.toLowerCase())
            );
            if (filteredData?.length > 0) {
                setComponentSiteData(filteredData);
            }
        } else {
            setComponentSiteData(siteData);
        }
    };

    const onFilterPortOfLoading = (event: any) => {
        const filter: string = event.filter.value;

        if (filter) {
            const filteredData = portOfLoadingData?.filter(
                (collectorate: any) => collectorate?.description?.toString()
                    .toLowerCase()
                    .includes(filter?.toLowerCase())
            );
            if (filteredData?.length > 0) {
                setComponentPortOfLoading(filteredData);
            }
        } else {
            setComponentPortOfLoading(portOfLoadingData);
        }
    };
    const onFilterCollectorate = (event: any) => {
        const filter: string = event.filter.value;

        if (filter) {
            const filteredData = customCollectorateBaseOnCity?.filter((collectorate: any) =>
                collectorate?.collectorateName?.toString().toLowerCase().includes(filter?.toLowerCase())
            );
            if (filteredData?.length > 0) {
                setComponentCollectorate(filteredData);
            }
        } else {
            setComponentCollectorate(customCollectorateBaseOnCity);
        }
    };
    
    const onFilterShedLocation = (event: any) => {
        const filter: string = event.filter.value;
        if (filter) {
            const filteredData = componentShedLocation?.filter(
                (collectorate: any) => collectorate?.shedName?.toString()
                    .toLowerCase()
                    .includes(filter?.toLowerCase())
            );
            if (filteredData?.length > 0) {
                setComponentShedLocation(filteredData);
            }
        } else {
            setComponentShedLocation(componentCollectorateFiltered);
        }
    };

    // ! End of Filters for combo box fields  

    const handleSearchNTNOpen = (event:any) => {
        event.preventDefault()
        setShowSearchNTNDialog(true);
    };

    const handleSearchNTNClose = () => {
        setShowSearchNTNDialog(false);
    };


    const handleGridSelect = (ntn: string) => {
        console.log('organizationsData: ',organizationsData);
        const getFilteredData = organizationsData?.filter((organization:any)=> organization?.NTN?.toString() == ntn.toString());
        setTraderNTN(getFilteredData[0]);
        formRef.current?.valueSetter("traderNTN", getFilteredData[0]);
        setShowSearchNTNDialog(false);
    };



    const onChange = (event:any,fieldValue='') => {
        console.log('Event',event);
        if(fieldValue === 'importAddress')
        {
            setIImporterAddress(event.value);
        }
        else {
            setExporterAddress(event.value);
        }
    }



    return (
        <div>
            {showSearchNTNDialog ? (
                <SearchNTN
                    func={handleSearchNTNClose}
                    onClickClosed={handleSearchNTNClose}
                    onSelect={handleGridSelect}
                    traderOrganizations={organizationsData}
                />
            ) : null}

            <Form
                ref={formRef}
                onSubmit={onConsignmentHandleSubmit}
                render={(formRenderProps) => (
                    <FormElement>
                        <fieldset className={"k-form-fieldset"}>
                            {/* <Row className="pt-2" xs="1" sm="4">
                                <Col className="pb-2 FormField">
                                    <Field
                                        id={resources_EN.treatment_provider_agency_field}
                                        name={resources_EN.treatment_provider_agency_field}
                                        loading={isLoading}
                                        label={resources_EN.treatment_provider_agency_label}
                                        component={FormComboBox}
                                        textField="name"
                                        dataItemKey="id"
                                        placeholder={resources_EN.treatment_provider_agency_placeholder}
                                        data={agencies}
                                        // disabled={!(siteData.length > 0)}
                                        value={defaultAgency}
                                        disabled={true}
                                        autocomplete={false}
                                    />
                                </Col>
                            </Row> */}
                            {roleCode == UserRole.CustomAgent ? (
                                <Row className="pt-2" xs="1" sm="3">
                                    <Col className="pb-3 FormField">
                                        <Row className="align-items-end no-gutters">
                                            <Col>
                                                <Field
                                                    id="traderNTN"
                                                    name="traderNTN"
                                                    label={resources_EN.treatment_provider_trade_NTN_type_label}
                                                    component={FormComboBox}
                                                    textField="companyNameWithNTN"
                                                    dataItemKey="NTN"
                                                    data={organizationsData}
                                                    // defaultValue={traderNTN}
                                                    placeholder={
                                                        resources_EN.treatment_provider_trade__NTN_type_placeholder
                                                    }
                                                    validator={validator(setTraderNTN)}
                                                    // onChange={(event:any)=>setTraderNTN(event.target.value)}
                                                />
                                            </Col>
                                            <Col className="ml-1" xs="auto">
                                                <Button
                                                    className="border"
                                                    onClick={handleSearchNTNOpen}
                                                    style={{
                                                        height: "31.6px",
                                                        width: "auto"
                                                    }}>
                                                    <FontAwesomeIcon
                                                        icon={faSearch}
                                                        title={resources_EN.treatment_provider_trade_NTN_type_label}
                                                    />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            ) : null}
                            <Row className="pt-2" xs="1" sm="4">
                                <Col className="pb-2 FormField">
                                    <Field
                                        id={resources_EN.treatment_provider_trade_type_field}
                                        name={resources_EN.treatment_provider_trade_type_field}
                                        label={resources_EN.treatment_provider_trade_type_label}
                                        component={FormDropDown}
                                        loading={isLoading}
                                        disabled={isLoading}
                                        placeholder={resources_EN.treatment_provider_trade_type_placeholder}
                                        defaultValue={tradeType}
                                        labelClass={"pb-2"}
                                        data={tradeTypeOptions}
                                        className="form-column"
                                        textField="text"
                                        dataItemKey="id"
                                        autocomplete={false}
                                        validator={validator(setTradeType)}
                                    />
                                </Col>
                                {/* Trade Type Export Case  */}
                                {tradeType?.id == TradeTypes.EXPORT && (
                                    <>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                name={resources_EN.treatment_provider_exporter_name_field}
                                                component={FormComboBox}
                                                label={resources_EN.treatment_provider_exporter_name_label}
                                                loading={isLoading}
                                                // validator={roleCode == UserRole.Trader ? validator(setExporterName): undefined}
                                                validator={validator(setExporterName)}
                                                // defaultValue={exporterName}
                                                value={exporterName}
                                                placeholder={resources_EN.treatment_provider_exporter_name_placeholder}
                                                labelClass={"pb-2"}
                                                disabled={!(traderData.length > 0)}
                                                data={traderData}
                                                textField="importerConsigneeName"
                                                dataItemKey="id"
                                                className="custom-dropdown"
                                            />
                                        </Col>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                name={resources_EN.treatment_provider_exporter_address_field}
                                                value={exporterAddress}
                                                onChange={(event: any) => onChange(event, "exportAddress")}
                                                label={resources_EN.treatment_provider_exporter_address_label}
                                                component={FormDropDown}
                                                placeholder={
                                                    resources_EN.treatment_provider_exporter_address_placeholder
                                                }
                                                loading={isLoading}
                                                labelClass={"pb-2"}
                                                disabled={!(selectImporterAddress?.length > 0)}
                                                data={selectImporterAddress}
                                                className="form-column"
                                                textField="address"
                                                dataItemKey="id"
                                                autocomplete={false}
                                                validator={validator(() => {}, exporterAddress.address)}
                                            />
                                        </Col>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                name="countryOfOrigin"
                                                autocomplete={false}
                                                // disabled={!(countryDataWithPak.length > 0)}
                                                placeholder={
                                                    resources_EN.treatment_provider_country_of_origin_placeholder
                                                }
                                                textField="name"
                                                defaultValue={{ name: "Pakistan", code: "PK" }}
                                                value={countryOfOrigin}
                                                disabled={true}
                                                dataItemKey="code"
                                                loading={isLoading}
                                                component={FormDropDown}
                                                labelClass={"pb-2"}
                                                // validator={validator(setCountryOfOrigin)}
                                                label={resources_EN.treatment_provider_country_of_origin_label}
                                                data={countryDataWithPak}
                                            />
                                        </Col>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                id={resources_EN.treatment_provider_importer_name_field}
                                                placeholder={resources_EN.treatment_provider_importer_name_placeholder}
                                                name="importerName"
                                                maxlength={100}
                                                component={FormInput}
                                                labelClass={"pb-2"}
                                                label={resources_EN.treatment_provider_importer_name_label}
                                                validator={validator(setImporterName)}
                                            />
                                        </Col>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                id={resources_EN.treatment_provider_importer_address_field}
                                                placeholder={
                                                    resources_EN.treatment_provider_importer_address_placeholder
                                                }
                                                name="importerAddress"
                                                maxlength={100}
                                                component={FormInput}
                                                labelClass={"pb-2"}
                                                label={resources_EN.treatment_provider_importer_address_label}
                                                validator={validator(setImporterAddress)}
                                            />
                                        </Col>
                                    </>
                                )}
                                {/* Trade Type Import Case */}
                                {tradeType?.id == TradeTypes.IMPORT && (
                                    <>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                id={"iImporterName"}
                                                name={"iImporterName"}
                                                label={resources_EN.treatment_provider_importer_name_label}
                                                component={FormComboBox}
                                                value={iImporterName}
                                                placeholder={resources_EN.treatment_provider_importer_name_placeholder}
                                                loading={isLoading}
                                                labelClass={"pb-2"}
                                                disabled={!(traderData.length > 0) || isLoading}
                                                // disabled={roleCode == UserRole.CustomAgent}
                                                textField="importerConsigneeName"
                                                dataItemKey="id"
                                                data={traderData}
                                                className="form-column"
                                                autocomplete={false}
                                                validator={validator(setIImporterName)}
                                            />
                                        </Col>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                id={"iImporterAddress"}
                                                name={"iImporterAddress"}
                                                value={iImporterAddress}
                                                label={resources_EN.treatment_provider_importer_address_label}
                                                component={FormDropDown}
                                                placeholder={
                                                    resources_EN.treatment_provider_importer_address_placeholder
                                                }
                                                loading={isLoading}
                                                onChange={(event: any) => onChange(event, "importAddress")}
                                                labelClass={"pb-2"}
                                                disabled={!(selectImporterAddress?.length > 0) || isLoading}
                                                data={selectImporterAddress}
                                                className="form-column"
                                                textField="address"
                                                dataItemKey="id"
                                                autocomplete={false}
                                                validator={validator(() => {}, iImporterAddress.address)}
                                            />
                                        </Col>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                name="countryOfOrigin"
                                                textField="name"
                                                dataItemKey="code"
                                                autocomplete={false}
                                                validator={validator(setCountryOfOrigin)}
                                                disabled={!(componentOriginCountryData.length > 0) || isLoading}
                                                placeholder={
                                                    resources_EN.treatment_provider_country_of_origin_placeholder
                                                }
                                                // defaultValue={countryOfOrigin}
                                                loading={isLoading}
                                                component={FormComboBox}
                                                labelClass={"pb-2"}
                                                onFilterChange={onFilterOriginCountry}
                                                filterable={true}
                                                label={resources_EN.treatment_provider_country_of_origin_label}
                                                data={componentOriginCountryData}
                                            />
                                        </Col>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                id="iExportNameImport"
                                                placeholder={resources_EN.treatment_provider_exporter_name_placeholder}
                                                name="iExportNameImport"
                                                value={iExportNameImport}
                                                maxlength={100}
                                                component={FormInput}
                                                labelClass={"pb-2"}
                                                label={resources_EN.treatment_provider_exporter_name_label}
                                                validator={validator(setIExportName)}
                                            />
                                        </Col>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                id="iExportAddressImport"
                                                placeholder={
                                                    resources_EN.treatment_provider_exporter_address_placeholder
                                                }
                                                name="iExportAddressImport"
                                                maxlength={100}
                                                value={iExportAddressImport}
                                                component={FormInput}
                                                labelClass={"pb-2"}
                                                label={resources_EN.treatment_provider_exporter_address_label}
                                                validator={validator(setIExportAddress)}
                                            />
                                        </Col>
                                    </>
                                )}
                                {/* Trade Type Import Case */}
                                {tradeType?.id == TradeTypes.EXPORT && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            name="countryOfDestination"
                                            labelClass={"pb-2"}
                                            textField="name"
                                            placeholder={
                                                resources_EN.treatment_provider_country_of_destination_placeholder
                                            }
                                            dataItemKey="code"
                                            // defaultValue={countryOfDestination}
                                            loading={isLoading}
                                            component={FormComboBox}
                                            validator={validator(setCountryOfDestination)}
                                            label={resources_EN.treatment_provider_country_of_destination_label}
                                            disabled={!(componentCountryOfDestination.length > 0) || isLoading}
                                            onFilterChange={onFilterCountryOfDestination}
                                            filterable={true}
                                            data={componentCountryOfDestination}
                                        />
                                    </Col>
                                )}
                                {/* Trade Type Import Case */}
                                {tradeType?.id == TradeTypes.IMPORT && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            name="countryOfDestination"
                                            labelClass={"pb-2"}
                                            textField="name"
                                            placeholder={
                                                resources_EN.treatment_provider_country_of_destination_placeholder
                                            }
                                            dataItemKey="code"
                                            defaultValue={defaultCountry}
                                            value={countryOfDestination}
                                            loading={isLoading}
                                            component={FormDropDown}
                                            // validator={validator(setCountryOfDestination)}
                                            label={resources_EN.treatment_provider_country_of_destination_label}
                                            disabled={true}
                                            data={countryDataWithPak}
                                        />
                                    </Col>
                                )}
                                {tradeType?.id == TradeTypes.EXPORT && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            name="portOfLoading"
                                            textField="description"
                                            dataItemKey="collectorateId"
                                            labelClass={"pb-2"}
                                            component={FormComboBox}
                                            loading={isLoading}
                                            placeholder={resources_EN.treatment_provider_port_of_loading_placeholder}
                                            defaultValue={portOfLoading}
                                            validator={validator(setportOfLoading)}
                                            label={resources_EN.treatment_provider_port_of_loading_label}
                                            disabled={!(componentPortOfLoading?.length > 0) || isLoading}
                                            onFilterChange={onFilterPortOfLoading}
                                            filterable={true}
                                            data={componentPortOfLoading}
                                        />
                                    </Col>
                                )}
                                {tradeType?.id == TradeTypes.IMPORT && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            id="iPortOfLoading"
                                            placeholder={resources_EN.treatment_provider_port_of_loading_placeholder}
                                            name="iPortOfLoading"
                                            value={iPortOfLoading}
                                            component={FormInput}
                                            labelClass={"pb-2"}
                                            label={resources_EN.treatment_provider_port_of_loading_label}
                                            validator={validator(setIPortOfLoading)}
                                        />
                                    </Col>
                                )}

                                <Col className="pb-2 FormField">
                                    <Field
                                        name="city"
                                        labelClass={"pb-2"}
                                        textField="cityName"
                                        dataItemKey="cityId"
                                        validator={validator(setCity)}
                                        maxlength={1}
                                        label={resources_EN.treatment_provider_city_name_label}
                                        loading={isLoading}
                                        data={componentCitiesData}
                                        component={FormComboBox}
                                        placeholder={resources_EN.treatment_provider_city_name_placeholder}
                                        autocomplete={false}
                                        disabled={!(componentCitiesData.length > 0) || isLoading}
                                        onFilterChange={onFilterCities}
                                        filterable={true}
                                    />
                                </Col>

                                {/* Trade Type Export Case */}
                                {tradeType?.id == TradeTypes.EXPORT && (
                                    <Col className="pb-2 FormField">
                                        <Field
                                            label={resources_EN.treatment_provider_site_label}
                                            name={resources_EN.treatment_provider_site_field}
                                            placeholder={resources_EN.treatment_provider_site_placeholder}
                                            component={FormComboBox}
                                            loading={isLoading}
                                            data={componentSiteData}
                                            disabled={!(componentSiteData.length > 0) || isLoading}
                                            dataItemKey={"siteId"}
                                            labelClass={"pb-2"}
                                            textField={"name"}
                                            validator={validator(setSite)}
                                            onFilterChange={onFilterSities}
                                            filterable={true}
                                        />
                                    </Col>
                                )}
                                {/* Trade Type Import Case */}
                                {tradeType?.id == TradeTypes.IMPORT && (
                                    <>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                label={resources_EN.treatment_provider_collectorate_label}
                                                name={"collectorate"}
                                                placeholder={resources_EN.treatment_provider_collectorate_placeholder}
                                                component={FormComboBox}
                                                loading={isLoadingCustomCollectorateBaseOnCity}
                                                data={componentCollectorate}
                                                disabled={
                                                    !(componentCollectorate.length > 0) ||
                                                    isLoadingCustomCollectorateBaseOnCity
                                                }
                                                dataItemKey={"collectorateId"}
                                                labelClass={"pb-2"}
                                                textField={"collectorateName"}
                                                onFilterChange={onFilterCollectorate}
                                                filterable={true}
                                                validator={validator(setCollectorate)}
                                            />
                                        </Col>
                                        <Col className="pb-2 FormField">
                                            <Field
                                                label={resources_EN.treatment_provider_location_label}
                                                name="site"
                                                placeholder={resources_EN.treatment_provider_location_placeholder}
                                                component={FormComboBox}
                                                loading={isLoading}
                                                data={componentShedLocation}
                                                disabled={!(componentShedLocation.length > 0) || isLoading}
                                                dataItemKey={"shedLocationId"}
                                                labelClass={"pb-2"}
                                                textField={"shedName"}
                                                onFilterChange={onFilterShedLocation}
                                                filterable={true}
                                                validator={validator(setSite)}
                                            />
                                        </Col>
                                    </>
                                )}
                            </Row>
                        </fieldset>
                    </FormElement>
                )}
            />
        </div>
    );
}

export default React.memo(ConsignmentInformation);
