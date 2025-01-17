import React from "react";
import { GuardProvider } from "react-router-guards";
import NotFound from "Modules/Common/NotFound/NotFound";
import Loader from "Elements/Basic/Loader/Loader";

const DashboardRoutes = (props: any) => {
    const { requireLogin } = props;
    return (
        <GuardProvider
            guards={[requireLogin]}
            loading={Loader}
            error={NotFound}>
            {props.children}
        </GuardProvider>
    );
};

export default DashboardRoutes;
