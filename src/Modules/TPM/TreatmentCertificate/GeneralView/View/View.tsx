import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

//Bootstrp
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

//Kendo
import { Checkbox } from "@progress/kendo-react-inputs";

//fontawesome

//Shared Components

//Constants
import {
    DocumentClassificationCode,
    TreatmentCertificationCode
} from "Modules/TPM/Constants/Interfaces";

import { RootStore } from "Store";

import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";

//Components
import ConsignmentDescription from "Modules/TPM/TreatmentCertificate/GeneralView/View/ConsignmentDescription/ConsignmentDescription";
import BasicInfo from "Modules/TPM/ReleaseOrder/View/BasicInfo/BasicInfo";

// import CallLab from "Modules/TPM/Common/CallLab/CallLab";
// import PhysicalInspectionView from "Modules/TPM/Common/PhysicalInspection/View/View";
import Style from "./View.module.scss";

import {
    ExportCertificateDetailsFromSD,
    IViewResponseData
} from "./ViewInterfaces";
// import { IUserRightsRequestData } from "Modules/TPM/Common/UserRights/UserRightsInterfaces";
// import { getUserRightsAction } from "Modules/TPM/Common/UserRights/UserRightsActions";

import ViewPanel from "Elements/Basic/ViewPanel/ViewPanel";

// WFS Imports
import { Splitter, SplitterOnChangeEvent } from "@progress/kendo-react-layout";
import { IAvailableCommandsType } from "Modules/Common/Workflow/WorkflowInterfaces";
// import PrintTemplate from "Modules/TPM/Common/PrintTemplate/PrintTemplate";
import LoaderComponent from "Elements/Basic/Loader/Loader";
import { dateConstant, treatmentRequestsStatus } from "Modules/Common/CommonUtility";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import RemarksForm from "Modules/TPM/Common/ReuseableForms/RemarksForm/RemarksForm";
import TreatmentInformationForm from "Modules/TPM/Common/ReuseableForms/TreatmentInformationForm/TreatmentInformationForm";
import moment from "moment";
import TreatmentRejectionHistory from "../RejectionHistory/TreatmentRejectionHistory";

function renderStringValue (value: string, defaultVal: string = 'N/A') {
    if (value) return value

    return defaultVal
}

