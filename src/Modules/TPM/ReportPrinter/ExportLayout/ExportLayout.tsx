import _ from "lodash";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Column from "Elements/Basic/GridView/Columns/Column";
import GridView from "Elements/Basic/GridView/GridView";
import React from "react";
import Style from "./ExportLayout.module.scss";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { useDispatch } from "react-redux";
import Logo from "Assets/Icons/Logo_Transparent_Normal.png";
import { IExportLayoutData } from "../ReportPrinterInterface";
import ViewPanel from "Elements/Basic/ViewPanel/ViewPanel";
import { exportToHTML, exportToPDF } from "Modules/Common/Helpers/ReportHelpers";
import { formatDate } from "Modules/Common/Helpers/DateHelper";

const ExportLayout = (props: any) => {
    const retrievedObject = sessionStorage.getItem("exportLayoutData");
    const today = new Date();
    let dataExist = false;

    let exportLayoutData: IExportLayoutData = {
        fileName: "",
        gridColumns: [],
        reportData: [],
        reportTitleHeader: "",
        viewPanelData: {},
        viewPanelKeysLabels: {
            keys: [],
            labels: []
        }
    };

    if (retrievedObject) {
        dataExist = true;
        exportLayoutData = JSON.parse(retrievedObject) as IExportLayoutData;
    }
    const dispatch = useDispatch();
    const [takeColumn, setTakeColumn] = useState(exportLayoutData?.reportData.length);

    useEffect(() => {
        let pageTitle = "Export Report";

        dispatch(setPageTitleAction(pageTitle));
    }, []);

    //#region Export

    const gridContainer = React.useRef<HTMLDivElement>(null);
    const anchor = React.useRef<HTMLAnchorElement>(null);

    const exportPDF = () => {
        let fileName = `${exportLayoutData?.fileName}.pdf`;

        exportToPDF(gridContainer, fileName);
    };

    let exportHTML = () => {
        let fileName = `${exportLayoutData?.fileName}.html`;
        exportToHTML(gridContainer, anchor, fileName);
    };

    //#endregion

    return (
        <Container className="px-3" fluid>
            {dataExist && exportLayoutData && (
                <div>
                    <Row className="m-0 py-3 bg-white justify-content-end">
                        <Col xs={12} lg={8} className="py-sm-2 px-0">
                            <Row className="justify-content-center justify-content-md-end mx-0">
                                <Button onClick={exportHTML} className={`btn btn-primary mr-1 my-2 my-sm-0 py-2`}>
                                    <span>Download HTML</span>
                                </Button>

                                <Button onClick={exportPDF} className={`btn btn-primary ml-1 my-2 my-sm-0 py-2`}>
                                    <span>Download PDF</span>
                                </Button>
                            </Row>
                        </Col>
                    </Row>

                    <Row className="mb-2 bg-white" ref={gridContainer}>
                        <Col md={12} className="px-0 pb-3 px-4">
                            <Row className="m-0 mb-3 mt-4 pb-3 border-bottom align-items-center">
                                <Col md={4} className="float-left pb-3 pb-md-0 text-center text-md-left">
                                    <img src={Logo} className={`${Style.logo}`} />
                                </Col>
                                <Col md={4} className="pb-3 pb-md-0 text-center">
                                    <span className="headline">{exportLayoutData?.reportTitleHeader}</span>
                                </Col>
                                <Col md={4} className="pb-3 pb-md-0 text-center">
                                    <span className="base-lg  float-none float-md-right">
                                        Date: {formatDate(today)}
                                    </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <div>
                                        <Row className="m-0 my-3">
                                            <ViewPanel
                                                data={exportLayoutData?.viewPanelData}
                                                labels={exportLayoutData?.viewPanelKeysLabels.labels}
                                                keys={exportLayoutData?.viewPanelKeysLabels.keys}
                                            />
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="m-0">
                                <Col className="p-0">
                                    <GridView
                                        data={exportLayoutData.reportData}
                                        properties={exportLayoutData.gridColumns}
                                        takeColumn={takeColumn}
                                        resizable={true}>
                                        {exportLayoutData.gridColumns?.map((items: any, index: number) => {
                                            return (
                                                <Column
                                                    key={index}
                                                    gridColumn={exportLayoutData.gridColumns}
                                                    field={items.field}
                                                    title={items.title}
                                                    width={"auto"}
                                                    cell={null}
                                                />
                                            );
                                        })}
                                    </GridView>
                                </Col>
                                <a ref={anchor} hidden={true}></a>
                            </Row>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );
};

export default ExportLayout;
