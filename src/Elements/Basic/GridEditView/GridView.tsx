import * as React from "react";
import {
    Grid,
    GridItemChangeEvent,
    GridCellProps,
    GridColumn
} from "@progress/kendo-react-grid";

// import { sampleProducts } from "./sample-products";
import _ from "lodash";
import { useEffect } from "react";
import style from "../../Custom/Search/Search.module.scss";
import Style from "./GridView.module.scss";
// import { MyCommandCell } from "./CommandCell";
import MyCommandCell from "./Columns/CammandCell";
import { Col, Row, Button } from "react-bootstrap";
import { Error } from "@progress/kendo-react-labels";
import { randomNumberGenerator } from "Lib/Helpers/RandomNumberGenerator";

// import { DropDownCell } from "./myDropDownCell";

// import { insertItem, getItems, updateItem, deleteItem } from "./services";
// import { any } from "./interfaces";

interface Idata {
    id: number;
    hsCodeExt: string;
    itemDescription: string;
}

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
    dataItemKey: string;

    skipColumn?: number;
    takeColumn?: number;
    pageable?: boolean;
    detailComponent?: any;

    selectedField?: string;
    getSelectedValues?: string;
    requiredFields?: String[];
    defaultNewItem?: {};
    initialSort?: any;
    setData: any;
    mode?: "single" | "multiple";

    //
}

const sampleProducts = [
    { id: 1, hsCodeExt: "item5", itemDescription: "item5" },
    { id: 2, hsCodeExt: "item1", itemDescription: "item1" },
    { id: 3, hsCodeExt: "item2", itemDescription: "item2" },
    { id: 4, hsCodeExt: "item6", itemDescription: "item6" },
    { id: 5, hsCodeExt: "item7", itemDescription: "item7" }
];

