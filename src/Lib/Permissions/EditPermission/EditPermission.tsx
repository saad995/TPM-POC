import React, { useState, useEffect } from "react";
import _ from "lodash";

const EditPermission = (Component: any) => (props: any) => {
  const { mode, permissions, value, defaultValue, label } = props;

  let disable = _.isEqual(permissions & 2, 2) ? false : true;

  return (
    <div>
      {_.isEqual(mode, "View") ? (
        <div>
          <span className="k-textbox-container">
            <p>{_.isEqual(value, undefined) ? defaultValue : value}</p>
            <label className="k-label">{label}</label>
          </span>
        </div>
      ) : null}

      {_.isEqual(mode, "Edit") ? (
        <Component {...props} disabled={disable} />
      ) : null}
    </div>
  );
};

export default EditPermission;
