import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Import Components
import { Button, Col, Container, Row } from "react-bootstrap";
import { Input } from "@progress/kendo-react-inputs";
import { faEdit, faInfoCircle, faSearch, faSort, faSortDown, faSortUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GridView from "Elements/Basic/GridView/GridView";
import Column from "Elements/Basic/GridView/Columns/Column";
import {
    CompositeFilterDescriptor,
    filterBy
} from "@progress/kendo-data-query";
import './IssueTreatmentCertificateList.scss';
//Import Styles
import '../TreatmentCertificate.scss';

//Import Constants
import { RootStore } from "Store";
import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import LoaderComponent from "Elements/Basic/Loader/Loader";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import GridColumns from "Modules/TPM/Constants/GridColumns";
import { Tooltip } from "@progress/kendo-react-tooltip";
import EnhancedComponent from "Modules/TPM/HOC/SearchAndHeading/EnhancedComponent";
import { MyCommandCell } from "Elements/Basic/GridEditView/CommandCell";
import { getRoleBaseListing, roleBasedGrid, treatmentRequestsStatus } from "Modules/Common/CommonUtility";
import { IGetDashboardInfoResponseData } from "Layouts/AppLayout/AppLayoutInterfaces";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import moment from "moment";

const IssueTreatmentCertificateList = (props: any) => {
    const { data, isLoading, roleCode, isPendingListLoader } = props;
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(15);
    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );
    const [issueTreatmentCertificateData, setIssueTreatmentCertificateData] = useState(data);
    const [isAscending, setIsAscending] = React.useState(true);
    const pageChange = (event: any) => {
        setSkip(event.page.skip);
        setTake(event.page.take);
    };

    interface CustomHeaderCellProps {
        field: string;
        title: string;
        icon: boolean;
        sortable: boolean;
        onSortChange: () => {},
    }

    const enterEdit = (dataItem: any) => {
        console.log('dataItem: ', dataItem)
        
        props.history.push('/TPM/TreatmentCertificates/View', dataItem)
    };
    useEffect(() => {
        if (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent) {
            const filteredTreatmentUnderProcessList = data?.filter((treatment: any) => treatment?.treatmentRequestStatusID == treatmentRequestsStatus?.ASSIGNED || treatment?.treatmentRequestStatusID == treatmentRequestsStatus.CERTIFICATEISSUED || treatment?.treatmentRequestStatusID == treatmentRequestsStatus.CERTIFICATEENDORSED || treatment?.treatmentRequestStatusID == treatmentRequestsStatus.CERTIFICATETAGGED);
            const updateFilteredObject = filteredTreatmentUnderProcessList.map((item: any) => ({
                ...item,
                createdOn: moment(item?.createdOn).format('DD-MM-YYYY'),
            }));
            setIssueTreatmentCertificateData(updateFilteredObject);
        }
        if (dashboardInfo?.currentRole == UserRole?.TreatmentProvider) {
            const filteredTreatmentUnderProcessList = data?.filter((treatment: any) => !treatment?.isRegenerated);

            const updateFilteredObject = filteredTreatmentUnderProcessList.map((item: any) => ({
                ...item,
                createdOn: moment(item?.createdOn).format('DD-MM-YYYY'),
            }));
            
            setIssueTreatmentCertificateData(updateFilteredObject);
        }
        if (dashboardInfo?.currentRole == UserRole?.InspectionOfficer) {
            const filteredTreatmentUnderProcessList = data?.filter((treatment: any) => treatment?.treatmentRequestStatusId == treatmentRequestsStatus.CERTIFICATEISSUED);
            
            setIssueTreatmentCertificateData(filteredTreatmentUnderProcessList);
        }
    }, [data])

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
    const [financialInfo, setFinancialInfo] = React.useState(
        []
    );

    const onSortChange = () => {
        const sortedData = [...financialInfo]; //* Create a copy of the original data

        sortedData.sort((a:any, b:any) => {
            const dateA: any = new Date(a.issuedOn);
            const dateB: any = new Date(b.issuedOn);

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
    function ListComponent(list: any) {
        
        return (
            <div className="main-grid-container m-2" >

                <Row>
                    <GridView
                        heading={"Issued Treatment Certificate"}
                        className="ptr-table"
                        data={issueTreatmentCertificateData ? issueTreatmentCertificateData :[] }
                        skipColumn={skip}
                        takeColumn={take}
                        total={issueTreatmentCertificateData?.length || 0}
                        isSearchEnabled={true}
                        searchableColumns={[resources_EN.treatment_provider_request_doc_field, resources_EN.treatment_provider_trade_type_field, resources_EN.treatment_provider_sd_document_number_field, resources_EN.treatment_provider_treatment_provider_field, resources_EN.treatment_provider_created_by_role_code_field, resources_EN.treatment_provider_tr_created_on_field]}
                        scrollable='scrollable'
                        fixedScroll
                        pageable={true}
                        style={{ height: "70vh" }}
                    >
                         {
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent || dashboardInfo?.currentRole == UserRole?.TreatmentProvider) &&
                            <Column
                                headerClassName="custom-header"
                                field={resources_EN.treatment_provider_request_doc_field}
                                title={resources_EN.treatment_provider_request_doc_title}
                                width={180}
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        }
                        {  
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider &&
                            <Column
                                field={resources_EN.treatment_provider_doc_field}
                                title={resources_EN.treatment_provider_tp_request_document_number_title}
                                minWidth="100px"
                                maxWidth="40px"
                                sort={true}
                                reorderable={true}
                                resizable={true}

                            />
                        }
                        {
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent) &&
                            <Column
                                headerClassName="custom-header"
                                field={resources_EN.treatment_provider_doc_field}
                                title={resources_EN.treatment_provider_tp_request_document_number_title}
                                width={200}
                                sort={true}
                                reorderable={true}
                                resizable={true}
                            />
                        }
                        <Column
                            field={resources_EN.treatment_provider_trade_type_field}
                            title={resources_EN.treatment_provider_trade_type_label}
                            width={140}
                            sort={true}
                            reorderable={true}
                            resizable={true}
                        />
                        {
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider &&
                            <Column
                                field={resources_EN.treatment_provider_trader_name_field}
                                title={resources_EN.treatment_provider_trader_name_title}
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
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent) &&

                            <Column
                                field={resources_EN.treatment_provider_tr_sd_document_number_field}
                                title={resources_EN.treatment_provider_tr_sd_document_number_title}
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
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent) &&
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
                                            {props?.dataItem?.treatmentProvider != "" && props?.dataItem?.treatmentProvider != null  ? props?.dataItem?.treatmentProvider : 'N/A'}
                                        </td>
                                    )
                                }}
                            />
                        }
                        {
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent) &&

                            <Column
                                field={resources_EN.treatment_provider_tr_created_by_role_code_field}
                                title={resources_EN.treatment_provider_tr_created_by_role_code_title}
                                width={140}
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
                        { // ? Need to ask which dates needs to show
                            (dashboardInfo?.currentRole == UserRole?.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent)  &&
                            <Column
                                field={resources_EN.treatment_provider_tr_created_on_field}
                                title={resources_EN.treatment_provider_tr_created_on_title}
                                width={120}
                                sort={true}
                                reorderable={true}
                                resizable={true}

                            />
                        }
                        { // ? Need to ask which dates needs to show
                            dashboardInfo?.currentRole == UserRole?.TreatmentProvider &&
                            <Column
                                field={resources_EN.treatment_provider_tr_created_on_field}
                                title={resources_EN.treatment_provider_tr_date_of_treatment_title}
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
                            cell={(props:any) => (
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
                }
            ]
        };
        let result: any = filterBy(financialInfo, filter);
        console.log('result: ', result)
        if (searchTerm.length < 1) {
            setFinancialInfo([]); // Note: right now we setup demo data here. we can change once we have reducer and all stuff.
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
export default IssueTreatmentCertificateList;