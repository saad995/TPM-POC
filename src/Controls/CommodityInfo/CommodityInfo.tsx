import React, { useState, useEffect } from "react";
import _ from "lodash";

import { Row, Col } from "react-bootstrap";
import TextField from "../../Elements/Basic/TextField/TextField";

interface IObjectKeys {
  [key: string]: string | number | undefined;
}

const CommodityInfo = (props: any) => {
  const { mode, permissions, data } = props;
  const state:IObjectKeys = {
    HSCode: "",
    Description: "",
  };

  const onchange = (e: any) => {
    state[e.target.name] = e.target.value;
  };

  return (
    <div className="container">
      <Row>
       <Col>
       {_.isEqual(permissions.HSCode & 1, 1) ? (
          <>
            <Col md="2">
              <h3>HS Code</h3>
            </Col>
            <Col md="4">
              <TextField
                mode={mode}
                permissions={permissions.HSCode}
                onchange={onchange}
                name="HSCode" 
                min={1}
                max={10}
                defaultValue={"asdasd"}
              />
            </Col>
          </>
        ) : null}

        {_.isEqual(permissions.Description & 1, 1) ? (
          <>
            <Col md="2">
              <h3>Description</h3>
            </Col>
            <Col md="4">
              <TextField
                mode={mode}
                permissions={permissions.Description}
                onchange={onchange}
                name="Description"
                min={1}
                max={10}
              />
            </Col>
          </>
        ) : null}
       </Col>
      </Row>
    </div>
  );
};

export default CommodityInfo;
