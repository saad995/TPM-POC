import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// React Bootstrap
import { Row, Col, Button as BootstrapButton } from "react-bootstrap";

// Import CSS
import styles from "./Grid.module.scss";
import { RootStore } from "Store";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import {
    DocumentClassificationCode,
    DocumentInfo,
    Agency,
    DocumentGroupCode,
    TreatmentProviderRegistrationAmendmentStatus,
    TreatmentProviderRegistrationStatus,
    TreatmentTypesRegistrationStatus
} from "Modules/TPM/Constants/Interfaces";
import { IUpdateStoreObject } from "Modules/TPM/Common/UpdateStoreObject/UpdateStoreObjectInterfaces";
import { updateStoreObjectAction } from "Modules/TPM/Common/UpdateStoreObject/UpdateStoreObjectActions";
import Loader from "Elements/Basic/Loader/Loader";
import { Role } from "Lib/Types/SharedTypes";
import Paths from "Modules/TPM/Constants/Paths";
import SweetAlert from "react-bootstrap-sweetalert";
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from "@progress/kendo-react-layout";

import { clearTabStripState, updateTabStripAction } from "Modules/TPM/Common/TabStripCommon/TabStripActions";
import GridTitle from "Modules/TPM/Common/GridTitle";
import { Tabs } from "Modules/TPM/Common/TabStripCommon/TabStripInterface";

import { getHeaderTitle } from "Modules/Common/Helpers/Utility";
import GenericIPGrid from "Modules/TPM/Common/GenericGrid";
// import SelectRegistrationTypeModal from "../CreatePremiseRegistrationForm/SelectRegistrationTypeModal/SelectRegistrationTypeModal";
import { fetchGridDataFunc, getUserRoleAction } from "Modules/Common/Helpers/DateHelper";
import { DefaultColumns, DGColumns, OAAColumns, OFColumns, OFDPPColumns, TRColumns, TRDPPColumns, TreatmentRegistrationDetailGridColumns } from "./GridColumnSize";
import { ClearGetAllTreatmentProviderRegistrations, getAllTreatmentProviderRegistrationAction } from "./GridAction";
import { IGridTabs, searchableColumns } from "./GridInterfaces";
import { GridDetailRowProps, GridExpandChangeEvent } from "@progress/kendo-react-grid";
import GenericDetailGrid from "Modules/TPM/Common/GenericDetailGrid";
import Column from "Elements/Basic/GridView/Columns/Column";
import GridView from "Elements/Basic/GridView/GridView";
import { Button } from "@progress/kendo-react-buttons";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import { clearConfirmReducerState } from "../CreateEditTPMRegistration/CreateEditTPMRegistrationAction";
import { getTreatmentProvider } from "Modules/TPM/TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequestAction";
import GridActionCell from "./GridActionCell";
import GridDetailActionCell from "./GridDetailActionCell";
import { createEditTreatmentOnBoardDataClearAction } from "Elements/Custom/FormGenerator/FormGeneratorAction";

