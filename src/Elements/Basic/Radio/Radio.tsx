import React from "react";
import {
    RadioButton,
    RadioButtonChangeEvent
} from "@progress/kendo-react-inputs";

interface IProps {
    defaultVal: any;
    label?: string;
    value: string;
    onChangeHandler:any;
}

const Radio = (props: IProps) => {
    const { defaultVal, value, label, onChangeHandler,...others } = props;

    const [selectedValue, setSelectedValue] = React.useState(defaultVal);
    const handleChange = React.useCallback(
        (e: RadioButtonChangeEvent) => {
            setSelectedValue(e.value);
            onChangeHandler(e.value);
        },
        [setSelectedValue]
    );

    return (
        <RadioButton
            {...others}
            value={selectedValue}
            checked={selectedValue === value}
            label={label}
            onChange={handleChange}
        />
    );
};

export default Radio;
