import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Dialog } from "@progress/kendo-react-dialogs";

import { Button, Col, Row } from "react-bootstrap";

import { IProps, ISearchNTN } from "Modules/TPM/Common//SearchNTN/SearchNTNInterfaces";
// import { IOrganizationsOnNTN } from "Modules/TPM/Common/ImportPermit/CreateEditImportPermit/BasicInfo/BasicInfoInterfaces";
import { RootStore } from "Store";
import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";

import style from "./SearchNTN.module.scss";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { FormInput } from "Elements/Basic/FormComponent/FormComponent";
import GridView from "Elements/Basic/GridView/GridView";
import Column from "Elements/Basic/GridView/Columns/Column";

const SearchNTN = (props: IProps) => {
    const { func, onClickClosed, onSelect , traderOrganizations} = props;
debugger;
    // const traderOrganizations: any[] = useSelector(
    //     (state: RootStore) => state.basicInfoReducer.traderOrganizations
    // );

    const [gridData, setGridData] = useState([] as ISearchNTN[]);
    const [companyName, setCompanyName] = useState("");
    const [ntn, setNTN] = useState("");

    const handleSearch = () => {
        const orgs: ISearchNTN[] = [];
        traderOrganizations?.map((org:any) => {
            const ntncomp: ISearchNTN = {
                ntn: org.NTN,
                companyName: org.companyName,
                status: org.status,
                isExpired:org.isExpired,
            };

            orgs.push(ntncomp);
        });

        let filteredByCom = [] as ISearchNTN[];
        let filteredByNTN = [] as ISearchNTN[];

        if (companyName)
            filteredByCom = orgs.filter((x) => x.companyName?.toLowerCase().includes(companyName.toLowerCase()));
        if (ntn) filteredByNTN = orgs.filter((x) => x.ntn?.includes(ntn));
        
        const merged = [...filteredByCom, ...filteredByNTN];

        const data: ISearchNTN[] = merged.filter(function (item, pos) {
            return merged.indexOf(item) == pos;
        });

        setGridData(data);
    };

    const toggleSearch = () => {
        let SearchForm = document.getElementById("form");
        let searchCol = document.getElementById("search-col");
        let gridCol = document.getElementById("grid-col");

        SearchForm?.classList.toggle("dialogAnimCollapsed");
        SearchForm?.classList.toggle("dialogAnimExpanded");

        searchCol?.classList.toggle("search-col-collapse");
        searchCol?.classList.toggle("search-col-expand");

        gridCol?.classList.toggle("grid-col-collapse");
        gridCol?.classList.toggle("grid-col-expand");
    };

    const handleNTNChange = (event: any) => {
        setNTN(event.target.value);
    };

    const handleCompanyNameChange = (event: any) => {
        setCompanyName(event.target.value);
    };

    const handleNTNSelect = (event: any) => {
        if (event.dataItem.ntn && !event.dataItem.isExpired) {
            onSelect(event.dataItem.ntn);
        }
    };

    const handleReset = () => {
        setNTN("");
        setCompanyName("");

        const orgs: ISearchNTN[] = [];
        traderOrganizations?.map((org:any) => {
            const ntncomp: ISearchNTN = {
                ntn: org.NTN,
                companyName: org.companyName,
                status: org.status,
                isExpired:org.isExpired
            };

            orgs.push(ntncomp);
        });

        setGridData(orgs);
    };

    useEffect(() => {
        const orgs: ISearchNTN[] = [];
        traderOrganizations?.map((org:any) => {
            const ntncomp: ISearchNTN = {
                ntn: org.NTN,
                companyName: org.companyName,
                status: org.status,
                isExpired:org.isExpired
            };

            orgs.push(ntncomp);
        });

        setGridData(orgs);
    }, []);

    return (
        <Dialog onClose={func} className={`${style.ntnDialog} p-0`}>
            <Row style={{ width: "100%" }} className="no-gutters text-nowrap h-100">
                <Col xs="12" md="3" id="search-col" className="search-col-collapse">
                    <Row
                        className="border-bottom bg-light mx-0"
                        style={{
                            paddingTop: "0.8rem",
                            paddingBottom: "0.75rem"
                        }}>
                        <Col className="d-flex align-items-center justify-content-between mx-md-3">
                            <p className="d-inline">{resources_EN.search_ntn_dialog_title}</p>
                            <span>
                                <Button
                                    variant="primary"
                                    className="d-inline-flex d-md-none py-2"
                                    onClick={() => {
                                        toggleSearch();
                                    }}>
                                    <span className="k-icon k-i-search text-light"></span>
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="border d-inline-flex d-md-none ml-1 py-2"
                                    onClick={onClickClosed}>
                                    <span className="k-icon k-i-close"></span>
                                </Button>
                            </span>
                        </Col>
                    </Row>
                    <Form
                        render={() => (
                            <FormElement id="form" className={`${style.dialogForm} dialogAnimCollapsed`}>
                                <div className="mx-2 px-2">
                                    <Row className="mb-1" xs="2" md="1">
                                        <Col>
                                            <Field
                                                id="ntnSearch"
                                                name="ntnSearch"
                                                label={resources_EN.search_ntn_ntn_title}
                                                component={FormInput}
                                                onChange={handleNTNChange}
                                                value={ntn}
                                            />
                                        </Col>
                                        <Col>
                                            <Field
                                                id="companyNameSearch"
                                                name="companyNameSearch"
                                                label={resources_EN.search_ntn_company_name_title}
                                                component={FormInput}
                                                onChange={handleCompanyNameChange}
                                                value={companyName}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="no-gutters mt-3 mb-3 mb-md-0" xs="2" md="1">
                                        <Col className="d-md-none pr-3">
                                            <Button block onClick={handleSearch}>
                                                <p>{"Search"}</p>
                                            </Button>
                                        </Col>

                                        <Col className="pl-3 pl-md-0">
                                            <Button block onClick={handleReset} variant="outline-primary">
                                                <p>{"Reset"}</p>
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                                <Row className="no-gutters mt-auto d-none d-md-flex">
                                    <Col xs="6">
                                        <Button
                                            style={{
                                                borderRadius: "0px 0px 0px 4px"
                                            }}
                                            onClick={handleSearch}
                                            type={"submit"}
                                            block>
                                            <p>{"Search"}</p>
                                        </Button>
                                    </Col>

                                    <Col xs="6">
                                        <Button
                                            style={{
                                                borderRadius: "0px"
                                            }}
                                            onClick={onClickClosed}
                                            variant="secondary"
                                            block>
                                            <p>{"Close"}</p>
                                        </Button>
                                    </Col>
                                </Row>
                            </FormElement>
                        )}
                    />
                </Col>
                <Col xs="12" md="9" id="grid-col" className="grid-col-expand">
                    <GridView
                        className={`${style["search-ntn"]} mt-auto`}
                        gridStyle={"h-100"}
                        style={{ padding: "0" }}
                        data={gridData}
                        skipColumn={0}
                        takeColumn={7}
                        total={gridData.length}
                        pageable={true}
                        onRowClick={handleNTNSelect}>
                        <Column
                            field="ntn"
                            title={resources_EN.search_ntn_ntn_title}
                            minWidth={80}
                            maxWidth={20}
                            className={style["grid-column"]}
                        />
                        <Column
                            field="companyName"
                            title={resources_EN.search_ntn_company_name_title}
                            minWidth={220}
                            maxWidth={50}
                            className={style["grid-column"]}
                        />
                        <Column
                            field="status"
                            title={resources_EN.search_ntn_subscription_status}
                            minWidth={220}
                            maxWidth={30}
                            className={style.status}
                            cell={(props: any) => (
                                <td>
                                    {!props?.dataItem?.isExpired ? (
                                        <div className="text-success">Subscription Active</div>
                                    ) : (
                                        <div className="text-danger text-bold">
                                            Subscription Expired
                                        </div>
                                    )}
                                </td>
                            )}
                        />
                    </GridView>
                </Col>
            </Row>
        </Dialog>
    );
};

export default SearchNTN;
