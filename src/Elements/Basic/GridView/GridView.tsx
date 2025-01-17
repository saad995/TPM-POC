import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { filterBy, orderBy } from "@progress/kendo-data-query";
import { getter } from "@progress/kendo-react-common";
import {
    getSelectedState, Grid,
    GridColumn,
    GridExpandChangeEvent,
    GridHeaderSelectionChangeEvent,
    GridPageChangeEvent,
    GridPagerSettings,
    GridSelectionChangeEvent,
    GridSortChangeEvent
} from "@progress/kendo-react-grid";
import { Input } from "@progress/kendo-react-inputs";
import Config from "Config";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import style from "../../Custom/Search/Search.module.scss";
import Style from "./GridView.module.scss";
interface IProps {
    data: any;
    properties: any;
    gridStyle?: "purpleGrid" | "purpleGrid gridRound" | "gridRound";
    styleClass?: any;
    children: any;

    isSearchEnabled?: boolean;
    heading?: string;
    gridPanel?: any;
    searchableColumns?: String[];
    dataItemKey?: string;

    skipColumn?: number;
    takeColumn?: number;
    pageable?: boolean;
    detailComponent?: any;
    isRowClickable?: boolean;
    selectedField?: string;
    getSelectedValues?: string;
   
    initialSort?: any;
    mode?: "single" | "multiple";
}

interface AppState {
    items: [];
    total: number;
    skip: number;
    pageSize: number;
    pageable: GridPagerSettings;
}

