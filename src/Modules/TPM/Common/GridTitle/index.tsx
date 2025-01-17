import React from "react";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";

const GridTitle = (props: any) => {
    const { isCountHide, isContentIconShow, contentIcon } = props;
    return (
        <React.Fragment>
            <BadgeContainer>
                <span className="pr-5">{props.content} {isContentIconShow ? contentIcon: ''}</span>
                {!isCountHide ? (
                    <Badge shape="rounded" fill="outline">
                        {props.count}
                    </Badge>
                ) : null}
            </BadgeContainer>
        </React.Fragment>
    );
};
export default GridTitle;
