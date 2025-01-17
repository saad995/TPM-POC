import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import { IDashboardMenu, IUserMenu } from "Layouts/AppLayout/AppLayoutInterfaces";
import { clearReducerState, setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { Container } from "react-bootstrap";
import BlockMenu from "Modules/Common/Home/BlockMenu/BlockMenu";
import { useLocation } from "react-router-dom";
import { compareStringInsensitive } from "Lib/Helpers/StringHelper";

const LMS = () => {
    const dispatch = useDispatch();
    const [utilitySubMenus, setUtilitySubMenus] = useState<IUserMenu[]>([]);

    // Pulling data from Store
    const dashboardMenu: IDashboardMenu = useSelector((state: RootStore) => state.dashboardReducer.dashboardMenu);
    const location = useLocation();

    useEffect(() => {
        let menus = dashboardMenu.menu;
        if (menus.length > 0) {
            let indexOfMenus = menus.findIndex((menu: IUserMenu) =>
                compareStringInsensitive(menu.Url, location.pathname)
            );

            if (indexOfMenus > -1) {
                setUtilitySubMenus(menus[indexOfMenus].SubMenus!);
            }
        }
    }, [dashboardMenu]);

    useEffect(() => {
        dispatch(setPageTitleAction("LMS"));
    }, []);
    console.log("/...........",utilitySubMenus)
    return (
        <Container className="px-3" fluid>
            <BlockMenu menu={utilitySubMenus} isUsedOnWebocPage={false} />
        </Container>
    );
};

export default LMS;