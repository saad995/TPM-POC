import React, { lazy, useEffect } from "react";
import { Switch, Route, Redirect, useHistory, useLocation } from "react-router-dom";

const ReloadRoute = (props: any) => {
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
            history.push( location.pathname);
            window.location.reload();
    }, [location.pathname]);
    console.log("Reload Route Props: ",props);
    console.log("Reload Route Props History: ",history);
    console.log("Reload Route Props Location: ",location);

    return <></>;
};

export default ReloadRoute;
