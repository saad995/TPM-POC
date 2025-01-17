import React, { useEffect, useState, lazy } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

//Import Components
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import ErrorBoundary from "Elements/Basic/ErrorBoundary/ErrorBoundary";
import AppLayout from "Layouts/AppLayout/AppLayout";

//Import Components
import Home from "Modules/Common/Home/Home";

//Import Actions
import { clearReducerState } from "Layouts/AppLayout/AppLayoutActions";

//Import Styles
import "./AppDashboard.scss";

//Import Constants
import { IDashboardMenu } from "Layouts/AppLayout/AppLayoutInterfaces";
import { RootStore } from "Store";

import { GuardedRoute } from "react-router-guards";
import Logger from "Lib/Helpers/Logger";
import PrivateRoute from "Elements/Basic/PrivateRoutes/PrivateRoutes";
import { Role } from "Lib/Types/SharedTypes";

const AppDashboard = (props: any) => {
    const { path } = props.match;
    const dispatch = useDispatch();
    library.add(fas);

    const [isMenuFetched, setIsMenuFetched] = useState(false);

    if (!isMenuFetched) {
        setIsMenuFetched(true);
    }

    //User logout Func
    useEffect(() => {
        // logic to clear redux state on page refresh
        window.onbeforeunload = function () {
            dispatch(clearReducerState());
        };
    }, []);

    const dashboardMenu: IDashboardMenu = useSelector((state: RootStore) => state.dashboardReducer.dashboardMenu);
    return (
        <ErrorBoundary>
            <AppLayout>
                <Switch>
                    <Route path={`${path}Dashboard`} exact component={Home} />
                    <Route path={`${path}weboc`} exact component={Home} />
                    
                </Switch>
            </AppLayout>
        </ErrorBoundary>
    );
};

export default AppDashboard;
