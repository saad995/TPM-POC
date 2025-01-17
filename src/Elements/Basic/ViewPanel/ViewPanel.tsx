import React, { useEffect, useState } from "react";
import _, { size } from "lodash";
import { Row, Col } from "react-bootstrap";
import Style from "./ViewPanel.module.scss";
import { Label } from "@progress/kendo-react-labels";
import ComponentResizer, { SizeChecker } from "Lib/Helpers/InternalComponentResizer";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "@progress/kendo-react-tooltip";
import { setToastr, ToasterTypes } from "Modules/Common/Helpers/ToastrConfig";
import { copyToClipboard } from "Modules/Common/CommonUtility";
import { useDispatch } from "react-redux";

interface IKeys {
    field: string,
    isCopy?: boolean
}
interface IProps {
    data?: any;
    labels?: string[];
    keys?: any[];
    span?: span[];
    children?: any;
    heading?: any;
    ClassName?: any;
    size?: string;
    changed?: number[];
    changeColor?: string;
}

interface span {
    xs?: any;
    sm?: any;
    md?: any;
    lg?: any;
    xl?: any;
    underlineOverrideXs?: any;
    underlineOverrideSm?: any;
    underlineOverrideMd?: any;
    underlineOverrideLg?: any;
    underlineOverrideXl?: any;
}

