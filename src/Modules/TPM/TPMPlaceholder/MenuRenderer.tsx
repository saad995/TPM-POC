import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import { IDashboardMenu, IUserMenu } from "Layouts/AppLayout/AppLayoutInterfaces";
import { clearReducerState, setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { Container } from "react-bootstrap";
import BlockMenu from "Controls/BlockMenu/BlockMenu";
import { useLocation } from "react-router-dom";
import { compareStringInsensitive } from "Lib/Helpers/StringHelper";

const MenuRenderer = () => {
    const dispatch = useDispatch();
    const [subMenus, setSubMenus] = useState<IUserMenu[]>([]);

    // Pulling data from Store
    const dashboardMenu: IDashboardMenu = useSelector((state: RootStore) => state.dashboardReducer.dashboardMenu);
    const location = useLocation();

    useEffect(() => {
        let menus: IUserMenu[] = [];
        if (dashboardMenu.menu?.length > 0) {
            menus.push(...dashboardMenu.menu);
        }
        if (dashboardMenu.sideMenu?.length > 0) {
            menus.push(...dashboardMenu.sideMenu);
        }
        if (menus.length > 0) {
            let indexOfMenus = menus.findIndex((menu: IUserMenu) =>
                compareStringInsensitive(menu.Url, location.pathname)
            );

            if (indexOfMenus > -1) {
                setSubMenus(menus[indexOfMenus].SubMenus!);
            }
        }
    }, [dashboardMenu]);

    useEffect( () =>
    {
        const pathArray = location.pathname.split( '/' );
        if (pathArray) {
            dispatch(setPageTitleAction(pathArray[pathArray.length - 1]));
        }
    }, []);

    return (
        <Container className="px-3" fluid>
            <BlockMenu menu={subMenus} isUsedOnWebocPage={false} />
        </Container>
    );
};

export default MenuRenderer;
