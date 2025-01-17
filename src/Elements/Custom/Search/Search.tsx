import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

//kendo
import { Input } from "@progress/kendo-react-inputs";
import { filterBy } from "@progress/kendo-data-query";

// Import CSS
import style from "./Search.module.scss";
// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface IProps {
    confirm: any;
    data: any;
    searchableColumns: any;
    heading?: string;
    searchBoxClass?: string;
}

const Search = (props: IProps) => {
    const { confirm, searchableColumns, data, heading, searchBoxClass } = props;
    const [value, setValue] = useState("");
    //generate filter object
    const filterData = (val: any) => {
        let result: any = filterBy(data, {
            logic: "or",
            filters: searchableColumns.map((item: any) => {
                return {
                    field: item,
                    operator: "contains",
                    value: val,
                    ignoreCase: true
                };
            })
        });
        setValue(val);
        confirm(result);
    };

    return (
        <Row className="align-items-center py-2">
            <Col className={`ml-2 pt-1 ${searchBoxClass}`} xs={"auto"}>
                <Input
                    id="search-box"
                    name="SearchBox"
                    placeholder={"Search"}
                    onChange={(event) => filterData(event.target.value?.toString() ?? "")}
                    value={value}
                />
                <FontAwesomeIcon icon={faSearch} style={{ position: "relative", left: "-25px" }} />
            </Col>
        </Row>
    );
};
export default Search;
