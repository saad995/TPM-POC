import React from "react";
import { Col, Row } from "react-bootstrap";
import { Rtif } from "../../../Lib/Helpers/Rtif";
import "./SectionHeading.scss";

export interface SectionHeadingProps {
    heading?: string;
    subHeading?: string;
    classes?: string;
    id?: string;

    xs?: any;
    sm?: any;
    md?: any;
    lg?: any;
    xl?: any;
}

const SectionHeading = (props: SectionHeadingProps) => {
    return (
        <>
            <Row id={props.id} className={props.classes}>
                <Col
                    xl={props.xl}
                    lg={props.lg}
                    md={props.md}
                    sm={props.sm}
                    xs={props.xs}
                >
                    <Rtif boolean={props.heading}>
                        <h4 id={props.id + "-main"} className="section-heading">
                            {props.heading}
                        </h4>
                    </Rtif>
                    <Rtif boolean={props.subHeading}>
                        <p
                            id={props.id + "-sub"}
                            className="p2 section-sub-heading"
                        >
                            {props.subHeading}
                        </p>
                    </Rtif>
                </Col>
            </Row>
        </>
    );
};
export default SectionHeading;
