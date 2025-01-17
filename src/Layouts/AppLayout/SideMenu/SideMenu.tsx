import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SideMenu.scss";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome, faSignOutAlt, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IDashboardMenu, IUserMenu } from "../AppLayoutInterfaces";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import { Row, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { unPinMenuAction } from "../AppLayoutActions";
import "./SideMenu.scss";
import { IADPlaceholderPayload } from "Modules/Common/ADPlaceholder/ADPlaceholderInterfaces";
import { SaveADPlaceholderData } from "Modules/Common/ADPlaceholder/ADPlaceholderActions";
import { RootStore } from "Store";

export interface ISideMenuProps {
    menu: IUserMenu[] | undefined;
}
enum MenuItemType {
    Hyperlink,
    Button
}
export interface ISideMenuItemProps {
    ID: number;
    MenuItemType: MenuItemType;
    CssClass?: IconProp | string;
    index?: string | number | null | undefined;
    Url?: any;
    DisplayText: string | undefined;
    onClick?: React.MouseEventHandler;
    CustomAttributes?: any;
    subMenu?: IUserMenu[];
    subMenuID?: string;
    PinnedByUser: boolean;
}

const renderThumb = ({ ...props }) => {
    return <div id="vertical-scroll-bar-thumb" {...props} />;
};

const SideMenuItem = (props: ISideMenuItemProps) => {
    const dispatch = useDispatch();
    const unPinItem = (id: number) => {
        dispatch(unPinMenuAction(id));
    };

    return props.MenuItemType == MenuItemType.Hyperlink ? (
        <>
            <NavLink
                exact
                id={props.DisplayText}
                activeClassName="active"
                to={props.Url}
                onClick={props.onClick}
                key={props.index}
                className="py-2 position-relative list-group-item list-group-item-action d-flex align-items-center"
                { ...props.CustomAttributes }>
                <span className="pr-1">
                                <ImportSVG
                                            name={props.CssClass!}
                                            size={18}
                                            color="#FFFFFF"
                                            className="icon"
                                        />
                                </span>
                <span className="menu-item-title">{props.DisplayText}</span>
                {props.PinnedByUser ? (
                    <FontAwesomeIcon
                        className="pin-item position-absolute"
                        onClick={(e) => {
                            e.preventDefault();
                            unPinItem(props.ID);
                        }}
                        id={"pin-" + props.DisplayText}
                        style={{
                            right: "10%",
                            top: "30%",
                            bottom: "0",
                            zIndex: 2
                        }}
                        color="#10A168"
                        icon={faThumbtack}
                        title="Unpin this item"
                    />
                ) : null}
            </NavLink>
        </>
    ) : (
        <>
            <ListGroup.Item action onClick={props.onClick} {...props.CustomAttributes}>
                {props.CssClass && <span className=" pr-1"></span>}

                <span className="menu-item-title pr-1">{props.DisplayText}</span>
            </ListGroup.Item>
        </>
    );
};

