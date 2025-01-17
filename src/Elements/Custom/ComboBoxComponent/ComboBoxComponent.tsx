import React from "react";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import _ from "lodash";

import "./ComboBoxComponent.scss";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label, Error } from "@progress/kendo-react-labels";

const ComboBoxComponent = (props: any) => {
    const {
        defaultVal,
        data,
        isDisable,
        disabledItems,
        defaultItem,
        dataItemKey,
        textField,
        validationMessage,
        visited,
        id,
        valid,
        placeholder,
        label,
        required,
        suggest,
        filterable,
        onFilterChange,
        ...others
    } = props;

    const showValidationMessage = visited && validationMessage;

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

    return (
        <>
            <FieldWrapper>
                <Label
                    editorId={id}
                    editorValid={valid}
                    style={{
                        width: "100%",
                        alignItems: "flex-start",
                        whiteSpace: "nowrap"
                    }}
                >
                    {label}
                </Label>
                <ComboBox
                    data={data}
                    itemRender={itemRender}
                    dataItemKey={dataItemKey}
                    textField={textField}
                    defaultValue={defaultVal}
                    defaultItem={defaultItem}
                    disabled={isDisable}
                    placeholder={placeholder}
                    required={required}
                    suggest={suggest}
                    filterable={filterable}
                    onFilterChange={onFilterChange}
                    {...others}
                />
            </FieldWrapper>
            {showValidationMessage && (
                <Error>{validationMessage}</Error>
            )}
        </>
    );
};

export default ComboBoxComponent;
