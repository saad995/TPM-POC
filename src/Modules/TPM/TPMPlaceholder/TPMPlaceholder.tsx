import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import { IDashboardMenu, IUserMenu } from "Layouts/AppLayout/AppLayoutInterfaces";
import { clearReducerState, getDashboardInfoAction, getWebocSessionAction, setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { Container, Row, Col } from "react-bootstrap";
import BlockMenu from "Controls/BlockMenu/BlockMenu";
import { useLocation } from "react-router-dom";
import { compareStringInsensitive } from "Lib/Helpers/StringHelper";
import _ from "lodash";
// import { getCreateSubscriptionFunc } from "../UpdateSyncProfile/PaymentProfile/PaymentProfileActions";
import { clearAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";
// import { getCreateSubscriptionAction } from "../UpdateSyncProfile/PaymentProfile/PaymentProfileActions";


const TPMPlaceholder = () => {
    const dispatch = useDispatch();

    //destructure store items
    const store: any = useSelector((state: any) => state)
    // const { PaymentProfileReducer } = store
    // const { paymentDetails } = PaymentProfileReducer
    const [profileManagementSubMenus, setProfileManagementSubMenus] = useState<IUserMenu[]>([]);

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
            console.log("menus  ->>>>>...",menus)
            let indexOfMenus = menus.findIndex((menu: IUserMenu) =>{
                console.log("menu...", menu,location.pathname)
               let url = location.pathname.replace(/\/tpm\//g, '/tpm');
               return compareStringInsensitive(menu.Url, url)
            }
            );
            console.log("menu index...",menus, indexOfMenus, location.pathname);

            if (indexOfMenus > -1) {
                setProfileManagementSubMenus(menus[indexOfMenus].SubMenus!);
            }
        }
        

    }, [dashboardMenu]);
    

    useEffect (()=>{
        dispatch(getDashboardInfoAction());
    },[]);
    
    useEffect(() => {
        dispatch(setPageTitleAction("Value Added Services"));
    }, []);
    console.log("TPM Place holder", profileManagementSubMenus, dashboardMenu, window.location.pathname)

    return (
        <Row className="mx-0">
            <Col>
                <BlockMenu menu={profileManagementSubMenus} isUsedOnWebocPage={false} />
            </Col>
        </Row>
    );
};

export default TPMPlaceholder;
