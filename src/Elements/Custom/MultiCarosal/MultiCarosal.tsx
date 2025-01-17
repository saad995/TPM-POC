import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import MultiCarousel from "Elements/Basic/Carousel/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faThLarge } from "@fortawesome/free-solid-svg-icons";

import styles from "./MultiCarosal.module.scss";
const MultiCarosal = (props: any) => {
    const { children, isExpanded } = props;
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

    const CarouselPanel = (
        <>
            <button
                className="btn border-left rounded-0 btn-obsedian h-100 w-100 text-light"
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
                className={"btn btn-obsedian rounded-0 position-absolute " + styles.carouselBtn}
                style={{ right: "0", top: "0", bottom: "0" }}
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
                className={"btn btn-obsedian rounded-0 position-absolute " + styles.carouselBtn}
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
                        style={{ backgroundColor: "#595F8A", color: "white" }}
                        className=" align-items-center mx-0"
                        xs="2"
                        md="3">
                        {children}
                    </Row>
                    <Row className="bg-obsedian mx-0">
                        <Col
                            onClick={() => {
                                setTopRowExpanded(false);
                            }}
                            className="text-light btn btn-obsedian text-center py-1">
                            <p>
                                <FontAwesomeIcon icon={faThLarge} className="mr-1" /> Collapse
                            </p>
                        </Col>
                    </Row>
                </>
            ) : (
                <Row className={"mx-0 "+styles.carousel}>
                    <Col xs={10} sm={11}>
                        <MultiCarousel
                            infinite={true}
                            keyBoardControl={true}
                            customitems={items}
                            customRightArrow={<CustomRightArrow />}
                            customLeftArrow={<CustomLeftArrow />}
                            className={"row align-items-center " + styles.obsedianBG}>
                            {children}
                        </MultiCarousel>
                    </Col>
                    {isExpanded && <Col xs="2" sm="1" className="p-0 bg-obsedian ">
                        {CarouselPanel}
                    </Col>}
                </Row>
            )}
        </>
    );
};

export default MultiCarosal;
