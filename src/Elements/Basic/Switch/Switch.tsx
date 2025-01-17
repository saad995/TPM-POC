import React, { useState } from "react";
import { Switch, SwitchChangeEvent } from "@progress/kendo-react-inputs";
import Style from "./Switch.module.scss";

interface IProps {
    handleChange: any;
    disabled?: boolean;
    defaultChecked?: boolean;
    checked?: boolean;
    switchStyle?: "switch";
}


const SwitchComponent = (props: IProps) => {
    const { disabled = false, handleChange, defaultChecked, checked, switchStyle, ...others } = props;
    const [defaultCheck, setDefaultCheck] = useState(defaultChecked);
    const [check, setCheck] = useState();
    const styleClassName = switchStyle ?? '';

 

    const onChange = (event: SwitchChangeEvent) => {
        setDefaultCheck(defaultChecked);
        setCheck(check);
        handleChange(event.target);
    };

 

    return (
        <Switch className={styleClassName}
            onChange={onChange}
            checked={check}
            disabled={disabled}
            defaultChecked={defaultCheck}
            {...others}
        />
    );
};

 

export default SwitchComponent;