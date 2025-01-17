import _ from "lodash";
import { Row, Col, Button } from "react-bootstrap";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import Column from "Elements/Basic/GridView/Columns/Column";
import GridView from "Elements/Basic/GridView/GridView";
import React, { useState } from "react";
import { IExportLayoutData, IViewPanelKeysLabels } from "./ReportPrinterInterface";
import { CSVLink } from "react-csv";
import "./ReportPrinter.scss";
import { GridCellProps } from "@progress/kendo-react-grid/dist/npm/interfaces/GridCellProps";
import { compareStringInsensitive } from "Lib/Helpers/StringHelper";
import Search from "Elements/Custom/Search/Search";
interface IReportProps {
    takeColumn: number;
    reportTitleHeader: string;
    fileName: string;
    isExportButtonDisabled: boolean;
    gridColumns: any;
    reportData: any;
    viewPanelData: any;
    viewPanelKeysLabels: IViewPanelKeysLabels;
    actions?: any[];
}

const ReportPrinter = (props: IReportProps) => {
    let {
        takeColumn,
        reportTitleHeader,
        fileName,
        isExportButtonDisabled,
        gridColumns,
        reportData,
        viewPanelKeysLabels,
        viewPanelData,
        actions
    } = props;

    const [gridData, setGridData] = useState(reportData);
    const exportReportUrl = "/app/lms/ReportExporter/";
    const csvHeaders = gridColumns?.map((x: any) => {
        return {
            label: x.title,
            key: x.field
        };
    });
    const fileNameCSV = `${fileName}.csv`;

    const globalSearch = (data: any) => {
        reportData = data;
        setGridData(data);
    };
    //#region Export

    const gridContainer = React.useRef<HTMLDivElement>(null);
    const _export = React.useRef<ExcelExport | null>(null);
    const anchor = React.useRef<HTMLAnchorElement>(null);

    const exportExcel = () => {
        if (_export.current !== null) {
            _export.current.save(reportData, gridColumns);
        }
    };

    const viewPrintLayout = () => {
        let exportLayoutData: IExportLayoutData = {
            fileName: fileName,
            reportData: reportData,
            gridColumns: gridColumns,
            reportTitleHeader: reportTitleHeader,
            viewPanelData: viewPanelData,
            viewPanelKeysLabels: viewPanelKeysLabels
        };
        sessionStorage.setItem("exportLayoutData", JSON.stringify(exportLayoutData));
        const win = window.open(exportReportUrl, "_blank");
        win?.focus();
    };

    const executeAction = (props: GridCellProps) => {
        if (actions && actions.length > 0 && props.field) {
            let fieldAction = actions.filter((x) => compareStringInsensitive(x.fieldName, props.field!))[0];
            if (fieldAction) {
                return fieldAction.execute(props.dataItem);
            }
        }
        return (
            <td className={"grid-column text-muted"}>
                <span>{props.dataItem[props.field!]}</span>
            </td>
        );
    };
    //#endregion

    return (
        <>
            <Row className="m-0 ReportPrinter bg-white rounded-top border border-bottom-0">
                <Col xs={24} className="p-3  p-0 d-inline ">
                    {/* <div className="float-left title my-1  ">{reportTitleHeader}</div> */}
                    <div className="float-right align-items-center">
                        <Button
                            onClick={viewPrintLayout}
                            className={`btn btn-primary mr-1 my-2 my-sm-0 py-2`}
                            disabled={isExportButtonDisabled}>
                            <span>Prepare PDF/HTML</span>
                        </Button>
                        <Button
                            onClick={exportExcel}
                            className={`btn btn-primary mx-1 my-2 my-sm-0 py-2`}
                            disabled={isExportButtonDisabled}>
                            <span>Download Excel</span>
                        </Button>
                        <CSVLink
                            filename={fileName}
                            headers={csvHeaders}
                            data={reportData}
                            className={`btn btn-primary ml-1 my-2 my-sm-0 py-2 ${
                                isExportButtonDisabled ? "csvDisabledButton" : ""
                            }`}>
                            <span>Download CSV</span>
                        </CSVLink>
                    </div>
                </Col>
            </Row>
            {/* <Row className="searchBox align-items-center mx-0 no-gutters py-1 gridPanel px-3 border border-bottom-0 bg-white">
                <Col></Col>
                <Search
                    data={reportData}
                    searchBoxClass={"pr-0"}
                    confirm={globalSearch}
                    searchableColumns={gridColumns?.map((x: any) => x.field)}
                    heading=""
                />
            </Row> */}
            <Row className="m-0 bg-white border border-bottom-0">
                <Row className="m-0">
                    <ExcelExport fileName={fileName + ".xlsx"} ref={_export}>
                        <div ref={gridContainer}>
                            <GridView
                                heading={ reportTitleHeader }
                                isSearchEnabled={ true }
                                gridStyle={"noCursorOnRow"}
                                data={gridData}
                                properties={gridColumns}
                                pageable={true}
                                takeColumn={takeColumn}
                                resizable={true}
                                sortable={ true }
                                reorderable={true}>
                                {gridColumns?.map((items: any, index: number) => {
                                    return (
                                        <Column
                                            key={index}
                                            gridColumn={gridColumns}
                                            field={items.field}
                                            title={items.title}
                                            width={"auto"}
                                            cell={items.action && executeAction}
                                        />
                                    );
                                })}
                            </GridView>
                        </div>
                        <a ref={anchor} hidden={true}></a>
                    </ExcelExport>
                </Row>
            </Row>
        </>
    );
};

export default ReportPrinter;
