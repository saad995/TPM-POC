import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Loader,
    LoaderSize,
    LoaderThemeColor,
    LoaderType
} from "@progress/kendo-react-indicators";

interface IProps {
    type?: LoaderType;
    color?: LoaderThemeColor;
    size?: LoaderSize;
}

const Indicator = (props: IProps) => {
    const { color = "primary", type = "pulsing", size="small" } = props;

    return (
        <>
            <Loader themeColor={color} type={type} size={size}/>
        </>
    );
};

export default Indicator;
