import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import Components
import { faInfoCircle, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    CompositeFilterDescriptor,
    filterBy
} from "@progress/kendo-data-query";
import Column from "Elements/Basic/GridView/Columns/Column";
import { Row } from "react-bootstrap";

//Import Styles
// import "./ListFinancialInstrument.scss";
import '../TreatmentCertificate.scss';

//Import Actions
// import {
//     getAllFinancialInstrumentAction,
//     getFailedFinancialInstrumentAction,
//     getIBANandUniqueNumber
// } from "./ListFinancialInstrumentAction";

// import {
//     IListFailedFinancialInstrumnentResponseData,
//     IListFinancialInstrumnentResponseData,
//     IRequestData
// } from "./ListFinancialInstrumentInterfaces";

//Import Constants
import { Tooltip } from "@progress/kendo-react-tooltip";
import { MyCommandCell } from "Elements/Basic/GridEditView/CommandCell";
import LoaderComponent from "Elements/Basic/Loader/Loader";
import { IGetDashboardInfoResponseData } from "Layouts/AppLayout/AppLayoutInterfaces";
import { roleBasedGrid, roleBasedTabName, treatmentRequestsStatus } from "Modules/Common/CommonUtility";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import EnhancedComponent from "Modules/TPM/HOC/SearchAndHeading/EnhancedComponent";
import { RootStore } from "Store";
import GridView from "Elements/Basic/GridView/GridView";
import moment from "moment";
import { setRescindValueAction } from "../PendingTreatmentRequestList/PendingTreatmentRequestListAction";

