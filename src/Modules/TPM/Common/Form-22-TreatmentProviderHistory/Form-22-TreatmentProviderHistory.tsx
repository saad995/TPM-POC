import { TabStrip, TabStripSelectEventArguments, TabStripTab } from "@progress/kendo-react-layout";
import Config from "Config";
import Checkbox from "Elements/Basic/CheckBox/CheckBox";
import { DownloadDocumentAction } from "Elements/Basic/File/FileAction";
import { IFileDownloadRequest } from "Elements/Basic/File/FileTypes";
import ComponentResizer from "Lib/Helpers/InternalComponentResizer";
// import Paths from "Modules/OGA/Constants/Paths";
import ApiURLs from "Modules/TPM/Constants/ApiURLs";
import Methods from "Modules/TPM/Constants/Methods";
import { RootStore } from "Store";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import ButtonComponent from "./ButtonComponent";
import styles from "./Form-22-TreatmentProviderHistory.module.scss";
import { getTPMForm22HistoryAction } from "./Form-22-TreatmentProviderHistoryActions";
import { ITPMForm22History, ITPMForm22HistoryRequestData, ITPMForm22ResponseData, TreatmentRequestStatusId } from "./Form-22-TreatmentProviderHistoryInterfaces";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import Paths from "Modules/TPM/Constants/Paths";
import { IPrintRequestData } from "../ExportPdf/ExportPdfInterfaces";
import { DocumentClassificationCode } from "Modules/Common/Constants/Interfaces";
import ExportPdfTpm from "../ExportPdfTpm/ExportPdfTpm";
import ExportPdf from "../ExportPdf/ExportPdf";
import { form22Status } from "Modules/Common/CommonUtility";

interface IProps {
    data: any;
    userRole: any;
    size?: string;
    heading: string;
}

