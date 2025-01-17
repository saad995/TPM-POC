import { Button } from "@progress/kendo-react-buttons";
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from "@progress/kendo-react-layout";
import Config from "Config";
import { DownloadDocumentAction } from "Elements/Basic/File/FileAction";
import { IFileDownloadRequest } from "Elements/Basic/File/FileTypes";
import ComponentResizer from "Lib/Helpers/InternalComponentResizer";
// import Paths from "Modules/OGA/Constants/Paths";
// import { resources_EN } from "Modules/OGA/Constants/Resources/Resources_EN";
import { RootStore } from "Store";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// import ExportPdf from "../ExportPdf/ExportPdf";
import { TreatmentRequestStatusId } from "../Form-22-TreatmentProviderHistory/Form-22-TreatmentProviderHistoryInterfaces";
// import { IPrintRequestData } from "../PrintTemplate/PrintTemplateInterfaces";
// import { IUpdateStoreObject } from "../UpdateStoreObject/UpdateStoreObjectInterfaces";
import styles from "./CallTreatmentHistory.module.scss";
import { getTPMCallTreatmentHistoryAction } from "./CallTreatmentHistoryActions";
import { ITPMCallTreatmentHistory, ITPMCallTreatmentHistoryRequestData, ITPMCallTreatmentResponseData } from "./CallTreatmentHistoryInterfaces";
import ApiURLs from "Modules/TPM/Constants/ApiURLs";
import { resources_EN } from "../../../Common/Constants/Resources/Resources_EN";
import ExportPdfTpm from "Modules/TPM/Common/ExportPdfTpm/ExportPdfTpm";
import { IPrintRequestData } from "Modules/TPM/Common/ExportPdf/ExportPdfInterfaces";
import PrintPreview from "Modules/Common/PrintPreview/PrintPreview";
import ExportPdf from "../ExportPdf/ExportPdf";

interface IProps {
    data: any;
    userRole: any;
    size?: string;
    heading: string;
}

