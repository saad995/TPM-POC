import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

//Import Components
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ErrorBoundary from "Elements/Basic/ErrorBoundary/ErrorBoundary";
import AppLayout from "Layouts/AppLayout/AppLayout";
import View from "Modules/TPM/TreatmentCertificate/GeneralView/View/View";

//Import Components
import Home from "Modules/Common/Home/Home";

//Import Actions
import TreatmentCertificates from "../TreatmentCertificate/TreatmentCertificates";
import PendingTreatmentRequestView from "../TreatmentCertificate/PendingTreatmentRequestList/View/PendingTreatmentRequestView";
import InitiateTreatmentRequest from "../TreatmentCertificate/InitiateTreatmentRequest/InitiateTreatmentRequest";
import TPMPlaceholder from "../TPMPlaceholder/TPMPlaceholder";
import PrivateRoute from "Elements/Basic/PrivateRoutes/PrivateRoutes";
import SubMenuRenderer from "../TPMPlaceholder/SubMenuRenderer";
import PublicRoute from "Elements/Basic/PublicRoutes/PublicRoutes";
import ExportPdf from "../Common/ExportPdf/ExportPdf";
import ExportPdfTpm from "../Common/ExportPdfTpm/ExportPdfTpm";
import Registration from "./Registration/Registration";
import CreateEditTPMRegistration from "./Registration/CreateEditTPMRegistration/CreateEditTPRegistration";
import { IGetDashboardInfoResponseData } from "Layouts/AppLayout/AppLayoutInterfaces";
import { RootStore } from "Store";
import { UserRole } from "Modules/Common/Constants/Types/UserRole";
import RegistrationView from "Modules/TPM/TPMDashboard/Registration/View/View";
import RegistrationItemView from "Modules/TPM/TPMDashboard/Registration/View/ViewTreatmentTypeItem";
import RenewalTreatmentType from "./Registration/Renewal/RenewalTreatmentType";
import AmendmentTreatmentType from "./Registration/AmendmentTreatmentType/AmendmentTreatmentType";
import GenerateNonCompliance from "../GenerateNonCompliance/GenerateNonCompliance";

//Import Styles

//Import Constants

const TPMDashboard = (props: any) => {
    const { path } = props.match;
    const dispatch = useDispatch();
    library.add(fas);
    // * Get Dashboard info Data From Store
    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );
    // ! End of Get Dashboard info Data From Store
    const [isMenuFetched, setIsMenuFetched] = useState(false);

    if (!isMenuFetched) {
        setIsMenuFetched(true);
    }
    // useEffect(() => {
    //     if(window.location.pathname.includes('tpm')){
    //          window.location.reload();
    //     }
    //    },[]);
    console.log("TPM Dashboard path ====>>>>>", path, window.location.pathname);
    return (
        <ErrorBoundary>
  
            <AppLayout>
                <Switch>
                    <PublicRoute path={`${path}/export/download/:id+`} component={ExportPdfTpm} />
                    <PrivateRoute path={`${path}/generateNonCompliance`} component={GenerateNonCompliance} />
                    <PrivateRoute path={`${path}/valueaddedservice`} component={SubMenuRenderer} />
                    {/* <Route path={`${path}`} exact component={Home} /> */}
                    {
                        (dashboardInfo?.currentRole == UserRole.Trader || dashboardInfo?.currentRole === UserRole.CustomAgent) &&
                        <PrivateRoute
                            path={`${path}/treatmentcertificates/initiatetreatmentrequest`}
                            component={InitiateTreatmentRequest}
                            roles={[UserRole.Trader, UserRole.CustomAgent]}
                        />
                    }
                    <PrivateRoute path={`${path}/treatmentcertificates/view/:id`} component={PendingTreatmentRequestView} />
                    <PrivateRoute path={`${path}/treatmentcertificates/view`} component={PendingTreatmentRequestView} />
                    <PrivateRoute path={`${path}/treatmentcertificates`} component={TreatmentCertificates} />
                    <PrivateRoute path={`${path}/registration/viewItem`} component={RegistrationItemView} />
                    <PrivateRoute path={`${path}/registration/view`} component={RegistrationView} roles={[UserRole.OGAApplicationAdmin, UserRole.TreatmentProvider]}/>
                    <PrivateRoute path={`${path}/registration/create`} component={CreateEditTPMRegistration} roles={[UserRole.OGAApplicationAdmin]}/>
                    <PrivateRoute path={`${path}/registration/amendment`} component={AmendmentTreatmentType}   roles={[UserRole.OGAApplicationAdmin]} />
                    <PrivateRoute path={`${path}/registration/renewal`} component={RenewalTreatmentType}   roles={[UserRole.OGAApplicationAdmin]} />
                    <PrivateRoute path={`${path}/registration/edit`} component={CreateEditTPMRegistration} roles={[UserRole.OGAApplicationAdmin]}/>
                    <PrivateRoute path={`${path}/registration`} component={Registration} roles={[UserRole.OGAApplicationAdmin]}/>
                    <PrivateRoute path={`${path}`} component={TPMPlaceholder} />
                    {/* <Route path={`${path}weboc`} exact component={Home} /> */}
                </Switch>
            </AppLayout>
        </ErrorBoundary>
    );
};

export default TPMDashboard;
