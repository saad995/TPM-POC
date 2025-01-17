import React, { useState, useEffect } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import _ from "lodash";

import "./Dropdown.scss";

interface IProps {
    id?: string;
    handleChange?: any;
    defaultVal?: any;
    data: any;
    isDisable?: boolean;
    disabledItems?: any;
    defaultItem?: any;
    dataItemKey?: string;
    textField?: string;
    placeHolder?:string;
}

const DropDown = (props: IProps) => {
    const {
        id,
        handleChange,
        defaultVal,
        data,
        isDisable,
        disabledItems,
        placeHolder,
        dataItemKey = "value",
        textField = "label"
    } = props;

    let defaultKey = !_.isEmpty(defaultVal)
        ? _.find(data, function (o) {
              return o.label === defaultVal;
          })
        : {
              [textField]: placeHolder?placeHolder:"View",
              [dataItemKey]: -1
          };

    const [state, updateState] = useState({ value: null });

    useEffect(() => {
        updateState({ value:null})
    },[data])

    const isDisabled = (value: any) => {
        if (!_.isEmpty(disabledItems))
            return disabledItems.indexOf(value) !== -1;
    };

    const itemRender = (li: any, itemProps: any) => {
        if (isDisabled(itemProps.dataItem)) {
            const props = {
                ...li.props,
                className: "k-item k-state-disabled"
            };
            return React.cloneElement(li, props, li.props.children);
        }
        return li;
    };

    const onChange = (event: any) => {
        const { value } = event.target;
        if (!isDisabled(value)) {
            updateState({ value });
            handleChange(value[dataItemKey]);
        }
    };


    return (
        <div className="readonly-dropdown">
            <DropDownList
                id={id}
                data={data}
                itemRender={itemRender}
                onChange={onChange}
                dataItemKey={dataItemKey}
                textField={textField}
                defaultValue={defaultKey}
                defaultItem={defaultKey}
                disabled={isDisable}
                value={state.value}
            />
        </div>
    );
};

export default DropDown;