const GridView = (props: IProps | any) => {
    const {
        data = [],
        properties,
        gridStyle = "",
        styleClass,
        children,
        size,
        heading,
        gridPanel,
        searchableColumns = properties?.map((x: any) => {
            if (x.field && !_.isEmpty(x.field)) {
                return x.field;
            }
        }),
        isSearchEnabled,
        dataItemKey = "id",

        skipColumn = 0,
        takeColumn = 5,
        pageable = false,
        pagesizes = [],

        detailComponent,
        detailObjectName,
        isRowClickable,
        selectedField,
        getSelectedValues,

        initialSort = [],
        mode = "multiple",
        externalExpandChange,
        ...others
    } = props;

    const searchInput = React.useRef(null);
    const idGetter: any = getter(dataItemKey);

    let minGridWidth = 0;
    const grid = React.useRef<any>(null);
    const [applyMinWidth, setApplyMinWidth] = React.useState(false);
    const [gridCurrent, setGridCurrent] = React.useState(0);
    const [isSizeAvailable, setSizeAvailable] = React.useState(false);
    const [value, setValue] = useState("");
    const [selectedState, setSelectedState] = useState<{
        [id: string]: boolean | number[];
    }>({});


    const [sort, setSort] = React.useState(initialSort);

    /*********************************** Resizeable Grid Work **************************************/

    const createState = (skip: number, take: number, gridData = data): any => {
        let pagerSettings: GridPagerSettings = Config.gridConfig as GridPagerSettings;

        if (gridData.length < skip) {
            skip = 0;
        }
        
        if (pageable) {
            return {
                items: orderBy(gridData.slice(skip, skip + take), initialSort),
                total: gridData.length,
                skip: skip,
                pageSize: take,
                pageable: !_.isEmpty(pagesizes) ? pagesizes : Config.grid.pageable
            };
        } else {
            return {
                items: orderBy(gridData, initialSort),
                total: gridData.length,
                skip: 0,
                pageSize: take,
                pageable: pagerSettings
            };
        }
    };

    const [state, setState] = useState<AppState>(createState(skipColumn, takeColumn));

    const pageChange = ( event: GridPageChangeEvent ) =>
    {      
        if ( isSearchEnabled && value )
        {
            state.skip = event.page.skip;
            state.pageSize = event.page.take;
            filterData(value);
        } else {
            setState(createState(event.page.skip, event.page.take));
        }
    };

    useEffect(() => {
        if (selectedField && data && dataItemKey) {
            const deep = _.reduce(
                data,
                (obj: any, param: any) => {
                    if (obj && param) {
                        obj[param[dataItemKey]] = param[selectedField] || false;
                        return obj;
                    }
                },
                {}
            );
            setSelectedState(deep);
        }
        setState(createState(skipColumn, takeColumn));
    }, [pageable, data]);

    /******************************************************************************************/

    /*********************************** Resizeable Grid Work **************************************/

    useEffect(() => {
        // grid.current = document.querySelector(".k-grid");

        if (grid.current != null) {
            window.addEventListener("resize", handleResize);
            children.map((item: any) => {
                if (item.props) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    item.props.minWidth !== undefined
                        ? (minGridWidth += item.props.minWidth)
                        : minGridWidth;
                }
            });
            setGridCurrent(grid.current.offsetWidth);

            if (grid.current.offsetWidth > 0)
                setApplyMinWidth(grid.current.offsetWidth < minGridWidth);
        }
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        // grid.current = document.querySelector(".k-grid");


        if (grid.current != null) {

            
            if (grid.current.offsetWidth < minGridWidth && !applyMinWidth) {

                if (grid.current.offsetWidth > 0)
                    setApplyMinWidth(true);
            } else if (grid.current.offsetWidth > minGridWidth) {

                setGridCurrent(grid.current.offsetWidth);
                setApplyMinWidth(false);

            }

        }
    };





    const givePer = (percentage: number) => {
        // grid.current = document.querySelector(".k-grid");
        if (grid.current != null) {
            if (grid.current != null) {
                let x = (grid.current.offsetWidth / 100) * percentage;
                return x;
            }
        }
    };

    const setWidth = (minWidth: number | undefined, maxWidth: number | undefined) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        minWidth === undefined ? (minWidth = 0) : null;
        maxWidth === undefined ? (maxWidth = givePer(100 / children.length)) : (maxWidth = givePer(maxWidth));

        let width = applyMinWidth ? minWidth : maxWidth;

        if (width != 0) return width;
    };

    /******************************************************************************************/

    /**************************************Searchable work*************************************/

    const filterData = (val: any) => {
        const dataFilteration:any = []
        searchableColumns.map((item:any) => {
            if(item !== "")
            {
            let data =  {
                field:item,
                operator:"contains",
                value:val,
                ignoreCase:true
            }
            dataFilteration.push(data);
        }
        });
        
        
        let result: any = filterBy(data, {
            logic: "or",
            filters: dataFilteration
        });

        //  If there is any detailed data avaialble.
        //  Filters data on basis of details object if no result found from grid component data
        //  Fix Added: 24-01-2022 by Mir

        // How to Use
        // Pass name of details object as detailObjectName={object} in gridView

        if(detailObjectName && result.length==0)
        {
            result = data.filter((el:any) => {
                return el[detailObjectName].some((el:any) => {
                    let isFound:boolean=false;
                    for(let i=0; i< searchableColumns.length;i++)
                    {
                        if(el.hasOwnProperty(searchableColumns[i]))
                        {
                            const prop = searchableColumns[i];
                            isFound= el[prop].toLowerCase().indexOf(val.toLowerCase())!==-1 

                            if(isFound===true)
                                break;
                        }
                    }
                    return isFound;
                });
            });
        }

        setValue(val);      
        setState(createState(state.skip, state.pageSize, result));
    };

    useEffect(() => {
        const inp: any = searchInput?.current;
        inp?.focus();
    }, [value]);

    /******************************************************************************************/

    /**************************************Selection work**************************************/

    const onSelectionChange = React.useCallback(
        (event: GridSelectionChangeEvent) => {
            const newSelectedState = getSelectedState({
                event,
                selectedState: { ...selectedState },
                dataItemKey: dataItemKey
            });
            setSelectedState(newSelectedState);
            getSelectedValues(newSelectedState);
        },
        [selectedState]
    );

    const onHeaderSelectionChange = React.useCallback((event: GridHeaderSelectionChangeEvent) => {
        const checkboxElement: any = event.syntheticEvent.target;
        const checked = checkboxElement.checked;
        const newSelectedState: any = { ...selectedState };

        event.dataItems.forEach((item: any) => {
            newSelectedState[idGetter(item)] = checked;
        });
        setSelectedState(newSelectedState);
        getSelectedValues(newSelectedState);
    }, []);

    /******************************************************************************************/

    /**************************************Expanded work**************************************/

    const renderDetailComponent = () => {
        return detailComponent ? detailComponent : null;
    };

    const expandChange = (event: GridExpandChangeEvent) => {
        let newData = state.items.map((item: any) => {
            if (item[dataItemKey] === event.dataItem[dataItemKey]) {
                item.expanded = !event.dataItem.expanded;
            }
            return item;
        });
        setState(
            Object.assign({}, state, {
                items: newData
            })
        );
    };

    const GridView = (props: any) => {
        return (
            <span ref={grid} className={isRowClickable ? (Style.gridStyle + " d-block " + gridStyle +  Style.gridRowHover) : (Style.gridStyle + " d-block " + gridStyle)}>
                {heading && (
                    <Row className="align-items-center mx-0 no-gutters py-3 gridPanel">
                        <Col className="w-100 ">
                            <p className={style.searchHeading}>{heading}</p>
                        </Col>
                        {isSearchEnabled ? (
                            <Col className="ml-2 d-flex" xs={"auto"}>
                                <span className={"input-group position-relative mr-2 " + Style.searchGroup}>
                                    <Input
                                        id="search-box"
                                        name="SearchBox"
                                        autoComplete="off"
                                        placeholder={"Search"}
                                        onChange={(event) => filterData(event.target.value?.toString() ?? "")}
                                        value={value}
                                        ref={searchInput}
                                        className={Style.searchField + " "}
                                    />
                                    <div className="input-group-append">
                                        <span className={Style.inputGroupText} id="basic-addon2">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </span>
                                    </div>
                                </span>
                                {gridPanel}
                            </Col>
                        ) :null}
                    </Row>
                )}
                <Grid

                    style={styleClass}
                    data={orderBy(
                        state.items.map((item: any) => ({
                            ...item,
                            [selectedField]: selectedState[idGetter(item)]
                        })),
                        sort
                    )}
                    onPageChange={pageChange}
                    pageable={pageable ? state.pageable : pageable}
                    pageSize={state.pageSize}
                    skip={state.skip}
                    total={state.total}
                    detail={renderDetailComponent()}
                    expandField={"expanded"}
                    onExpandChange={externalExpandChange ? externalExpandChange : expandChange}
                    selectable={{
                        enabled: true,
                        drag: false,
                        cell: false,
                        mode: mode
                    }}
                    dataItemKey={dataItemKey}
                    onSelectionChange={selectedField ? onSelectionChange : null}
                    onHeaderSelectionChange={mode && mode == "multiple" ? onHeaderSelectionChange : null}
                    selectedField={selectedField ? selectedField : null}
                    sort={sort}
                    onSortChange={(e: GridSortChangeEvent) => {
                        setSort(e.sort);
                    }}
                    {...others}>
                    {children.map((child: any, index: number) => {
                        if (child.props) {
                            return (
                                <GridColumn
                                    width={setWidth(child.props.minWidth, child.props.maxWidth)}
                                    headerSelectionValue={
                                        selectedField
                                            ? state.items.findIndex((item: any) => !selectedState[idGetter(item)]) ===
                                            -1
                                            : null
                                    }
                                    {...child.props}
                                />
                            );
                        }
                    })}
                </Grid>
            </span>
        );
    };
    return <GridView />;
};

export default GridView;