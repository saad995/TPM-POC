import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import moment from "moment";
import Config from "Config";
import InfoBar from "Modules/TPM/Common/InfoBar/InfoBar";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import styles from "./BasicInfo.module.scss";
// import PaymentPopup from "Modules/TPM/Common/PaymentPopup/PaymentPopup";
// import useTotalPaymentAmount, { IUseTotalPaymentAmount } from "../../../Common/PaymentPopup/Hooks/useTotalAmount";
import ReactLoader from "react-loader-spinner";
import { DocumentInfo } from "Modules/TPM/Constants/Interfaces";
import _ from "lodash";
import { getCustomTreatmentStatusName, getTreatmentStatusName, paymentModeConst, treatmentRequestsStatus } from "Modules/Common/CommonUtility";
interface Iprops {
    data?: any;
    roleCode?: any
}
const BasicInfo = (props: Iprops) => {
    const [paymentPopup, setPaymentPopup] = useState(false);
    const [paymentIds, setPaymentids] = useState<string[]>([]);
    const [parentPaymentId, setParentPaymentId] = useState<string>("");
    const [parentDocumentTypeCode, setParentDocumentTypeCode] = useState<string>("");
    const togglePaymentPopup = () => {
        setPaymentPopup(!paymentPopup);
    };



    /* ----------- Fetch Total Payment Amount using custom hook ----------- */
    // const { billTotalPaymentAmount, isBillTotalPaymentLoading }: IUseTotalPaymentAmount = useTotalPaymentAmount(
    //     props.data
    //         ? {
    //             initDocumentID: paymentIds, //props.data.exportCertificateIdS ? props.data.exportCertificateIdS : props.data.releaseOrderIdS,
    //             documentClassificationCode: props.data.documentClassificationCode, // initDocumentTypeCode
    //             agencyID: props.data.agencyIdN ? props.data.agencyIdN : props.data.agencyID,
    //             parentDocumentID: parentPaymentId,
    //             parentDocumentTypeCode: parentDocumentTypeCode
    //         }
    //         : {}
    // );

    function renderStringValue (value: string) {
        if (value) {
            return value
        }

        return 'N/A'
    }

    function renderDateValue (date: string) {
        if (date) {
            return moment(new Date(date)).format(Config.DateFormat)
        }

        return 'N/A'
    }

   
    return (
        <>
            {/* {paymentPopup ? (
                <PaymentPopup
                    isAction={paymentPopup}
                    onClose={setPaymentPopup}
                    documentClassificationCode={props.data.documentClassificationCode}
                    initDocumentID={paymentIds} //{props.data.exportCertificateIdS ? props.data.exportCertificateIdS : props.data.releaseOrderIdS}
                    agencyID={props.data.agencyIdN ? props.data.agencyIdN : props.data.agencyID}
                    parentDocumentID={parentPaymentId}
                    parentDocumentTypeCode={parentDocumentTypeCode}
                />
            ) : null} */}

            <InfoBar>
                {props?.data?.requestDocumentNumber ? (
                    <Col className={"p-3 d-flex " + styles.importantInfo}>
                        <ImportSVG name="psid-solid" size={38} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">Request Document Number</span>
                            <br />
                            <p className="font-semibold base-lg">{props?.data?.requestDocumentNumber}</p>
                        </p>
                    </Col>
                ) : null}
                {props?.data?.treatmentCertificateNumber &&
                props?.data?.treatmentRequestStatusID != treatmentRequestsStatus.ACCEPTED ? (
                    <Col className={"p-3 d-flex " + styles.importantInfo}>
                        <ImportSVG name="psid-solid" size={38} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">Treatment Certificate Number</span>
                            <br />
                            <p className="font-semibold base-lg">{props?.data?.treatmentCertificateNumber}</p>
                        </p>
                    </Col>
                ) : null}

                {props.data?.psid ? (
                    <Col className={"p-3 d-flex " + styles.importantInfo}>
                        <ImportSVG name="psid-solid" size={38} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">PSID</span>
                            <br />
                            <p className="font-semibold base-lg">{props.data.psid}</p>
                        </p>
                    </Col>
                ) : null}
                {/* {console.log("props.data.certDocumentNumber", props.data.certDocumentNumber)} */}
                {props.data.tradeType != null ? (
                    <Col className={"p-3 d-flex " + styles.importantInfo}>
                        <ImportSVG name="certificate-no-solid" size={32} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">Trade Type</span>
                            <br />
                            <p className="font-semibold base-lg pl-1">{props?.data?.tradeType}</p>
                        </p>
                    </Col>
                ) : null}
                {props?.data?.sdDocumentNumber != null ? (
                    <Col className={"p-3 d-flex " + styles.importantInfo}>
                        <ImportSVG name="certificate-no-solid" size={32} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">Single Declaration Number</span>
                            <br />
                            <p className="font-semibold base-lg pl-1">
                                {renderStringValue(props?.data?.sdDocumentNumber)}
                            </p>
                        </p>
                    </Col>
                ) : null}
                {props.data?.issueDate ? (
                    <Col className={"p-3 d-flex " + styles.importantInfo}>
                        <ImportSVG name="certificate-no-solid" size={32} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">{resources_EN.release_Order_RO_Issue_Date}</span>
                            <br />
                            <p className="font-semibold base-lg">
                                {renderDateValue(props.data?.issueDate)}
                            </p>
                        </p>
                    </Col>
                ) : null}
                {props.data?.certIssueDate ? (
                    <Col className={"p-3 d-flex " + styles.importantInfo}>
                        <ImportSVG name="certificate-no-solid" size={32} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">{resources_EN.release_Order_RO_Issue_Date}</span>
                            <br />
                            <p className="font-semibold base-lg">
                                {renderDateValue(props.data?.certIssueDate)}
                            </p>
                        </p>
                    </Col>
                ) : null}
                {props.data?.officerName ? (
                    <Col className={"p-3 d-flex " + styles.importantInfo}>
                        <ImportSVG name="internal-users" size={32} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">Officer Name</span>
                            <br />
                            <p className="font-semibold base-lg pl-1">
                                {renderStringValue(props?.data?.officerName)}
                            </p>
                        </p>
                    </Col>
                ) : null}
                {props.data?.createdOn ? (
                    <Col className={"p-3 d-flex " + styles.importantInfo}>
                        <ImportSVG name="document-submit-solid" size={32} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">Request Date</span>
                            <br />
                            <p className="font-semibold base-lg pl-1">
                                {renderDateValue(props.data?.createdOn)}
                            </p>
                        </p>
                    </Col>
                ) : null}

                {props?.data?.treatmentRequestStatusID ? (
                    <Col className={"p-3 d-flex h-100 " + styles.permitImportantInfo}>
                        <ImportSVG name="document-submit-solid" size={32} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">Status</span>
                            <br />
                            <span className="font-semibold base-lg pl-1">
                                {props?.data?.treatmentRequestStatusID == treatmentRequestsStatus.RESSIGNED
                                    ? getCustomTreatmentStatusName(
                                          props?.data?.treatmentRequestStatusID,
                                          props?.roleCode
                                      )
                                    : getTreatmentStatusName(props?.data?.treatmentRequestStatusID)}
                            </span>
                        </p>
                    </Col>
                ) : null}

                {props?.data?.treatmentCertificate?.paymentMode ? (
                    <Col className={"p-3 d-flex h-100 " + styles.permitImportantInfo}>
                        <ImportSVG name="document-submit-solid" size={32} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">Payment Mode</span>
                            <br />
                            <span className="font-semibold base-lg pl-1">
                                {props?.data?.treatmentCertificate?.paymentMode}
                            </span>
                        </p>
                    </Col>
                ) : null}
                {props?.data?.treatmentCertificate?.paymentMode == paymentModeConst.ONLINE ? (
                    <Col className={"p-3 d-flex h-100 " + styles.permitImportantInfo}>
                        <ImportSVG name="document-submit-solid" size={32} color="#FFFFFF" />
                        <p>
                            <span className="font-weight-light">Payment Status</span>
                            <br />
                            <span className="font-semibold base-lg pl-1">
                                {props?.data?.treatmentCertificate?.paymentStatus}
                            </span>
                        </p>
                    </Col>
                ) : null}
            </InfoBar>
        </>
    );
};

export default BasicInfo;
