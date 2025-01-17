import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import Components
import { Container } from "react-bootstrap";

//Import Styles
import styles from "../../TPM/TreatmentCertificate/GeneralView/View/View.module.scss";
import "./TreatmentCertificate.scss";

//Import Actions

//Import Constants
import { faFile, faFileInvoice, faPager } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { IGetDashboardInfoResponseData } from "Layouts/AppLayout/AppLayoutInterfaces";
import { roleBasedTabName, treatmentRequestsStatus } from "Modules/Common/CommonUtility";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import { RootStore } from "Store";
import IssueTreatmentCertificateList from "./IssueTreatmentCertificateList/IssueTreatmentCertificateList";
import PendingTreatmentRequestList from "./PendingTreatmentRequestList/PendingTreatmentRequestList";
import ResindedTreatmentCertificateList from "./ResindedTreatmentCertificateList/ResindedTreatmentCertificateList";
import { getIssueTreatmentCertificateData, getTreatmentRequestList } from "./TreatmentCertificatesActions";
import TreatmentUnderProcess from "./TreatmentUnderProcess/TreatmentUnderProcess";
import TreatmentRequestByOfficer from "./TreatmentRequestByOfficer/TreatmentRequestByOfficer";

const TreatmentCertificates = (props: any) => {
    const dispatch = useDispatch();
    

    /**
     * * Redux States
     */
    // * Get Dashboard info Data From Store
    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );
    // *Get Treatment List Data From Store
    const demoRole: any = useSelector(
        (state: RootStore) => state.TreatmentCertificatesReducer.demoRole
    );
    // *Get Treatment List Data From Store
    const getTreatmentListData: any = useSelector(
        (state: RootStore) => state.TreatmentCertificatesReducer.treatmentRequestsList
    );
    // *Get Treatment List Loader Data From Store
    const isPendingListLoader: any = useSelector(
        (state: RootStore) => state.TreatmentCertificatesReducer.isLoadingPendingList
    );
    // *Get IO Right Data  Data From Store
    const getIORightsData: any = useSelector(
        (state: RootStore) => state.TreatmentCertificatesReducer?.ioRightsData
    );
    // *Get Issue Treatment Certificate List Data From Store
    const getIssueTreatmentCertificate: any = useSelector(
        (state: RootStore) => state?.TreatmentCertificatesReducer?.issueTreatmentCertificateData
    );
    // *Get Default selected tab From Store
    const getDefaultSelectedTab: any = useSelector(
        (state: RootStore) => state?.TreatmentCertificatesReducer?.selectedTab
    );
    // *Get Loading State From Store
    const isLoading: any = useSelector((state: RootStore) => state.TreatmentCertificatesReducer.loading);

    // ! End of Redux States

    // useEffect(() => {
    //     if (dashboardInfo?.currentRole == UserRole.InspectionOfficer) {
    //         getIssueTreatmentCertificateData({
    //             roleCode: dashboardInfo.currentRole,
    //             rights: getIORightsData,
    //             documentClassificationCode: "TPM",
    //         })
    //     }
    // }, [getIORightsData])

    useEffect(() => {
        let title = "Treatment Certificates";
        if (dashboardInfo.currentRole == UserRole.Trader || dashboardInfo.currentRole == UserRole.TreatmentProvider || dashboardInfo.currentRole === UserRole.CustomAgent) {
            dispatch(
                getTreatmentRequestList({
                    roleCode: dashboardInfo.currentRole,
                    rights: "",
                    documentClassificationCode: "TPM",
                    childUserRoleIds: dashboardInfo?.childUserRoleIds
                })
            );
        }
        // if (dashboardInfo.currentRole == UserRole.InspectionOfficer) {
        //     if(getIORightsData != ""){
        //         dispatch(getIssueTreatmentCertificateData({
        //             roleCode: dashboardInfo.currentRole,
        //             rights: getIORightsData || "",
        //             documentClassificationCode: "TPM",
        //         }))
        //     }
        // }
        if (dashboardInfo.currentRole == UserRole.Trader || dashboardInfo.currentRole == UserRole.TreatmentProvider || dashboardInfo.currentRole === UserRole.CustomAgent) {
            dispatch(getIssueTreatmentCertificateData({
                roleCode: dashboardInfo.currentRole,
                rights: "",
                documentClassificationCode: "TPM",
                childUserRoleIds: dashboardInfo?.childUserRoleIds
            }))
        }
        dispatch(setPageTitleAction(title));
    }, [dashboardInfo, getIORightsData]);


    useEffect(() => {
        if (getDefaultSelectedTab) {
            setSelected(getDefaultSelectedTab)
        }
    }, [getDefaultSelectedTab])

    // * states for tab managment
    const [selected, setSelected] = React.useState<number>(0);

    const handleSelect = (e: any) => {
        setSelected(e.selected);
    };

    return (
        <>
            <>
                <div className="pl-3 pr-3">
                    {(UserRole.Trader == dashboardInfo?.currentRole || UserRole.CustomAgent === dashboardInfo?.currentRole ) && <div className="d-flex justify-content-end">
                        <button
                            onClick={() =>
                                props.history.push("/TPM/TreatmentCertificates/initiateTreatmentRequest")
                            }
                            className={styles.floatingBtnPrimary}>
                            <FontAwesomeIcon icon={faFileInvoice} className={"my-1 mr-2"} />
                            <span>Initiate Treatment Request</span>
                        </button>
                    </div>}
                    <Container className="px-3 custom-container" fluid>
                        {dashboardInfo?.currentRole == UserRole.InspectionOfficer && <>
                         <br />   
                            <TabStrip
                                selected={selected}
                                onSelect={handleSelect}
                                animation={false}
                                className="custom-container"
                                tabPosition="top">

                                <TabStripTab title={roleBasedTabName(dashboardInfo.currentRole, 1)}>
                                    <PendingTreatmentRequestList isPendingListLoader={isPendingListLoader} isLoading={isLoading} data={getIssueTreatmentCertificate} {...props} />
                                </TabStripTab>
                                <TabStripTab title={roleBasedTabName(dashboardInfo.currentRole, 2)}>
                                    <TreatmentUnderProcess isPendingListLoader={isPendingListLoader} isLoading={isLoading} data={getIssueTreatmentCertificate} {...props} />
                                </TabStripTab>

                            </TabStrip>
                            </>
                        }
                        {(dashboardInfo?.currentRole == UserRole.Trader || dashboardInfo?.currentRole == UserRole.CustomAgent) &&
                            <TabStrip
                                selected={selected}
                                onSelect={handleSelect}
                                animation={false}
                                className="custom-container"
                                tabPosition="top">

                                <TabStripTab title={roleBasedTabName(dashboardInfo.currentRole, 11)}>
                                    <TreatmentRequestByOfficer isPendingListLoader={isPendingListLoader} listStatus={treatmentRequestsStatus.TREATMENTREQUESTED} isLoading={isLoading} data={getTreatmentListData} {...props} />
                                </TabStripTab>
                                <TabStripTab title={roleBasedTabName(dashboardInfo.currentRole, 1)}>
                                    <PendingTreatmentRequestList isPendingListLoader={isPendingListLoader} isLoading={isLoading} data={getTreatmentListData} {...props} />
                                </TabStripTab>
                                <TabStripTab title={roleBasedTabName(dashboardInfo.currentRole, 2)}>
                                    <TreatmentUnderProcess isPendingListLoader={isPendingListLoader} isLoading={isLoading} data={getTreatmentListData} {...props} />
                                </TabStripTab>
                                <TabStripTab title="Issued Treatment Certificates">
                                    <IssueTreatmentCertificateList isPendingListLoader={isPendingListLoader} isLoading={isLoading} data={getIssueTreatmentCertificate} {...props} />
                                </TabStripTab>
                                <TabStripTab title="Rejected Treatment Requests">
                                    <ResindedTreatmentCertificateList isPendingListLoader={isPendingListLoader} isLoading={isLoading} data={getTreatmentListData} {...props} />
                                </TabStripTab>
                            </TabStrip>
                        }
                         
                        { dashboardInfo?.currentRole == UserRole.TreatmentProvider  && <>
                            <br />   
                            <TabStrip
                                selected={selected}
                                onSelect={handleSelect}
                                animation={false}
                                className="custom-container"
                                tabPosition="top">
                                <TabStripTab title="Pending Treatment Requests">
                                    <PendingTreatmentRequestList isPendingListLoader={isPendingListLoader} roleCode={dashboardInfo?.currentRole} isLoading={isLoading} data={getTreatmentListData} {...props} />
                                </TabStripTab>
                                <TabStripTab title="Treatment Under Process">
                                    <TreatmentUnderProcess isPendingListLoader={isPendingListLoader} roleCode={dashboardInfo?.currentRole} isLoading={isLoading} data={getTreatmentListData} {...props} />
                                </TabStripTab>
                                <TabStripTab title="Issued Treatment Certificates">
                                    {/* <IssueTreatmentCertificateList roleCode={dashboardInfo?.currentRole} isLoading={isLoading} data={getIssueTreatmentCertificate} {...props} /> */} 
                                    <IssueTreatmentCertificateList isPendingListLoader={isPendingListLoader} roleCode={dashboardInfo?.currentRole} isLoading={isLoading} data={getIssueTreatmentCertificate} {...props} /> 
                                </TabStripTab>
                                <TabStripTab title={"Rescinded Treatment Certificate"}>
                                    <ResindedTreatmentCertificateList isPendingListLoader={isPendingListLoader} roleCode={dashboardInfo?.currentRole} isLoading={isLoading} data={getIssueTreatmentCertificate} {...props} />
                                </TabStripTab>
                            </TabStrip>
                        </>
                        }
                    </Container>
                </div>
            </>
        </>
    );
};

export default TreatmentCertificates;
