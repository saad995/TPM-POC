import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";
////////////////////////////////////////////////////////////////////////////////////////
import Loader from "Elements/Basic/Loader/Loader";
import { IUserMenu, MenuPosition } from "Elements/Types/SharedTypes";
import { setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { IDashboardMenu } from "Layouts/AppLayout/AppLayoutInterfaces";
import { RootStore } from "Store";
import BlockMenu from "../../../Controls/BlockMenu/BlockMenu";
import { SaveADPlaceholderData } from "./ADPlaceholderActions";
import { IADPlaceholderPayload } from "./ADPlaceholderInterfaces";
////////////////////////////////////////////////////////////////////////////////////////

const ADPlaceholder = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    let { url } = useRouteMatch();
    const { id } = useParams<{ id: string }>();

    const dashboardMenu: IDashboardMenu = useSelector((state: RootStore) => state.dashboardReducer.dashboardMenu);

    const defMenu: IUserMenu = {
        ID: 0,
        DisplayText: "string",
        DisplayTextShort: "string",
        MenuPosition: MenuPosition.Center,
        CssClass: "adversal",
        Url: "string",
        ParentMenuID: null,
        SortOrder: 0,
        UniqueId: "string",
        DisplayInTree: false,
        PinnedByUser: false,
        IsAlreadyPinned: false
    };

    const [currMenu, setCurrMenu] = useState(defMenu);
    const [loading, setLoading] = useState(false);

    const getMenuById = (dashboardMenu: IDashboardMenu, id: number): IUserMenu => {
        const menu: IUserMenu = {
            ID: 0,
            DisplayText: "none",
            DisplayTextShort: "none",
            MenuPosition: MenuPosition.Center,
            CssClass: "adversal",
            Url: "string",
            ParentMenuID: null,
            SortOrder: 0,
            DisplayInTree: false,
            PinnedByUser: false,
            IsAlreadyPinned: false,
            SubMenus: dashboardMenu.menu,
            UniqueId: "string"
        };

        return searchTree(menu, id);
    };

    const searchTree = (element: IUserMenu, id: number): any => {
        if (element.ID === id) {
            return element;
        } else if (element.SubMenus != null) {
            let i;
            let result = null;
            for (i = 0; result == null && i < element.SubMenus.length; i++) {
                result = searchTree(element.SubMenus[i], id);
                if (result === null) continue;
                else return result;
            }
            return result;
        }
        return null;
    };

    useEffect(() => {
        dispatch(setPageTitleAction(currMenu?.DisplayText));
    }, [currMenu]);

    useEffect(() => {
        const payload: IADPlaceholderPayload = {
            ParentMenuID: +id
        };
        dispatch(SaveADPlaceholderData(payload));

        // Using an IIFE
        let menu = getMenuById(dashboardMenu, +id);

        setCurrMenu(menu);
    }, [id]);

    return (
        <>
            {!loading ? (
                <>
                    {currMenu?.SubMenus ? (
                        <Row className="mx-0">
                            <Col>
                                <BlockMenu menu={currMenu?.SubMenus} isUsedOnWebocPage={false} />
                            </Col>
                        </Row>
                    ) : null}
                </>
            ) : (
                <Loader />
            )}
        </>
    );
};
export default ADPlaceholder;
