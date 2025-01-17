import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import TextField from "../TextField/TextField";

const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const emailValidator = (value: any) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";
const EmailInput = (fieldRenderProps: any) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};


const data = {
  basicInfo: {
    FirstName: "kashan",
    LastName: "Baig",
  },
  commidityInfo: {
    HSCode: "1231",
    Description: "rice"
  }
};
const permissions = {
  basicInfo: {
    FirstName: 1,
    LastName: 3,
  },
  commidityInfo: {
    HSCode: 3,
    Description: 3,
  }

};

const FormContainer = (props: any) => {
  const { maxWidth, handleSubmit } = props;

  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement style={{ maxWidth: 650 }}>
          <fieldset className={"k-form-fieldset"}>
            <legend className={"k-form-legend"}>
              Please fill in the fields:
            </legend>
            <div className="mb-3">
              <TextField
                name={"firstName"}
                component={Input}
                label={"First name"}
                permissions={permissions.basicInfo.FirstName}
                mode={"Edit"}
              />
            </div>

            <div className="mb-3">
              <Field name={"lastName"} component={Input} label={"Last name"} />
            </div>

            <div className="mb-3">
            <TextField
                name={"firstName"}
                component={Input}
                label={"First name"}
                permissions={permissions.basicInfo.LastName}
                mode={"Edit"}
              />
            </div>
          </fieldset>
          <div className="k-form-buttons">
            <button
              type={"submit"}
              className="k-button"
              disabled={!formRenderProps.allowSubmit}
            >
              Submit
            </button>
          </div>
        </FormElement>
      )}
    />
  );
};

export default FormContainer;
