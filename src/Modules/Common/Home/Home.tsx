import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import Component
// import BlockMenu from "./BlockMenu/BlockMenu";
import BlockMenu from "../../../Controls/BlockMenu/BlockMenu";

//Import Constant
import { RootStore } from "Store";

//Import Actions
import { IDashboardMenu } from "Layouts/AppLayout/AppLayoutInterfaces";
import { clearReducerState, setPageTitleAction } from "Layouts/AppLayout/AppLayoutActions";
import { Container } from "react-bootstrap";

const Home = () => {
    const dispatch = useDispatch();

    const [isMenuFetched, setIsMenuFetched] = useState(false);

    // Pulling data from Store
    const dashboardMenu: IDashboardMenu = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardMenu
    );
    if (!isMenuFetched) {
        setIsMenuFetched(true);
    }

    // User logout Func
    useEffect(() => {
        dispatch(setPageTitleAction("Dashboard"));
        // logic to clear redux state on page refresh
        window.onbeforeunload = function () {
            dispatch(clearReducerState());
        };
    }, []);
    return (
        <Container className="px-3" fluid>
            <BlockMenu menu={dashboardMenu.menu} isUsedOnWebocPage={false} />
        </Container>
    );
};

export default Home;