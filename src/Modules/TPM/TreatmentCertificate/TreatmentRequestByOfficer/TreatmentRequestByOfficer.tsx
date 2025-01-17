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
import { getIORightsData, getIssueTreatmentCertificateData, setSelectedTabValue } from "../TreatmentCertificatesActions";
import { setRescindValueAction } from "../PendingTreatmentRequestList/PendingTreatmentRequestListAction";

const TreatmentRequestByOfficer = (props: any) => {
    const { data, isLoading, roleCode , isPendingListLoader } = props;

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
    // *Get Loading State From Store
    // const isLoading: any = useSelector((state: RootStore) => state.PendingTreatmentRequestListReducer.loading);
    const enterEdit = (dataItem: any) => {
        props.history.push(`/TPM/TreatmentCertificates/View`, dataItem);
    };

    const [requestTreatmentListData, setRequestTreatmentListData] = React.useState([]);

    useEffect(() => {
        if (dashboardInfo?.currentRole == UserRole.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent ) {
            const filteredByStatus = data?.filter((item: any) => item?.treatmentRequestStatusId == treatmentRequestsStatus?.TREATMENTREQUESTED);
            const updateFilteredObject = filteredByStatus.map((item: any) => ({
                ...item,
                createdOn: moment(item?.createdOn).format('DD-MM-YYYY'),
            }));
            // const removeUnUsedProperty = filteredByStatus?.map(({ id, tradeTypeId, sdId, treatmentProviderId, treatmentRequestStatusId, ...keepAttrs }) => keepAttrs);
            setRequestTreatmentListData(updateFilteredObject);
        }
        dispatch(setRescindValueAction(false));
        dispatch(setSelectedTabValue({ selectedValue: 0 }));
    }, [data])

    function ListComponent(list: any) {
        return (
            <div className="main-grid-container m-2" >
                <Row>
                    <GridView
                        heading={roleBasedTabName(dashboardInfo?.currentRole, 11)}
                        data={requestTreatmentListData ? requestTreatmentListData : []}
                        skipColumn={skip}
                        takeColumn={take}
                        total={requestTreatmentListData.length}
                        scrollable="scrollable"
                        fixedScroll
                        reorderable={true}
                        isSearchEnabled={true}
                        searchableColumns={[resources_EN.treatment_provider_request_doc_field, resources_EN.treatment_provider_trade_type_field, resources_EN.treatment_provider_sd_document_number_field, resources_EN.treatment_provider_treatment_provider_field, resources_EN.treatment_provider_created_by_role_code_field, resources_EN.treatment_provider_created_on_field]}
                        pageable={true}
                        resizable={true}
                        style={{ height: "70vh" }}
                    >
                        {
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent || dashboardInfo?.currentRole == UserRole?.TreatmentProvider) &&
                            <Column
                                headerClassName="custom-header"
                                field={resources_EN.treatment_provider_request_doc_field}
                                title={resources_EN.treatment_provider_request_doc_title}
                                width={200}
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        }
                        {
                            dashboardInfo?.currentRole == UserRole?.InspectionOfficer &&
                            <Column
                                headerClassName="custom-header"
                                field={resources_EN.treatment_provider_doc_field}
                                title={resources_EN.treatment_provider_doc_title}
                                width={200}
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        }
                        <Column
                            field={resources_EN.treatment_provider_trade_type_field}
                            title={resources_EN.treatment_provider_trade_type_label}
                            width={150}
                            sort={true}
                            reorderable={true}
                            resizable={true}
                        />
                        {
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider &&
                            <Column
                                field={resources_EN.treatment_provider_trade_name_field}
                                title={resources_EN.treatment_provider_trade_name_title}
                                maxWidth="40px"
                                sort={true}
                                reorderable={true}
                                resizable={true}
                                cell={(props: any) => {
                                    return (
                                        <td >
                                            {props?.dataItem?.trader != null ? props?.dataItem?.trader : 'N/A'}
                                        </td>
                                    )
                                }}
                            />
                        }
                        {
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent || dashboardInfo?.currentRole == UserRole?.InspectionOfficer) &&

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
                                        <td >
                                            {props?.dataItem?.sdDocumentNumber != null ? props?.dataItem?.sdDocumentNumber : 'N/A'}
                                        </td>
                                    )
                                }}
                            />
                        }
                        {
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent || dashboardInfo?.currentRole == UserRole?.InspectionOfficer) &&
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
                                        <td >
                                            {props?.dataItem?.treatmentProvider != "" && props?.dataItem?.treatmentProvider != null ? props?.dataItem?.treatmentProvider : 'N/A'}
                                        </td>
                                    )
                                }}
                            />
                        }
                        {
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent || dashboardInfo?.currentRole == UserRole?.InspectionOfficer) &&

                            <Column
                                field={resources_EN.treatment_provider_created_by_role_code_field}
                                title={resources_EN.treatment_provider_created_by_role_code_title}
                                minWidth="100px"
                                maxWidth="40px"
                                sort={true}
                                reorderable={true}
                                resizable={true}
                                cell={(props: any) => {
                                    return (
                                        <td >
                                            {props?.dataItem?.createdByRoleCode != null ? props?.dataItem?.createdByRoleCode : 'N/A'}
                                        </td>
                                    )
                                }}
                            />
                        }
                        {
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent)  &&

                            <Column
                                field={resources_EN.treatment_provider_created_on_field}
                                title={resources_EN.treatment_provider_created_on_title}
                                width={150}
                                sort={true}
                                reorderable={true}
                                resizable={true}

                            />
                        }
                        {
                            dashboardInfo?.currentRole == UserRole?.InspectionOfficer &&

                            <Column
                                field={resources_EN.treatment_provider_created_on_field}
                                title={resources_EN.treatment_provider_updated_on_title}
                                width={150}
                                sort={true}
                                reorderable={true}
                                resizable={true}

                            />
                        }
                        {
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider &&

                            <Column
                                field={resources_EN.tp_treatment_provider_updated_on_field}
                                title={resources_EN.tp_treatment_provider_updated_on_title}
                                minWidth="100px"
                                maxWidth="40px"
                                sort={true}
                                reorderable={true}
                                resizable={true}

                            />
                        }
                        <Column
                            field={resources_EN.treatment_provider_action_field}
                            title={resources_EN.treatment_provider_action_title}
                            width={100}
                            cell={(props: any) => (
                                <MyCommandCell
                                    {...props}
                                    edit={enterEdit}
                                    customClassName={"custom-command-cell"}
                                />
                            )}
                        />
                    </GridView>
                </Row>
            </div>
        );
    }

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

export default TreatmentRequestByOfficer;
