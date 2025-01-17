import React from "react";
import { Checkbox } from "@progress/kendo-react-inputs";

const checkBox = (props: any) => {
    const { onChange, label, value, name, disabled } = props;

    return (
        <>
            <Checkbox
                {...props}
                disabled={disabled}
                name={name}
                defaultChecked={value}
                label={label}
                onClick={onChange}
            />
        </>
    );
};

export default checkBox;
