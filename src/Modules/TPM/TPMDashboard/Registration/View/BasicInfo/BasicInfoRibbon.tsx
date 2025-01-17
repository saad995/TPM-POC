import { resources_EN } from "Modules/TPM/Constants/Resources/Resources_EN";
import React from "react";
import { Col } from "react-bootstrap";
import { Label } from "@progress/kendo-react-labels";
import moment from "moment";
import Config from "Config";
import InfoBar from "Modules/TPM/Common/InfoBar/InfoBar";
import ImportSVG from "Lib/Helpers/CustomSVGImporter";
import styles from "./BasicInfoRibbon.module.scss";
import { numberWithCommas } from "Modules/TPM/Common/CommonFunctions";

interface Iprops {
    data?: any;
}

function renderDateValue(date: string, defaultVal: string = 'N/A') {
    if (date) return moment(new Date(date)).format(Config.DateFormat)

    return defaultVal
}
function getBillPaidStyles(isBillPaid: boolean) {
    return isBillPaid ? { color: "#82eb9a" } : { color: "#f84d5e" }
}
function getBillPaidNarration(isBillPaid: boolean) {
    return isBillPaid ? 'Paid' : 'Unpaid'
}

function createDataSet(dataKey: string, render: (value: string, data: any) => JSX.Element, conditionalKey?: string) {
    return { dataKey, render, conditionalKey }
}

const arr = [
    createDataSet('requestDocumentNumber', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="request-doc-no" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">Request Document No</span>
                <br />
                <p className="font-semibold base-lg" style={{ letterSpacing: "0.05rem" }}>{value}</p>
            </p>
        </Col>
    )),
    createDataSet('ntn', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="request-doc-no" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">NTN</span>
                <br />
                <p>{value}</p>
            </p>
        </Col>
    )),
    createDataSet('businessName', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="request-doc-no" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">Business Name</span>
                <br />
                <p>{value}</p>
            </p>
        </Col>
    )),
    createDataSet('companyName', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="request-doc-no" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">Business Name</span>
                <br />
                <p>{value}</p>
            </p>
        </Col>
    )),
    createDataSet('principalActivity', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="request-doc-no" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">Principal Activity</span>
                <br />
                <p>{value}</p>
            </p>
        </Col>
    )),
    createDataSet('documentNumber', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="psid-solid" size={38} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">{resources_EN.release_Order_RO_Document_Number}</span>
                <br />
                <p className="font-semibold base-lg">{value}</p>
            </p>
        </Col>
    ), 'issueDate'),
    createDataSet('psid', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="psid-solid" size={38} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">PSID</span>
                <br />
                <p className="font-semibold base-lg">{value}</p>
            </p>
        </Col>
    )),
    createDataSet('certificateNumber', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="certificate-no-solid" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">Certificate No</span>
                <br />
                <p className="font-semibold base-lg">{value}</p>
            </p>
        </Col>
    ), 'certDocumentNumber'),
    createDataSet('issueDate', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="certificate-no-solid" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">{resources_EN.release_Order_RO_Issue_Date}</span>
                <br />
                <p className="font-semibold base-lg">{renderDateValue(value)}</p>
            </p>
        </Col>
    )),
    createDataSet('certIssueDate', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="document-submit-solid" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">Issue Date</span>
                <br />
                <p className="font-semibold base-lg">{renderDateValue(value)}</p>
            </p>
        </Col>
    )),
    createDataSet('agencyName', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="psid-solid" size={38} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">{resources_EN.agency_name_title}</span>
                <br />
                <p className="font-semibold base-lg">{value}</p>
            </p>
        </Col>
    )),
    createDataSet('officerName', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="psid-solid" size={38} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">{resources_EN.officer_name_title}</span>
                <br />
                <p className="font-semibold base-lg">{value}</p>
            </p>
        </Col>
    )),
    createDataSet('treatedmentstatusName', (value) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="import-permit-solid" size={38} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">{resources_EN.release_Order_Status}</span>
                <br />
                <p className="font-semibold base-lg">{value}</p>
            </p>
        </Col>
    )),
    createDataSet('billAmount', (value, data) => (
        <Col className={"p-3 d-flex h-100 " + styles.permitImportantInfo}>
            <ImportSVG name="payment-solid" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">Payment Status</span>
                <br />
                <span className="font-semibold base-lg" style={{ ...getBillPaidStyles(data?.isBillPaid) }}>{getBillPaidNarration(data?.isBillPaid)}</span>
            </p>
        </Col>
    )),
    createDataSet('billAmount', (value, data) => (
        <Col className={"p-3 d-flex h-100 " + styles.permitImportantInfo}>
            <ImportSVG name="payment-solid" size={32} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">Payment</span>
                <br />
                <span className="font-semibold base-lg" style={{ ...getBillPaidStyles(data?.isBillPaid) }}>{"PKR " + numberWithCommas(data?.billAmount)}</span>
            </p>
        </Col>
    )),
    createDataSet('catchCertificateStatusName', (value, data) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="import-permit-solid" size={38} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">{resources_EN.release_Order_Status}</span>
                <br />
                <p className="font-semibold base-lg">{value}</p>
            </p>
        </Col>
    )),
    createDataSet('commodityStatusName', (value, data) => (
        <Col className={"p-3 d-flex " + styles.importantInfo}>
            <ImportSVG name="import-permit-solid" size={38} color="#FFFFFF" hoverClassName="mr-2" />
            <p>
                <span className="font-weight-light">
                    {resources_EN.seed_enlistment_basicInfoRibbon_commodity_Status_Name}
                </span>
                <br />
                <p className="font-semibold base-lg">{value}</p>
            </p>
        </Col>
    )),
]

const renderInfoBarItem = ({ item, data }: { item: any, data: any }) => {
    const key = item.conditionalKey || item.dataKey

    if (data && data[key]) {
        return item.render(data[item.dataKey], data)
    }

    return null
}

const BasicInfoRibbon = (props: Iprops) => {
    if (props == null || typeof (props) == 'undefined') {
        return null;
    }

    return (
        <>
            <InfoBar>
                {arr.map((item) => renderInfoBarItem({ item, data: props?.data }))}
            </InfoBar>
        </>
    );
};

export default BasicInfoRibbon;
