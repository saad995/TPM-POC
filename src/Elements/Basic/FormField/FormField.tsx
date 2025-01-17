import React, { useState, useEffect } from "react";
import _ from "lodash";
//Import Component
import { Col, Row, Button, Container } from "react-bootstrap";
import {
    Form,
    Field,
    FormElement,
    FieldWrapper
} from "@progress/kendo-react-form";



const FormField = (props:any) => {
  
  const handleSubmit = () => {};

  return (
    <div>
     <Form
                onSubmit={handleSubmit}
                render={(formRenderProps) => (
                    <Container fluid className="mt-4">
                        <FormElement>
                            <fieldset className={"k-form-fieldset"}>
                                
                            </fieldset>
                        </FormElement>
                    </Container>
                )}
            />
    </div>
  );
};

export default FormField;
