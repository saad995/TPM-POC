import _ from "lodash";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import React, { useState, useEffect } from "react";

//Import SCSS
import styles from "./AutoTabstrip.module.scss";

interface IProps {
    children: any;
    className?: string;
    parentClass?: string;
    tabPosition?: "top" | "left";
    selected: number;
    animation?: boolean;
    onSelect?: any;
    isManual?:boolean;
}


// Function to activate Sub Tabs
export const subTabActivate = (tabIndex: number) => {
    //Getting Tabstrip Parent Div
    let obj = document.getElementById("steps")?.children[0].children[0]
        .children[0].children;

    //True only if found children
    if (obj) {
        //Removing Active State from previous Tab
        obj[tabIndex - 1].classList.add("k-state-default");
        obj[tabIndex - 1].classList.remove("k-state-active");
        obj[tabIndex - 1].classList.remove("k-tab-on-top");

        //Adding Active State to Sub Tab
        obj[tabIndex].classList.remove("k-state-default");
        obj[tabIndex].classList.add("k-state-active");
        obj[tabIndex].classList.add("k-tab-on-top");
    }
};

// Function to deactivate Sub Tab
export const subTabDeactivate = (tabIndex: number) => {
    //Getting Tabstrip Parent Div
    let obj = document.getElementById("steps")?.children[0].children[0]
        .children[0].children;

    //True only if found children
    if (obj) {
        //Adding Active State to Sub Tab
        obj[tabIndex].classList.add("k-state-default");
        obj[tabIndex].classList.remove("k-state-active");
        obj[tabIndex].classList.remove("k-tab-on-top");
    }
};

const AutoTabstrip = (props: IProps) => {
    let classStyle = "tabs";

    const {
        children,
        className,
        parentClass,
        tabPosition,
        selected = 0,
        animation = false,
        onSelect,
        isManual = false,
        ...others
    } = props;
    const [tabPos, setTabPos] = useState(tabPosition);

    let tabAlign = isManual ? styles.verticalManualTabs : styles.verticalAutoTabs
    let tabClass = isManual ? styles.ManualTabs : styles.AutoTabs;

    if (!_.isEmpty(tabPosition)) {
        classStyle = _.isEqual(tabPosition, "left")
            ? tabAlign
            : "tabs";
    } else {
        classStyle = tabPos === "left" ? tabAlign : "tabs";
    }

    useEffect(() => {
        const x = window.matchMedia("(min-width: 992px)");
        myFunction(x); // Call listener function at run time
        x.addEventListener("change", () => {
            myFunction(x);
        });
    }, []);

    const myFunction = (x: any) => {
        if (x.matches) {
            // If media query matches
            setTabPos("left");
        } else {
            setTabPos("top");
        }
    };

    return (
        <div className={classStyle +" "+parentClass}>
            <TabStrip
                {...others}
                className={`${className} ${tabClass}`}
                tabPosition={tabPosition ? tabPosition : tabPos}
                selected={selected}
                animation={animation}
                onSelect={onSelect}>
                {children}
            </TabStrip>
        </div>
    );
};

export default AutoTabstrip;
