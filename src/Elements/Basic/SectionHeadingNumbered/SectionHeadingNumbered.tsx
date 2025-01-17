import React from "react";
import "./SectionHeadingNumbered.scss";
import { Col, Row } from "react-bootstrap";

export interface SectionHeadingNumberedProps {
    heading: string;
    number: number;
    id?: string;

    showHorizontalRule?: boolean;
}

export interface SectionHeadingNumberedState {}

const SectionHeadingNumbered = (props: SectionHeadingNumberedProps) => {
    return (
        <>
            <Row id={props.id} className="justify-content-center">
                <Col className="num-head-container pt-3">
                    <div id={props.id + "-number-container"} className="number">
                        <p id={props.id + "-number"} className="digit">
                            {props.number}
                        </p>
                    </div>

                    <p
                        id={props.id + "-main"}
                        className="numbered-section-heading ml-md-2 w-100 line"
                    >
                        {props.heading}
                    </p>
                </Col>
            </Row>
        </>
    );
};
export default SectionHeadingNumbered;
