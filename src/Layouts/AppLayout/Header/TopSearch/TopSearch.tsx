import {
    IGetDashboardInfoResponseData,
    IUserMenu
} from "../../AppLayoutInterfaces";
import React, { useEffect, useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "Store";
import "./TopSearch.scss";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import {
    filterMenusAction,
    pinMenuAction
} from "../../AppLayoutActions";
import { faTimes, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import useOutsideNotifier from "Elements/Hooks/useOutsideNotifier";

export interface ISearchResultTreeProps {
    Menu?: IUserMenu[];
}

const TopSearch = () => {
    const dispatch = useDispatch();
    const [searchQueryLocal, setSearchQueryLocal] = useState("");

    const dashboardInfo: IGetDashboardInfoResponseData = useSelector(
        (state: RootStore) => state.dashboardReducer.dashboardInfo
    );

    useEffect(() => {
        const txtTopSearch = document.getElementById("txtTopSearch");
        txtTopSearch?.setAttribute("class", "input-top-search");
    });

    const onChange_txtTopSearch = (event: InputChangeEvent) => {
        const value: any = event?.target?.value;
        setSearchQueryLocal(value);
        filterMenuTree(value);
    };

    const filterMenuTree = (query: string) => {
        let i;
        for (i = 0; i < dashboardInfo.menus.length; i++) {
            resetTree(dashboardInfo.menus[i]);
        }

        for (i = 0; i < dashboardInfo.menus.length; i++) {
            searchTree(dashboardInfo.menus[i], query);
        }

        dispatch(filterMenusAction(dashboardInfo));
    };

    const resetTree = (element: IUserMenu): any => {
        element.DisplayInTree = false;
        if (element.SubMenus != null) {
            let i;
            let result = null;
            for (i = 0; result == null && i < element.SubMenus.length; i++) {
                result = resetTree(element.SubMenus[i]);
            }
            return result;
        }
        return element;
    };

    const searchTree = (element: IUserMenu, query: string): any => {
        if (element.DisplayText.toLowerCase().includes(query.toLowerCase())) {
            element.DisplayInTree = true;
            return element;
        } else if (element.SubMenus != null) {
            let i;
            let result = null;
            for (i = 0; result == null && i < element.SubMenus.length; i++) {
                result = searchTree(element.SubMenus[i], query);
                if (result?.DisplayInTree) {
                    element.DisplayInTree = true;
                }
            }
            return result;
        }
        return null;
    };

    const closeSearchResults = () => {
        //TODO
        const sidebar = document.getElementById("overlay-menu-container");
        sidebar?.classList.toggle("overlay-expanded");
        sidebar?.classList.toggle("overlay-collapsed");

        setSearchQueryLocal("");
    };

    const SearchResults = (props: ISearchResultTreeProps) => {
        const wrapperRef = useRef(null);
        useOutsideNotifier(wrapperRef, () => {
            setSearchQueryLocal("");
        });

        return (
            <div className="search-results-wrapper" ref={wrapperRef}>
                <div className="search-results d-flex">
                    <SearchResultNode Menu={props.Menu} />
                </div>
            </div>
        );
    };

    const SearchResultNode = (props: ISearchResultTreeProps) => {
        const history = useHistory();
        const pinItem = (id: number) => {
            setSearchQueryLocal("");
            dispatch(pinMenuAction(id));
        };

        const navigate = (url: string) => {
            setSearchQueryLocal("");
            history.push(url);
        };

        return (
            <div className="d-flex w-100">
                {/* <div className="vl"></div> */}
                <div className="node w-100">
                    {props?.Menu?.map((item, index) => {
                        return (
                            <>
                                {item.DisplayInTree ? (
                                    <div className="node-wrapper" key={index}>
                                        <div
                                            className="d-inline-block mr-2"
                                            style={{ width: "20px" }}>
                                            <a
                                                className="pin-item ml-2 actions"
                                                href="#"
                                                onClick={(e) => {e.preventDefault(); pinItem(item.ID)}}
                                                title="Pin this to side menu">
                                                <FontAwesomeIcon
                                                    icon={faThumbtack}
                                                    size={"sm"}
                                                />
                                            </a>
                                        </div>

                                        <a
                                            className="result"
                                            // to={
                                            //     item.Weboc_Left_Menu_ID
                                            //         ? "/weboc/" + item.ID
                                            //         : item.Url
                                            // }
                                            onClick={() =>
                                                navigate(
                                                    item.Weboc_Left_Menu_ID
                                                        ? item.ParentMenuID ===
                                                          null
                                                            ? "/weboc/" +
                                                              item.ID
                                                            : "/weboc/" +
                                                              item.ParentMenuID +
                                                              "/" +
                                                              item.ID
                                                        : item.Url
                                                )
                                            }>
                                            <span className="k-icon k-i-arrow-root tree-icon my-custom-icon-class"></span>{" "}
                                            {item.DisplayText}
                                        </a>

                                        <SearchResultNode
                                            Menu={item.SubMenus}
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <>
            <Row className="pt-2 pb-2 bg-secondary">
                <Col className="align-self-center">
                    <Input
                        type="text"
                        placeholder="Search anything"
                        className="input-top-search"
                        id="txtTopSearch"
                        onChange={onChange_txtTopSearch}
                        value={searchQueryLocal}
                        autoComplete="off"
                    />
                </Col>
                {searchQueryLocal ? (
                    <Col xs="auto">
                        <a
                            className="close"
                            href="#"
                            onClick={(e) => {e.preventDefault(); closeSearchResults()}}
                            title="Close search">
                            <FontAwesomeIcon icon={faTimes} />
                        </a>
                    </Col>
                ) : (
                    ""
                )}
            </Row>

            {searchQueryLocal ? (
                <SearchResults
                    Menu={_.filter(dashboardInfo.menus, function (o) {
                        return !o.PinnedByUser;
                    })}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default TopSearch;
