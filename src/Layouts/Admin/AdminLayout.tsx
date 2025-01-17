import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SideMenu from "./SideMenu/SideMenu";

const AdminLayout = (props: any) => {
  return (
    <Container>
      <Row>
        <Header />
      </Row>
      <Row>
        <Col md={3}>
          <SideMenu />
        </Col>
        <Col md={9}>{props.children}</Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};

export default AdminLayout;