const ResindedTreatmentCertificateList = (props: any) => {
    const dispatch = useDispatch();
    const { data, isLoading, roleCode, isPendingListLoader } = props;
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(15);
    const [resindedTreatmentCeritificate, setResindedTreatmentCertificate] = useState([]);
    const [isAscending, setIsAscending] = React.useState(true);
    const pageChange = (event: any) => {
        setSkip(event.page.skip);
        setTake(event.page.take);
    };
    const isRescind: any = useSelector((state: RootStore) => state.PendingTreatmentRequestListReducer.isRescind);
    debugger;
    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );
    useEffect(() => {
        if (dashboardInfo?.currentRole == UserRole.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent) {
            const filteredResindedTreatmentList = data?.filter((treatment: any) => treatment?.treatmentRequestStatusId == treatmentRequestsStatus?.REJECTED);
            const updateFilteredObject = filteredResindedTreatmentList.map((item: any) => ({
                ...item,
                createdOn: moment(item?.createdOn).format('DD-MM-YYYY'),
                updatedOn: moment(item?.updatedOn).format('DD-MM-YYYY'),
            }));
            setResindedTreatmentCertificate(updateFilteredObject);
        }
        if (dashboardInfo?.currentRole == UserRole?.TreatmentProvider) {

            const filteredTreatmentUnderProcessList = data?.filter((treatment: any) => treatment?.isRegenerated);
            
            const updateFilteredObject = filteredTreatmentUnderProcessList.map((item: any) => ({
                ...item,
                createdOn: moment(item?.createdOn).format('DD-MM-YYYY'),
                updatedOn: moment(item?.updatedOn).format('DD-MM-YYYY'),
            }));
            debugger;
            setResindedTreatmentCertificate(updateFilteredObject);
        }
        dispatch(setRescindValueAction(false));
    }, [data])

    interface CustomHeaderCellProps {
        field: string;
        title: string;
        icon: boolean;
        sortable: boolean;
        toolTipIcon: boolean,
        onSortChange: () => {},
        data: []
    }
    const generalSortChange = (data: any, propertyName: string) => {
        const sortedData = [...data]; //* Create a copy of the original data

        sortedData.sort((a: any, b: any) => {
            const dateA: any = new Date(a[propertyName]);
            const dateB: any = new Date(b[propertyName]);

            if (isAscending) {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        setIsAscending(!isAscending); //* Toggle the sorting order for the next click
        console.log('sortedData: ', sortedData)
        setFinancialInfo(sortedData);
    }
    const CustomHeaderCell: React.FC<CustomHeaderCellProps> = ({ field, title, sortable, onSortChange, icon = true }) => {
        return (
            <div className="custom-header-cell">
                <div className="title-format">
                    <p className="text-center">{title}</p>
                    {sortable && <p className="dob-format">dd-mm-yyy</p>}
                </div>
                <div className="wrap-tooltip-icon d-flex pl-2">
                    <Tooltip anchorElement="element" position="top" tooltipClassName="custom-tooltip">
                        {icon && <div title="Date of initiating the treatment request">
                            <FontAwesomeIcon className="custom-icon" icon={faInfoCircle} />
                        </div>}
                    </Tooltip>
                    {sortable && (
                        <div className="k-header-icon pl-1" onClick={onSortChange}>
                            <FontAwesomeIcon icon={faSort} />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const enterEdit = (dataItem: any) => {
        console.log('dataItem: ', dataItem)
        props.history.push('/TPM/TreatmentCertificates/View', dataItem)
    };
    const [financialInfo, setFinancialInfo] = React.useState<any>(
        []
    );

    function ListComponent(list: any) {
        
        return (
            <div className="main-grid-container m-2">
                <Row>
                    <GridView
                        heading={roleBasedTabName(dashboardInfo?.currentRole, 3)}
                        className="ptr-table"
                        data={resindedTreatmentCeritificate ? resindedTreatmentCeritificate : []}
                        skipColumn={skip}
                        takeColumn={take}
                        total={resindedTreatmentCeritificate.length}
                        isSearchEnabled={true}
                        searchableColumns={[
                            resources_EN.treatment_provider_request_doc_field,
                            resources_EN.treatment_provider_trade_type_field,
                            resources_EN.treatment_provider_sd_document_number_field,
                            resources_EN.treatment_provider_treatment_provider_field,
                            resources_EN.treatment_provider_created_by_role_code_field,
                            resources_EN.treatment_provider_updated_on_field
                        ]}
                        scrollable="scrollable"
                        fixedScroll
                        style={{ height: "70vh" }}
                        pageable={true}>
                        {(dashboardInfo?.currentRole == UserRole?.Trader ||
                            dashboardInfo?.currentRole == UserRole.CustomAgent ||
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider) && (
                            <Column
                                headerClassName="custom-header"
                                field={resources_EN.treatment_provider_request_doc_field}
                                title={resources_EN.treatment_provider_request_doc_title}
                                width={200}
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        )}
                        {
                            // ? Need to ask why treatment certificate number is not comming
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider && (
                                <Column
                                    field={resources_EN.treatment_provider_doc_field}
                                    title={resources_EN.treatment_provider_doc_title}
                                    width={200}
                                    sort={true}
                                    reorderable={true}
                                    resizable={true}
                                />
                            )
                        }

                        <Column
                            field={resources_EN.treatment_provider_trade_type_field}
                            title={resources_EN.treatment_provider_trade_type_label}
                            width={150}
                            sort={true}
                            reorderable={true}
                            resizable={true}
                        />
                        {dashboardInfo?.currentRole == UserRole?.TreatmentProvider && (
                            <Column
                                field={resources_EN.treatment_provider_trade_name_field}
                                title={resources_EN.treatment_provider_trade_name_title}
                                maxWidth="40px"
                                sort={true}
                                reorderable={true}
                                resizable={true}
                                cell={(props: any) => {
                                    return <td>{props?.dataItem?.trader != null ? props?.dataItem?.trader : "N/A"}</td>;
                                }}
                            />
                        )}
                        {(dashboardInfo?.currentRole == UserRole?.Trader ||
                            dashboardInfo?.currentRole == UserRole.CustomAgent) && (
                            <Column
                                field={resources_EN.treatment_provider_sd_document_number_field}
                                title={resources_EN.treatment_provider_sd_document_number_title}
                                minWidth="100px"
                                maxWidth="40px"
                                sort={true}
                                reorderable={true}
                                resizable={true}
                                cell={(props: any) => {
                                    return (
                                        <td>
                                            {props?.dataItem?.sdDocumentNumber != null
                                                ? props?.dataItem?.sdDocumentNumber
                                                : "N/A"}
                                        </td>
                                    );
                                }}
                            />
                        )}
                        {(dashboardInfo?.currentRole == UserRole?.Trader ||
                            dashboardInfo?.currentRole == UserRole.CustomAgent) && (
                            <Column
                                field={resources_EN.treatment_provider_treatment_provider_field}
                                title={resources_EN.treatment_provider_treatment_provider_label}
                                minWidth="100px"
                                maxWidth="40px"
                                sort={true}
                                reorderable={true}
                                resizable={true}
                                cell={(props: any) => {
                                    return (
                                        <td>
                                            {props?.dataItem?.treatmentProvider != "" &&
                                            props?.dataItem?.treatmentProvider != null
                                                ? props?.dataItem?.treatmentProvider
                                                : "N/A"}
                                        </td>
                                    );
                                }}
                            />
                        )}
                        {(dashboardInfo?.currentRole == UserRole?.Trader ||
                            dashboardInfo?.currentRole == UserRole.CustomAgent) && (
                            <Column
                                field={resources_EN.treatment_provider_created_by_role_code_field}
                                title={resources_EN.treatment_provider_created_by_role_code_title}
                                width={150}
                                sort={true}
                                reorderable={true}
                                resizable={true}
                                cell={(props: any) => {
                                    return (
                                        <td>
                                            {props?.dataItem?.createdByRoleCode != null
                                                ? props?.dataItem?.createdByRoleCode
                                                : "N/A"}
                                        </td>
                                    );
                                }}
                            />
                        )}
                        {
                            // ? Need to ask which dates needs to show
                            (dashboardInfo?.currentRole == UserRole?.Trader ||
                                dashboardInfo?.currentRole == UserRole.CustomAgent) && (
                                <Column
                                    field={resources_EN.treatment_provider_updated_on_field}
                                    title={resources_EN.tr_treatment_provider_rejected_request_date_on_label}
                                    minWidth="100px"
                                    maxWidth="40px"
                                    sort={true}
                                    reorderable={true}
                                    resizable={true}
                                />
                            )
                        }
                        {
                            // ? Need to ask which dates needs to show
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider && (
                                <Column
                                    field={resources_EN.treatment_provider_tr_created_on_field}
                                    title={resources_EN.treatment_provider_updated_on_title}
                                    minWidth="100px"
                                    maxWidth="40px"
                                    sort={true}
                                    reorderable={true}
                                    resizable={true}
                                />
                            )
                        }
                        {
                            // ? Need to ask which dates needs to show
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider && (
                                <Column
                                    field={resources_EN.treatment_provider_updated_on_field}
                                    title={resources_EN.tp_treatment_provider_created_on_label}
                                    minWidth="100px"
                                    maxWidth="40px"
                                    sort={true}
                                    reorderable={true}
                                    resizable={true}
                                />
                            )
                        }
                        <Column
                            field={resources_EN.treatment_provider_action_field}
                            title={resources_EN.treatment_provider_action_title}
                            width={100}
                            cell={(props: any) => (
                                <MyCommandCell {...props} edit={enterEdit} customClassName={"custom-command-cell"} />
                            )}
                        />
                    </GridView>
                </Row>
            </div>
        );
    }

    const searchFunction = (item: string, searchTerm: string) => {
        
        let filter: CompositeFilterDescriptor = {
            logic: "or",
            filters: [
                {
                    field: "treatmentCertificateNumber",
                    operator: "contains",
                    value: searchTerm,
                    ignoreCase: true
                },
                {
                    field: "tradeType",
                    operator: "contains",
                    value: searchTerm,
                    ignoreCase: true
                },
                {
                    field: "tradeName",
                    operator: "contains",
                    value: searchTerm,
                    ignoreCase: true
                },
                {
                    field: "issuedOn",
                    operator: "contains",
                    value: searchTerm,
                    ignoreCase: true
                },
                {
                    field: "regeneratedOn",
                    operator: "contains",
                    value: searchTerm,
                    ignoreCase: true
                }
            ]
        };
        let result: any = filterBy(financialInfo, filter);
        console.log('result: ', result)
        if (searchTerm.length < 1) {
            setFinancialInfo([]); //* Note: right now we setup demo data here. we can change once we have reducer and all stuff.
        } else {
            setFinancialInfo(result);
        }
    };
    return <>
        {(isLoading || isPendingListLoader) ? (
            <>
                <LoaderComponent />{" "}
            </>
        ) : (
            <>
                    <ListComponent list={roleBasedGrid(dashboardInfo?.currentRole, 3)} />
            </>
        )}
    </>
};


export default ResindedTreatmentCertificateList;