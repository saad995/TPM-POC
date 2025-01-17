import React from "react";
import { Row, Col } from "react-bootstrap";

import { IUserMenu } from "Layouts/AppLayout/AppLayoutInterfaces";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";


import {
    Link,
    NavLink,
    Route,
    Switch,
    useParams,
    useRouteMatch
} from "react-router-dom";

import "./BlockMenu.scss";

export interface IBlockMenuProps {
    menu: IUserMenu[] | undefined;
}

function Topic() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId } = useParams<{topicId : string}>();

    return (
        <div>
            <h3>{topicId}</h3>
        </div>
    );
}

const TabContainer = (props: IBlockMenuProps) => {
    let { path, url } = useRouteMatch();

    return (
        <>
            <Row className="mt-3 block-menu">
                {props.menu?.map((value, index) => {
                    return (
                        <Col
                            className="mb-4 block-menu-item"
                            style={{ minHeight: "100%" }}
                            xs="6"
                            sm="4"
                            md="auto"
                        >
                            <NavLink
                                to={
                                    value.Weboc_Left_Menu_ID
                                        ? "/weboc/" + value.ID
                                        : value.Url
                                }
                                key={index}
                            >
                                <div
                                    className="px-2 py-3"
                                    style={{
                                        textAlign: "center",
                                        backgroundColor: "white",
                                        boxShadow: "0px 4px 12px #EBF0FA",
                                        borderRadius: "4px",
                                        width: "100%",
                                        height: "100%"
                                    }}
                                >
                                    <ImportSVG
                                        name={value.CssClass}
                                        size={52}
                                        color="#4F4F4F"
                                        className="block-menu-icon"
                                    />
                                    <br />
                                    <p className="mt-2">{value.DisplayText}</p>
                                </div>
                            </NavLink>
                        </Col>
                    );
                })}
            </Row>

            <Row>
                <Col>
                    <ul>
                        <li>
                            <Link to={`${url}/rendering`}>
                                Rendering with React
                            </Link>
                        </li>
                        <li>
                            <Link to={`${url}/components`}>Components</Link>
                        </li>
                        <li>
                            <Link to={`${url}/props-v-state`}>
                                Props v. State
                            </Link>
                        </li>
                    </ul>
                </Col>
                <Col>
                    <Switch>
                        <Route exact path={path}>
                            <h3>
                                This would be the place holder for module's
                                dashboard content like widgets etc.
                            </h3>
                        </Route>
                        <Route path={`${path}/:topicId`}>
                            <Topic></Topic>
                        </Route>
                    </Switch>
                </Col>
            </Row>
        </>
    );
};

export default TabContainer;