const Grid = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    let agencyIdLocationState = history.location.state;

    const userRole = useSelector((state: RootStore) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );

    const agencyId = useSelector((state: RootStore) =>
        state.dashboardReducer.dashboardInfo.agencyId != undefined && state.dashboardReducer.dashboardInfo.agencyId != 0
            ? state.dashboardReducer.dashboardInfo.agencyId
            : agencyIdLocationState
    );
    const tpmRegistrationsListStore = useSelector((state: RootStore) => state.RegistrationGridReducer.tpmRegistrations);
    const tab = useSelector((state: RootStore) => state.TabSripStateReducer.tab);

    const loading = useSelector((state: RootStore) => state.RegistrationGridReducer.loading);

    const [tpmRegistrationList, setTPMRegistrationList] = useState<any>([]);
    const [columns, setColumns] = React.useState(OAAColumns as any);
    const [isInfo, setInfo] = useState(false);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [sweetAlertTitle, setSweetAlertTitle] = useState("");
    const [selected, setSelected] = useState(0);
    const [tabPos, setTabPos] = useState("top");
    const [isUnauthorized, setIsUnauthorized] = useState(false);
    const [localStorageData, setLocalStorageData] = useState<any>();
    const [showTransactionTypeModalImport, setShowTransactionTypeModalImport] = useState(false);
    //const  URL:any = getUserRoleAction(userRole);
    const URL = Paths.Registration;

    const viewTreatmentRegistration = (props: any) => {
        const { id, documentTypeCode, treatmentTypeId,
             statusId, treatmentProviderId, agencyBusinessRegistrationId} = props?.dataItem;

        const data: IUpdateStoreObject = {
            initDocumentTypeCode: documentTypeCode,
            id: id, // treatment provider id
            action: statusId, 
            documentClassificationCode: DocumentClassificationCode.TREATMENT_PROVIDER.toString(),
            agencyId: agencyId ? agencyId : localStorageData?.agencyId,
            currentRecordId: id, // treatment provider id
            requestDocumentEncryptedID: id, // treatment provider encrypted id
            requestDocumentItemRegEncryptedID: '', // treatment type reg encrypted id
            itemId: treatmentTypeId, // treatment type id
            agencyBusinessRegistrationEncryptedId: agencyBusinessRegistrationId,
            isRenewal: false,
            isAmendment: false
        };

        dispatch(updateStoreObjectAction(data));
        fetchGridDataFunc({ ...localStorageData, ...data });

        return history.push(Paths.Registration.View, data);
    };

    const ViewTreatmentRenewal = (props: any) => {
        if (userRole == Role.Trader || userRole == Role.Officer || userRole == Role.ECOfficer) {
            const { dataItem } = props;
            const { id, requestDocumentTypeCode, currentRecordEncryptedId, currentRecordId, treatmentTypeId, agencyBusinessRegistrationId } = dataItem;
            const data: IUpdateStoreObject = {
                initDocumentTypeCode: dataItem.initDocumentTypeCode,
                id: id,
                action: dataItem.statusId,
                isRenewal: true,
                isAmendment: false,
                documentClassificationCode: DocumentClassificationCode.TREATMENT_PROVIDER.toString(),
                agencyId: agencyId ? agencyId : localStorageData?.agencyId,
                currentRecordId: id, // treatment provider id
                requestDocumentEncryptedID: id, // treatment provider encrypted id
                requestDocumentItemRegEncryptedID: '', // treatment type reg encrypted id
                itemId: treatmentTypeId, // treatment type id
                agencyBusinessRegistrationEncryptedId: agencyBusinessRegistrationId,
                renewal: {
                    initDocumentIDs: currentRecordEncryptedId,
                    initDocumentID: currentRecordId,
                    documentClassificationCode: DocumentClassificationCode.PREMISE.toString(),
                    initDocumentTypeCode: requestDocumentTypeCode
                }
            };
            dispatch(updateStoreObjectAction(data));
            fetchGridDataFunc({ ...localStorageData, ...data });

            return history.push(Paths.Registration.RenewalView, data);
        }
    };

    const viewTreatmentAmendment = (props: any) => {
        const { dataItem } = props;
        const {
            id,
            requestDocumentTypeCode,
            currentRecordEncryptedId,
            currentRecordId,
            parentDocumentTypeCode,
            initDocumentTypeCode,
            agencyBusinessRegistrationId,
            treatmentTypeId
        } = dataItem;
        const data: IUpdateStoreObject = {
            initDocumentTypeCode: initDocumentTypeCode, //localStorageData?.initDocumentTypeCode,
            id: id,
            action: dataItem.statusId,
            isRenewal: false,
            isAmendment: true,
            documentClassificationCode: DocumentClassificationCode.TREATMENT_PROVIDER.toString(),
            agencyId: agencyId ? agencyId : localStorageData?.agencyId,
            currentRecordId: id, // treatment provider id
            requestDocumentEncryptedID: id, // treatment provider encrypted id
            requestDocumentItemRegEncryptedID: '', // treatment type reg encrypted id
            itemId: treatmentTypeId, // treatment type id
            agencyBusinessRegistrationEncryptedId: agencyBusinessRegistrationId,
            amendment: {
                initDocumentIDs: currentRecordEncryptedId,
                initDocumentID: currentRecordId,
                documentClassificationCode: DocumentClassificationCode.PREMISE.toString(),
                initDocumentTypeCode: requestDocumentTypeCode
            }
        };

        dispatch(updateStoreObjectAction(data));
        fetchGridDataFunc({ ...localStorageData, ...data });

        return history.push(Paths.Registration.AmendmentView, data);
    };

    const handleDetailItemView = (props:any) => {
        const { id, documentTypeCode, treatmentTypeId, statusId, treatmentProviderId, agencyBusinessRegistrationId} = props;
        const data: IUpdateStoreObject = {
            initDocumentTypeCode: documentTypeCode,
            id: treatmentProviderId, // treatment provider id
            action: statusId, 
            documentClassificationCode: DocumentClassificationCode.TREATMENT_PROVIDER.toString(),
            agencyId: agencyId,
            currentRecordId: treatmentProviderId, // treatment provider id
            requestDocumentEncryptedID: treatmentProviderId, // treatment provider encrypted id
            requestDocumentItemRegEncryptedID: id, // treatment type reg encrypted id
            itemId: treatmentTypeId, // treatment type id
            agencyBusinessRegistrationEncryptedId: agencyBusinessRegistrationId,
            isRenewal: false,
            isAmendment: false
        };

        dispatch(updateStoreObjectAction(data));
        fetchGridDataFunc({ ...localStorageData, ...data });

        return history.push(URL.ViewItem, data);
    };

    const GridPanel = () => {
        if ((localStorageData && localStorageData.agencyId == Agency.MFD) || agencyId == Agency.MFD) {
            fetchGridDataFunc({
                ...localStorageData,
                initDocumentTypeCode: DocumentInfo.MFD_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE.toString(),
                initDocumentID: 0
            });
        } else if ((localStorageData && localStorageData.agencyId == Agency.DPP) || agencyId == Agency.DPP) {
            fetchGridDataFunc({ ...localStorageData, initDocumentTypeCode: "", initDocumentID: 0 });
        };
        const handleCreateButton = ()=>{
           dispatch(createEditTreatmentOnBoardDataClearAction())
            dispatch(clearConfirmReducerState())
        }

        return (
            <>
                <Link
                    to={{
                        pathname: Paths.Registration.Create,
                        state: { 
                            data: localStorageData?.agencyId || agencyId,
                        }
                    }}
                    className="text-decoration-none">
                    <BootstrapButton onClick={handleCreateButton} className={"text-nowrap d-inline-flex align-items-center " + styles.buttonHeading}>
                        <span className="k-icon k-i-plus mr-1" />
                        Create New Registration
                    </BootstrapButton>
                </Link>
            </>
        );
    };

    const clearGridComponent = () => {
        setTPMRegistrationList([]);
        dispatch(ClearGetAllTreatmentProviderRegistrations());
        dispatch(clearTabStripState());
    };


    const wrapperFunction = (props: any) => {
        if(props){
            let _props = {...props};
            let { dataItem } = _props;
            let { id, requestDocumentTypeCode, currentRecordEncryptedId,agencyBusinessRegistrationId, currentRecordId, parentDocumentTypeCode, statusId,initDocumentTypeCode, status,treatmentProviderStatusId} = dataItem;
            //  let agencyId:any = (localStorageData?.agencyId || localStorageData?.agencyId != 0) ? localStorageData?.agencyId : agencyId;
            let InterfaceCondition: any = TreatmentProviderRegistrationStatus;
    
            if (
                agencyId ||
                (localStorageData && localStorageData?.agencyId) == Agency.MFD ||
                (localStorageData && localStorageData?.agencyId) == Agency.DPP
            ) {
                switch (initDocumentTypeCode) {
                    case DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE:
                        {
                            InterfaceCondition = TreatmentProviderRegistrationStatus;
                        }
                        break;
                    case DocumentInfo.TREATMENT_REG_AMENDMENT_DOC_TYPE_CODE:
                        {
                            InterfaceCondition = TreatmentProviderRegistrationAmendmentStatus;
                        }
                        break;
                    case DocumentInfo.TREATMENT_REG_RENEWAL_DOC_TYPE_CODE:
                        {
                            InterfaceCondition = TreatmentProviderRegistrationAmendmentStatus;
                        }
                        break;
                    default:
                        {
                            InterfaceCondition = TreatmentProviderRegistrationStatus;
                        }
                        break;
                }
            }
            // let treatmentProviderStatusId = 0;
                if(status == 'Draft'){
                    treatmentProviderStatusId = TreatmentProviderRegistrationStatus.DRAFT

                }else{
                    treatmentProviderStatusId = treatmentProviderStatusId;
                }

            _props.dataItem = { 
                ...dataItem, 
                statusId: treatmentProviderStatusId,
                // currentRecordId: agencyBusinessRegistrationId, // todo for edit only
                // id: agencyBusinessRegistrationId, // todo for edit only

                // id, 
                // requestDocumentTypeCode, 
                // currentRecordEncryptedId,
                // currentRecordId, 
                // parentDocumentTypeCode, 
                // initDocumentTypeCode,
                
            };
    
            const otheractionBtn = GridActionCell({
                IStatusInterface: InterfaceCondition,
                rowData: _props,
                agencyId: agencyId,
                isDetailAction: false,
                URL,
                handleDetailItemView
            });
      
            return <>{otheractionBtn ? otheractionBtn : null}</>;
        }
    };

    const handleInfoAlert = (message: string, title: string = "") => {
        setShow(true);
        setInfo(true);
        setSweetAlertTitle(title);
        setMessage(message);
    };

    const sweetAlertOnConfirm = () => {
        setShow(false);
    };

    const handleSwitchTabs = (selectedTabId: any) => {
        clearGridComponent();
        setSelected(selectedTabId);
        let initDocumentTypeCode = "";
        const selectedTabData = { ...localStorageData, initDocumentTypeCode };
        if (localStorageData && Object.keys(localStorageData).length > 0 && localStorageData?.agencyId == Agency.MFD) {
            switch (selectedTabId) {
                case 0:
                    {
                        selectedTabData.initDocumentTypeCode = DocumentInfo.MFD_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE.toString();
                    }
                    break;
                case 1:
                    {
                        selectedTabData.initDocumentTypeCode = DocumentInfo.MFD_PREMISE_AMENDMENT_DOCUMENT_TYPE_CODE.toString();
                    }
                    break;
                case 2:
                    {
                        selectedTabData.initDocumentTypeCode = DocumentInfo.MFD_PREMISE_RENEWAL_DOCUMENT_TYPE_CODE.toString();
                    }
                    break;
                default: {
                    selectedTabData.initDocumentTypeCode = DocumentInfo.MFD_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE.toString();
                }
            }
        }

        switch (selectedTabId) {
            case Tabs.INQUEUE:
                selectedTabData.isAmendment = false;
                selectedTabData.isRenewal = false;
                selectedTabData.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION;
                break;
            case Tabs.AMENDMENT:
                selectedTabData.isAmendment = true;
                selectedTabData.isRenewal = false;
                selectedTabData.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION_AMENDMENT;
                break;
            case Tabs.RENEWAL:
                selectedTabData.isAmendment = false;
                selectedTabData.isRenewal = true;
                selectedTabData.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION_RENEWAL;
                break;
            default:
                selectedTabData.isAmendment = false;
                selectedTabData.isRenewal = false;
                selectedTabData.documentGroupCode = DocumentGroupCode.PREMISE_REGISTARTION;
        }
        fetchGridDataFunc({ ...localStorageData, ...selectedTabData });
        setLocalStorageData({ ...localStorageData, ...selectedTabData });
    };

    const transactionTypeModalCancelHandler = () => {
        // dispatch(clearAllImportSDReducerState());
        setShowTransactionTypeModalImport(false);
    };

    const handleExpand = (event: GridExpandChangeEvent) => {
        let updatedData = tpmRegistrationList.map((item: any) => {
            if (item.id === event.dataItem.id) {
                item.expanded = !event.dataItem.expanded;
            }
            return item;
        });
        setTPMRegistrationList(updatedData);
    };


    const detailWrapperFunction = (props: any) => {
        if(props){
            let _props = {...props};
            let { dataItem } = _props;
    
            let { id, requestDocumentTypeCode, currentRecordEncryptedId, currentRecordId, parentDocumentTypeCode, statusId,initDocumentTypeCode, treatmentTypeRegistrationStatusId} = dataItem;
            //  let agencyId:any = (localStorageData?.agencyId || localStorageData?.agencyId != 0) ? localStorageData?.agencyId : agencyId;
            let InterfaceCondition: any = TreatmentTypesRegistrationStatus;
            if ((agencyId && agencyId == Agency.DPP)|| (localStorageData && localStorageData?.agencyId == Agency.DPP)) {
                switch (initDocumentTypeCode) {
                    case DocumentInfo.TREATMENT_REG_DOC_TYPE_CODE:
                        {
                            InterfaceCondition = TreatmentTypesRegistrationStatus;
                        }
                        break;
                    case DocumentInfo.TREATMENT_REG_AMENDMENT_DOC_TYPE_CODE:
                        {
                            InterfaceCondition = TreatmentTypesRegistrationStatus;
                        }
                        break;
                    case DocumentInfo.TREATMENT_REG_RENEWAL_DOC_TYPE_CODE:
                        {
                            InterfaceCondition = TreatmentTypesRegistrationStatus;
                        }
                        break;
                    default:
                        {
                            InterfaceCondition = TreatmentTypesRegistrationStatus;
                        }
                        break;
                }
            }

            _props.dataItem = {
                 ...dataItem, 
                statusId: treatmentTypeRegistrationStatusId,
                itemId: dataItem?.treatmentProviderId
                // id, 
                // requestDocumentTypeCode, 
                // currentRecordEncryptedId,
                // currentRecordId, 
                // parentDocumentTypeCode, 
                // initDocumentTypeCode,
                
            };
    
            const otheractionBtn = GridDetailActionCell({
                IStatusInterface: InterfaceCondition,
                rowData: _props,
                agencyId: agencyId,
                isDetailAction: true,
                URL,
                handleDetailItemView


            });
            
            return <>{otheractionBtn ? otheractionBtn : null}</>;
        }
    };

    useEffect(() => {
        if (tpmRegistrationsListStore?.length) {
            setTPMRegistrationList(tpmRegistrationsListStore);
        }
    }, [tpmRegistrationsListStore]);

    useEffect(() => {
        if (userRole == Role.Officer) {
            let data: any = { agencyId };

            if (
                localStorageData &&
                Object.keys(localStorageData).length > 0 &&
                localStorageData?.initDocumentTypeCode == ""
            ) {
                if (agencyId == Agency.MFD) {
                    data.initDocumentTypeCode = DocumentInfo.MFD_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE.toString();
                    setLocalStorageData({
                        ...localStorageData,
                        ...data,
                        initDocumentTypeCode: data.initDocumentTypeCode
                    });
                } else if (agencyId == Agency.DPP) {
                    data.initDocumentTypeCode = DocumentInfo.MFD_PREMISE_REGISTRATION_DOCUMENT_TYPE_CODE.toString();
                    setLocalStorageData({
                        ...localStorageData,
                        ...data,
                        initDocumentTypeCode: data.initDocumentTypeCode
                    });
                }
            }
            fetchGridDataFunc({ ...localStorageData, ...data });
        }
    }, [userRole, localStorageData, agencyId]);

    useEffect(() => {
        if (userRole && userRole != "" && localStorageData && Object.keys(localStorageData).length > 0) {
            let purposeId = IGridTabs.InQ;

            if (selected == 1) {
                dispatch(
                    getAllTreatmentProviderRegistrationAction(
                        { userRole, purposeId: IGridTabs.AMENDMENT, agencyId: localStorageData?.agencyId },
                        (res: any) => {
                            setIsUnauthorized(true);
                        }
                    )
                );
            } else if (selected == 2) {
                dispatch(
                    getAllTreatmentProviderRegistrationAction(
                        { userRole, purposeId: IGridTabs.RENEWAL, agencyId: localStorageData?.agencyId },
                        (res: any) => {
                            setIsUnauthorized(true);
                        }
                    )
                );
            } else {
                dispatch(
                    getAllTreatmentProviderRegistrationAction(
                        { userRole, purposeId: IGridTabs.InQ, agencyId: localStorageData?.agencyId },
                        (res: any) => {
                            setIsUnauthorized(true);
                        }
                    )
                );
            }

            if (localStorageData?.agencyId == Agency.DPP) {
                // if (userRole == Role.Trader) setColumns(TRDPPColumns);
                // if (userRole == Role.Officer || userRole === Role.IPOfficer) setColumns(OFDPPColumns);
                // if (userRole == Role.DeputyDirector || userRole === Role.IPDeputyDirector) setColumns(DGColumns);
                if (userRole == Role.OGAAdmin) setColumns(OAAColumns);

            } else {
                // if (userRole == Role.Trader) setColumns(TRColumns);
                // if (userRole == Role.Officer || userRole === Role.IPOfficer) setColumns(OFColumns);
                // if (userRole == Role.DeputyDirector || userRole === Role.IPDeputyDirector) setColumns(DGColumns);
                if (userRole == Role.OGAAdmin) setColumns(OAAColumns);

            }
        }
    }, [userRole, selected, localStorageData]);

    useEffect(() => {

        if (localStorageData?.agencyId == Agency.DPP) {
            // if (userRole == Role.Trader) setColumns(TRDPPColumns);
            // if (userRole == Role.Officer || userRole === Role.IPOfficer) setColumns(OFDPPColumns);
            // if (userRole == Role.DeputyDirector || userRole === Role.IPDeputyDirector) setColumns(DGColumns);
            if (userRole == Role.OGAAdmin) setColumns(OAAColumns);

        } else {
            // if (userRole == Role.Trader) setColumns(TRColumns);
            // if (userRole == Role.Officer || userRole === Role.IPOfficer) setColumns(OFColumns);
            // if (userRole == Role.DeputyDirector || userRole === Role.IPDeputyDirector) setColumns(DGColumns);
            if (userRole == Role.OGAAdmin) setColumns(OAAColumns);
        }
    }, []);

    //Get and set localStorage data
    useEffect(() => {
        const gridData = fetchGridDataFunc();
        let data: any = { agencyId };
        setLocalStorageData({ ...localStorageData, ...data, ...gridData });
        dispatch(getTreatmentProvider([]));
        return () => {
            clearGridComponent();
        };
    }, []);
    

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <SweetAlert title={sweetAlertTitle} show={show} info={isInfo} onConfirm={sweetAlertOnConfirm}>
                        <label>{message}</label>
                    </SweetAlert>

                    {/* {showTransactionTypeModalImport ? (
                        <SelectRegistrationTypeModal
                            message="Transaction Type Selection"
                            onClickClosed={transactionTypeModalCancelHandler}
                            // onSelectTrader={transactionTypeModalImportHandler}
                        />
                    ) : null} */}

                    <Row className="h-75 mx-0">
                        <Col
                            className="p-0 rounded  grid-col mt-4"
                            xs="12"
                            style={{
                                background: "white",
                                boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.08)"
                            }}>
                            <TabStrip
                                selected={selected}
                                tabPosition={tabPos}
                                animation={false}
                                onSelect={(e: TabStripSelectEventArguments) => {
                                    handleSwitchTabs(e?.selected);
                                    dispatch(updateTabStripAction(e?.selected));
                                }}>
                                <TabStripTab
                                    title={
                                        <GridTitle
                                            content={"Registration"}
                                            count={tpmRegistrationList.length}
                                            isCountHide={tab == Tabs.INQUEUE ? false : true}
                                        />
                                    }
                                    contentClassName="py-0">
                                    <GenericIPGrid
                                        data={tpmRegistrationList ? tpmRegistrationList : []}
                                        OnRowClick={viewTreatmentRegistration}
                                        gridPanel={userRole == Role.OGAAdmin ? GridPanel() : null}
                                        isAmendmentGrid={false}
                                        headerTitle={getHeaderTitle(
                                            userRole == Role.Officer || userRole == Role.OGAAdmin
                                                ? resources_EN.TPM_registration_Grid_heading_officer
                                                : resources_EN.TPM_registration_Grid_heading_trader,
                                            null
                                        )}
                                        columns={columns}
                                        wrapperFunction={wrapperFunction}
                                        searchableColumnsProps={searchableColumns}
                                        onExpandChange={handleExpand}
                                        detail={(event: any) => GenericDetailGrid({ detailWrapperFunction, listData: tpmRegistrationList, columns: TreatmentRegistrationDetailGridColumns, ...event })}//{DetailComponent}
                                    />
                                </TabStripTab>
                                {/* <TabStripTab 
                                    title={
                                        <GridTitle
                                            content={"Amendment Requests"}
                                            count={tpmRegistrationList.length}
                                            isCountHide={tab == Tabs.AMENDMENT ? false : true}
                                        />
                                    }
                                    contentClassName="py-0">
                                    <GenericIPGrid
                                        data={tpmRegistrationList ? tpmRegistrationList : []}
                                        OnRowClick={viewTreatmentAmendment}
                                        isAmendmentGrid={true}
                                        headerTitle={getHeaderTitle(userRole == Role.Officer || userRole == Role.OGAAdmin ? "Amendment Requests": resources_EN.TPM_amendment_requests_Grid_heading, null)}
                                        columns={columns}
                                        wrapperFunction={wrapperFunction}
                                    />
                                </TabStripTab>
                                <TabStripTab 
                                    title={
                                        <GridTitle
                                            content={"Renewal Requests"}
                                            count={tpmRegistrationList.length}
                                            isCountHide={tab == Tabs.RENEWAL ? false : true}
                                        />
                                    }
                                    contentClassName="py-0">
                                    <GenericIPGrid
                                        data={tpmRegistrationList ? tpmRegistrationList : []}
                                        OnRowClick={ViewTreatmentRenewal}
                                        //gridPanel={userRole == Role.Trader ? GridPanel() : null}
                                        isAmendmentGrid={false}
                                        headerTitle={getHeaderTitle(userRole == Role.Officer || userRole == Role.OGAAdmin? "Renewal Requests": resources_EN.TPM_renewal_registration_Grid_heading, null)}
                                        columns={columns}
                                        wrapperFunction={wrapperFunction}
                                    />
                                </TabStripTab> */}
                            </TabStrip>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default Grid;
