import { Switch } from "react-router-dom";

//Import Components
import ErrorBoundary from "Elements/Basic/ErrorBoundary/ErrorBoundary";
import AppLayout from "Layouts/AppLayout/AppLayout";

//Import Components

//Import Actions
import PrivateRoute from "Elements/Basic/PrivateRoutes/PrivateRoutes";
import TreatmentCertificates from "../TreatmentCertificate/TreatmentCertificates";
import { Row } from "react-bootstrap";
import GridView from "Elements/Basic/GridView/GridView";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import { useEffect, useState } from "react";
import { IGetDashboardInfoResponseData } from "Layouts/AppLayout/AppLayoutInterfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import Column from "Elements/Basic/GridView/Columns/Column";
import { MyCommandCell } from "Elements/Basic/GridEditView/CommandCell";
import moment from "moment";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import { getIssueTreatmentCertificateData } from "../GenerateNonCompliance/GenerateNonComplianceAction";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { IPrintRequestData } from "../Common/ExportPdf/ExportPdfInterfaces";
import ExportPdf from "../Common/ExportPdf/ExportPdf";
import LoaderComponent from "Elements/Basic/Loader/Loader";
import { Form22DocumentTypeCode } from "Modules/Common/CommonUtility";
import { DocumentClassificationCode } from "Modules/Common/Constants/Interfaces";

//Import Styles

//Import Constants

const GenerateNonCompliance = (props: any) => {
    const { path } = props.match;
    const dispatch = useDispatch();

    const [isExporting, setIsExporting] = useState(false);
    const [printRequest, setPrintRequest] = useState<IPrintRequestData>();
    // *Get non compliance List Data From Store
    const getNonComplianceListData: any = useSelector(
        (state: RootStore) => state.GenerateNonComplianceReducer.generateNonComplianceResponse
    );
    // *Get non compliance List Data From Store
    const loading: any = useSelector(
        (state: RootStore) => state.GenerateNonComplianceReducer.loading
    );
    const { data } = props;
    // * Get Dashboard info Data From Store
    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo);
    // ! End of redux states

    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(15);

    const handleExportToPdf = (props: any) => {
        const request: IPrintRequestData = {
            documentId: 1,
            documentTypeCode: "TC",
            documentClassificationCode: "TPM",
            roleCode: dashboardInfo?.currentRole,
            rights: "",
            payload: ""
        };

        setPrintRequest(request);
        setIsExporting(true);
    };

    useEffect(() => {
        let title = "Non-Compliance Notices";
        if (dashboardInfo.currentRole == UserRole.InspectionOfficer) {
            dispatch(getIssueTreatmentCertificateData({}))
        }
        dispatch(setPageTitleAction(title));
    }, [dashboardInfo]);
    // * To download non compliance issue 
    const handleExportToNonCompliancePdf = (data:any) => {

        const request: IPrintRequestData = {
            documentId: data?.id,
            documentTypeCode: Form22DocumentTypeCode.NONGENERATECOMPLIANCE,
            documentClassificationCode: DocumentClassificationCode.TREATMENT_PROVIDER,
            roleCode: dashboardInfo.currentRole,
            rights: "",
            payload: ""
        };

        setPrintRequest(request);
        setIsExporting(true);
    };
    return (
        <>
        {
            // printing RO
            isExporting ? <ExportPdf printRequest={printRequest} /> : null
        }
        {loading ? (
                <>
                    <LoaderComponent />{" "}
                </>
            ) : ( 
            <div className="main-grid-container m-4">
                <Row>

                    <GridView
                        heading={resources_EN.treatment_provider_generate_non_compliance_notice}
                        data={getNonComplianceListData}
                        skipColumn={skip}
                        takeColumn={take}
                        total={getNonComplianceListData.length}
                        fixedScroll
                        reorderable={true}
                        isSearchEnabled={true}
                        searchableColumns={[resources_EN.treatment_provider_sdNumber_field, resources_EN.treatment_provider_trader_field, resources_EN.treatment_provider_generatedOn_field]}
                        pageable={true}
                        resizable={true}
                        style={{ height: "70vh" }}
                    >
                        <Column
                            headerClassName="custom-header"
                            className="text-left"
                            field={resources_EN.treatment_provider_sdNumber_id_field}
                            title={resources_EN.treatment_provider_sdNumber_id_title}
                            width={100}
                            sort={true}
                            reorderable={true}
                            resizable={true}
                        />
                        <Column
                            headerClassName="custom-header"
                            className="text-left"
                            field={resources_EN.treatment_provider_sdNumber_field}
                            title={resources_EN.treatment_provider_sdNumber_title}
                            width={300}
                            sort={true}
                            reorderable={true}
                            cell={(props: any) => {
                                return (
                                    <td>
                                        {(props?.dataItem?.sDDocumentNumber != null ) ? `${props?.dataItem?.sDDocumentNumber}` : 'N/A'}
                                    </td>
                                )
                            }}
                            resizable={true}
                        />
                        <Column
                            headerClassName="custom-header"
                            className="text-left"
                            field={resources_EN.treatment_provider_trader_field}
                            title={resources_EN.treatment_provider_trader_title}
                            width={300}
                            sort={true}
                            reorderable={true}
                            resizable={true}
                            cell={(props: any) => {
                                return (
                                    <td>
                                        {(props?.dataItem?.trader != null || props?.dataItem?.agent != null) ? `${props?.dataItem?.trader} ${props?.dataItem?.agent != null ? `/${props?.dataItem?.agent}` : ""}` : 'N/A'}
                                    </td>
                                )
                            }}
                        />
                        <Column
                            className="text-left"
                            field={resources_EN.treatment_provider_generatedOn_field}
                            title={resources_EN.treatment_provider_generatedOn_title}
                            width={300}
                            sort={true}
                            reorderable={true}
                            resizable={true}
                        />
                        <Column
                            className="text-left"
                            field={resources_EN.treatment_provider_action_field}
                            title={resources_EN.treatment_provider_action_title}
                            cell={(props: any) => (
                                <MyCommandCell
                                    {...props}
                                    isPdfDownload={true}
                                    download={handleExportToNonCompliancePdf}
                                    // edit={enterEdit}
                                    customClassName={"custom-command-cell"}
                                />
                            )}
                        />
                    </GridView>
                </Row>
            </div>
            )
                            }
        </>
    );
};

export default GenerateNonCompliance;
