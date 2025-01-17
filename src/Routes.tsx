import Config from "Config";
import Auth from "Lib/Net/Auth";
import { setToken } from "Modules/Common/Login/LoginActions";
import { lazy, useEffect } from "react";
import TPMRoutes from "Modules/TPM/TPMRoutes";
import GenerateNonCompliance from "Modules/TPM/GenerateNonCompliance/GenerateNonCompliance";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { RootStore } from "Store";

//Import Components
const ReloadRoute = lazy(() => import("Modules/Common/ReloadRoute"));
const CommonRoutes = lazy(() => import("Modules/TPM/Common/CommonRoutes"));
const TPMDashboard = lazy(() => import("Modules/TPM/TPMDashboard/TPMDashboard"));
const Routes = (props: any) => {
    const { path } = props;
    const dispatch = useDispatch();
    const storeToken = useSelector((state: RootStore) => state.loginReducer.token) || undefined;

    useEffect(() => {
        let token: any = Auth.getToken();
        if (token && !storeToken) dispatch(setToken(token));
    }, []);
    
   console.log("path --->",path, window.location.pathname);
   console.log("Base URL",Config.baseURL);
   
//    useEffect(() => {
//     if(window.location.pathname.includes('tpm')){
//         window.location.reload();
//     }
//    },[]);
   console.log('window common routes: ',window.location.pathname);
   
    return (
        <>
            <Switch>
                <Route path={`${path}tpm/common`} component={TPMRoutes} />
                <Route path={`${path}tpm`} component={TPMDashboard} />
                <Route path={`${path}`} component={CommonRoutes} />
                <Route path={`/`}  component={ReloadRoute} />
            </Switch>
        </>
    );
};

export default Routes;
