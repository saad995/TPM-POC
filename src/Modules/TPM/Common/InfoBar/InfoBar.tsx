import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MultiCarousel from "Elements/Basic/Carousel/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faThLarge } from "@fortawesome/free-solid-svg-icons";

import styles from "./InfoBar.module.scss";
const InfoBar = (props: any) => {
    const { children, size } = props;
    const [isTopRowExpanded, setTopRowExpanded] = useState(false);
    const [items, setItems] = useState(0);

    const ItemCalculator = (ParamSize: string) => {
        let onlyDigits = ParamSize.slice(0, -2);
        let elementSize = parseInt(onlyDigits);

        if (elementSize > 1024) {
            return 4;
        } else if (elementSize > 464) {
            return 2;
        } else {
            return 1;
        }
    };

    useEffect(() => {
        if (size) setItems(ItemCalculator(size));
    });
    const CarouselPanel = (
        <>
            <button
                className={"btn border-left rounded-0 h-100 w-100 text-light "+styles.expandBtn}
                onClick={() => {
                    setTopRowExpanded(true);
                }}>
                <FontAwesomeIcon icon={faThLarge} className="mr-1" />
                Expand
            </button>
        </>
    );

    const CustomRightArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <button
                className={"btn text-light rounded-0 position-absolute "+styles.expandBtn}
                style={{ right: "0", top: "0", bottom: "0"}}
                onClick={() => onClick()}>
                {" "}
                <FontAwesomeIcon icon={faChevronRight} />{" "}
            </button>
        );
    };

    const CustomLeftArrow = ({ onClick, ...rest }: any) => {
        const {
            onMove,
            carouselState: { currentSlide, deviceType }
        } = rest;
        // onMove means if dragging or swiping in progress.
        return (
            <button
                className="d-none btn btn-obsedian rounded-0 position-absolute"
                style={{ left: "0", top: "0", bottom: "0" }}
                onClick={() => onClick()}>
                {" "}
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        );
    };
    return (
        <>
            {isTopRowExpanded ? (
                <>
                    <Row
                        style={{ background: "linear-gradient(to right,#3E5277,#516891)", color: "white" }}
                        className="mx-0 mt-3 align-items-center rounded-top"
                        xs="2"
                        md="3">
                        {children}
                    </Row>
                    <Row className={"border-top mx-0 rounded-bottom"} style={{background: "linear-gradient(to right,#3E5277,#516891)"}}>
                        <Col
                            onClick={() => {
                                setTopRowExpanded(false);
                            }}
                            className={"text-light btn text-center py-1 "+styles.expandBtn}>
                            <p>
                                <FontAwesomeIcon icon={faThLarge} className="mr-1" /> Collapse
                            </p>
                        </Col>
                    </Row>
                </>
            ) : (
                <Row className="mx-0 mt-3">
                    <Col className="rounded-left" xs="10" sm="11">
                        <MultiCarousel
                            infinite={true}
                            draggable={false}
                            keyBoardControl={true}
                            customitems={items}
                            customRightArrow={<CustomRightArrow />}
                            customLeftArrow={<CustomLeftArrow />}
                            className={"row align-items-center rounded-left " + styles.obsedianBG}>
                            {children}
                        </MultiCarousel>
                    </Col>
                    <Col xs="2" sm="1" style={{backgroundColor:"#516891"}} className="p-0 rounded-right" >
                        {CarouselPanel}
                    </Col>
                </Row>
            )}
        </>
    );
};

export default InfoBar;
