import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const BlankLayout = (props: any) => {
    return (
        <Container>
            <Row>
                <Col>{props.children}</Col>
            </Row>
        </Container>
    );
};

export default BlankLayout;
