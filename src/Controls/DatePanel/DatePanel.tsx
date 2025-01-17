import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import _ from "lodash";

//import Styles
import Styles from "./DatePanel.module.scss";

//import Components
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Chip } from "@progress/kendo-react-buttons";
import { Row, Col } from "react-bootstrap";
import Radio from "Elements/Basic/Radio/Radio";
import { DatePicker } from "@progress/kendo-react-dateinputs";

//Import Actions
import { getDateCriteria } from "./DatePanelActions";

import { clearAlert, errorAlert } from "Elements/Basic/AlertDismissible/AlertDismissibleActions";
import { IMessage } from "Elements/Basic/AlertDismissible/AlertDismissibleInterfaces";

const monthsData = [
    {
        id: 0,
        name: "January",
        disable: false
    },
    {
        id: 1,
        name: "February",
        disable: false
    },
    {
        id: 2,
        name: "March",
        disable: true
    },
    {
        id: 3,
        name: "April",
        disable: true
    },
    {
        id: 4,
        name: "May",
        disable: true
    },
    {
        id: 5,
        name: "June",
        disable: true
    },
    {
        id: 6,
        name: "July",
        disable: true
    },
    {
        id: 7,
        name: "August",
        disable: true
    },
    {
        id: 8,
        name: "September",
        disable: true
    },
    {
        id: 9,
        name: "October",
        disable: true
    },
    {
        id: 10,
        name: "November",
        disable: true
    },
    {
        id: 11,
        name: "December",
        disable: true
    }
];



