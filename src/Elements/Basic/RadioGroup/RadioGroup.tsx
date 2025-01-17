import React from "react";
import { RadioGroup } from "@progress/kendo-react-inputs";

const radioGroup = (props: any) => {
    const { onChange, data, disabled, checked } = props;

    return (
        <>
            <RadioGroup
                {...props}
                data={data}
                disabled={disabled}
                onChange={onChange}
                value={checked}
            />
        </>
    );
};

export default radioGroup;