const Form22TreatmentProviderHistory = (props: IProps) => {
    const { userRole, size, heading, data } = props;
    
    const dispatch = useDispatch();
    const history = useHistory();
    let gridInfoStoreHistory: undefined;
    let initDocumentID = 0;

    const [printRequest, setPrintRequest] = React.useState<IPrintRequestData>();
    const [isExporting, setIsExporting] = React.useState(false);
    const [selected, setSelected] = useState(0);
    const [tabPos, setTabPos] = useState("left");

    const [mainRow, mainRowHandler] = useState<string | undefined>(undefined);
    const [detailsRow, detailsRowHandler] = useState<string | undefined>(undefined);

    // const gridInfoStoreReducer: IUpdateStoreObject = useSelector((state: RootStore) => state.updateStoreReducer.store);

    // // Retrive request data if already set in previous request
    // const gridInfoStoreHistoryObject = localStorage.getItem("gridInfoStoreHistoryObject");
    // let initDocumentTypeCode = "";
    // if (history.location.state != null) {
    //     initDocumentID = data?.id > 0 ? data?.id : Number(history.location.state.id); // Number(param.id);
    //     gridInfoStoreHistory = history.location.state;
    //     initDocumentTypeCode = history.location.state.initDocumentTypeCode;

    //     // Setting localstorage to get request data on reload
    //     localStorage.setItem("gridInfoStoreHistoryObject", JSON.stringify(gridInfoStoreHistory));
    // } else if (gridInfoStoreHistoryObject != "undefined" && gridInfoStoreHistoryObject != null) {
    //     const tempGridInfoStoreHistory = JSON.parse(gridInfoStoreHistoryObject);
    //     console.log(tempGridInfoStoreHistory);
    //     initDocumentTypeCode = tempGridInfoStoreHistory.initDocumentTypeCode;
    //     // Setting up gridInfoStoreHistory from previous request data
    //     initDocumentID = Number(tempGridInfoStoreHistory.id);
    //     gridInfoStoreHistory = tempGridInfoStoreHistory;
    // } else {
    //     history.push(Paths.ReleaseOrder.Grid);
    // }
    // const gridInfoStore = gridInfoStoreHistory != null ? gridInfoStoreHistory : gridInfoStoreReducer;

    const tpmForm22HistoryStore: ITPMForm22ResponseData = useSelector(
        (state: RootStore) => state.TPMForm22HistoryReducer.tpmForm22History
    );

    useEffect(() => {
        const x = window.matchMedia("(min-width: 992px)");
        myFunction(x); // Call listener function at run time
        x.addEventListener("change", () => {
            myFunction(x);
        });
    }, []);

    useEffect(() => {
        const requestDetailedData: ITPMForm22HistoryRequestData = {
            rights: '',
            roleCode: userRole,
            initDocumentID: Number(data?.id),
            initDocumentTypeCode: data?.initDocumentTypeCode,
        };
        
        // dispatch(clearReducerState());
        // dispatch(setPageTitleAction(resources_EN.release_Order_View));
        // dispatch(attachmentClearReducerState());
        dispatch(getTPMForm22HistoryAction(requestDetailedData)); //TPM
       // dispatch(ReleaseOrderRightsAction(rightsrequestData));
    }, []);

    useEffect(() => {
        mainRowHandler(
            ComponentResizer(size, "row-cols-1", ResizerLocal) +
                " " +
                ComponentResizer(size, "row-cols-sm-1", ResizerLocal) +
                " " +
                ComponentResizer(size, "row-cols-md-2", ResizerLocal) +
                " " +
                ComponentResizer(size, "row-cols-lg-2", ResizerLocal) +
                " " +
                ComponentResizer(size, "row-cols-xl-2", ResizerLocal)
        );

        detailsRowHandler(
            ComponentResizer(size, "row-cols-1") +
                " " +
                ComponentResizer(size, "row-cols-sm-2") +
                " " +
                ComponentResizer(size, "row-cols-md-2") +
                " " +
                ComponentResizer(size, "row-cols-lg-2") +
                " " +
                ComponentResizer(size, "row-cols-xl-2")
        );
    }, [size]);

    const ResizerLocal = (x: any, y: any, z: any) => {
        if (size) {
            if (x) {
                setTabPos("left");
            } else if (y) {
                setTabPos("left");
            } else if (z) {
                setTabPos("left");
            } else {
                setTabPos("top");
            }
        }
    };

    const myFunction = (x: any) => {
        if (x.matches) {
            // If media query matches
            setTabPos("left");
        } else {
            setTabPos("top");
        }
    };
    const getFileURL = (fileId: string) => {
        const url: string = `${ApiURLs.FSS_READ}/${Methods.READ_FILE}?fileId=${fileId}`;
        return url;
    };
    const getFile = async (fileId: string, fileName: string) => {
        if (fileId) {
            const downloadData: IFileDownloadRequest = {
                id: `${fileId}`,
                fileName: fileName
            };

            dispatch(DownloadDocumentAction(downloadData));
        }
    };

    const handlePsidTextBox= (value: any) => {     
      
        //setPsid(value.value);          
};
    // * To download form22 
    const handleExportToForm22Pdf = (id:string) => {
debugger;
        const request: IPrintRequestData = {
            documentId: parseInt(id),
            documentTypeCode: "FC",
            documentClassificationCode: "TPM",
            roleCode: userRole,
            rights: "",
            payload: ""
        };

        setPrintRequest(request);
        setIsExporting(true);
    };
const [isTermsChecked, setTermsChecked] = useState(true);
const onTermsCheck = useCallback(
    (e:any) => {
        setTermsChecked(e.value);
    },
    [setTermsChecked]
);


const handleViewTreatmentProvider = (data:any)=>{
   const pendingStatusTreatmentProvider = tpmForm22HistoryStore?.history.find((item: ITPMForm22History)=>item.treatmentRequestStatusID == TreatmentRequestStatusId.Treatment_Requested);
    if(pendingStatusTreatmentProvider){
        const {treatmentRequestStatusID,treatmentProviderID, officerRemarks, treatmentProvider, requestDocumentNumber} = pendingStatusTreatmentProvider
        const dataItem = {
            "treatmentProviderId": treatmentProviderID,
            "treatmentRequestStatusId": treatmentRequestStatusID,
            ...pendingStatusTreatmentProvider
        }
       return history.push(Paths.TPM.View,dataItem);
    }
}

const handleViewTreatmentCertificate = ()=>{
    return history.push(Paths.TPM.Grid);
}

    return (
        <>
         {
                isExporting ? <ExportPdf printRequest={printRequest} /> : null
         }
        {tpmForm22HistoryStore?.history?.length > 0 ?
        <Col className="mt-4" xs="12" sm="12" md="12" lg="12" xl="12">
            <div className={`border shadow-sm rounded w-100`} style={{ backgroundColor: "white" }}>
                <div
                    className="px-3 py-2 font-semibold"
                    style={{
                        color: "#3E5277"
                    }}>
                    {heading}
                </div>
                <TabStrip
                    selected={selected}
                    tabPosition={tabPos}
                    animation={false}
                    className={styles.documentHistoryContainer + " " + (tabPos === "top" && styles.tabContainerMobile)}
                    onSelect={(e: TabStripSelectEventArguments) => {
                        setSelected(e.selected);
                    }}>
                    {tpmForm22HistoryStore?.history?.map((item: ITPMForm22History, index: number) => {
                        let title = moment(new Date(item.createdOn)).format(Config.DateFormat);
                        return (
                            <TabStripTab
                                key={index}
                                title={title} //.format(Config.DateFormat)
                                contentClassName="py-0">
                                <Row className={mainRow && mainRow}>
                                    <Col
                                        className={
                                            "row mx-0 px-0 " +
                                            detailsRow +
                                            " " +
                                            (tabPos == "left" && " border-right border-left")
                                        }>
                                        <div className="  col py-4 border-bottom text-break">
                                            <span className="text-muted d-block">Action Type</span>
                                            <span className="font-bolder">{item.actionType}</span>
                                        </div>

                                        {item?.treatmentType?.trim() ? (
                                            <div className="  col py-4 border-bottom text-break">
                                                <span className="text-muted d-block">Treatment Type</span>
                                                <span className="font-bolder">{item.treatmentType}</span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {item?.treatmentProvider?.trim() ? (
                                            <div className="  col py-4 border-bottom text-break">
                                                <span className="text-muted d-block">Treatment Provider Name</span>
                                                <span className="font-bolder">{item.treatmentProvider}</span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        <div className="  col py-4 border-bottom text-break">
                                            <span className="text-muted d-block">Request Status</span>
                                            <span className="font-bolder">{item.form22Status}</span>
                                        </div>

                                        {item?.actedByName?.trim() ? (
                                            <div className="  col py-4 border-bottom text-break">
                                                <span className="text-muted d-block">Officer's Name</span>
                                                <span className="font-bolder">{item.actedByName}</span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        {item?.officerRemarks?.trim() ? (
                                            <div className="  col py-4 border-bottom text-break">
                                                <span className="text-muted d-block">Officer's Comments</span>
                                                <span className="font-bolder">{item.officerRemarks}</span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                        
                                        {item?.officersRemarks?.trim() ? (
                                            <div className="  col py-4 border-bottom text-break">
                                                <span className="text-muted d-block">Officer's Comments</span>
                                                <span className="font-bolder">{item.officersRemarks}</span>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </Col>
                                        <Col
                                            style={{
                                                overflowY: "auto",
                                                overflowX: "hidden",
                                                maxHeight: "570px"
                                            }}>
                                            <Row className="pt-4 pb-4" >
                                                <Col>
                                                    <Checkbox
                                                        label="I here by acknowledge receipt of the forgoing notification."
                                                        checked={item.form22Status == form22Status.ACKNOWLEDGED}
                                                        disabled={true}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    className={
                                                        "row mx-0 px-0 " +
                                                        detailsRow +
                                                        " " +
                                                        (tabPos == "left" && " border-right border-left")
                                                    }>
                                                    {item?.paymentMode?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">Payment Mode</span>
                                                            <span className="font-bolder">{item.paymentMode}</span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    className={
                                                        "row mx-0 px-0 " +
                                                        detailsRow +
                                                        " " +
                                                        (tabPos == "left" && " border-right border-left")
                                                    }>
                                                    {item?.officerEndorementRemarks?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">
                                                                Officer Endorsement Remarks
                                                            </span>
                                                            <span className="font-bolder">{item.officerEndorementRemarks}</span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col
                                                    // className={
                                                    //     "row mx-0 px-0 " +
                                                    //     detailsRow +
                                                    //     " " +
                                                    //     (tabPos == "left" && " border-right border-left")
                                                    // }
                                                    >
                                                   <ButtonComponent 
                                                   data={item}
                                                   handleExportToForm22Pdf={handleExportToForm22Pdf}
                                                   handleViewTreatmentProvider={handleViewTreatmentProvider}
                                                   handleViewTreatmentCertificate={handleViewTreatmentCertificate}
                                                   isViewTreatmentProvider={true}
                                                   isViewTreatmentCertificate={true}
                                                   ViewTreatmentProviderBtnText={resources_EN.btn_label_view_form_22}
                                                   ViewTreatmentCertificateBtnText={resources_EN.btn_label_view_treatment_certificate}
                                                   
                                                   />
                                                </Col>
                                            </Row>
                                        </Col>
                                    
                                </Row>
                                <Row></Row>
                            </TabStripTab>
                        );
                    })}
                </TabStrip>
            </div>
        </Col>
        : null}
        </>
    );
};

export default Form22TreatmentProviderHistory;
