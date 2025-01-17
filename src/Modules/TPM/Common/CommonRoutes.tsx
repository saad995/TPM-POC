import { lazy, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";

//Import Components
import PublicRoutes from "Elements/Basic/PublicRoutes/PublicRoutes";
// import DashboardRoutes from "Modules/Common/Dashboard/DashboardRoutes";
import AppDashboard from "Modules/Common/Dashboard/AppDashboard/AppDashboard";
import Login from "Modules/Common/Login/Login";
import ExportPdf from "./ExportPdf/ExportPdf";

const CommonRoutes = (props: any) => {
    const { path } = props.match;   
    console.log('path: ----->',path);

    useEffect(() => {
        if(!window.location.pathname.includes('tpm')){
            if(!window.location.hostname.includes('localhost')){
                window.location.reload();
           }
        }
       },[]);
       console.log("Common Routes", path, window.location.pathname);
    return (
        <>
            <Switch>
                <PublicRoutes path={"/"} exact component={Login} />
                <PublicRoutes path={"/login"} exact component={Login} />
                <Route path={`${path}`} component={AppDashboard} />
            </Switch>
        </>
    );
};

export default CommonRoutes;