const SideMenu = (props: ISideMenuProps) => {
    const overlayCollapse = () => {
        const sidebar = document.getElementById("overlay-menu-container");
        sidebar?.classList.toggle("overlay-expanded");
        sidebar?.classList.toggle("overlay-collapsed");
    };
    const dispatch = useDispatch();

    const sidemenuCollapse = (sidebarID: string) => {
        const sidebar = document.getElementById(sidebarID);
        sidebar?.classList.toggle("side-menu-expanded");
        sidebar?.classList.toggle("side-menu-collapsed");
    };

    const handleSideMenuClick = (item: IUserMenu) => {
        if (item.ParentMenuID != null) {
            const payload: IADPlaceholderPayload = {
                ParentMenuID: item.ParentMenuID
            };
            dispatch(SaveADPlaceholderData(payload));
        }
    };

    // Pulling data from Store
    const dashboardMenu: IDashboardMenu = useSelector((state: RootStore) => state.dashboardReducer.dashboardMenu);

    const getSideMenuUrl = (item: IUserMenu) => {
        let url = "";
        let selectedItem = dashboardMenu.menu.filter((a) => a.Url === item.Url);
        let parentMenuID = item.ParentMenuID;
        let subMenuUrl = item.Url;
        if (selectedItem.length > 0 && selectedItem[0]?.Url === "/AD") {
            url = selectedItem[0]?.Url + "/" + selectedItem[0]?.ID;
        } else if (parentMenuID != null && item.Weboc_Left_Menu_ID == null) {
            let parentMenuUrl = dashboardMenu.menu.find((a) => a.ID === parentMenuID)?.Url;
            if (parentMenuUrl === "/AD") {
                url = parentMenuUrl + "/" + parentMenuID + subMenuUrl;
            } else {
                url = item.Url;
            }
        } else {
            url = item.Weboc_Left_Menu_ID ? "/weboc/" + item.ID : item.Url;
        }
        return url;
    };

    return (
        <>
            <div id="overlay-menu-container" className="overlay-collapsed overlay d-block d-md-none">
                <a href="#" className="closebtn" onClick={(e) => {e.preventDefault(); overlayCollapse()}}>
                    &times;
                </a>
                <div className="overlay-content">
                    <NavLink
                        id="Home"
                        activeClassName="active"
                        to="/TPM"
                        className=" pl-4 py-3 list-group-item list-group-item-action">
                        <span className="pt-3 pb-3 pr-3">
                            <FontAwesomeIcon className="mr-1" icon={faHome} />
                        </span>
                        <span className="menu-item-title pt-3 pb-3 pr-3">Home</span>
                    </NavLink>
                    {props.menu?.map((value, index) => {
                        return (
                            <NavLink
                                exact
                                id={value.DisplayText}
                                activeClassName="active"
                                to={value.Url}
                                key={index}
                                className="pl-4 py-3 list-group-item list-group-item-action">
                                <span className="pt-3 pb-3 pr-3">
                                    <ImportSVG
                                            name={value.CssClass}
                                            size={32}
                                            color="#FFFFFF"
                                            className="icon"
                                        />
                                </span>
                                <span className="menu-item-title pt-3 pb-3 pr-3">{value.DisplayText}</span>
                            </NavLink>
                        );
                    })}

                    <a className="pl-4 py-1">
                        <span className="pt-3 pb-3 pr-3">
                            <FontAwesomeIcon className="mr-1" icon={faSignOutAlt} />
                        </span>
                        <span className="menu-item-title pt-3 pb-3 pr-3">Logout</span>
                    </a>
                </div>
            </div>

            <Row
                id="sidebar-container"
                className="mx-0 sidebar-expanded px-0 d-none d-md-block"
                style={{
                    background: "#2D3F61",
                    gridArea: "menu",
                    color: "white",
                    position: "relative"
                }}>
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    // autoHideDuration={2000}
                    renderThumbVertical={renderThumb}
                    // renderThumbHorizontal={renderThumb}
                    style={{ height: "100vh" }}>
                    <ListGroup>
                        <ListGroup.Item action className="py-2">
                            <div style={{ whiteSpace: "nowrap" }}>
                                <span
                                    style={{
                                        position: "relative"
                                    }}>
                                    <ImportSVG name="psw-white" size={30} color="#EEE" />

                                    <ImportSVG name="psw-white-title" size={40} color="#EEE" />
                                </span>
                            </div>
                        </ListGroup.Item>

                        <SideMenuItem
                            CssClass={faHome}
                            Url="/TPM"
                            DisplayText="Home"
                            MenuItemType={MenuItemType.Hyperlink}
                            PinnedByUser={false}
                            ID={0}
                        />

                        {props.menu?.map((value, index) => {
                            return (
                                <>
                                    <SideMenuItem
                                        CssClass={value.CssClass}
                                        Url={getSideMenuUrl(value)}
                                        DisplayText={value.DisplayText}
                                        index={index}
                                        MenuItemType={MenuItemType.Hyperlink}
                                        CustomAttributes={{
                                            "data-menuid": value.ID
                                        }}
                                        PinnedByUser={value.PinnedByUser}
                                        ID={value.ID}
                                        onClick={() => {
                                            handleSideMenuClick(value);
                                        }}
                                    />
                                </>
                            );
                        })}
                    </ListGroup>
                </Scrollbars>
            </Row>
        </>
    );
};

export default SideMenu;
