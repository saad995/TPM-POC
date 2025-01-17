import React, { useState, useEffect } from "react";

import styles from "./PanelBar.module.scss";

//Import Component
import {
    PanelBar,
    PanelBarItem,
    PanelBarSelectEventArguments
} from "@progress/kendo-react-layout";

export const PanelBarComponent = (props: any) => {
    const { children, className,  ...others } = props;

    return (
        <PanelBar className={styles.panelBar + " " + className} onSelect={() => {}} {...others}>
            {children}
        </PanelBar>
    );
};

export const PanelBarItemComponent = PanelBarItem;