const ViewPanel = (props: IProps) => {
    const {
        data = {},
        labels = [],
        keys = [],
        span = [],
        children,
        heading,
        ClassName,
        size,
        changed,
        changeColor
    } = props;
    const dispatch = useDispatch();
    const getKeys = keys.map((key) => key?.field);
    const obj = _.pick(data, getKeys);
    
    let items = Object.entries(obj).map((item: any, index: number) => {

        if (item[1] !== undefined && item[1] !== null && item[1] !== "" && item[1] !== "N/A") {
            return {
                label: labels[index] ? labels[index] : item[0], isCopy: keys[index]?.isCopy ? true : false,
                value: item[1] ? item[1] : "N/A",
                changed: changed != undefined ? changed[index] : 0
            };
        } else {

        }
    });
    items = items.filter((element: any) => {
        return element !== undefined;
    });



    useEffect(() => {

        UnderlineCalculation();
    }, [props.data]);


    const [totalUnderline, setTotalUnderline] = useState(0);
    // const [items, setItems] = useState(itemsArray);
    const [customTotalUnderline, setCustomTotalUnderline] = useState(0);

    let divider = 0;

    const callRerender = (x: any, y: any, z: any) => {
        if (x) {
            UnderlineCalculation(items.length, 4, true);
        } else if (y) {
            UnderlineCalculation(items.length, 3, true);
        } else if (z) {
            UnderlineCalculation(items.length, 2, true);
        } else {
            UnderlineCalculation(items.length, 1, true);
        }
    };

    const UnderlineCalculation = (n: number = items.length, x: number = 4, isCustom: boolean = false) => {
        // let count:number=n;

        if (!isCustom) {
            if (n % x != 0) {
                setTotalUnderline(Math.floor(n / x) * x);
            } else {

                setTotalUnderline((Math.floor(n / x) - 1) * x);
            }
        } else {
            if (n % x != 0) {
                setCustomTotalUnderline(Math.floor(n / x) * x);
            } else {
                setCustomTotalUnderline((Math.floor(n / x) - 1) * x);
            }
        }

        // console.log("x",x,"n",n)

    }

    const myFunction = (x: any, y: any, z: any) => {
        if (x.matches) {
            // If media query matches
            divider = 4;
        } else if (y.matches) {
            divider = 3;
        } else if (z.matches) {
            divider = 2;
        } else {
            divider = 1;
        }
        UnderlineCalculation(items.length, divider);
    };

    useEffect(() => {
        //Saad's Lines
        const x = window.matchMedia("(min-width: 1200px)");
        const y = window.matchMedia("(min-width: 992px)");
        const z = window.matchMedia("(min-width: 526px)");
        myFunction(x, y, z); // Call listener function at run time
        x.addEventListener("change", () => {
            myFunction(x, y, z);
        });
        y.addEventListener("change", () => {
            myFunction(x, y, z);
        });
        z.addEventListener("change", () => {
            myFunction(x, y, z);
        });
    }, []);

    //Row Handler
    const [rowHandler, setRowHandler] = useState("");

    useEffect(() => {
        setRowHandler(
            ComponentResizer(size, "row-cols-1", callRerender) +
            " " +
            ComponentResizer(size, "row-cols-sm-2", callRerender) +
            " " +
            ComponentResizer(size, "row-cols-md-2", callRerender) +
            " " +
            ComponentResizer(size, "row-cols-lg-3", callRerender) +
            " " +
            ComponentResizer(size, "row-cols-xl-4", callRerender)
        );
    }, [size]);

    // console.log('test')
    const customCopyToClipboard = (text:any) =>{
        copyToClipboard(text);
        dispatch(
            setToastr({
                title: "Success",
                message: "Copied",
                type: ToasterTypes.SUCCESS
            })
        );
    }
    return (
        <>
            <div className={`custom-grid border rounded ${Style.viewPanel} ${ClassName}`}>
                {heading && (
                    <div
                        className={
                            "px-3 py-2 border-bottom font-semibold bg-light rounded-top " + Style.viewPanelHeading
                        }>
                        {heading}
                    </div>
                )}
                {_.isEmpty(data) && <p className="text-center pt-2" >No Data Found</p>}
                <Row
                    className={
                        "mx-0 pt-2 pb-1 " + rowHandler
                        // (size ? customSizeOverride(size) : "")
                    }>
                    {items.map((item: any, index: number) => {
                        // 
                        let overrideStyle = " ";
                        let overrideSize = " ";

                        return (
                            <>
                                {!_.isEqual(item, "") &&
                                !_.isEqual(item, undefined) &&
                                !_.isEqual(item, null) &&
                                !_.isEqual(item.value, "N/A") ? (
                                    <Col
                                        className={
                                            index + 1 <= (size != undefined ? customTotalUnderline : totalUnderline)
                                                ? "form-group pb-3 " +
                                                  " " +
                                                  Style.dottedBorder +
                                                  overrideStyle +
                                                  overrideSize
                                                : Style.lastItem + overrideSize
                                            //+ Style.dottedBorder // to-do
                                        }
                                        key={item.label}>
                                        <Label
                                            // className={item.changed ? Style.changeColor : "" + "text-muted"}
                                            style={{ color: item.changed ? changeColor : "" }}>
                                            {item.label}
                                        </Label>
                                        <br />
                                        <div className="d-flex align-items-center">
                                            <p
                                                className={item.changed ? Style.changeColor : ""} //Style.changeColorGreen +
                                                style={{ color: item.changed ? changeColor : "" }}>
                                                <strong>{item.value}</strong>
                                            </p>
                                            <p>
                                                {item.isCopy ? (
                                                    <Tooltip
                                                        content={() => "Copy"}
                                                        anchorElement="target"
                                                        openDelay={15}
                                                        position="top"
                                                        tooltipClassName={`${Style.custom_tooltip}`}
                                                        parentTitle={true}>
                                                        <div title="Copy" className="ml-4">
                                                            <FontAwesomeIcon
                                                                        onClick={() => customCopyToClipboard(item.value)}
                                                                        icon={faCopy}
                                                                        title="Copy"
                                                                        color="#222222"
                                                                        style={{ fontSize: 15, cursor: 'pointer' }}
                                         
                                                                        />
                                                            
                                                        </div>
                                                    </Tooltip>
                                                ) : (
                                                    <></>
                                                )}
                                            </p>
                                        </div>
                                    </Col>
                                ) : null}
                            </>
                        );
                    })}
                    {children}
                </Row>
            </div>
        </>
    );
};

export default ViewPanel;
