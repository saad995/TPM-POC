import { useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";

//Import Components
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ErrorBoundary from "Elements/Basic/ErrorBoundary/ErrorBoundary";

//Import Components

//Import Actions
import PrivateRoute from "Elements/Basic/PrivateRoutes/PrivateRoutes";
import TreatmentCertificateIndependentView from "./Common/IndependentViews/TreatmentCertificate/View";

//Import Styles

//Import Constants

const TPMRoutes = (props: any) => {
    const { path } = props.match;
    const dispatch = useDispatch();
    library.add(fas);

    const [isMenuFetched, setIsMenuFetched] = useState(false);

    if (!isMenuFetched) {
        setIsMenuFetched(true);
    }
    // useEffect(() => {
    //     if(window.location.pathname.includes('tpm')){
    //          window.location.reload();
    //     }
    //    },[]);
    console.log("TPM Routes Dashboard path ====>>>>>", path, window.location.pathname);
    return (
        <ErrorBoundary>
            <Switch>
                <PrivateRoute exact path={`${path}/treatmentcertificates/view/:id`} component={TreatmentCertificateIndependentView} />
            </Switch>
        </ErrorBoundary>
    );
};

export default TPMRoutes;
