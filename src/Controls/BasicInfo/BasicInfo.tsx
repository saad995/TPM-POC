import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Row, Col, Container } from "react-bootstrap";
import TextField from "../../Elements/Basic/TextField/TextField";
import CountryDropDown from "../../Elements/Custom/CountryDropDown/CountryDropDown";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import ViewPermission from "../../Lib/Permissions/ViewPermission/ViewPermission"

import validator from "Validators/validation";

interface IObjectKeys {
  [key: string]: string | number | undefined;
}

const BasicInfo = (props: any) => {
  const { mode, permissions, data } = props;
  const state: IObjectKeys = {
    FirstName: "",
    LastName: "",
  };

  const onchange = (e: any) => {
    state[e.target.name] = e.target.value;
  };

  return (
    <Container>
      <Row>
        {/* {_.isEqual(permissions.FirstName & 1, 1) ? (
          <Col>
            <Container>
              <Row>
                <Col md="3">
                  <Field
                    component={TextField}
                    mode={mode}
                    permissions={permissions.FirstName}
                    onchange={onchange}
                    name="FirstName"
                    minlength={1}
                    maxlength={10}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        ) : null} */}

          <ViewPermission name="FirstName" permissions={permissions}>
          <Col>
            <Container>
              <Row>
                <Col md="3">
                  <Field
                    component={TextField}
                    mode={mode}
                    permissions={permissions.FirstName}
                    onchange={onchange}
                    name="FirstName"
                    minlength={1}
                    maxlength={10}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
          </ViewPermission>
        

        {_.isEqual(permissions.LastName & 1, 1) ? (
          <Col>
            <Container>
              <Row>
                <Col md="3">
                  <p>Last Name</p>
                </Col>
                <Col>
                  <CountryDropDown  mode={mode}
                    permissions={permissions.FirstName} 
                    defaultVal="Pakistan"
                    />
                </Col>
              </Row>
            </Container>
          </Col>
        ) : null}

      </Row>
    </Container>
  );
};

export default BasicInfo;
