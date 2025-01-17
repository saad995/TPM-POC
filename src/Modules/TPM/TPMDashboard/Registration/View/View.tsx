import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";

import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import { Row, Col } from "react-bootstrap";
import { Button as BootstrapButton, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    Agency,
    ApplicationCodes,
    DocumentClassificationCode,
    DocumentInfo as DocInfo,
    ImportPermitStatus
} from "Modules/TPM/Constants/Interfaces";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import { updateCatchCertificateStatusAction, ViewCatchCertificateAction } from "./ViewActions";
import { RootStore } from "Store";
import {
    Commodity,
    IChangeCatchCertificateStatusResponseData,
    IUpdateCatchCertificateStatusRequestData,
    IViewRequestData
} from "./ViewInterfaces";

import { useParams } from "react-router";
import SweetAlert from "react-bootstrap-sweetalert";
import { Checkbox, TextArea, TextAreaChangeEvent } from "@progress/kendo-react-inputs";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";

import styles from "./View.module.scss";

import { getDashboardInfoAction, setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { Role } from "Lib/Types/SharedTypes";
import { Action, DocumentInfo, GeneralCommentsEnum, CatchCertificateStatus } from "Modules/TPM/Constants/Interfaces";
import Loader from "Elements/Basic/Loader/Loader";
import GeneralComments from "Modules/TPM/Common/GeneralComments/GeneralComments";
import Config from "Config";
import ViewPanel from "Elements/Basic/ViewPanel/ViewPanel";
import { IAvailableCommandsType } from "Modules/Common/Workflow/WorkflowInterfaces";
import WorkflowBar from "Modules/Common/Workflow/WorkflowBar/WorkflowBar";
import { WFCommands } from "Modules/Common/Workflow/Constants/WFCommands";
import { WFStates } from "Modules/Common/Workflow/Constants/WFStates";
import { WFParameters } from "Modules/Common/Workflow/Constants/WFParameters";
import Unauthorized from "Modules/TPM/Common/Unauthorized/Unauthorized";
import { Hint } from "@progress/kendo-react-labels";
import { clearReducerState, deleteDocumentAction, uploadDocumentAction } from "Elements/Basic/File/FileAction";
import _ from "lodash";
import Paths from "Modules/TPM/Constants/Paths";
// import { ICatchCertificatePrintRequestData, IPrintRequestData } from "Modules/TPM/Common/PrintTemplate/PrintTemplateInterfaces";
import validation from "Modules/TPM/Constants/validation";
import BasicInfoRibbon from "./BasicInfo/BasicInfoRibbon";
import { IUpdateStoreObject } from "Modules/TPM/Common/UpdateStoreObject/UpdateStoreObjectInterfaces";
import GridView from "Elements/Basic/GridView/GridView";
import Column from "Elements/Basic/GridView/Columns/Column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import ExportPdf from "Modules/TPM/Common/ExportPdf/ExportPdf";
import { GetTreatmentTypeByProviderIdAction } from "Modules/TPM/Common/CommonApi/CommonApiAction";
import { TreatmentType } from "../CreateEditTPMRegistration/CreateEditTPMRegistrationInterfaces";

const View = (props: { id: number }) => {
    let param: any = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    let initDocumentID = 0;

    // Hooks
    const history = useHistory();
    const URL = Paths.Registration;

    const emptyCommand: IAvailableCommandsType = {
        classifier: "",
        isForSubprocess: false,
        commandName: "",
        processId: "",
        validForActivityName: "",
        validForStateName: "",
        displayName: "",
        style: ""
    };

    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );

    const gridInfoStoreReducer: IUpdateStoreObject = useSelector((state: RootStore) => state.updateStoreReducer.store);
    
    const loading = useSelector((state: RootStore) =>state.CommonApiReducer.getTreatmentTypesByTPIdLoading);
    
    const store = useSelector((state: RootStore) => state);
    const { CommonApiReducer, CreateEditTPRegistrationReducer, InitiateTreatmentRequestReducer } = store;
    const { treatmentProviderBusines, treatmentTypes, getTreatmentTypesByTPId } = CommonApiReducer;
    const {confirmTreatmentTypes, saveTreatmentType} = CreateEditTPRegistrationReducer;
    const {cities} = InitiateTreatmentRequestReducer;
    const [show, setShow] = React.useState(false);
    const [type, setType] = useState("");
    const [isSuccess, setSuccess] = React.useState(false);
    const [isDanger, setDanger] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [sweetAlertTitle, setSweetAlertTitle] = React.useState("");
    const [sweetAlertMessage, setSweetAlertMessage] = React.useState("");
    const [message, setMessage] = useState("");
    const [remarks, setRemarks] = useState("");
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const [isFileUploadedValid, setIsFileUploadedValid] = useState(false);
    const [isItem, setItem] = useState(false);
    const [showCloseApplication, setShowCloseApplication] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [isConfirm, setConfirmation] = useState(false);
    const [isDialogVisible, setVisibleDialog] = useState(false);
    const agencyId: number = Agency.DPP;
    const [command, setCommand] = useState(emptyCommand);
    const [gridInfoStore, setGridInfoStore] = useState(gridInfoStoreReducer);

    // State Name Decision On The Basic of Screen
    let stateName = []; // Fix This
    if (userRole === Role.Officer) {
        stateName.push(WFStates.Quarantine_Officer_Queue);
        stateName.push(WFStates.Trader_To_Do_List);
    }
    const pathName = location.pathname;
    // const gridInfoStore = gridInfoStoreHistory != null ? gridInfoStoreHistory : gridInfoStoreReducer;

    const requestData: IViewRequestData = {
        catchCertificateId: initDocumentID.toString(),
        roleCode: userRole,
        sdID: history?.location?.state?.sdID,
        agencyId: Agency.MFD
    };

    const setDataInStore=()=>{
        if (history.location.state != null) {
            initDocumentID = props.id > 0 ? props.id : Number(history.location.state.id); // Number(param.id);
            const locationGridInfoStoreHistory = history.location.state;
    
            // Setting localstorage to get request data on reload
            localStorage.setItem("gridInfoStore", JSON.stringify(locationGridInfoStoreHistory));
            // Setting localstorage to get request data on reload
            localStorage.setItem("gridInfoStoreHistoryObject", JSON.stringify(locationGridInfoStoreHistory));
        } 
    }
    const fetechDataFromStore=()=>{
        if (history.location.state != null) {
            // Set location state in store
             setDataInStore()
        }
        else{
            // Retrive request data if already set in previous request
            const gridInfoStoreHistoryObject = localStorage.getItem("gridInfoStore");
            if(gridInfoStoreHistoryObject && !_.isEmpty(gridInfoStoreHistoryObject)){
                const gridInfoStoreHistory=JSON.parse(gridInfoStoreHistoryObject);
                setGridInfoStore(gridInfoStoreHistory);
            }
        }
    }

    // useEffect(() => {
    //     if (isConfirm) {
    //         if (type === Action.Approve) {
    //             const req: IUpdateCatchCertificateStatusRequestData = {
    //                 command: command,
    //                 initDocumentId: Number(initDocumentID),
    //                 statusId: CatchCertificateStatus.APPROVED,
    //                 roleCode: userRole,
    //                 agencyId: agencyId,
    //                 comments: remarks,
    //                 rights: ""
    //                 // docTypeCode: String(DocInfo.PEST_RISK_ANALYSIS_CERTIFICATE_TYPE_CODE),
    //                 // fileId: uploadedFile ? (uploadedFile.fileNestFileIds ? uploadedFile.fileNestFileIds : "") : ""
    //             };
    //             dispatch(
    //                 updateCatchCertificateStatusAction(req, (response: IChangeCatchCertificateStatusResponseData) => {
    //                     if (response.code == 200) {
    //                         setShow(!show);
    //                         setIsCompleted(true);
    //                         setSweetAlertTitle(resources_EN.sweet_Alert_title_Approved);
    //                         setSuccess(true);
    //                         setDanger(false);
    //                         setInfo(false);
    //                         setSweetAlertMessage(resources_EN.view_catch_certificate_approved_mesage);
    //                     } else {
    //                         setShow(!show);
    //                         setIsCompleted(true);
    //                         setSweetAlertTitle(resources_EN.sweet_Alert_title_Approved);
    //                         setSuccess(false);
    //                         setDanger(true);
    //                         setInfo(true);
    //                         setSweetAlertMessage(resources_EN.view_catch_certificate_approved_failure_mesage);
    //                     }
    //                 })
    //             );
    //         } else if (type === Action.Reject) {
    //             const req: IUpdateCatchCertificateStatusRequestData = {
    //                 command: command,
    //                 initDocumentId: Number(initDocumentID),
    //                 statusId: CatchCertificateStatus.CANCELLED,
    //                 roleCode: userRole,
    //                 agencyId: agencyId,
    //                 comments: remarks,
    //                 rights: ""
    //                 // docTypeCode: String(DocInfo.PEST_RISK_ANALYSIS_CERTIFICATE_TYPE_CODE),
    //                 // fileId: uploadedFile ? (uploadedFile.fileNestFileIds ? uploadedFile.fileNestFileIds : "") : ""
    //             };
    //             dispatch(
    //                 updateCatchCertificateStatusAction(req, (response: IChangeCatchCertificateStatusResponseData) => {
    //                     if (response.code == 200) {
    //                         setShow(!show);
    //                         setSweetAlertTitle(resources_EN.sweet_Alert_title_Cancelled);
    //                         setSuccess(true);
    //                         setDanger(false);
    //                         setInfo(false);
    //                         setSweetAlertMessage(resources_EN.view_catch_certificate_cancelled_mesage);
    //                     } else {
    //                         setShow(!show);
    //                         setSweetAlertTitle(resources_EN.sweet_Alert_title_Cancelled);
    //                         setSuccess(false);
    //                         setDanger(true);
    //                         setInfo(true);
    //                         setSweetAlertMessage(resources_EN.view_catch_certificate_cancelled_failure_mesage);
    //                     }
    //                 })
    //             );
    //         }

    //         setConfirmation(false);
    //     }
    // }, [isConfirm]);


    const sweetAlertOnConfirm = () => {
        setShow(false);
        if (!isInfo) {
            history.push(Paths.CatchCertificate.Grid);
        }
    };

    useEffect(() => {
        console.log("condition false===>>>",gridInfoStore,userRole)
        if (gridInfoStore && Object.keys(gridInfoStore).length > 0 && userRole !== "") {
            const { id, initDocumentID} = gridInfoStore;
            console.log("condition true===>>>",gridInfoStore,userRole)
            if (id || initDocumentID) {
                let req = {
                    treatmentProviderId: (id && id !== '' && id !== null) ? id : initDocumentID , //Provider id
                    initDocumentTypeCode: DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE,
                    roleCode: userRole,
                    treatmentTypeRegistrationId: "", //When get provider detail and it's treatment types
                    treatmentProviderUserRoleId: "",
                    rights: ""
                };
                console.log("condition req ===>>>",req)

                dispatch(
                    GetTreatmentTypeByProviderIdAction(req, () => {
                        setIsUnauthorized(true);
                    })
                );
            }
        }
    }, [gridInfoStore, userRole]);

    useEffect(() => {
        dispatch(setPageTitleAction("View Treatment Provider Information"));
        fetechDataFromStore();

        if (!userRole) {
            dispatch(getDashboardInfoAction(() => 0));
        }
        return () => {
            dispatch(clearReducerState());
        };
    }, []);



    const viewDataMapping = (treatmentTypeList:any)=>{

        let list:any = [];

        list = treatmentTypeList.map((treatmentType:any)=>{
            Object.keys(treatmentType)?.map((key:any)=>{
                if(key == "name" && treatmentType[key] == TreatmentType.Fumigation){
                  treatmentType = {...treatmentType, [key]:  treatmentType["displayName"] ? treatmentType["displayName"] : treatmentType[key]};
                }else if(key == 'isSubType'){
                    treatmentType = {...treatmentType, isSubType: treatmentType?.isSubType ? "Yes" : "-"};
                }
                treatmentType = {...treatmentType, [key]: (treatmentType[key] === null || treatmentType[key] == '') ? '-' : treatmentType[key] };
          })

            return treatmentType;

        })

        return list;
    }

    console.log("history?.location?.state",history?.location?.state);
    console.log("history ===>>>>",history);
    console.log("gridInfoStore ===>>>>",gridInfoStore);
    console.log("getTreatmentTypesByTPId ===>>>>",getTreatmentTypesByTPId)
    console.log("getTreatmentTypesByTPId?.agencyBusinessRegistration",getTreatmentTypesByTPId?.agencyBusinessRegistration)

    return (
        <>
            {loading ? (
                <Loader />
            ) : isUnauthorized ? (
                <Unauthorized />
            ) : (
                <Container className={`${styles.viewCatchCertificate}`} fluid>
                    {/* <SweetAlert
                        success={isSuccess}
                        danger={isDanger}
                        info={isInfo}
                        title={sweetAlertTitle}
                        show={show}
                        onConfirm={sweetAlertOnConfirm}>
                        <label>{sweetAlertMessage}</label>
                    </SweetAlert> */}

                    {/* <DailogComponent
                        id="dialog-cancel"
                        confirm={setConfirmation}
                        isVisible={isDialogVisible}
                        closeDailog={setVisibleDialog}
                        message={message}
                    /> */}

                    <BasicInfoRibbon data={getTreatmentTypesByTPId?.agencyBusinessRegistration} />
                    <>
                        <Row>
                            <Col className="mt-4" xs="1" sm="2" md="3" lg="4" xl="12">
                                <ViewPanel
                                    heading={resources_EN.TPM_view_treatment_provider_heading}
                                    data={ Object.assign({}, getTreatmentTypesByTPId?.agencyBusinessRegistration)}
                                    labels={[
                                        resources_EN.TPM_view_treatment_provider_business_agency_business_label,
                                        resources_EN.TPM_view_treatment_provider_business_agency_company_label,
                                        resources_EN.TPM_view_treatment_provider_business_agency_ntn_label,
                                        resources_EN.TPM_view_treatment_provider_business_agency_principalActivity_label,
                                    ]}
                                    keys={
                                        [
                                        { field: "businessName" },
                                        { field: "companyName" },
                                        { field: "ntn" },
                                        { field: "principalActivity" },
                                        { field: "treatmentProvider" },
                                    ]
                                    }
                                />
                            </Col>
                        </Row>
                        <Row className="mx-0">
                            <Col
                                className="p-0 rounded  grid-col mt-4 mx-0"
                                xs="12"
                                style={{
                                    background: "white",
                                    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.08)"
                                }}>
                                <GridView
                                    heading={resources_EN.TPM_view_treatment_type_items_grid_Heading}
                                    skipColumn={0}
                                    takeColumn={10}
                                    data={getTreatmentTypesByTPId?.treatmentTypes ? viewDataMapping(getTreatmentTypesByTPId?.treatmentTypes) :  []}
                                    className={"shadow-sm h-100 purpleGrid " + styles.gridNoScroller}
                                    isSearchEnabled={false}
                                    searchableColumns={[]}
                                    pageable={true}
                                    reorderable={true}
                                    resizable={true}
                                    sortable={true}
                                    style={{ height: "50vh" }}>
                                    <Column
                                        title={resources_EN.TPM_view_treatment_type_vessels_grid_name}
                                        field="name"
                                        minWidth={120}
                                        maxWidth={20}
                                        locked={true}
                                        sort={true}
                                        reorderable={true}
                                        resizable={true}
                                    />
                                    <Column
                                        title={resources_EN.TPM_view_treatment_type_items_grid_plantAddress}
                                        field="plantAddress"
                                        minWidth={120}
                                        maxWidth={20.15}
                                        sort={true}
                                        reorderable={true}
                                        resizable={true}
                                    />
                                    <Column
                                        title={resources_EN.TPM_view_treatment_type_vessels_grid_city}
                                        field="city"
                                        minWidth={120}
                                        maxWidth={20}
                                        sort={true}
                                        reorderable={true}
                                        resizable={true}
                                    />
                                    <Column
                                        title={resources_EN.TPM_view_treatment_type_vessels_grid_validUpto}
                                        field="validUpto"
                                        minWidth={120}
                                        maxWidth={20}
                                        sort={true}
                                        reorderable={true}
                                        resizable={true}
                                    />
                                    <Column
                                        title={resources_EN.TPM_view_treatment_type_vessels_grid_isSubtype}
                                        field="isSubType"
                                        minWidth={120}
                                        maxWidth={20}
                                        sort={true}
                                        reorderable={true}
                                        resizable={true}
                                    />
                                </GridView>
                            </Col>
                            
                        </Row>
                    </>
                </Container>
            )}
        </>
    );
};

export default View;