const GridEditView = (props: any) => {
    const editField = "inEdit";

    const {
        data = [],
        properties,
        gridStyle = "",
        styleClass,
        children,
        setData,
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

        selectedField,
        getSelectedValues,

        initialSort = [],
        requiredFields = [],
        defaultNewItem = {},
        mode = "multiple",
        externalExpandChange,
        ...others
    } = props;

    const [items, setItems] = React.useState<Array<any>>([]);
    const grid = React.useRef<any>(null);
    const [applyMinWidth, setApplyMinWidth] = React.useState(false);
    const [isAlertVisible, setisAlertVisible] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    // 
    useEffect(() => {
        setItems(data);
    }, [data]);

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
        minWidth === undefined ? (minWidth = 0) : null;
        maxWidth === undefined ? (maxWidth = givePer(100 / children.length)) : (maxWidth = givePer(maxWidth));

        let width = applyMinWidth ? minWidth : maxWidth;

        if (width != 0) return width;
    };

    const CommandCell = (props: GridCellProps) => (
        <MyCommandCell
            {...props}
            onEdit={enterEdit}
            onDelete={remove}
            onAdd={add}
            onDiscard={discard}
            onUpdate={update}
            onCancel={cancel}
            editField={editField}
            dataItemKey={dataItemKey}
        />
    );

    //   const insertItem = (dataItem: any) => {
    //     const modifiedItems = items.filter((item: any) => {
    //         if(item[dataItemKey] !== dataItem[dataItemKey]){
    //             return item;
    //         }
    //     })
    //     setSelectedState(modifiedItems);
    //   }

    // 
    // 
    const updateItem = (item: any) => {
        return [...items].map((record) => (record[dataItemKey] == item[dataItemKey] ? item : record));
    };

    const insertItem = (item: any) => {
        item[dataItemKey] = randomNumberGenerator();
        item.inEdit = false;
        item.isNew = false;
        return item;
    };

    const deleteItem = (item: any) => {
        return [...items].filter((record) => record[dataItemKey] !== item[dataItemKey]);
    };

    //   // modify the items in the store, db etc
    const remove = (dataItem: any) => {
        const newData = deleteItem(dataItem);
        setData(newData);
        setisAlertVisible(false);
    };

    const add = (dataItem: any) => {
        dataItem.inEdit = true;

        const newItem = insertItem(dataItem);
        setItems([newItem, ...items]);
    };

    const update = (dataItem: any) => {
        let shouldAdd = true;

        // check if the grid has the required filed
        for (const req of requiredFields) {
            if (!_.has(dataItem, req)) {
                
                setisAlertVisible(true);
                setAlertMessage(`${req} is Required`);
                shouldAdd = false;
                return;
            }
        }

        if (shouldAdd) {
            dataItem.inEdit = false;
            dataItem.isNew = false;
            const newData = updateItem(dataItem);
            setData(newData);
            setisAlertVisible(false);
        }
    };

    // Local state operations
    const discard = (dataItem: any) => {
        const newData = [...items];
        newData.splice(0, 1);
        setItems(newData);
        setisAlertVisible(false);
    };

    const cancel = (dataItem: any) => {
        const originalItem = data.find((p: any) => p[dataItemKey] === dataItem[dataItemKey]);
        const newData = items.map((item) => (item[dataItemKey] === originalItem[dataItemKey] ? originalItem : item));
        setItems(newData);
        setisAlertVisible(false);
    };

    const enterEdit = (dataItem: any) => {
        let newData = items.map((item) =>
            item[dataItemKey] === dataItem[dataItemKey] ? { ...item, inEdit: true } : item
        );
        // 

        setItems(newData);
    };

    const itemChange = (event: GridItemChangeEvent) => {
        const field = event.field || "";
        const newData = items.map((item) =>
            item[dataItemKey] === event.dataItem[dataItemKey] ? { ...item, [field]: event.value } : item
        );

        setItems(newData);
    };

    const addNew = () => {
        const newDataItem: any = {
            inEdit: true,
            isNew: true,
            ...defaultNewItem
            //   Discontinued: false,
            //   dataItemKey: new Date().getMilliseconds(),
        };
        newDataItem[dataItemKey] = randomNumberGenerator()
        if (items) {
            setItems([newDataItem, ...items]);
        } else {
            setItems([newDataItem]);
        }
    };

    return (
        <span ref={grid} className={Style.gridStyle + " d-block " + gridStyle}>
            {heading && (
                <Row className="align-items-center mx-0 no-gutters py-1 gridPanel  ">
                    <Col className="w-100 ">
                        <p className={style.searchHeading}>{heading}</p>
                    </Col>
                    <Col className="w-100 d-flex justify-content-end align-items-center">
                        {/* <GridToolbar>
                            <button
                                title="Add new"
                                className="w-100 btn btn-primary mt-2 mr-3 ml-2 py-2 px-1 px-xl-2 btn btn-primary btn-lg"
                                onClick={addNew}>
                                Add   <FontAwesomeIcon icon={faPlus} title={"Add"} />
                            </button>
                        </GridToolbar> */}

                        <Button className={"text-nowrap d-inline-flex align-items-center "} onClick={addNew}>
                            <span className="k-icon k-i-plus mr-1" />
                            Add
                        </Button>
                    </Col>
                </Row>
            )}
            {isAlertVisible && (
                <div className="k-messagebox k-messagebox-error" style={{margin:0}}>
                    <Error>{alertMessage}</Error>
                </div>
            )}
            <Grid data={items} onItemChange={itemChange} editField={editField} dataItemKey={"dataItemKey"}>
                {children.map((child: any, index: number) => {
                    if (child.props) {
                        return (
                            <GridColumn
                                // width={setWidth(child.props.minWidth, child.props.maxWidth)}
                                // headerSelectionValue={
                                //     selectedField
                                //         ? state.items.findIndex((item: any) => !selectedState[idGetter(item)]) ===
                                //         -1
                                //         : null
                                // }

                                editable={child.props.field === dataItemKey ? false : true}
                                // cell={child.props.required ? requiredCell : ""}
                                {...child.props}
                            />
                        );
                    }
                })}
                {/* <Column field="id" title="Id" width="50px" editable={false} />
      <Column field="hsCodeExt" title="any Name" />
      <Column field="itemDescription" title="Units" /> */}
                {/* <Column field="Discontinued" title="Discontinued" cell={DropDownCell} /> */}
                <GridColumn cell={CommandCell} />
            </Grid>
        </span>
    );
};

export default GridEditView;
