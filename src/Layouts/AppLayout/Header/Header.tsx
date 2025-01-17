import { faBars, faCog, faEnvelope, faEnvelopeOpenText, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu as SubMenu, MenuItem as SubMenuItem } from "@progress/kendo-react-layout";
import { clearAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import colorCode from "Lib/Helpers/ColorCodeGenerator";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import Auth from "Lib/Net/Auth";
import { IFormPermissionResponse } from "Modules/Common/CommonInterfaces";
import { getTimeAgoMessage } from "Modules/Common/CommonUtility";
import { InboxFolder, InboxMessageStatus } from "Modules/Common/Constants/Inbox";
import { RootStore } from "Store";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLatestMessagesAction, getTopUnreadAlertsAction, switchUserRoleAction } from "../AppLayoutActions";
import {
    IGetDashboardInfoResponseData,
    IGetLatestMessagesRequestData,
    IGetUnreadUserAlertsRequestData,
    IMessage,
    ISwitchUserRoleRequestData, IUserRole
} from "../AppLayoutInterfaces";
import "./Header.scss";
import TopSearch from "./TopSearch/TopSearch";
import { clearDataMasking } from "Modules/Common/DataMasking/DataMaskingAction";

const TopBar = () => {
    const currentUserName = localStorage.getItem("UserName") || "";
    const history = useHistory();
    const dispatch = useDispatch();
    const myProfileUrl = "/UMS/MyProfile/";

    // Variables to handle resize event on button click

    let event: any;
    if (typeof Event === "function") {
        event = new Event("resize");
    } else {
        /*IE*/
        event = document.createEvent("Event");
        event.initEvent("resize", true, true);
    }

    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );

    const userRoleId = localStorage.getItem("LoggedInUserRoleID");

    const latestMessages: IMessage[] = useSelector((state: RootStore) => state.dashboardReducer.latestMessages);

    const count: number = useSelector((state: RootStore) => state.dashboardReducer.count);

    const sidebarCollapse = () => {
        const sidebar = document.getElementById("sidebar-container");

        sidebar?.classList.toggle("sidebar-expanded");
        sidebar?.classList.toggle("sidebar-collapsed");
        // var titles = sidebar?.getElementsByClassName("menu-item-title");
        // if (titles) {
        //     for (let i = 0; i < titles.length; i++) {
        //         titles[i].classList.toggle("d-none");
        //     }
        // }

        sidebar?.addEventListener("transitionend", () => {
            window.dispatchEvent(event);
        });
    };

    const overlayCollapse = () => {
        const sidebar = document.getElementById("overlay-menu-container");

        sidebar?.classList.toggle("overlay-expanded");
        sidebar?.classList.toggle("overlay-collapsed");
    };
    const handleLogout = () => {
        dispatch(clearDataMasking());
        Auth.ClearLocalStorage();
        window.location.href = "/app";
    };

    const navigateToMyProfile = () => {
        history.push(myProfileUrl);
    };

    const showMyProfileMenu = (): boolean => {
        return !_.isNil(dashboardInfo?.agencyId);
    };

    const changePassword = () => {
        const message: any = {
            code: "",
            description: ""
        };
        dispatch(clearAlert(message));
        history.push("/ResetPassword");
    };

    ////////////////alerts and messsages
    const handleAlerts = () => {
        const req: IGetLatestMessagesRequestData = {
            roleCode: dashboardInfo.currentRole,
            inboxFolderId: InboxFolder.Inbox,
            childUserRoleIds: []
        };

        dispatch(getLatestMessagesAction(req));
        const getUnreadUserAlerts: IGetUnreadUserAlertsRequestData = {
            userName: currentUserName
        };
        dispatch(getTopUnreadAlertsAction(getUnreadUserAlerts));
    };
    ////////////////

    ////////////////switch roles
    const handleRoleMenuChange = (e: any) => {
        const switchRoleRequest: ISwitchUserRoleRequestData = {
            roleCode: e.item.data.Code
        };

        const nextRole: IUserRole = {
            Name: e.item.data.Code,
            Code: e.item.data.Code
        };
        dispatch(switchUserRoleAction(switchRoleRequest, nextRole));
        history.push("/");
    };

    const roles: IUserRole[] = useSelector((state: RootStore) => state.dashboardReducer.dashboardInfo.roles);

    ////////////////

    const getRoleTogglerTooltip = (): string | undefined => {
        return dashboardInfo.currentRole === "UN" ? "" : "Logged in as " + dashboardInfo.currentRoleName;
    };

    const sendToInboxMessage = (value: IMessage) => {
        history.push(`/ANS/Inbox/${value.traderInboxId}`);
        return window.location.reload();
    };

    const sendToInbox = () => {
        history.push(`/ANS/Inbox`);
    };

    useEffect(() => {
        getNotificationData();
    }, [dashboardInfo]);

    const getNotificationData = () => {
        if (dashboardInfo.formPermission.find((item: IFormPermissionResponse) => item.code === "INBOX")) {
            const req: IGetLatestMessagesRequestData = {
                roleCode: dashboardInfo.currentRole,
                inboxFolderId: InboxFolder.Inbox,
                childUserRoleIds: []
            };

            dispatch(getLatestMessagesAction(req));
        }
    };

    const [retryConnection, setRetryConnection] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState("Connecting..");


    useEffect(() => {
        window.onload = (event) => {
            const reqCount: IGetLatestMessagesRequestData = {
                roleCode: Auth.getCurrentUserRoleCode(),
                inboxFolderId: InboxFolder.Inbox,
                childUserRoleIds: []
            };
            dispatch(getLatestMessagesAction(reqCount));
        };
    }, []);


    return (
        <>
            <Container
                id="topBarContainer"
                className="topbar-cont position-relative hideCloseIcon"
                style={{
                    backgroundColor: "#F5F7FB",
                    gridArea: "header",
                    zIndex: 3
                }}
                fluid>
                <Row className="bg-secondary">
                    <Col xs="auto" className="align-self-center py-2" style={{ paddingLeft: "8px" }}>
                        <Button
                            onClick={overlayCollapse}
                            data-toggle="sidebar-colapse"
                            className="d-block d-md-none"
                            size="sm">
                            <span>
                                <FontAwesomeIcon icon={faBars} />
                            </span>
                        </Button>

                        <Button
                            onClick={sidebarCollapse}
                            data-toggle="sidebar-colapse"
                            className="d-none d-md-block"
                            size="sm">
                            <span>
                                <FontAwesomeIcon icon={faBars} />
                            </span>
                        </Button>
                    </Col>
                    <Col>
                        <Row className="justify-content-between align-items-center">
                            <Col className="py-1">
                                <TopSearch></TopSearch>
                            </Col>
                            <Col xs="auto" className="py-0 pl-0 border-left" style={{ paddingRight: "0" }}>
                                <div className="d-flex justify-content-end">
                                    {!_.isEmpty(dashboardInfo.subscriptionType) && (
                                        <div
                                            className="bg-light border-left border-right d-flex px-2"
                                            title="Token Balance">
                                            <p className="align-self-center">
                                                <ImportSVG
                                                    name="tokenBalance"
                                                    size={18}
                                                    color={"black"}
                                                    // hoverClassName="mr-1 mb-1"
                                                />
                                                {dashboardInfo.tokenBalance}
                                            </p>
                                        </div>
                                    )}
                                    {/* {isConnected ? (
                                        <button onClick={() => sendMessageToSpecificClient("Hello SignalR World")}>
                                            Send message
                                        </button>
                                    ) : (
                                        <div>{connectionStatus}</div>
                                    )} */}
                                    {dashboardInfo.formPermission.find(
                                        (item: IFormPermissionResponse) => item.code === "INBOX"
                                    ) ? (
                                        <Dropdown className="border-right" onClick={handleAlerts}>
                                            <Dropdown.Toggle
                                                variant="flat"
                                                className="menu-toggle pr-2 bg-light rounded-0"
                                                eventKey="1"
                                                style={{ padding: "0.93rem" }}
                                                id="dropdown-alerts">
                                                <span className="fa-layers fa-fw">
                                                    <FontAwesomeIcon
                                                        className="mr-1"
                                                        style={{ fontSize: "14px" }}
                                                        icon={faEnvelope}
                                                    />
                                                    {count > 0 ? (
                                                        <span
                                                            className="fa-layers-counter"
                                                            style={{ background: "Tomato" }}>
                                                            {count}
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )}
                                                </span>
                                            </Dropdown.Toggle>

                                            {latestMessages && latestMessages.length > 0 ? (
                                                <Dropdown.Menu
                                                    className="py-0 message-alert-menu"
                                                    align="right"
                                                    renderOnMount
                                                    flip>
                                                    {latestMessages?.map((value: IMessage, index: number) => {
                                                        return (
                                                            <>
                                                                <Dropdown.Item
                                                                    id={`${index}`}
                                                                    onClick={() => sendToInboxMessage(value)}
                                                                    className={
                                                                        value.inboxMessageStatusID ==
                                                                        InboxMessageStatus.Unread
                                                                            ? "p-3 d-flex message-alert-item font-semibold"
                                                                            : "p-3 px-3 d-flex message-alert-item"
                                                                    }>
                                                                    <div
                                                                        style={{
                                                                            backgroundColor: colorCode(value.docType)
                                                                        }}
                                                                        className="p-2 rounded alert-doctype text-light mr-2 d-flex">
                                                                        <span className="mx-auto">{value.docType}</span>
                                                                    </div>
                                                                    <span className="d-inline-block">
                                                                        {value.subject}
                                                                        <br />
                                                                        <span className="text-muted alert-time d-flex align-items-center">
                                                                            <ImportSVG
                                                                                name="Clock"
                                                                                color="#6c757d"
                                                                                size={12}
                                                                                // hoverClassName="mr-1"
                                                                            />
                                                                            {`${getTimeAgoMessage(
                                                                                Number(value.age)
                                                                            )} ago`}
                                                                        </span>
                                                                    </span>
                                                                </Dropdown.Item>
                                                                <Dropdown.Divider className="custom-divider" />
                                                            </>
                                                        );
                                                    })}

                                                    <Dropdown.Item
                                                        onClick={sendToInbox}
                                                        className="bg-light text-dark rounded-bottom p-3 px-3 d-flex message-alert-item">
                                                        <span className="font-semibold mx-auto">
                                                            <FontAwesomeIcon
                                                                className="mr-2"
                                                                style={{ fontSize: "14px" }}
                                                                icon={faEnvelopeOpenText}
                                                            />
                                                            Read All Messages
                                                        </span>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            ) : (
                                                <Dropdown.Menu align="right" renderOnMount flip>
                                                    <div id="0">
                                                        <Dropdown.Item>No Messages Found</Dropdown.Item>
                                                    </div>
                                                </Dropdown.Menu>
                                            )}
                                        </Dropdown>
                                    ) : (
                                        ""
                                    )}
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="flat"
                                            className="menu-toggle pr-2 bg-light rounded-0"
                                            eventKey="1"
                                            style={{ padding: "0.93rem" }}>
                                            <p className="d-inline">
                                                <span className="mr-1">
                                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                                    {dashboardInfo.companyName}
                                                </span>
                                            </p>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="p-0" align="right" renderOnMount={false}>
                                            {showMyProfileMenu() && (
                                                <Dropdown.Item className="py-3" href="#" onClick={navigateToMyProfile}>
                                                    <FontAwesomeIcon className="mr-1 icon" icon={faUser} />
                                                    My Profile
                                                </Dropdown.Item>
                                            )}
                                            <Dropdown.Item className="py-3" href="#" onClick={changePassword}>
                                                <FontAwesomeIcon className="mr-1 icon" icon={faCog} />
                                                Change Password
                                            </Dropdown.Item>
                                            <Dropdown.Divider className="custom-divider" />

                                            <Dropdown.Item className="py-3" href="#" onClick={handleLogout}>
                                                <FontAwesomeIcon className="mr-1 icon" icon={faSignOutAlt} />
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {roles.length > 1 ? (
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                variant="flat"
                                                className="menu-toggle role-toggler pr-2 bg-light rounded-0"
                                                eventKey="2"
                                                style={{ padding: "0.93rem" }}>
                                                <p className="d-inline">
                                                    <span
                                                        className="mr-1 "
                                                        data-letters={dashboardInfo.currentRole}
                                                        title={getRoleTogglerTooltip()}></span>
                                                </p>
                                            </Dropdown.Toggle>

                                            {roles.length > 1 ? (
                                                <Dropdown.Menu className="p-0" align="right" renderOnMount={false}>
                                                    <Dropdown.Header
                                                        style={{
                                                            fontSize: "0.65rem"
                                                        }}>
                                                        Switch view to
                                                    </Dropdown.Header>
                                                    {roles.map((item) => {
                                                        return (
                                                            <>
                                                                <Dropdown.Divider className="custom-divider" />
                                                                <Dropdown.Item className="py-2" key={item?.Name}>
                                                                    <SubMenu
                                                                        vertical={true}
                                                                        onSelect={handleRoleMenuChange}>
                                                                        <SubMenuItem
                                                                            text={item.Name}
                                                                            icon={
                                                                                dashboardInfo.currentRoleName ===
                                                                                item.Name
                                                                                    ? "check"
                                                                                    : ""
                                                                            }
                                                                            data={item}
                                                                        />
                                                                    </SubMenu>
                                                                </Dropdown.Item>
                                                            </>
                                                        );
                                                    })}
                                                </Dropdown.Menu>
                                            ) : null}
                                        </Dropdown>
                                    ) : null}

                                    {roles.length == 1 ? (
                                        <span
                                            className="mr-1 role-toggler d-inline"
                                            data-letters={dashboardInfo.currentRole}
                                            title={getRoleTogglerTooltip()}></span>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default TopBar;
