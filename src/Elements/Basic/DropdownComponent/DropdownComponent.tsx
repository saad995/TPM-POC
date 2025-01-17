import React, { useState, useEffect } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import _ from "lodash";

import "./DropdownComponent.scss";

const DropDownComponent = (props: any) => {
    const {
        handleChange,
        defaultVal,
        data,
        isDisable,
        disabledItems,
        defaultItem,
        selectedValue
    } = props; 

    let defaultKey = !_.isEmpty(defaultVal)
        ? _.find(data, function (o) {
              return o.label === defaultVal;
          })
        : {
              label: "View",
              value: -1
          };


    const [state, updateState] = useState({ value: null });

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
            handleChange(value.value);
        }
    };

    return (
        <div className="readonly-dropdown">
            <DropDownList
                data={data}
                itemRender={itemRender}
                onChange={onChange}
                dataItemKey={"value"}
                textField={"label"}
                defaultValue={defaultKey}
                defaultItem={defaultKey}
                disabled={isDisable}
                value={selectedValue}
            />
        </div>
    );
};

export default DropDownComponent;

//https://stackblitz.com/edit/react-dropdown-list-with-disabled-items-xdq65x?file=app%2Fmain.js