const DatePanel = (props: any) => {
    const {} = props;
    let d = new Date();
    let currentMonth = d.getMonth();
    let updatedMonths = monthsData.map((item) => {
        return Object.assign(item, {
            ...item,
            select: currentMonth === item.id,
            type: currentMonth === item.id ? "success" : ""
        });
    });
    const generateArrayOfYears = () => {
        const max = new Date().getFullYear();
        const min = max - 1;
        const years = [];
    
        for (let i = max; i >= min; i--) {
            years.push(i);
        }
        return years;
    };
    let y = generateArrayOfYears().map((item) => {
        return {
            label: item,
            value: item
        };
    });

    const dispatch = useDispatch();
    const [years, setYears] = useState<any>(y);
    const [year, setYear] = useState<any>(y[0]);
    const [month, setMonth] = useState<any>(currentMonth);
    const [months, setMonths] = useState<any>(_.cloneDeep(updatedMonths));
    const [radioState, setRadioState] = useState<any>("auto");
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());
    const [request, setRequest] = useState({
        fromDate: moment(new Date()).format("YYYY-MM-DD"),
        toDate: moment(new Date()).format("YYYY-MM-DD"),
        isManual: false
    });

    //=========================== Manual Request =================================//

    const fromDateHanlder = (e: any) => {
        let req = { ...request };
        Object.assign(req, {
            fromDate: moment(e.target.value).format("YYYY-MM-DD")
        });
        setFromDate(e.target.value);
        setRequest(req);
    };

    const toDateHanlder = (e: any) => {
        let req = { ...request };
        Object.assign(req, {
            toDate: moment(e.target.value).format("YYYY-MM-DD")
        });
        setToDate(e.target.value);
        setRequest(req);
    };

    //===================================================================================//

    //=========================== Auto Request =================================//

    const yearHanlder = (e : any) => {
        const {value} = e.target;
        let req = { ...request };
        Object.assign(req, {
            fromDate: moment(new Date(value.value, month, 1, 0, 0, 0, 0)).format("YYYY-MM-DD"),
            toDate: moment(new Date(value.value, month, 1, 0, 0, 0, 0)).endOf("month").format("YYYY-MM-DD")
        });
        setYear(value);
        setRequest(req);
    };

    const monthHanlder = (value: any) => {
        let req = { ...request };
        let monthArray = [...months];
        Object.assign(req, {
            fromDate: moment(new Date(year.value, value, 1, 0, 0, 0, 0)).format("YYYY-MM-DD"),
            toDate: moment(new Date(year.value, value, 1, 0, 0, 0, 0)).endOf("month").format("YYYY-MM-DD")
        });
        monthArray.map((item) => {
            Object.assign(item, {
                select: item.id === value ? true : false,
                type: item.id === value ? "success" : "none"
            });
        });
        setMonth(value);
        setMonths(monthArray);
        setRequest(req);
    };

    //===================================================================================//

    useEffect(() => {
        dispatch(getDateCriteria(request));
        return () => {
            clearAlertMessage();
            setYears([]);
            setYear(y[0]);
            setMonth(currentMonth);
            setMonths(_.cloneDeep(updatedMonths));
            setFromDate(new Date());
            setToDate(new Date());
            setMonth(0);
            setRequest({
                fromDate: moment(new Date()).format("YYYY-MM-DD"),
                toDate: moment(new Date()).format("YYYY-MM-DD"),
                isManual: false
            });
            setRadioState("auto");
        };
    }, []);
   
    useEffect(() => {
        clearAlertMessage();
        let req = { ...request };
        let a = new Date(fromDate);
        let b = new Date(toDate);
        if (a.getTime() > b.getTime() && radioState === "manual") {
            const msg: IMessage = {
                code: "400",
                description: "From Date is not greater than To Date"
            };
            dispatch(errorAlert(msg));
            return;
        }
        if (radioState === "auto") {
            req = Object.assign(req, {
                fromDate: moment(new Date(year.value, month, 1, 0, 0, 0, 0)).format("YYYY-MM-DD"),
                toDate: moment(new Date(year.value, month, 1, 0, 0, 0, 0)).endOf("month").format("YYYY-MM-DD"),
                isManual: true
            });
        } else {
            req = Object.assign(req, {
                fromDate: moment(fromDate).format("YYYY-MM-DD"),
                toDate: moment(toDate).format("YYYY-MM-DD"),
                isManual: false
            });
        }
        dispatch(getDateCriteria(req));
    }, [request, radioState]);

    //===========================Handlers ========================================//

    const radioHanlder = (value: any) => {
        setRadioState(value);
    };

    const onFocus = () => {
        clearAlertMessage();
    };

    //=============================================================================//

    const clearAlertMessage = () => {
        const msg: IMessage = {
            code: "",
            description: ""
        };
        dispatch(errorAlert(msg));
    };

    return (
        <div className={`border shadow-sm rounded p-3 ${Styles.viewPanel}`}>
            <Row>
                <Col className={"d-flex border-right " + Styles.selectedPanels}>
                    <div className="mr-3">
                        <Radio defaultVal={"auto"} value={radioState} onChangeHandler={radioHanlder} />
                    </div>
                    <div>
                        <Row>
                            <Col xs="12" md="6">
                                <strong>
                                    <p id="agency-sites-label" className="mb-1">
                                        {"Year"}
                                    </p>
                                </strong>
                                <DropDownList
                                    id={"year"}
                                    onChange={yearHanlder}
                                    data={years}
                                    dataItemKey={"value"}
                                    textField={"label"}
                                    disabled={radioState === "manual" ? true : false}
                                    value={year}
                                />
                            </Col>
                        </Row>
                        <Row className={"mt-3"}>
                            <Col>
                                {months.map((item: any, index: any) => {
                                    return (
                                        <Chip
                                            key={index}
                                            text={item.name}
                                            value={item.id}
                                            className={
                                                "mr-2 registeration-chip form-group" + (item.select ? " mt-1" : "")
                                            }
                                            disabled={radioState === "manual" ? true : false}
                                            type={item.type}
                                            selected={item.select}
                                            onClick={(e: any) => {
                                                monthHanlder(item.id);
                                            }}
                                        />
                                    );
                                })}
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col className={"d-flex " + Styles.selectedPanels}>
                    <div>
                        <Radio value={radioState} defaultVal={"manual"} onChangeHandler={radioHanlder} />
                    </div>
                    <Row className="mx-0 w-100">
                        <Col xs="12" md="6">
                            <strong>
                                <p id="agency-sites-label" className="mb-1">
                                    {"From Date"}
                                </p>
                            </strong>
                            <DatePicker
                                onFocus={onFocus}
                                name={"fromDate"}
                                defaultValue={fromDate}
                                format={"dd-MMM-yyyy"}
                                weekNumber={true}
                                onChange={fromDateHanlder}
                                disabled={radioState === "auto" ? true : false}
                            />
                        </Col>
                        <Col xs="12" md="6">
                            <strong>
                                <p id="agency-sites-label" className="mb-1">
                                    {"To Date"}
                                </p>
                            </strong>
                            <DatePicker
                                onFocus={onFocus}
                                name={"toDate"}
                                defaultValue={toDate}
                                format={"dd-MMM-yyyy"}
                                weekNumber={true}
                                onChange={toDateHanlder}
                                disabled={radioState === "auto" ? true : false}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default DatePanel;
