import * as React from "react";
import * as ReactDOM from "react-dom";

import {
    Badge,
    BadgeAlign,
    BadgeContainer,
    BadgeSize,
    BadgeThemeColor,
    Loader
} from "@progress/kendo-react-indicators";
import { ReactChild, ReactFragment, ReactPortal } from "react";



type Children = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

interface IProps {
    children: JSX.Element
    size? : BadgeSize;
    themeColor? : BadgeThemeColor; 
    cutoutBorder? : boolean;
    badgeAlign?: BadgeAlign
}

const Indicator = (props: IProps) => {
    const { 
        children,
        size = "small", 
        themeColor = "success", 
        cutoutBorder = false,
        badgeAlign = { vertical: "top" , horizontal: "end"}
    } = props;

    return (
        <>
            <BadgeContainer>
                    {children}
                <Badge
                    size={size}
                    align={badgeAlign}
                    themeColor={themeColor}
                    cutoutBorder={cutoutBorder}>
                    <span className="k-icon k-i-check" />
                </Badge>
            </BadgeContainer>
        </>
    );
};

export default Indicator;
