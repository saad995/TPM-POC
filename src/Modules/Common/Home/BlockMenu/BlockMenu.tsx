import {
    IDashboardMenu,
    IUserMenu
} from "Layouts/AppLayout/AppLayoutInterfaces";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import React from "react";
import { Row, Col } from "react-bootstrap";
import { NavLink, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./BlockMenu.scss";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { pinMenuAction } from "Layouts/AppLayout/AppLayoutActions";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
export interface IBlockMenuProps {
    menu: IUserMenu[] | undefined;
    isUsedOnWebocPage: boolean;
}

const BlockMenu = (props: IBlockMenuProps) => {
    const dispatch = useDispatch();
    let { url } = useRouteMatch();

    const pinItem = (e: any, id: number) => {
        dispatch(pinMenuAction(id));
        e.preventDefault();
    };

    // Pulling data from Store
    const dashboardMenu: IDashboardMenu = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardMenu
    );

    const getBlockMenuUrl = (value: IUserMenu) => {
        let menuItem = dashboardMenu.menu.filter(
            (a) => a.ID === value.ParentMenuID
        );

        let parentMenuUrl = null;
        if (menuItem.length > 0) {
            parentMenuUrl = menuItem[0].Url;
        }
        let generatedUrl = props.isUsedOnWebocPage
            ? `${url}/${value.ID}`
            : value.Url === "/AD"
            ? value.Url + "/" + value.ID
            : value.ParentMenuID != null && parentMenuUrl === "/AD"
            ? parentMenuUrl + "/" + value.ParentMenuID + value.Url
            : value.Weboc_Left_Menu_ID
            ? "/weboc/" + value.ID
            : value.Url;

        return generatedUrl;
    };

    return (
        <Row className="mt-3 block-menu">
            {props.menu?.map((value, index) => {
                return (
                    <Col
                        className="mb-4 block-menu-item"
                        style={{ minHeight: "100%" }}
                        xs="12"
                        sm="6"
                        lg="4"
                        xl="auto">
                            
                        <NavLink to={getBlockMenuUrl(value)} key={index}>
                            <Row className="no-gutters">
                                <Col
                                    className="d-flex"
                                    style={{ minHeight: "100%" }}>
                                    <span className="p-3 icon-container">
                                        <ImportSVG
                                            name={value.CssClass}
                                            size={32}
                                            color="#FFFFFF"
                                            className="icon"
                                        />
                                    </span>

                                    <div className="anim-block"></div>
                                    <p
                                        className="my-auto ml-2 displayText"
                                        style={{
                                            textAlign: "left"
                                        }}>
                                        {value.DisplayText}
                                    </p>

                                    {value.IsAlreadyPinned ? null : (
                                        <FontAwesomeIcon
                                            id={"pin-" + value.DisplayText}
                                            className="pin-item position-absolute d-none"
                                            onClick={(e) =>
                                                pinItem(e, value.ID)
                                            }
                                            style={{
                                                right: "5%",
                                                top: "40%",
                                                bottom: "0",
                                                zIndex: 2
                                            }}
                                            icon={faThumbtack}
                                            title="Pin this to side menu"
                                        />
                                    )}
                                </Col>
                            </Row>
                        </NavLink>
                    </Col>
                );
            })}
        </Row>
    );
};

export default BlockMenu;
