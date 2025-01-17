import {
    faArrowAltCircleUp,
    faArrowLeft,
    faBackward,
    faBookReader,
    faCheck,
    faCheckCircle,
    faImage,
    faSave,
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@progress/kendo-react-inputs";
import { clearAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";
import LoaderComponent from "Elements/Basic/Loader/Loader";
import { IGetDashboardInfoResponseData } from "Layouts/AppLayout/AppLayoutInterfaces";
import { Role } from "Lib/Types/SharedTypes";
import {
    TradeTypes,
    checkEmptyContainer,
    conditionalModalHeading,
    consignmentModeType,
    formTextLimit,
    tradeTypeOptions,
    treatmentRequestsStatus,
    treatmentTypes,
    treatmentSubTypes,
    workflowButtonsStyling,
    conductedType,
    fumigationConformValue
} from "Modules/Common/CommonUtility";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import PrintPreview from "Modules/Common/PrintPreview/PrintPreview";
import { IPrintPreviewRequestData } from "Modules/Common/PrintPreview/PrintPreviewInterfaces";
import { WFCommands } from "Modules/Common/Workflow/Constants/WFCommands";
import { WFParameters } from "Modules/Common/Workflow/Constants/WFParameters";
import { WFStates } from "Modules/Common/Workflow/Constants/WFStates";
import WorkflowBar from "Modules/Common/Workflow/WorkflowBar/WorkflowBar";
import { IAvailableCommandsType } from "Modules/Common/Workflow/WorkflowInterfaces";
import { IPrintRequestData } from "Modules/TPM/Common/ExportPdf/ExportPdfInterfaces";
import RejectionForm from "Modules/TPM/Common/ReuseableForms/RejectionForm/RejectionForm";
import RemarksForm from "Modules/TPM/Common/ReuseableForms/RemarksForm/RemarksForm";
import TreatmentChargesForm from "Modules/TPM/Common/ReuseableForms/TreatmentChargesForm/TreatmentChargesForm";
import View from "Modules/TPM/TreatmentCertificate/GeneralView/View/View";
import { RootStore } from "Store";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../../TPM/TreatmentCertificate/GeneralView/View/View.module.scss";
import {
    getTreatmentProviderList,
    getTreatmentSubTypesListData,
    getTreatmentTypesBaseOnTPList,
    getTreatmentTypesList
} from "../../InitiateTreatmentRequest/InitiateTreatmentRequestAction";
import TreatmentInformation from "../../InitiateTreatmentRequest/TreatmentInfo/TreatmentInformation";
import { setSelectedTabValue } from "../../TreatmentCertificatesActions";
import {
    getConsignmentModesListData,
    getContainerTypeListData,
    getTPCertificateFetchSaveData,
    getTargetTreatmentListData,
    getTreatmentConductionListData
} from "../../TreatmentUnderProcess/TreatmentUnderProcessAction";
import {
    getSingleTreatmentRequestData,
    postExportTPAssignTreatmentData,
    postIoEndorseSubmitData,
    postReassignTreatmentData,
    postRejectTreatmentRequestData,
    postSubmitTreatmentCeritificateData,
    postSubmitTreatmentCeritificateOnSaveData,
    postUpdateContainerNumbersData,
    setRescindValueAction,
    updateStatusSingleTreatmentRequest
} from "../PendingTreatmentRequestListAction";
import { setToastr } from "Modules/TPM/Constants/ToastrConfig";
import { ToasterTypes } from "Modules/Common/Helpers/ToastrConfig";
import { useParams } from "react-router";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import ExportPdf from "Modules/TPM/Common/ExportPdf/ExportPdf";
import _, { rest } from "lodash";
import HeadingWrapper from "Modules/TPM/Common/HeadingWrapper/HeadingWrapper";
import ExportTreatmentInformation from "../../InitiateTreatmentRequest/ExportTreatmentInfo/ExportTreatmentInformation";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import CallTreatmentHistory from "Modules/TPM/Common/CallTreatmentHistory/CallTreatmentHistory";
import { DocumentClassificationCode } from "Modules/TPM/Constants/Interfaces";
import Paths from "Modules/TPM/Constants/Paths";
import Form22TreatmentProviderHistory from "Modules/TPM/Common/Form-22-TreatmentProviderHistory/Form-22-TreatmentProviderHistory";
import swal from "sweetalert";
export default function PendingTreatmentRequestView(props: any) {
    let param: any = useParams();

    let initDocumentID = 0;
    let gridInfoStoreHistory: any = {};

    const dispatch = useDispatch();
    let form2 = useRef<any>(null);
    let exportAssignTreatmentProviderForm = useRef<any>(null);
    let form1 = useRef<any>(null);
    // TODO : need to move into under process view
    let underProcessTreamtmentFormRef = useRef<any>(null);
    let underProcessTreamtmentChargesFormRef = useRef<any>(null);
    let remarksForm = useRef<any>(null);

    /**
     * * Redux States
     */
    // *Get Dashboard info Data From Store
    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );
    // *Get Issue Treatment Certificate List Data From Store
    const getIssueTreatmentCertificate: any = useSelector(
        (state: RootStore) => state.TreatmentCertificatesReducer.issueTreatmentCertificateData
    );
    // *Get Treatment Request Data From Store
    const getTreatmentRequestData: any = useSelector(
        (state: RootStore) => state.PendingTreatmentRequestListReducer.singleTreatmentRequestsData
    );
    // *Get Treatment Request Data From Store
    const isReassignLoader: any = useSelector(
        (state: RootStore) => state.PendingTreatmentRequestListReducer.isReassignLoader
    );
    // *Get demo role Request Data From Store
    const demoRole: any = useSelector((state: RootStore) => state.TreatmentCertificatesReducer.demoRole);
    // *Get Rights Data From Store
    const getRightsData: any = useSelector((state: RootStore) => state.TreatmentCertificatesReducer.ioRightsData);
    const getRejectionResponseData: any = useSelector(
        (state: RootStore) => state.PendingTreatmentRequestListReducer.rejectResponse
    );
    // *Get treatmentType  Data From Store
    const getTreatmentTypeData: any = useSelector(
        (state: RootStore) => state.InitiateTreatmentRequestReducer.treatmentTypes
    );
    // *Get target treatment  Data From Store
    const getTargetTreatment: any = useSelector(
        (state: RootStore) => state.TreatmentUnderProcessReducer.targetTreatments
    );
    // *Get conduction treatment  Data From Store
    const getConductionTreatment: any = useSelector(
        (state: RootStore) => state.TreatmentUnderProcessReducer.conductionTypes
    );
    // *Get container type Data From Store
    const getContainerType: any = useSelector((state: RootStore) => state.TreatmentUnderProcessReducer.containerTypes);
    // *Get save fetch treatment certificate data From Store
    const getTPCertFetchSaveData: any = useSelector(
        (state: RootStore) => state.TreatmentUnderProcessReducer.fetchSaveData
    );
    // *Get save fetch save treatment certificate id data From Store
    const getTPCertFetchSaveDataId: any = useSelector(
        (state: RootStore) => state.TreatmentUnderProcessReducer.fetchSaveDataId
    );
    // *Get consignment modes Data From Store
    const getConsignmentMode: any = useSelector(
        (state: RootStore) => state.TreatmentUnderProcessReducer.consignmentModes
    );
    // *Get Loading State From Store
    const isLoading: any = useSelector((state: RootStore) => state.PendingTreatmentRequestListReducer.loading);
    // *Get treatmentProvider  Data From Store
    const getTreatmentProviderData: any = useSelector(
        (state: RootStore) => state?.InitiateTreatmentRequestReducer?.treatmentProviders
    );
    // *Get treatmentProvider  Data Base on TP From Store
    const getTreatmentProviderDataBaseOnTP: any = useSelector(
        (state: RootStore) => state?.InitiateTreatmentRequestReducer?.treatmentTypesBaseOnTreatmentProvider
    );
    // *Get alert  Data From Store
    const isRescind: any = useSelector((state: RootStore) => state.PendingTreatmentRequestListReducer.isRescind);
    // *Get isRescind From Store
    const alertData: any = useSelector((state: RootStore) => state.alert);
    /**
     * ! End of Redux States
     */

    const [isIssueCertificateConfirmation, setIsIssueCertificateConfirmation] = useState(false);
    const [isReassign, setIsReassign] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [isSaveState, setIsSaveState] = useState(false);
    const [reasonDialog, setIsReasonDialog] = useState(false);
    const [isDanger, setDanger] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [dailogMessage, setDailogMessage] = useState("");
    const [sweetAlertTitle, setSweetAlertTitle] = useState("");
    const [isVisible, setVisibleDialog] = useState(false);
    const [sweetAlertMessage, setSweetAlertMessage] = useState("");
    const [isCancelledRequest, setIsCancelledRequest] = useState(false);
    const [underProcessTreatmentInformation, setUnderProcessTreatmentInformation] = useState<any>({});
    const [isSystemPayment, setIsSystemPayment] = useState(false);
    const [isSystemPaymentProcess, setIsSystemPaymentProcess] = useState(false);
    const [temperatureType, setTemperatureType] = useState("");
    const [durationType, setDurationType] = useState("");
    const [saveInfoData, setSaveInfoData] = useState<any>({});
    const [stateName, setStateName] = useState([]);
    const [isExporting, setIsExporting] = useState(false);
    const [printRequest, setPrintRequest] = useState<IPrintRequestData>();
    const [openPrintPreview, setOpenPrintPreview] = useState(false);
    const [isConcern, setIsConcern] = useState(false);
    const [dialoagError, setDialogError] = useState(false);
    const [saveCommodityContainerNumbers, setSaveCommodityContainerNumbers] = useState([]);
    const [targetOfFumigationConform, setTargetOfFumigationConform] = useState<string>("");
    const [isTargetOfFumigationConform, setIsTargetOfFumigationConform] = useState(false);
    const [MainArea, setMainArea] = useState<string | undefined>(undefined);
    const [singleSaveContainerNumber, setSingleSaveContainerNumber] = useState<any>({});
    const [isAddTreatmentProvider, setIsAddTreatmentProvider] = useState(false);
    // const [isRescind, isSetRescind] = useState(false);
    const [error, setError] = useState({ doseRateError: "", expectedPeriodError:"" });
 
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

    const [command, setCommand] = useState(emptyCommand);

    /* Close Payment Modal */
    const closePaymentModal = (modalFlag: boolean) => {
 
       
            if (modalFlag) {
                onConfirmationTreatmentChargesUnderProcess(false);
                             
            }   
           
        
        
    };

    
    useEffect(() => {
        const gridInfoStoreHistoryObject: any = localStorage.getItem("gridInfoStoreHistoryObject");

        if (getTreatmentRequestData != null) {
            // * For Export
            if (getTreatmentRequestData?.tradeTypeID == TradeTypes.EXPORT) {
                initDocumentID = getTreatmentRequestData?.initDocumentID; // Number(param.id);
                gridInfoStoreHistory.documentClassificationCode = DocumentClassificationCode.EXPORT_CERTIFICATE;
                gridInfoStoreHistory.id = getTreatmentRequestData?.initDocumentID?.toString();
                gridInfoStoreHistory.initDocumentTypeCode = getTreatmentRequestData?.initDocumentTypeCode?.toString();
                gridInfoStoreHistory.treatmentRequestId = getTreatmentRequestData?.id;
                gridInfoStoreHistory.action = 0;
            }
            // * For Import
            if (getTreatmentRequestData?.tradeTypeID == TradeTypes.IMPORT) {
                initDocumentID = getTreatmentRequestData?.initDocumentID; // Number(param.id);
                gridInfoStoreHistory.documentClassificationCode = DocumentClassificationCode.RELEASE_ORDER;
                gridInfoStoreHistory.id = getTreatmentRequestData?.initDocumentID?.toString();
                gridInfoStoreHistory.treatmentRequestId = getTreatmentRequestData?.id;
                gridInfoStoreHistory.initDocumentTypeCode = getTreatmentRequestData?.initDocumentTypeCode?.toString();
                gridInfoStoreHistory.action = 0;
            }

            // Setting localstorage to get request data on reload
            localStorage.setItem("gridInfoStoreHistoryObject", JSON.stringify(gridInfoStoreHistory));

            console.log("gridInfoStoreHistoryObject", gridInfoStoreHistoryObject);
        } else if (
            gridInfoStoreHistoryObject != "undefined" &&
            gridInfoStoreHistoryObject != null &&
            getTreatmentRequestData?.initDocumentID > 0
        ) {
            const tempGridInfoStoreHistory = JSON.parse(getTreatmentRequestData);
            console.log("tempGridInfoStoreHistory", tempGridInfoStoreHistory);

            // Setting up gridInfoStoreHistory from previous request data
            initDocumentID = Number(tempGridInfoStoreHistory.id);
            gridInfoStoreHistory = tempGridInfoStoreHistory;
        }
    }, [getTreatmentRequestData]);

    // ! Retrive request data if already set in previous request

    useEffect(() => {
        console.log(saveInfoData);
        debugger;
        // * CASE: Without fumigation
        if (
            saveInfoData?.addtionalDeclaration &&
            !_.isEmpty(saveInfoData?.consignmentMode) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            saveInfoData?.temperature &&
            saveInfoData?.expectedPeriodDuration &&
            saveInfoData?.doseRate &&
            saveInfoData?.placeOfTreatment &&
            saveInfoData?.dateOfTreatment &&
            saveInfoData?.concentration &&
            saveInfoData?.chemical &&
            !_.isEmpty(saveInfoData?.targetTreatment) &&
            !_.isEmpty(saveInfoData?.treatmentType) &&
            saveInfoData?.treatmentType.id != treatmentTypes.FUMIGATION
        ) {
            // ! HOT FIXED CHANGED :  [ Make container type optional ]
            return setIsIssueCertificateConfirmation(true);
        }
        // * CASE: With fumigation plus sub types excluding METHLY : Ventilation optional case
        if (
            saveInfoData?.addtionalDeclaration &&
            !_.isEmpty(saveInfoData?.consignmentMode) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            (saveInfoData?.treatmentConducted?.id == conductedType.CHAMBER ||
                saveInfoData?.treatmentConducted?.id == conductedType.SHEETED_STACK) &&
            saveInfoData?.temperature &&
            saveInfoData?.expectedPeriodDuration &&
            saveInfoData?.doseRate &&
            saveInfoData?.placeOfTreatment &&
            saveInfoData?.dateOfTreatment &&
            saveInfoData?.concentration &&
            saveInfoData?.chemical &&
            !_.isEmpty(saveInfoData?.targetTreatment) &&
            !_.isEmpty(saveInfoData?.treatmentType) &&
            saveInfoData?.treatmentType.id == treatmentTypes.FUMIGATION &&
            !_.isEmpty(saveInfoData?.treatmentSubType) &&
            saveInfoData?.targetOfFumigationConform &&
            saveInfoData?.prescribedDose &&
            saveInfoData?.treatmentSubType?.id != treatmentSubTypes.METHYL
        ) {
            // ! HOT FIXED CHANGED :  [ Make container type optional ]
            return setIsIssueCertificateConfirmation(true);
        }
        // * CASE: With fumigation plus sub types excluding METHLY  : Ventilation non optional case
        if (
            saveInfoData?.addtionalDeclaration &&
            !_.isEmpty(saveInfoData?.consignmentMode) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            (saveInfoData?.treatmentConducted?.id != conductedType.CHAMBER ||
                saveInfoData?.treatmentConducted?.id != conductedType.SHEETED_STACK) &&
            saveInfoData?.temperature &&
            saveInfoData?.expectedPeriodDuration &&
            saveInfoData?.doseRate &&
            saveInfoData?.placeOfTreatment &&
            saveInfoData?.dateOfTreatment &&
            saveInfoData?.concentration &&
            saveInfoData?.chemical &&
            !_.isEmpty(saveInfoData?.targetTreatment) &&
            !_.isEmpty(saveInfoData?.treatmentType) &&
            saveInfoData?.treatmentType.id == treatmentTypes.FUMIGATION &&
            !_.isEmpty(saveInfoData?.treatmentSubType) &&
            saveInfoData?.targetOfFumigationConform &&
            saveInfoData?.prescribedDose &&
            saveInfoData?.ventilation &&
            saveInfoData?.treatmentSubType?.id != treatmentSubTypes.METHYL
        ) {
            // ! HOT FIXED CHANGED :  [ Make container type optional ]
            return setIsIssueCertificateConfirmation(true);
        }
        // * CASE: With fumigation plus sub types with METHLY
        if (
            saveInfoData?.addtionalDeclaration &&
            !_.isEmpty(saveInfoData?.consignmentMode) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            saveInfoData?.temperature &&
            saveInfoData?.expectedPeriodDuration &&
            saveInfoData?.doseRate &&
            saveInfoData?.placeOfTreatment &&
            saveInfoData?.dateOfTreatment &&
            saveInfoData?.concentration &&
            saveInfoData?.chemical &&
            !_.isEmpty(saveInfoData?.targetTreatment) &&
            !_.isEmpty(saveInfoData?.treatmentType) &&
            saveInfoData?.treatmentType.id == treatmentTypes.FUMIGATION &&
            !_.isEmpty(saveInfoData?.treatmentSubType) &&
            saveInfoData?.treatmentSubType?.id == treatmentSubTypes.METHYL &&
            saveInfoData?.totalFumigationAppliedQty &&
            saveInfoData?.targetOfFumigationConform &&
            saveInfoData?.prescribedDose &&
            saveInfoData?.ventilation
        ) {
            // ! HOT FIXED CHANGED :  [ Make container type optional ]
            return setIsIssueCertificateConfirmation(true);
        }
        // * CASE: With fumigation plus sub types with METHLY : Ventilation optional case
        if (
            saveInfoData?.addtionalDeclaration &&
            !_.isEmpty(saveInfoData?.consignmentMode) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            !_.isEmpty(saveInfoData?.treatmentConducted) &&
            saveInfoData?.temperature &&
            saveInfoData?.expectedPeriodDuration &&
            saveInfoData?.doseRate &&
            saveInfoData?.placeOfTreatment &&
            saveInfoData?.dateOfTreatment &&
            saveInfoData?.concentration &&
            saveInfoData?.chemical &&
            !_.isEmpty(saveInfoData?.targetTreatment) &&
            !_.isEmpty(saveInfoData?.treatmentType) &&
            saveInfoData?.treatmentType.id == treatmentTypes.FUMIGATION &&
            !_.isEmpty(saveInfoData?.treatmentSubType) &&
            saveInfoData?.treatmentSubType?.id == treatmentSubTypes.METHYL &&
            saveInfoData?.totalFumigationAppliedQty &&
            saveInfoData?.targetOfFumigationConform &&
            saveInfoData?.prescribedDose
        ) {
            // ! HOT FIXED CHANGED :  [ Make container type optional ]
            return setIsIssueCertificateConfirmation(true);
        }
        return setIsIssueCertificateConfirmation(false);
    }, [saveInfoData]);

    useEffect(() => {
        dispatch(setPageTitleAction("Loading..."));
    }, []);

    useEffect(() => {
        const getTreatmentRequestIdStringify: any = localStorage.getItem("gridInfoStoreHistoryObject");
        const getTreatmentRequestIdParse: any = JSON.parse(getTreatmentRequestIdStringify);
        const treatmentInfoObjectStringify: any = localStorage.getItem("treatmentInfoObject");
        const treatmentInfoObjectParse: any = JSON.parse(treatmentInfoObjectStringify);

        setIsSaveState(false);
        if (param?.id) {
            dispatch(setPageTitleAction("Treatment Certificate"));
        }
        dispatch(getTreatmentProviderList({ id: 0 }));
        dispatch(
            getTreatmentTypesBaseOnTPList({
                id: 0,
                treatmentRequestId:
                    parseInt(props?.location?.state?.id) ||
                    parseInt(props?.location?.state?.treatmentRequestID) ||
                    parseInt(param?.id) ||
                    getTreatmentRequestIdParse?.treatmentRequestId ||
                    treatmentInfoObjectParse?.treatmentRequestId
            })
        );
        dispatch(getTargetTreatmentListData({ id: 0 }));
        dispatch(getTreatmentConductionListData({ id: 0 }));
        if (dashboardInfo?.currentRole == UserRole.TreatmentProvider) {
            dispatch(
                getTPCertificateFetchSaveData({
                    roleCode: dashboardInfo?.currentRole,
                    treatmentRequestId:
                        parseInt(props?.location?.state?.id) || parseInt(props?.location?.state?.treatmentRequestID),
                    rights: ""
                })
            );
        }
        dispatch(getTreatmentSubTypesListData({ id: 0, treatmentTypeID: 7 }));
        dispatch(getConsignmentModesListData({}));
        dispatch(getContainerTypeListData({}));
        dispatch(getTreatmentTypesList({ id: 0 }));
        if (
            ((UserRole.Trader == dashboardInfo?.currentRole ||
                dashboardInfo?.currentRole == UserRole.CustomAgent ||
                UserRole.TreatmentProvider == dashboardInfo?.currentRole ||
                dashboardInfo?.currentRole == UserRole.InspectionOfficer) &&
                props?.location?.state?.treatmentRequestStatusID == treatmentRequestsStatus.CERTIFICATEISSUED) ||
            props?.location?.state?.treatmentRequestStatusID == treatmentRequestsStatus.CERTIFICATEENDORSED ||
            props?.location?.state?.treatmentRequestStatusID == treatmentRequestsStatus.ASSIGNED
        ) {
            dispatch(
                getSingleTreatmentRequestData({
                    treatmentRequestId: parseInt(props?.location?.state?.treatmentRequestID),
                    roleCode: dashboardInfo?.currentRole,
                    rights: ""
                },showErrorModal)
            );
        }
        if (
            (UserRole.Trader == dashboardInfo?.currentRole ||
                dashboardInfo?.currentRole == UserRole.CustomAgent ||
                UserRole.TreatmentProvider == dashboardInfo?.currentRole ||
                dashboardInfo?.currentRole == UserRole.InspectionOfficer) &&
            props?.location?.state?.treatmentRequestStatusID != treatmentRequestsStatus.CERTIFICATEISSUED &&
            props?.location?.state?.treatmentRequestStatusID != treatmentRequestsStatus.CERTIFICATEENDORSED &&
            props?.location?.state?.treatmentRequestStatusID != treatmentRequestsStatus.ASSIGNED
        ) {
            dispatch(
                getSingleTreatmentRequestData({
                    treatmentRequestId:
                        props?.location?.state?.treatmentRequestStatusID == treatmentRequestsStatus.CERTIFICATETAGGED
                            ? parseInt(props?.location?.state?.treatmentRequestID)
                            : parseInt(props?.location?.state?.id) ||
                              parseInt(param?.id) ||
                              getTreatmentRequestIdParse?.treatmentRequestId ||
                              treatmentInfoObjectParse?.treatmentRequestId,
                    roleCode: dashboardInfo?.currentRole,
                    rights: ""
                },showErrorModal)
            );
        }
    }, [props?.location?.state?.id || param?.id?.toString(), dashboardInfo]);

    useEffect(() => {
        if (alertData?.variant == "success") {
            setSweetAlertTitle("Success");
        }
        if (alertData.variant == "danger") {
            setSweetAlertTitle("Failed");
        }
    }, [alertData]);

    useEffect(() => {
        if (dashboardInfo?.currentRole == UserRole.TreatmentProvider && isRescind) {
            console.log(props?.location?.state);
            debugger;
            dispatch(
                getTPCertificateFetchSaveData({
                    roleCode: dashboardInfo?.currentRole,
                    treatmentRequestId: parseInt(props?.location?.state?.treatmentRequestID),
                    rights: ""
                })
            );
        }
    }, [isRescind]);

    // useEffect(() => {
    //     const getTreatmentRequestIdStringify: any = localStorage.getItem("gridInfoStoreHistoryObject");
    //     const getTreatmentRequestIdParse: any = JSON.parse(getTreatmentRequestIdStringify);
    
    //     if (UserRole.InspectionOfficer == dashboardInfo?.currentRole) {
    //         console.log("getTreatmentRequestIdParse?.treatmentRequestId",getTreatmentRequestIdParse?.treatmentRequestId)
    //         console.log("param.id",param.IGetDashboardInfoResponseData)
    //         console.log(" props?.location?", props?.location)
    //         dispatch(
    //             getSingleTreatmentRequestData(
    //                 {
    //                     treatmentRequestId:param.id ? Number(param.id) : getTreatmentRequestIdParse?.treatmentRequestId,
    //                         // parseInt(param.id) || getTreatmentRequestIdParse?.treatmentRequestId,
    //                     roleCode: dashboardInfo?.currentRole,
    //                     // rights: getRightsData // ! commented by backend
    //                     rights: ""
    //                 },
    //                 showErrorModal
    //             )
    //         );
    //     }
    // }, [dashboardInfo]);

    // useEffect(() => {
    //
    //     if (getRejectionResponseData?.status == 6) {
    //         props.history.push("/TPM/TreatmentCertificates/");
    //     }
    // }, [getRejectionResponseData])

    function getTraderPageTitleByStatus(status: number) {
        let title = ''

        if (status == treatmentRequestsStatus?.TREATMENTREQUESTED) {
            title = "View Treatment Request"
        }else if (status == treatmentRequestsStatus?.PENDING || status == treatmentRequestsStatus?.RESSIGNED) {
            title = "View Pending Treatment Request"
        }else if (status == treatmentRequestsStatus?.ACCEPTED) {
            title = "View Treatment Under Process"
        }else if (status == treatmentRequestsStatus?.ASSIGNED || status == treatmentRequestsStatus.CERTIFICATEISSUED || status == treatmentRequestsStatus.CERTIFICATEENDORSED || status == treatmentRequestsStatus.CERTIFICATETAGGED) {
            title = "View Issued Treatment Certificate"
        }else if (status == treatmentRequestsStatus?.REJECTED) {
            title = "View Rejected Treatment Request"
        }

        return title
    }

    function getCustomAgentPageTitleByStatus(status: number) {
        let title = ''

        if (status == treatmentRequestsStatus?.TREATMENTREQUESTED) {
            title = "View Treatment Request"
        }else if (status == treatmentRequestsStatus?.PENDING || status == treatmentRequestsStatus?.RESSIGNED) {
            title = "View Pending Treatment Request"
        }else if (status == treatmentRequestsStatus?.ACCEPTED) {
            title = "View Treatment Under Process"
        }else if (status == treatmentRequestsStatus?.ASSIGNED || status == treatmentRequestsStatus.CERTIFICATEISSUED || status == treatmentRequestsStatus.CERTIFICATEENDORSED || status == treatmentRequestsStatus.CERTIFICATETAGGED) {
            title = "View Issued Treatment Certificate"
        }else if (status == treatmentRequestsStatus?.REJECTED) {
            title = "View Rejected Treatment Request"
        }

        return title
    }
    function getTreatmentProviderPageTitleByStatus(status: number) {
        let title = ''

        if (status == treatmentRequestsStatus?.PENDING || status == treatmentRequestsStatus?.RESSIGNED) {
            title = "View Treatment Request"
        }else if (status == treatmentRequestsStatus?.ACCEPTED) {
            title = "View Pending Treatment Request"
        }else if (status == treatmentRequestsStatus?.ASSIGNED ||status == treatmentRequestsStatus.CERTIFICATEISSUED ||status == treatmentRequestsStatus.CERTIFICATEENDORSED ||status == treatmentRequestsStatus.CERTIFICATETAGGED) {
            title = "View Treatment Under Process"
        }

        if (props?.location?.state?.isRegenerated) {
            title = "View Rescinded Treatment Certificate"
        }

        return title
    }

    function getInspectionOfficerPageTitleByStatus (status: number) {
        let title = ''

        if (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.ASSIGNED) {
            title = "View Treatment Certificate"
        }

        return title
    } 

    function setPageTitle () {
        // * Set up title of the page
        // * NOTE : FOR [ TRADER | TREATMENT PROVIDER | INSPECTION OFFICER ]
        let title = ''
        if (dashboardInfo?.currentRole == UserRole.Trader) {
            title = getTraderPageTitleByStatus(getTreatmentRequestData?.treatmentRequestStatusID)
        } else if (dashboardInfo?.currentRole == UserRole.CustomAgent) {
            title = getCustomAgentPageTitleByStatus(getTreatmentRequestData?.treatmentRequestStatusID)
        } else if (dashboardInfo?.currentRole == UserRole.TreatmentProvider) {
            title = getTreatmentProviderPageTitleByStatus(getTreatmentRequestData?.treatmentRequestStatusID)
        } else if (dashboardInfo?.currentRole == UserRole.InspectionOfficer) {
            title = getInspectionOfficerPageTitleByStatus(getTreatmentRequestData?.treatmentRequestStatusID)
        } else if (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.CERTIFICATEENDORSED) {
            title = "View Treatment Certificate"
        }
        
        dispatch(setPageTitleAction(title));
        // ! END OF [ FOR TRADER | TREATMENT PROVIDER | INSPECTION OFFICER ]

        // ! End of setup title of page
    }

    useEffect(() => {
        setPageTitle()

        // ! workflow
        // * State name decision on the basis of screen
        if (
            dashboardInfo?.currentRole === Role.InspectionOfficer ||
            dashboardInfo?.currentRole === Role.ROInspectionOfficer
        ) {
            const state: any = [];
            state.push(WFStates.Inspection_Officer_Queue);
            state.push(WFStates.Tag_Treatment_Certificate);
            setStateName(state);
        } else if (dashboardInfo?.currentRole === Role.TreatmentProvider) {
            const state: any = [];
            state.push(WFStates.Treatment_Provider_Queue);
            state.push(WFStates.Treatment_In_Progress);
            state.push(WFStates.Assign_To_Inspection_Officer);
            state.push(WFStates.Inspection_Officer_Queue);
            setStateName(state);
        } else if (dashboardInfo?.currentRole === Role.Trader || dashboardInfo?.currentRole === Role.CustomAgent) {
            const state: any = [];
            state.push(WFStates.Trader_To_Do_List);
            state.push(WFStates.Treatment_Provider_Queue);
            setStateName(state);
        }
    }, [getTreatmentRequestData]);

    const onModalButtonRedirect = () => {
        dispatch(setSelectedTabValue({ selectedValue: 1 }));
        props.history.push("/TPM/TreatmentCertificates/");
        dispatch(
            clearAlert({
                code: "",
                description: ""
            })
        );
    };
    const sepratePreviewFunction = () => {
        const request: IPrintPreviewRequestData = {
            documentId: getTreatmentRequestData?.id,
            // documentId: getTreatmentRequestData?.id,
            documentClassificationCode: "TPM",
            documentTypeCode: "TC",
            roleCode: dashboardInfo?.currentRole,
            rights: "",
            payload: "",
            isPreview: true
        };

        setPrintRequest(request);
        // setIsExporting(true)
        setOpenPrintPreview(true);
    };
    const onHandleRequest = () => {
        if (
            dashboardInfo?.currentRole == UserRole?.TreatmentProvider &&
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.CERTIFICATEISSUED
        ) {
            const request: IPrintPreviewRequestData = {
                documentId: getTreatmentRequestData?.id,
                // documentId: getTreatmentRequestData?.id,
                documentClassificationCode: "TPM",
                roleCode: dashboardInfo?.currentRole,
                rights: "",
                payload: "",
                isPreview: true
            };

            setPrintRequest(request);
            // setIsExporting(true)
            setOpenPrintPreview(true);

            // dispatch(getPreviewTreatmentCertificateData({
            //     documentId: getTreatmentRequestData?.id,
            //     documentClassificationCode: "TC",
            //     isPreview: false,
            //     roleCode: UserRole.TreatmentProvider
            // }));
            return;
        }

        setIsCancelledRequest(false);
        switch (dashboardInfo?.currentRole) {
            case UserRole.TreatmentProvider: {
                setVisibleDialog(true);
                return setDailogMessage("Are you sure you want to accept the Treatment request?");
            }
            case UserRole.Trader:
            case UserRole.CustomAgent: {
                if (
                    getTreatmentRequestData?.tradeTypeID == TradeTypes.EXPORT &&
                    getTreatmentRequestData.treatmentRequestStatusID == treatmentRequestsStatus.TREATMENTREQUESTED
                ) {
                    exportAssignTreatmentProviderForm.current.onSubmit();
                    if (exportAssignTreatmentProviderForm.current.isValid()) {
                        setVisibleDialog(true);
                        return setDailogMessage("Are you sure you want to submit treatment request?");
                    }
                    return;
                }
                if (
                    getTreatmentRequestData.treatmentRequestStatusID == treatmentRequestsStatus.ACKNOWLEDGEMENTREQUIRED
                ) {
                    exportAssignTreatmentProviderForm.current.onSubmit();
                    if (exportAssignTreatmentProviderForm.current.isValid()) {
                        setVisibleDialog(true);
                        return setDailogMessage("Are you sure you want to submit treatment request?");
                    }
                    return;
                }
                setVisibleDialog(true);
                setIsReassign(true);
                return setDailogMessage("Are you sure you want to reassign the request to another Treatment provider?");
            }
            default:
                break;
        }
    };

    const rescindAndRegenerateHandler = () => {
        console.log("regenerate handler call");
        // if(isIssueCertificateConfirmation){
        setVisibleDialog(true);
        return setDailogMessage("Are you sure want to rescind and regenerate the Treatment Certificate ?");
        // } else {}
    };

    const onHandleRejectionSubmit = async (dataItem: any) => {
        if (UserRole.InspectionOfficer == dashboardInfo?.currentRole) {
        }

        if (UserRole.Trader == dashboardInfo?.currentRole || dashboardInfo?.currentRole == UserRole.CustomAgent) {
            form1.current.onSubmit();
            if (form1.current.isValid()) {
                const result = dispatch(
                    postRejectTreatmentRequestData({
                        treatmentRequestID: getTreatmentRequestData?.id, // ! needs to ask
                        treatmentRequestStatusID: treatmentRequestsStatus.CANCELLED.toString(),
                        rejectionReason: "",
                        cancellationReason: form1?.current?._values?.rejectionReason,
                        roleCode: dashboardInfo?.currentRole
                    })
                );
                setIsReasonDialog(false);
            }
        }
        if (dashboardInfo?.currentRole == UserRole.TreatmentProvider) {
            if (form1.current.isValid()) {
                const result = dispatch(
                    postRejectTreatmentRequestData({
                        treatmentRequestID: getTreatmentRequestData?.id, // ! needs to ask
                        treatmentRequestStatusID: treatmentRequestsStatus.REJECTED.toString(),
                        rejectionReason: form1?.current?._values?.rejectionReason,
                        cancellationReason: "",
                        roleCode: dashboardInfo?.currentRole
                    })
                );
                setIsReasonDialog(false);
            }
        }
    };
    const onConfirmHandle = async () => {
        // * Condition for treatment provider with status under process
        if (
            dashboardInfo?.currentRole == UserRole.TreatmentProvider &&
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.ASSIGNED &&
            isSystemPayment
        ) {
            onConfirmationTreatmentChargesUnderProcess(isSystemPayment);
            return;
        }
        if (
            dashboardInfo?.currentRole == UserRole.TreatmentProvider &&
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.UNDERPROCESS &&
            isSystemPayment
        ) {
            onConfirmationTreatmentChargesUnderProcess(isSystemPayment);
            return;
        }
        // * Condition for trader
        if (dashboardInfo?.currentRole == UserRole.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent) {
            form2.current.onSubmit();
            if (form2.current.isValid()) {
                const result = dispatch(
                    postReassignTreatmentData({
                        treatmentRequestId: getTreatmentRequestData?.id, // ! needs to ask
                        treatmentRequestStatusID: treatmentRequestsStatus.RESSIGNED,
                        treatmentProviderId: form2?.current?._values?.treatmentProvider?.id,
                        placeOfTreatment: form2?.current?._values?.expectedPlaceOfTreatment,
                        dateOfTreatment: form2?.current?._values?.tentativeDateOfTreatment,
                        additionalTreatmentInformation: form2?.current?._values?.additionalDeclaration
                    })
                );
                setIsReasonDialog(false);
            }
        }
        // * Condition for treatment provider
        if (dashboardInfo?.currentRole == UserRole.TreatmentProvider) {
            const result = dispatch(
                postRejectTreatmentRequestData({
                    treatmentRequestID: getTreatmentRequestData?.id, // ! needs to ask
                    treatmentRequestStatusID: "2",
                    rejectionReason: "",
                    cancellationReason: "",
                    roleCode: dashboardInfo?.currentRole
                })
            );
            setIsReasonDialog(false);
        }
    };

    const onModalFormSubmit = (dataItem: any) => {};

    function treatmentProviderOnConfirm() {
        if (
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.UNDERPROCESS &&
            isSave
        ) {
            props.history.push("/TPM/TreatmentCertificates/");
            dispatch(setSelectedTabValue({ selectedValue: 2 }));
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
            return;
        }
        if (
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.UNDERPROCESS &&
            isSystemPayment
        ) {
            dispatch(setSelectedTabValue({ selectedValue: 2 }));
            props.history.push("/TPM/TreatmentCertificates/");
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
            return;
        }
        if (
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.UNDERPROCESS &&
            !isSystemPaymentProcess
        ) {
            if (sweetAlertTitle !== resources_EN.failed) {
                dispatch(setSelectedTabValue({ selectedValue: 2 }));
                props.history.push("/TPM/TreatmentCertificates/");
            }
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
            return;
        }
        if (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.ASSIGNED) {
            dispatch(setSelectedTabValue({ selectedValue: 3 }));
            props.history.push("/TPM/TreatmentCertificates/");
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
            return;
        }
        dispatch(setSelectedTabValue({ selectedValue: 1 }));
        props.history.push("/TPM/TreatmentCertificates/");
        dispatch(
            clearAlert({
                code: "",
                description: ""
            })
        );
    }

    function traderAndCustomAgentOnConfirm() {
        if (
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.PENDING ||
            (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.RESSIGNED &&
                alertData?.variant == "success")
        ) {
            dispatch(setSelectedTabValue({ selectedValue: 1 }));
            props.history.push("/TPM/TreatmentCertificates/");
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
            return;
        }
        if (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.REJECTED) {
            dispatch(setSelectedTabValue({ selectedValue: 4 }));
            props.history.push("/TPM/TreatmentCertificates/");
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
            return;
        }
        if (alertData?.description && alertData?.visible && alertData?.variant == "danger") {
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
        } else if (alertData?.description && alertData?.visible && alertData?.variant == "success") {
            props.history.push("/TPM/TreatmentCertificates/");
            dispatch(setSelectedTabValue({ selectedValue: 0 }));
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
            // props.history.push("/TPM/TreatmentCertificates/");
        }
        dispatch(
            clearAlert({
                code: "",
                description: ""
            })
        );
    }

    function inspectionOfficerOnConfirm() {
        if (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.ASSIGNED) {
            props.history.push("/TPM/TreatmentCertificates/");
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
            if (
                getTreatmentRequestData?.initDocumentID > 0 &&
                getTreatmentRequestData?.tradeTypeID == TradeTypes.EXPORT
            ) {
                props.history.push(`${Paths.ExportCertificate.View}`);
            }
            if (
                getTreatmentRequestData?.initDocumentID > 0 &&
                getTreatmentRequestData?.tradeTypeID == TradeTypes.IMPORT
            ) {
                props.history.push(`${Paths.ReleaseOrder.View}`);
            }
            return;
        }
        if (alertData?.description && alertData?.visible && alertData?.variant == "danger") {
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
        } else if (alertData?.description && alertData?.visible && alertData?.variant == "success") {
            dispatch(
                clearAlert({
                    code: "",
                    description: ""
                })
            );
            props.history.push("/TPM/TreatmentCertificates/");
        }
    }

    const onConfirm = () => {
        switch (dashboardInfo?.currentRole) {
            case UserRole.TreatmentProvider:
                treatmentProviderOnConfirm()
                return;
            case UserRole.Trader:
            case UserRole.CustomAgent:
                traderAndCustomAgentOnConfirm()
                return;
            case UserRole.InspectionOfficer:
                inspectionOfficerOnConfirm()
                return;
            default:
                break;
        }
    };

    const onCancelRequest = () => {
        setIsReassign(false);
        setIsCancelledRequest(true);
        setVisibleDialog(true);

        switch (dashboardInfo?.currentRole) {
            case UserRole.TreatmentProvider:
                return setDailogMessage("Are you sure you want to reject the Treatment request?");
            case UserRole.Trader:
                return setDailogMessage("Are you sure you want to cancel the Treatment request?");
            default:
                break;
        }
    };

    function handleTreatmentRequestActions() {
        if (isRescind) { onConfirmationTreatmentChargesUnderProcessRegenerate() }
        else if (isSystemPayment) { onConfirmPaymentFunction() }
        else { onConfirmationTreatmentChargesUnderProcess() }
    }

    function treatmentProviderConfirmOnFirstModal () {
        if (
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.ACCEPTED &&
            isSaveState
        ) {
            onConfirmationTreatmentChargesUnderProcessOnSave();
            return;
        }
        if (
            [treatmentRequestsStatus?.ASSIGNED, treatmentRequestsStatus?.CERTIFICATEISSUED].includes(getTreatmentRequestData?.treatmentRequestStatusID) &&
            isSystemPayment &&
            isRescind
        ) {
            setVisibleDialog(false);
            setIsReasonDialog(true);
            setIsSystemPaymentProcess(true);
            return;
        }

        if (
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.UNDERPROCESS &&
            isSystemPayment
        ) {
            return onConfirmPaymentFunction();
        }
        if (
            (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.ASSIGNED ||
                getTreatmentRequestData?.treatmentRequestStatusID ==
                    treatmentRequestsStatus?.CERTIFICATEISSUED) &&
            !isRescind
        ) {
            setVisibleDialog(false);
            dispatch(setRescindValueAction(true));
            // props.history.push("/TPM/TreatmentCertificates/");
            // dispatch(setSelectedTabValue({ selectedValue: 2 }));
            // dispatch(clearAlert({
            //     code: "",
            //     description: ""
            // }));
            return;
        }

        if (
            (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.UNDERPROCESS &&
                !isSystemPayment) ||
            isRescind
        ) {
            handleTreatmentRequestActions()
            return;
        }

        if (isCancelledRequest) {
            setVisibleDialog(false);
            setIsReasonDialog(true);
            return;
        }
        if (
            dashboardInfo?.currentRole == UserRole.TreatmentProvider && [treatmentRequestsStatus?.PENDING, treatmentRequestsStatus?.RESSIGNED].includes(getTreatmentRequestData?.treatmentRequestStatusID)
        ) {
            dispatch(
                postRejectTreatmentRequestData({
                    treatmentRequestID: getTreatmentRequestData?.id, // ! needs to ask
                    treatmentRequestStatusID: treatmentRequestsStatus.ACCEPTED.toString(),
                    rejectionReason: "",
                    cancellationReason: "",
                    roleCode: dashboardInfo?.currentRole
                })
            );

            dispatch(setSelectedTabValue({ selectedValue: 0 }));
            setVisibleDialog(false);
        }
    }

    function traderAndCustomAgentConfirmOnFirstModal() {
        if (
            getTreatmentRequestData?.tradeTypeID == TradeTypes.EXPORT &&
            getTreatmentRequestData.treatmentRequestStatusID == treatmentRequestsStatus.TREATMENTREQUESTED
        ) {
            setIsAddTreatmentProvider(true);
            const result = dispatch(
                postExportTPAssignTreatmentData(
                    { 
                        treatmentRequestID: getTreatmentRequestData?.id, // ! needs to ask
                        treatmentProviderID:
                            exportAssignTreatmentProviderForm?.current?._values?.treatmentProvider?.id,
                        placeOfTreatment:
                            exportAssignTreatmentProviderForm?.current?._values?.expectedPlaceOfTreatment,
                        dateOfTreatment:
                            exportAssignTreatmentProviderForm?.current?._values?.tentativeDateOfTreatment,
                        additionalTreatmentInfo: exportAssignTreatmentProviderForm?.current?._values?.additionalTreatmentInformation
                    },
                    (res: any) => {
                        if (res.hasOwnProperty("code") ? res.code !== "200" : res.message.code !== "200") {
                            debugger;
                            setIsAddTreatmentProvider(false);
                        } else {
                            debugger;
                            setIsAddTreatmentProvider(false);
                        }
                    }
                )
            );
            setVisibleDialog(false);
            return;
        }
        if (
            getTreatmentRequestData.treatmentRequestStatusID == treatmentRequestsStatus.ACKNOWLEDGEMENTREQUIRED
        ) {
            setIsAddTreatmentProvider(true);
            const result = dispatch(
                postExportTPAssignTreatmentData(
                    {
                        treatmentRequestID: getTreatmentRequestData?.id, // ! needs to ask
                        treatmentProviderID:
                            exportAssignTreatmentProviderForm?.current?._values?.treatmentProvider?.id,
                        placeOfTreatment:
                            exportAssignTreatmentProviderForm?.current?._values?.expectedPlaceOfTreatment,
                        dateOfTreatment:
                            exportAssignTreatmentProviderForm?.current?._values?.tentativeDateOfTreatment
                    },
                    (res: any) => {
                        if (res.hasOwnProperty("code") ? res.code !== "200" : res.message.code !== "200") {
                            debugger;
                            setIsAddTreatmentProvider(false);
                        } else {
                            debugger;
                            setIsAddTreatmentProvider(false);
                        }
                    }
                )
            );
            setVisibleDialog(false);
            return;
        }
        setIsReasonDialog(false);
        setVisibleDialog(false);
        setIsReasonDialog(true);
    }

    function inspectionOfficerConfirmOnFirstModal() {
        remarksForm.current.onSubmit();

        dispatch(
            postIoEndorseSubmitData({
                treatmentRequestID: getTreatmentRequestData?.id,
                treatmentRequestStatusID: "7",
                rejectionReason: "",
                cancellationReason: "",
                roleCode: dashboardInfo?.currentRole,
                rights: getRightsData, // rights must be provided
                iORemarks: remarksForm.current?._values?.remarks
            })
        );
        setVisibleDialog(false);
    }

    const confirmOnFirstModal = async () => {
     
        switch (dashboardInfo?.currentRole) {
            case UserRole.TreatmentProvider:
                treatmentProviderConfirmOnFirstModal()
                return;
            case UserRole.Trader:
            case UserRole.CustomAgent:
                traderAndCustomAgentConfirmOnFirstModal()
                return;
            case UserRole.InspectionOfficer:
                inspectionOfficerConfirmOnFirstModal()
                return;
            default:
                break;
        }
    };

    /* Payment Function */
    const onConfirmPaymentFunction = () => {
        setVisibleDialog(false);
        paymentConfirmation();
    };
    /* Payment Selection Confirmation */
    const paymentConfirmation = () => {
        swal({
            title: "Payment Alert!",
            text: "Do you want to receive payment through the system for treatment conducted?",
            icon: "warning",
            buttons: {
                customCloseBtn: {
                    text: "",
                    value: "Close",
                    closeModal: true,
                    className: styles.CancelBtn
                },
                cancel: {
                    text: "No",
                    value: "No",
                    visible: true,
                    closeModal: true
                },
                confirm: {
                    text: "Yes",
                    value: "Yes",
                    closeModal: true,
                    className: styles.confirmBtn
                }
            },
            closeOnClickOutside: false,
            closeOnEsc:false,
        }).then((value: any) => {
            switch (value) {
                case "Yes":
                    setIsReasonDialog(true);
                    setIsSystemPayment(true);
                    setIsSystemPaymentProcess(true);
                    break;
                case "No":
                    closePaymentModal(true);
                    break;
                case "Close":
                    closePaymentModal(false);
            }
          
        });
    };

    function validateContainers (updatedCommodities: any[]) {
        let error = ''

        let isContainarized = getTreatmentRequestData?.treatmentCertificate?.consignmentModeID ==
            consignmentModeType.CONTAINERIZED ||
            underProcessTreamtmentFormRef?.current?._values?.consignmentMode?.cargoId ==
            consignmentModeType.CONTAINERIZED

        if (!isContainarized) {
            return ''
        }
        
        if (updatedCommodities.length == 0) {
            if (checkEmptyContainer(getTreatmentRequestData?.treatmentRequestItems) && getTreatmentRequestData?.treatmentRequestItems?.length != updatedCommodities.length) {
                error = resources_EN.tp_treatment_provider_containerized_mode_error_message
            }
        } else {
            if (checkEmptyContainer(updatedCommodities) ) {
                error = resources_EN.tp_treatment_provider_containerized_mode_error_message
            }
        }

        return error
    }

    // * Handler for submitting treatment informtion in case of under process on TP side
    const onConfirmationUnderProcess = () => {
        // * new work
        setIsSaveState(false);
        underProcessTreamtmentFormRef?.current.onSubmit();
        console.log("underProcessTreamtmentFormRef?.current._values: ", underProcessTreamtmentFormRef?.current._values);
        setIsSystemPayment(getTreatmentRequestData?.isB2BEnabled);
        const updatedCommodities = saveCommodityContainerNumbers?.map(
            ({ declaredDescription, formDataIndex, hsCode, hsCodeExt, quantity, uomCode, ...rest }: any) => ({
                ...rest,
                id: parseInt(rest?.id)
            })
        );
        if (
            underProcessTreamtmentFormRef?.current?._values?.treatmentType?.id == treatmentTypes.FUMIGATION &&
            targetOfFumigationConform == ""
        ) {
            setIsTargetOfFumigationConform(true);
        } else {
            setIsTargetOfFumigationConform(false);
        }
        const containerValidationError = validateContainers(updatedCommodities)

        if (containerValidationError) {
            dispatch(
                setToastr({
                    title: "Error",
                    message: containerValidationError,
                    type: ToasterTypes.ERROR
                })
            );
            setVisibleDialog(false);
            return
        }
        if (
            underProcessTreamtmentFormRef?.current.isValid() &&
            underProcessTreamtmentFormRef?.current?._values?.treatmentType?.id != treatmentTypes.FUMIGATION
        ) {
            setUnderProcessTreatmentInformation(underProcessTreamtmentFormRef?.current._values);
            setVisibleDialog(true);
            setDailogMessage("Are you sure you want to submit the Treatment request?");
        }
        if (
            underProcessTreamtmentFormRef?.current.isValid() &&
            underProcessTreamtmentFormRef?.current?._values?.treatmentType?.id == treatmentTypes.FUMIGATION &&
            targetOfFumigationConform != ""
        ) {
            setUnderProcessTreatmentInformation(underProcessTreamtmentFormRef?.current._values);
            setVisibleDialog(true);
            setDailogMessage("Are you sure you want to submit the Treatment request?");
        }
    };
    // * Handler for regeneration of submitting treatment informtion in case of under process on TP side
    const onConfirmationRegenerationOfTreatmentCertificate = () => {
        // setIsSaveState(false);
        underProcessTreamtmentFormRef?.current.onSubmit();
        console.log("underProcessTreamtmentFormRef?.current._values: ", underProcessTreamtmentFormRef?.current._values);
        const updatedCommodities = saveCommodityContainerNumbers?.map(
            ({ declaredDescription, formDataIndex, hsCode, hsCodeExt, quantity, uomCode, ...rest }: any) => ({
                ...rest,
                id: parseInt(rest?.id)
            })
        );
        if (
            underProcessTreamtmentFormRef?.current?._values?.treatmentType?.id == treatmentTypes.FUMIGATION &&
            targetOfFumigationConform == ""
        ) {
            setIsTargetOfFumigationConform(true);
        } else {
            setIsTargetOfFumigationConform(false);
        }
        const containerValidationError = validateContainers(updatedCommodities)

        if (containerValidationError) {
            dispatch(
                setToastr({
                    title: "Error",
                    message: containerValidationError,
                    type: ToasterTypes.ERROR
                })
            );
            setVisibleDialog(false);
            return
        }
        if (targetOfFumigationConform == "") {
            setIsTargetOfFumigationConform(true);
        } else {
            setIsTargetOfFumigationConform(false);
        }
        if (underProcessTreamtmentFormRef?.current.isValid()) {
            setUnderProcessTreatmentInformation(underProcessTreamtmentFormRef?.current._values);
            setVisibleDialog(true);
            setDailogMessage("Are you sure you want to proceed with regeneration of Treatment Certificate?");
        }
    };
    // * Handler for Save submitting treatment informtion in case of under process on TP side
    const onConfirmationUnderProcessOnSave = () => {
        underProcessTreamtmentFormRef?.current.onSubmit();
        console.log("underProcessTreamtmentFormRef?.current._values: ", underProcessTreamtmentFormRef?.current._values);
        debugger;
        if (
            underProcessTreamtmentFormRef?.current?._values?.treatmentType?.id == treatmentTypes.FUMIGATION &&
            targetOfFumigationConform == ""
        ) {
            setIsTargetOfFumigationConform(true);
        } else {
            setIsTargetOfFumigationConform(false);
        }

        if (
            underProcessTreamtmentFormRef?.current.isValid() &&
            underProcessTreamtmentFormRef?.current?._values?.treatmentType?.id != treatmentTypes.FUMIGATION
        ) {
            setUnderProcessTreatmentInformation(underProcessTreamtmentFormRef?.current._values);
            setVisibleDialog(true);
            setIsSaveState(true);
            setDailogMessage("Are you sure you want to save the Treatment Certificate?");
        }
        if (
            underProcessTreamtmentFormRef?.current.isValid() &&
            underProcessTreamtmentFormRef?.current?._values?.treatmentType?.id == treatmentTypes.FUMIGATION &&
            targetOfFumigationConform != ""
        ) {
            setUnderProcessTreatmentInformation(underProcessTreamtmentFormRef?.current._values);
            setVisibleDialog(true);
            setIsSaveState(true);
            setDailogMessage("Are you sure you want to save the Treatment Certificate?");
        }
    };

    useEffect(() => {
        if (!_.isEmpty(singleSaveContainerNumber)) {
            console.log("singleSaveContainerNumber: ", singleSaveContainerNumber);
            saveContainerNumberHandler();
            setIsSystemPayment(false);
        }
    }, [singleSaveContainerNumber]);

    const saveContainerNumberHandler = () => {
        const updatedObjectPayload: any = {};
        updatedObjectPayload.id = parseInt(singleSaveContainerNumber?.id);
        updatedObjectPayload.containerNumber =
            singleSaveContainerNumber?.containerNumber == "" ? null : singleSaveContainerNumber?.containerNumber;
        dispatch(postUpdateContainerNumbersData(updatedObjectPayload));
    };

    const onConfirmationTreatmentChargesUnderProcessOnSave = async () => {
        const currentDate = new Date();
        const expiryDate = new Date(currentDate);
        expiryDate.setDate(currentDate.getDate() + 3);

        // underProcessTreamtmentChargesFormRef?.current.onSubmit();
        //

        // const cloneUnderProcessFormData = JSON.stringify(JSON.parse(underProcessTreatmentInformation));
        // setUnderProcessTreatmentInformation({ underProcessTreamtmentChargesFormRef?.current?._values, ...cloneUnderProcessFormData });
        //
        console.log("saveCommodityContainerNumbers: ", saveCommodityContainerNumbers);
        const updatedCommodities = saveCommodityContainerNumbers?.map(
            ({ declaredDescription, formDataIndex, hsCode, hsCodeExt, quantity, uomCode, ...rest }: any) => ({
                ...rest,
                id: parseInt(rest?.id)
            })
        );
        // console.log('filtered array: ', filteredArray);

        let requestObj: any = {
            roleCode: dashboardInfo?.currentRole,
            treatmentRequestID: getTreatmentRequestData?.id,
            id: getTPCertFetchSaveDataId || 0,
            certIssueDate: currentDate,
            certExpiryDate: expiryDate,
            targetID: saveInfoData?.targetTreatment?.id,
            chemical: saveInfoData?.chemical,
            dateOfTreatment: saveInfoData?.dateOfTreatment,
            treatmentTypeID: saveInfoData?.treatmentType?.id,
            placeOfTreatment: saveInfoData?.placeOfTreatment,
            concentration: saveInfoData?.concentration,
            prescribedDose: saveInfoData?.prescribedDose,
            appliedDoseRate: saveInfoData?.doseRate,
            exposedDuration: saveInfoData?.expectedPeriodDuration + " " + durationType,
            temperature: saveInfoData?.temperature + " " + temperatureType,
            conductionTypeID: saveInfoData?.treatmentConducted?.id,
            containerTypeID: saveInfoData?.containerType?.containerTypeId,
            consignmentModeID: saveInfoData?.consignmentMode?.cargoId,
            ventilation: saveInfoData?.ventilation,
            isTargetFumigationConfirmed: true,
            additionalDeclaration: saveInfoData?.addtionalDeclaration,
            additionalTreatmentInfo:saveInfoData?.additionalTreatmentInformation,
            amount: underProcessTreamtmentChargesFormRef?.current?._values?.treatmentCharges,
            isSave: true,
            commodities: []
        };
        if (updatedCommodities?.length > 0) {
            requestObj.commodities = updatedCommodities;
        }
        if (underProcessTreamtmentFormRef?.current?._values?.totalFumigationAppliedQty) {
            requestObj.totalFumigationAppliedQty =
                underProcessTreamtmentFormRef?.current?._values?.totalFumigationAppliedQty;
        }
        if (underProcessTreamtmentFormRef?.current?._values?.treatmentSubType?.id) {
            requestObj.treatmentSubTypeID = underProcessTreamtmentFormRef?.current?._values?.treatmentSubType?.id;
        }
        if (targetOfFumigationConform != "") {
            requestObj.isTargetFumigationConfirmed =
                targetOfFumigationConform == fumigationConformValue.YES ? true : false;
        }
        debugger;
        dispatch(postSubmitTreatmentCeritificateOnSaveData(requestObj, setIsSave));
        setVisibleDialog(false);
        // setIsSave(true);
        //     setIsReasonDialog(false)

        //     // setVisibleDialog(true)
        //     // setDailogMessage("Are you sure do you want to submit the treatment certificate?");
        // }
    };
   const onConfirmationTreatmentChargesUnderProcess = (systemPayment = false) => {
       debugger;
       const currentDate = new Date();
       const expiryDate = new Date(currentDate);
       expiryDate.setDate(currentDate.getDate() + 3);
       console.log("saveCommodityContainerNumbers: ", saveCommodityContainerNumbers);
       const updatedCommodities = saveCommodityContainerNumbers?.map(
           ({ declaredDescription, formDataIndex, hsCode, hsCodeExt, quantity, uomCode, ...rest }: any) => ({
               ...rest
           })
       );
       let requestObj: any = {
           roleCode: dashboardInfo?.currentRole,
           id: getTPCertFetchSaveDataId || 0,
           certIssueDate: currentDate,
           certExpiryDate: expiryDate,
           targetID: saveInfoData?.targetTreatment?.id,
           treatmentTypeID: saveInfoData?.treatmentType?.id,
           treatmentRequestID: getTreatmentRequestData?.id,
           placeOfTreatment: saveInfoData?.placeOfTreatment,
           chemical: underProcessTreatmentInformation?.chemical,
           concentration: underProcessTreatmentInformation?.concentration,
           prescribedDose: underProcessTreatmentInformation?.prescribedDose,
           appliedDoseRate: underProcessTreatmentInformation?.doseRate,
           dateOfTreatment: underProcessTreatmentInformation?.dateOfTreatment,
           exposedDuration: underProcessTreatmentInformation?.expectedPeriodDuration + " " + durationType,
           temperature: underProcessTreatmentInformation?.temperature + " " + temperatureType,
           conductionTypeID: underProcessTreatmentInformation?.treatmentConducted?.id,
           containerTypeID: underProcessTreatmentInformation?.containerType?.containerTypeId,
           consignmentModeID: underProcessTreamtmentFormRef?.current?._values?.consignmentMode?.cargoId,
           ventilation: underProcessTreamtmentFormRef?.current?._values?.ventilation,
           isTargetFumigationConfirmed: false,
           additionalDeclaration: underProcessTreatmentInformation?.addtionalDeclaration,
           additionalTreatmentInfo: underProcessTreatmentInformation?.additionalTreatmentInformation,
           amount: 0,
           isRegenerate: isRescind,
           isPaymentThroughPSW: systemPayment,
           isSave: false,
           commodities: []
       };
       console.log("data", getTreatmentRequestData);
       debugger;
       console.log("test condition 2", checkEmptyContainer(getTreatmentRequestData?.treatmentRequestItems));
       console.log(
           "test condition 1",
           underProcessTreamtmentFormRef?.current?._values?.consignmentMode?.cargoId ==
               consignmentModeType.CONTAINERIZED
       );
       const containerValidationError = validateContainers(updatedCommodities)

        if (containerValidationError) {
            dispatch(
                setToastr({
                    title: "Error",
                    message: containerValidationError,
                    type: ToasterTypes.ERROR
                })
            );
            setVisibleDialog(false);
            return
        }

       console.log("requedstObj: ", requestObj);
       debugger;

       if (updatedCommodities?.length > 0) {
           requestObj.commodities = updatedCommodities;
       }
       if (underProcessTreamtmentFormRef?.current?._values?.totalFumigationAppliedQty) {
           requestObj.totalFumigationAppliedQty =
               underProcessTreamtmentFormRef?.current?._values?.totalFumigationAppliedQty;
       }
       if (underProcessTreamtmentFormRef?.current?._values?.treatmentSubType?.id) {
           requestObj.treatmentSubTypeID = underProcessTreamtmentFormRef?.current?._values?.treatmentSubType?.id;
       }
       if (targetOfFumigationConform != "") {
           requestObj.isTargetFumigationConfirmed =
               targetOfFumigationConform == fumigationConformValue.YES ? true : false;
       }

       if (!isSystemPaymentProcess) {
           dispatch(postSubmitTreatmentCeritificateData(requestObj));
           setIsReasonDialog(false);
           setVisibleDialog(false);
           return;
       }
       underProcessTreamtmentChargesFormRef?.current.onSubmit();
       if (underProcessTreamtmentChargesFormRef?.current.isValid()) {
           underProcessTreamtmentChargesFormRef?.current.onSubmit();
           if (underProcessTreamtmentChargesFormRef?.current.isValid()) {
               requestObj.amount = parseInt(underProcessTreamtmentChargesFormRef?.current?._values?.treatmentCharges);
               dispatch(postSubmitTreatmentCeritificateData(requestObj));
               setIsReasonDialog(false);
               setVisibleDialog(false);
               // setVisibleDialog(true)
               // setDailogMessage("Are you sure do you want to submit the treatment certificate?");
           }
           if (isRescind) {
               dispatch(setRescindValueAction(false));
           }
       }
   };
    //* Workflow Bar Event Notifier Callback Function
    const notifyEvent = (command: IAvailableCommandsType) => {
        //*Set Command

        setCommand(command);
        debugger;
        switch (command.commandName) {
            case WFCommands.IOTreatmentCertificateEndorsedPreSD:
                {
                    if (isConcern) {
                        onHandleIOTreatmentConfirm();
                    } else {
                    }
                }
                break;
            case WFCommands.TPTreatmentCertificateSaveRequest:
                {
                    // onConfirmationTreatmentChargesUnderProcessOnSave();
                    if(error.doseRateError.trim().length < 1 && error.expectedPeriodError.trim().length < 1)
                    {
                    setIsSaveState(true);
                    onConfirmationUnderProcessOnSave();
                    }
                }
                break;
            case WFCommands.TRAssignRequest:
                {
                    onHandleRequest();
                }
                break;
            case WFCommands.TPTreatmentCertificateRescindedAndRegenerated:
                {
                    rescindAndRegenerateHandler();
                }
                break;
            case WFCommands.TPTreatmentCertificateIssuedRequest:
                {
                    if (
                        isIssueCertificateConfirmation &&
                        error.doseRateError.trim().length < 1 &&
                        error.expectedPeriodError.trim().length < 1
                    ) {
                        setIsSaveState(false);
                        onConfirmationUnderProcess();
                    } else {
                    }
                }
                break;
            case WFCommands.TRReassignRequest:
                {
                    onHandleRequest();
                }
                break;
            case WFCommands.TPTreatmentCertificatePreviewRequest:
                {
                    sepratePreviewFunction();
                }
                break;
            case WFCommands.TPRejectRequest:
            case WFCommands.TRCancelledRequest:
                {
                    onCancelRequest();
                }
                break;
            case WFCommands.TPAcceptRequest:
                {
                    onHandleRequest();
                }
                break;
        }
    };
    const isButtonAppear = () => {
        if (UserRole.TreatmentProvider == dashboardInfo?.currentRole) {
            if (getTPCertFetchSaveDataId == 0) {
                return true;
            }
            return false;
        }
        if (UserRole.Trader == dashboardInfo?.currentRole || dashboardInfo?.currentRole == UserRole.CustomAgent) {
            return false;
        }
        if (UserRole.InspectionOfficer == dashboardInfo?.currentRole) {
            return false;
        }
    };
    const isCancelButtonAppear = () => {
        if (
            (UserRole.Trader == dashboardInfo?.currentRole || dashboardInfo?.currentRole == UserRole.CustomAgent) &&
            getTreatmentRequestData?.initDocumentID > 0
        ) {
            return true;
        }

        return false;
    };

    const onConfirmationTreatmentChargesUnderProcessRegenerate = () => {
        debugger;
        const currentDate = new Date();
        const expiryDate = new Date(currentDate);
        expiryDate.setDate(currentDate.getDate() + 3);
        console.log("saveCommodityContainerNumbers: ", saveCommodityContainerNumbers);
        const updatedCommodities = saveCommodityContainerNumbers?.map(
            ({ declaredDescription, formDataIndex, hsCode, hsCodeExt, quantity, uomCode, ...rest }: any) => ({
                ...rest
            })
        );
        let requestObj: any = {
            roleCode: dashboardInfo?.currentRole,
            id: getTPCertFetchSaveDataId || 0,
            certIssueDate: currentDate,
            certExpiryDate: expiryDate,
            targetID: saveInfoData?.targetTreatment?.id,
            treatmentTypeID: saveInfoData?.treatmentType?.id,
            treatmentRequestID: getTreatmentRequestData?.id,
            placeOfTreatment: saveInfoData?.placeOfTreatment,
            chemical: underProcessTreatmentInformation?.chemical,
            concentration: underProcessTreatmentInformation?.concentration,
            prescribedDose: underProcessTreatmentInformation?.prescribedDose,
            appliedDoseRate: underProcessTreatmentInformation?.doseRate,
            dateOfTreatment: underProcessTreatmentInformation?.dateOfTreatment,
            exposedDuration: underProcessTreatmentInformation?.expectedPeriodDuration + " " + durationType,
            temperature: underProcessTreatmentInformation?.temperature + " " + temperatureType,
            conductionTypeID: underProcessTreatmentInformation?.treatmentConducted?.id,
            containerTypeID: underProcessTreatmentInformation?.containerType?.containerTypeId,
            consignmentModeID: underProcessTreamtmentFormRef?.current?._values?.consignmentMode?.cargoId,
            ventilation: underProcessTreamtmentFormRef?.current?._values?.ventilation,
            isTargetFumigationConfirmed: false,
            additionalDeclaration: underProcessTreatmentInformation?.addtionalDeclaration,
            additionalTreatmentInfo:underProcessTreatmentInformation?.additionalTreatmentInformation,
            amount: 0,
            isRegenerate: isRescind,
            isPaymentThroughPSW: isSystemPaymentProcess,
            isSave: false,
            commodities: []
        };
        console.log("data", getTreatmentRequestData);
        debugger;
        console.log("test condition 2", checkEmptyContainer(getTreatmentRequestData?.treatmentRequestItems));
        console.log(
            "test condition 1",
            underProcessTreamtmentFormRef?.current?._values?.consignmentMode?.cargoId ==
                consignmentModeType.CONTAINERIZED
        );
        const containerValidationError = validateContainers(updatedCommodities)

        if (containerValidationError) {
            dispatch(
                setToastr({
                    title: "Error",
                    message: containerValidationError,
                    type: ToasterTypes.ERROR
                })
            );
            setVisibleDialog(false);
            return
        }

        console.log("requedstObj: ", requestObj);
        debugger;

        if (updatedCommodities?.length > 0) {
            requestObj.commodities = updatedCommodities;
        }
        if (underProcessTreamtmentFormRef?.current?._values?.totalFumigationAppliedQty) {
            requestObj.totalFumigationAppliedQty =
                underProcessTreamtmentFormRef?.current?._values?.totalFumigationAppliedQty;
        }
        if (underProcessTreamtmentFormRef?.current?._values?.treatmentSubType?.id) {
            requestObj.treatmentSubTypeID = underProcessTreamtmentFormRef?.current?._values?.treatmentSubType?.id;
        }
        if (targetOfFumigationConform != "") {
            requestObj.isTargetFumigationConfirmed =
                targetOfFumigationConform == fumigationConformValue.YES ? true : false;
        }

        if (!isSystemPaymentProcess) {
            dispatch(postSubmitTreatmentCeritificateData(requestObj));
            setIsReasonDialog(false);
            setVisibleDialog(false);
            return;
        }
        underProcessTreamtmentChargesFormRef?.current.onSubmit();
        if (underProcessTreamtmentChargesFormRef?.current.isValid()) {
            underProcessTreamtmentChargesFormRef?.current.onSubmit();
            if (underProcessTreamtmentChargesFormRef?.current.isValid()) {
                requestObj.amount = parseInt(underProcessTreamtmentChargesFormRef?.current?._values?.treatmentCharges);
                dispatch(postSubmitTreatmentCeritificateData(requestObj));
                setIsReasonDialog(false);
                setVisibleDialog(false);
                // setVisibleDialog(true)
                // setDailogMessage("Are you sure do you want to submit the treatment certificate?");
            }
            if (isRescind) {
                dispatch(setRescindValueAction(false));
            }
        }
    };

    const hiddenButtons: any = [
        {
            buttonName: WFCommands.TPTreatmentCertificateIssuedPostSD,
            isHidden: true
        },
        {
            buttonName: WFCommands.IOTreatmentCertificateEndorsedPostSD,
            isHidden: true
        },
        {
            buttonName: WFCommands.TPTreatmentCertificatePreviewRequest,
            isHidden: isButtonAppear()
        },
        {
            buttonName: WFCommands.TRCancelledRequest,
            isHidden: isCancelButtonAppear()
        }
    ];

    const alternateDisplayNames = [
        {
            buttonName: WFCommands.TRTreatmentProviderAssigned,
            alternateDisplayName:
                getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus.TREATMENTREQUESTED ||
                getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus.ACKNOWLEDGEMENTREQUIRED
                    ? "Submit Treatment Request"
                    : "Reassign Treatment Provider"
        }
    ];

    const alternateStyleNames = [
        {
            buttonName: WFCommands.TRCancelledRequest,
            alternateStyleName: workflowButtonsStyling.REJECTED_BUTTON
        },
        {
            buttonName: WFCommands.TRReassignRequest,
            alternateStyleName: workflowButtonsStyling.APPROVED_BUTTON
        },
        {
            buttonName: WFCommands.IOTreatmentCertificateEndorsedPreSD,
            alternateStyleName: isConcern ? workflowButtonsStyling.APPROVED_BUTTON : styles.disabledCustomBtn
        },
        {
            buttonName: WFCommands.TPRejectRequest,
            alternateStyleName: workflowButtonsStyling.REJECTED_BUTTON
        },
        {
            buttonName: WFCommands.TPTreatmentCertificateIssuedRequest,
            alternateStyleName: isIssueCertificateConfirmation
                ? workflowButtonsStyling.APPROVED_BUTTON
                : styles.disabledCustomBtn
        }
    ];

    const onHandleIOTreatmentConfirm = () => {
        setDialogError(false);
        setDailogMessage("Are you sure, you want to endorse the treatment certificate?");
        setVisibleDialog(true);
    };

    const HandleCancelPrintPreview = () => {
        setOpenPrintPreview(false);
    };

    const onChangeCheckBox = (event: any) => {
        console.log("checkbox vALUE: ", event.value);
        setIsConcern(event.value);
    };
    const reasonDialogCloseHanlder = () => {
        if (isSystemPayment) {
            setIsSystemPaymentProcess(false);
            setIsReasonDialog(false);
            setIsSystemPayment(false);
            return;
        }
        return setIsReasonDialog(false);
    };

    const isVisibleDialogCancelBtnTextHandler = () => {
        let btnText = "Cancel";
        if (isSystemPayment) {
            btnText = "No";
        }
        return btnText;
    };

    const isVisibleDialogConfirmBtnTextHandler = () => {
        let btnText = "Confirm";
        if (isSystemPayment) {
            btnText = "Yes";
        }
        if (dialoagError) {
            btnText = "";
        }
        return btnText;
    };

    const handleExportToPdf = (props: any) => {
        const request: IPrintRequestData = {
            documentId: getTreatmentRequestData?.id,
            documentTypeCode: "TC",
            documentClassificationCode: "TPM",
            roleCode: dashboardInfo?.currentRole,
            rights: "",
            payload: ""
        };

        setPrintRequest(request);
        setIsExporting(true);
    };

    /* Show Error Modal */
    const showErrorModal = (message:string) => {
          swal({
            title: "Error",
            text:message,
            icon: "error",
    }).then((isDone:any) => {
        if(isDone)
        {
           props.history.push("/TPM/TreatmentCertificates/");
        }
    })
    }


    const ReasonDialog = () => {
        return (
            <DailogComponent
                btnName1="Cancel"
                customClassName={styles.customDialogClass}
                btnName2="Proceed"
                id="dialog-cancel"
                disabled={isAddTreatmentProvider || isReassignLoader}
                title={conditionalModalHeading(
                    dashboardInfo?.currentRole,
                    getTreatmentRequestData?.treatmentRequestStatusID,
                    isSystemPayment,
                    isReassign
                )}
                confirm={!isCancelledRequest ? onConfirmHandle : onHandleRejectionSubmit}
                isVisible={reasonDialog}
                closeDailog={reasonDialogCloseHanlder}>
                {!isCancelledRequest && !isSystemPayment && !isRescind ? (
                    <TreatmentInformation
                        isLoading={isLoading}
                        formRef={form2}
                        getTreatmentRequestData={getTreatmentRequestData}
                        getTreatmentProviderData={getTreatmentProviderData}
                        isTreatmentTypeVisible={false}
                        onTreatmentHandleSubmit={onModalFormSubmit}
                    />
                ) : isSystemPayment ? (
                    <TreatmentChargesForm
                        underProcessTreatmentInformation={underProcessTreatmentInformation}
                        formRef={underProcessTreamtmentChargesFormRef}
                    />
                ) : (
                    <RejectionForm
                        placeHolder={
                            dashboardInfo?.currentRole == UserRole.Trader ||
                                dashboardInfo?.currentRole == UserRole.CustomAgent
                                ? " Enter Cancellation Reason"
                                : "Enter Rejection Reason"
                        }
                        formLimit={
                            dashboardInfo?.currentRole == UserRole.Trader ||
                                dashboardInfo?.currentRole == UserRole.CustomAgent
                                ? formTextLimit.CANCELLATION
                                : formTextLimit.REJECTION
                        }
                        formRef={form1}
                        onRejectionHandleSubmit={onModalFormSubmit}
                        isLoading={isLoading}
                    />
                )}

                {/* <TextArea
                    // value={value}
                    // onChange={handleChange}
                    rows={5}
                    style={{ width: "98%" }}
                    placeholder="Enter reason for rejection"
                /> */}
            </DailogComponent>
        )
    }

    const RenderChild = () => {
        return (
            <>
                <SweetAlert
                    success={alertData?.variant == "success"}
                    danger={alertData?.variant == "danger"}
                    info={isInfo}
                    title={sweetAlertTitle}
                    show={alertData?.visible}
                    onConfirm={!isCancelledRequest ? onConfirm : onModalButtonRedirect}>
                    <label className={styles.messageStyle}>{sweetAlertMessage || alertData?.description}</label>
                </SweetAlert>
                <ReasonDialog />
                <DailogComponent
                    btnName1={isVisibleDialogCancelBtnTextHandler()}
                    btnName2={isVisibleDialogConfirmBtnTextHandler()}
                    id="dialog-cancel"
                    disabled={isAddTreatmentProvider}
                    confirm={confirmOnFirstModal}
                    closeDailog={isSystemPayment ? onConfirmationTreatmentChargesUnderProcess : setVisibleDialog}
                    isVisible={isVisible}
                    // closeDailog={setVisibleDialog}
                    message={dailogMessage}
                />
                {/* In case of export POST SD CASE */}
                {getTreatmentRequestData?.initDocumentID > 0 &&
                    dashboardInfo?.currentRole !== UserRole.TreatmentProvider ? (
                    <>
                        <CallTreatmentHistory
                            data={{
                                action: 0,
                                documentClassificationCode: DocumentClassificationCode.EXPORT_CERTIFICATE,
                                id: getTreatmentRequestData?.initDocumentID?.toString(),
                                initDocumentTypeCode: getTreatmentRequestData?.initDocumentTypeCode
                            }}
                            heading={"Call Treatment History"}
                            userRole={dashboardInfo?.currentRole}
                            size={MainArea}
                        />
                        <Form22TreatmentProviderHistory
                            data={{
                                action: 0,
                                documentClassificationCode: DocumentClassificationCode.EXPORT_CERTIFICATE,
                                id: getTreatmentRequestData?.initDocumentID?.toString(),
                                initDocumentTypeCode: getTreatmentRequestData?.initDocumentTypeCode
                            }}
                            heading={"Form 22 - Emergency Disinfestation or Disinfection Notification Details"}
                            userRole={dashboardInfo?.currentRole}
                            size={MainArea}
                        />
                    </>
                ) : (
                    <></>
                )}
                <br />
                {(dashboardInfo?.currentRole === UserRole.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent) &&
                    (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.TREATMENTREQUESTED ||
                        getTreatmentRequestData?.treatmentRequestStatusID ==
                        treatmentRequestsStatus?.ACKNOWLEDGEMENTREQUIRED) && (
                        <div className={styles.customClass}>
                            <HeadingWrapper customClass={styles.customClass} heading={"Select Treatment Provider"}>
                                <ExportTreatmentInformation
                                    isAddTreatmentProvider={isAddTreatmentProvider}
                                    isLoading={isLoading}
                                    formRef={exportAssignTreatmentProviderForm}
                                    getTreatmentRequestData={getTreatmentRequestData}
                                    getTreatmentProviderData={getTreatmentProviderData}
                                    getTreatmentTypeData={getTreatmentTypeData}
                                    onTreatmentHandleSubmit={onModalFormSubmit}
                                />
                            </HeadingWrapper>
                        </div>
                    )}

                {UserRole.InspectionOfficer == dashboardInfo?.currentRole &&
                    getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus.ASSIGNED && (
                        <>
                            <div className="px-3 py-2 border-bottom">
                                <div>
                                    <Checkbox
                                        label="I hereby confirm that treatment was conducted under my supervision and the Treatment Certificate generated is found in order."
                                        checked={isConcern}
                                        onChange={onChangeCheckBox}
                                        className={styles.customFontSize}
                                    // checked={isTermsChecked}
                                    // onChange={onTermsCheck}
                                    />
                                </div>
                                <RemarksForm formRef={remarksForm} label={"Officer Endorsement Remarks (Optional)"} />
                            </div>
                        </>
                    )}
                {dashboardInfo?.currentRole == UserRole.InspectionOfficer &&
                    getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.CERTIFICATEISSUED && (
                        <>
                            <Row className={`justify-content-end border-top mt-4 ${styles.customContainer}`}>
                                <Col xs="auto">
                                    <button
                                        id="accept"
                                        title="Submit"
                                        disabled={!isConcern}
                                        onClick={onHandleIOTreatmentConfirm}
                                        className={!isConcern ? styles.disabledBtn : styles.floatingBtnPrimary}>
                                        <FontAwesomeIcon icon={faCheck} className={"my-1 mr-1"} />
                                        <span>Submit</span>
                                    </button>
                                </Col>
                                <Col xs="auto">
                                    <button
                                        title="View Treatment Certificate"
                                        onClick={() => onCancelRequest()}
                                        className={`${styles.floatingBtnPrimary} btn-danger`}>
                                        <FontAwesomeIcon icon={faBookReader} className={"my-1 mr-1"} />
                                        <span>View Treatment Certificate</span>
                                    </button>
                                </Col>
                                <Col xs={"auto"}>
                                    <button
                                        id="backbutton"
                                        title="Back"
                                        onClick={() => props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
                                        className={`${styles.floatingBtnPrimary}`}>
                                        <FontAwesomeIcon icon={faArrowLeft} className={`my-1 mr-1 ${styles.iconFont}`} />
                                        <span>Back</span>
                                    </button>
                                </Col>
                            </Row>
                        </>
                    )}
                {UserRole.InspectionOfficer == dashboardInfo?.currentRole &&
                    getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.CERTIFICATEENDORSED && (
                        <div className="px-3 py-2">
                            <Row className="align-items-center">
                                <Col>
                                    <div>
                                        <Checkbox
                                            label="I hereby confirm that treatment was conducted under my supervision and the Treatment Certificate generated is found in order."
                                            checked={true}
                                            disabled
                                        // disabled={true}
                                        // onChange={onTermsCheck}
                                        />
                                    </div>
                                </Col>
                                <Col xs={"auto"}>
                                    <button
                                        id="backbutton"
                                        title="Back"
                                        onClick={() => props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
                                        className={`${styles.floatingBtnPrimary}`}>
                                        <FontAwesomeIcon icon={faArrowLeft} className={`my-1 mr-1`} />
                                        <span>Back</span>
                                    </button>
                                </Col>
                                <Col xs="auto">
                                    <button
                                        title="View Treatment Certificate"
                                        onClick={handleExportToPdf}
                                        className={`${styles.floatingBtnPrimary}`}>
                                        <FontAwesomeIcon icon={faBookReader} className={"my-1 mr-1"} />
                                        <span>View Treatment Certificate</span>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    )}
                {(UserRole.Trader == dashboardInfo?.currentRole ||
                    dashboardInfo?.currentRole == UserRole.CustomAgent ||
                    UserRole.TreatmentProvider == dashboardInfo?.currentRole) &&
                    (getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.CERTIFICATEENDORSED ||
                        getTreatmentRequestData?.treatmentRequestStatusID ==
                        treatmentRequestsStatus?.CERTIFICATETAGGED) && (
                        <div className="px-3 py-2">
                            <Row className="justify-content-end">
                                <Col className="p-0" xs={"auto"}>
                                    <button
                                        id="backbutton"
                                        title="Back"
                                        onClick={() => props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
                                        className={`${styles.floatingBtnPrimary}`}>
                                        <FontAwesomeIcon icon={faArrowLeft} className={`my-1 mr-1`} />
                                        <span>Back</span>
                                    </button>
                                </Col>
                                <Col className="pl-0" xs="auto">
                                    <button
                                        title="View Treatment Certificate"
                                        onClick={handleExportToPdf}
                                        className={`${styles.ViewBackButtonStyle}`}>
                                        <FontAwesomeIcon icon={faBookReader} className={"my-1 mr-1"} />
                                        <span>View Treatment Certificate</span>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    )}
                {dashboardInfo?.currentRole == UserRole.TreatmentProvider &&
                    getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.REJECTED && (
                        <>
                            <Row className={`justify-content-end border-top mt-4 ${styles.customContainer}`}>
                                <Col className="p-0" xs={"auto"}>
                                    <button
                                        id="backbutton"
                                        title="Back"
                                        onClick={() => props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
                                        className={`${styles.floatingBtnPrimary}`}>
                                        <FontAwesomeIcon icon={faArrowLeft} className={`my-1 mr-1`} />
                                        <span>Back</span>
                                    </button>
                                </Col>
                                <Col className="pl-0" xs="auto">
                                    <button
                                        title="View Treatment Certificate"
                                        onClick={sepratePreviewFunction}
                                        className={`${styles.ViewBackButtonStyle}`}>
                                        <FontAwesomeIcon icon={faBookReader} className={"my-1 mr-1"} />
                                        <span>View Treatment Certificate</span>
                                    </button>
                                </Col>
                            </Row>
                        </>
                    )}
                {/* {dashboardInfo?.currentRole == UserRole.Trader && getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.REJECTED && <>
                <Row className={`justify-content-end border-top mt-4 ${styles.customContainer}`}>
                    <Col xs="auto">
                        <button
                            id="accept"
                            title="Reassign Treatment Provider"
                            onClick={() =>
                                onHandleRequest()
                            }
                            className={styles.floatingBtnPrimary}>
                            <FontAwesomeIcon icon={faCheckCircle} className={"my-1 mr-1"} />
                            <span>Reassign Treatment Provider</span>
                        </button>
                    </Col>
                </Row>
            </>
            } */}
                {!isRescind && (
                    <Row className="justify-content-end align-items-center">
                        {getTreatmentRequestData?.treatmentRequestStatusID !=
                            treatmentRequestsStatus?.CERTIFICATEENDORSED &&
                            getTreatmentRequestData?.treatmentRequestStatusID !=
                            treatmentRequestsStatus?.CERTIFICATETAGGED && (
                                <>
                                    <Col className="p-0" xs={"auto"}>
                                        <button
                                            id="backbutton"
                                            title="Back"
                                            onClick={() => props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
                                            className={`${styles.ViewBackButtonStyle}`}>
                                            <FontAwesomeIcon
                                                icon={faArrowLeft}
                                                className={`my-1 mr-1 ${styles.iconFont}`}
                                            />
                                            <span>Back</span>
                                        </button>
                                    </Col>
                                    <Col xs={"auto"}>
                                        <WorkflowBar
                                            parameterName={WFParameters.TreatmentRequestIDSubmitted}
                                            parameterValue={getTreatmentRequestData?.id?.toString()}
                                            stateName={stateName}
                                            notifyEvent={notifyEvent}
                                            hideButton={hiddenButtons}
                                            alternateDisplayNames={alternateDisplayNames}
                                            alternateStyleNames={alternateStyleNames}
                                        // actionPriorities={null}
                                        />
                                    </Col>
                                </>
                            )}
                    </Row>
                )}
                {isRescind && (
                    <Row className="justify-content-end">
                        <Col className="p-0" xs={"auto"}>
                            <button
                                id="backbutton"
                                title="Back"
                                onClick={() => props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
                                className={`${styles.floatingBtnPrimary}`}>
                                <FontAwesomeIcon icon={faArrowLeft} className={`my-1 mr-1`} />
                                <span>Back</span>
                            </button>
                        </Col>
                        <Col xs="auto">
                            <button
                                id="subTreatmentCertificate"
                                title="Accept Request"
                                onClick={onConfirmationRegenerationOfTreatmentCertificate}
                                className={isIssueCertificateConfirmation ? styles.floatingBtnPrimary : styles.disabledBtn}>
                                <FontAwesomeIcon icon={faArrowAltCircleUp} className={"my-1 mr-1"} />
                                <span>Regenerate Treatment Certificate</span>
                            </button>
                        </Col>
                    </Row>
                )}
            </>
        )
    }

    


    return isLoading ? (
        <>
            <LoaderComponent />{" "}
        </>
    ) : (
        <View
            getTreatmentTypesBaseOnTreatmentProvider={getTreatmentProviderDataBaseOnTP}
            setSingleSaveContainerNumber={setSingleSaveContainerNumber}
            setIsTargetOfFumigationConform={setIsTargetOfFumigationConform}
            isTargetOfFumigationConform={isTargetOfFumigationConform}
            setTargetOfFumigationConform={setTargetOfFumigationConform}
            targetOfFumigationConform={targetOfFumigationConform}
            setSaveCommodityContainerNumbers={setSaveCommodityContainerNumbers}
            isRescind={isRescind}
            getTPCertificateFetchSaveData={getTPCertFetchSaveData}
            setSaveInfoData={setSaveInfoData}
            setDurationType={setDurationType}
            setTemperatureType={setTemperatureType}
            getConsignmentMode={getConsignmentMode}
            getContainerType={getContainerType}
            underProcessTreamtmentFormRef={underProcessTreamtmentFormRef}
            getConductionTreatment={getConductionTreatment}
            getTargetTreatment={getTargetTreatment}
            getTreatmentTypeData={getTreatmentTypeData}
            roleCode={dashboardInfo?.currentRole}
            isLoading={isLoading}
            data={getTreatmentRequestData}
            getTreatmentListData={getIssueTreatmentCertificate}
            remarksForm={remarksForm}
            error={error}
            setError={setError}
            {...props}>
            {
                // printing RO
                isExporting ? <ExportPdf printRequest={printRequest} /> : null
            }
            {openPrintPreview && <PrintPreview onClose={HandleCancelPrintPreview} requestData={printRequest} />}
            <RenderChild />
        </View>
    );
}
