import React from 'react'
import AmountFormatter from 'Lib/Helpers/AmountFormatter';
import { Action } from 'Modules/TPM/Constants/Interfaces';
import { resources_EN } from 'Modules/TPM/Constants/Resources/Resources_EN';
import { Row, Col } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import styles from "./GenericCustomAlert.module.scss";

export const GenericCustomAlert = (props: any) => {
    const {psid, type, onConfirm ,warning, confirmBtnText, showCancel, title, show, isSuccess, onCancel, isUnauthorized, sweetAlertMessage, totalPayableFacilityAmount} = props;
 

    return (
    <SweetAlert
    customClass={"sweetalert-lg"}
    cancelBtnBsStyle={"light"}
    cancelBtnText={"Cancel"}
    customIcon={"Confirm"}
    title={title}
    error={isUnauthorized}
    show={show}
    onConfirm={onConfirm}
    onCancel={onCancel}
    success={isSuccess}
    showCancel={showCancel}
    confirmBtnText={confirmBtnText}
    warning={warning}
    >
    <>
        {(() => {
            switch (type) {
                case Action.Submit:
                    return (
                        <>
                            <Row className="justify-content-between mt-2 pb-2">
                                <Col>
                                    <p className="base-lg text-muted">
                                        {sweetAlertMessage}
                                    </p>
                                </Col>
                            </Row>
                            <Row className="no-gutters mt-3">
                                <Col
                                    className={"p-md-4 pl-3 pr-4 py-4 " + styles.borderManage}
                                    md={6}
                                    style={{
                                        border: "1px dashed rgb(222, 226, 230)",
                                        borderLeft: "none",
                                        borderRight: "none"
                                    }}>
                                    <p className="title text-muted">Amount</p>
                                </Col>
                                <Col
                                    className={"p-md-4 pl-3 pr-4 py-4 " + styles.borderManage}
                                    md={6}
                                    style={{
                                        border: "1px dashed rgb(222, 226, 230)",
                                        borderLeft: "none",
                                        borderRight: "none"
                                    }}>
                                    <p className="title font-semibold">
                                        PKR {AmountFormatter(totalPayableFacilityAmount)}
                                    </p>
                                </Col>
                            </Row>
                        </>
                    );
                case Action.ConfirmPayment:
                    return (
                        <>
                            <Row className="justify-content-between mt-2 pb-2">
                                <Col>
                                    <p className="base-lg text-muted">{sweetAlertMessage}</p>
                                </Col>
                            </Row>
                            <Row className="no-gutters mt-3">
                                <Col
                                    className="py-4 pr-4 pl-3"
                                    md={8}
                                    style={{
                                        border: "1px dashed rgb(222, 226, 230)",
                                        textAlign: "left",
                                        fontSize: "15px"
                                    }}>
                                    <p className="text-muted">PSID</p>
                                    <p className="title font-semibold">{psid}</p>
                                </Col>
                                <Col
                                    className={"p-md-4 pl-3 pr-4 py-4 " + styles.borderManage}
                                    md={4}
                                    style={{
                                        border: "1px dashed rgb(222, 226, 230)",
                                        borderLeft: "none",
                                        borderRight: "none"
                                    }}>
                                    <p className="text-muted">Total Payable Amount</p>
                                    <p className="title font-semibold">
                                        PKR {AmountFormatter(totalPayableFacilityAmount)}
                                    </p>
                                </Col>
                            </Row>
                        </>
                    );
                case Action.Save:{
                    return (
                           <label>{sweetAlertMessage}</label>
                    );
                }
                case Action.Cancel:{
                    return (
                           <label>{sweetAlertMessage}</label>
                    );
                }
                default:
                    return <label>{sweetAlertMessage}</label>;
            }
        })()}
    </>
</SweetAlert>
  )
}

export default GenericCustomAlert