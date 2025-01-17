import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import Components
import {
    faInfoCircle,
    faSort
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CompositeFilterDescriptor, filterBy } from "@progress/kendo-data-query";
import Column from "Elements/Basic/GridView/Columns/Column";
import GridView from "Elements/Basic/GridView/GridView";
import { Row } from "react-bootstrap";

//Import Styles
import "../TreatmentCertificate.scss";
import "./PendingTreatmentRequestList.scss";

//Import Constants
import { Tooltip } from "@progress/kendo-react-tooltip";
import { MyCommandCell } from "Elements/Basic/GridEditView/CommandCell";
import LoaderComponent from "Elements/Basic/Loader/Loader";
import { IGetDashboardInfoResponseData } from "Layouts/AppLayout/AppLayoutInterfaces";
import { roleBasedTabName, treatmentRequestsStatus } from "Modules/Common/CommonUtility";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import EnhancedComponent from "Modules/TPM/HOC/SearchAndHeading/EnhancedComponent";
import { RootStore } from "Store";
import moment from "moment";
import { getIORightsData, getIssueTreatmentCertificateData } from "../TreatmentCertificatesActions";
import { setRescindValueAction } from "./PendingTreatmentRequestListAction";

const PendingTreatmentRequestList = (props: any) => {
    const { data, isLoading, roleCode, isPendingListLoader } = props;

    const dispatch = useDispatch();
    // *Get Issue Treatment Certificate List Data From Store
    const getIssueTreatmentCertificate: any = useSelector(
        (state: RootStore) => state.TreatmentCertificatesReducer.issueTreatmentCertificateData
    );
    // * Get Dashboard info Data From Store
    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );
    // *Get IO Right Data  Data From Store
    const getIORightsDataDetails: any = useSelector(
        (state: RootStore) => state.TreatmentCertificatesReducer?.ioRightsData
    );
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(15);
    const [isAscending, setIsAscending] = React.useState(true);
    // *Get Loading State From Store
    // const isLoading: any = useSelector((state: RootStore) => state.PendingTreatmentRequestListReducer.loading);

    const pageChange = (event: any) => {
        setSkip(event.page.skip);
        setTake(event.page.take);
    };
    const enterEdit = (dataItem: any) => {


        props.history.push(`/TPM/TreatmentCertificates/View`, dataItem);
    };
    interface CustomHeaderCellProps {
        field: string;
        title: string;
        icon: boolean;
        sortable: boolean;
        onSortChange: () => {};
    }
    // * useEffect Event trigger on component did mount
    useEffect(() => {

        if (dashboardInfo?.currentRole == UserRole.InspectionOfficer) {
            dispatch(
                getIORightsData({
                    documentClassificationCode: "TPM",
                    roleCode: dashboardInfo.currentRole,
                })
            );
        }

    }, [])

    useEffect(() => {
        if (dashboardInfo.currentRole == UserRole.InspectionOfficer) {
            if(getIORightsDataDetails != ""){
            dispatch(getIssueTreatmentCertificateData({
                roleCode: dashboardInfo?.currentRole,
                childUserRoleIds: dashboardInfo?.childUserRoleIds,
                rights: getIORightsDataDetails || "",
                documentClassificationCode: "TPM",
            }))
        }
    }
    }, [getIORightsDataDetails])



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

    const [requestTreatmentListData, setRequestTreatmentListData] = React.useState([]);

    useEffect(() => {
        if (dashboardInfo?.currentRole == UserRole.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent ) {
            const filteredByStatus = data?.filter((item: any) => item?.treatmentRequestStatusId == treatmentRequestsStatus?.PENDING || item?.treatmentRequestStatusId == treatmentRequestsStatus?.RESSIGNED);
            const updateFilteredObject = filteredByStatus.map((item: any) => ({
                ...item,
                createdOn: moment(item?.createdOn).format('DD-MM-YYYY'),
            }));
            // const removeUnUsedProperty = filteredByStatus?.map(({ id, tradeTypeId, sdId, treatmentProviderId, treatmentRequestStatusId, ...keepAttrs }) => keepAttrs);
            setRequestTreatmentListData(updateFilteredObject);
        }
        if (dashboardInfo?.currentRole == UserRole.TreatmentProvider) {
            const filteredByStatus = data?.filter((item: any) => item?.treatmentRequestStatusId == treatmentRequestsStatus?.PENDING || item?.treatmentRequestStatusId == treatmentRequestsStatus?.RESSIGNED);
            const updateFilteredObject = filteredByStatus.map((item: any) => ({
                ...item,
                createdOn: moment(item?.createdOn).format('DD-MM-YYYY'),
            }));
            // const removeUnUsedProperty = filteredByStatus?.map(({ id, tradeTypeId, sdId, treatmentProviderId, treatmentRequestStatusId, ...keepAttrs }) => keepAttrs);
            setRequestTreatmentListData(updateFilteredObject);
        }
        if (dashboardInfo?.currentRole == UserRole.InspectionOfficer) {
            const filteredByStatus = data?.filter((item: any) => item?.treatmentRequestStatusID == treatmentRequestsStatus?.ASSIGNED);
            const updateFilteredObject = filteredByStatus.map((item: any) => ({
                ...item,
                createdOn: moment(item?.createdOn).format('DD-MM-YYYY'),
            }));

            setRequestTreatmentListData(updateFilteredObject);
        }
        dispatch(setRescindValueAction(false));

    }, [data])
    const onSortChange = () => {
        const sortedData = [...requestTreatmentListData]; //* Create a copy of the original data

        sortedData.sort((a: any, b: any) => {
            const dateA: any = new Date(a.requestDate);
            const dateB: any = new Date(b.requestDate);

            if (isAscending) {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        setIsAscending(!isAscending); //* Toggle the sorting order for the next click
        // setRequestTreatmentListData(sortedData);
    };
    function ListComponent(list: any) {
        return (
            <div className="main-grid-container m-2">
                <Row>
                    <GridView
                        heading={roleBasedTabName(dashboardInfo?.currentRole, 1)}
                        data={requestTreatmentListData ? requestTreatmentListData : []}
                        skipColumn={skip}
                        takeColumn={take}
                        total={requestTreatmentListData.length}
                        scrollable="scrollable"
                        fixedScroll
                        reorderable={true}
                        isSearchEnabled={true}
                        searchableColumns={[
                            resources_EN.treatment_provider_request_doc_field,
                            resources_EN.treatment_provider_trade_type_field,
                            resources_EN.treatment_provider_sd_document_number_field,
                            resources_EN.treatment_provider_treatment_provider_field,
                            resources_EN.treatment_provider_created_by_role_code_field,
                            resources_EN.treatment_provider_created_on_field,
                            resources_EN.treatment_provider_doc_field
                        ]}
                        pageable={true}
                        resizable={true}
                        style={{ height: "70vh" }}>
                        {(dashboardInfo?.currentRole == UserRole?.Trader ||
                            dashboardInfo?.currentRole == UserRole.CustomAgent ||
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider ||
                            dashboardInfo?.currentRole == UserRole?.InspectionOfficer) && (
                            <Column
                                field={resources_EN.treatment_provider_request_doc_field}
                                title={resources_EN.treatment_provider_request_doc_title}
                                width={180}
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        )}
                        {dashboardInfo?.currentRole == UserRole?.InspectionOfficer && (
                            <Column
                                headerClassName="custom-header"
                                field={resources_EN.treatment_provider_doc_field}
                                title={resources_EN.treatment_provider_doc_title}
                                width={200}
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        )}
                        <Column
                            field={resources_EN.treatment_provider_trade_type_field}
                            title={resources_EN.treatment_provider_trade_type_label}
                            width={120}
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
                            dashboardInfo?.currentRole == UserRole.CustomAgent ||
                            dashboardInfo?.currentRole == UserRole?.InspectionOfficer) && (
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
                            dashboardInfo?.currentRole == UserRole.CustomAgent ||
                            dashboardInfo?.currentRole == UserRole?.InspectionOfficer) && (
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
                            dashboardInfo?.currentRole == UserRole.CustomAgent ||
                            dashboardInfo?.currentRole == UserRole?.InspectionOfficer) && (
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
                        {(dashboardInfo?.currentRole == UserRole?.Trader ||
                            dashboardInfo?.currentRole == UserRole.CustomAgent) && (
                            <Column
                                field={resources_EN.treatment_provider_created_on_field}
                                title={resources_EN.treatment_provider_created_on_title}
                                width={150}
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        )}
                        {dashboardInfo?.currentRole == UserRole?.InspectionOfficer && (
                            <Column
                                field={resources_EN.treatment_provider_created_on_field}
                                title={resources_EN.treatment_provider_updated_on_title}
                                minWidth="100px"
                                maxWidth="40px"
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        )}
                        {dashboardInfo?.currentRole == UserRole?.TreatmentProvider && (
                            <Column
                                field={resources_EN.tp_treatment_provider_updated_on_field}
                                title={resources_EN.tp_treatment_provider_updated_on_title}
                                minWidth="100px"
                                maxWidth="40px"
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        )}
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
                    field: "requestDocumentNumber",
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
                    field: "sdDocumentNumber",
                    operator: "contains",
                    value: searchTerm,
                    ignoreCase: true
                },
                {
                    field: "createdByRoleCode",
                    operator: "contains",
                    value: searchTerm,
                    ignoreCase: true
                },
                {
                    field: "createdOn",
                    operator: "contains",
                    value: searchTerm,
                    ignoreCase: true
                }
            ]
        };
        let result: any = filterBy(requestTreatmentListData, filter);
        if (searchTerm.length < 1) {
            // setRequestTreatmentListData(demoData); //* Note: right now we setup demo data here. we can change once we have reducer and all stuff.
        } else {
            // setRequestTreatmentListData(result);
        }
    };

    return (
        <>
            {(isLoading || isPendingListLoader) ? (
                <>
                    <LoaderComponent />{" "}
                </>
            ) : (
                <>
                    <ListComponent data={requestTreatmentListData} list={[]} />
                </>
            )}
        </>
    );
};

export default PendingTreatmentRequestList;
