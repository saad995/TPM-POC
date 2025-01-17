import React from 'react';
import Style from "../../../../Elements/Basic/ViewPanel/ViewPanel.module.scss";
// import { Container } from './styles';

const HeadingWrapper = (props: any) => {
    return <div className={`custom-grid border rounded ${Style.viewPanel}`}>
        <div
            className={
                "px-3 py-2 border-bottom font-semibold bg-light rounded-top " + Style.viewPanelHeading
            }>
            {props.heading}
        </div>
        <div className={props.customClass} >
        {props.children}
        </div>
    </div>
}

export default HeadingWrapper;