const View = (props: any) => {
    // * Getting data from props
    const { getTreatmentTypesBaseOnTreatmentProvider, setSingleSaveContainerNumber, targetOfFumigationConform, setTargetOfFumigationConform, isTargetOfFumigationConform, setIsTargetOfFumigationConform, setSaveCommodityContainerNumbers, isRescind, getTreatmentListData, remarksForm, getTPCertificateFetchSaveData, setSaveInfoData, setDurationType, setTemperatureType, getConsignmentMode, getContainerType, underProcessTreamtmentFormRef, data, isLoading, roleCode, getTreatmentTypeData, getTargetTreatment, getConductionTreatment,error,setError } = props;

    const demoRef = useRef(null);


    // ! End of Getting Data from props

    //* Component states

    const [panes, setPanes] = useState<Array<any>>([{ min: "360px" }]);
    const [rowHandler, setRowHandler] = useState<string | undefined>(undefined);
    const [lableExportCertificate, setlableExportCertificate] = useState(false);
    const [show, setShow] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [isReject, setReject] = useState(false);
    const [reasonDialog, setIsReasonDialog] = useState(false);
    const [isInfo, setInfo] = useState(false);
    const [dailogMessage, setDailogMessage] = useState("");
    const [isVisible, setVisibleDialog] = useState(false);
    const [sweetAlertMessage, setSweetAlertMessage] = useState("");
    const [consignmentInfo, setConsignmentInformation] = useState({});
    const [commodityInformation, setCommodityInformation] = useState([]);       
    // *  states 
    const [basicInformation, setBasicInformation] = useState<any>({});
    const [treatmentInfo, setTreatmentInfo] = useState({});
    const [rejectedHistoryData,setRejectedHistoryData]=useState([]);

    // ! End of Component States
    //*  Hooks
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

    const [infoSpan, setInfoSpan] = useState([
        { lg: "col-lg-4", xl: "col-xl-4" },
        { lg: "col-lg-4", xl: "col-xl-4" },
        { lg: "col-lg-4", xl: "col-xl-4" }
    ]);

    useEffect(() => {
        // TODO: Need to seprate data according to the section and make set state to reflect into the ui

        // const { createdOn, contactNumber, sdDocumentNumber, emailAddress, placeOfTreatment, treatmentType, requestDocumentNumber, tradeType, dateOfTreatment, treatmentRequestStatusID, consignorName, consignorAddress, consigneeName, consigneeAddress, originCountry, portOfLoading, destinationCountry, city, agencySite, treatmentRequestItems } = data;
          
        const getTreatmentRequestListData = getTreatmentListData?.filter((item: any) => item?.id == data?.id)[0];
        const treatmentRequestHistoryData = data?.treatmentRequestRejectionHistory?.map((item: any) => ({
            ...item,
            rejectedOn: moment(item?.updatedOn).format('DD-MM-YYYY'),
        }));
        setRejectedHistoryData(treatmentRequestHistoryData);
        const consignmentInformation = {
            consignorName: renderStringValue(data?.consignorName, 'N / A'),
            consignorAddress: renderStringValue(data?.consignorAddress, 'N / A'),
            consigneeName: renderStringValue(data?.consigneeName, 'N / A'),
            consigneeAddress: renderStringValue(data?.consigneeAddress, 'N / A'),
            originCountry: renderStringValue(data?.originCountry, 'N / A'),
            portOfLoading: renderStringValue(data?.portOfLoading, 'N / A'),
            collectorate: renderStringValue(data?.collectorate, 'N / A'),
            destinationCountry: renderStringValue(data?.destinationCountry, 'N / A'),
            city: renderStringValue(data?.city, 'N / A'),
            agencySite: renderStringValue(data?.agencySite, 'N / A'),
            location: renderStringValue(data?.location)
        }
        const basicInfoObj: any = {
            requestDocumentNumber: data?.requestDocumentNumber,
            treatmentCertificateNumber: data?.treatmentCertificate?.documentNumber,
            tradeType: data?.tradeType || getTreatmentRequestListData?.tradeType,
            createdOn: data?.createdOn,
            treatmentRequestStatusID: data?.treatmentRequestStatusID || getTreatmentRequestListData?.treatmentRequestStatusID,
            sdDocumentNumber: data?.sdDocumentNumber || getTreatmentRequestListData?.sdDocumentNumber,
            documentNumber: data?.documentNumber,
            certIssueDate: data?.certIssueDate,
            treatmentCertificate: data?.treatmentCertificate,
            officerName:data?.officerName
        }
        console.log("Dataaa",data);
        const treatmentInfo: any = {
            treatmentType: data?.treatmentType,
            treatmentTypeID: data?.treatmentTypeID,
            placeOfTreatment: renderStringValue(data?.placeOfTreatment, 'N / A'),
            dateOfTreatment:
                data?.dateOfTreatment !== dateConstant.EXCLUDED && data?.dateOfTreatment != null
                    ? moment(data?.dateOfTreatment).format("DD-MM-YYYY")
                    : "N/A",
            contactNumber: renderStringValue(data?.contactNumber),
            emailAddress: renderStringValue(data?.emailAddress),
            treatmentProvider: renderStringValue(data?.treatmentProvider),
            treatmentSubTypeName: renderStringValue(data?.treatmentSubTypeName),
            rejectionReason:
                data?.treatmentRequestStatusID == treatmentRequestsStatus.REJECTED
                    ? `${renderStringValue(data?.rejectionReason)}`
                    : "",
            additionalDeclaration: data?.treatmentCertificate?.additionalDeclaration,
            appliedDoseRate: data?.treatmentCertificate?.appliedDoseRate,
            chemical: data?.treatmentCertificate?.chemical,
            prescribedDose: data?.treatmentCertificate?.prescribedDose,
            totalFumigationAppliedQty: data?.treatmentCertificate?.totalFumigationAppliedQty,
            ventilation: data?.treatmentCertificate?.ventilation,
            concentration: data?.treatmentCertificate?.concentration,
            conductionType: data?.treatmentCertificate?.conductionType,
            consignmentMode: data?.treatmentCertificate?.consignmentMode,
            containerType: data?.treatmentCertificate?.containerType,
            exposedDuration: data?.treatmentCertificate?.exposedDuration,
            temperature: data?.treatmentCertificate?.temperature,
            additionalTreatmentInfo: data?.additionalTreatmentInfo,
        };
        setBasicInformation(basicInfoObj);
        setConsignmentInformation(consignmentInformation);

        setTreatmentInfo(treatmentInfo);
        const commoditryInformaiton = data?.treatmentRequestItems?.map(({ UpdatedOn, UpdatedBy
            , TreatmentRequestID, terrifDescription, TableName, SoftDelete, PrimaryKeyName, PrimaryKey, ItemDescriptionExt, ItemDescription, CreatedBy, CreatedOn, itemDescription, itemDescriptionExt, HSCodeExt, ...keepAttrs }: any) => keepAttrs)
        setCommodityInformation(commoditryInformaiton)
    }, [data]);



    const onPaneChange = (event: SplitterOnChangeEvent) => {
        setPanes(event.newState);
        let splitter: HTMLDivElement = document.getElementById("ExportCertificateSplit")?.firstChild as HTMLDivElement;

        let mainSize = "";
        let secondSize = "";


        if (event.newState[0].size != undefined) {
            mainSize = event.newState[0].size;
        } else if (event.newState[1].size != undefined) {
            mainSize = (splitter?.clientWidth * ((100 - parseInt(event.newState[1].size)) / 100)).toString() + "px";
            secondSize = (splitter?.clientWidth * (parseInt(event.newState[1].size) / 100)).toString() + "px";
        }

        setMainArea(mainSize);
    };
    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );
    const [command, setCommand] = useState(emptyCommand);
    const [MainArea, setMainArea] = useState<string | undefined>(undefined);
    // Retrive request data if already set in previous request

    const handleShowSweetAlert = (
        showAlert: boolean = false,
        status: Number,
        itemWiseResponse: { pendingItemsCount: number; statusID: number }
    ) => { };

    const handleSaveExtItemSweetAlert = () => { }

    function shouldShowTreatmentInformation () {
        if ((roleCode == UserRole.TreatmentProvider && [treatmentRequestsStatus?.PENDING, treatmentRequestsStatus?.CERTIFICATEENDORSED, treatmentRequestsStatus?.CERTIFICATETAGGED, treatmentRequestsStatus?.CERTIFICATEISSUED, treatmentRequestsStatus?.RESSIGNED, treatmentRequestsStatus?.REJECTED].includes(basicInformation?.treatmentRequestStatusID))) {
            return true
        } else if (roleCode != UserRole.TreatmentProvider && ![treatmentRequestsStatus?.UNDERPROCESS].includes(basicInformation?.treatmentRequestStatusID)) {
            return true
        } else if (roleCode == UserRole.Trader && basicInformation?.treatmentRequestStatusID == treatmentRequestsStatus?.UNDERPROCESS) {
            return true
        } else if (roleCode == UserRole.TreatmentProvider && basicInformation?.treatmentRequestStatusID == treatmentRequestsStatus?.ASSIGNED && !isRescind) {
            return true
        }

        return false

    }

    return (
            <>
                <div className="mr-3 ml-3">
                    <BasicInfo roleCode={roleCode} data={basicInformation} />
                </div>
                {true && (
                    <>
                        <span id="ExportCertificateSplit">
                            <Splitter
                                panes={panes}
                                onChange={onPaneChange}
                                style={{
                                    backgroundColor: "unset",
                                    border: "none"
                                }}>
                                {/* {console.log("Row Handler: ", rowHandler)} */}
                                <Row className={"mr-3 ml-3 mt-3 mx-0 " + (rowHandler ? rowHandler : "")}>
                                    {lableExportCertificate && (
                                        <Col>
                                            <div className="mx-0 ml-3 font-semibold" style={{ color: "#3E5277" }}>
                                                Export Certificate
                                            </div>
                                        </Col>
                                    )}
                                    <Col className="mt-3 p-0" xl="12">
                                        <ViewPanel
                                            // ClassName={styles.exportCertificatePanels}
                                            heading={resources_EN.export_certificate_ConsignmentInformation}
                                            data={Object.assign(consignmentInfo)}
                                            labels={[
                                                "Name of Importer",
                                                "Address of Importer",
                                                "Name of Exporter",
                                                "Address of Exporter",
                                                "Country of Origin",
                                                "Port of Loading",
                                                "Country of Destination",
                                                "City",
                                                data?.collectorate !== null ? "Custom Collectorate" : "Site",
                                                data?.location !== null ? "Location" : "Site"
                                            ]}
                                            keys={[
                                                { field: "consigneeName" },
                                                { field: "consigneeAddress" },
                                                { field: "consignorName" },
                                                { field: "consignorAddress" },
                                                { field: "originCountry" },
                                                { field: "portOfLoading" },
                                                { field: "destinationCountry" },
                                                { field: "city" },
                                                { field: data?.collectorate !== null ? "collectorate" : ""},
                                                { field: data?.location !== null ? "location" : "agencySite"}
                                            ]}
                                            changeColor={"green"}
                                            span={infoSpan}
                                            size={MainArea}>
                                            {/* {console.log("isSecondOpen", isSecondOpen)} */}
                                        </ViewPanel>
                                    </Col>
                                </Row>
                            </Splitter>
                        </span>
                    </>
                )}
                <br />
                <Row className={"mr-3 ml-3 mx-0 " + (rowHandler ? rowHandler : "")}>
                    <ConsignmentDescription
                        isRescind={isRescind}
                        setSingleSaveContainerNumber={setSingleSaveContainerNumber}
                        treatmentRequestStatusID={data?.treatmentRequestStatusID}
                        treatmentRequestData={data}
                        roleCode={roleCode}
                        setSaveCommodityContainerNumbers={setSaveCommodityContainerNumbers}
                        colWidth={undefined}
                        saveExtItemSweetAlert={handleSaveExtItemSweetAlert}
                        documentClassificationCode={TreatmentCertificationCode.TREATMENT_CERTIFICATE}
                        size={MainArea}
                        amendment={false}
                        data={commodityInformation}
                        // amendmentData={consignmentDescriptionAmendedExportCertificate}
                        // CallBackUpdateItemsData={handleExtensionDateChange}
                        userRole={userRole}
                        pageable={false}
                    />
                    {roleCode == UserRole.Trader && rejectedHistoryData?.length > 0 && rejectedHistoryData != null && (
                        <>
                            <br />
                            <TreatmentRejectionHistory
                                heading={"Treatment Rejection History"}
                                data={rejectedHistoryData}
                            />{" "}
                        </>
                    )}
                </Row>
                {true && (
                    <>
                        <span id="TreatmentCertificate">
                            <Splitter
                                panes={panes}
                                onChange={onPaneChange}
                                style={{
                                    backgroundColor: "unset",
                                    border: "none"
                                }}>
                                {/* {console.log("Row Handler: ", rowHandler)} */}
                                <Row className={"ml-3 mr-3 mt-1 mx-0 " + (rowHandler ? rowHandler : "")}>
                                    {lableExportCertificate && (
                                        <Col>
                                            <div className="mx-0 ml-3 font-semibold" style={{ color: "#3E5277" }}>
                                                Treatment Information
                                            </div>
                                        </Col>
                                    )}
                                    <Col className="mt-3 p-0 mb-4" xl="12">
                                        {shouldShowTreatmentInformation() && (
                                            <ViewPanel
                                                heading={"Treatment Information"}
                                                data={Object.assign({}, treatmentInfo)}
                                                labels={[
                                                    "Treatment Type",
                                                    "Treatment Sub Type Name",
                                                    "Date Of Treatment",
                                                    "Expected Place Of Treatment",
                                                    "Treatment Provider",
                                                    "Contact Number",
                                                    "Email Address",
                                                    "Rejection Reason",
                                                    "Applied Dose Rate",
                                                    "Prescribed Dose",
                                                    "Total Fumigation Applied Quantity",
                                                    "Ventilation",
                                                    "Chemical",
                                                    "Concentration",
                                                    "Conduction Type",
                                                    "Consignment Mode",
                                                    "Container Type",
                                                    "Exposed Duration",
                                                    "Temperature",
                                                    "Additional Declaration",
                                                    "Additonal Treatment Information"
                                                ]}
                                                keys={[
                                                    { field: "treatmentType" },
                                                    { field: "treatmentSubTypeName" },
                                                    { field: "dateOfTreatment" },
                                                    { field: "placeOfTreatment" },
                                                    { field: "treatmentProvider" },
                                                    { field: "contactNumber", isCopy: true },
                                                    { field: "emailAddress", isCopy: true },
                                                    { field: "rejectionReason" },
                                                    { field: "appliedDoseRate" },
                                                    { field: "prescribedDose" },
                                                    { field: "totalFumigationAppliedQty" },
                                                    { field: "ventilation" },
                                                    { field: "chemical" },
                                                    { field: "concentration" },
                                                    { field: "conductionType" },
                                                    { field: "consignmentMode" },
                                                    { field: "containerType" },
                                                    { field: "exposedDuration" },
                                                    { field: "temperature" },
                                                    { field: "additionalDeclaration" },
                                                    { field: "additionalTreatmentInfo" }
                                                ]}
                                                changeColor={"green"}
                                                span={infoSpan}
                                                size={MainArea}></ViewPanel>
                                        )}
                                        {roleCode == UserRole.TreatmentProvider &&
                                            (basicInformation?.treatmentRequestStatusID ==
                                                treatmentRequestsStatus?.UNDERPROCESS ||
                                                isRescind) && (
                                                <div className={`custom-grid border rounded`}>
                                                    <div
                                                        className={
                                                            "px-3 py-2 border-bottom font-semibold bg-light rounded-top " +
                                                            +Style.viewPanelHeading
                                                        }>
                                                        {"Treatment Information"}
                                                    </div>
                                                    <TreatmentInformationForm
                                                        getTreatmentTypesBaseOnTreatmentProvider={
                                                            getTreatmentTypesBaseOnTreatmentProvider
                                                        }
                                                        isTargetOfFumigationConform={isTargetOfFumigationConform}
                                                        setIsTargetOfFumigationConform={
                                                            setIsTargetOfFumigationConform
                                                        }
                                                        setTargetOfFumigationConform={setTargetOfFumigationConform}
                                                        targetOfFumigationConform={targetOfFumigationConform}
                                                        data={data}
                                                        getTPCertificateFetchSaveData={
                                                            getTPCertificateFetchSaveData
                                                        }
                                                        setSaveInfoData={setSaveInfoData}
                                                        setTemperatureType={setTemperatureType}
                                                        setDurationType={setDurationType}
                                                        getConsignmentMode={getConsignmentMode}
                                                        getContainerType={getContainerType}
                                                        getConductionTreatment={getConductionTreatment}
                                                        getTargetTreatment={getTargetTreatment}
                                                        getTreatmentTypeData={getTreatmentTypeData}
                                                        onSubmitTreatmentInfoForm={() => console.log("testing..")}
                                                        isLoading={false}
                                                        formRef={underProcessTreamtmentFormRef}
                                                        error={error}
                                                        setError={setError}
                                                    />
                                                </div>
                                            )}
                                    </Col>
                                </Row>
                            </Splitter>
                        </span>
                    </>
                )}

                {props.children}
            </>
    );
};

export default View;
