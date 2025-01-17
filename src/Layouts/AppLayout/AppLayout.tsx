import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import history from "Lib/Helpers/History";

import { Container, Row, Col } from "react-bootstrap";

//Import Constants
import { IDashboardMenu, IUserMenu, ITokenExpiry } from "./AppLayoutInterfaces";
import { RootStore } from "Store";
//Import Components
import Header from "./Header/Header";

import ErrorBoundary from "Elements/Basic/ErrorBoundary/ErrorBoundary";
import SideMenu from "./SideMenu/SideMenu";
import Breadcrumbs from "Elements/Basic/Breadcrumbs/Breadcrumbs";
import {
    clearReducerState,
    getDashboardInfoAction,
    getWebocSessionAction
} from "./AppLayoutActions";
import Auth from "Lib/Net/Auth";
import GuardRoute from "Elements/Basic/GuardRoutes/GuardRoutes";
import Style from "./AppLayout.module.scss";
import { breadCrumbConfig } from "Elements/Basic/Breadcrumbs/BreadCrumbConfig";
import jwtDecode from "jwt-decode";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

import { resources_EN } from "Modules/Common/Constants/Resources/Resources_EN";
import { Alert } from "react-bootstrap";

const AppLayout = (props: any) => {


    const [isActiveDialogBox, setIsActiveDialogBox] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const [routeConfig, setRouteConfig] = useState([]);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    // Pulling data from Store
    const dashboardMenu: IDashboardMenu = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardMenu
    );
    const userMenu: IUserMenu[] = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo.menus
    );
    const pageTitle: string = useSelector(
        (state: RootStore) => state.dashboardReducer.pageTitle
    );
    const userRole: string = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo.currentRole ?? ""
    );

    const buildRouteConfig = (userMenus: IUserMenu[]): any => {
        const routeConfig: any = [
            {
                path: "/weboc",
                breadcrumb: null
            },
            {
                path: "/AD",
                breadcrumb: null
            }
        ];

        userMenus.forEach((menu) => {
            const route: any = {
                path:
                    menu.Weboc_Left_Menu_ID === null
                        ? menu.Url === "/AD"
                            ? `/AD/${menu.ID}`
                            : menu.Url
                        : `/weboc/${menu.ID}`,
                breadcrumb: menu.DisplayText
            };
            routeConfig.push(route);

            if (menu.SubMenus !== null) {
                menu.SubMenus?.forEach((subMenu) => {
                    const route: any = {
                        path:
                            menu.Weboc_Left_Menu_ID === null
                                ? menu.Url === "/AD"
                                    ? "/AD/" +
                                    subMenu.ParentMenuID +
                                    subMenu.Url
                                    : `/AD/${menu.ID}`
                                : `/weboc/${menu.ID}/${subMenu.ID}`,
                        breadcrumb: subMenu.DisplayText
                    };
                    routeConfig.push(route);
                });
            }
        });

        breadCrumbConfig.forEach((routeCustom: any) => {
            routeConfig.push(routeCustom);
        });

        setRouteConfig(routeConfig);
    };

    function canAccessMenu(to: any): [boolean, boolean | null] {
        let canAccessMenuCheck = false;
        let verificationFlagCheck = null;

        const menu = _.filter(dashboardMenu.menu, function (o) {
            return o.Url == to.location.pathname;
        });

        if (!_.isNil(menu) && !_.isEmpty(menu)) {
            canAccessMenuCheck = true;
            const verificationFlagFromToken = Auth.getVerificationFlag();
            const reqVerificationFlag = menu[0].RequiredVerificationFlag;

            if (!_.isNil(reqVerificationFlag)) {
                verificationFlagCheck = (verificationFlagFromToken & reqVerificationFlag) != 0;
                //verificationFlagCheck = reqVerificationFlag === verificationFlagFromToken;
            }
        }

        return [canAccessMenuCheck, verificationFlagCheck];
    }

    const requireLogin = (to: any, from: any, next: any) => {
        let [canAccessMenuCheck, verificationFlagCheck]: [boolean, boolean | null] = [false, null];

        if (to.meta.auth) {
            [canAccessMenuCheck, verificationFlagCheck] = canAccessMenu(to);
            if (canAccessMenuCheck) {
                next();
            }
            next.redirect("/login");
        } else if (to.meta.sd) {
            [canAccessMenuCheck, verificationFlagCheck] = canAccessMenu(from);

            if (!canAccessMenuCheck || verificationFlagCheck === false) {
                [canAccessMenuCheck, verificationFlagCheck] = canAccessMenu(to);

                if (!canAccessMenuCheck || verificationFlagCheck === false) {
                    next.redirect("/");
                }
            }
        }

        next();
    };

    // User logout Func

    useEffect(() => {
        if (Auth.getWebocSessionId() === "" || Auth.getWebocSessionId() === undefined) {
            dispatch(getDashboardInfoAction(() => dispatch(getWebocSessionAction())));
        }
        else
            dispatch(getDashboardInfoAction(() => 0));

        // logic to clear redux state on page refresh
        window.onbeforeunload = function () {
            dispatch(clearReducerState());
        };
    }, []);

    useEffect(() => {
        buildRouteConfig(userMenu);
    }, [userMenu]);




    // checking token expiry
    // Todo 
    // const chkTokenExpiry = (token: string) => {
    //     if (token && jwtDecode<ITokenExpiry>(token).exp < Date.now() / 1000) {
    //         setIsTokenExpired(true);
    //         return true;
    //     }
    //     return false;
    // }


    const reducerToken =
        useSelector((state: RootStore) => state.loginReducer.token);

    const isActiveInterval =
        useSelector((state: RootStore) => state.loginReducer.isActive);

    const isUnavailable: boolean = useSelector((state: RootStore) => state.dashboardReducer.dashboardInfo.isUnavailable);

    let promise = Promise.resolve(true);

    function isTokenMatchedWithReducerTokenFunc (token: string) {
        return !token && !reducerToken ? false : token !== reducerToken && !reducerToken ? true : token ? true : false
    }

    function checkTokeIfIntervalIsActive() {
        if (!isActiveInterval) return

        let token: any = Auth.getToken();
        // Todo : Check expiry 
        // let isTokenExpired = chkTokenExpiry(token);
        let isTokenExpired = false;
        token = isTokenExpired ? null : token;
        let isTokenMatchedWithReducerToken = false;
        let msg = '';
        let isLocalStorageTokenChanged = token && reducerToken && token !== reducerToken ? true : false;
        if (!isLocalStorageTokenChanged) {
            isTokenMatchedWithReducerToken = isTokenMatchedWithReducerTokenFunc(token);
        }
        if (!isTokenMatchedWithReducerToken) {  // token is not matched with reducer token or either be null
            msg = 'You are signed out from previous session, Click OK to proceed';
            if (!isLocalStorageTokenChanged) {  // user is logged out
                msg = isTokenExpired ? 'Token has expired, Do You want to refresh the token ?' : 'You are signed out, Please login again';  // logout from another tab
            }
            promise = promise.then(() => {
                return new Promise((resolve) => {
                    setMessage(msg);
                    setIsActiveDialogBox(true);
                });
            })
        }
    }

    useEffect(() => {
        // handling try to login or sign out from multi tab logic
        const interval = setInterval(checkTokeIfIntervalIsActive, 3000);

        return () => clearInterval(interval);
    }, [isActiveInterval, reducerToken])


    //onClick OK button
    const getConfirm = (val: boolean) => {
        setIsActiveDialogBox(false);
        history.push("/app");
        window.location.reload();
    };

    const getRefreshToken = (val: boolean) => {
        // let token: any = Auth.getToken();
        // let res = tokenIntrospectRequest(token);
        // if (!res.active) {
        //     Auth.Logout();
        // }
        Auth.tokenRefresh(dispatch);
        setIsActiveDialogBox(false);
        history.push("/app");
        window.location.reload();
    };

    const DialogBox = (msg: any) => {
        return (
            <Dialog
                closeIcon={false}
                title={"Warning !"}
                className=''
            >
                <p style={{ margin: "25px", textAlign: "center" }}>
                    {msg}
                </p>
                <DialogActionsBar >

                    <button
                        className={Style.CancelButton}
                        onClick={() => getConfirm(true)}>
                        {isTokenExpired ? 'Cancel' : 'OK'}
                    </button>
                    {isTokenExpired && <button
                        className={Style.OkButton}
                        onClick={() => getRefreshToken(true)}>
                        Yes
                    </button>}
                </DialogActionsBar>
            </Dialog>
        );
    }

    return (
        <ErrorBoundary>
            <div className={Style.layout}>
                {isActiveDialogBox && DialogBox(message)}
                <Header />
                <SideMenu menu={[...dashboardMenu?.sideMenu]} />
                <Container
                    className="bg-default"
                    style={{
                        backgroundColor: "#F5F7FB",
                        gridArea: "breadcrumb"
                    }}
                    fluid>
                    <Row
                        className="justify-content-between py-2"
                        style={{ background: "white" }}>
                        <Col xs="auto" className="align-self-center">
                            <Row className="no-gutters">
                                <Col>
                                    <p style={{ letterSpacing: "0.015rem" }} className="base-lg font-semibold">{pageTitle}</p>
                                    <Breadcrumbs routeConfig={routeConfig} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <Container
                    className="px-0 bg-default"
                    style={{
                        backgroundColor: "#f5f7fb",
                        gridArea: "main"
                        // TODO : NEED TO HANDLE OVERFLOW ISSUE WITHIN IFRAME COMPONENTS
                        // overflow: "auto"
                    }}
                    fluid>
                    {isUnavailable && (
                        <Alert
                            className="my-2 sub-info-alert py-1 text-center "
                            variant={"warning"}
                            style={{ whiteSpace: "pre-wrap" }}>
                            <div>
                                {resources_EN.userStatusUnavailable}
                                {' '}
                                <a className="text-info" href="/app/UMS/MyProfile">
                                    <span>{"Change Status"}</span>
                                </a>
                            </div>
                        </Alert>
                    )}
                    <GuardRoute requireLogin={requireLogin}>{props.children}</GuardRoute>
                </Container>
            </div>
        </ErrorBoundary>
    );
};
export default AppLayout;