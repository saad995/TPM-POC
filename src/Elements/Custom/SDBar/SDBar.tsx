import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import React, { ReactHTMLElement, useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import styles from "./SDBar.module.scss";

export interface iconData {
    iconName: string;
    iconSize: number;
    iconColor: string;
}

export interface itemData {
    icon: iconData;
    label: string;
    content: string;
}

export interface screen {
    title: string;
    callback: any;
}

export interface IProps {
    data: itemData[];
    secondScreen?: screen;
    children?: any;
}

const SDBar = (props: IProps) => {
    const showData = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        if (!e.currentTarget.nextElementSibling?.hasAttribute("id")) {
            document.getElementById("opened-item")?.setAttribute("style", "width: 0;opacity:0");
            document.getElementById("opened-item")?.removeAttribute("id");

            e.currentTarget.nextElementSibling?.setAttribute("id", "opened-item");
            const sectionHeight = e.currentTarget.nextElementSibling?.scrollWidth;
            e.currentTarget.nextElementSibling?.setAttribute("style", "width:" + sectionHeight + "px;opacity:1;");
        } else {
            e.currentTarget.nextElementSibling?.setAttribute("style", "width: 0;opacity:0");
            e.currentTarget.nextElementSibling?.removeAttribute("id");
        }
    };

    return (
        <div className={"w-100 text-light d-flex justify-content-between align-items-center " + styles.barContainer}>
            <span className={"w-100 h-100 d-flex align-items-center px-2"}>
                {props.secondScreen && (
                    <div onClick={props.secondScreen.callback} className={styles.back + " h-100 align-items-center d-flex px-3 mr-2"}>
                        <FontAwesomeIcon icon={faChevronLeft} className={styles.backIcon} />{" "}
                        <p>{props.secondScreen.title}</p>
                    </div>
                )}
                {props.data.map((value: itemData, index: number) => {
                    return (
                        <span
                            className={
                                index == 0
                                    ? "d-flex h-100 align-items-center border-right pr-2"
                                    : index == props.data.length - 1
                                    ? "d-flex h-100 align-items-center pl-2"
                                    : "d-flex h-100 align-items-center border-right px-2"
                            }
                            id={"item-" + index}>
                            <a
                                title={value.label}
                                className={"d-block " + styles.itemIcon}
                                role="button"
                                onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
                                    showData(e);
                                }}>
                                <ImportSVG
                                    name={value.icon.iconName}
                                    size={value.icon.iconSize}
                                    color={value.icon.iconColor}
                                />
                            </a>

                            <span className={styles.dataHidden}>
                                <div>
                                    <p className={"d-inline px-2 " + styles.dataLabel}>{value.label}</p>
                                    <p className={"font-semibold d-inline px-2 " + styles.data}>{value.content}</p>
                                </div>
                            </span>
                        </span>
                    );
                })}
            </span>

            {props.children}
        </div>
    );
};

export default SDBar;