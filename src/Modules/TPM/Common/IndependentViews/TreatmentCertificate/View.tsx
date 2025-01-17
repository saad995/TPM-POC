import { faArrowAltCircleUp, faArrowLeft, faBackward, faBookReader, faCheck, faCheckCircle, faImage, faPrint, faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox } from "@progress/kendo-react-inputs";
import { clearAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import DailogComponent from "Elements/Basic/Dailog/DailogComponent";
import LoaderComponent from "Elements/Basic/Loader/Loader";
import { IGetDashboardInfoResponseData } from "Layouts/AppLayout/AppLayoutInterfaces";
import { Role } from "Lib/Types/SharedTypes";
import { TradeTypes, checkEmptyContainer, conditionalModalHeading, consignmentModeType, tradeTypeOptions, treatmentRequestsStatus, treatmentTypes } from "Modules/Common/CommonUtility";
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
import { getTreatmentProviderList, getTreatmentSubTypesListData, getTreatmentTypesList } from "../../../TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestAction";
import TreatmentInformation from "../../../TreatmentCertificate/InitiateTreatmentRequest/TreatmentInfo/TreatmentInformation";
import { setSelectedTabValue } from "../../../TreatmentCertificate/TreatmentCertificatesActions";
import { getConsignmentModesListData, getContainerTypeListData, getTPCertificateFetchSaveData, getTargetTreatmentListData, getTreatmentConductionListData } from "../../../TreatmentCertificate/TreatmentUnderProcess/TreatmentUnderProcessAction";
import { getSingleTreatmentRequestData, postExportTPAssignTreatmentData, postIoEndorseSubmitData, postReassignTreatmentData, postRejectTreatmentRequestData, postSubmitTreatmentCeritificateData, postSubmitTreatmentCeritificateOnSaveData, postUpdateContainerNumbersData, setRescindValueAction, updateStatusSingleTreatmentRequest } from "../../../TreatmentCertificate/PendingTreatmentRequestList/PendingTreatmentRequestListAction";
import { setToastr } from "Modules/TPM/Constants/ToastrConfig";
import { ToasterTypes } from "Modules/Common/Helpers/ToastrConfig";
import { useParams } from "react-router";
import { getDashboardInfoAction, setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import ExportPdf from "Modules/TPM/Common/ExportPdf/ExportPdf";
import _, { rest } from "lodash";
import HeadingWrapper from "Modules/TPM/Common/HeadingWrapper/HeadingWrapper";
import ExportTreatmentInformation from "../../../TreatmentCertificate/InitiateTreatmentRequest/ExportTreatmentInfo/ExportTreatmentInformation";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import CallTreatmentHistory from "Modules/TPM/Common/CallTreatmentHistory/CallTreatmentHistory";
import { DocumentClassificationCode } from "Modules/TPM/Constants/Interfaces";
import Paths from "Modules/TPM/Constants/Paths";

import swal from "sweetalert";
export default function TreatmentCertificateIndependentView(props: any) {
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
        (state: RootStore) => state.IndependentViewReducer.singleTreatmentRequestsData
    );
    // *Get Rights Data From Store
    const getRightsData: any = useSelector((state: RootStore) => state.TreatmentCertificatesReducer.ioRightsData);
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
    const isLoading: any = useSelector((state: RootStore) => state.IndependentViewReducer.loading);
    // *Get treatmentProvider  Data From Store
    const getTreatmentProviderData: any = useSelector(
        (state: RootStore) => state?.InitiateTreatmentRequestReducer?.treatmentProviders
    );
    // *Get alert  Data From Store
    const isRescind: any = useSelector((state: RootStore) => state.IndependentViewReducer.isRescind);
    // *Get isRescind From Store
    const alertData: any = useSelector((state: RootStore) => state.alert);
    /**
     * ! End of Redux States
     */

    const [show, setShow] = useState(false);
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
    // const [isRescind, isSetRescind] = useState(false);
     const [error, setError] = useState({ doseRateError: "", expectedPeriodError: "" });

   
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

    useEffect(() => {
        dispatch(getDashboardInfoAction(() => 0));
    }, []);
    //* Retrive request data if already set in previous request

    useEffect(() => {
        const gridInfoStoreHistoryObject: any = localStorage.getItem("gridInfoStoreHistoryObject");

        if (getTreatmentRequestData != null && getTreatmentRequestData?.initDocumentID > 0) {
            // * For Export
            if (getTreatmentRequestData?.tradeTypeID == TradeTypes.EXPORT) {
                initDocumentID = getTreatmentRequestData?.initDocumentID; // Number(param.id);
                gridInfoStoreHistory.documentClassificationCode = DocumentClassificationCode.EXPORT_CERTIFICATE;
                gridInfoStoreHistory.id = getTreatmentRequestData?.initDocumentID?.toString();
                gridInfoStoreHistory.initDocumentTypeCode = getTreatmentRequestData?.initDocumentTypeCode?.toString();
                gridInfoStoreHistory.action = 0;
            }
            // * For Import
            if (getTreatmentRequestData?.tradeTypeID == TradeTypes.IMPORT) {
                initDocumentID = getTreatmentRequestData?.initDocumentID; // Number(param.id);
                gridInfoStoreHistory.documentClassificationCode = DocumentClassificationCode.RELEASE_ORDER;
                gridInfoStoreHistory.id = getTreatmentRequestData?.initDocumentID?.toString();
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
        dispatch(setPageTitleAction("Loading..."));
    }, []);

    useEffect(() => {
        setIsSaveState(false);
        if (param?.id) {
            dispatch(setPageTitleAction("Treatment Certificate"));
        }
        dispatch(getTreatmentProviderList({ id: 0 }));
        dispatch(getTargetTreatmentListData({ id: 0 }));
        dispatch(getTreatmentConductionListData({ id: 0 }));
        if (dashboardInfo?.currentRole == UserRole.TreatmentProvider) {
            dispatch(
                getTPCertificateFetchSaveData({
                    roleCode: dashboardInfo?.currentRole,
                    treatmentRequestId: props?.location?.state?.id,
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
                UserRole.TreatmentProvider == dashboardInfo?.currentRole) &&
                props?.location?.state?.treatmentRequestStatusID == treatmentRequestsStatus.CERTIFICATEISSUED) ||
            props?.location?.state?.treatmentRequestStatusID == treatmentRequestsStatus.CERTIFICATEENDORSED ||
            props?.location?.state?.treatmentRequestStatusID == treatmentRequestsStatus.ASSIGNED
        ) {
            dispatch(
                getSingleTreatmentRequestData(
                    {
                        treatmentRequestId: 0,
                        roleCode: dashboardInfo?.currentRole,
                        payload: param?.id || "",
                        rights: ""
                    },
                    showErrorModal
                )
            );
        }
        if (
            (UserRole.Trader == dashboardInfo?.currentRole ||
                UserRole.TreatmentProvider == dashboardInfo?.currentRole) &&
            props?.location?.state?.treatmentRequestStatusID != treatmentRequestsStatus.CERTIFICATEISSUED &&
            props?.location?.state?.treatmentRequestStatusID != treatmentRequestsStatus.CERTIFICATEENDORSED &&
            props?.location?.state?.treatmentRequestStatusID != treatmentRequestsStatus.ASSIGNED
        ) {
            dispatch(
                getSingleTreatmentRequestData(
                    {
                        treatmentRequestId: 0,
                        payload: param?.id || "",
                        roleCode: dashboardInfo?.currentRole,
                        rights: ""
                    },
                    showErrorModal
                )
            );
        }
        if (UserRole.InspectionOfficer == dashboardInfo?.currentRole) {
            dispatch(
                getSingleTreatmentRequestData(
                    {
                        treatmentRequestId: 0,
                        payload: param?.id || "",
                        roleCode: dashboardInfo?.currentRole,
                        rights: ""
                    },
                    showErrorModal
                )
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
        if (dashboardInfo?.currentRole == UserRole.TreatmentProvider) {
            console.log(props?.location?.state);
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
    //     debugger
    //     if (UserRole.InspectionOfficer == dashboardInfo?.currentRole) {
    //         debugger
    //         dispatch(
    //             getSingleTreatmentRequestData({
    //                 treatmentRequestId: parseInt(props?.location?.state?.treatmentRequestID),
    //                 roleCode: dashboardInfo?.currentRole,
    //                 // rights: getRightsData // ! commented by backend
    //                 rights: ""
    //             })
    //         );
    //     }
    // }, [getRightsData,dashboardInfo,getTreatmentRequestData])

    function getTitleForTraderByStatus (status: number) {
        let title = ""

        if (status == treatmentRequestsStatus?.TREATMENTREQUESTED) {
            title = "View Treatment Request"   
        } else if (status == treatmentRequestsStatus?.PENDING || status == treatmentRequestsStatus?.RESSIGNED) {
            title = "View Pending Treatment Request"
        } else if (status == treatmentRequestsStatus?.ACCEPTED) {
            title = "View Treatment Under Process"
        } else if (status == treatmentRequestsStatus?.ASSIGNED || status == treatmentRequestsStatus.CERTIFICATEISSUED || status == treatmentRequestsStatus.CERTIFICATEENDORSED) {
            title = "View Issued Treatment Certificate"
        } else if (status == treatmentRequestsStatus?.REJECTED) {
            title = "View Rejected Treatment Request"
        }

        return title
    }

    function getTitleForTreatmentProviderByStatus(status: number) {
        let title = ''

        if (status == treatmentRequestsStatus?.PENDING || status == treatmentRequestsStatus?.RESSIGNED) {
            title = "View Pending Treatment Request"
        } else if (status == treatmentRequestsStatus?.ACCEPTED) {
            title = "View Treatment Under Process"
        } else if (status == treatmentRequestsStatus?.ASSIGNED || status == treatmentRequestsStatus.CERTIFICATEISSUED || status == treatmentRequestsStatus.CERTIFICATEENDORSED) {
            title = "View Issued Treatment Certificate"
        }

        if (props?.location?.state?.isRegenerated) {
            title = "View Rescinded Treatment Certificate"
        }

        return title;
    }

    function getTitleForInspectionOfficerByStatus(status: number) {
        let title = ""

        if (status == treatmentRequestsStatus?.ASSIGNED) {
            title = "View Treatment Certificate"
        } else if (status == treatmentRequestsStatus?.CERTIFICATEENDORSED) {
            title = "View Treatment Certificate"
        }

        return title
    }

    function setUpPageTitle () {
        // * Set up title of the page
        // * NOTE : FOR [ TRADER | TREATMENT PROVIDER | INSPECTION OFFICER ]
        let title = ""

        if (dashboardInfo?.currentRole == UserRole.Trader) {
            title = getTitleForTraderByStatus(getTreatmentRequestData?.treatmentRequestStatusID)
        } else if (dashboardInfo?.currentRole == UserRole.TreatmentProvider) {
            title = getTitleForTreatmentProviderByStatus(getTreatmentRequestData?.treatmentRequestStatusID)
        } else if (dashboardInfo?.currentRole == UserRole.InspectionOfficer) {
            title = getTitleForInspectionOfficerByStatus(getTreatmentRequestData?.treatmentRequestStatusID)
        } 

        dispatch(setPageTitleAction(title));
        // ! END OF [ FOR TRADER | TREATMENT PROVIDER | INSPECTION OFFICER ]
        // ! End of setup title of page
    }

    function setUpWorkflowState () {
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
    }

    useEffect(() => {
        setUpPageTitle()

        setUpWorkflowState()
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
            case UserRole.Trader: {
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
        setVisibleDialog(true);
        return setDailogMessage("Are you sure want to rescind and regenerate the Treatment Certificate ?");
    };

    const onHandleRejectionSubmit = async (dataItem: any) => {
        if (UserRole.InspectionOfficer == dashboardInfo?.currentRole) {
        }

        if (UserRole.Trader == dashboardInfo?.currentRole) {
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
            getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.UNDERPROCESS &&
            isSystemPayment
        ) {
            onConfirmationTreatmentChargesUnderProcess();
            return;
        }
        // * Condition for trader
        if (dashboardInfo?.currentRole == UserRole.Trader) {
            form2.current.onSubmit();
            if (form2.current.isValid()) {
                const result = dispatch(
                    postReassignTreatmentData({
                        treatmentRequestId: getTreatmentRequestData?.id, // ! needs to ask
                        treatmentRequestStatusID: treatmentRequestsStatus.RESSIGNED,
                        treatmentProviderId: form2?.current?._values?.treatmentProvider?.id,
                        placeOfTreatment: form2?.current?._values?.expectedPlaceOfTreatment
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
            setDailogMessage("Are you sure you want to issue the Treatment Certificate?");
        }
        if (
            underProcessTreamtmentFormRef?.current.isValid() &&
            underProcessTreamtmentFormRef?.current?._values?.treatmentType?.id == treatmentTypes.FUMIGATION &&
            targetOfFumigationConform != ""
        ) {
            setUnderProcessTreatmentInformation(underProcessTreamtmentFormRef?.current._values);
            setVisibleDialog(true);
            setDailogMessage("Are you sure you want to issue the Treatment Certificate?");
        }
    };
    // * Handler for regeneration of submitting treatment informtion in case of under process on TP side
    const onConfirmationRegenerationOfTreatmentCertificate = () => {
        underProcessTreamtmentFormRef?.current.onSubmit();
        if (targetOfFumigationConform == "") {
            setIsTargetOfFumigationConform(true);
        } else {
            setIsTargetOfFumigationConform(false);
        }
        if (underProcessTreamtmentFormRef?.current.isValid() && targetOfFumigationConform != "") {
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
        updatedObjectPayload.containerNumber = singleSaveContainerNumber?.containerNumber;
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
            targetID: 1,
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
            requestObj.isTargetFumigationConfirmed = targetOfFumigationConform != "";
        }
        debugger;
        dispatch(postSubmitTreatmentCeritificateOnSaveData(requestObj));
        setVisibleDialog(false);
        setIsSave(true);
        //     setIsReasonDialog(false)

        //     // setVisibleDialog(true)
        //     // setDailogMessage("Are you sure do you want to submit the treatment certificate?");
        // }
    };
    const onConfirmationTreatmentChargesUnderProcess = () => {
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
            targetID: 1,
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
            requestObj.isTargetFumigationConfirmed = targetOfFumigationConform != "";
        }

        if (!isSystemPaymentProcess) {
            dispatch(postSubmitTreatmentCeritificateData(requestObj));
            setIsReasonDialog(false);
            setVisibleDialog(false);
            return;
        }
        debugger;
        underProcessTreamtmentChargesFormRef?.current.onSubmit();
        if (underProcessTreamtmentChargesFormRef?.current.isValid() && targetOfFumigationConform != "") {
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
                        setDialogError(true);
                        setVisibleDialog(true);
                        setDailogMessage("Please confirm that treatment was conducted under your supervision.");
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
                         
                         error.doseRateError.trim().length < 1 &&
                         error.expectedPeriodError.trim().length < 1
                     )
                     {
                         setIsSaveState(false);
                    onConfirmationUnderProcess();
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
        if (UserRole.Trader == dashboardInfo?.currentRole) {
            return false;
        }
        if (UserRole.InspectionOfficer == dashboardInfo?.currentRole) {
            return false;
        }
    };
    const isCancelButtonAppear = () => {
        if (UserRole.Trader == dashboardInfo?.currentRole && getTreatmentRequestData?.initDocumentID > 0) {
            return true;
        }

        return false;
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
                getTreatmentRequestData?.tradeTypeID == TradeTypes.EXPORT &&
                getTreatmentRequestData.treatmentRequestStatusID == treatmentRequestsStatus.TREATMENTREQUESTED
                    ? "Submit Treatment Request"
                    : "Reassign Treatment Provider"
        }
           
    ];

    const alternateStyleNames = [
        {
            buttonName: WFCommands.TRCancelledRequest,
            alternateStyleName: "ViewIPRejectButtonStyle" // hardcoding for now
        },
        {
            buttonName: WFCommands.TRReassignRequest,
            alternateStyleName: "ViewIPApproveButtonStyle" // hardcoding for now
        },
        {
            buttonName: WFCommands.TPRejectRequest,
            alternateStyleName: "ViewIPRejectButtonStyle" // hardcoding for now
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
    const showErrorModal = (message: string) => {
        swal({
            title: "Error",
            text: message,
            icon: "error"
        })
    };

    return isLoading ? (
        <>
            <LoaderComponent />{" "}
        </>
    ) : (
        <View
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

            {UserRole.InspectionOfficer == dashboardInfo?.currentRole &&
                getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.CERTIFICATEENDORSED && (
                    <div className="px-3 py-2">
                        <Row className="justify-content-end">
                            <Col xs="auto">
                                <button
                                    title="download"
                                    onClick={handleExportToPdf}
                                    className={`${styles.floatingBtnPrimary}`}>
                                    <FontAwesomeIcon icon={faPrint} className={"my-1 mr-1"} />
                                    {/* <span>View Treatment Certificate</span> */}
                                </button>
                            </Col>
                        </Row>
                    </div>
                )}
            {UserRole.Trader == dashboardInfo?.currentRole &&
                getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.CERTIFICATEENDORSED && (
                    <div className="px-3 py-2">
                        <Row className="justify-content-end">
                            {/* <Col className="p-0" xs={'auto'} >
                        <button
                            id="backbutton"
                            title="Back"
                            onClick={()=> props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
                            className={`${styles.floatingBtnPrimary}`}>
                            <FontAwesomeIcon icon={faArrowLeft} className={`my-1 mr-1`} />
                            <span>Back</span>
                        </button>
                    </Col> */}
                            <Col className="pl-0" xs="auto">
                                <button
                                    title="download"
                                    onClick={handleExportToPdf}
                                    className={`${styles.ViewBackButtonStyle}`}>
                                    <FontAwesomeIcon icon={faPrint} className={"my-1 mr-1"} />
                                    {/* <span>View Treatment Certificate</span> */}
                                </button>
                            </Col>
                        </Row>
                    </div>
                )}
            {/* {dashboardInfo?.currentRole == UserRole.TreatmentProvider && getTreatmentRequestData?.treatmentRequestStatusID == treatmentRequestsStatus?.REJECTED && <>
                <Row className={`justify-content-end border-top mt-4 ${styles.customContainer}`}>
                <Col className="p-0" xs={'auto'} >
                        <button
                            id="backbutton"
                            title="Back"
                            onClick={()=> props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
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
            } */}
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
                        treatmentRequestsStatus?.CERTIFICATEENDORSED && (
                        <Col className="p-0" xs={"auto"}>
                            <button
                                id="backbutton"
                                title="Back"
                                onClick={() => props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
                                className={`${styles.ViewBackButtonStyle}`}>
                                <FontAwesomeIcon icon={faArrowLeft} className={`my-1 mr-1 ${styles.iconFont}`} />
                                <span>Back</span>
                            </button>
                        </Col>
                    )}
                    {/* <Col xs={'auto'} >
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
                    </Col> */}
                </Row>
            )}
            {/* {
                isRescind && <Row className="justify-content-end" >
                    <Col className="p-0" xs={'auto'} >
                        <button
                            id="backbutton"
                            title="Back"
                            onClick={()=> props.history.push(`${Paths.TreatmentProviderTrader.TcGrid}`)}
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
                            className={styles.floatingBtnPrimary}>
                            <FontAwesomeIcon icon={faArrowAltCircleUp} className={"my-1 mr-1"} />
                            <span>Regenerate Treatment Certificate</span>
                        </button>
                    </Col>
                </Row>
            } */}
        </View>
    );
}
