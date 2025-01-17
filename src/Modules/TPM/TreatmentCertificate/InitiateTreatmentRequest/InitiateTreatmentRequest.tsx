import { faAddressBook, faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommodityInformation from "./CommodityInfo/CommodityInformation";
import ConsignmentInformation from "./ConsignmentInfo/ConsignmentInformation";
import TreatmentInformation from "./TreatmentInfo/TreatmentInformation";
// Syles
import { Form, FormElement } from "@progress/kendo-react-form";
import { LegacyRef, useEffect, useRef, useState } from "react";
import styles from "../../../TPM/TreatmentCertificate/GeneralView/View/View.module.scss";
import "./InitiateTreatmentRequest.scss";
import InitiateTreatmentRequestTableView from "./InitiateTreatmentRequestTableView/InitiateTreatmentRequestTableView";
import {
    getAgencies,
    getCities,
    getCountries,
    getCountriesIncludingPak,
    getHSCodeListData,
    getImporterList,
    getOrganizationOnNTNAction,
    getOrganzationDataOnNTNList,
    getPortOfLoadingListData,
    getShedLocationDataList,
    getSites,
    getTreatmentProviderList,
    getTreatmentTypesList,
    getUomByHsCode,
    sendInitiateRequest
} from "./InitiateTreatmentRequestAction";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import SweetAlert from "react-bootstrap-sweetalert";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";
import _ from "lodash";
import { IGetDashboardInfoResponseData, IUserRole } from "Layouts/AppLayout/AppLayoutInterfaces";
import { infoAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import { clearAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import Auth from "Lib/Net/Auth";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import { getSingleTreatmentRequestData } from "../PendingTreatmentRequestList/PendingTreatmentRequestListAction";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { setToastr } from "Modules/TPM/Constants/ToastrConfig";
import { ToasterTypes } from "Modules/Common/Helpers/ToastrConfig";
import { TradeTypes } from "Modules/Common/CommonUtility";
import { setSelectedTabValue } from "../TreatmentCertificatesActions";
import Paths from "Modules/TPM/Constants/Paths";
import LoaderComponent from "Elements/Basic/Loader/Loader";
import Unauthorized from "Modules/Common/Unauthorized/Unauthorized";

export default function InitiateTreatmentRequest(props: any) {
    const dispatch = useDispatch();
    /**
     * * Consignment form and treatment information form refferences
     */
    let form1 = useRef<any>(null);
    let form2 = useRef<any>(null);
    let formPropRefferenceCommodity: any = useRef(null);
    /**
     * ! End form and treatment information form refferences
     */

    /**
     * * States from redux
     */
    // * Get Loading State of Data From Store
    const isLoading: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.loading);
    // *Get Alert  Data From Store
    const alertData: any = useSelector((state: RootStore) => state.alert);
    // *Get errorData  Data From Store
    const errorData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.errorData);
    // *Get treatmentProvider  Data From Store
    const getTreatmentProviderData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.treatmentProviders);
    // *Get treatmentType  Data From Store
    const getTreatmentTypeData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.treatmentTypes);
    // *Get UOM  Data From Store
    const getUomData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.uomData);
    // *Get HSCODE Data From Store
    const hsCodeData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.hsCodeList);
    // *Get Countries Data From Store
    const countryData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.countryList);
    // *Get importer Data From Store
    const importerData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.importerData);
    // *Get organizations on NTN DATA From Store
    const organizationsData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.getOrganizationOnNTN);
    // *Get response Data From Store
    const submitResponseData: any = useSelector(
        (state: RootStore) => state.InitiateTreatmentRequestReducer.initiateReqRes
    );
    // *Get City Data From Store
    const cityData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.cities);
    // *Get Port Of Loading Data From Store
    const portOfLoadingData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.portOfLoadingData);
    // *Get City Data From Store
    const countryDataWithPak: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.countryListIncludingPak);
    // *Get Site Data From Store
    const siteData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.sites);
    // *Get Shed Location Data From Store
    const shedLocationData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.shedLocations);
    // *Get Agency Data From Store
    const agencyData: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.agencies);
    // *Get custom collectorate Data From Store
    const customCollectorateBaseOnCity: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.customCollectorateBaseOnCity);
    // *Get custom collectorate Data From Store
    const isLoadingCustomCollectorateBaseOnCity: any = useSelector((state: RootStore) => state.InitiateTreatmentRequestReducer.isCustomCollectorateLoading);
    // *Get Role Data From Store
    const roles: IUserRole[] = useSelector((state: RootStore) => state.dashboardReducer.dashboardInfo.roles);
    // *Get Dashboard info Data From Store
    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );
    // * get userRole Id 
    const getUserRoleId = Auth.getUserRoleId();
    

    /**
     * ! End of Redux States
     */
        // ** CA States 
    const [traderNTN, setTraderNTN] = useState<any>({
        importerConsigneeName: "Select Trader NTN",
        importerConsigneeCellNo: "",
        organizations:[],
    });
    

    /**
     * * Dialog states
     *  */
    const [sweetAlertTitle, setSweetAlertTitle] = useState("");
    const [sweetAlertMessage, setSweetAlertMessage] = useState("");
    const [isDanger, setIsDanger] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInfo, setIsInfo] = useState(false);
    const [show, setIsShow] = useState(false);
    const [reasonDialog, setIsReasonDialog] = useState(false);

    /**
     * ! End of Dialog states
     *  */

    /**
     * * State for Holding complete initaite form data
     */
    const [initiateRequestData, setInitiateRequestData] = useState<any>({});
    const [initiateRequestData2, setInitiateRequestData2] = useState<any>({});
    const [exporterAddress, setExporterAddress] = useState({
        address: "Select Exporter Address",
        id: 0
    });
    const [iImporterAddress, setIImporterAddress] = useState({
        address: "Select Importer Address",
        id: 0
    });
    /**
     * ! End of State for Holding complete initaite form data
     */
    const [productCodeList, setProductCodeList] = useState([]);

    /**
     * * Form Value Refference
     *  */
    let formPropRefference: any = useRef(null);

    /**
     * * Table View For Stored Informations State
     *  */
    const [storeAllInformationRequest, setStoreAllInformationRequest] = useState<any>([]);
    /**
     * ! End of Table View For Stored Information State
     *  */

    /**
     * * Useffect Event trigger on get initial data for initate form request
     */
    /**
     * * global country
     */
    const [countryOfOrigin, setCountryOfOrigin] = useState({ code: "", name: "Select Country" });

    const [countryOfDestination, setCountryOfDestination] = useState({ code: "", name: "Select Country" });

    useEffect(() => {
        const req: any = {};
        dispatch(setPageTitleAction("Initiate Treatment Request"));
        dispatch(getAgencies(req));
        dispatch(getSites({ agencyId: "2" }));
        dispatch(getCities({ agencyId: 2 }));
        dispatch(getImporterList({ roleCode: dashboardInfo?.currentRole }));
        if(dashboardInfo?.currentRole == UserRole.CustomAgent){
            dispatch(getOrganzationDataOnNTNList({ roleCode: dashboardInfo?.currentRole }));
        }
        dispatch(getTreatmentProviderList({ "id": 0 }));
        dispatch(getShedLocationDataList({}))
        dispatch(getTreatmentTypesList({ "id": 0 }));
        dispatch(getCountries({}));
        dispatch(getCountriesIncludingPak({}));
    }, []);

    /**
     * ! End of Useffect Event trigger on get initial data for initate form request
     */

    useEffect(() => {

        if (alertData?.variant == "success") {
            setSweetAlertTitle('Success');
        }
        if (alertData.variant == "danger") {
            setSweetAlertTitle('Failed');
        }

    }, [alertData]);

    /**
     * * onHandleDelete delete table view data locally.
     */
    const onHandleDelete = (data: any) => {
        const { id } = data;
        const filteredData = storeAllInformationRequest.filter(
            (info: any) => info?.id != id
        );
        setStoreAllInformationRequest(filteredData);
    };

    /**
     * * NOTE: will trigger on when treatment form will submit and this will save the state of form.
     */
    const onTreatmentHandleSubmit = (data: any) => {
        const initiateRequestDataClone: any = JSON.parse(JSON.stringify(initiateRequestData));
        initiateRequestDataClone["treatmentInformation"] = data;
        setInitiateRequestData(initiateRequestDataClone);
    };
    /**
     * * NOTE: will trigger on when consignment form will submit and this will save the state of form.
     */
    const onConsignmentHandleSubmit = (data: any) => {
        const initiateRequestDataClone: any = JSON.parse(JSON.stringify(initiateRequestData2));
        initiateRequestDataClone["consignmentInformation"] = JSON.parse(JSON.stringify(data));

        setInitiateRequestData2(initiateRequestDataClone);
    };
    /**
     * * NOTE: will trigger on forms will submit. this will check all the validation and submit accordingly.
     */
    const onHandleSubmit = () => {
        form1.current.onSubmit();
        form2.current.onSubmit();

        if (form1.current.isValid() && form2.current.isValid()) {
            setIsReasonDialog(true);
        }
    };
    /**
     * * NOTE: This will hit the network request to the server for initiate form request.
     */
    const initiateRequestSend = async () => {

   
        const {
            expectedPlaceOfTreatment,
            tentativeDateOfTreatment,
            treatmentProvider,
            treatmentType,
            treatmentSubType,
            additionalDeclaration
        } = initiateRequestData?.treatmentInformation;
        const {
            city,
            // exporterAddress,
            exporterName,
            importerAddress,
            importerName,
            portOfLoading,
            site,
            tradeType,
        } = initiateRequestData2?.consignmentInformation;
        let CommodityInformation = storeAllInformationRequest.map((commodity: any) => {
            let commodityInfo = {...commodity };
            commodityInfo.containerNumber = commodity.containerNumber == ""  ? null : commodity.containerNumber;
            delete commodityInfo.hsCodePlusProductCode;
            delete commodityInfo.id;
            delete commodityInfo.customContainerNumber;
            return commodityInfo;
        });
        if (CommodityInformation?.length < 1) {
            dispatch(
                setToastr({
                    title: "Error",
                    message: "Please add commodity.",
                    type: ToasterTypes.ERROR
                })
            );
            return;
        }
        // TODO: This junk of data for now is for testing purpose once api successfully integrate. I will make it clean.
        let data: any = {
            initDocumentTypeCode: "ABC", // string - 3 characters - nullable | // * constant
            initDocumentID: 0, // long - not null // * constant
            treatmentRequestTypeCode: "T02", // string - 10 characters - not null // * success
            tradeTypeID: tradeType?.id, // int - not null // * get form
            agencyID: 0, // int - not null // * get form
            sdId: null, // long - nullable // * zero because this is pre SD case
            sdDocumentNumber: null, // string - 50 characters max - nullable // ** empty because this is pre SD case
            consigneeName: "", // string - 100 characters max - not null // ! temp : importername
            consigneeAddress: "", // string - 500 characters max - not null // ! temp : importerAddress
            consignorName: "",
            consignorAddress: "",
            portOfLoading: "", // int - not null // * get form
            originCountryCode: countryOfOrigin?.code, // int - not null // * get form
            destinationCountryCode: countryOfDestination?.code, // int - not null // * get form
            cityID: 0, // int - not null // * get form
            agencySiteID: 0, // int - not null // * get form
            ntnftnepz: "",
            shedLocationID: tradeType?.id == TradeTypes.IMPORT ? site?.shedLocationId : 0, // int - not null // ! required discussion
            treatmentTypeID: 1, // int - not null  // * get from
            treatmentProviderID: 1, // int - Nullable  // * get form
            dateOfTreatment: "2023-06-14T13:34:00.000", // datetime - not NULL // * get form
            placeOfTreatment: expectedPlaceOfTreatment, // string - 250 characters max - nullable // * get form
            treatmentRequestRemarks: "", // string - max - nullable // * remakrs will be for IO
            traderUserRoleID: 0, // int - nullable // * set as zero on backend call.
            agentUserRoleID: 0, // int - nullable // * set as zero on backend call.
            createdByRoleCode: dashboardInfo?.currentRole, // string - 3 characters - nullable // * currentRole need to get trader id from user token
            treatmentRequestItems: [
                {
                    hsCode: "", // string - 8 characters - not null
                    hsCodeExt: "", // string - 14 characters - not null // ! currently we are sending it empty need to disucss
                    containerNumber: "", // string - 11 characters - not null
                    itemDescription: "", // string - max 500 characters - nullable
                    terrifDescription: "", // string - max 500 characters - nullable // ! currently we are sending it empty need to disucss
                    declaredDescription: "", // string - max 500 characters - nullable
                    itemDescriptionExt: "", // string - max 500 characters - nullable // * need to set on product hs code change
                    uomCode: "", // string - 11 characters - not null
                    quantity: 0.0 // decimal(16,4) - not null
                }
            ]
        };
        data.tradeTypeID = tradeType?.id;
        data.consigneeAddress = tradeType?.id == TradeTypes.EXPORT ? importerAddress : iImporterAddress?.address;
        data.consigneeName = tradeType?.id == TradeTypes.EXPORT ? importerName : initiateRequestData2?.consignmentInformation?.iImporterName?.importerConsigneeName;
        data.consignorName = tradeType?.id == TradeTypes.EXPORT ? exporterName?.importerConsigneeName : initiateRequestData2?.consignmentInformation?.iExportNameImport;       
        data.consignorAddress = tradeType?.id == TradeTypes.EXPORT ? exporterAddress?.address : initiateRequestData2?.consignmentInformation?.iExportAddressImport;
        data.portOfLoading = tradeType?.id == TradeTypes.EXPORT ? portOfLoading?.description : initiateRequestData2?.consignmentInformation?.iPortOfLoading;
        data.destinationCountryCode = countryOfDestination?.code || initiateRequestData2?.consignmentInformation?.countryOfDestination?.code;
        data.originCountryCode = countryOfOrigin?.code || initiateRequestData2?.consignmentInformation?.countryOfOrigin?.code;
        data.agencySiteID = tradeType?.id == TradeTypes.EXPORT ? site?.siteId : 0;
        data.cityID = city?.cityId;
        data.agencyID = 2;
        data.treatmentProviderID = treatmentProvider?.id;
        data.treatmentTypeID = treatmentType?.id;
        data.treatmentSubTypeID = treatmentSubType?.id;
        data.dateOfTreatment = tentativeDateOfTreatment;
        data.treatmentRequestItems = [...CommodityInformation];
        if(tradeType?.id == TradeTypes.IMPORT){
            data.collectorateID = initiateRequestData2?.consignmentInformation?.collectorate?.collectorateId;
        }
        if(dashboardInfo?.currentRole == UserRole.CustomAgent){
            data.ntnftnepz = traderNTN?.NTN;
            data.traderUserRoleID = traderNTN?.userRoleId;
            data.agentName = dashboardInfo.companyName;
        }
        data.additionalTreatmentInfo = additionalDeclaration;
        // data.



        if (!_.isEmpty(data)) {
            const result = dispatch(sendInitiateRequest(data));
            setIsReasonDialog(false);



            // if (typeof result !== "undefined") {
            // setSweetAlertMessage("Treatment Request Submitted");
            // setIsSuccess(true);
            // setIsShow(true);
            // }
        }
    };
    /**
     * ! End of initiate form request.
     */
    const onConfirm = () => {

        if (alertData?.description && alertData?.visible && alertData?.variant == "danger") {

            dispatch(clearAlert({ code: "", description: "" }));
        } else if (alertData?.description && alertData?.visible && alertData?.variant == 'success') {
            props.history.push("/TPM/TreatmentCertificates/");
            dispatch(setSelectedTabValue({ selectedValue: 1 }));
            dispatch(clearAlert({ code: "", description: "" }));
        }
    };

    console.log("Agent Name",dashboardInfo.companyName);
    return (
        <div className="initTreatmentContainer">
            <SweetAlert
                success={alertData?.variant == "success" ? true : false}
                danger={alertData?.variant == "danger" ? true : false}
                info={isInfo}
                title={sweetAlertTitle}
                show={alertData?.visible}
                onConfirm={onConfirm}>
                <label className="customFont" >{sweetAlertMessage || alertData?.description}</label>
            </SweetAlert>
            <DailogComponent
                btnName1="Cancel"
                customClassName={styles.customDialogClass}
                btnName2="Confirm"
                id="dialog-cancel"
                disabled={isLoading}
                confirm={initiateRequestSend}
                isVisible={reasonDialog}
                closeDailog={setIsReasonDialog}>
                <p className="text-center customFont">Are you sure you want to submit the Treatment request? </p>
            </DailogComponent>

            <div className="m-3 pb-2 consignment-container">
                <h3 className="section-head">Consignment Information</h3>
                <ConsignmentInformation
                    organizationsData={organizationsData}
                    formPropRefferenceCommodity={formPropRefferenceCommodity}
                    isLoadingCustomCollectorateBaseOnCity={isLoadingCustomCollectorateBaseOnCity}
                    customCollectorateBaseOnCity={customCollectorateBaseOnCity}
                    shedLocationData={shedLocationData}
                    portOfLoadingData={portOfLoadingData}
                    countryOfDestination={countryOfDestination}
                    setCountryOfDestination={setCountryOfDestination}
                    countryOfOrigin={countryOfOrigin}
                    traderNTN={traderNTN}
                    setTraderNTN={setTraderNTN}
                    roleCode={dashboardInfo?.currentRole}
                    setCountryOfOrigin={setCountryOfOrigin}
                    isLoading={isLoading}
                    countryDataWithPak={countryDataWithPak}
                    formRef={form1}
                    onConsignmentHandleSubmit={onConsignmentHandleSubmit}
                    countryData={countryData}
                    importerData={importerData}
                    cityData={cityData}
                    siteData={siteData}
                    agencies={agencyData}
                    setIImporterAddress={setIImporterAddress}
                    iImporterAddress={iImporterAddress}
                    exporterAddress={exporterAddress}
                     setExporterAddress={setExporterAddress}

                />
            </div>
            <div className="m-3 pb-2 consignment-container">
                <h3 className="section-head">Treatment Information</h3>
                <TreatmentInformation
                    getTreatmentProviderData={getTreatmentProviderData}
                    getTreatmentTypeData={getTreatmentTypeData}
                    isLoading={isLoading}
                    formRef={form2}
                    onTreatmentHandleSubmit={onTreatmentHandleSubmit}
                />
            </div>
            <div className="m-3 consignment-container">
                <h3 className="section-head">Commodity Information</h3>
                <CommodityInformation
                    formPropRefferenceCommodity={formPropRefferenceCommodity}
                    isLoading={isLoading}
                    storeAllInformationRequest={storeAllInformationRequest}
                    setStoreAllInformationRequest={setStoreAllInformationRequest}
                    getUomData={getUomData}
                    productCodeList={productCodeList}
                    hsCodeData={hsCodeData}
                    setProductCodeList={setProductCodeList}
                />
            </div>

            <div className="form-table-data-container m-4">
                <InitiateTreatmentRequestTableView onHandleDelete={onHandleDelete} data={storeAllInformationRequest} />
                <div className="d-flex justify-content-end" >
                    <button
                        id="backbutton"
                        title="Back"
                        onClick={()=> props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
                        className={`${styles.floatingBtnPrimary}`}>
                        <FontAwesomeIcon icon={faArrowLeft} className={`my-1 mr-1 ${styles.iconFont}`} />
                        <span>Back</span>
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={onHandleSubmit}
                        className={`ml-2 ${styles.floatingBtnPrimary} `}>
                        <FontAwesomeIcon icon={faAddressBook} className={"my-1 mr-1"} />
                        <span>Submit Request</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
