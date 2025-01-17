import React, { useState, useEffect } from "react";
import _ from "lodash";


interface MyProps {
  children?: React.ReactNode;
  permissions:any;
  name:string
}

const ViewPermission = (props: MyProps) => {
  const { permissions, name, children } = props;

  return (
    <>{_.isEqual(permissions[name] & 1, 1) && children }</>
  );
};

export default ViewPermission;
