import React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

//Import Styles
import "./Login.scss";

//Import Actions
import { Authenticate } from "./LoginActions";

//Import Components
import { Button, Col, Row } from "react-bootstrap";
import { Field, Form, FormElement } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import AlertDismissible from "Elements/Basic/AlertDismissible/AlertDismissible";

// Import Constants
import { ILoginRequestData } from "./LoginInterfaces";
import { RootStore } from "Store";
import validation from "Modules/Common/Constants/validation";


interface propType {}

function LoginComponent(props: propType) {
    const state = {
        userName: "",
        password: ""
    };
    const checkInput = (fieldRenderProps: any) => {
        const { validationMessage, visited, ...others } = fieldRenderProps;
        return (
            <div className="login-input">
                <Input {...others} size="sm"/>
                {visited && validationMessage && (
                    <Error>{validationMessage}</Error>                    
                )}
            </div>
        );
    };
    const userNameValidator = (value: any = "") => {
        let msg = validation.UserName.message;
        if(_.isEmpty(value)){
            return "Username cannot be empty";
        }
        if (
            value.length >= validation.UserName.minLength &&
            validation.UserName.regex.test(value)
        ) {
            msg = "";
            state.userName = value;
        }
        return msg;
    };
    const passwordValidator = (value: any = "") => {
        let msg = validation.Password.message;
        if(_.isEmpty(value)){
            return "Password cannot be empty";
        }
        if (value.length >= validation.Password.length) {
            msg = "";
            state.password = value;
        }
        return msg;
    };
    const dispatch = useDispatch();
    const history = useHistory();

    const isAlertVisible =
        useSelector((state: any) => state?.alert.visible) || false;

    const alertVariant =
        useSelector((state: any) => state?.alert.variant) || "";

    const alertMessage =
        useSelector((state: any) => state?.alert.description) || "";

    const LoginButton = (e: any) => {
        if(_.isEmpty(state.userName) && _.isEmpty(state.password)){
            return;
        }
        let LoginData: ILoginRequestData = {
            userName: state.userName,
            password: state.password
        };

        dispatch(Authenticate(LoginData, history));
    };

    const forgetPassword = () => {
        history.push("/forgotPassword");
    }

    return (
        <Row className="justify-content-center h-100">
            <Col md="8" sm="6" xs="8" className="my-auto loginbox-cont">
                <Row className="justify-content-center h-100">
                    <Col className="loginbox-form-cont rounded py-3 px-md-0">
                        <h5 className="mb-2">
                            <strong>Login</strong> to your account.
                        </h5>
                        <AlertDismissible
                            isAlertVisible={isAlertVisible}
                            variant={alertVariant}
                            message={alertMessage}
                        />
                        
                        <Form
                            onSubmit={LoginButton}
                            render={(formRenderProps) => (
                                <FormElement>
                                    <fieldset className={"k-form-fieldset"}>
                                        <div className="mb-2 mt-2">
                                            <Field
                                                placeholder="Enter Username"
                                                name={"userName"}
                                                component={checkInput}
                                                maxLength={
                                                    validation.UserName
                                                        .maxLength
                                                }
                                                minLength={
                                                    validation.UserName
                                                        .minLength
                                                }
                                                validator={userNameValidator}
                                                autoComplete="off"
                                            />
                                            <Field
                                                placeholder="Enter Password"
                                                name={"password"}
                                                type="password"
                                                component={checkInput}
                                                minLength={
                                                    validation.Password.length
                                                }
                                                validator={passwordValidator}
                                                className="mt-2"
                                            />
                                        </div>
                                    </fieldset>

                                    <Button
                                        disabled={!formRenderProps.allowSubmit}
                                        block
                                        size="lg"
                                        type={"submit"}
                                    >
                                        Login
                                    </Button>
                                </FormElement>
                            )}
                        />

                        <p onClick={forgetPassword} className="sub-text text-center mt-2" style={{cursor: "pointer"}}>
                            Having trouble logging in?
                        </p>

                        <div style={{ height: "5vh" }}></div>
                    </Col>
                </Row>

                <Row>
                    <Col className="loginbox-signup-cont rounded mt-2 py-3 d-block d-md-none">
                        <Link to="/subscription">
                            <p className="text-center mt-2mt-5">
                                Dont have an account? <strong>Sign Up!</strong>
                                <FontAwesomeIcon
                                    icon={faArrowCircleRight}
                                    className="ml-2"
                                />
                            </p>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default LoginComponent;
