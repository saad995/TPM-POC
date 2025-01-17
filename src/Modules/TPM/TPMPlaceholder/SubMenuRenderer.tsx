import BlockMenu from "Controls/BlockMenu/BlockMenu";
import { getDashboardInfoAction, setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { IDashboardMenu, IUserMenu } from "Layouts/AppLayout/AppLayoutInterfaces";
import { compareStringInsensitive } from "Lib/Helpers/StringHelper";
import { RootStore } from "Store";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SubMenuRenderer = (props:any) => {
    const { path } = props.match;
    
    
    const location = useLocation();
    const pathArray = location.pathname.split("/");
    const dispatch = useDispatch();
    const [supportSubMenus, setUtilitySubMenus] = useState<IUserMenu[]>([]);
    // Pulling data from Store
    const dashboardMenu: IDashboardMenu = useSelector((state: RootStore) => state.dashboardReducer.dashboardMenu);

    useEffect(() => {
        let menus: IUserMenu[] = [];
        if (dashboardMenu.menu?.length > 0) {
            menus.push(...dashboardMenu.menu);
        }
        if (dashboardMenu.sideMenu?.length > 0) {
            menus.push(...dashboardMenu.sideMenu);
        }
        console.log("dashboardMenu.menu in sub render: ",dashboardMenu.menu, pathArray.length, pathArray);

        if (pathArray.length > 2) {
            const parentMenuUrl = location.pathname.slice(
                0,
                location.pathname.indexOf(pathArray[pathArray.length - 1]) - 1
            );
            console.log("parentMenuUrl: ",parentMenuUrl);
            let menu = menus.filter((x) => compareStringInsensitive(x.Url, parentMenuUrl))[0];

            if (menu && menu.SubMenus) {
                console.log("menu.SubMenus: ",menu.SubMenus);
                let subMenu = menu.SubMenus?.filter((m: IUserMenu) =>{
                    console.log("menu filter ====>>>: ",menu.SubMenus);

                  return  compareStringInsensitive(m.Url, location.pathname)
                }
                )[0];
                console.log("check sub menus: ",subMenu);
                
                if (subMenu) {
                    console.log("subMenu: ",subMenu);
                    setUtilitySubMenus(subMenu.SubMenus!);
                }
            }
        }
        
    }, [dashboardMenu]);
    useEffect (()=>{
        dispatch(getDashboardInfoAction());
    },[]);
    
    // useEffect(() => {
    //     if (pathArray) {
    //         dispatch(setPageTitleAction(pathArray[pathArray.length - 1]));
    //     }
    // }, []);
    useEffect(() => {
        dispatch(setPageTitleAction("Value Added Services"));
    }, []);
    return (
        <Container className="px-3" fluid>
            <BlockMenu menu={supportSubMenus} isUsedOnWebocPage={false} />
        </Container>
    );
};

export default SubMenuRenderer;
