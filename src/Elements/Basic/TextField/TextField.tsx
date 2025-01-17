import React, { useState, useEffect } from "react";
import _ from "lodash";
import withEditPermission from "../../../Lib/Permissions/EditPermission/EditPermission"
import { Input } from '@progress/kendo-react-inputs';

const TextField = (props: any) => {
  
  return (
    <div>
      <Input
        {...props}
      />
    </div>
  );
};

export default withEditPermission(TextField);