const CallTreatmentHistory = (props: IProps) => {
    const { userRole, size, heading, data } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    let gridInfoStoreHistory: undefined;
    let initDocumentID = 0;
debugger

    const [selected, setSelected] = useState(0);
    const [tabPos, setTabPos] = useState("left");

    const [mainRow, mainRowHandler] = useState<string | undefined>(undefined);
    const [detailsRow, detailsRowHandler] = useState<string | undefined>(undefined);
  

    // const gridInfoStoreReducer: any = useSelector((state: RootStore) => state.updateStoreReducer.store);

    // Retrive request data if already set in previous request
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
    //     initDocumentTypeCode = tempGridInfoStoreHistory.initDocumentTypeCode;
    //     // Setting up gridInfoStoreHistory from previous request data
    //     initDocumentID = Number(tempGridInfoStoreHistory.id);
    //     gridInfoStoreHistory = tempGridInfoStoreHistory;
    // } else {
    //     // history.push(Paths.ReleaseOrder.Grid);
    // }
    // const gridInfoStore = gridInfoStoreHistory != null ? gridInfoStoreHistory : gridInfoStoreReducer;

    const tpmCallTreatmentHistoryStore: ITPMCallTreatmentResponseData = useSelector(
        (state: RootStore) => state.CallTreatmentHistoryReducer.tpmCallTreatmentHistory
    );
    //* Export to PDF print
    const [printRequest, setPrintRequest] = React.useState<IPrintRequestData>();
    const [isExporting, setIsExporting] = React.useState(false);
    
    const handleExportToPdf = (treatmentRequestId: number) => {
        const request: IPrintRequestData = {
            documentId: treatmentRequestId,
            documentTypeCode: "TC",
            documentClassificationCode: "TPM",
            roleCode: userRole,
            rights: "",
            payload: ""
        };

        setPrintRequest(request);
        setIsExporting(true);
    };
    // ! End of Export PDF print   

    useEffect(() => {
        const x = window.matchMedia("(min-width: 992px)");
        myFunction(x); // Call listener function at run time
        x.addEventListener("change", () => {
            myFunction(x);
        });
    }, []);

    useEffect(() => {
        const requestDetailedData: ITPMCallTreatmentHistoryRequestData = {
            rights: '',
            roleCode: userRole,
            initDocumentID: data?.id?.toString(),
            initDocumentTypeCode: data?.initDocumentTypeCode?.toString(),
        };

        // dispatch(clearReducerState());
        // dispatch(setPageTitleAction(resources_EN.release_Order_View));
        // dispatch(attachmentClearReducerState());
        dispatch(getTPMCallTreatmentHistoryAction(requestDetailedData)); //TPM
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
    // const getFileURL = (fileId: string) => {
    //     return url;
    // };
    const getFile = async (fileId: string, fileName: string) => {
        if (fileId) {
            const downloadData: IFileDownloadRequest = {
                id: `${fileId}`,
                fileName: fileName
            };

            dispatch(DownloadDocumentAction(downloadData));
        }
    };

    const handlePsidTextBox = (value: any) => {

        //setPsid(value.value);          
    };

    const [isTermsChecked, setTermsChecked] = useState(true);
    const onTermsCheck = useCallback(
        (e: any) => {
            setTermsChecked(e.value);
        },
        [setTermsChecked]
    );

  
    return (
        <>

            {isExporting ? <ExportPdf printRequest={printRequest} /> : null}
            {tpmCallTreatmentHistoryStore?.history?.length > 0 ? (
                <Col xs="12" sm="12" md="12" lg="12" xl="12">
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
                            className={
                                styles.documentHistoryContainer + " " + (tabPos === "top" && styles.tabContainerMobile)
                            }
                            onSelect={(e: TabStripSelectEventArguments) => {
                                setSelected(e.selected);
                            }}>
                            {tpmCallTreatmentHistoryStore?.history?.map(
                                (item: ITPMCallTreatmentHistory, index: number) => {
                                    let title = moment(new Date(item.createdOn)).format(Config.DateFormat);
                                    //debugger;
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
                                                    {item?.requestDocumentNumber?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">
                                                                Request Document Number
                                                            </span>
                                                            <span className="font-bolder">
                                                                {item.requestDocumentNumber}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {item?.treatmentProvider?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">
                                                                Treatment Provider Name
                                                            </span>
                                                            <span className="font-bolder">
                                                                {item.treatmentProvider}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {item?.treatmentType?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">Treatment Type</span>
                                                            <span className="font-bolder">{item.treatmentType}</span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {item?.treatmentSubType?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">
                                                                Treatment Sub Type
                                                            </span>
                                                            <span className="font-bolder">{item.treatmentSubType}</span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {item?.treatmentRequestStatus?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">
                                                                Treatment Request Status
                                                            </span>
                                                            <span className="font-bolder">
                                                                {item.treatmentRequestStatus}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {item?.officerName?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">Officer Name</span>
                                                            <span className="font-bolder">{item.officerName}</span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {item?.officerRemarks?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">
                                                                Officer's Comments
                                                            </span>
                                                            <span className="font-bolder">{item.officerRemarks}</span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {item?.cancellationReason?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">
                                                                Cancellation Remarks
                                                            </span>
                                                            <span className="font-bolder">
                                                                {item.cancellationReason}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}
                                                    {item?.cancellationReason?.trim() ? (
                                                        <div className="  col py-4 border-bottom text-break">
                                                            <span className="text-muted d-block">Cancelled On</span>
                                                            <span className="font-bolder">
                                                                {moment(new Date(item.updatedOn)).format(
                                                                    Config.DateFormat
                                                                )}
                                                            </span>
                                                        </div>
                                                    ) : ( 
                                                        ""
                                                    )}
                                                </Col>
                                                <Col>
                                                    {item?.treatmentRequestStatusID ==
                                                        TreatmentRequestStatusId.Certificate_Endorsed && (
                                                        <div
                                                            className={`d-flex justify-content-end flex-column ${styles.customButton}`}>
                                                            <Button
                                                                onClick={() => handleExportToPdf(item?.id)}
                                                                className="btn btn-primary">
                                                                {resources_EN.btn_label_view_treatment_certificate}
                                                            </Button>
                                                        </div>
                                                    )}
                                                </Col>
                                            </Row>
                                        </TabStripTab>
                                    );
                                }
                            )}
                        </TabStrip>
                    </div>
                </Col>
            ) : null}
        </>
    );
};

export default CallTreatmentHistory;
