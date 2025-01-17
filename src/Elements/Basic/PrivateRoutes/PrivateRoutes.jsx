import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "Lib/Net/Auth";
import { useSelector } from "react-redux";
import isFormPermitted from "Modules/Common/Helpers/FormPermissionHelper";
import Unauthorized from "Modules/Common/Unauthorized/Unauthorized";

const PrivateRoute = ({ component: Component, roles = null, formCode = null, ...rest }) => {
    const isAuthenticated = Auth.CurrentUser().IsAuthenticated;

    const userRole = useSelector((state) =>
        state.dashboardReducer.currentUserRole != undefined
            ? state.dashboardReducer.currentUserRole.Code
            : state.dashboardReducer.dashboardInfo.currentRole
    );


    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isAuthenticated) {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    );
                }

                // check if route is restricted by role
                if (roles && roles.indexOf(userRole) === -1 && userRole != "") {
                    // role not authorised so redirect to home page
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    );
                }

                if (formCode && !isFormPermitted(formCode, false)) {
                    // role not authorised so redirect to home page
                    return <Unauthorized />;
                }

                if (rest.meta?.sd) {
                    if (!rest.location?.state?.isFromSDScreen) {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: { from: props.location }
                                }}
                            />
                        );
                    }
                }

                // authorised so return component
                return <Component {...props} />;
            }}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    location: PropTypes.object
};

// export const PrivateApprovalRoute = ({ component: Component, ...rest }) => {
//     const isAuthenticated = Auth.CurrentUser().IsAuthenticated;
//     return (
//         <Route
//             {...rest}
//             render={(props) => {
//                 if (isAuthenticated) {
//                     if (userRole == Role.DeputyDirector) {
//                         return <Component {...props} />;
//                     } else {
//                         <Redirect
//                             to={{
//                                 pathname: "/",
//                                 state: { from: props.location }
//                             }}
//                         />;
//                     }
//                 }
//             }}
//         />
//     );
// };
// PrivateApprovalRoute.propTypes = {
//     component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
//     location: PropTypes.object
// };
export default PrivateRoute;
