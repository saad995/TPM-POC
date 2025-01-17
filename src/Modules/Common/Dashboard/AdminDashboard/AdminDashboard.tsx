import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Container, Row, Col } from "react-bootstrap";
import AdminLayout from "../../../../Layouts/Admin/AdminLayout";

const AdminDashboard = (props: any) => {
  return (
    <AdminLayout>
      <Container>
        <Row>
         <h1>Admin Dashboard</h1>
        </Row>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
